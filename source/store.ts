// Global store to manage all the state of PRJS, with the help of zustand
// The store can be easily accessed in any components by importing useStore() and const store = useStore();

import {create} from 'zustand';
import {Exo, ExoFile, Page} from './types.js';
import {Runner} from './Runner.js';
import {debug} from './util.js';
import chokidar from 'chokidar';

type State = {
	// Routing system
	page: Page;
	previousPage: Page;

	// Selection of list and elements
	listNumber: number; //number of the list (among all list from left to right)
	currentExoIndex: number; //todo: should we switch to exo uid defined by Vitest ?
	currentFileIndex: number;

	// Search system
	showSearchBar: boolean;
	search: string;

	// Runner and watcher related
	runner: Runner;
	started: boolean;
	watcher: chokidar.FSWatcher | null;
	reloadTimes: number;
};

type Action = {
	// Getters
	getProgress(): number;
	getCurrentExo(): Exo | null;
	getCurrentFile(): ExoFile | null;
	getAllFiles(): ExoFile[];
	getFilteredExos(): Exo[];

	// Actions
	start(): Promise<void>;
	stop(): Promise<any>;
	startWatcher(): void;
	setPage(page: Page): void;
	backToPreviousPage(): void;
	changeSelectionInCurrentList(offset: number): void;
	switchToList(index: number): void;
	setSearchBarVisibility(visible: boolean): void;
	updateSearchFilter(filter: string): void;
};

export type Store = State & Action;

// The global store of our app
const useStore = create<Store>((set: any, get: any) => ({
	//Default values
	page: 'home',
	previousPage: 'home',
	listNumber: 0,
	currentExoIndex: 0,
	currentFileIndex: 0,
	showSearchBar: false,
	search: '',
	runner: new Runner(),
	started: false,
	watcher: null,
	reloadTimes: 0,

	// GETTERS (without any side effects)
	// Get the global progress in percentage of passed exos among all exos
	getProgress() {
		const allExos = this.runner.getAllExos();
		const passedExosLength = allExos.filter(
			(exo: Exo) => exo.state === 'pass',
		).length;
		return allExos.length > 0 ? (passedExosLength / allExos.length) * 100 : 0;
	},

	// Get current file selected via currentExoIndex
	getCurrentExo() {
		const exos = this.getFilteredExos();
		const index = this.currentExoIndex;
		if (index >= exos.length) return null;
		return exos[index] ?? null;
	},

	// Get current file selected via currentFileIndex
	getCurrentFile() {
		const files = this.getAllFiles();
		const index = this.currentFileIndex;
		if (index >= files.length) return null;
		return files[index] ?? null;
	},

	// Get all files detected by Vitest
	getAllFiles() {
		return this.runner.getAllFiles();
	},

	// Get filtered exos of the current file
	getFilteredExos() {
		debug('running getFilteredExos');
		const given = this.search.trim().toLowerCase();
		const exos: Exo[] = this.runner.getExosInFile(
			this.getCurrentFile()?.path ?? null,
		);
		if (given.length == 0) return exos;
		return exos.filter((exo: Exo) => exo.title.toLowerCase().includes(given));
	},

	// ACTIONS
	async start() {
		this.runner = new Runner();
		await this.runner.startVitest();
		debug('starting vitest');
		set({started: true});
		debug('setting files');
		this.startWatcher();
	},

	async stop() {
		return Promise.all([this.watcher?.close(), this.runner.stopVitest()]);
	},

	startWatcher() {
		const update = async (event: any, path: string) => {
			if (!path.endsWith('.js')) return;
			debug('watcher: ' + path);
			await this.runner.runAll();
			set({reloadTimes: this.reloadTimes + 1});
			debug('runned tests !');
			debug('uids: ' + JSON.stringify(this.getFilteredExos().map(e => e.uid)));
		};
		debug('starting watcher !');
		this.watcher = chokidar
			.watch(['*/**.js', '*/**.ts', '*.js', '*.ts'], {
				ignored: '.git/**|node_modules/**|.vite/**|**.log|**.tmp',
			})
			.on('all', update);
	},

	setPage(page: Page) {
		if (this.page === page) return; //do not reassign the current page because we will lose the previousPage otherwise
		set((state: Store) => ({page: page, previousPage: state.page}));
	},

	backToPreviousPage() {
		this.setPage(this.previousPage);
	},

	// Change the selected index in current list (files or exos) list with given offset
	changeSelectionInCurrentList(offset: number) {
		let newIndex;
		switch (this.listNumber) {
			case 0:
				newIndex = this.currentFileIndex + offset;
				if (newIndex >= 0 && newIndex < this.getAllFiles().length) {
					set({currentFileIndex: newIndex});
				}
				set({search: ''}); //reset search
				break;
			case 1:
				newIndex = this.currentExoIndex + offset;
				if (newIndex >= 0 && newIndex < this.getFilteredExos().length) {
					set({currentExoIndex: newIndex});
				}
				break;
		}
	},

	switchToList(index: number) {
		if (index > 1 || index < 0 || index == this.listNumber) return;
		set({listNumber: index});
	},

	setSearchBarVisibility(visible: boolean): void {
		set({showSearchBar: visible});
	},

	updateSearchFilter(filter: string) {
		debug('updatedsarchfilter: ' + filter);
		set((s: Store) => {
			return {
				search: filter.trim(), //persist new filter
				//reset index of the second list
				currentExoIndex: 0,
			};
		});

		debug('updatedsarchfilter result: ' + this.search);
	},
}));

export default useStore;
