// HELPER FUNCTION
function translateImage(currentIndex, imagesContainer) {
  const translateX = -currentIndex * 100;
  imagesContainer.style.transform = `translateX(${translateX}%)`;
}

// MAIN FUNCTION
function updateImage(
  imagesContainer,
  images,
  currentIndex,
  e,
  previousBtnClass,
  nextBtnClass
) {
  const previousBtn = e.target.closest(previousBtnClass);
  const nextBtn = e.target.closest(nextBtnClass);

  if (previousBtn) {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  } else if (nextBtn) {
    currentIndex = (currentIndex + 1) % images.length;
  }

  translateImage(currentIndex, imagesContainer);

  return currentIndex;
}

export default updateImage;
