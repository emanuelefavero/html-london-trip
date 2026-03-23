import {
  renderExpensesSection,
  renderPhotosSection,
  renderTodoSection,
} from './render.js'
import { loadState, saveState } from './storage.js'
import { createId, parseAmount } from './utils.js'

/**
 * @file Main app logic: state management, event handlers, and rendering orchestration.
 */

// In-memory state shared by all interactive sections.
const state = loadState()

// DOM references used by rendering and event handlers.
const elements = {
  todoList: document.querySelector('#todo-list'),
  todoForm: document.querySelector('#todo-form'),
  todoLabelInput: document.querySelector('#todo-label'),
  expensesBody: document.querySelector('#expenses-body'),
  expensesTotal: document.querySelector('#expenses-total'),
  expenseForm: document.querySelector('#expense-form'),
  expenseDescriptionInput: document.querySelector('#expense-description'),
  expenseAmountInput: document.querySelector('#expense-amount'),
  photosList: document.querySelector('#photo-gallery-list'),
  photoForm: document.querySelector('#photo-form'),
  photoUrlInput: document.querySelector('#photo-url'),
}

/**
 * Re-renders the interactive sections from the current state.
 */
const render = () => {
  renderTodoSection(state.todoItems, elements.todoList)
  renderExpensesSection(state.expenses, {
    body: elements.expensesBody,
    total: elements.expensesTotal,
  })
  renderPhotosSection(state.photos, elements.photosList)
}

/**
 * Saves the current state and refreshes the UI.
 */
const commit = () => {
  saveState(state)
  render()
}

// --------------
// State update helpers.

/**
 * Adds a new todo item.
 *
 * @param {string} label
 */
const addTodoItem = (label) => {
  state.todoItems.push({
    id: createId(),
    label,
    completed: false,
  })
}

/**
 * Toggles the completion state of a todo item.
 *
 * @param {string} todoId
 */
const toggleTodoItem = (todoId) => {
  state.todoItems = state.todoItems.map((item) => {
    if (item.id !== todoId) return item

    return {
      ...item,
      completed: !item.completed,
    }
  })
}

/**
 * Removes a todo item.
 *
 * @param {string} todoId
 */
const removeTodoItem = (todoId) => {
  state.todoItems = state.todoItems.filter((item) => item.id !== todoId)
}

/**
 * Adds a new expense entry.
 *
 * @param {string} description
 * @param {number} amount
 */
const addExpense = (description, amount) => {
  state.expenses.push({
    id: createId(),
    description,
    amount,
  })
}

/**
 * Removes an expense entry.
 *
 * @param {string} expenseId
 */
const removeExpense = (expenseId) => {
  state.expenses = state.expenses.filter((expense) => expense.id !== expenseId)
}

/**
 * Adds a photo and guarantees a fallback alt text for later rendering.
 *
 * @param {string} src
 * @param {string} alt
 */
const addPhoto = (src, alt) => {
  state.photos.push({
    id: createId(),
    src,
    alt: alt || 'Foto del viaggio a Londra',
  })
}

/**
 * Removes a photo.
 *
 * @param {string} photoId
 */
const removePhoto = (photoId) => {
  state.photos = state.photos.filter((photo) => photo.id !== photoId)
}

// --------------
// Form and list event handlers.

// TODO LIST
// Add new items with a non-empty label, parsed from the form.
elements.todoForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(elements.todoForm)
  const label = formData.get('label').toString().trim()

  if (!label) return

  addTodoItem(label)
  elements.todoForm.reset()
  elements.todoLabelInput.focus()
  commit()
})

// Remove items with the button in each entry, matching the stored id, or toggle completion by clicking the entry.
elements.todoList.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-todo-remove]')

  if (removeButton) {
    removeTodoItem(removeButton.dataset.todoRemove)
    commit()
    return
  }

  const toggleInput = event.target.closest('[data-todo-toggle]')

  if (toggleInput) return

  const todoItem = event.target.closest('[data-todo-item]')

  if (!todoItem) return

  toggleTodoItem(todoItem.dataset.todoItem)
  commit()
})

// Toggle completion with the checkbox in each entry, matching the stored id.
elements.todoList.addEventListener('change', (event) => {
  const toggleInput = event.target.closest('[data-todo-toggle]')

  if (!toggleInput) return

  toggleTodoItem(toggleInput.dataset.todoToggle)
  commit()
})

// EXPENSES
// Add new expenses with a description and a positive amount, parsed from the form.
elements.expenseForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(elements.expenseForm)
  const description = formData.get('description').toString().trim()
  const amount = parseAmount(formData.get('amount').toString())

  if (!description || amount === null) return

  addExpense(description, amount)
  elements.expenseForm.reset()
  elements.expenseDescriptionInput.focus()
  commit()
})

// Remove expenses with the button in each entry, matching the stored id.
elements.expensesBody.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-expense-remove]')

  if (!removeButton) return

  removeExpense(removeButton.dataset.expenseRemove)
  commit()
})

// PHOTOS
// Add new photos with a URL and an optional alt text for accessibility.
elements.photoForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(elements.photoForm)
  const src = formData.get('src').toString().trim()
  const alt = formData.get('alt').toString().trim()

  if (!src) return

  addPhoto(src, alt)
  elements.photoForm.reset()
  elements.photoUrlInput.focus()
  commit()
})

// Remove photos with the button in each entry, matching the stored id.
elements.photosList.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-photo-remove]')

  if (!removeButton) return

  removePhoto(removeButton.dataset.photoRemove)
  commit()
})

// Replace the static fallback markup with the stored state.
render()
