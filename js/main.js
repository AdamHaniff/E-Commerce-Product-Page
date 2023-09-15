import "core-js/stable";
import "regenerator-runtime/runtime";

// VARIABLES
const quantityPlusBtn = document.querySelector(".quantity__plus");
const quantityMinusBtn = document.querySelector(".quantity__minus");
const quantityNumber = document.querySelector(".quantity__number");
const addToCartBtn = document.querySelector(".add-cart-btn");
const quantityContainer = document.querySelector(".quantity");
const headerCartQuantity = document.querySelector(".header__cart-quantity");

// Initialize 'quantity' with a value of 0
let quantity = 0;

// FUNCTIONS
function makeElementShake(element) {
  element.classList.add("shake");

  // Remove 'shake' class after animation ends
  element.addEventListener("animationend", function () {
    element.classList.remove("shake");
  });
}

// EVENT LISTENERS
quantityPlusBtn.addEventListener("click", function (e) {
  const quantityPlusBtn = e.target.closest(".quantity__plus");
  if (!quantityPlusBtn) return;

  // Increase 'quantity' variable
  quantity++;

  // Update text content of 'quantityNumber'
  quantityNumber.textContent = quantity;
});

quantityMinusBtn.addEventListener("click", function (e) {
  const quantityMinusBtn = e.target.closest(".quantity__minus");
  if (!quantityMinusBtn) return;

  // Do nothing if 'quantity' is 0
  if (quantity === 0) return;

  // Decrease 'quantity' variable
  quantity--;

  // Update text content of 'quantityNumber'
  quantityNumber.textContent = quantity;
});

addToCartBtn.addEventListener("click", function (e) {
  const addToCartBtn = e.target.closest(".add-cart-btn");
  if (!addToCartBtn) return;

  if (quantity === 0) {
    makeElementShake(quantityContainer);
    return;
  }

  // If 'quantity' is more than 0, scroll smoothly to the top of page
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // Make 'headerCartQuantity' visible
  headerCartQuantity.classList.remove("hidden");

  // Update text content of 'headerCartQuantity' to the value of 'quantity'
  headerCartQuantity.textContent = quantity;
});
