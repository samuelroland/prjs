// Global shortcuts system
// It enables the definitions of shortcuts for a given page
import {Key, useInput} from 'ink';
import useStore from './store.js';
import type {Shortcut} from './types.js';
import {debug} from './util.js';

export const shortcuts: Shortcut[] = [
	{
		pattern: '?',
		action: s => s.setPage('help'),
		description: 'View help page',
	},
	{
		pattern: 'escape',
		pages: ['list'],
		action: s => s.setSearchBarVisibility(false),
		description: 'Escape search bar',
	},
	{
		pattern: 'escape',
		pages: ['train'],
		action: s => {
			debug('setpagelist exo escape');
			s.setPage('list');
		},
		description: 'Escape exo details',
	},
	{
		pattern: 'escape',
		pages: ['help'],
		action: s => s.backToPreviousPage(),
		description: 'Escape help page',
	},
	{
		pattern: 'return',
		pages: ['list'],
		action: s => {
			debug('setpagelist');
			s.setPage('train');
		},
		description: 'Enter a selected exo',
	},
	{
		pattern: 'j',
		pages: ['list'],
		action: s => s.changeIndexInList(1),
		description: 'Next item',
	},
	{
		pattern: 'k',
		pages: ['list'],
		action: s => s.changeIndexInList(-1),
		description: 'Previous item',
	},
	{
		pattern: 'h',
		pages: ['list'],
		action: s => s.switchToList(0),
		description: 'Switch to files list',
	},
	{
		pattern: 'l',
		pages: ['list'],
		action: s => s.switchToList(1),
		description: 'Switch to exos list',
	},
	{
		pattern: 'f',
		action: s => s.setSearchBarVisibility(true),
		description: 'Find exo by title',
	},
	{
		pattern: 'm',
		action: _ => {
			debug('hey there shortcut !');
		},
		description: 'TMPPPP',
	},
];

export function listenForShortcuts() {
	const store = useStore();

	useInput((input, key: Key) => {
		// Build the pattern to support modifiers
		// Example: 't' has no modifier but 'ctrl+t' has input=t and key.ctrl=true,
		// we need to build a unique string with this to easily search for it
		// with a modifier (escape, ctrl, shift, ...), a '+'
		let pattern = input.trim();
		if (pattern.length > 2) return; //this is probably pasted text not a keyboard shortcut
		for (const modifier of Object.keys(key)) {
			// @ts-ignore
			if (key[modifier] === true) {
				if (modifier == 'shift') return; //we have a mysterious shift modifier enabled even if it is not
				pattern = modifier + (pattern.length == 0 ? '' : '+') + pattern;
				debug('pattern ' + pattern);
				break;
			}
		}

		// Disable all shortcuts (except escape) when search bar is enabled
		if (store.list.showSearchBar && pattern != 'escape') return;

		debug('managing shortcut: ' + pattern);
		const foundShortcuts = shortcuts.filter(sc => sc.pattern === pattern);
		if (foundShortcuts.length == 0) return;

		// Loop over all found shortcuts, if no pages constraint are given, the first one is ran
		// if some pages constraint exists make sure to apply it
		for (const sc of foundShortcuts) {
			if (!sc.pages || (sc.pages && sc.pages.includes(store.page))) {
				debug('found action for shortcut: ' + pattern);
				sc.action(store);
				return;
			}
		}
	});
}
