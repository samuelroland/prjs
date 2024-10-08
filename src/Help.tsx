// Help page showing provided shortcuts dynamically organized by pages
// allowing to have a help page always up-to-date
import React, {ReactNode} from 'react';
import {Text} from 'ink';
import {Shortcut, Page} from './types';
import PartialList from './PartialList';

type CategorizedShortcuts = Record<Page, Shortcut[]> & {
	[key: string]: Shortcut[];
};

export const categorizeShortcuts = (shortcuts: Shortcut[]) => {
	const categories: CategorizedShortcuts = {
		common: [],
		help: [],
		home: [],
		list: [],
		train: [],
	};

	shortcuts.forEach(shortcut => {
		for (const name in categories) {
			if (shortcut.pages?.includes(name as Page)) {
				categories[name as Page].push(shortcut);
			} else if (!shortcut.pages || shortcut.pages.length === 0) {
				categories['common']?.push(shortcut);
				break;
			}
		}
	});

	return categories;
};

export function beautifyPattern(pattern: string) {
	return pattern.replace('Arrow', '').replace('ctrl', 'Ctrl');
}

export default function Help({
	shortcuts,
	height,
	full,
}: {
	shortcuts: Shortcut[];
	height: number;
	full?: boolean;
}) {
	const categorizedShortcuts = categorizeShortcuts(shortcuts);

	// Include "common" in the list of categories, define a special order to existing pages
	const pagesListWithCommon = ['common', ...['help', 'home', 'list', 'train']];

	// We build a list of lines instead of a hierarchical Box+Text structure
	// because we want to have all lines be of height 1 for PartialList usage
	const lines: ReactNode[] = [];

	pagesListWithCommon.forEach(page => {
		lines.push(
			<Text color="blue" bold>
				{page.charAt(0).toUpperCase() + page.slice(1)} shortcuts
			</Text>,
		);
		categorizedShortcuts[page]?.forEach(shortcut => {
			lines.push(
				<Text>
					<Text color="yellow">{beautifyPattern(shortcut.pattern)}</Text>
					{shortcut.alt && `,`}
					<Text color="yellow">
						{shortcut.alt && ` ${beautifyPattern(shortcut.alt)}`}
					</Text>{' '}
					{shortcut.description}
				</Text>,
			);
		});
		lines.push(<Text> </Text>); //NewLine seems to be 2 empty lines so we use an invisible space
	});

	return (
		<PartialList
			full={full}
			list={lines}
			selectionEnabled={false}
			height={height}
		></PartialList>
	);
}
