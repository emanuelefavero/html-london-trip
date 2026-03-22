import { formatEuro } from './utils.js'

export const calculateExpensesTotal = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

export const renderExpensesSection = (expenses, elements) => {
  const fragment = document.createDocumentFragment()

  expenses.forEach((expense, index) => {
    const row = document.createElement('tr')
    const indexCell = document.createElement('td')
    const descriptionCell = document.createElement('td')
    const amountCell = document.createElement('td')
    const actionCell = document.createElement('td')
    const removeButton = document.createElement('button')

    indexCell.textContent = String(index + 1)
    descriptionCell.textContent = expense.description
    amountCell.textContent = formatEuro(expense.amount)
    actionCell.className = 'expenses__action-cell'

    removeButton.className = 'expenses__remove'
    removeButton.type = 'button'
    removeButton.dataset.expenseRemove = expense.id
    removeButton.setAttribute('aria-label', `Rimuovi spesa: ${expense.description}`)
    removeButton.textContent = 'X'

    actionCell.append(removeButton)
    row.append(indexCell, descriptionCell, amountCell, actionCell)
    fragment.append(row)
  })

  elements.body.replaceChildren(fragment)

  elements.total.textContent = formatEuro(calculateExpensesTotal(expenses))
}

export const renderTodoSection = (todoItems, listElement) => {
  const fragment = document.createDocumentFragment()

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

  listElement.replaceChildren(fragment)
}

export const renderPhotosSection = (photos, listElement) => {
  const fragment = document.createDocumentFragment()

  photos.forEach((photo) => {
    const card = document.createElement('figure')
    const image = document.createElement('img')
    const removeButton = document.createElement('button')

    card.className = 'trip-photo-card'

    image.src = photo.src
    image.alt = photo.alt

    removeButton.className = 'trip-photo-card__remove'
    removeButton.type = 'button'
    removeButton.dataset.photoRemove = photo.id
    removeButton.setAttribute('aria-label', `Rimuovi foto: ${photo.alt}`)
    removeButton.textContent = 'Rimuovi'

    card.append(image, removeButton)
    fragment.append(card)
  })

  listElement.replaceChildren(fragment)
}
