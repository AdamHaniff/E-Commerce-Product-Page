// VARIABLES
const imagesContainer = document.querySelector(".gallery__images");
const images = document.querySelectorAll(".gallery__img");
const previousBtn = document.querySelector(".gallery__previous-btn");
const nextBtn = document.querySelector(".gallery__next-btn");

// Initialize the current image index
let currentIndex = 0;

// Function to update the displayed image with a sliding transition
function updateImage() {
  const translateX = -currentIndex * 100;
  imagesContainer.style.transform = `translateX(${translateX}%)`;
}

// EVENT LISTENER CALLBACK FUNCTIONS
function handlePreviousBtnClick(e) {
  const previousBtn = e.target.closest(".gallery__previous-btn");
  if (!previousBtn) return;

  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
}

function handleNextBtnClick(e) {
  const nextBtn = e.target.closest(".gallery__next-btn");
  if (!nextBtn) return;

  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
}

// EVENT LISTENERS
previousBtn.addEventListener("click", handlePreviousBtnClick);
nextBtn.addEventListener("click", handleNextBtnClick);
