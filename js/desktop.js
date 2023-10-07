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

// Initialize the current image index
let currentImageIndex = 0;

// FUNCTIONS
function handleThumbnailHover(target) {
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
  galleryImage.src = thumbnailImage.dataset.fullImage;
}

function handleThumbnailClick(target) {
  // Find which thumbnail container was clicked
  const thumbnailContainer = target;

  // Make lighbox image the same image that was clicked in the thumbnail container
  galleryThumbnailContainers.forEach((container, index) => {
    if (container === thumbnailContainer) {
      currentImageIndex = index;
      translateImage(currentImageIndex, lightboxImagesContainer);
    }
  });

  // Display lightbox
  lightbox.classList.add("lightbox--open");
}

// EVENT LISTENER CALLBACK FUNCTIONS
function handleGalleryEvent(e, eventType) {
  // Check if the event target is 'galleryThumbnails'
  if (e.target === this) return;

  // Check if the event target or its parent has the class 'gallery__thumbnail-container'
  let target = e.target;

  while (target && target !== this) {
    if (target.classList.contains("gallery__thumbnail-container")) {
      if (eventType === "hover") {
        handleThumbnailHover(target);
      } else if (eventType === "click") {
        handleThumbnailClick(target);
      }
      return;
    }

    // Move up to the parent element
    target = target.parentElement;
  }
}

// GALLERY EVENT LISTENERS
galleryThumbnails.addEventListener("mouseover", (e) =>
  handleGalleryEvent(e, "hover")
);

galleryThumbnails.addEventListener("click", (e) =>
  handleGalleryEvent(e, "click")
);

// CODE FOR LIGHTBOX

// EVENT LISTENER CALLBACK FUNCTIONS
function handlePreviousBtnClick(e) {
  currentImageIndex = updateImage(
    lightboxImagesContainer,
    lightboxImages,
    currentImageIndex,
    e,
    ".lightbox__previous-btn",
    ".lightbox__next-btn"
  );
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
}

function handleLightboxCloseBtnClick(e) {
  const lightboxCloseBtn = e.target.closest(".lightbox__close-btn");
  if (!lightboxCloseBtn) return;

  // Hide the lightbox
  lightbox.classList.remove("lightbox--open");
}

// EVENT LISTENERS
previousBtn.addEventListener("click", handlePreviousBtnClick);
nextBtn.addEventListener("click", handleNextBtnClick);
lightboxCloseBtn.addEventListener("click", handleLightboxCloseBtnClick);
