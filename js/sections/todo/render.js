/**
 * @file Todo section rendering.
 */

/**
 * Rebuilds the todo list from the current state.
 *
 * @param {{ id: string, label: string, completed: boolean }[]} todoItems
 * @param {HTMLElement} listElement
 */
export const renderTodoSection = (todoItems, listElement) => {
  const fragment = document.createDocumentFragment()

  // Build the next list off-DOM and replace in one pass.
  todoItems.forEach((item) => {
    const listItem = document.createElement('li')
    const content = document.createElement('div')
    const checkbox = document.createElement('input')
    const label = document.createElement('span')
    const removeButton = document.createElement('button')

    listItem.className = 'todo-item'
    listItem.dataset.todoItem = item.id
    if (item.completed) {
      listItem.classList.add('is-complete')
    }

    content.className = 'todo-item__content'

    checkbox.className = 'todo-item__checkbox'
    checkbox.type = 'checkbox'
    checkbox.checked = item.completed
    checkbox.dataset.todoToggle = item.id
    checkbox.setAttribute('aria-label', `Segna come completata: ${item.label}`)

    label.className = 'todo-item__label'
    label.textContent = item.label

    removeButton.className = 'todo-item__remove'
    removeButton.type = 'button'
    removeButton.dataset.todoRemove = item.id
    removeButton.setAttribute('aria-label', `Rimuovi attività: ${item.label}`)
    removeButton.textContent = 'Rimuovi'

    content.append(checkbox, label)
    listItem.append(content, removeButton)
    fragment.append(listItem)
  })

  // Replace the list content
  listElement.replaceChildren(fragment)
}
