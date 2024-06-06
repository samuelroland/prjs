# PRJS - Practice Runner for JavaScript

> Run small JS exos in your terminal with instant feedback loop and delightful errors printing

![gradient](gradient_banner.png)

## Idea
Je me faisais la réflexion que je ne voulais vraiment pas faire un labo basique comme une extension du Tetris sans utilité une fois rendu. En même temps, je rêverai de voir des cours délibérés à la HEIG. Pour le cours de WEB, il manque un moyen de faire ces fameux petits exos de drill sur une grande partie des compétences de JS. J'ai tenté qqch avec mon repos WEB-training, évidemment que ça ne couvre que la manipulation de tableaux et il y aura moyen d'aller beaucoup plus loin. Et le problème technique c'est que Vitest n'est pas adapté à 100% à ce use case: c'est très bon pour le watch mode, mais ce qui est affiché n'est pas adapté: pas de transition entre les exos (toujours en train de fail), pas possibilité de détaillers les tests sans ouvrir le fichier de test, peu de couleurs, ...

## Goal
Implémenter une TUI (Text User Interface - CLI en plein écran) pour faciliter l'exécution d'exercices de code avec feedback riche et instantané. Les exos seraient mis à disposition dans un repository Git.

Le projet consisterait à:
1. permettre de parcourir (recherche, filtre, sélection) des exos dans les différents sujets/compétences
1. afficher les exos l'un après l'autre, relancer le test associé à chaque sauvegarde du fichier (watch mode), afficher la raison d'un fail, inclure des indices, afficher un succès et automatiquement passer au suivant après 1s
1. définir une structure/abstraction pour écrire le plus facilement possible des nouveaux exos et leurs tests associés (choisir une structure de donnée adaptée)

Les avantages:
1. Développer un outil qui rend l'expérience de pratique du cours de WEB tellement simple qu'on ne pourrait plus s'en passer
1. Découvrir un outil ([Ink](https://term.ink)) pour faire des TUI en JS (qui utilise des composants React pour gérer la mise en page)
1. Pratiquer TypeScript et React, et découvrir ce qui est possible de faire avec un framework de TUI

## Setup

### Installation

After cloning this repository
```sh
npm install
npm run build
npm install --global .
```

You should now be able to call
```sh
prjs
```

If the command is still not found, try reloading your terminal or make sure the global bin folder is in your PATH...

### Development
In addition to the global installation documented above, you need to enable a continuous build to make sure Typescript files and React components are built and updated in the `dist` folder at each code change. Just run this command:
```bash
npm run dev
```

## About
### Extensions
We use the following Ink extensions
1. [fullscreen-ink](https://github.com/DaniGuardiola/fullscreen-ink): let us show the TUI in full screen and restore the context after
1. [gradient-ink]: to easily show gradients on texts


## Todos
Still to attribute/think about:
- [ ] Fix strange alignement in exos list
- [ ] Refactor list duplication in ExosList with StoreList component (see TODO in ExosList)
- [ ] Fix loading time of vitest showing "no file found" instead of something like "loading"
- [ ] Hard: Transfer exo metadata from Vitest tests to include instruction, hints and more
- [ ] !! Implements hints (when exo metadata works)
- [ ] !! Show arguments of function calls as an easy way to understand what the function should do (when exo metadata works)
- [ ] Group all constants and magic values (like colors in hexa) in util.ts
- [ ] Teacher: How to easily provide the helper.ts abstraction (commited in web-training currently) ?
- [ ] Pres: Start hacking on slides with [Slidev](https://sli.dev/) in a `presentation` folder, just add a single slides.md with a title (not an entire Slidev setup)
- [ ] readme: complete TODO about how to use and others
- [ ] Pres: Define order and strategy of the slides
- [ ] Pres: Includes required points with graphics
- [ ] Pres: Create and add architecture schema, include in this readme
- [ ] Pres: Design the demo
- [ ] Pres: Attribute talking times
- [ ] Pres: Pratice it in group 1-2 times

Camille:
- [ ] !! Filter exos with a live text input
- [ ] !! Switch to next exo with 'n' and to previous with 'p' in exo page
- [x] Show errors and state of an exo
- [ ] !! Improve diffing and errors output
- [ ] Automatically open exo file in VSCode ?

Guilherme:
- [ ] Organise shortcuts on help page by categories (separate by page (see Shortcut.pages): all, help, list, then exo specifics)
- [x] Show dynamically generated help page
- [ ] Refactor progress bar with https://github.com/brigand/ink-progress-bar ? Really need "Progress:"
- [ ] Show progress bar at the bottom (use flex align items flex-end and direction column)
- [ ] Enable going up and down if help page is long ??
- [ ] !! Fix progress bar hard coded counter with correct total calculation (in store)

Samuel:
- [x] Open a real exo
- [x] Properly quit TUI (quit vitest, clean temp files, ...)
- [x] Show home page like Vim ? -> include ascii art, TUI version, basic shortcuts like help + tagline ...
- [x] Show real version number in Home page
- [ ] Fix shortcuts matching issues with shift and ?
- [ ] Automatic reload of files and exos when vitest runs
- [x] Show a list of files and exos from Vitest
- [x] Should we rename page namings ?
- [ ] Translate above text in English
- [ ] Support running exos in both TS and JS files
- [ ] Support showing typescript compiler errors ?
- [ ] Refactor colors assignation with some constants in utils.ts
- [ ] Refactor and enhance the store
- [ ] Refactor the "abstracted" list structure in store ??
- [ ] Document how to easily write and tests exos and how to publish solutions
- [ ] Support only expectation callback in exo() helper without anything else

## How to use
TODO

## Development documentation

**The logo**  
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

**The architecture**

TODO add schema

**Further development**
As the goal is to use this tool for the WEB course, it might be improved with the following improvments:
- Publish it on a public Git repository
- Release it under a Free software license
- TODO