import React from "react";
import { Box, Text } from 'ink';

type ProgressBarProps = {
    percent: number;
};

export default function ProgressBar({ percent }: ProgressBarProps) {
    const width = 20; // Width of the progress bar
    const filledWidth = Math.round((percent / 100) * width);
    const emptyWidth = width - filledWidth;

    return (
        <Box>
            <Text backgroundColor="green">{' '.repeat(filledWidth)}</Text>
            <Text backgroundColor="grey">{' '.repeat(emptyWidth)}</Text>
            <Text> {percent.toFixed(2)}%</Text>
        </Box>
    );
}
