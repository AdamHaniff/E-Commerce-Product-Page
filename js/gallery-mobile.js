import { updateImage } from "./imageUtils";

// VARIABLES
const imagesContainer = document.querySelector(".gallery__images");
const images = document.querySelectorAll(".gallery__img");
const previousBtn = document.querySelector(".gallery__previous-btn");
const nextBtn = document.querySelector(".gallery__next-btn");

// Initialize the current image index
let currentImageIndex = 0;

function handleNavigationBtnClick(e) {
  const previousBtn = e.target.closest(".gallery__previous-btn");
  const nextBtn = e.target.closest(".gallery__next-btn");

  currentImageIndex = updateImage(
    imagesContainer,
    images,
    currentImageIndex,
    previousBtn,
    nextBtn
  );
}

// EVENT LISTENERS
previousBtn.addEventListener("click", handleNavigationBtnClick);
nextBtn.addEventListener("click", handleNavigationBtnClick);
