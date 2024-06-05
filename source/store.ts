// Global store to manage all the state of PRJS, with the help of zustand
// The store can be easily accessed in any components by importing useStore() and const store = useStore();

import {create} from 'zustand';
import {Exo, ExoFile, Page} from './types.js';
import {Runner} from './Runner.js';
import fs from 'fs';
import util from 'util';

// TODO: remove this debug function writing to a log file...
const log = function (d: any) {
	fs.appendFileSync('debug.log', util.format(d) + '\n');
};

export type State = {
	page: Page;
	list: {
		index: number;
		selectionIndexes: {[key: number]: number};
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
	start: (s: State) => void;
	setPage: (page: Page) => void;
	backToPreviousPage: () => void;
	getProgress: () => number;
};

export type Store = State & Action;

// Create your store, which includes both state and (optionally) actions
const useStore = create<Store>((set: any) => ({
	//Global state
	page: 'list',
	previousPage: 'list',
	list: {
		index: 0,
		selectionIndexes: {0: 0, 1: 0},
		showSearchBar: false,
	},
	files: [],
	currentFile: null,
	exos: [],
	currentExo: null,
	runner: new Runner(),
	started: false,

	//Actions
	start: async s => {
		set({started: true});
		log('starting vitest');
		await s.runner.startVitest();
		log('setting files');
		set({files: s.runner.getFiles()});
		log('got ' + s.files.length + ' files');
		set({currentFile: s.runner.currentFile});
		set({exos: s.runner.getCurrentExos(s.runner.getFiles()[0]?.path ?? '')});
	},
	setPage: (page: Page) => set({page: page, previousPage: store.page}),
	backToPreviousPage: () => store.setPage(store.previousPage),

	getProgress() {
		// const totalExos = exos.length;
		// const passedExos = exos.filter(e => e.state === 'pass').length;
		// const progress = totalExos > 0 ? (passedExos / totalExos) * 100 : 0;
		return 24;
	},
}));

const store: Store = useStore();

export default useStore;