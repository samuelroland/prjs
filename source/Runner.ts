import { File } from 'vitest';
import { Vitest, startVitest } from 'vitest/node';
import { Exo, ExoFile } from './types.js';
import { debug } from './App.js';
import { readableNoopStream, writableNoopStream } from 'noop-stream';
import fs from "fs"

export class Runner {
	vt: Vitest | undefined = undefined;
	starting: boolean;
	started: boolean;

	constructor() {
		this.starting = true;
		this.started = false;
	}

	async startVitest() {
		try {
			this.vt = await startVitest(
				'test',
				undefined,
				{
					watch: true, //watch mode ON (unnecessary but it doesn't find tests otherwise)
					changed: true, //do not exit when no tests are found so we can display an error and not just exit the whole process
				},
				undefined,
				{
					// Defines empty readable and writable stream so Vitest does not interfere console output and cannot listen for its own shortcuts
					// @ts-ignore
					stdin: readableNoopStream(),
					// @ts-ignore
					stdout: writableNoopStream(),
					// stdout: fs.createWriteStream('out.tmp'),
					// @ts-ignore
					stderr: writableNoopStream(),
					// stderr: fs.createWriteStream('out2.tmp'),
				},
			);
			// Note: for some reason, startVitest doesn't take into account all test files, this is why we run it again
			await this.runAll();
			this.started = true;
			this.starting = false;
		} catch (error) {
			this.starting = false;
			debug('error ! ' + error);
		}
	}

	async stopVitest(): Promise<void> {
		return this.vt?.close();
	}

	async runAll() {
		debug('running all !');
		// Note: globTestFiles() seems to always take all files (contrary to vt.state.getFiles() because we started with changed: true), so this make sure we are running all of them
		return this.vt?.runFiles(await this.vt?.globTestFiles(), true);
	}

	getAllFiles(): ExoFile[] {
		return (
			this.vt?.state
				.getFiles()
				.sort((a, b) => (a.filepath < b.filepath ? -1 : 1))
				.map(f => {
					return {
						filename: f.name ?? '??',
						state: f.result?.state ?? 'unknown',
						path: f.filepath ?? '',
					};
				}) ?? []
		);
	}

	private getGivenFile(givenPath: string): File | undefined {
		return this.vt?.state.getFiles().find(f => f.filepath === givenPath);
	}

	getExosInFile(filepath: string | null): Exo[] {
		if (!filepath) return [];

		const file = this.getGivenFile(filepath);
		if (!file) return [];

		return file.tasks.map(t => ({
			title: t.name ?? '??',
			state: t.result?.state ?? 'unknown',
			uid: t.id,
			// @ts-ignore
			functionName: t.meta?.exo?.functionName ?? '?',
			// @ts-ignore
			instruction: t.meta?.exo?.instruction ?? null,
			// @ts-ignore
			tests: t.meta?.exo?.tests,
			errors:
				t.result?.errors?.map(e => ({
					message: e.message,
					actual: e.actual,
					expected: e.expected,
					diff: e.diff,
				})) ?? [],
		}));
	}

	getAllExos(): Exo[] {
		return (
			this.vt?.state
				.getFiles()
				.flatMap(file => this.getExosInFile(file.filepath)) ?? []
		);
	}
}
