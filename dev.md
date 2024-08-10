# Technical documentation for development

### Architecture

![architecture diagram](presentation/imgs/architecture.png)

TODO: document how the project is structured, refactor components and duplications, add unit tests.

### Development bugs

Issues we had during development and their resolutions in case this is useful in the future...

1. Stack traces and `console.log()` are not visible: when there are exceptions and stack trace usually printed to the console, as we use the fullscreen plugin, it just renders above the error and we may just see very short flips.
   Resolution: go in `CLI.tsx`, comment `withFullScreen()` line and uncomment the `render()` line. Now, the logs should be visible among the TUI that is now not really in fullscreen so the display is kinda broken but this is just for debugging...

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
