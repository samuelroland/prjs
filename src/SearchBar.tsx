import React from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import useStore from './store.js';

export function SearchBar({ }) {
	const store = useStore();
	const search = useStore(state => state.search);

	return (
		<Box flexDirection="row">
			<Text>Search: </Text>
			<TextInput
				value={search}
				onChange={a => store.updateSearchFilter(a)}
				placeholder="Enter a search keyword"
				onSubmit={() => store.setSearchBarVisibility(false)}
			/>
		</Box>
	);
}
