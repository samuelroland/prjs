import React from 'react';
import { Text, Spacer, Box, Newline } from 'ink';
import path from 'path';
import { get } from 'node-emoji';
import Gradient from 'ink-gradient';
import { LOGO_COLORS } from './util.js';

export default function Header({ debugMode }: { debugMode: boolean }) {
	return (
		<Box width="100%">
			<Gradient colors={LOGO_COLORS}>
				<Text bold>PRJS</Text>
			</Gradient>
			{debugMode && <>
				<Spacer></Spacer>
				<Text backgroundColor='red' color='black' bold={true}> DEBUG </Text>
			</>}
			<Spacer></Spacer>
			<Text color="#667275">
				{get('file_folder')} {path.basename(process.cwd()) + ' '}
			</Text>
			<Newline></Newline>
		</Box>
	);
}
