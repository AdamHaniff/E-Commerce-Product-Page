import { translateImage, updateImage } from "./imageUtils";

// VARIABLES
const galleryImage = document.querySelector(".gallery__image");
const galleryThumbnails = document.querySelector(".gallery__thumbnails");
const galleryThumbnailContainers = document.querySelectorAll(
  ".gallery__thumbnail-container"
);
const lightbox = document.querySelector(".lightbox");
const lightboxCloseBtn = document.querySelector(".lightbox__close-btn");
const lightboxImagesContainer = document.querySelector(".lightbox__images");
const lightboxImages = document.querySelectorAll(".lightbox__img");
const previousBtn = document.querySelector(".lightbox__previous-btn");
const nextBtn = document.querySelector(".lightbox__next-btn");
const lightboxThumbnailContainers = document.querySelectorAll(
  ".lightbox__thumbnail-container"
);
const lightboxThumbnails = document.querySelector(".lightbox__thumbnails");

// Initialize the current image index
let currentImageIndex = 0;

// EVENT LISTENER CALLBACK FUNCTIONS
function handleGalleryImageClick() {
  // Make lightbox image the same image that was clicked in the thumbnail container
  galleryThumbnailContainers.forEach((container, index) => {
    if (container.classList.contains("container-clicked")) {
      currentImageIndex = index;
      translateImage(currentImageIndex, lightboxImagesContainer);
    }
  });

  // Display lightbox
  lightbox.classList.add("lightbox--open");
}

function handleThumbnailClick(e) {
  // Check if event target is 'galleryThumbnails'
  if (e.target === this) return;

  // Check if the event target or its parent has the class 'gallery__thumbnail-container'
  let target = e.target;

  while (target && target !== this) {
    if (target.classList.contains("gallery__thumbnail-container")) {
      // If container already has 'container-clicked' class, then do nothing
      if (target.classList.contains("container-clicked")) return;

      // Remove 'container-clicked' class from previously-clicked container
      galleryThumbnailContainers.forEach((container) => {
        if (container.classList.contains("container-clicked")) {
          container.classList.remove("container-clicked");
        }
      });

      // Add 'container-clicked' class to the container that was just clicked
      target.classList.add("container-clicked");

      // Change gallery image to the thumbnail image that was clicked
      const thumbnailImage = target.querySelector(".gallery__thumbnail");
      galleryImage.src = thumbnailImage.dataset.fullImage;

      return;
    }

    // Move up to the parent element
    target = target.parentElement;
  }
}

// GALLERY EVENT LISTENERS
galleryImage.addEventListener("click", handleGalleryImageClick);
galleryThumbnails.addEventListener("click", handleThumbnailClick);

// CODE FOR LIGHTBOX

// FUNCTIONS
function makeThumbnailContainerClicked(currentImageIndex) {
  lightboxThumbnailContainers.forEach((container, index) => {
    // Remove 'container-clicked' class from container that already has the class
    if (container.classList.contains("container-clicked")) {
      container.classList.remove("container-clicked");
    }

    // Add 'container-clicked' class to the container that has the same image as the lightbox image that is currently being displayed
    if (index === currentImageIndex) {
      container.classList.add("container-clicked");
    }
  });
}

// EVENT LISTENER CALLBACK FUNCTIONS
function handleLightboxCloseBtnClick(e) {
  const lightboxCloseBtn = e.target.closest(".lightbox__close-btn");
  if (!lightboxCloseBtn) return;

  lightboxImagesContainer.classList.remove("transition");

  // Hide the lightbox
  lightbox.classList.remove("lightbox--open");
}

function handlePreviousBtnClick(e) {
  currentImageIndex = updateImage(
    lightboxImagesContainer,
    lightboxImages,
    currentImageIndex,
    e,
    ".lightbox__previous-btn",
    ".lightbox__next-btn"
  );

  makeThumbnailContainerClicked(currentImageIndex);
}

function handleNextBtnClick(e) {
  currentImageIndex = updateImage(
    lightboxImagesContainer,
    lightboxImages,
    currentImageIndex,
    e,
    ".lightbox__previous-btn",
    ".lightbox__next-btn"
  );

  makeThumbnailContainerClicked(currentImageIndex);
}

function handleLightboxThumbnailClick(e) {
  // Check if event target is 'lightboxThumbnails'
  if (e.target === this) return;

  // Check if the event target or its parent has the class 'lightbox__thumbnail-container'
  let target = e.target;

  while (target && target !== this) {
    if (target.classList.contains("lightbox__thumbnail-container")) {
      // If container already has 'container-clicked' class, then do nothing
      if (target.classList.contains("container-clicked")) return;

      // Remove 'container-clicked' class from previously-clicked container
      lightboxThumbnailContainers.forEach((container) => {
        if (container.classList.contains("container-clicked")) {
          container.classList.remove("container-clicked");
        }
      });

      // Add 'container-clicked' class to the container that was just clicked
      target.classList.add("container-clicked");

      // WHATEVER THUMBNAIL CONTAINER WAS CLICKED,
      // WE WANT TO UPDATE CURRENTIMAGEINDEX TO THAT INDEX
      lightboxThumbnailContainers.forEach((container, index) => {
        if (container.classList.contains("container-clicked")) {
          currentImageIndex = index;
          lightboxImagesContainer.classList.add("transition");
          translateImage(currentImageIndex, lightboxImagesContainer);
        }
      });

      return;
    }

    // Move up to the parent element
    target = target.parentElement;
  }
}

// LIGHTBOX EVENT LISTENERS
previousBtn.addEventListener("click", handlePreviousBtnClick);
nextBtn.addEventListener("click", handleNextBtnClick);
lightboxCloseBtn.addEventListener("click", handleLightboxCloseBtnClick);
lightboxThumbnails.addEventListener("click", handleLightboxThumbnailClick);
