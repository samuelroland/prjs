import React, {useState} from 'react';
import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';


export function SearchBar({}) {
	const [input, setInput] = useState('');

	/* useInput((_, key) => {
		if (key.return) {
			setSearchQuery(input);
		}
		if (key.escape) {
		}
	});
 */
	return (
		<Box flexDirection="column" padding={1}>
			<Text>Search: </Text>
			<TextInput value={input} onChange={setInput} />
		</Box>
	);
}
