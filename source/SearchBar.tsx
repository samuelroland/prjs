import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import TextInput from 'ink-text-input';

export function SearchBar({setSearchQuery, setMode}) {
	const [input, setInput] = useState('');

	useInput((inputKey, key) => {
		if (key.return) {
			setSearchQuery(input);
			setMode('list');
		}
		if (key.escape) {
			setMode('list');
		}
	});

	return (
		<Box flexDirection="column" padding={1}>
			<Text>Search: </Text>
			<TextInput value={input} onChange={setInput} />
		</Box>
	);
}
