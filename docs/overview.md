# Project Overview

`HTML London Trip` is a browser-only frontend project centered on a single travel page about a trip to London.

The original version was an HTML semantics exercise. The current `feat/with-css-and-js` branch keeps that structure and adds two lightweight layers:

- modular CSS for layout and presentation
- vanilla JavaScript for interactive sections

## Related Documentation

- [Frontend architecture](./frontend-architecture.md)
- [Styles and behavior](./styles-and-behavior.md)

## What The Page Contains

- a static header and panorama section
- an expenses table that supports adding and removing entries
- a todo list that supports adding, toggling, and removing items
- an information section with travel details
- a photo gallery that supports adding and removing photos

## Technology Profile

- no frameworks
- no package dependencies
- no build step
- browser-native ES modules
- browser `localStorage` for persistence

## Main Folders

- `index.html`: page structure and section placeholders
- `styles.css`: stylesheet entrypoint and cascade layer manifest
- `styles/`: tokens, global styles, layout rules, and section-specific styles
- `js/`: application bootstrap, shared helpers, and section modules
- `docs/`: developer-facing documentation for this branch
