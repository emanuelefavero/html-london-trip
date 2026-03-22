import {
  renderExpensesSection,
  renderPhotosSection,
  renderTodoSection,
} from './render.js'
import { loadState, saveState } from './storage.js'
import { createId, parseAmount } from './utils.js'

const state = loadState()

const elements = {
  todoList: document.querySelector('#todo-list'),
  todoForm: document.querySelector('#todo-form'),
  todoLabelInput: document.querySelector('#todo-label'),
  expensesBody: document.querySelector('#expenses-body'),
  expensesTotal: document.querySelector('#expenses-total'),
  expenseForm: document.querySelector('#expense-form'),
  expenseDescriptionInput: document.querySelector('#expense-description'),
  expenseAmountInput: document.querySelector('#expense-amount'),
  photosList: document.querySelector('#trip-photos-list'),
  photoForm: document.querySelector('#photo-form'),
  photoUrlInput: document.querySelector('#photo-url'),
}

const render = () => {
  renderTodoSection(state.todoItems, elements.todoList)
  renderExpensesSection(state.expenses, {
    body: elements.expensesBody,
    total: elements.expensesTotal,
  })
  renderPhotosSection(state.photos, elements.photosList)
}

const commit = () => {
  saveState(state)
  render()
}

const addTodoItem = (label) => {
  state.todoItems.push({
    id: createId(),
    label,
    completed: false,
  })
}

const toggleTodoItem = (todoId) => {
  state.todoItems = state.todoItems.map((item) => {
    if (item.id !== todoId) {
      return item
    }

    return {
      ...item,
      completed: !item.completed,
    }
  })
}

const removeTodoItem = (todoId) => {
  state.todoItems = state.todoItems.filter((item) => item.id !== todoId)
}

const addExpense = (description, amount) => {
  state.expenses.push({
    id: createId(),
    description,
    amount,
  })
}

const removeExpense = (expenseId) => {
  state.expenses = state.expenses.filter((expense) => expense.id !== expenseId)
}

const addPhoto = (src, alt) => {
  state.photos.push({
    id: createId(),
    src,
    alt: alt || 'Foto del viaggio a Londra',
  })
}

const removePhoto = (photoId) => {
  state.photos = state.photos.filter((photo) => photo.id !== photoId)
}

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

elements.todoList.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-todo-remove]')

  if (removeButton) {
    removeTodoItem(removeButton.dataset.todoRemove)
    commit()
    return
  }

  const toggleInput = event.target.closest('[data-todo-toggle]')

  if (toggleInput) {
    return
  }

  const todoItem = event.target.closest('[data-todo-item]')

  if (!todoItem) {
    return
  }

  toggleTodoItem(todoItem.dataset.todoItem)
  commit()
})

elements.todoList.addEventListener('change', (event) => {
  const toggleInput = event.target.closest('[data-todo-toggle]')

  if (!toggleInput) {
    return
  }

  toggleTodoItem(toggleInput.dataset.todoToggle)
  commit()
})

elements.expenseForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(elements.expenseForm)
  const description = formData.get('description').toString().trim()
  const amount = parseAmount(formData.get('amount').toString())

  if (!description || amount === null) {
    return
  }

  addExpense(description, amount)
  elements.expenseForm.reset()
  elements.expenseDescriptionInput.focus()
  commit()
})

elements.expensesBody.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-expense-remove]')

  if (!removeButton) {
    return
  }

  removeExpense(removeButton.dataset.expenseRemove)
  commit()
})

elements.photoForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(elements.photoForm)
  const src = formData.get('src').toString().trim()
  const alt = formData.get('alt').toString().trim()

  if (!src) {
    return
  }

  addPhoto(src, alt)
  elements.photoForm.reset()
  elements.photoUrlInput.focus()
  commit()
})

elements.photosList.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-photo-remove]')

  if (!removeButton) {
    return
  }

  removePhoto(removeButton.dataset.photoRemove)
  commit()
})

render()
