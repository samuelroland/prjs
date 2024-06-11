// Some constants
export const LOGO_COLORS: [string, string] = ['#1ABADB', '#18E258'];
export const ASCII_ART =
	'████████  ████████        ██  ██████  \n██     ██ ██     ██       ██ ██    ██ \n██     ██ ██     ██       ██ ██       \n████████  ████████        ██  ██████  \n██        ██   ██   ██    ██       ██ \n██        ██    ██  ██    ██ ██    ██ \n██        ██     ██  ██████   ██████  ';
export const NAME = 'PRJS';
export const DEFINITION = 'Practice Runner for JavaScript';
export const SUBDEF =
	'Run small JS exos in your terminal with instant feedback';
// Some util functions
import fs from 'fs';
import util from 'util';
export function debug(...d: any) {
	let append = '';
	for (const v of d) {
		append += util.format(d) + '\n';
	}
	fs.appendFileSync('debug.log', append + '\n');
}
