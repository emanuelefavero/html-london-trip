import { initialExpenses, initialPhotos, initialTodoItems } from './data.js'

/**
 * @file Local storage helpers for loading and saving the shared app state.
 */

const STORAGE_KEY = 'html-london-trip-state-v1'

const cloneInitialState = () => {
  return {
    todoItems: structuredClone(initialTodoItems),
    expenses: structuredClone(initialExpenses),
    photos: structuredClone(initialPhotos),
  }
}

/**
 * Loads persisted state and falls back to the bundled defaults when storage is missing or invalid.
 *
 * @returns {{ todoItems: object[], expenses: object[], photos: object[] }}
 */
export const loadState = () => {
  const fallbackState = cloneInitialState()

  try {
    const storedValue = localStorage.getItem(STORAGE_KEY)

    if (!storedValue) return fallbackState

    const parsedState = JSON.parse(storedValue)

    if (
      !Array.isArray(parsedState.todoItems) ||
      !Array.isArray(parsedState.expenses) ||
      !Array.isArray(parsedState.photos)
    ) {
      return fallbackState
    }

    return parsedState
  } catch {
    return fallbackState
  }
}

/**
 * Persists the full app state to localStorage.
 *
 * @param {{ todoItems: object[], expenses: object[], photos: object[] }} state
 */
export const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
