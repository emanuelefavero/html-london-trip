/**
 * @file Shared utility functions for the app.
 */

/**
 * Formats a number as Euros using Italian locale rules.
 *
 * @param {number} amount
 * @returns {string}
 */
export const formatEuro = (amount) => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Parses a positive numeric amount from form input.
 *
 * @param {string} value
 * @returns {number|null}
 */
export const parseAmount = (value) => {
  const amount = Number.parseFloat(value)

  return Number.isFinite(amount) && amount > 0 ? amount : null
}

/**
 * Generates a stable id for newly created items.
 *
 * @returns {string}
 */
export const createId = () => {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }

  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
