// Unit tests on PartialList.tsx
import React from 'react';
import { describe, expect, test } from 'vitest'
import { Text } from 'ink'
import { render } from 'ink-testing-library';
import chalk from 'chalk';
import { mustShow, mustContain, mustNotContain, expectNFrames, type, typeAndWait } from "./utils/helpers.ts"
import PartialList, { getSliceStartIndex } from "../src/PartialList"
import { BG_VARIANTES } from '../src/util'
import { waitForInputsToBeReady } from './utils/shopify-cli-testing-helpers.ts';

test('can show a short list of numbers', async () => {
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

test('do not print the end of the list when very long', async () => {
	const inst = render(<PartialList
		height={HEIGHT}
		list={NUMBERS.map(n => <Text>{n}</Text>)}
		selectionEnabled={false}
	/>);

	mustShow(inst, NUMBERS.slice(0, HEIGHT).join("\n"))
	inst.unmount()
});

test('show selected item when selection is enabled', async () => {
	// Selection enabled
	const inst = render(<PartialList
		height={HEIGHT}
		list={NUMBERS.map(n => <Text>{n}</Text>)}
		selectionEnabled={true}
		selectionIndex={3} //4rd element
	/>);

	mustContain(inst, NUMBERS.slice(0, 3).join("\n"))
	mustContain(inst, chalk.bgHex(BG_VARIANTES[0]).black(NUMBERS[3]))
	mustContain(inst, NUMBERS.slice(5, HEIGHT).join("\n"))
	// Selection disabled
	inst.unmount()
});

test('getSliceStartIndex() is correct', () => {
	// When selection mode is disabled, start index should be equal to selectedIndex
	// and should not exceed max
	expect(getSliceStartIndex(false, 0, 10, 100)).to.eq(0)
	expect(getSliceStartIndex(false, 2, 10, 100)).to.eq(2)
	expect(getSliceStartIndex(false, 90, 5, 100)).to.eq(90)
	expect(getSliceStartIndex(false, 95, 5, 100)).to.eq(95)
	expect(getSliceStartIndex(false, 96, 5, 100)).to.eq(95)
	expect(getSliceStartIndex(false, 99, 5, 100)).to.eq(95)

	// When selection mode is enabled, start index = 0 if i < h, else i - h + 1 and should not exceed max
	expect(getSliceStartIndex(true, 0, 5, 100)).to.eq(0)
	expect(getSliceStartIndex(true, 3, 5, 100)).to.eq(0)
	expect(getSliceStartIndex(true, 4, 5, 100)).to.eq(0)
	expect(getSliceStartIndex(true, 5, 5, 100)).to.eq(1)
	expect(getSliceStartIndex(true, 10, 5, 100)).to.eq(6)
	expect(getSliceStartIndex(true, 95, 5, 100)).to.eq(91)
	expect(getSliceStartIndex(true, 96, 5, 100)).to.eq(92)
	expect(getSliceStartIndex(true, 99, 5, 100)).to.eq(95)

	// When list length < height, test that is doesn't became negative...
	expect(getSliceStartIndex(false, 3, 10, 5)).to.eq(0)
	expect(getSliceStartIndex(true, 4, 10, 5)).to.eq(0)
})

// test('shift the view via selectionIndex when selection is enabled', async () => {
// 	const inst = render(<PartialList
// 		height={HEIGHT}
// 		list={NUMBERS.map(n => <Text>{n}</Text>)}
// 		selectionEnabled={true}
// 		selectedIndex={14}
// 	/>);
//
// 	mustShow(inst, NUMBERS.slice(5, HEIGHT + 5).join("\n"))
// 	inst.unmount()
// });

test('show a message when the list is empty', async () => {
	const inst = render(<PartialList
		height={HEIGHT}
		list={[]}
		selectionEnabled={false}
	/>);
	mustShow(inst, "No element to show.")
	inst.unmount()
})

test('support a custom empty list message', async () => {
	const inst = render(<PartialList
		height={HEIGHT}
		list={[]}
		selectionEnabled={false}
		emptyListMessage='error: custom message'
	/>);
	mustShow(inst, "\u001b[31mcustom message\u001b[39m") //in red
	inst.unmount()
});

test('manage scroll progress without selectionIndex when selectionEnabled=false', async () => {
	const inst = render(<PartialList
		height={HEIGHT}
		list={NUMBERS.map(n => <Text>{n}</Text>)}
		selectionEnabled={false}
		emptyListMessage='error: custom message'
	/>);
	await waitForInputsToBeReady()
	mustShow(inst, NUMBERS.slice(0, HEIGHT).join("\n"))

	await type(inst, "j")
	mustShow(inst, NUMBERS.slice(1, HEIGHT + 1).join("\n"))

	await type(inst, "k")
	mustShow(inst, NUMBERS.slice(0, HEIGHT).join("\n"))

	await type(inst, "jjjjjkk")
	mustShow(inst, NUMBERS.slice(3, HEIGHT + 3).join("\n"))
	inst.unmount()
});
