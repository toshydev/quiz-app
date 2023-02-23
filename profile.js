import { cards } from "./user.js";

console.log(cards);

const main = document.querySelector("main");

renderProfile();

function renderProfile() {
  const profile = document.createElement("section");
  profile.classList.add("profile");
  if (localStorage.getItem("darkmode") === "true") {
    document.body.classList.toggle("dark");
  }
  profile.innerHTML = `
  <section class="profile__user">
  <img
    class="profile__user-picture"
    width="100px"
    src="../assets/images/snek.png"
    alt="profile picture"
  />
  <h2>playerunknown</h2>
</section>
<section class="profile__user-card">
  <h3 class="profile__user-card-heading">About me:</h3>
  <p>Nothing to see here...</p>
</section>
<section>
  <button
    class="button button__small"
    type="button"
    role="Go to questions"
  >
    <a
      class="button__link"
      href="/index.html"
      aria-label="Go to questions page"
      title="Go to index"
      ><i class="fa fa-question-circle" aria-hidden="true"> ${
        cards.length
      }</i></a
    >
  </button>
  <button
    class="button button__small"
    type="button"
    role="Got to bookmarks"
  >
    <a
      class="button__link"
      href="/bookmarks/bookmarks.html"
      aria-label="Go to bookmarks"
      title="Go to bookmarks"
      ><i class="fa fa-bookmark" aria-hidden="true"> ${
        cards.filter((card) => card.bookmarked).length
      }</i></a
    >
  </button>
  <button class="button button__small" type="button" role="Go to GitHub">
    <a
      class="button__link"
      href="${localStorage.social}"
      target="_blank"
      aria-label="Go to GitHub"
      title="Go to GitHub"
      ><i class="fa fa-comments-o" aria-hidden="true"> Social</i></a
    >
  </button>
</section>
<section>
  <h3 class="profile__user-card-heading">Settings</h3>
  <div class="toggle-checkbox-wrapper">
    <input class="toggle-checkbox" type="checkbox" id="toggle" />
    <label class="slider" for="toggle">
      <span class="toggle-switch opt1">Light Mode</span>
      <span class="toggle-switch opt2">Dark Mode</span>
    </label>
  </div>
</section>
  `;
  main.append(profile);
}

window.addEventListener("load", () => {
  if (localStorage.getItem("darkmode") === "true") {
    document.querySelector("body").classList.add("dark");
    document.getElementById("toggle").checked = true;
  }
});

const darkModeSwitch = document.querySelector("#toggle");
darkModeSwitch.addEventListener("click", () => {
  document.querySelector("body").classList.toggle("dark");
  if (document.querySelector("body").classList.contains("dark")) {
    localStorage.setItem("darkmode", "true");
  } else {
    localStorage.setItem("darkmode", "false");
  }
});
