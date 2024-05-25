import React, {useState} from 'react';
import {Text, Box, useInput, Key} from 'ink';
import {ExosList} from './ExosList.js';
import {Header} from './Header.js';

export default function App({}) {
	const [mode, setMode] = useState('list');

	useInput((_, key: Key) => {
		if (key.return) {
			setMode('exo');
		}
		if (key.escape) {
			setMode('list');
		}
	});

	return (
		<Box flexDirection="column" width="100%">
			<Header></Header>
			{mode == 'list' ? (
				<Box flexDirection="column">
					<ExosList></ExosList>
				</Box>
			) : (
				<Box flexDirection="column">
					<Text color="blue">exo details !</Text>
				</Box>
			)}
		</Box>
	);
}
