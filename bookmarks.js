

window.addEventListener("load", () => {
  if (localStorage.getItem("darkmode") == "true") {
    document.querySelector("body").classList.add("dark");
  }
});

for (const card of userCards) {
  if (card.bookmarked) {
    createCard(card, ".card-container");
  }
}