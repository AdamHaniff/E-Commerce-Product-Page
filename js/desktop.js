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
  galleryImage.src = thumbnailImage.src;
}

function handleThumbnailClick() {
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
        handleThumbnailClick();
      }
      return;
    }

    // Move up to the parent element
    target = target.parentElement;
  }
}

function handleLightboxCloseBtnClick(e) {
  const lightboxCloseBtn = e.target.closest(".lightbox__close-btn");
  if (!lightboxCloseBtn) return;

  // Hide the lightbox
  lightbox.classList.remove("lightbox--open");
}

// EVENT LISTENERS
galleryThumbnails.addEventListener("mouseover", (e) =>
  handleGalleryEvent(e, "hover")
);

galleryThumbnails.addEventListener("click", (e) =>
  handleGalleryEvent(e, "click")
);

// Initialize the current image index
let currentIndex = 0;

// Function to update the displayed image with a sliding transition
function updateImage() {
  const translateX = -currentIndex * 100;
  lightboxImagesContainer.style.transform = `translateX(${translateX}%)`;
}

// EVENT LISTENER CALLBACK FUNCTIONS
function handlePreviousBtnClick(e) {
  const previousBtn = e.target.closest(".lightbox__previous-btn");
  if (!previousBtn) return;

  currentIndex =
    (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateImage();
}

function handleNextBtnClick(e) {
  const nextBtn = e.target.closest(".lightbox__next-btn");
  if (!nextBtn) return;

  currentIndex = (currentIndex + 1) % lightboxImages.length;
  updateImage();
}

// EVENT LISTENERS
previousBtn.addEventListener("click", handlePreviousBtnClick);
nextBtn.addEventListener("click", handleNextBtnClick);

lightboxCloseBtn.addEventListener("click", handleLightboxCloseBtnClick);
