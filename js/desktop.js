import { removeContainerClickedClass } from "./helpers";
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
const lightboxOverlay = document.querySelector(".lightbox__overlay");

// Initialize the current image index
let currentImageIndex = 0;

// CODE FOR GALLERY

// FUNCTIONS
function displayCorrectGalleryImg(target) {
  const thumbnailImage = target.querySelector(".gallery__thumbnail");
  galleryImage.src = thumbnailImage.dataset.fullImage;
}

// EVENT LISTENER CALLBACK FUNCTION
function handleGalleryImageClick() {
  // Display lightbox
  lightbox.classList.add("lightbox--open");
}

// GALLERY EVENT LISTENER
galleryImage.addEventListener("click", handleGalleryImageClick);

// CODE FOR LIGHTBOX

// FUNCTIONS
function displayCorrectLightboxImg(thumbnailContainers) {
  thumbnailContainers.forEach((container, index) => {
    if (container.classList.contains("container-clicked")) {
      currentImageIndex = index;

      if (thumbnailContainers === lightboxThumbnailContainers) {
        lightboxImagesContainer.classList.add("transition");
      }

      translateImage(currentImageIndex, lightboxImagesContainer);
    }
  });
}

function makeThumbnailContainerClicked(currentImageIndex) {
  // Remove 'container-clicked' class from container that already has the class
  removeContainerClickedClass(lightboxThumbnailContainers);

  // Add 'container-clicked' class to the container that has the same image as the lightbox image that is currently being displayed
  lightboxThumbnailContainers[currentImageIndex].classList.add(
    "container-clicked"
  );
}

function hideLightbox() {
  lightboxImagesContainer.classList.remove("transition");
  lightbox.classList.remove("lightbox--open");
}

// EVENT LISTENER CALLBACK FUNCTIONS
function handleLightboxCloseBtnClick(e) {
  const lightboxCloseBtn = e.target.closest(".lightbox__close-btn");
  if (!lightboxCloseBtn) return;

  hideLightbox();
}

function handleLightboxOverlayClick(e) {
  const target = e.target;
  if (!target.classList.contains("lightbox__overlay")) return;

  hideLightbox();
}

function handleNavigationBtnClick(e) {
  const previousBtn = e.target.closest(".lightbox__previous-btn");
  const nextBtn = e.target.closest(".lightbox__next-btn");

  currentImageIndex = updateImage(
    lightboxImagesContainer,
    lightboxImages,
    currentImageIndex,
    previousBtn,
    nextBtn
  );

  makeThumbnailContainerClicked(currentImageIndex);
}

// LIGHTBOX EVENT LISTENERS
previousBtn.addEventListener("click", handleNavigationBtnClick);
nextBtn.addEventListener("click", handleNavigationBtnClick);
lightboxCloseBtn.addEventListener("click", handleLightboxCloseBtnClick);
lightboxOverlay.addEventListener("click", handleLightboxOverlayClick);

// EVENT LISTENER CALLBACK FUNCTION FOR GALLERY AND LIGHTBOX THUMBNAILS
function handleThumbnailClick(e, thumbnailContainerClass, thumbnailContainers) {
  // Check if event target is 'galleryThumbnails' or 'lightboxThumbnails'
  if (e.target === this) return;

  // Check if the event target or its parent has the class 'gallery__thumbnail-container' or 'lightbox__thumbnail-container'
  let target = e.target;

  while (target && target !== this) {
    if (target.classList.contains(thumbnailContainerClass)) {
      // If container already has 'container-clicked' class, then do nothing
      if (target.classList.contains("container-clicked")) return;

      // Remove 'container-clicked' class from previously-clicked container
      removeContainerClickedClass(thumbnailContainers);

      // Add 'container-clicked' class to the container that was just clicked
      target.classList.add("container-clicked");

      if (thumbnailContainers === galleryThumbnailContainers) {
        // Change gallery image to the thumbnail image that was clicked
        displayCorrectGalleryImg(target);

        // Make lightbox image the same image that was clicked in the gallery thumbnail container
        displayCorrectLightboxImg(galleryThumbnailContainers);

        // Whichever image is currented displayed in the gallery, the lightbox thumbnail container with that image needs to have the 'container-clicked' class
        makeThumbnailContainerClicked(currentImageIndex);
      }

      if (thumbnailContainers === lightboxThumbnailContainers) {
        // Whichever thumbnail container was clicked, the image inside that container needs to be displayed as the lightbox image.
        displayCorrectLightboxImg(lightboxThumbnailContainers);
      }

      return;
    }

    // Move up to the parent element
    target = target.parentElement;
  }
}

// GALLERY AND LIGHTBOX THUMBNAILS EVENT LISTENERS
galleryThumbnails.addEventListener("click", (e) =>
  handleThumbnailClick(
    e,
    "gallery__thumbnail-container",
    galleryThumbnailContainers
  )
);

lightboxThumbnails.addEventListener("click", (e) =>
  handleThumbnailClick(
    e,
    "lightbox__thumbnail-container",
    lightboxThumbnailContainers
  )
);
