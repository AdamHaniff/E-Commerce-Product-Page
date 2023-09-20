// VARIABLES
const menuBtn = document.querySelector(".header__menu-btn");
const sidebar = document.querySelector(".sidebar");
const sidebarCloseBtn = document.querySelector(".sidebar__close-btn");
const sidebarLinks = document.querySelector(".sidebar__links");
const sidebarOverlay = document.querySelector(".sidebar__overlay");

// EVENT LISTENER CALLBACK FUNCTIONS
function handleMenuBtnClick(e) {
  const menuBtn = e.target.closest(".header__menu-btn");
  if (!menuBtn) return;

  // When menu button is clicked, display the sidebar
  sidebar.classList.toggle("sidebar--open");
}

function handleSidebarCloseBtnClick(e) {
  const sidebarCloseBtn = e.target.closest(".sidebar__close-btn");
  if (!sidebarCloseBtn) return;

  // When the sidebar close button is clicked, hide the sidebar
  sidebar.classList.toggle("sidebar--open");
}

function handleSidebarLinkClick(e) {
  const sidebarLink = e.target;

  // If any of the sidebar links are clicked, hide the sidebar
  if (sidebarLink.classList.contains("sidebar__link")) {
    sidebar.classList.toggle("sidebar--open");
  }
}

function handleSidebarOverlayClick(e) {
  const sidebarOverlay = e.target;

  // Make sure the element that is being clicked is the 'sidebarOverlay'
  if (!sidebarOverlay.classList.contains("sidebar__overlay")) return;

  // When the 'sidebarOverlay' is clicked, hide the sidebar
  sidebar.classList.toggle("sidebar--open");
}

// EVENT LISTENERS
menuBtn.addEventListener("click", handleMenuBtnClick);
sidebarCloseBtn.addEventListener("click", handleSidebarCloseBtnClick);
sidebarLinks.addEventListener("click", handleSidebarLinkClick);
sidebarOverlay.addEventListener("click", handleSidebarOverlayClick);
