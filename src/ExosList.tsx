import React, { useEffect } from 'react';
import { Box, Spacer, Text } from 'ink';
import ProgressBar from './ProgressBar.js';
import { get } from 'node-emoji';
import { SearchBar } from './SearchBar.js';
import useStore from './store.js';
import { LOGO_COLORS } from './util.js';
import { debug } from './App.js';

interface ExosListProps {
	showSearchBar: boolean;
}

export default function ExosList({ showSearchBar }: ExosListProps) {
	const store = useStore();

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
			{/* TODO: refactor this list duplication !
			with a new component StoreList passing as props: emptyError, listIndex, elements (as a ReactNode[])
			note: elements are rendered here (like files.map(f => <Text>{f.filename}</Text>) )
			so we can customize the rendering of the line, but selection
			highlighting and error showingj should be managed
			*/}
			<Box display="flex" height="100%" flexDirection="column">
				<Box>
					<Box flexDirection="column" padding={1}>
						{files.map((f, i) => (
							<Text
								key={f.path}
								backgroundColor={store.currentFileIndex == i ? '#0befae' : ''}
								color={store.currentFileIndex == i ? 'black' : ''}
								wrap="truncate-end"
							>
								{get(f.state == 'pass' ? 'white_check_mark' : 'x')}
								{' ' + f.filename}
							</Text>
						))}
						<Text color={LOGO_COLORS[1]}>
							{store.runner.starting && 'Vitest is starting...'}
						</Text>
						<Text color={LOGO_COLORS[1]}>
							{!store.runner.starting &&
								!store.runner.started &&
								'Vitest start has failed...'}
						</Text>
						{files.length == 0 && (
							<Text color={'red'}>
								{!store.runner.starting &&
									'Vitest found no test in this folder...'}
							</Text>
						)}
					</Box>
					<Box flexDirection="column" padding={1}>
						{filteredExos.map((e, i) => (
							<Text
								key={e.uid}
								backgroundColor={
									store.listNumber == 1 && store.currentExoIndex == i
										? '#0befae'
										: ''
								}
								color={
									store.listNumber == 1 && store.currentExoIndex == i
										? 'black'
										: ''
								}
								wrap="truncate-end"
							>
								{
									i >= files.length ? ' ' : ''
									/*Fix alignement issue caused by emoji length on the files list that is 1 char longer that measured by Ink. We add an extra space to the following lines to realign the list.*/
								}
								{i + 1}. {get(e.state == 'pass' ? 'white_check_mark' : 'x')}
								{' ' + e.title}
							</Text>
						))}
						{filteredExos.length == 0 && !store.runner.starting && (
							<Text color="gray">
								{store.search?.trim() != ''
									? 'No exo matched this search...'
									: 'No exo found in this suite'}
							</Text>
						)}
					</Box>
				</Box>
				<Spacer />
				<Box marginTop={1}>
					<Text>Progress: </Text>
					<ProgressBar percent={progress} />
				</Box>
			</Box>
		</>
	);
}
