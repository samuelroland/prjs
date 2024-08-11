import { exo } from '../../src/helper';
import * as fns from './strings.js';

// Useful constants to work with
const PANGRAM = 'The quick brown fox jumps over the lazy dog';

exo({
	title: 'Get number of chars',
	fn: fns.getNumberOfChars,
	tests: [{ args: [PANGRAM], expected: 43 }]
});

exo({
	title: 'Get lowercase version of given text',
	fn: fns.getLowercaseVersion,
	tests: [{ args: ['THIs iS a SUPÉr msG!'], expected: 'this is a supér msg!' }]
});

exo({
	title: 'Get the first index',
	fn: fns.getFirstIndex,
	tests: [
		{ args: [PANGRAM, ' '], expected: 3 },
		{ args: [PANGRAM, 'k'], expected: 8 },
		{ args: [PANGRAM, '_'], expected: -1 }
	]
});

