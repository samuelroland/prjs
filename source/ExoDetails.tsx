import React from 'react';
import {Box, Newline, Text} from 'ink';
import {AdvancedTest, Exo, ReturnTest} from './types.js';
import {get} from 'node-emoji';
import {LOGO_COLORS} from './util.js';

export default function ExoDetails({exo}: {exo: Exo | null}) {
	function formatValue(v: any) {
		switch (typeof v) {
			case 'string':
				return '"' + v + '"';
			case 'number':
				return v;
			case 'object':
				if (Array.isArray(v)) return JSON.stringify(v);
				return JSON.stringify(v, null, 2);
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

	function getExpected(t: AdvancedTest | ReturnTest): string | null {
		if ((t as ReturnTest).expected != undefined) {
			return '=> ' + formatValue((t as ReturnTest).expected);
		}
		return null;
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
							<Text italic>{exo?.instruction}</Text>
						</Box>
					) : null}
					{exo.tests &&
						exo.tests.map(t => (
							<Text>
								<Text color={LOGO_COLORS[0]}>{exo?.functionName}(</Text>
								<Text color="#14C6BA">{formatArgs(t.args)}</Text>
								<Text color={LOGO_COLORS[0]}>)</Text>
								{getExpected(t) && (
									<>
										<Newline></Newline>
										<Text color={LOGO_COLORS[1]}>{getExpected(t)}</Text>
									</>
								)}
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
													Returned result:{' '}
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
