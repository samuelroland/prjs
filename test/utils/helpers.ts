// Helper functions to easily write assertions on Ink instance and frames...
import { render } from 'ink-testing-library'
import { expect } from 'vitest';
import { sendInputAndWaitForChange } from './shopify-cli-testing-helpers';

// Wait a certain amount of time in milliseconds
export function wait(time: number) {
	return new Promise((resolve) => setTimeout(resolve, 100))
}

export function mustShow(instance: ReturnType<typeof render>, text: string) {
	const lastFrame = instance.lastFrame()
	expect(lastFrame).to.eq(text, "Text '" + text + "' differ from the last frame:\n" + lastFrame + "\n");
}

export function mustContain(instance: ReturnType<typeof render>, text: string) {
	const lastFrame = instance.lastFrame()
	expect(lastFrame).to.contain(text, "Text '" + text + "' was not found in last frame:\n" + lastFrame + "\n");
}

export function mustNotContain(instance: ReturnType<typeof render>, text: string) {
	const lastFrame = instance.lastFrame()
	expect(lastFrame).to.not.contain(text, "Text '" + text + "' should not have been present in last frame:\n" + lastFrame + "\n");
}

export function expectNFrames(instance: ReturnType<typeof render>, n: number) {
	expect(instance.frames.length).to.equal(n)
}

export async function type(inst: ReturnType<typeof render>, input: string) {
	await wait(10)
	await sendInputAndWaitForChange(inst, input)
}

