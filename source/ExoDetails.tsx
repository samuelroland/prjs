import React from 'react';
import {Box, Newline, Text} from 'ink';
import {AdvancedTest, Exo, ReturnTest} from './types.js';
import {get} from 'node-emoji';

export default function ExoDetails({exo}: {exo: Exo | null}) {
	function formatValue(v: any) {
		switch (typeof v) {
			case 'string':
				return '"' + v + '"';
			case 'number':
				return v;
			case 'object':
				return JSON.stringify(v);
			case 'boolean':
				return v;
		}
		return '?';
	}
	function formatArgs(args: any[] | undefined) {
		if (!args) return '';
		const list = [];
		for (const arg of args) {
			list.push(formatValue(arg));
		}
		return list.join(', ');
	}

	function getExpected(t: AdvancedTest | ReturnTest) {
		if ((t as ReturnTest).expected != undefined) {
			return '=> ' + formatValue((t as ReturnTest).expected);
		}
		return '';
	}
	return (
		<Box flexDirection="column">
			{exo ? (
				<>
					<Text color="blue" bold>
						{get(exo.state === 'pass' ? 'white_check_mark' : 'x')} {exo.title}
					</Text>
					{exo.instruction?.length > 0 ? (
						<Box>
							<Text color="cyan">{exo?.instruction}</Text>
						</Box>
					) : null}
					{exo.tests &&
						exo.tests.map(t => (
							<Text>
								- <Text color="cyanBright">{exo?.functionName}(</Text>
								<Text>{formatArgs(t.args)}</Text>
								<Text color="cyanBright">)</Text>
								<Newline></Newline>
								<Text color="cyanBright">{getExpected(t)}</Text>
							</Text>
						))}
					<Newline />
					<Box>
						{exo.errors.map((error, index) => (
							<Box key={index} flexDirection="column" marginBottom={1}>
								{error.diff ? (
									<Text>Diff: {error.diff}</Text>
								) : (
									<>
										<Text color="red">Error: {error.message}</Text>
										{error.expected != undefined && (
											<>
												<Text>
													Obtained result:{' '}
													<Text color="red">{error.actual}</Text>
												</Text>
												<Text>
													Expected result:{' '}
													<Text color="green">{error.expected}</Text>
												</Text>
											</>
										)}
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
