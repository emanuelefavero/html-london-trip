import { createId } from '../../shared/utils.js'
import { renderTodoSection } from './render.js'

/**
 * @file Todo section controller: DOM lookup, event binding, and state updates.
 */

/**
 * Wires the todo section to the shared app state.
 *
 * @param {{ state: { todoItems: object[] }, save: () => void }} options
 * @returns {{ render: () => void }}
 */
export const createTodoSection = ({ state, save }) => {
  const elements = {
    list: document.querySelector('#todo-list'),
    form: document.querySelector('#todo-form'),
    labelInput: document.querySelector('#todo-label'),
  }

  const render = () => {
    renderTodoSection(state.todoItems, elements.list)
  }

  // Persist first, then repaint the section from the current shared state.
  const commit = () => {
    save()
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
      if (item.id !== todoId) return item

      return {
        ...item,
        completed: !item.completed,
      }
    })
  }

  const removeTodoItem = (todoId) => {
    state.todoItems = state.todoItems.filter((item) => item.id !== todoId)
  }

  // Handle form submission to add a new todo item.
  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(elements.form)
    const label = formData.get('label').toString().trim()

    if (!label) return

    addTodoItem(label)
    elements.form.reset()
    elements.labelInput.focus()
    commit()
  })

  // Handle clicks on remove buttons and toggling using event delegation.
  elements.list.addEventListener('click', (event) => {
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

  // Handle changes on toggle inputs using event delegation to avoid issues with click events on labels.
  elements.list.addEventListener('change', (event) => {
    const toggleInput = event.target.closest('[data-todo-toggle]')

    if (!toggleInput) return

    toggleTodoItem(toggleInput.dataset.todoToggle)
    commit()
  })

  return { render }
}
