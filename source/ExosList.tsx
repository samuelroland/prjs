import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';

// Temporary hard coded tests values
const tests = [
	{
		title: 'can create an empty array',
		expected: [],
	},
	{
		title: 'can create a huge array x elements filled with y',
		args: [100, 6],
		expected: new Array(100).fill(6),
	},
	{
		title: 'can create a huge array x elements filled with y (2)',
		args: [12, 59],
	},
	{
		title:
			'can push back values and remove at front (push 4 times 10 and pop front 2 times)',
		args: [[1, 2, 3], 4, 10, 2],
		expected: [3, 10, 10, 10, 10],
	},
	{
		title: 'can take last element in alphabetic order',
		args: [['cat', 'dog', 'cow', 'chimp', 'chicken']],
		expected: 'dog',
	},
	{
		title: 'can remove element between 2 given values',
		args: [['cat', 'dog', 'cow', 'chimp', 'chicken'], 'dog', 'chimp'],
		expected: ['cat', 'chicken'],
	},
];

export function ExosList({}) {
	const [idx, setIdx] = useState(0); //selected exo index
	const shortcuts = new Map<string, () => void>();
	const changeIndex = (newIdx: number) => {
		if (newIdx >= tests.length || newIdx < 0) return;
		setIdx(newIdx);
	};
	shortcuts.set('j', () => changeIndex(idx + 1));
	shortcuts.set('k', () => changeIndex(idx - 1));

	useInput(input => {
		input = input.trim();
		if (shortcuts.has(input) != undefined) {
			shortcuts.get(input)?.call({});
		}
	});

	return (
		<>
			<Text color="green" bold>
				Exos list
			</Text>
			<Box flexDirection="column" padding={1}>
				{tests.map((t, i) => (
					<Text
						backgroundColor={idx == i ? '#0befae' : ''}
						color={idx == i ? 'black' : ''}
					>
						{i + 1}. {t.title}
					</Text>
				))}
			</Box>
		</>
	);
}
