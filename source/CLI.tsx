#!/usr/bin/env node
import React from 'react';
import meow from 'meow';
import App from './App.js';
import {withFullScreen} from 'fullscreen-ink';

const CLI_NAME = 'PRJS';
const INTRO = CLI_NAME + ' - Practice Runner for JavaScript';

const cli = meow(
	INTRO +
		'\nRun small JS exos in your terminal with instant feedback loop\n' +
		'\nUsage' +
		'\n$ prjs' +
		'\n\nOptions' +
		'\n -v, --version: Show version',
	// Examples
	//   $ prjs --name=Jane
	//   Hello, Jane

	// Supported flags
	{
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

// Start TUI in fullscreen mode, or output other information and quit
if (cli.flags.help) {
	cli.showHelp();
} else {
	withFullScreen(<App />).start();
}
