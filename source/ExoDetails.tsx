import React from 'react';
import {Box, Text} from 'ink';
import {Exo} from './types.js';
import {get} from 'node-emoji';

export function ExoDetails({exo}: {exo: Exo}) {
	return (
		<Box flexDirection="column" padding={1}>
			<Text color="blue" bold>
				{get(exo.state === 'pass' ? 'white_check_mark' : 'x')} {exo.title}
			</Text>
			{exo.errors.map((error, index) => (
				<Box key={index} flexDirection="column" marginBottom={1}>
					<Text color="red">Error: {error.message}</Text>
					<Text>
						Obtained result: <Text color="red">{error.actual}</Text>
					</Text>
					<Text>
						Expected result: <Text color="green">{error.expected}</Text>
					</Text>
				</Box>
			))}
		</Box>
	);
}
