import React from 'react';
import {Box, Spacer, Text} from 'ink';
import ProgressBar from './ProgressBar';
import {get} from 'node-emoji';
import {SearchBar} from './SearchBar';
import useStore from './store';
import {LOGO_COLORS} from './util';
import PartialList from './PartialList';
import {useScreenSize} from './hooks/useScreenSize';

interface ExosListProps {
	showSearchBar: boolean;
}

export default function ExosList({showSearchBar}: ExosListProps) {
	const store = useStore();

	const LIST_HEIGHT = useScreenSize().height - 4; // 3 lines at the top, 1 at the bottom
	const WIDTH = useScreenSize().width;
	const progress = store.getProgress();
	const files = useStore(store => store.getAllFiles());
	const filteredExos = useStore(store => store.getFilteredExos());

	return (
		<Box flexDirection="column">
			<Box flexDirection={WIDTH > 70 ? 'row' : 'column'}>
				<Text color={LOGO_COLORS[0]} bold>
					{/* Exos <Text color='gray'>{times}</Text>. Note: in case watch mode doesn't work, display times again... */}
					Exos
				</Text>
				<Spacer />
				<Box
					flexDirection="row"
					justifyContent={WIDTH > 70 ? 'flex-end' : 'flex-start'}
				>
					<Box width={'50'}>{showSearchBar ? <SearchBar /> : ''}</Box>
				</Box>
			</Box>

			<Box height="100%" flexDirection={WIDTH > 70 ? 'row' : 'column'}>
				{/*Skill list*/}
				<PartialList
					list={files.map(f => (
						<Text>
							{' ' + get(f.state == 'pass' ? 'white_check_mark' : 'x')}
							{` ${f.filename} `}
						</Text>
					))}
					height={LIST_HEIGHT}
					selectionEnabled={true}
					selectionIndex={store.currentFileIndex}
					emptyListMessage={
						store.runner.starting
							? 'info:Vitest is starting...'
							: !store.runner.started
								? 'error:Vitest start has failed...'
								: 'info:Vitest found no test in this folder...'
					}
				></PartialList>

				{/*Exos list*/}
				<PartialList
					list={filteredExos.map((e, i) => (
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
					selectionIndex={store.currentExoIndex}
					emptyListMessage={
						filteredExos.length == 0 &&
						!store.runner.starting &&
						store.search?.trim() != ''
							? 'No exo matched this search...'
							: 'No exo found in this suite'
					}
				></PartialList>
			</Box>
			<ProgressBar percent={progress} />
		</Box>
	);
}
