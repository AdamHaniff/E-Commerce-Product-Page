import "core-js/stable";
import "regenerator-runtime/runtime";

// VARIABLES
const quantityPlusBtn = document.querySelector(".quantity__plus");
const quantityMinusBtn = document.querySelector(".quantity__minus");
const quantityNumber = document.querySelector(".quantity__number");
const addToCartBtn = document.querySelector(".add-cart-btn");
const quantityContainer = document.querySelector(".quantity");
const headerCartQuantity = document.querySelector(".header__cart-quantity");
const headerCartContainer = document.querySelector(".header__cart-container");

// Initialize 'quantity' and 'totalCartQuantity' with a value of 0
let quantity = 0;
let totalCartQuantity = 0;

// FUNCTIONS
function makeQuantityContainerShake() {
  quantityContainer.classList.add("shake");

  // Remove 'shake' class after animation ends
  quantityContainer.addEventListener("animationend", function () {
    quantityContainer.classList.remove("shake");
  });
}

function scrollToTopOfPage() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function displayHeaderCartQuantity() {
  // Update value of 'totalCartQuantity'
  totalCartQuantity += quantity;

  // Update text content of 'headerCartQuantity' to the value of 'totalCartQuantity'
  headerCartQuantity.textContent = totalCartQuantity;

  // Make 'headerCartQuantity' visible
  headerCartQuantity.classList.remove("hidden");
}

// EVENT LISTENER CALLBACK FUNCTIONS
function handleQuantityPlusBtnClick(e) {
  const quantityPlusBtn = e.target.closest(".quantity__plus");
  if (!quantityPlusBtn) return;

  // Increase 'quantity' variable
  quantity++;

  // Update text content of 'quantityNumber'
  quantityNumber.textContent = quantity;
}

function handleQuantityMinusBtnClick(e) {
  const quantityMinusBtn = e.target.closest(".quantity__minus");
  if (!quantityMinusBtn) return;

  // Do nothing if 'quantity' is 0
  if (quantity === 0) return;

  // Decrease 'quantity' variable
  quantity--;

  // Update text content of 'quantityNumber'
  quantityNumber.textContent = quantity;
}

function handleAddToCartBtnClick(e) {
  const addToCartBtn = e.target.closest(".add-cart-btn");
  if (!addToCartBtn) return;

  if (quantity === 0) {
    makeQuantityContainerShake();
    return;
  }

  // If 'quantity' is more than 0, scroll smoothly to the top of page and display 'headerCartQuantity'
  scrollToTopOfPage();
  displayHeaderCartQuantity();

  // Make 'headerCartContainer' pulse and give cart icon a color change animation
  headerCartContainer.classList.add("pulse");
}

// EVENT LISTENERS
quantityPlusBtn.addEventListener("click", handleQuantityPlusBtnClick);
quantityMinusBtn.addEventListener("click", handleQuantityMinusBtnClick);
addToCartBtn.addEventListener("click", handleAddToCartBtnClick);
