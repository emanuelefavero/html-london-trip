/**
 * @file Gallery section rendering.
 */

/**
 * Rebuilds the gallery from the current photo list.
 *
 * @param {{ id: string, src: string, alt: string }[]} photos
 * @param {HTMLElement} listElement
 */
export const renderGallerySection = (photos, listElement) => {
  const fragment = document.createDocumentFragment()

  // Recreate the gallery cards off-DOM and replace the list in one pass.
  photos.forEach((photo) => {
    const card = document.createElement('figure')
    const image = document.createElement('img')
    const removeButton = document.createElement('button')

    card.className = 'gallery__card'

    image.src = photo.src
    image.alt = photo.alt

    removeButton.className = 'gallery__remove'
    removeButton.type = 'button'
    removeButton.dataset.photoRemove = photo.id
    removeButton.setAttribute('aria-label', `Rimuovi foto: ${photo.alt}`)
    removeButton.textContent = 'Rimuovi'

    card.append(image, removeButton)
    fragment.append(card)
  })

  // Replace the list content
  listElement.replaceChildren(fragment)
}
