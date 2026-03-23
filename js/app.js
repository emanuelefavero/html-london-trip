import { createExpensesSection } from './sections/expenses/index.js'
import { createGallerySection } from './sections/gallery/index.js'
import { createTodoSection } from './sections/todo/index.js'
import { loadState, saveState } from './shared/storage.js'

/**
 * @file Main app bootstrap. Composes the interactive sections around shared persisted state.
 */

const state = loadState()

// Each section mutates the shared state object and delegates persistence here.
const save = () => {
  saveState(state)
}

const todoSection = createTodoSection({ state, save })
const expensesSection = createExpensesSection({ state, save })
const gallerySection = createGallerySection({ state, save })

todoSection.render()
expensesSection.render()
gallerySection.render()
