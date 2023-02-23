import { allCards } from "./script.js";

window.addEventListener("load", () => {
  if (localStorage.getItem("darkmode") == "true") {
    document.querySelector("body").classList.add("dark");
  }
});

renderMarkedCards();

function renderMarkedCards() {
  const cardContainer = document.querySelector(".card-container");
  for (let i = 0; i < allCards.length; i++) {
    if (allCards[i].bookmarked === false) {
      continue;
    }
    const card = document.createElement("section");
    card.classList.add("card");
    card.innerHTML = `
      <i class="card__bookmark fa fa-bookmark${
        allCards[i].bookmarked === false ? "-o" : ""
      }" data-js="bookmark" aria-hidden="true"></i>
      <h2 class="card__heading">${allCards[i].question}</h2>
      <button class="button button__big" type="button" data-showanswer="false" data-js="answer-button">Show Answer</button>
      <section class="card__answer-container" data-js="answer-text" hidden>
        <p class="card__answer-text">${allCards[i].answer}</p>
      </section>
      <ul class="card__tag-list"></ul>
    `;
    const tagList = card.querySelector("ul");
    for (let j = 0; j < allCards[i].tags.length; j++) {
      const tag = document.createElement("li");
      tag.classList.add("card__tag-list-item");
      tag.innerHTML = `#${allCards[i].tags[j]}`;
      tagList.append(tag);
    }

    const bookmark = card.querySelector('[data-js="bookmark"]');
    bookmark.addEventListener("click", () => {
      if (bookmark.classList.contains("fa-bookmark")) {
        bookmark.classList.remove("fa-bookmark");
        bookmark.classList.add("fa-bookmark-o");
      } else {
        bookmark.classList.remove("fa-bookmark-o");
        bookmark.classList.add("fa-bookmark");
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
