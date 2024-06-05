import React from 'react';
import {Text, Box} from 'ink';
import {Shortcut} from './types.js';

export default function Help({shortcuts}: {shortcuts: Shortcut[]}) {
	// TODO: categorize shortcuts in 4 categories (pages): all, help, list, exo and show them one section after the other
	// without code duplication
	
	return (
		<Box flexDirection="column" padding={1}>
			<Text color="green" bold>
				Help Page
			</Text>
			{shortcuts.map((shortcut, index) => (
				<Text key={index}>
					Press '{shortcut.pattern}' to {shortcut.description}.
				</Text>
			))}
		</Box>
	);
}
