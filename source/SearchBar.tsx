import React, {useState} from 'react';
import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';

export function SearchBar({}) {
	const [input, setInput] = useState('');

	// TODO: import the store, create and call a method updateSearchFilter() on change
	// store the filter in the store so we can reuse it when coming back on list
	// and finally apply rewrite field exos after filter 
	// (-> maybe a specific method on the store like reloadExos() to reassign exos and apply the filter if present)

	// TODO: the goal is to have a live update like Vitest does

	return (
		<Box flexDirection="row">
			<Text>Search: </Text>
			<TextInput
				value={input}
				onChange={setInput}
				placeholder="Enter a search keyword"
			/>
		</Box>
	);
}
