/**
 * @file Initial data for the app, used also as a fallback when no saved state is found in localStorage.
 */

/**
 * Default todo items used on first load and as a storage fallback.
 */
export const initialTodoItems = [
  {
    id: 'tower-of-london',
    label: 'Visitare la Tower of London',
    completed: false,
  },
  {
    id: 'greenwich',
    label: 'Visitare Greenwich',
    completed: true,
  },
  {
    id: 'covent-garden',
    label: 'Ascoltare un artista di strada a Covent Garden',
    completed: true,
  },
  {
    id: 'fish-and-chips',
    label: 'Mangiare il tipico Fish and Chips inglese',
    completed: false,
  },
]

/**
 * Default expenses used on first load and as a storage fallback.
 */
export const initialExpenses = [
  {
    id: 'expense-1',
    description: 'Biglietto aereo',
    amount: 150,
  },
  {
    id: 'expense-2',
    description: 'Hotel',
    amount: 250,
  },
  {
    id: 'expense-3',
    description: 'Metro',
    amount: 100,
  },
]

/**
 * Default photos used on first load and as a storage fallback.
 */
export const initialPhotos = [
  {
    id: 'millennium-bridge',
    src: 'https://www.abta.com/sites/default/files/styles/large/public/media/uploads/london-400x400-compressor_0.jpg',
    alt: 'Vista del Millennium Bridge a Londra',
  },
  {
    id: 'tower-bridge',
    src: 'https://imgc.allpostersimages.com/img/posters/evening-tower-bridge-and-river-thames-london_u-L-P2QVZJ0.jpg?artPerspective=n',
    alt: 'Tower Bridge illuminato sul Tamigi',
  },
]
