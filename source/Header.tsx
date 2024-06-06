import React from 'react';
import {Text, Spacer, Box, Newline} from 'ink';
import path from 'path';
import {get} from 'node-emoji';
import Gradient from 'ink-gradient';

export default function Header() {
	return (
		<Box width="100%">
			<Gradient colors={['1ABADB', '18E258']}>
				<Text bold>PRJS</Text>
			</Gradient>
			<Spacer></Spacer>
			<Spacer></Spacer>
			<Text color="#667275">
				{get('file_folder')} {path.basename(process.cwd()) + ' '}
			</Text>
			<Newline></Newline>
		</Box>
	);
}
