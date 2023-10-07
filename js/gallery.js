import { updateImage } from "./imageUtils";

// VARIABLES
const imagesContainer = document.querySelector(".gallery__images");
const images = document.querySelectorAll(".gallery__img");
const previousBtn = document.querySelector(".gallery__previous-btn");
const nextBtn = document.querySelector(".gallery__next-btn");

// Initialize the current image index
let currentImageIndex = 0;

function handlePreviousBtnClick(e) {
  currentImageIndex = updateImage(
    imagesContainer,
    images,
    currentImageIndex,
    e,
    ".gallery__previous-btn",
    ".gallery__next-btn"
  );
}

function handleNextBtnClick(e) {
  currentImageIndex = updateImage(
    imagesContainer,
    images,
    currentImageIndex,
    e,
    ".gallery__previous-btn",
    ".gallery__next-btn"
  );
}

// EVENT LISTENERS
previousBtn.addEventListener("click", handlePreviousBtnClick);
nextBtn.addEventListener("click", handleNextBtnClick);
