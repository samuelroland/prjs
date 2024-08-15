# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!--
Boilerplate to copy paste and adapt at each release

Take this line and fix version with current ($CV)
## [Unreleased](https://github.com/samuelroland/prjs/compare/$CV...HEAD)

### Added
### Changed

## [$CV](https://github.com/samuelroland/prjs/compare/$CV...HEAD) - $DATE
-->

## [Unreleased]

### Added
1. **Create a TUI** in Typescript called `prjs` with Ink. We use PNPM to manage node dependencies. Support of standard `-h, --help, -v, --version`.
1. This **CHANGELOG.md** file to document changes
1. The README.md with most useful infos, some start of `exos.md`, `dev.md` and move out todos in `todos.md`.
1. Support of **declarative exo creation** via `exo()` function that can be imported via `import {exo} from 'prjs` running Vitest tests under the hood and storing the additional provided metadata with the test. The exos are defined by a title, instruction, some tests on arguments and expected outputs and/or some tests with custom callback to write a standard Vitest test.
1. **Home page** with nice ASCII art, slogan, version, and first shortcuts
1. **List page** with list of detected exos (via the list of tests detected by Vitest that we start programmatically). This includes 2 list: the list of skills (corresponding to one `.test.ts` file) and the list of exos (corresponding to one test defined via `exo`). Implement `hjkl` Vim inspired navigations (including arrows alternatives for better onboarding).
1. **A search feature** in List page to filter displayed exos and only work on a subset of them, or just finding a specific one. Entering the Train page would keep this selection active. Developped by [@CamilleKoestli](https://github.com/CamilleKoestli).
1. **Train page** to show the details of a selected exo and a way to switch to next exo or go back to previous one. Show title, instruction and list of tests with nice function call examples and expected return values. It show the error of the failed test and the diff if provided by Vitest. Contributed by [@CamilleKoestli](https://github.com/CamilleKoestli).
1. **Help page** accessible via `?` to show all shortcuts (list dynamically generated to be always up-to-date). Implement `j` and `k` navigations (including arrows alternatives). Developped by [@GuilhermePintodac](https://github.com/GuilhermePintodac).
1. **A progress bar** showing progression among all exos (among all skills). Developped by [@GuilhermePintodac](https://github.com/GuilhermePintodac).
1. **A partial list system** to be able to scroll inside long list, this is used in help page and list page. Without this system, a long list or a small terminal window wouldn't allow to see all elements. This is not fully working with some edges cases but already usable.
1. **Basic "responsive" layout modification** in List page under 70 characters in a column flex direction instead of row.
1. **Build system with Rollup** to package the CLI and `exo()` code with associated Typescript declaration file.
1. **Proper quit** of the TUI by stopping Vitest and quitting the full screen mode
1. **Debug mode** via `-d, --debug` to output logs to `debug.log`, `out.log` and `err.log` to understand why it is not working.
1. **A few testing abstractions** to use `ink-testing-library` easily and start creating a few component and e2e automated tests.
