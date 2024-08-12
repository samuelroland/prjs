import React from 'react';
import { Box, Spacer, Text } from 'ink';
import ProgressBar from './ProgressBar.js';
import { get } from 'node-emoji';
import { SearchBar } from './SearchBar.js';
import useStore from './store.js';
import { LOGO_COLORS } from './util.js';
import { debug } from './App.js';
import PartialList from './PartialList.js';
import { useScreenSize } from './hooks/useScreenSize.js';

interface ExosListProps {
	showSearchBar: boolean;
}

export default function ExosList({ showSearchBar }: ExosListProps) {
	const store = useStore();

	const LIST_HEIGHT = useScreenSize().height - 4 // 3 lines at the top, 1 at the bottom
	const progress = store.getProgress();
	const files = useStore(store => store.getAllFiles());
	const filteredExos = useStore(store => store.getFilteredExos());
	const times = useStore(s => s.reloadTimes);

	debug('rendered exoslist !');
	return (
		<>
			<Box flexDirection="row">
				<Text color="green" bold>
					Exos list {times}
				</Text>
				<Spacer />
				<Box flexDirection="row" justifyContent="flex-end">
					<Box width={'50'}>{showSearchBar ? <SearchBar /> : ''}</Box>
				</Box>
			</Box>

			<Box height="100%" >
				{/*Skill list*/}
				<PartialList list={files.map(f => (
					<Text>
						{get(f.state == 'pass' ? 'white_check_mark' : 'x')}
						{' ' + f.filename}
					</Text>
				))}
					height={LIST_HEIGHT}
					selectionEnabled={true}
					selectedIndex={store.currentFileIndex}
					emptyListMessage={store.runner.starting ? 'info:Vitest is starting...'
						: (!store.runner.started ? 'error:Vitest start has failed...' : 'info:Vitest found no test in this folder...')}
				></PartialList>

				{/*Exos list*/}
				<PartialList list={filteredExos.map((e, i) => (
					<Text>
						{
							i >= files.length ? ' ' : ''
							/*Fix alignement issue caused by emoji length on the files list that is 1 char longer that measured by Ink. We add an extra space to the following lines to realign the list.*/
						}
						{i + 1}. {get(e.state == 'pass' ? 'white_check_mark' : 'x')}
						{' ' + e.title}
					</Text>
				))}
					height={LIST_HEIGHT}
					selectionEnabled={store.listNumber == 1}
					selectedIndex={store.currentExoIndex}
					emptyListMessage={filteredExos.length == 0 && !store.runner.starting && store.search?.trim() != ''
						? 'No exo matched this search...'
						: 'No exo found in this suite'}
				></PartialList>
			</Box >
			<ProgressBar percent={progress} />
		</Box>
	);
}
