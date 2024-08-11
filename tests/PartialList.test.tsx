// Unit tests on PartialList.tsx
import React from 'react';
import { expect, test } from 'vitest'
import { Text } from 'ink'
import { render } from 'ink-testing-library';
import chalk from 'chalk';
import { mustShow, mustContain, mustNotContain, expectNFrames, type } from "./utils/helpers.ts"
import PartialList from "../src/PartialList"
import { BG_VARIANTES } from '../src/util'

test('PartialList can show a short list of numbers', async () => {
	const numbers = [2, 5, 1, 53]
	const inst = render(<PartialList
		height={50}
		list={numbers.map(n => <Text>{n}</Text>)}
		selectionEnabled={false}
	/>);

	mustShow(inst, numbers.join("\n"))
	inst.unmount()
});

const NUMBERS = [2, 5, 1, 53, 2, 4, 6, 1, 4, 2, 1, 3, 5, 6, 2, 1, 5, 6, 2, 10, 6, 2, 5, 22]
const HEIGHT = 10

test('PartialList do not print the end of the list when very long', async () => {
	const inst = render(<PartialList
		height={HEIGHT}
		list={NUMBERS.map(n => <Text>{n}</Text>)}
		selectionEnabled={false}
	/>);

	mustShow(inst, NUMBERS.slice(0, HEIGHT).join("\n"))
	inst.unmount()
});

test('PartialList show selected item when selection is enabled', async () => {
	// Selection enabled
	const inst = render(<PartialList
		height={HEIGHT}
		list={NUMBERS.map(n => <Text>{n}</Text>)}
		selectionEnabled={true}
		selectedIndex={3} //4rd element
	/>);

	mustContain(inst, NUMBERS.slice(0, 3).join("\n"))
	mustContain(inst, chalk.bgHex(BG_VARIANTES[0]).black(NUMBERS[3]))
	mustContain(inst, NUMBERS.slice(5, HEIGHT).join("\n"))
	// Selection disabled
	inst.unmount()
});

test('PartialList shift the view via selectionIndex when selection is enabled', async () => {
	const inst = render(<PartialList
		height={HEIGHT}
		list={NUMBERS.map(n => <Text>{n}</Text>)}
		selectionEnabled={true}
		selectedIndex={14}
	/>);

	mustShow(inst, NUMBERS.slice(5, HEIGHT + 5).join("\n"))
	inst.unmount()
});

//todo: support custom msg or has a default one
