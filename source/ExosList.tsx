import React, {useEffect, useState} from 'react';
import {Box, Text, useInput} from 'ink';
import type {Exo, ExoFile} from './types.js';
import {Runner} from './Runner.js';
import {get} from 'node-emoji';
import {SearchBar} from './SearchBar.js';


export function ExosList({}) {
	const [files, setFiles] = useState<ExoFile[]>([]);
	const [list, setList] = useState(1);
	const [exos, setExos] = useState<Exo[]>([]);
	const r = new Runner();


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

	function updateTestState() {
		setFiles(r.getFiles());
		setExos(r.getCurrentExos(r.getFiles()[idx]?.path ?? ''));
	}

	async function pool() {
		await r.startVitest();
		const timer = setInterval(updateTestState, 1000);
		updateTestState();
		return timer;
	}

	useEffect(() => {
		pool();
	}, []);

	useInput(input => {
		input = input.trim();
		if (shortcuts.has(input) != undefined) {
			shortcuts.get(input)?.call({});
		}
	});

	return (
		<>
			<Text color="green" bold>
				Exos list {idx}
			</Text>
			<SearchBar />
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
							{get(f.state == 'pass' ? 'white_check_mark' : 'x')}
						</Text>
					))}
					{files.length == 0 && (
						<Text color={'red'}>No test found in this folder...</Text>
					)}
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
							{get(e.state == 'pass' ? 'white_check_mark' : 'x')}
						</Text>
					))}
				</Box>
			</Box>
		</>
	);
}
