#!/usr/bin/env node
import React from 'react';
import meow from 'meow';
import App from './App.js';
import { withFullScreen } from 'fullscreen-ink';
import Help from './Help.js';
import { render, Text, Box, Newline } from 'ink';
import { shortcuts } from './shortcuts.js';
import { DEFINITION, NAME, SUBDEF, LOGO_COLORS } from './util.js';
import Gradient from 'ink-gradient';

const INTRO = NAME + ' - ' + DEFINITION;

const cli = meow(
	// Supported flags
	{
		autoHelp: false, //we want to manage ourself the help (to add -h alias)
		autoVersion: false,//we want to manage ourself the version (to add -v alias)
		importMeta: import.meta,
		flags: {
			help: {
				shortFlag: 'h', //just to create an alias -h
			},
			version: {
				shortFlag: 'v', //just to create an alias -v
			},
			debug: { // --debug
				shortFlag: 'd', // create an alias -d
			},
		},
	},
);

const HELP =
	'\nUsage' +
	'\n$ prjs' +
	'\n\nOptions' +
	'\n -v, --version: Show version' +
	'\n -h, --help: Show this help' +
	'\n -d, --debug: Enable debug mode'

if (cli.flags.help) {
	// Show the help
	render(
		<>
			<Box paddingX={2} paddingY={1} flexDirection='column'>
				<Gradient colors={LOGO_COLORS}>
					<Text bold>{INTRO}</Text>
				</Gradient>
				<Gradient colors={LOGO_COLORS}>
					<Text bold>{SUBDEF}</Text>
				</Gradient>
				<Text color='magenta'>{HELP}</Text>
				<Text> </Text>
				<Help full={true} height={0} shortcuts={shortcuts} />
			</Box>
		</>,
	);
} else if (cli.flags.version) {
	console.log(NAME + ' v' + cli.pkg.version);
} else {

	const debugMode = cli.flags.debug === true ? true : false
	// Start TUI in fullscreen mode, or output other information and quit
	// We don't want to exit on Ctrl+C because we want to manage exit ourself via our shortcut
	withFullScreen(<App debugMode={debugMode} />, { exitOnCtrlC: false }).start();
	// Note: to easily runtime errors and their stack traces, use this line instead
	// render(<App debugMode={debugMode} />, { exitOnCtrlC: false });
}
