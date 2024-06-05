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

export type Page = 'list' | 'exo' | 'help';

export type Shortcut = {
	pattern: string;
	pages?: Page[];
	action: () => void;
	description: string;
};
