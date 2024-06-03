import React, {useState} from 'react';
import {Text, Box, useInput, Key} from 'ink';
import {ExosList} from './ExosList.js';
import {Header} from './Header.js';
import {ExoDetails} from './ExoDetails.js';

export default function App({}) {
	const [mode, setMode] = useState('list');
	const [selectedExo, setSelectedExo] = useState(null);

	// Test
	const sampleExo = {
		title: "hugeArray: get huge array filled with x",
		state: "fail",
		errors: [
			{
				message: "undefined return value",
				actual: "undefined",
				expected: "[1, 2, 3, 4, 5]"
			}
		]
	};

	// Selection of exercices
	const selectExo = (exo) => {
		setSelectedExo(exo);
		setMode('exo');
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
					<ExoDetails exo={selectedExo}></ExoDetails>
					// <ExoDetails exo={sampleExo}></ExoDetails>
					// <ExoDetails exo={{title: "hugeArray: get huge array filled with x", state: "fail", errors: ["undefined return value"]}}></ExoDetails>
				</Box>
			)}
		</Box>
	);
}
