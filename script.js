import { user } from "./user.js";
import { populateLocalStorage, createCard, buildCardDeck } from "./functions.js";

populateLocalStorage(user);
const cards = buildCardDeck();

window.addEventListener("load", () => {
  if (localStorage.getItem("darkmode") === "true") {
    document.querySelector("body").classList.add("dark");
  }
});

for (const card of cards) {
  createCard(card, ".card-container");
}

/* renderAllCards();

function renderAllCards() {
  const cardContainer = document.querySelector(".card-container");
  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement("section");
    card.classList.add("card");
    card.innerHTML = `
      <p class="card__id">${cards[i].id}</p>
      <i class="card__bookmark fa fa-bookmark${
        cards[i].bookmarked === false ? "-o" : ""
      }" data-js="bookmark" aria-hidden="true"></i>
      <h2 class="card__heading">${cards[i].question}</h2>
      <button class="button button__big" type="button" data-showanswer="false" data-js="answer-button">Show Answer</button>
      <section class="card__answer-container" data-js="answer-text" hidden>
        <p class="card__answer-text">${cards[i].answer}</p>
      </section>
      <ul class="card__tag-list"></ul>
    `;
    const tagList = card.querySelector("ul");
    for (let j = 0; j < cards[i].tags.length; j++) {
      const tag = document.createElement("li");
      tag.classList.add("card__tag-list-item");
      tag.innerHTML = `#${cards[i].tags[j]}`;
      tagList.append(tag);
    }

    const cardIndex = card.querySelector(".card__id").textContent;
    const bookmark = card.querySelector('[data-js="bookmark"]');
    bookmark.addEventListener("click", () => {
      if (bookmark.classList.contains("fa-bookmark")) {
        bookmark.classList.remove("fa-bookmark");
        bookmark.classList.add("fa-bookmark-o");
        cards[cardIndex - 1].bookmarked = false;
      } else {
        bookmark.classList.remove("fa-bookmark-o");
        bookmark.classList.add("fa-bookmark");
        cards[cardIndex - 1].bookmarked = true;
      }
    });

    const answerButton = card.querySelector('[data-js="answer-button"]');
    const answerText = card.querySelector('[data-js="answer-text"]');
    answerButton.addEventListener("click", () => {
      if (answerButton.dataset.showanswer === "false") {
        answerButton.setAttribute("data-showanswer", "true");
        answerButton.textContent = "Hide Answer";
        answerText.removeAttribute("hidden");
      } else {
        answerButton.setAttribute("data-showanswer", "false");
        answerButton.textContent = "Show Answer";
        answerText.setAttribute("hidden", "");
      }
    });
    cardContainer.append(card);
  }
}

export const allCards = cards;
 */
