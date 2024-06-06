import React from 'react';
import {Text, Box} from 'ink';
import {Shortcut} from './types.js';

export default function Help({shortcuts}: {shortcuts: Shortcut[]}) {
	// TODO: categorize shortcuts in 4 categories (pages): all, help, list, exo and show them one section after the other
	// without code duplication
	// TODO: show the list as arrays (without any border), the first column is the pattern (in color), second is the description. To show arrays easily, search for a table plugin...
	return (
		<Box flexDirection="column">
			<Text color="green" bold>
				Shortcuts
			</Text>
			{shortcuts.map((shortcut, index) => (
				<Text key={index}>
					Press '{shortcut.pattern}' to {shortcut.description}.
				</Text>
			))}
		</Box>
	);
}
