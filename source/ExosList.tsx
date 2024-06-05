import React from 'react';
import {Box, Spacer, Text} from 'ink';
import ProgressBar from './ProgressBar.js';
import {get} from 'node-emoji';
import {SearchBar} from './SearchBar.js';
import useStore from './store.js';

interface ExosListProps {
	showSearchBar: boolean;
}

export function ExosList({showSearchBar}: ExosListProps) {
	const store = useStore();
	const progress = store.getProgress();
	return (
		<>
			<Box flexDirection="row" alignItems="center">
				<Text color="green" bold>
					Exos list {store.list.index}
				</Text>
				<Spacer />
				<Box flexDirection="row" justifyContent="flex-end">
					<Text>Search: </Text>
					<Box width={'50'}>{showSearchBar ? <SearchBar /> : ''}</Box>
				</Box>
			</Box>
			{/* TODO: refactor this list duplication ! */}
			<Box>
				<Box flexDirection="column" padding={1}>
					{store.files.map((f, i) => (
						<Text
							key={f.path}
							backgroundColor={
								store.list.index == 0 &&
								store.list.selectionIndexes[store.list.index] == i
									? '#0befae'
									: ''
							}
							color={
								store.list.index == 0 &&
								store.list.selectionIndexes[store.list.index] == i
									? 'black'
									: ''
							}
							wrap="truncate-end"
						>
							{get(f.state == 'pass' ? 'white_check_mark' : 'x')}
							{f.filename}
						</Text>
					))}
					{store.files.length == 0 && (
						<Text color={'red'}>No test found in this folder...</Text>
					)}
				</Box>
				<Box flexDirection="column" padding={1}>
					{store.exos.map((e, i) => (
						<Text
							key={e.title}
							backgroundColor={
								store.list.index == 1 &&
								store.list.selectionIndexes[store.list.index] == i
									? '#0befae'
									: ''
							}
							color={
								store.list.index == 1 &&
								store.list.selectionIndexes[store.list.index] == i
									? 'black'
									: ''
							}
							wrap="truncate-end"
						>
							{i + 1}. {get(e.state == 'pass' ? 'white_check_mark' : 'x')}
							{e.title}
						</Text>
					))}
				</Box>
			</Box>
			<Box marginTop={1}>
				<Text>Progress: </Text>
				<ProgressBar percent={progress} />
			</Box>
		</>
	);
}
