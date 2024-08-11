import { exo } from '../../src/helper';
import * as fns from './arrays.js';

exo({
	title: 'Array 1',
	fn: fns.getArray1,
	tests: [{ expected: [] }]
});

exo({
	title: 'Array 2',
	instruction: "filter out everything above 4!",
	fn: fns.getArray2,
	tests: [{ args: [[2, 3, 4, 5, 6, 7, 1]], expected: [2, 3, 4, 1] }]
});

exo({
	title: 'Array 3',
	fn: fns.getArray3,
	instruction: "Splice that!",
	tests: [{ args: [[2, 3, 4, 5, 6, 7, 1], 1, 2], expected: [3, 4] }]
});
