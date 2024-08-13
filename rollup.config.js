// npm package build in 3 steps: CLI + exo() function + associated types
// TODO: that's the first time I'm building a npm package, I'm sure they are a lot of things to possibly improve...
// Inspired by https://github.com/mrozio13pl/sudoku-in-terminal/blob/main/rollup.config.js
import {defineConfig} from 'rollup';
import {dts} from 'rollup-plugin-dts'; // Generate TS declaration file https://www.npmjs.com/package/rollup-plugin-dts
import esbuild from 'rollup-plugin-esbuild'; // https://www.npmjs.com/package/rollup-plugin-esbuild
import {uglify} from 'rollup-plugin-uglify'; // Used to minify .js files to be a bit lighweight https://github.com/TrySound/rollup-plugin-uglify

const prod = process.env.NODE_ENV === 'production';

const plugins = [
	esbuild({
		target: 'node20',
		jsx: 'transform',
		minifySyntax: prod,
		minifyIdentifiers: prod,
		loaders: {
			'.js': 'jsx',
			'.ts': 'tsx',
		},
	}),
	prod && uglify(),
];

export default defineConfig([
	// Generate a single compiled file used by CLI.tsx
	{
		input: 'src/CLI.tsx',
		output: {
			file: 'dist/CLI.js',
			minifyInternalExports: true,
			format: 'es',
		},
		plugins,
	},
	// Generate a single compiled file from all code referenced by index.ts
	//TODO: should we avoid to minify this for debugging purpose ?
	{
		input: 'src/extra/index.ts',
		output: {
			file: 'dist/index.js',
			format: 'es',
		},
		plugins,
	},
	// Generate a single index.d.ts file for all types present via usage in index.ts
	// (export everything from helper.ts currently)
	{
		input: 'src/extra/index.ts',
		output: {
			file: 'dist/index.d.ts',
			format: 'es',
		},
		plugins: [dts()],
	},
]);
