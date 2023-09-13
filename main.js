import "core-js/stable";
import "regenerator-runtime/runtime";

// VARIABLES
const menuBtn = document.querySelector(".header__menu-btn");
const sidebar = document.querySelector(".sidebar");
const sidebarCloseBtn = document.querySelector(".sidebar__close-btn");

// EVENT LISTENERS
menuBtn.addEventListener("click", function (e) {
  const menuBtn = e.target.closest(".header__menu-btn");
  if (!menuBtn) return;

  // When menu button is clicked, display the sidebar
  sidebar.classList.toggle("sidebar--open");
});

sidebarCloseBtn.addEventListener("click", function (e) {
  const sidebarCloseBtn = e.target.closest(".sidebar__close-btn");
  if (!sidebarCloseBtn) return;

  // When the sidebar close button is clicked, hide the sidebar
  sidebar.classList.toggle("sidebar--open");
});
