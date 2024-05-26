import React, {useEffect, useState} from 'react';
import {Box, Text, useInput} from 'ink';
import {Exo, ExoFile, Runner} from './Runner.js';

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
	const [list, setList] = useState(1);
	const [exos, setExos] = useState<Exo[]>([]);
	const r = new Runner();

	const refreshFiles = async () => {
		// TODO: make vitest starting just once not at every render...
		if (lastTime + 50000 > Date.now()) {
			lastTime = Date.now();
			return;
		}
		log('useeffect');
		setFiles(await r.startVitest());
		setExos(r.getCurrentExos());
	};

	useEffect(() => {
		const timer = setInterval(refreshFiles, 3000);
		return () => {
			clearInterval(timer);
			r.stopVitest();
		};
	});

	const [idx, setIdx] = useState(0); //selected exo index
	const [exoIdx, setExoIdx] = useState(0); //selected exo index
	const shortcuts = new Map<string, () => void>();
	const changeIndex = (offset: number) => {
		if (list == 1) {
			if (offset + idx >= files.length || offset + idx < 0) return;
			setIdx(offset + idx);
		} else {
			if (offset + exoIdx >= exos.length || offset + exoIdx < 0) return;
			setExoIdx(offset + exoIdx);
		}
	};
	shortcuts.set('j', () => changeIndex(1));
	shortcuts.set('k', () => changeIndex(-1));
	shortcuts.set('h', () => setList(1));
	shortcuts.set('l', () => setList(2));

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
			{/* TODO: refactor this list duplication ! */}
			<Box>
				<Box flexDirection="column" padding={1}>
					{files.map((f, i) => (
						<Text
							key={f.path}
							backgroundColor={list == 1 && idx == i ? '#0befae' : ''}
							color={list == 1 && idx == i ? 'black' : ''}
							wrap="truncate-end"
						>
							{i + 1}. {f.filename} {f.state}
							{get(f.state == 'pass' ? 'check_mark_button' : 'cross_mark')}
						</Text>
					))}
				</Box>
				<Box flexDirection="column" padding={1}>
					{exos.map((e, i) => (
						<Text
							key={e.title}
							backgroundColor={list == 2 && exoIdx == i ? '#0befae' : ''}
							color={list == 2 && exoIdx == i ? 'black' : ''}
							wrap="truncate-end"
						>
							{i + 1}. {e.title} {e.state}
							{get(e.state == 'pass' ? 'check_mark_button' : 'cross_mark')}
						</Text>
					))}
				</Box>
			</Box>
		</>
	);
}
