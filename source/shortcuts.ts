// Global shortcuts system
// It enables the definitions of shortcuts for a given page
import {Key, useInput} from 'ink';
import useStore, {Store} from './store.js';
import type {Shortcut} from './types.js';
const store = useStore();

export const shortcuts: Shortcut[] = [
	{
		pattern: '?',
		action: () => store.setPage('help'),
		description: 'View help page',
	},
	{
		pattern: 'escape',
		pages: ['list'],
		action: () =>
			store.list.showSearchBar ? (store.list.showSearchBar = false) : null,
		description: 'Escape search bar',
	},
	{
		pattern: 'escape',
		pages: ['exo'],
		action: () => store.setPage('list'),
		description: 'Escape exo details',
	},
	{
		pattern: 'escape',
		pages: ['help'],
		action: () => store.backToPreviousPage(),
		description: 'Escape help page',
	},
	{
		pattern: 'return',
		pages: ['list'],
		action: () => store.setPage('exo'),
		description: 'Enter a selected exo',
	},
	{
		pattern: 'j',
		pages: ['list'],
		action: () => changeIndexInList(store, 1),
		description: 'Next item',
	},
	{
		pattern: 'k',
		pages: ['list'],
		action: () => changeIndexInList(store, -1),
		description: 'Previous item',
	},
	{
		pattern: 'h',
		pages: ['list'],
		action: () => (store.list.index = 0),
		description: 'Switch to files list',
	},
	{
		pattern: 'l',
		pages: ['list'],
		action: () => (store.list.index = 1),
		description: 'Switch to exos list',
	},
	{
		pattern: 'f',
		action: () => {
			if (store.list.showSearchBar) return;
			store.list.showSearchBar = true;
		},
		description: 'Find exo by title',
	},
];

export function listenForShortcuts() {
	useInput((input, key: Key) => {
		// Build the pattern to support modifiers
		// Example: 't' has no modifier but 'ctrl+t' has input=t and key.ctrl=true,
		// we need to build a unique string with this to easily search for it
		// with a modifier (escape, ctrl, shift, ...), a '+' if ke
		let pattern = input;
		for (const modifier of Object.keys(key)) {
			// @ts-ignore
			if (key[modifier] === true) {
				pattern = modifier + (pattern.length == 0 ? '' : '+') + pattern;
			}
		}

		const foundShortcuts = shortcuts.filter(sc => sc.pattern === pattern);
		if (foundShortcuts.length == 0) return;

		// Loop over all found shortcuts, if no pages constraint are given, the first one is ran
		// if some pages constraint exists make sure to apply it
		for (const s of foundShortcuts) {
			if (!s.pages || (s.pages && s.pages.includes(store.page))) {
				s.action();
				return;
			}
		}
	});
}

function changeIndexInList(store: Store, offset: number) {
	const current: number = store.list.selectionIndexes[store.list.index] ?? 0;
	const max: number =
		store.list.index == 0 ? store.files.length : store.exos.length;
	if (offset + current >= max || offset + current < 0) return;

	store.list.selectionIndexes[store.list.index] += offset;
}
