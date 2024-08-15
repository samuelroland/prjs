# Exos maintenance

## Introduction
This document is divided in 3 sections to answer 3 main questions
- *how can I concretely create new exos ?* - that's the technical part about types of exos, the metadata and the variants (that's quite easy)
- *how should I structure my exos repository and all my exos ?* - a proposition of exos structure with one folder per skill and 2-3 files per skill, for easy maintenance
- *how to redact the effective exos ?* - a few tips inspired by deliberate practice on what should contain your exos

## Redact new exos

If you have no exo at all for now, we recommend to start by creating a new Git repository to store them.

We want our students to write a few functions that take some arguments, manipulate an array and return the modified array or a computed result. Each exo will concern a specific function and have one or more automated tests to verify its behavior.

Let's imagine as an example that we want to create exos for a new skill: Array manipulation, this is important in JavaScript to know how to manipulate properly and to understand when this is mutable or immutable and how to effectively chain Array methods...

1. Create a folder `arrays`
1. Create a file `arrays/arrays.js` with one exported function per exo. Students will modify this file to implement the exos.
    ```js
    // Learn array manipulations, run these exos with PRJS
    export function getEmptyArray() {
      //TODO
    }
    export function pushAndRemove(array, pushTimes, pushValue, popFrontTimes) {
      //TODO
    }
    ```
1. Create a file `arrays/arrays.test.ts` (or .js as you want) with at least these 2 imports. The first is to get the `exo()` abstraction from PRJS and the second is to import all exported functions inside `arrays.js` to refer them when redacting exos.
    ```js
    import { exo } from 'prjs';
    import * as fns from './arrays.js';
    ```
1. You can now declare some exos declaratively like this:
    ```js
    exo({
      title: 'Create an empty array',
      fn: fns.getEmptyArray,
      tests: [{ expected: [] }],
    });

    exo({
      title: 'Push back values and remove at front',
      instruction: "Here, we want to push 4 times '10' and pop front 2 times",
      fn: fns.pushAndRemove,
      tests: [
        { args: [[1, 2, 3], 4, 10, 2], expected: [3, 10, 10, 10, 10], },
        { args: [[1, 2, 3], 1, 2, 5], expected: [], },
      ],
    });
    ```
1. As you can see above, we are just giving a title, a reference to a function and a list of tests. This enables to define some metadata that are not possible to indicate when writing Vitest tests (just name + function). It is also faster to redact (and more readable) instead of writing a lot of `expect(pushAndRemove([1, 2, 3], 4, 10, 2).to.deep.equal([3, 10, 10, 10, 10])`
1. It actually include some useful assertions that would fail before any test to avoid having hard to understand errors.
	1. *No returned value in functionName*: displayed when the result of the function is `undefined`.

TODO: continue with expect and async !

## Exos files structure

**Managing all exos in a Git repository**: TODO

**One folder per skill and 3 files per skill**: TODO

## Effective training

**The tips from deliberate practice**: TODO

1. Progressive learning, minimal to more complex
1. Randomness included in exos
