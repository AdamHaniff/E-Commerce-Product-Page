// VARIABLES
const galleryImage = document.querySelector(".gallery__image");
const galleryThumbnails = document.querySelector(".gallery__thumbnails");
const galleryThumbnailContainers = document.querySelectorAll(
  ".gallery__thumbnail-container"
);
const lightbox = document.querySelector(".lightbox");

// EVENT LISTENER CALLBACK FUNCTION
function handleGalleryThumbnailsHover(e) {
  // Check if the event target is 'galleryThumbnails'
  if (e.target === this) return;

  // Check if the event target or its parent has the class 'gallery__thumbnail-container'
  let target = e.target;

  while (target !== this) {
    if (target.classList.contains("gallery__thumbnail-container")) {
      // If container that is currently being hovered already contains the 'container-hovered' class, then do nothing
      if (target.classList.contains("container-hovered")) return;

      // Container that is currently being hovered does not contain the 'container-hovered' class
      galleryThumbnailContainers.forEach((container) => {
        // Remove 'container-hovered' class from previously-hovered container
        if (container.classList.contains("container-hovered")) {
          container.classList.remove("container-hovered");
        }
      });

      // Add 'container-hovered' class to currently hovered container
      target.classList.add("container-hovered");

      // Change gallery image to the image that is currently being hovered in the thumbnail container
      const thumbnailImage = target.querySelector(".gallery__thumbnail");
      galleryImage.src = thumbnailImage.src;

      return;
    }

    // Move up to the parent element
    target = target.parentElement;
  }
}

// EVENT LISTENERS
galleryThumbnails.addEventListener("mouseover", handleGalleryThumbnailsHover);

galleryThumbnails.addEventListener("click", function (e) {
  // Check if the event target is 'galleryThumbnails'
  if (e.target === this) return;

  // Check if the event target or its parent has the class 'gallery__thumbnail-container'
  let target = e.target;

  while (target !== this) {
    if (target.classList.contains("gallery__thumbnail-container")) {
      // Display lightbox
      lightbox.classList.add("lightbox--open");
      return;
    }

    // Move up to the parent element
    target = target.parentElement;
  }
});
