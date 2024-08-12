import React, { ReactNode } from 'react';
import { Box, Text } from 'ink';
import ExosList from './ExosList.js';
import Home from './Home.js';
import Header from './Header.js';
import ExoDetails from './ExoDetails.js';
import Help from './Help.js';
import useStore, { Store } from './store.js';
import { listenForShortcuts, shortcuts } from './shortcuts.js';
import { useEffect } from 'react';
import { useScreenSize } from './hooks/useScreenSize.js';

var globalDebugMode: boolean = false
// Some util functions
import fs from 'fs';
import util from 'util';
export function debug(...d: any) {
	if (!globalDebugMode) return
	let append = '';
	for (const v of d) {
		append += util.format(v) + '\n';
	}
	fs.appendFileSync('debug.log', append + '\n');
}

export default function App({ debugMode }: { debugMode?: boolean }) {
	globalDebugMode = debugMode ?? false
	const store: Store = useStore();
	useEffect(() => {
		store.start(debugMode ?? false);
		return () => {
			store.stop()
		}
	}, []);

	listenForShortcuts();

	const terminalHeight = useScreenSize().height;

	const pages = new Map<string, (store: Store) => ReactNode>();
	pages.set('home', () => <Home />);
	pages.set('list', store => (
		<ExosList showSearchBar={store.showSearchBar}></ExosList>
	));
	pages.set('train', store => (
		<ExoDetails exo={store.getCurrentExo()}></ExoDetails>
	));
	pages.set('help', () => <Help height={terminalHeight - 2} shortcuts={shortcuts}></Help>);

	const currentPage = pages.get(store.page);

	return (
		<Box flexDirection="column" width="100%" height='100%'>
			<Header debugMode={globalDebugMode}></Header>
			<Box height='100%' width='100%'>
				{currentPage != undefined ? (
					currentPage(store)
				) : (
					<Text>Unknown page to render: ??{store.page}</Text>
				)}
			</Box>
		</Box>
	);
}
