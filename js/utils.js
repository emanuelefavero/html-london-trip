/**
 * @file Utility functions for the app.
 */

/**
 * Formats a number as a currency string in Euros, using Italian formatting conventions (e.g. "€1.000,00" for one thousand euros). It also handles both integer and decimal amounts, ensuring that integers are displayed without decimal places while decimals always show two digits.
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
 * Parses positive amounts from form input. Returns null for invalid values to simplify validation in event handlers.
 *
 * @param {string} value
 * @returns {number|null}
 */
export const parseAmount = (value) => {
  const amount = Number.parseFloat(value)

  return Number.isFinite(amount) && amount > 0 ? amount : null
}

/**
 * Generates ids for new state entries.
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
