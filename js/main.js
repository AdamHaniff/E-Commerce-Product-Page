import "core-js/stable";
import "regenerator-runtime/runtime";

// VARIABLES
const quantityPlusBtn = document.querySelector(".quantity__plus");
const quantityMinusBtn = document.querySelector(".quantity__minus");
const quantityNumber = document.querySelector(".quantity__number");
const addToCartBtn = document.querySelector(".add-cart-btn");
const quantityContainer = document.querySelector(".quantity");
const headerCartQuantity = document.querySelector(".header__cart-quantity");
const headerCartBtn = document.querySelector(".header__cart-btn");
const cart = document.querySelector(".cart");
const cartEmptyContainer = document.querySelector(".cart__empty");
const cartFullContainer = document.querySelector(".cart__full");
const cartQuantity = document.querySelector(".cart__product-quantity");
const cartTotalPrice = document.querySelector(".cart__total-price");
const cartDeleteBtn = document.querySelector(".cart__delete-btn");

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

  // Make 'headerCartBtn' pulse and give cart icon a color change animation
  headerCartBtn.classList.add("pulse");
}

// EVENT LISTENERS
quantityPlusBtn.addEventListener("click", handleQuantityPlusBtnClick);
quantityMinusBtn.addEventListener("click", handleQuantityMinusBtnClick);
addToCartBtn.addEventListener("click", handleAddToCartBtnClick);

headerCartBtn.addEventListener("click", function (e) {
  const headerCartBtn = e.target.closest(".header__cart-btn");
  if (!headerCartBtn) return;

  // If 'headerCartBtn' has already been clicked
  if (headerCartBtn.classList.contains("clicked")) {
    // Change cart icon back to gray
    headerCartBtn.classList.remove("clicked");

    // Hide the cart
    cart.classList.add("hidden");
    return;
  }

  // Check if the cart is empty or not
  if (totalCartQuantity === 0) {
    // Turn the header cart icon black
    headerCartBtn.classList.add("clicked");

    // Display the cart and show the user that their cart is empty
    cart.classList.remove("hidden");
  } else {
    // Stop the 'headerCartBtn' from pulsing
    headerCartBtn.classList.remove("pulse");

    // Turn the header cart icon black
    headerCartBtn.classList.add("clicked");

    // Display the cart
    cart.classList.remove("hidden");

    // Update text content of 'cartQuantity' and 'cartTotalPrice'
    const totalPrice = `$${(125 * totalCartQuantity).toFixed(2)}`;
    cartQuantity.textContent = totalCartQuantity;
    cartTotalPrice.textContent = totalPrice;

    // Show the user what is in their cart
    cartEmptyContainer.classList.add("hidden");
    cartFullContainer.classList.remove("hidden");
  }
});
