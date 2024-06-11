import React, {useState, useEffect} from 'react';
import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';
import useStore from './store.js';

export function SearchBar({}) {
	const search = useStore(state => state.search);
	const [input, setInput] = useState(search);
	const updateSearchFilter = useStore(state => state.updateSearchFilter);
	const setSearchBarVisibility = useStore(
		state => state.setSearchBarVisibility,
	);
	return (
		<Box flexDirection="row">
			<Text>Search: </Text>
			<TextInput
				value={input}
				onChange={setInput}
				placeholder="Enter a search keyword"
				onSubmit={() => setSearchBarVisibility(false)}
			/>
		</Box>
	);
}
