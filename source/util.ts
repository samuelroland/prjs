// Some util functions
import fs from 'fs';
import util from 'util';
export function debug(d: any) {
	fs.appendFileSync('debug.log', util.format(d) + '\n');
}

export const LOGO_COLORS: [string, string] = LOGO_COLORS;
