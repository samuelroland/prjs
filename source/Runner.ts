import { File } from 'vitest';
import {Vitest, createVitest, } from 'vitest/node';
import fs from 'fs';
import util from 'util';
var log_file = fs.createWriteStream('debug.log', {flags: 'w'});
// TODO: remove this debug function writing to a log file...
const log = function (d: any) {
	log_file.write(util.format(d) + '\n');
};

export type ExoFile = {
	filename: string;
	state: string;
	path: string;
}

export type Exo = {
	title: string;
	state: string;
}

export class Runner {
	vt: Vitest | null = null
	currentFile: string |null;
	started: boolean

	constructor() {
		this.currentFile = null
		this.started = false
	}

	async startVitest() {
		if (this.started) return this.getFiles()
		try {
			// TODO: make Vitest unable to print things on stdout... Should we use an empty reporter ?
			this.vt = await createVitest('test',{watch: false, reporters: ["json"], outputFile: "test.json"})
			await this.vt?.start()
			log("started !")
			log(this.vt.state)
		} catch (error) {
			log("error !")
			// console.log(vitest.state.getFiles()[0])
		}
		return this.getFiles()
	}

	async stopVitest() {
		return this.vt?.close()
	}

	getFiles(): ExoFile[] {
		return this.vt?.state.getFiles().map(f => {
			return {filename: f.name ?? '??', state: f.result?.state ?? 'unknown', path: f.filepath ?? ''}
		}) ?? []
	}

	getGivenFile(givenFile: string): File | undefined{
		return this.vt?.state.getFiles().find(f => f.file?.name === givenFile)
	}

	setCurrentFile(givenFile: string): boolean {
		if (!this.getGivenFile(givenFile)) return false

		this.currentFile = givenFile;
		return true
	}

	async runCurrentFile() {
		if (this.currentFile){
			await this.vt?.rerunFiles([this.currentFile])
		}
	}

	getCurrentExos(): Exo[] {
		return this.vt?.state.getFiles()[0]?.tasks.map(t => {
			return {title: t.name ?? '??', state: t.result?.state ?? 'unknown'}
		}) ?? []
	}
}
