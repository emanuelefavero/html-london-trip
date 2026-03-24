# Frontend Architecture

This project uses a small modular pattern: `index.html` provides the structure, `js/app.js` bootstraps the page, and each interactive section owns its DOM events and rendering logic.

## Runtime Flow

```mermaid
flowchart TD
  A[index.html] --> B[styles.css]
  A --> C[js/app.js]
  C --> D[loadState]
  D --> E[localStorage]
  C --> F[Todo section]
  C --> G[Expenses section]
  C --> H[Gallery section]
  F --> I[Shared state]
  G --> I
  H --> I
  F --> J[save]
  G --> J
  H --> J
  J --> K[saveState]
  K --> E
```

## JavaScript Module Structure

```mermaid
flowchart TD
  A[js/app.js] --> B[js/shared/storage.js]
  B --> C[js/shared/data.js]
  A --> D[js/sections/todo/index.js]
  A --> E[js/sections/expenses/index.js]
  A --> F[js/sections/gallery/index.js]
  D --> G[js/sections/todo/render.js]
  E --> H[js/sections/expenses/render.js]
  F --> I[js/sections/gallery/render.js]
  D --> J[js/shared/utils.js]
  E --> J
  F --> J
  H --> J
```

## State Model

The shared state object contains three top-level arrays:

- `todoItems`
- `expenses`
- `photos`

Initial values come from `js/shared/data.js`. `js/shared/storage.js` clones those defaults and uses them as a fallback when saved data is missing or invalid.

## Section Pattern

Each interactive section follows the same split:

- `index.js`: finds DOM nodes, binds events, updates state, and triggers persistence
- `render.js`: rebuilds the section UI from the current state

This keeps the bootstrap simple and makes each section independent while still sharing one persisted state object.
