## Todos
## Some problems and features ideas
1. Problem: AdvancedTest does not have a title so it's impossible to describe the issue
1. Solidify errors generation system + document how to generate special errors


## Research
- [ ] !!! Inspect typescriptlings (found after PRJS release)
- [ ] Maybe exo to take on https://github.com/monooso/typescript-katas
- [ ] Inspect https://jskatas.org/ to see whether we could take back some exos
- [ ] NodeJS lings ?
- [ ] https://github.com/henriqueinonhe/promises-training
- [ ] https://github.com/zero-to-mastery/JS_Fun_Practice
- [ ] Include GIF or SVG screenshots of the terminal to better see PRJS, how to make sure they keep up-to-date ?


## Some todos
Still to attribute/think about:
- [x] Fix strange alignement in exos list
- [ ] Sort all default deps of Ink to avoid installing anything useless
- [ ] Refactor list duplication in ExosList with StoreList component (see TODO in ExosList)
- [ ] Show Vitest errors and exceptions
- [x] Fix loading time of vitest showing "no file found" instead of something like "loading"
- [x] Hard: Transfer exo metadata from Vitest tests to include instruction, hints and more
- [ ] !! Implements hints (when exo metadata works)
- [x] !! Show arguments of function calls as an easy way to understand what the function should do (when exo metadata works)
- [ ] Group all constants and magic values (like colors in hexa) in util.ts
- [ ] Teacher: How to easily provide the helper.ts abstraction (commited in web-training currently) ?
- [ ] Support running exos in both TS and JS files
- [ ] Automatically open exo file in VSCode ?
- [ ] Enable going up and down if help page is long ??
- [ ] Fix shortcuts matching issues with shift and ?
- [ ] BUG: need 2 Ctrl+S until it refreshes...
- [ ] BUG: no reload ofljkjkk test when changing the exo itself (worse that with the tested function)
- [ ] BUG: often sees "no test in this folder" after tapping 'l' or when Vitest crashes or is in infinite loop...
- [ ] BUG: rendering several times the help page reinsert the 'all' section each time
- [ ] !! Print code and syntax errors to avoid having a blank list of exos
- [ ] !! Print the solution code when exo is done ? How and where to read this solution ?
- [ ] Support basic Markdown in instruction ??
- [ ] Show which test case has created the error (ex: if we have a suite of boolean tests, if it is wrong we have no idea which test case actually failed...)
- [ ] Support adding more metadata about tests suite like a better name that the test file name, eventually the folder.
- [ ] Add level number ? From 1-5 to easily identify very easy and hard exos.
- [ ] Do not allow undefined expected value in helper.ts, do not show obtained vs expected
- [ ] Setup a debug view to easily see Vitest outputs and logs inside PRJS
- [ ] Add a way to export all these logs to ease the debug process
- [ ] Do not pollute user directory with temp files like out.tmp

- [ ] Document how to easily write and tests exos and how to publish solutions
- [ ] Support showing typescript compiler errors ?
- [ ] Refactor colors assignation with some constants in utils.ts
- [ ] Support only expectation callback in exo() helper without anything else

## Potential future scaling issues
In case we create a lot of exos, we are currently going to have a slower feedback and display issues because scaling issues and optimisations has not been considered for now. This is kind of a pre-mortem analysis of things that could go wrong and how we can fix it in advance.

- [ ] More exos than possible to display horizontally -> PartialList needed
- [ ] Too much exos and associated tests constantly ran at each change, including some tests that takes several seconds... -> Fix PRJS to run a single test file or a single test is very important !
- [ ] Too much .js files watched by the watcher making things very slow (this already happened with remoji node_modules)... -> how to fix a limit of watched file ? Should we read .gitignore ? Should we implement a way to profile the TUI and measure start time, loading time and quit time ?
- [ ] Help page too big to display -> PartialList with selection mode disabled
- [x] Need to be debugged by a user but doesn't access logs: implement a --debug mode
- [ ] Is it possible to have too much tests results and data in memory and causes crash because of that ?
- [ ] When writing exos in 10+ files, this is going to become difficult
		- make sure we didn't forget to change the import to solution.js or array.js
		- make sure all exos have a solution in the solution branch
		- make sure all solutions are actually passing tests
		- make sure all exos are empty and do not pass the tests
	Solution: add a command to help contributors check everything is coherent

## Old done TODOs
Camille:
- [x] !! Filter exos with a live text input
- [x] !! Switch to next exo with 'n' and to previous with 'p' in exo page
- [x] Show errors and state of an exo
- [x] !! Improve diffing and errors output

Guilherme:
- [x] Organise shortcuts on help page by categories (separate by page (see Shortcut.pages): all, help, list, then exo specifics)
- [x] Show dynamically generated help page
- [x] Show progress bar at the bottom (use flex align items flex-end and direction column)
- [x] !! Fix progress bar hard coded counter with correct total calculation (in store)

Samuel:
- [x] Open a real exo
- [x] Properly quit TUI (quit vitest, clean temp files, ...)
- [x] Show home page like Vim ? -> include ascii art, TUI version, basic shortcuts like help + tagline ...
- [x] Show real version number in Home page
- [x] Automatic reload of files and exos when vitest runs
- [x] Show a list of files and exos from Vitest
- [x] Should we rename page namings ?
- [x] Translate above text in English
- [x] Refactor and enhance the store
- [x] Refactor the "abstracted" list structure in store ??

