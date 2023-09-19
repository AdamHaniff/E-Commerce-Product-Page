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
  totalCartQuantity += quantity;
  headerCartQuantity.textContent = totalCartQuantity;
  headerCartQuantity.classList.remove("hidden");
}

function isHeaderCartBtnClicked() {
  // If 'headerCartBtn' has already been clicked
  if (headerCartBtn.classList.contains("clicked")) {
    if (totalCartQuantity === 0) {
      // Change cart icon back to gray
      headerCartBtn.classList.remove("clicked");
    }

    if (totalCartQuantity > 0) {
      headerCartBtn.classList.remove("clicked");
      headerCartBtn.classList.add("pulse");
    }

    // Hide the cart
    cart.classList.add("hidden");

    return true;
  }
}

function showCartTotalPrice() {
  const totalPrice = `$${(125 * totalCartQuantity).toFixed(2)}`;
  cartQuantity.textContent = totalCartQuantity;
  cartTotalPrice.textContent = totalPrice;
}

function showCartFullContainer() {
  // Show the user what is in their cart
  cartEmptyContainer.classList.add("hidden");
  cartFullContainer.classList.remove("hidden");
}

function showCartEmptyContainer() {
  // Show the user their cart is empty
  cartFullContainer.classList.add("hidden");
  cartEmptyContainer.classList.remove("hidden");
}

function resetQuantity() {
  quantity = 0;
  quantityNumber.textContent = quantity;
}

// EVENT LISTENER CALLBACK FUNCTIONS
function handleQuantityPlusBtnClick(e) {
  const quantityPlusBtn = e.target.closest(".quantity__plus");
  if (!quantityPlusBtn) return;

  quantity++;
  quantityNumber.textContent = quantity;
}

function handleQuantityMinusBtnClick(e) {
  const quantityMinusBtn = e.target.closest(".quantity__minus");
  if (!quantityMinusBtn) return;

  if (quantity === 0) {
    makeQuantityContainerShake();
    return;
  }

  quantity--;
  quantityNumber.textContent = quantity;
}

function handleAddToCartBtnClick(e) {
  const addToCartBtn = e.target.closest(".add-cart-btn");
  if (!addToCartBtn) return;

  if (quantity === 0) {
    makeQuantityContainerShake();
    return;
  }

  // If 'quantity' is more than 0, scroll smoothly to the top of page, display 'headerCartQuantity, and reset 'quantity'.
  scrollToTopOfPage();
  displayHeaderCartQuantity();
  resetQuantity();

  // Check if the cart is already open
  if (!cart.classList.contains("hidden")) {
    showCartTotalPrice();
    return;
  }

  // Make 'headerCartBtn' pulse and give cart icon a color change animation
  headerCartBtn.classList.add("pulse");
}

function handleHeaderCartBtnClick(e) {
  const headerCartBtn = e.target.closest(".header__cart-btn");
  if (!headerCartBtn) return;

  if (isHeaderCartBtnClicked()) return;

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

    // Calculate the total price and display the 'cartFullContainer'
    showCartTotalPrice();
    showCartFullContainer();
  }
}

function handleCartDeleteBtnClick(e) {
  const cartDeleteBtn = e.target.closest(".cart__delete-btn");
  if (!cartDeleteBtn) return;

  totalCartQuantity = 0;

  headerCartQuantity.classList.add("hidden");
  showCartEmptyContainer();
}

// EVENT LISTENERS
quantityPlusBtn.addEventListener("click", handleQuantityPlusBtnClick);
quantityMinusBtn.addEventListener("click", handleQuantityMinusBtnClick);
addToCartBtn.addEventListener("click", handleAddToCartBtnClick);
headerCartBtn.addEventListener("click", handleHeaderCartBtnClick);
cartDeleteBtn.addEventListener("click", handleCartDeleteBtnClick);
