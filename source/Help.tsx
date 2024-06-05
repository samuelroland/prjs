import React from 'react';
import {Text, Box} from 'ink';
import {Shortcut} from './types.js';

export default function Help({shortcuts}: {shortcuts: Shortcut[]}) {
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
