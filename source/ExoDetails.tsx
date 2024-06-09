import React from 'react';
import {Box, Text } from 'ink';
import {Exo} from './types.js';
import {get} from 'node-emoji';
import useStore from './store.js';
import { diffWords, Change } from 'diff';

export default function ExoDetails({exo}: {exo: Exo | null}) {
	const changeExoInList = useStore((state) => state.changeExoInList);

	const renderDiff = (actual: string, expected: string) => {
        const differences: Change[] = diffWords(actual, expected);
        return differences.map((part: Change, index: number) => {
            const color = part.added ? 'green' :
                          part.removed ? 'red' : 'white';
            return <Text key={index} color={color}>{part.value}</Text>;
        });
    };

	return (
		<Box flexDirection="column">
			{exo ? (
				<>
					<Text color="blue" bold>
						{get(exo.state === 'pass' ? 'white_check_mark' : 'x')} {exo.title}
					</Text>
					<Box>
						{exo.errors.map((error, index) => (
							<Box key={index} flexDirection="column" marginBottom={1}>
								<Text color="red">Error: {error.message}</Text>
								<Text>
									Obtained result: <Text color="red">{error.actual}</Text>
								</Text>
								<Text>
									Expected result: <Text color="green">{error.expected}</Text>
								</Text>
								<Text>
									Diff: {renderDiff(error.actual, error.expected)}
								</Text>
							</Box>
						))}
					</Box>
				</>
			) : (
				<Text color="red" italic>
					Given exo is null, unable to render.
				</Text>
			)}
		</Box>
	);
}
