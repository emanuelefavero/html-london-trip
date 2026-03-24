# HTML London Trip

Originally built as a semantic HTML exercise for a Web Development course, this project now also includes a small vanilla JavaScript layer and a modular stylesheet system in the `feat/with-css-and-js` branch.

## Documentation

- [Project documentation](./docs/overview.md)

## Live Demo

- [View the live webpage](https://emanuelefavero.github.io/html-london-trip/)

## Project Context

The original goal of the exercise was to recreate a provided webpage using only HTML, with focus on semantic structure, readable markup, and accessibility fundamentals.

That original HTML-only version is still the foundation of the project. This branch extends it with presentation and interactive behavior while keeping the stack intentionally simple:

- semantic HTML in `index.html`
- CSS organized through `styles.css` and the `styles/` folder
- vanilla JavaScript modules in `js/`
- no frameworks or external dependencies

## Current Features In This Branch

- responsive page styling built on CSS cascade layers
- interactive expenses table with add and remove actions
- interactive todo list with add, toggle, and remove actions
- interactive photo gallery with add and remove actions
- shared client-side state persisted in `localStorage`

## Original Exercise Constraints

These constraints describe the first version of the project:

- HTML only
- No CSS
- No JavaScript
- No frameworks or dependencies

## Current Project Structure

```text
├── index.html
├── styles.css
├── README.md
├── docs/
│   ├── overview.md
│   ├── frontend-architecture.md
│   └── styles-and-behavior.md
├── styles/
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── sections/
├── js/
│   ├── app.js
│   ├── shared/
│   └── sections/
├── assets/
└── img/
```

## What This Project Shows

- a semantic HTML page can remain the source of structure even after styling and behavior are added
- small browser-native JavaScript modules are enough for simple interactive features
- CSS can stay maintainable by separating tokens, layout, reusable components, and section-specific rules
- a small state model can coordinate multiple interactive sections without introducing libraries

## Notes

- I decided against using `footer`, as the final photo block is still part of the main page content, not closing or supplementary page information.
- In the original HTML-only exercise, I chose not to use `figure` for the panorama images because default browser margins made the layout less faithful to the reference screenshot without CSS. The parent `section` therefore carries the accessible description while the panorama images are decorative.
- I kept `h2` for the main sections because they are parallel sections of the page, not subsections of the expenses area.

## Reference Screenshot

![Source layout for the exercise](./assets/source-layout.jpg)
