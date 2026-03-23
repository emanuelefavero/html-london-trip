import { createId, parseAmount } from '../../shared/utils.js'
import { renderExpensesSection } from './render.js'

/**
 * @file Expenses section controller: DOM lookup, event binding, and state updates.
 */

/**
 * Wires the expenses section to the shared app state.
 *
 * @param {{ state: { expenses: object[] }, save: () => void }} options
 * @returns {{ render: () => void }}
 */
export const createExpensesSection = ({ state, save }) => {
  const elements = {
    body: document.querySelector('#expenses-body'),
    total: document.querySelector('#expenses-total'),
    form: document.querySelector('#expense-form'),
    descriptionInput: document.querySelector('#expense-description'),
  }

  const render = () => {
    renderExpensesSection(state.expenses, {
      body: elements.body,
      total: elements.total,
    })
  }

  // Persist first, then repaint the section from the current shared state.
  const commit = () => {
    save()
    render()
  }

  const addExpense = (description, amount) => {
    state.expenses.push({
      id: createId(),
      description,
      amount,
    })
  }

  const removeExpense = (expenseId) => {
    state.expenses = state.expenses.filter(
      (expense) => expense.id !== expenseId,
    )
  }

  // Handle form submission to add a new expense.
  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(elements.form)
    const description = formData.get('description').toString().trim()
    const amount = parseAmount(formData.get('amount').toString())

    if (!description || amount === null) return

    addExpense(description, amount)
    elements.form.reset()
    elements.descriptionInput.focus()
    commit()
  })

  // Handle clicks on remove buttons using event delegation.
  elements.body.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-expense-remove]')

    if (!removeButton) return

    removeExpense(removeButton.dataset.expenseRemove)
    commit()
  })

  return { render }
}
