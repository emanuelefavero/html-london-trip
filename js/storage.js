import { initialExpenses, initialPhotos, initialTodoItems } from './data.js'

/**
 * @file Local storage management for the app. Provides functions to load and save the app state, with built-in validation and fallbacks to ensure a consistent experience even when storage is unavailable or contains invalid data.
 */

const STORAGE_KEY = 'html-london-trip-state-v1'

// Clone the defaults so runtime edits never touch the source data.
// ? `structuredClone` provides a deep copy, so nested objects/arrays are also duplicated, preventing accidental mutations of the initial data.

/**
 * Clone the initial data so runtime edits never touch the source data.
 * `structuredClone` provides a deep copy, so nested objects/arrays are also duplicated, preventing accidental mutations of the initial data.
 *
 * @returns {object}
 */
const cloneInitialState = () => {
  return {
    todoItems: structuredClone(initialTodoItems),
    expenses: structuredClone(initialExpenses),
    photos: structuredClone(initialPhotos),
  }
}

/**
 * Restores the saved state or returns the initial data if storage is invalid.
 *
 * @returns {object}
 */
export const loadState = () => {
  const fallbackState = cloneInitialState() // get initial data

  try {
    const storedValue = localStorage.getItem(STORAGE_KEY) // get saved state

    // If no saved state is found, return the initial data as the app state
    if (!storedValue) return fallbackState

    // Parse saved JSON state as a JS object
    const parsedState = JSON.parse(storedValue)

    // If the parsed state doesn't have the expected shape (e.g. missing arrays), return the initial data as the app state
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
 * Saves the current app state to localStorage.
 *
 * @param {object} state
 */
export const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
