// ProgressBar from scratch because the ink plugin doesn't work...
import React from 'react';
import { Box, Text } from 'ink';
import { useScreenSize } from './hooks/useScreenSize';
type ProgressBarProps = {
	percent: number;
};

export default function ProgressBar({ percent }: ProgressBarProps) {
	const terminalWidth = useScreenSize().width;
	const percentText = ' ' + percent.toFixed(1) + '%'
	const percentWidth = percentText.length + 1; // +1 for the space before the percent text

	const barWidth = terminalWidth - percentWidth;
	const filledWidth = Math.round((percent / 100) * barWidth);
	const emptyWidth = barWidth - filledWidth;

	return (
		<Box>
			<Text color="green">{'>'.repeat(filledWidth)}</Text>
			<Text color="grey">{'>'.repeat(emptyWidth)}</Text>
			<Text>{percentText}</Text>
		</Box>
	);
}
