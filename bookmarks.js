import { renderCards } from "./functions.js";

// Check for darkmode in localStorage
window.addEventListener("load", () => {
  if (localStorage.getItem("darkmode") === "true") {
    document.querySelector("body").classList.add("dark");
  }
});

/* Render only bookmarked cards with editor mode off 
Cards will be refreshed on reload */
renderCards(".card-container", true, false);
