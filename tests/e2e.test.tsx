// End to end tests (made on App component) to test the main features that are slow
// to test manually at every change...
import React from 'react';
import { expect, test } from 'vitest'
import { render } from 'ink-testing-library';
import { mustContain, mustNotContain, expectNFrames, type } from "./utils/helpers.ts"
import App from '../src/App';

test('PRJS has a debug mode', async () => {
	const inst = render(<App debugMode={true} />);
	mustContain(inst, "DEBUG")
	inst.rerender(<App debugMode={false} />);
	mustNotContain(inst, "DEBUG")
	inst.unmount()
});

test('Home page can access list page', async () => {
	const inst = render(<App />);
	mustContain(inst, "Quick help")
	expectNFrames(inst, 1)
	await type(inst, "?")
	expectNFrames(inst, 2)
	mustNotContain(inst, "Quick help")
	// mustContain(inst, "Vitest is starting")
	inst.unmount()
});

test('Home page can access help page', async () => {
	const inst = render(<App />);
	mustContain(inst, "Quick help")
	expectNFrames(inst, 1)
	await type(inst, "?")
	expectNFrames(inst, 2)
	mustContain(inst, "Train Shortcuts")
	inst.unmount()
});
