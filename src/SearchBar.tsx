import React from 'react';
import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';
import useStore from './store';
import {LOGO_COLORS} from './util';

export function SearchBar({}) {
	const store = useStore();
	const search = useStore(state => state.search);

	return (
		<Box flexDirection="row" width="100%">
			<Text color={LOGO_COLORS[0]}>Search: </Text>
			<TextInput
				value={search}
				onChange={a => store.updateSearchFilter(a)}
				placeholder="Enter keyword"
				onSubmit={() => store.setSearchBarVisibility(false)}
			/>
		</Box>
	);
}
