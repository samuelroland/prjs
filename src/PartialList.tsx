// PartialList: a way to show a part of a list because it is too high to display entirely in the current terminal height
// It allows to manage a selection of item or not if selection is unnecessary
// It allows to show further in the list if it goes over the current height
// It can also show a custom message in case the list is empty
import React, { ReactNode } from 'react';
import { Text, Spacer, Box, Newline } from 'ink';
import { BG_VARIANTES } from '../src/util.js'

type Props = {
	list: ReactNode[];
	height: number;	//the maximum height
	selectionEnabled: boolean;
	selectedIndex?: number;
	emptyListMessage?: string;
}


// Convert "info: super message" to a Text node in gray with content "super message"
//TODO: should we test this function ?
const colorByMessagesTypes: { [key: string]: string } = {
	'info': 'gray',
	'error': 'red',
	'warning': 'orange',
}
function getColoredTextByType(msg: string): ReactNode {
	const sepIndex = msg.indexOf(":")
	if (sepIndex === -1) return <Text>{msg}</Text>
	const type = msg.substring(0, sepIndex).trim()
	console.log(type)
	if (colorByMessagesTypes[type] !== undefined) {
		return <Text color={colorByMessagesTypes[type]}>{msg.substring(sepIndex + 1).trim()}</Text>
	}
	return <Text>{msg}</Text>
}

export default function PartialList({ list, height, selectionEnabled, selectedIndex, emptyListMessage }: Props) {
	const startIndex = 0
	const listHeight = height >= list.length ? list.length : height
	const finalIndexInPortion = selectedIndex
	//Only take a portion of the list
	//
	const finalList = list.slice(startIndex, listHeight - startIndex)

	function selected(i) {
		if (!selectionEnabled) return false
		return finalIndexInPortion == i
	}

	return (
		<Box display='flex' flexDirection='column'>
			{finalList.map((el, i) => <Text key={i}
				wrap="truncate-end"
				color={selected(i) ? 'black' : ''}
				backgroundColor={selected(i) ? BG_VARIANTES[0] : ''}>
				{/* <Text>{selected(i) ? "> " : ''}</Text> */}
				{el}
			</Text>
			)}
			{finalList.length === 0 ?
				getColoredTextByType(emptyListMessage ?? "No element to show.")
				: null}
		</Box>
	);
}
