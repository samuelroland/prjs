// Some util functions
import fs from 'fs';
import util from 'util';
export function debug(d: any) {
	fs.appendFileSync('debug.log', util.format(d) + '\n');
}
