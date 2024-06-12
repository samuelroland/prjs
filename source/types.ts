import { AppProps } from 'ink';
import {Store} from './store.js';

export type ExoFile = {
	filename: string;
	state: string;
	path: string;
};

export type Error = {
	message: string;
	actual: string;
	expected: any;
	diff: any;
};

export type ReturnTest = {
	args?: any[];
	expected: any;
};

export type AdvancedTest = {
	args: any[];
	expect: (_: any) => void;
};

export type Exo = {
	title: string;
	state: string;
	uid: string;
	instruction: string;
	functionName: string;
	tests: (ReturnTest | AdvancedTest)[];
	errors: Error[];
};

export type Page = 'home' | 'list' | 'train' | 'help';

export type Shortcut = {
	pattern: string; //shorcut pattern like 't' or 'ctrl+t'
	alt?: string; //alternative shortcut (q -> ctrl+c)
	pages?: Page[]; //the pages where the shortcut is available, default: all
	action: (store: Store, app: AppProps) => void; //the action to execute
	description: string; //description for the help page
};
