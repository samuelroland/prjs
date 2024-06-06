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
};

export type Exo = {
	title: string;
	state: string;
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
