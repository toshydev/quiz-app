import { user } from "./user.js";
import { populateLocalStorage, renderCards } from "./functions.js";

populateLocalStorage(user);

// Check for darkmode in localStorage
window.addEventListener("load", () => {
  if (localStorage.getItem("darkmode") === "true") {
    document.querySelector("body").classList.add("dark");
  }
});

/* Render all cards with editor mode off */
renderCards(".card-container", false, false);
