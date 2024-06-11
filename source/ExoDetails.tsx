import React from 'react';
import {Box, Text} from 'ink';
import {Exo} from './types.js';
import {get} from 'node-emoji';

export default function ExoDetails({exo}: {exo: Exo | null}) {
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
								{error.diff ? (
									<Text>Diff: {error.diff}</Text>
								) : (
									<>
										<Text color="red">Error: {error.message}</Text>
										<Text>
											Obtained result: <Text color="red">{error.actual}</Text>
										</Text>
										<Text>
											Expected result:{' '}
											<Text color="green">{error.expected}</Text>
										</Text>
									</>
								)}
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
