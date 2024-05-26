import React, {useEffect, useState} from 'react';
import {Box, Text, useInput} from 'ink';
import {ExoFile, Runner} from './Runner.js';

import fs from 'fs';
import util from 'util';
import {get} from 'node-emoji';
var log_file = fs.createWriteStream('debug.log', {flags: 'w'});

const log = function (d: any) {
	log_file.write(util.format(d) + '\n');
};
let lastTime = Date.now() - 1000000;

export function ExosList({}) {
	const [files, setFiles] = useState<ExoFile[]>([]);
	const r = new Runner();

	const refreshFiles = async () => {
		// TODO: make vitest starting just once not at every render...
		if (lastTime + 50000 > Date.now()) {
			lastTime = Date.now();
			return;
		}
		log('useeffect');
		setFiles(await r.startVitest());
	};

	useEffect(() => {
		const timer = setInterval(refreshFiles, 500);
		return () => {
			clearInterval(timer);
			r.stopVitest();
		};
	});

	const [idx, setIdx] = useState(0); //selected exo index
	const shortcuts = new Map<string, () => void>();
	const changeIndex = (newIdx: number) => {
		if (newIdx >= files.length || newIdx < 0) return;
		setIdx(newIdx);
	};
	shortcuts.set('j', () => changeIndex(idx + 1));
	shortcuts.set('k', () => changeIndex(idx - 1));

	useInput(input => {
		input = input.trim();
		if (shortcuts.has(input) != undefined) {
			shortcuts.get(input)?.call({});
		}
	});

	return (
		<>
			<Text color="green" bold>
				Exos list
			</Text>
			{/* TODO: add files list */}
			{/* TODO: show exos in current files */}
			<Box flexDirection="column" padding={1}>
				{files.map((f, i) => (
					<Text
						key={f.path}
						backgroundColor={idx == i ? '#0befae' : ''}
						color={idx == i ? 'black' : ''}
						wrap="truncate-end"
					>
						{i + 1}. {f.filename} {get('check_mark_button')}
						{get(f.state == 'pass' ? 'check_mark_button' : 'cross_mark')}
					</Text>
				))}
			</Box>
		</>
	);
}
