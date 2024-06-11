import React, {useEffect} from 'react';
import {Box, Text, useStdout} from 'ink';
import {useScreenSize} from './hooks/useScreenSize.js';
type ProgressBarProps = {
	percent: number;
};

export default function ProgressBar({percent}: ProgressBarProps) {
	const terminalWidth = useScreenSize().width;
	const textWidth = 10; // Approximate width for "Progress: "
	const percentText = `${percent.toFixed(2)}%`;
	const percentWidth = percentText.length + 1; // +1 for the space before the percent text

	const barWidth = terminalWidth - textWidth - percentWidth;
	const filledWidth = Math.round((percent / 100) * barWidth);
	const emptyWidth = barWidth - filledWidth;

	return (
		<Box>
			<Text color="green">{'>'.repeat(filledWidth)}</Text>
			<Text color="grey">{'>'.repeat(emptyWidth)}</Text>
			<Text> {percent.toFixed(2)}%</Text>
		</Box>
	);
}
