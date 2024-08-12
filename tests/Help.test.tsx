// Unit tests on PartialList.tsx
import React from 'react';
import { expect, test } from 'vitest'
import { render } from 'ink-testing-library';
import chalk from 'chalk';
import { mustShow, mustContain, mustNotContain, expectNFrames, type } from "./utils/helpers.ts"
import Help, { categorizeShortcuts } from "../src/Help"
import { shortcuts } from '../src/shortcuts.ts';
import { Shortcut } from '../src/types.ts';

test('Help categorizeShortcuts() is correct', () => {
	const pack = categorizeShortcuts(shortcuts)
	// Contain some common shortcuts
	expect(pack.common.length).to.not.eq(0)
	expect(pack.common[0].description).to.eq("View help page")

	// no non common shortcuts in common section
	expect(pack.common.filter(e => e.pattern == 'return').length).to.eq(0)

	// Contain some help shortcuts
	expect(pack.help[0].description).to.eq("Escape help page")
})

test('Help can show all shortcuts', async () => {
	const inst = render(<Help height={40} shortcuts={shortcuts} />);
	shortcuts.forEach(s => {
		mustContain(inst, s.pattern)
		mustContain(inst, s.description)
		if (s.alt)
			mustContain(inst, s.alt)
	})
	mustContain(inst, "Common shortcuts")
	mustContain(inst, "Home shortcuts")
	mustContain(inst, "List shortcuts")
	mustContain(inst, "Train shortcuts")
	mustContain(inst, "Help shortcuts")
	inst.unmount()
});

test('Help use a partial list', async () => {
	const firstCommonShortcut: Shortcut = { pattern: 'o', description: 'new shortcut', action: () => { } }
	const inst = render(<Help height={10} shortcuts={[firstCommonShortcut, ...shortcuts]} />);
	mustContain(inst, "new shortcut")
	await type(inst, "jj")	//2 j should be just enough to have the "Common shortcut" disappear and the first shortcut too
	mustNotContain(inst, "new shortcut")
	inst.unmount()
});
