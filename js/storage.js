import { initialExpenses, initialPhotos, initialTodoItems } from './data.js'

const STORAGE_KEY = 'html-london-trip-state-v1'

const cloneInitialState = () => {
  return {
    todoItems: structuredClone(initialTodoItems),
    expenses: structuredClone(initialExpenses),
    photos: structuredClone(initialPhotos),
  }
}

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

export const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
