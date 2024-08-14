# Development documentation

## Testing

The project started without any automated testing because we didn't looked at ink-testing-library and we tested manually. The current state of the project is that is mostly untested automatically and somewhat tested manually. Later, I setup some abstractions and configurations to use ink-testing-library fully, this wasn't easy and not totally done (the store is not reset between e2e tests causing fails).

I started doing 2-3 e2e tests and some component testing for the new `PartialList.tsx` ! But we clearly need to have a lot more e2e tests to cover main feature like watch mode, search, help, browsing exos, exo details display... If you want to contribute some to make it more stable or as a bug reproduction you are more than welcome ! I'm going to write them as I change things or fix bugs.

All tests are present inside `tests/`. We are using Vitest and a few abstractions in `tests/utils/helpers.ts`.

**Running all tests**
```sh
pnpm test
```
**Running all tests and stop**
```sh
pnpm test --run
```

**Running a single test file**
```sh
pnpm test tests/PartialList.test.ts
```

**Tips for writing tests - IMPORTANT**
1. Easily type shortcuts by using `type()`. If you give several letters like `type("jjk")` it will type them one after the other with a short wait timing to simulate a real keyboard and make the shortcuts system consider them indepedant.
1. Before entering any input via `type()`, call once `await waitForInputsToBeReady();` at the start of the test
1. If tests are eating more and more RAM, check if the store might not be closed on component unmount and this would cause to block the exit...

## Architecture

![architecture diagram](presentation/imgs/architecture.png)

TODO: document how the project is structured, refactor components and duplications, add unit tests.

## Misc
### Development bugs

Issues we had during development and their resolutions in case this is useful in the future...

1. Stack traces and `console.log()` are not visible: when there are exceptions and stack trace usually printed to the console, as we use the fullscreen plugin, it just renders above the error and we may just see very short flips.
   Resolution: go in `CLI.tsx`, comment `withFullScreen()` line and uncomment the `render()` line. Now, the logs should be visible among the TUI that is now not really in fullscreen so the display is kinda broken but this is just for debugging...

### External code

We have some copy pasted files from external sources:
1. `test/utils/shopify-cli-testing-helpers.ts`: avoid writing test helpers again for Ink with ink-testing-library

### The logo

This is a gradient of an ASCII ART. This was generated with the help of [Calligraphy](https://calligraphy.geopjr.dev/) with the font `Blocky`. The gradient is shown with ink-gradient and consists of these 2 colors: `#1ABADB`, `#18E258` applied to this text piece:

```
████████  ████████        ██  ██████  
██     ██ ██     ██       ██ ██    ██ 
██     ██ ██     ██       ██ ██       
████████  ████████        ██  ██████  
██        ██   ██   ██    ██       ██ 
██        ██    ██  ██    ██ ██    ██ 
██        ██     ██  ██████   ██████  
```

**Further development**
As the goal is to use this tool for the WEB course, it might be improved with the following improvments:

- Publish it on a public Git repository
- Release it under a Free software license
- All the todos above
- Make it more stable
