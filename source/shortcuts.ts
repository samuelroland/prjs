// Global shortcuts system
// It enables the definitions of shortcuts all or specific pages and document them
// to easily show a dynamically generated help page

import {AppProps, Key, useInput} from 'ink';
import useStore, {Store} from './store.js';
import type {Shortcut} from './types.js';
import {debug} from './util.js';
import {useApp} from 'ink';

export const shortcuts: Shortcut[] = [
	{
		pattern: '?',
		action: s => s.setPage('help'),
		description: 'View help page',
	},
	{
		pattern: 'q',
		alt: 'ctrl+c',
		action: properExit,
		description: 'Quit the TUI',
	},
	{
		pattern: 'l',
		pages: ['home'],
		action: s => s.setPage('list'),
		description: 'View list page',
	},
	{
		pattern: 'escape',
		pages: ['list'],
		action: s => {
			 s.setSearchBarVisibility(false);
			 s.updateSearchFilter('');
			},
		description: 'Escape search bar',
	},
	{
		pattern: 'escape',
		pages: ['train'],
		action: s => {
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
			if (!s.list.showSearchBar) {
				s.setPage('train');
			}
		},
		description: 'Enter a selected exo',
	},
	{
		pattern: 'return',
		pages: ['list'],
		action: s => s.setSearchBarVisibility(false),
        description: 'Validate search',
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
		pages: ['list'],
		action: s => s.setSearchBarVisibility(true),
		description: 'Find exo by title',
	},
	{
        pattern: 'n',
        pages: ['train'],
        action: s => s.changeExoInList(1),
        description: 'Next exo',
    },
    {
        pattern: 'p',
        pages: ['train'],
        action: s => s.changeExoInList(-1),
        description: 'Previous exo',
    },
];

// Setup shortcuts detection among the above list, support complex shortcuts with modifiers
// Note: this is working very strangely for some modifiers
// Note: the shift modifier is completly ignored because is incorrectly detected, any keyboard including it in the pattern will be ignored.
// Complex keyboard shortcuts like ctrl+alt+a have not been tested and the order of modifiers maybe not checked in the correct order...

export function listenForShortcuts() {
	const store = useStore();
	const app = useApp();

	useInput((input, key: Key) => {
		// Build the pattern to support modifiers
		// Example: 't' has no modifier but 'ctrl+t' has input=t and key.ctrl=true,
		// we need to build a unique string with this to easily search for it
		// with a modifier (escape, ctrl, shift, ...), a '+'
		let pattern = input.trim();
		if (pattern.length > 2) return; //this is probably pasted text not a keyboard shortcut
		debug('input=: ' + pattern);

		for (const modifier of Object.keys(key)) {
			// @ts-ignore
			if (key[modifier] === true) {
				if (modifier == 'shift') continue; //we have a mysterious shift modifier enabled for all non alphabetic key...
				debug('modifier: ' + modifier + ' is true');
				pattern = modifier + (pattern.length == 0 ? '' : '+') + pattern;
				debug('pattern ' + pattern);
				break;
			}
		}

		// Disable all shortcuts (except escape) when search bar is enabled
		if (store.list.showSearchBar && !['escape', 'return'].includes(pattern)) return;

		debug('final shortcut pattern: ' + pattern);
		const foundShortcuts = shortcuts.filter(
			sc => sc.pattern === pattern || sc.alt === pattern,
		);
		if (foundShortcuts.length == 0) {
			debug('no shortcut found...');
			return;
		}

		// Loop over all found shortcuts, if no pages constraint are given, the first one is ran
		// if some pages constraint exists make sure to apply it
		for (const sc of foundShortcuts) {
			if (!sc.pages || (sc.pages && sc.pages.includes(store.page))) {
				debug('found action for shortcut: ' + pattern);
				sc.action(store, app);
				return;
			}
		}
	});
}

// Handle exit properly by stopping Vitest instance and calling app.exit() so the full screen mode can exit normally
// More on https://github.com/DaniGuardiola/fullscreen-ink/tree/main?tab=readme-ov-file#exiting-the-app
function properExit(store: Store, app: AppProps) {
	if (store.runner.starting) return; //avoid exiting the app during vitest starting because it will never close
	store.stop().then(() => {
		debug('store.stop() end');
		app.exit();
	});
}
