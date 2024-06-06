#!/usr/bin/env node
import React from 'react';
import meow from 'meow';
import App from './App.js';
import {withFullScreen} from 'fullscreen-ink';
import Help from './Help.js';
import {render, Text, Box} from 'ink';
import {shortcuts} from './shortcuts.js';

const CLI_NAME = 'PRJS';
const INTRO = CLI_NAME + ' - Practice Runner for JavaScript';

const cli = meow(
	INTRO +
		// TODO: refactor those constants in util.ts
		'\nRun small JS exos in your terminal with instant feedback loop\n' +
		'\nUsage' +
		'\n$ prjs' +
		'\n\nOptions' +
		'\n -v, --version: Show version' +
		'\n -h, --help: Show this help',
	// Examples
	//   $ prjs --name=Jane
	//   Hello, Jane

	// Supported flags
	{
		autoHelp: false, //we want to manage ourself the help (to add -h alias)
		importMeta: import.meta,
		flags: {
			help: {
				alias: 'h', //just to create an alias -h
			},
		},
	},
);

// Redefine version display to include CLI name
cli.showVersion = () => {
	console.log(CLI_NAME + ': v' + cli.pkg.version);
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
	// Start TUI in fullscreen mode, or output other information and quit
	withFullScreen(<App />, {exitOnCtrlC: false}).start();
}
