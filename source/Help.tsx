import React from 'react';
import {Text, Box} from 'ink';
import {Shortcut, Page} from './types.js';
import {debug} from './util.js';
import {b} from 'vitest/dist/suite-IbNSsUWN.js';

type CategorizedShortcuts = Record<Page, Shortcut[]> & {
	[key: string]: Shortcut[];
};

// Liste des pages pour s'assurer que les clés sont du type Page
const pages: Page[] = ['home', 'list', 'help', 'train'];

const categorizeShortcuts = (shortcuts: Shortcut[]) => {
	const categories: CategorizedShortcuts = {
		home: [],
		all: [],
		help: [],
		list: [],
		train: [],
	};

	shortcuts.forEach(shortcut => {
		for (const name in categories) {
			if (shortcut.pages?.includes(name as Page)) {
				categories[name as Page].push(shortcut);
			} else if (!shortcut.pages || shortcut.pages.length === 0) {
				categories['all']?.push(shortcut);
				break;
			}
		}
	});

	return categories;
};

export default function Help({shortcuts}: {shortcuts: Shortcut[]}) {
	// TODO: categorize shortcuts in 4 categories (pages): all, help, list, exo and show them one section after the other
	// without code duplication
	// TODO: show the list as arrays (without any border), the first column is the pattern (in color), second is the description. To show arrays easily, search for a table plugin...
	const categorizedShortcuts = categorizeShortcuts(shortcuts);

	// Include "all" in the list of categories
	const pagesWithAll = ['all', ...pages];
	// @ts-ignore
	pages.push('all');

	return (
		<Box flexDirection="column">
			{pages.map(category => (
				<Box key={category} flexDirection="column" marginTop={1}>
					<Text color="blue" bold>
						{category.charAt(0).toUpperCase() + category.slice(1)} Shortcuts
					</Text>
					{categorizedShortcuts[category]?.map((shortcut, index) => (
						<Text key={index}>
							<Text color="yellow">{shortcut.pattern}</Text>
							{shortcut.alt && `,`}
							<Text color="yellow">
								{shortcut.alt && ` ${shortcut.alt}`}
							</Text>{' '}
							{shortcut.description}
						</Text>
					))}
				</Box>
			))}
		</Box>
	);
}
