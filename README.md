
# PRJS - Practice Runner for JavaScript

> Run small JS exos in your terminal with instant feedback loop


<!-- 
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/VQehqnE6) -->

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
```bash
npm run build
npm install --global .
```

### Development
Enable continuous build
```bash
npm run dev
```

## About
### Extensions
We use the following Ink extensions
1. [fullscreen-ink](https://github.com/DaniGuardiola/fullscreen-ink): let us show the TUI in full screen and restore the context after
1. 