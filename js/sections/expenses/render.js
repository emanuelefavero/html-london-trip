import { formatEuro } from '../../shared/utils.js'

/**
 * @file Expenses section rendering.
 */

const calculateExpensesTotal = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

/**
 * Rebuilds the expenses table body and total.
 *
 * @param {{ id: string, description: string, amount: number }[]} expenses
 * @param {{ body: HTMLTableSectionElement, total: HTMLElement }} elements
 */
export const renderExpensesSection = (expenses, elements) => {
  const fragment = document.createDocumentFragment()

  // Build rows off-DOM and swap them in once to keep rendering simple.
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
    removeButton.setAttribute(
      'aria-label',
      `Rimuovi spesa: ${expense.description}`,
    )
    removeButton.textContent = 'X'

    actionCell.append(removeButton)
    row.append(indexCell, descriptionCell, amountCell, actionCell)
    fragment.append(row)
  })

  // Replace the table body and total
  elements.body.replaceChildren(fragment)
  elements.total.textContent = formatEuro(calculateExpensesTotal(expenses))
}
