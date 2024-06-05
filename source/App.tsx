import React, {useState} from 'react';
import {Box, useInput, Key} from 'ink';
import {ExosList} from './ExosList.js';
import {Header} from './Header.js';
import {ExoDetails} from './ExoDetails.js';
import type {Exo} from './types.js';
import Help from './Help.js';

type Shortcut = {
    key: string;
    action: () => void;
    description: string;
};

export default function App({}) {
	const [mode, setMode] = useState('list');
	// const [selectedExo, setSelectedExo] = useState(null);

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

	// Selection of exercices
	// const selectExo = (exo) => {
	// 	setSelectedExo(exo);
	// 	setMode('exo');
	// };

	const [prevMode, setPrevMode] = useState('list');
	const shortcuts: Shortcut[] = [
        {
            key: '?',
            action: () => setMode('help'),
            description: "View help page"
        },
        {
            key: 'escape',
            action: () => setMode(prevMode),
            description: "Go back"
        },
        {
            key: 'j',
            action: () => { /* Add logic for next item */ },
            description: "Next item"
        },
        {
            key: 'k',
            action: () => { /* Add logic for previous item */ },
            description: "Previous item"
        },
        {
            key: 'h',
            action: () => { /* Add logic for switch to files list */ },
            description: "Switch to files list"
        },
        {
            key: 'l',
            action: () => { /* Add logic for switch to exos list */ },
            description: "Switch to exos list"
        },
		{
			key: 'f',
			action: () => { setMode('find') },
			description: "Find exercice"
		}
    ];

	// useInput((_, key: Key) => {
	// 	if (key.return) {
	// 		setMode('exo');
	// 	}
	// 	if (key.escape) {
	// 		setMode('list');
	// 	}
	// });
	// useInput((input, key: Key) => {
	// 	if (input === '?') {
	// 		setMode('help');
	// 	}
	// 	if (key.return) {
	// 		setMode('exo');
	// 	}
	// 	if (key.escape) {
	// 		setMode('list');
	// 	}
	// });
	useInput((input, key: Key) => {
		const shortcut = shortcuts.find(sc => sc.key === input);
		if (shortcut) {
            setPrevMode(mode);
            shortcut.action();
        }
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
			{mode === 'list' && (
				<ExosList></ExosList>
            )}
			{mode === 'exo' && (
				<ExoDetails exo={sampleExo}></ExoDetails>
            )}
			{mode === 'help' && (
                <Help shortcuts={shortcuts}></Help>
            )}
		</Box>
	);
}
