// Global store to manage all the state of PRJS, with the help of zustand
// The store can be easily accessed in any components by importing useStore() and const store = useStore();

import {create} from 'zustand';
import {Exo, ExoFile, Page} from './types.js';
import {Runner} from './Runner.js';
import fs from 'fs';
import util from 'util';
import {debug} from './util.js';

// TODO: remove this debug function writing to a log file...
const log = function (d: any) {
	fs.appendFileSync('debug.log', util.format(d) + '\n');
};

export type State = {
	page: Page;
	list: {
		index: number;
		selectionIndexes: number[];
		showSearchBar: boolean;
	};
	previousPage: Page;
	files: ExoFile[];
	currentFile: string | null;
	exos: Exo[];
	currentExo: Exo | null;
	runner: Runner;
	started: boolean;
};

export type Action = {
	start(s: Store): void;
	setPage(page: Page): void;
	backToPreviousPage(): void;
	changeIndexInList(offset: number): void;
	switchToList(index: number): void;
	getProgress(): number;
	setSearchBarVisibility(visible: boolean): void;
	updateCurrentExo(): void;
	updateExos(): void;
};

export type Store = State & Action;

// Create your store, which includes both state and (optionally) actions
const useStore = create<Store>((set: any) => ({
	//Global state
	page: 'home',
	previousPage: 'list',
	list: {
		index: 0,
		selectionIndexes: [0, 1],
		showSearchBar: false,
	},
	files: [],
	currentFile: null,
	exos: [],
	currentExo: null,
	runner: new Runner(),
	started: false,

	//Actions
	async start() {
		this.runner = new Runner();
		await this.runner.startVitest(this.updateExos);
		log('starting vitest');
		set({started: true});
		log('setting files');
		set({files: this.runner.getFiles()});
		set({currentFile: this.runner.currentFile});
		this.updateExos();
	},

	setPage(page: Page) {
		debug('defined page as ' + page);
		set((state: Store) => ({page: page, previousPage: state.page}));
	},

	backToPreviousPage() {
		this.setPage(this.previousPage);
	},

	// Change the selected index in files or exos list with given offset
	changeIndexInList(offset: number) {
		const list = this.list;
		const current: number = list.selectionIndexes[list.index] ?? 0;
		const max: number = list.index == 0 ? this.files.length : this.exos.length;
		const final = offset + current;

		if (final >= max || final < 0) return;

		list.selectionIndexes[list.index] = final;

		set({list: list});
		if (list.index == 0) {
			this.updateExos();
		}
		this.updateCurrentExo();
	},

	switchToList(index: number) {
		if (index > 1 || index < 0) return;
		set((store: Store) => {
			return {list: {...store.list, index: index}};
		});
		this.updateCurrentExo();
	},

	getProgress() {
		// const totalExos = exos.length;
		// const passedExos = exos.filter(e => e.state === 'pass').length;
		// const progress = totalExos > 0 ? (passedExos / totalExos) * 100 : 0;
		return 24;
	},

	setSearchBarVisibility(visible: boolean) {
		set({list: {...this.list, showSearchBar: visible}});
	},

	updateCurrentExo() {
		const list = this.list;
		const index: number = list.selectionIndexes[list.index] ?? 0;
		if (this.exos.length <= index) return;

		set({currentExo: this.exos[index]});
	},

	updateExos() {
		const list = this.list;
		const index: number = list.selectionIndexes[0] ?? 0;
		if (this.files.length <= index) return;

		set({
			exos: this.runner.getCurrentExos(
				this.runner.getFiles()[index]?.path ?? '',
			),
			list: {
				...this.list,
				// Reset exo indexes
				selectionIndexes: [this.list.selectionIndexes[0], 0],
			},
		});
		debug('updated exos() !!');
	},
}));

export default useStore;
