import {File} from 'vitest';
import {Vitest, startVitest} from 'vitest/node';
import fs from 'fs';
import util from 'util';
// TODO: remove this debug function writing to a log file...
const log = function (d: any) {
	fs.appendFileSync('debug.log', util.format(d));
};

export type ExoFile = {
	filename: string;
	state: string;
	path: string;
};

export type Exo = {
	title: string;
	state: string;
};

// class ListenRunner extends JsonReporter {
// 	callme: () => void;

// 	constructor(callme: () => void) {
// 		super({})
// 		this.callme = callme
// 	}
// 	override onFinished(_?: File[] | undefined): Promise<void> {
// 		this.callme()
// 		return Promise.resolve()
// 	}
// }

export class Runner {
	vt: Vitest | undefined = undefined;
	currentFile: string | null;
	started: boolean;
	constructor() {
		this.currentFile = null;
		this.started = false;
	}

	async startVitest() {
		try {
			// TODO: make Vitest unable to print things on stdout... Should we use an empty reporter ?

			this.vt = await startVitest(
				'test',
				undefined,
				{
					watch: true, //watch mode ON
					changed: true, //do not exit when no tests are found so we can display an error and not just exit the whole process
				},
				undefined,
				{
					// TODO: better like this and TS ignore or with tmp file ?
					// @ts-ignore
					stdout: writableNoopStream(),
					// @ts-ignore
					stderr: writableNoopStream(),
				},
			);
			this.vt?.onClose(() => log('closed vitest...'));
		} catch (error) {
			log('error !' + error);
		}
	}

	async stopVitest() {
		return this.vt?.close();
	}

	getFiles(): ExoFile[] {
		return (
			this.vt?.state.getFiles().map(f => {
				return {
					filename: f.name ?? '??',
					state: f.result?.state ?? 'unknown',
					path: f.filepath ?? '',
				};
			}) ?? []
		);
	}

	getGivenFile(givenFile: string): File | undefined {
		return this.vt?.state.getFiles().find(f => f.file?.name === givenFile);
	}

	setCurrentFile(givenFile: string): boolean {
		if (!this.getGivenFile(givenFile)) return false;

		this.currentFile = givenFile;
		return true;
	}

	async runCurrentFile() {
		if (this.currentFile) {
			await this.vt?.rerunFiles([this.currentFile]);
		}
	}

	getCurrentExos(): Exo[] {
		return (
			this.vt?.state.getFiles()[0]?.tasks.map(t => {
				return {title: t.name ?? '??', state: t.result?.state ?? 'unknown'};
			}) ?? []
		);
	}
}
