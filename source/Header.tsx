import React from 'react';
import {Text, Spacer, Box, Newline} from 'ink';
import path from 'path';
import {get} from 'node-emoji';

export function Header() {
	return (
		<Box width="100%">
			<Text bold color="#20a8c3">
				PRJS
			</Text>
			<Spacer></Spacer>
			<Spacer></Spacer>
			<Text color="#667275">
				{get('file_folder')} {path.basename(process.cwd()) + ' '}
			</Text>
			<Newline></Newline>
		</Box>
	);
}
