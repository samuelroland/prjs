// Global store to manage all the state of PRJS, with the help of zustand
// The store can be easily accessed in any components by importing useStore() and const store = useStore();

import {create} from 'zustand';
import {Exo, ExoFile, Page} from './types.js';
import {Runner} from './Runner.js';
import fs from 'fs';
import util from 'util';
import {debug} from './util.js';
import { search } from 'node-emoji';

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
		search: string;
	};
	previousPage: Page;
	files: ExoFile[];
	currentFile: string | null;
	filteredExos: Exo[],
	exos: Exo[];
	currentExo: Exo | null;
	runner: Runner;
	started: boolean;
};

export type Action = {
	start(): Promise<void>;
	stop(): Promise<void>;
	setPage(page: Page): void;
	backToPreviousPage(): void;
	changeIndexInList(offset: number): void;
	switchToList(index: number): void;
	getProgress(): number;
	setSearchBarVisibility(visible: boolean): void;
	updateCurrentExo(): void;
	updateExos(): void;
	updateSearchFilter(filter: string): void;
	changeExoInList(offset: number): void;
};

export type Store = State & Action;

// Create your store, which includes both state and (optionally) actions
const useStore = create<Store>((set: any, get: any) => ({
	//Global state
	page: 'home',
	previousPage: 'list',
	list: {
		index: 0,
		selectionIndexes: [0, 1],
		showSearchBar: false,
		search: '',
	},
	files: [],
	currentFile: null,
	filteredExos: [],
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

	async stop() {
		return this.runner.stopVitest();
	},
	setPage(page: Page) {
		if (this.page === page) return; //do not reassign the current page because we will lose the previousPage otherwise
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
		const allExos = this.runner.getAllExos();
		const totalExos = allExos.length;
		const passedExos = allExos.filter((exo:Exo) => exo.state === 'pass').length;
		const progress = totalExos > 0 ? (passedExos / totalExos) * 100 : 0;
		return progress;
	},

	setSearchBarVisibility: (visible: boolean) => {
		let list = get().list;
		set({ list: { ...list, showSearchBar: visible } });
	},


	updateCurrentExo() {
		const list = this.list;
		const index: number = list.selectionIndexes[list.index] ?? 0;
		if (this.exos.length <= index) return;
		if (this.filteredExos.length <= index) return;

		set({currentExo: this.exos[index]});
	},

	updateExos() {
        const list = this.list;
        const index: number = list.selectionIndexes[0] ?? 0;
        if (this.files.length <= index) return;

        const exos = this.runner.getCurrentExos(
            this.runner.getFiles()[index]?.path ?? ''
        );

        set((state: Store) => ({
            exos,
            filteredExos: exos,
            list: {
                ...state.list,
                selectionIndexes: [state.list.selectionIndexes[0], 0],
            },
        }));
        debug('updated exos() !!');
    },

	updateSearchFilter(filter: string) {
		set((state: Store) => ({
            list: {
                ...state.list,
				search: filter,
            },
        }));

		const { exos } = get();
        if (!exos) {
            return;
        }

        const filteredExos = exos.filter((exo: Exo) =>
            exo.title.toLowerCase().includes(filter.toLowerCase())
        );

        set((state: Store) => ({
            filteredExos,
            list: {
                ...state.list,
                selectionIndexes: [state.list.selectionIndexes[0], 0],
            },
        }));
    },

	// TODO code duplicate refactor ?
	changeExoInList(offset: number) {
        const { filteredExos, currentExo } = get();
        if (!currentExo) return;

        const currentIndex = filteredExos.findIndex((exo: Exo) => exo.title === currentExo.title);
        const newIndex = currentIndex + offset;

        if (newIndex < 0 || newIndex >= filteredExos.length) return;

        set({ currentExo: filteredExos[newIndex] });
    },
}));

export default useStore;
