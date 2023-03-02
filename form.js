import { renderCards, renderForm, deletePrompt } from "./functions.js";

// Check for darkmode in localStorage
window.addEventListener("load", () => {
  if (localStorage.getItem("darkmode") == "true") {
    document.querySelector("body").classList.add("dark");
  }
});

deletePrompt("test");
// Render form in form container
renderForm(".form");

// Render all cards from localStorage with editor mode (to be implemented)
renderCards(false, true);
