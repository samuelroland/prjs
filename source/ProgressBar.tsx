import React from "react";
import { Box, Text, useStdout } from 'ink';

type ProgressBarProps = {
    percent: number;
};

export default function ProgressBar({ percent }: ProgressBarProps) {
    const { stdout } = useStdout();
    const terminalWidth = stdout.columns;
    const textWidth = 10; // Approximate width for "Progress: "
    const percentText = `${percent.toFixed(2)}%`;
    const percentWidth = percentText.length + 1; // +1 for the space before the percent text

    const barWidth = terminalWidth - textWidth - percentWidth;
    const filledWidth = Math.round((percent / 100) * barWidth);
    const emptyWidth = barWidth - filledWidth;

    return (
        <Box>
            <Text backgroundColor="green">{' '.repeat(filledWidth)}</Text>
            <Text backgroundColor="grey">{' '.repeat(emptyWidth)}</Text>
            <Text> {percent.toFixed(2)}%</Text>
        </Box>
    );
}
