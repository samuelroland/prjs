import {fail} from 'assert';
import {assert, expect, test} from 'vitest';

export type ReturnTest = {
	args?: any[];
	expected: any;
};

export type AdvancedTest = {
	args: any[];
	expect: (_: any) => void;
};

export type Exo = {
	title: string;
	instruction?: string;
	async?: boolean;
	fn: (...any) => any;
	tests: (ReturnTest | AdvancedTest)[];
};

async function runTest(t: AdvancedTest | ReturnTest, fn: Function, exo: Exo) {
	let result = fn(...(t.args ?? []));
	assert(result !== undefined, 'No returned value in ' + fn.name);

	if (exo.async === true) {
		assert(
			result instanceof Promise,
			'Value returned by ' +
				fn.name +
				' is not a promise, the function need to be async.',
		);
		result = await result;
	}

	if ('expected' in t) {
		expect(result).to.deep.equal(t.expected);
	}
	if ('expect' in t) {
		t.expect(result);
	}
}

// Abstraction to declaratively define an exo
export function exo(exo: Exo) {
	test(exo.title, async ({task}) => {
		try {
			// @ts-ignore
			task.meta = {
				exo: {functionName: exo.fn?.name, ...JSON.parse(JSON.stringify(exo))},
			};
		} catch (error) {
			console.log(error);
		}

		if (typeof exo.fn !== 'function')
			fail("Function not defined for the exo '" + exo.title + "' ...");

		if (!exo.tests) fail('No test has been defined for exo ' + exo.title);

		await Promise.all(exo.tests.map(t => runTest(t, exo.fn, exo)));
	});
}
