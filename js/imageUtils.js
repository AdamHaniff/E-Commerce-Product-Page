// HELPER FUNCTION
function translateImage(currentImageIndex, imagesContainer) {
  const translateX = -currentImageIndex * 100;
  imagesContainer.style.transform = `translateX(${translateX}%)`;
}

// MAIN FUNCTION
function updateImage(
  imagesContainer,
  images,
  currentImageIndex,
  e,
  previousBtnClass,
  nextBtnClass
) {
  const previousBtn = e.target.closest(previousBtnClass);
  const nextBtn = e.target.closest(nextBtnClass);

  if (previousBtn) {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  } else if (nextBtn) {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }

  translateImage(currentImageIndex, imagesContainer);

  return currentImageIndex;
}

export { translateImage, updateImage };
