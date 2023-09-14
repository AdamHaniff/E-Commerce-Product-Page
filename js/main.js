import "core-js/stable";
import "regenerator-runtime/runtime";

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

// Event listener for the "previous" button
previousBtn.addEventListener("click", function (e) {
  const previousBtn = e.target.closest(".gallery__previous-btn");
  if (!previousBtn) return;

  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
});

// Event listener for the "next" button
nextBtn.addEventListener("click", function (e) {
  const nextBtn = e.target.closest(".gallery__next-btn");
  if (!nextBtn) return;

  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
});
