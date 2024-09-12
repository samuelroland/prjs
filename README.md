# PRJS - Practice Runner for JavaScript

> Run small JS exos in your terminal with instant feedback

![home](imgs/prjs-home.png)

<!--TODO: include a nice GIF !-->

Useful documents: [CHANGELOG.md](CHANGELOG.md) - [How to create and maintain exos - exos.md](exos.md) - [Brainstorming - todos.md](todos.md) - [Development documentation - dev.md](dev.md)

## WHY
During the WEB course at HEIG-VD, we trained with various online games or tutorials. The very visual [Flexbox froggy](https://flexboxfroggy.com/), [Elevator Saga](https://play.elevatorsaga.com/) and [TypeScript exercises](https://typescript-exercises.github.io/#exercise=1&file=%2Findex.ts) are just 3 examples of great online websites that let you train a specific part of web development. For HTML and CSS, this is probably a pretty good experience level, but for JavaScript and TypeScript, the online editors clearly lacks the power of local IDEs such as VSCode. When there is no "fast running" test suites backing the exercises, it becomes harder to develop it. Some of those websites focus on learning almost all possible attributes but only half of them are used very most of times.
Let's take another example, the [w3resource.com JavaScript array exercises](https://www.w3resource.com/javascript-exercises/javascript-array-exercises.php), the idea of "Write a function that does X, here is some input and output examples" is good in itself, it allows to train a small concept, a few methods. But manually creating a new function, running it, printing and checking the output by hand is slow and brings a tons of friction.

We had the opportunity to work on our own idea for the latest WEB lab on condition of working with React and 2 other web technologies. We picked Ink (that uses React components) and TypeScript. Instead of doing "just another lab" without any long term utility, this was a great occasion to contribute to the course and contribute to redefine the training experience - in a more deliberate way.

The experience consists of having a way to focus on one exo after the other, show the only the related errors and a rich diff on the result, everything in watch mode reloading on file save, without leaving the comfort of our prefered IDE.

**PRJS would allow to create a set of exos focused on practicing one or more concepts/functions/methods each time. It would make it easy to train on combination of various concepts to increase the level of complexity gradually.**

![prjs list of exos on arrays and strings](imgs/prjs-list.png)

![train](imgs/prjs-train.png)

Exos are written and ran by [Vitest](https://vitest.dev) under the hood. Vitest itself is very powerful for software test suite but not very adapted to exo test suite like we want here. The main problems are that the full test list is displayed all time, all errors are displayed in a big list, when one exo pass, it continues to fail (the next test actually) because there is no transition of "okay it's correct, let's switch to the next exo". There is no way to show more than a title for the exo, making it impossible to directly support hints, instruction, level, ...

All these problems make it very hard to focus on a single exo with all this noise around. But the watch mode of Vitest and the nice diff report is very good, this is why PRJS uses Vitest in the background and read its state when there are changes.

This project is inspired by [Rustlings](https://rustlings.cool/) that let you learn Rust and get used to compiler errors with small exos to implement or fix.

Note: This repository do not contains exos, it only contains the runner. The repository [samuelroland/WEB-training](https://github.com/samuelroland/WEB-training) is where we tried to create some exos on array and string manipulations.


## Help

![help](imgs/prjs-help.png)

You can run `prjs -h` you can get the list CLI flags and TUI shortcuts. You can also access the shortcuts by typing `?` when PRJS is started.
```
PRJS - Practice Runner for JavaScript
Run small JS exos in your terminal with instant feedback

Usage
$ prjs

Options
-v, --version: Show version
-h, --help: Show this help
-d, --debug: Enable debug mode

Common shortcuts
? View help page
q, Ctrl+c Quit the TUI

Help shortcuts
escape Escape help page
j, down Scroll down
k, up Scroll up

Home shortcuts
l View list page

List shortcuts
escape Escape search bar
return Enter a selected exo
return Validate search
j, down Next item
k, up Previous item
h, left Switch to files list
l, right Switch to exos list
f Find exo by title

Train shortcuts
escape Escape exo details
n Next exo
p Previous exo
```


## Try it out !
If you want to have a try via the WEB-training repository
```sh
git clone https://github.com/samuelroland/WEB-training
cd WEB-training
npm i
npx prjs
```

### Known issues
1. The watch mode is not perfect, sometimes you need to hit Ctrl+S twice before seeing the current result/exo error.
1. If you have the message `No test found in this folder...`, because the start process is not very stable (and we don't understand why yet), here what you can try
	1. Make sure you are in the WEB-training repository, not the repository of PRJS
	1. Try to save one of the exos files (`arrays/arrays.js` for ex.), so the watch mode will rerun tests wake up
	1. Try typing `j` and `k` a few times, it sometimes helps
1. If you already started to implement the functions, make sure you don't have an infinite loop or a syntax error, because we don't support displaying them yet.

**Debug mode**

If PRJS is not working as expected, you can run in debug mode with `-d` or `--debug` and look at logs generated in the same folder as `debug.log`, `out.log` and `err.log`... You can see the progress of logs with `tail` like `tail -f debug.log`. The first file is logged generated by PRJS debug code and the 2 following are stdout and stderr of the Vitest instance programmatically started by PRJS.

### Recommended installation
If you are a student, things should already be setup in the exos repository and you should just be able to type `npx prjs` to run it ! (after `npm install` obviously)

If you are a teacher, you might want to define `prjs` as a dependency in your repository by running `npm install @delibay/prjs` and run `npm update` from time to time.

### Install from source
See [dev.md](dev.md)

## How to create and maintain exos ?
See dedicated file [exos.md](exos.md) on how to write exos technically and strategies for easy maintenance and efficient training.

## About
### Project history
- `2024-05-22` -> `2024-06-12`: a group of 3 students: [@samuelroland](https://github.com/samuelroland), [@CamilleKoestli](https://github.com/CamilleKoestli) and [@GuilhermePintodac](https://github.com/GuilhermePintodac) developed the original version for a WEB course lab. They released and presented the project on the last day. See `presentation` folder for more details. [See the project at the time of the lab's release 364366f905b61449da6a1bc5f8744a02037337e4](https://github.com/samuelroland/prjs/tree/364366f905b61449da6a1bc5f8744a02037337e4)
- `2024-06-18`: reupload of the private repository publicly on GitHub under `samuelroland/prjs`, to develop further changes in preparation of the WEB exam on the 2024-06-21.
The project is in waiting of school approval to release it under a Free license. We might move the repository on Codeberg at the same time if it makes sense. The project might be used the next semester (S2 2024) by our teacher.
- `2024-09-12`: [@samuelroland](https://codeberg.org/samuelroland) released the first version on [npmjs.com](https://www.npmjs.com/package/prjs) under `@delibay/prjs` (because `prjs` name conflicts with a squatting package `prjs`). PRJS is going to be migrate to Delibay's Git organisation on codeberg.org later, so releasing it under this name makes sense. Before the release, he continued to fix a few bugs, implemented a partial list system, added a build system, tried to write some automated tests, and wrote a CHANGELOG.md.

### Presentation
You can see our slides for the lab release in [`presentation`](presentation/README.md) made with [Slidev](https://sli.dev)

### Contribution
This project is not opened to contributions until we can apply a free software license. But you can contribute to the exos repository [samuelroland/WEB-training](https://github.com/samuelroland/WEB-training) !

### License
All rights reserved for now. All contributors are okay to release it as a free software but we need to wait until we can get the approval of the school as it was developed at school... Coming in September-October 2024 I hope!
