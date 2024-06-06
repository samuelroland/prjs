import {Box, Text, Newline} from 'ink';
import Gradient from 'ink-gradient';
import React from 'react';
import useStore from './store.js';
import {LOGO_COLORS} from './util.js';

export default function Home() {
	const store = useStore();
	const prjsVersion = 'v0.1.0';
	return (
		<Box
			display="flex"
			height={'100%'}
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
		>
			<Box margin={2}>
				<Gradient colors={LOGO_COLORS}>
					{
						'████████  ████████        ██  ██████  \n██     ██ ██     ██       ██ ██    ██ \n██     ██ ██     ██       ██ ██       \n████████  ████████        ██  ██████  \n██        ██   ██   ██    ██       ██ \n██        ██    ██  ██    ██ ██    ██ \n██        ██     ██  ██████   ██████  '
					}
				</Gradient>
			</Box>
			<Box
				display="flex"
				justifyContent="center"
				flexDirection="column"
				alignItems="center"
				alignSelf="center"
			>
				<Gradient colors={LOGO_COLORS}>
					<Text bold>Practice Runner for JavaScript</Text>
				</Gradient>
				<Newline></Newline>
				<Gradient colors={LOGO_COLORS}>
					<Text>Run small JS exos in your terminal with instant feedback</Text>
				</Gradient>
				<Gradient colors={LOGO_COLORS}>
					<Text> and delightful errors printing</Text>
				</Gradient>
				<Newline></Newline>
				<Text dimColor={true}>Type ? to show all shortcuts</Text>
				<Text dimColor={true}>Type l to show the exo lists</Text>
				<Text dimColor={true}>Version: {prjsVersion}</Text>
				<Text dimColor={true}>Git repository: Coming soon</Text>
				{/* <Text>License: TODO</Text> */}
				{/* <Text>Website: TODO</Text> */}
			</Box>
		</Box>
	);
}
