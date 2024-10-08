// PartialList: a way to show a part of a list because it is too high to display entirely in the current terminal height
// It allows to manage a selection of item or not if selection is unnecessary
// It allows to show further in the list if it goes over the current height
// It can also show a custom message in case the list is empty
import React, {ReactNode, useState} from 'react';
import {Key} from 'ink';
import {Text, Spacer, Box, Newline, useInput} from 'ink';
import {BG_VARIANTES, LOGO_COLORS} from '../src/util';
import {interpretShortcut} from './shortcuts';

type Props = {
	list: ReactNode[];
	height: number; //the maximum height
	selectionEnabled: boolean;
	selectionIndex?: number;
	emptyListMessage?: string;
	full?: boolean;
};

// Convert "info: super message" to a Text node in gray with content "super message"
//TODO: should we test this function ?
const colorByMessagesTypes: {[key: string]: string} = {
	info: 'gray',
	error: 'red',
	warning: 'orange',
};
function getColoredTextByType(msg: string): ReactNode {
	const sepIndex = msg.indexOf(':');
	if (sepIndex === -1) return <Text>{msg}</Text>;
	const type = msg.substring(0, sepIndex).trim();
	if (colorByMessagesTypes[type] !== undefined) {
		return (
			<Text color={colorByMessagesTypes[type]}>
				{msg.substring(sepIndex + 1).trim()}
			</Text>
		);
	}
	return <Text>{msg}</Text>;
}

export function getSliceStartIndex(
	selectionEnabled: boolean,
	selectionIndex: number,
	height: number,
	length: number,
): number {
	if (height >= length) return 0;

	let idx = 0;
	if (selectionEnabled) {
		if (selectionIndex >= height) {
			idx = selectionIndex - height + 1;
		}
		//else already 0
	} else idx = selectionIndex;

	// Make sure it doesn't go over the max
	if (idx > length - height) idx = length - height;

	return idx;
}

export default function PartialList({
	list,
	height,
	selectionEnabled,
	selectionIndex: selectionIndex,
	emptyListMessage,
	full,
}: Props) {
	let finalList = list;
	let startIndex = 0;
	const [localScrollIndex, setLocalScrollIndex] = useState(0); // do not run hooks in condition so we do it here

	// In we are not in the exception where we still want to show the full list,
	// calculate the new finalList
	if (!full) {
		useInput((input, key: Key) => {
			//note: this block the exit of help when running prjs --help if we put it outside of the condition
			// If selection is enabled do not manage shortcuts
			if (selectionEnabled) return;

			const pattern = interpretShortcut(input, key);
			if (pattern === null) return;
			switch (pattern) {
				case 'j':
				case 'downArrow':
					setLocalScrollIndex(
						localScrollIndex < list.length
							? localScrollIndex + 1
							: localScrollIndex,
					);
					break;
				case 'k':
				case 'upArrow':
					setLocalScrollIndex(localScrollIndex > 0 ? localScrollIndex - 1 : 0);
					break;
			}
		});

		const partialHeight = height < list.length ? height : list.length;

		// The start index is by default 0 but it could be bigger
		// if the list is too big (and selection is not 0)
		startIndex = getSliceStartIndex(
			selectionEnabled,
			selectionIndex ?? localScrollIndex,
			partialHeight,
			list.length,
		);
		finalList = list.slice(startIndex, startIndex + partialHeight);
	}

	// Return true if the i element is selected !
	function selected(i: number) {
		if (!selectionEnabled) return false;
		return (selectionIndex ?? 0) - startIndex == i;
	}

	return (
		<Box display="flex" flexDirection="column">
			{finalList.map((el, i) => (
				<Text
					key={i}
					wrap="truncate-end"
					color={selected(i) ? 'black' : ''}
					backgroundColor={selected(i) ? LOGO_COLORS[0] : ''}
				>
					{/* <Text>{selected(i) ? "> " : ''}</Text> */}
					{el}
				</Text>
			))}
			{finalList.length === 0
				? getColoredTextByType(emptyListMessage ?? 'No element to show.')
				: null}
		</Box>
	);
}
