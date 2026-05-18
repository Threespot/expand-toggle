# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## General Behavior

When answering WordPress/PHP questions, provide a direct answer first before exploring the codebase. Only investigate files if the user asks for project-specific context or if the question genuinely requires it.

## Code Style / Conventions

Never introduce Unicode smart quotes or curly quotes in any code file (PHP, JS, SCSS, Blade, JSON, etc.). Always use straight quotes (' and "). Do not alter existing comments solely to replace curly quotes with straight quotes — only avoid introducing new ones. A PostToolUse hook in `.claude/settings.json` scans added lines after every Edit and will block if any contain curly quotes.

## Project

`@threespot/expand-toggle` — a small accessible expand/collapse component published to npm. Source lives in a single file: `index.js`. The CSS animation (using a `grid-template-rows` 0fr→1fr transition) is the user's responsibility; this library only manipulates ARIA attributes, classes, and toggle text.

## Commands

- `yarn test` — runs the suite via `node --test` against happy-dom.
- `yarn test:coverage` — same, with `--experimental-test-coverage`.
- Run a single test: `node --test --test-name-pattern='Keyboard test' test/index.test.js`.
- `yarn patch` / `yarn minor` / `yarn major` — interactive release flow. These call `npm version`, which runs `preversion` (test) → `postversion` (git push + push tags). Don't run these speculatively — they tag and push.

Node 24 / yarn 1.22 per `.tool-versions`. No build step, no transpiler, no linter — `index.js` is published as-is.

## Architecture notes

- `package.json` declares `"type": "module"`, `"main": "index.js"`, and an `"exports"` map pointing at the same file. Consumers' bundlers (or Node) consume the ESM source directly. The `"files"` field whitelists `index.js` so nothing else ships in the npm tarball.
- `ExpandToggle` extends `EventEmitter` from `ev-emitter` (a runtime dependency, not dev — moved deliberately, see commit `16a99d6`). `super()` must be called before any `this` access in the constructor.
- Configuration has two layers that must stay in sync: HTML data attributes (`data-expands`, `data-expands-class`, `data-expanded`, `data-expands-text`) and the JS options object (`expandedClasses`, `activeToggleText`, `shouldStartExpanded`, `onReady`). Data attributes win when both are present. Any new option should follow this same pairing.
- Events emitted: `ready` (via the `onReady` callback only, because `.on('ready', ...)` would bind after the event already fired), `expand`, `collapse`, `destroy`. `expand`/`collapse` forward the originating DOM event as the second arg.
- `destroy()` must fully reverse `init()` — remove listeners, strip aria attributes, reset toggle text, remove expanded classes, set `hasInitialized = false`. Any new side effect added to `init`/`expand`/`collapse` needs a matching cleanup here, and a test case in the destroy tests in `test/index.test.js`.
- Tests run under happy-dom: a `beforeEach` builds a fresh `Window` and assigns `document`, `window`, `KeyboardEvent`, `Event`, `HTMLElement`, `Node` onto `globalThis` before each test. Assertions compare `document.body.innerHTML` after a `minify()` whitespace-normalizer pass — when changing attribute order or default values, update those string snapshots.
