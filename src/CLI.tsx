#!/usr/bin/env node
import React from 'react';
import meow from 'meow';
import App from './App.js';
import { withFullScreen } from 'fullscreen-ink';
import Help from './Help.js';
import { render, Text, Box } from 'ink';
import { shortcuts } from './shortcuts.js';
import { DEFINITION, NAME, SUBDEF } from './util.js';

const INTRO = NAME + ' - ' + DEFINITION;

const cli = meow(
	INTRO +
	'\n' +
	SUBDEF +
	'\n' +
	'\nUsage' +
	'\n$ prjs' +
	'\n\nOptions' +
	'\n -v, --version: Show version' +
	'\n -h, --help: Show this help' +
	'\n -d, --debug: Enable debug mode',

	// Supported flags
	{
		autoHelp: false, //we want to manage ourself the help (to add -h alias)
		importMeta: import.meta,
		flags: {
			help: {
				shortFlag: 'h', //just to create an alias -h
			},
			debug: { // --debug
				shortFlag: 'd', // create an alias -d
			},
		},
	},
);

// Redefine version display to include CLI name
cli.showVersion = () => {
	console.log(NAME + ': v' + cli.pkg.version);
};

if (cli.flags.help) {
	// Show the help
	render(
		<>
			<Text>{cli.help}</Text>
			<Box paddingX={2}>
				<Help shortcuts={shortcuts} />
			</Box>
		</>,
	);
} else {

	const debugMode = cli.flags.debug === true ? true : false
	// Start TUI in fullscreen mode, or output other information and quit
	// We don't want to exit on Ctrl+C because we want to manage exit ourself via our shortcut
	withFullScreen(<App debugMode={debugMode} />, { exitOnCtrlC: false }).start();
	// Note: to easily runtime errors and their stack traces, use this line instead
	// render(<App debugMode={debugMode} />, { exitOnCtrlC: false });
}
