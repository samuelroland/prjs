import React, {ReactNode} from 'react';
import {Box, Text} from 'ink';
import ExosList from './ExosList.js';
import Home from './Home.js';
import Header from './Header.js';
import ExoDetails from './ExoDetails.js';
import Help from './Help.js';
import useStore, {State, Store} from './store.js';
import {listenForShortcuts, shortcuts} from './shortcuts.js';
import {useEffect} from 'react';

export default function App({}) {
	const store: Store = useStore();
	useEffect(() => {
		store.start(store);
	}, []);

	listenForShortcuts();

	const pages = new Map<string, (state: State) => ReactNode>();
	pages.set('home', () => <Home />);
	pages.set('list', (state: State) => (
		<ExosList showSearchBar={state.list.showSearchBar}></ExosList>
	));
	pages.set('train', state => <ExoDetails exo={state.currentExo}></ExoDetails>);
	pages.set('help', () => <Help shortcuts={shortcuts}></Help>);

	const currentPage = pages.get(store.page);
	return (
		<Box flexDirection="column" width="100%">
			<Header></Header>
			{currentPage != undefined ? (
				currentPage(store)
			) : (
				<Text>Unknown page to render: ??{store.page}</Text>
			)}
		</Box>
	);
}
