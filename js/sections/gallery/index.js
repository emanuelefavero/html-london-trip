import { createId } from '../../shared/utils.js'
import { renderGallerySection } from './render.js'

/**
 * @file Gallery section controller: DOM lookup, event binding, and state updates.
 */

/**
 * Wires the gallery section to the shared app state.
 *
 * @param {{ state: { photos: object[] }, save: () => void }} options
 * @returns {{ render: () => void }}
 */
export const createGallerySection = ({ state, save }) => {
  const elements = {
    list: document.querySelector('#photo-gallery-list'),
    form: document.querySelector('#photo-form'),
    urlInput: document.querySelector('#photo-url'),
  }

  const render = () => {
    renderGallerySection(state.photos, elements.list)
  }

  // Persist first, then repaint the section from the current shared state.
  const commit = () => {
    save()
    render()
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

  // Handle form submission to add a new photo.
  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(elements.form)
    const src = formData.get('src').toString().trim()
    const alt = formData.get('alt').toString().trim()

    if (!src) return

    addPhoto(src, alt)
    elements.form.reset()
    elements.urlInput.focus()
    commit()
  })

  // Handle clicks on remove buttons using event delegation.
  elements.list.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-photo-remove]')

    if (!removeButton) return

    removePhoto(removeButton.dataset.photoRemove)
    commit()
  })

  return { render }
}
