import { Box, Text, Newline } from 'ink';
import Gradient from 'ink-gradient';
import React from 'react';
import { debug } from './App.js';
import { LOGO_COLORS, ASCII_ART, DEFINITION, SUBDEF } from './util.js';
import fs from 'fs';

export default function Home() {
	let semver = '?';
	try {
		semver = JSON.parse(
			fs.readFileSync(new URL('../package.json', import.meta.url)).toString(),
		).version;
	} catch (error) {
		debug('error reading package.json + ' + error);
	}
	const prjsVersion = 'v' + semver;

	return (
		<Box
			display="flex"
			height={'100%'}
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
		>
			<Box margin={2}>
				<Gradient colors={LOGO_COLORS}>{ASCII_ART}</Gradient>
			</Box>
			<Box
				display="flex"
				justifyContent="center"
				flexDirection="column"
				alignItems="center"
				alignSelf="center"
			>
				<Box>
					<Gradient colors={LOGO_COLORS}>
						<Text bold>{DEFINITION}</Text>
					</Gradient>
					<Text> - </Text>
					<Text color={LOGO_COLORS[0]}>{prjsVersion}</Text>
				</Box>
				<Newline></Newline>
				<Gradient colors={LOGO_COLORS}>
					<Text>{SUBDEF}</Text>
				</Gradient>
				<Text dimColor={true}>Project: Coming soon</Text>
				{/* <Text>License: TODO</Text> */}
				{/* <Text>Website: TODO</Text> */}
				<Newline></Newline>
				<Text bold>Quick help</Text>
				<Text dimColor={true}>Type ? to show all shortcuts</Text>
				<Text dimColor={true}>Type l to show the exo lists</Text>
				<Text dimColor={true}>Type q to quit</Text>
			</Box>
		</Box>
	);
}
