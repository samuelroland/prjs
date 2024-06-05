import React, {useState} from 'react';
import {Box, useInput, Key} from 'ink';
import {ExosList} from './ExosList.js';
import {Header} from './Header.js';
import {ExoDetails} from './ExoDetails.js';
import type {Exo} from './types.js';

export default function App({}) {
	const [mode, setMode] = useState('list');

	// Sample exo object with error details
	const sampleExo: Exo = {
		title: 'hugeArray: get huge array filled with x',
		state: 'fail',
		errors: [
			{
				message: 'undefined return value',
				actual: 'undefined',
				expected: '[1, 2, 3, 4, 5]',
			},
		],
	};

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
					<ExoDetails exo={sampleExo}></ExoDetails>
				</Box>
			)}
		</Box>
	);
}
