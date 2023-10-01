// VARIABLES
const galleryImage = document.querySelector(".gallery__image");
const galleryThumbnails = document.querySelector(".gallery__thumbnails");

galleryThumbnails.addEventListener("mouseover", function (e) {
  // Check if the event target or its parent has the class 'gallery__thumbnail-container'
  let target = e.target;

  while (target !== this) {
    if (target.classList.contains("gallery__thumbnail-container")) {
      return;
    }

    target = target.parentElement;
  }
});
