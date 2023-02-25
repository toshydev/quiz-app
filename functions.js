export function populateLocalStorage(user) {
  if (localStorage.getItem("userName") === null) {
    localStorage.setItem("userName", user.userName);
  }
  if (localStorage.getItem("description") === null) {
    localStorage.setItem("description", user.description);
  }
  if (localStorage.getItem("darkmode") === null) {
    localStorage.setItem("darkmode", user.darkmode);
  }
  if (localStorage.getItem("picture") === null) {
    localStorage.setItem("picture", user.picture);
  }
  if (localStorage.getItem("cardCount") === null) {
    localStorage.setItem("cardCount", `${user.cards.length}`);
  }
  for (let i = 0; i < user.cards.length; i++) {
    if (localStorage.getItem(`card-${i + 1}`) === null) {
      localStorage.setItem(`card-${i + 1}`, `${user.cards[i].id}`);
    }
    if (localStorage.getItem(`card-${i + 1}-question`) === null) {
      localStorage.setItem(`card-${i + 1}-question`, user.cards[i].question);
    }
    if (localStorage.getItem(`card-${i + 1}-answer`) === null) {
      localStorage.setItem(`card-${i + 1}-answer`, user.cards[i].answer);
    }
    if (localStorage.getItem(`card-${i + 1}-bookmarked`) === null) {
      localStorage.setItem(
        `card-${i + 1}-bookmarked`,
        `${user.cards[i].bookmarked}`
      );
    }
    if (localStorage.getItem(`card-${i + 1}-tagCount`) === null) {
      localStorage.setItem(
        `card-${i + 1}-tagCount`,
        `${user.cards[i].tags.length}`
      );
    }
    for (let j = 0; j < user.cards[i].tags.length; j++) {
      if (localStorage.getItem(`card-${i + 1}-tag-${j + 1}`) === null) {
        localStorage.setItem(
          `card-${i + 1}-tag-${j + 1}`,
          `${user.cards[i].tags[j]}`
        );
      }
    }
  }
}

export function buildCardDeck() {
  const deck = [];
  for (let i = 0; i < localStorage.getItem("cardCount"); i++) {
    const card = {
      id: localStorage.getItem(`card-${i + 1}`),
      question: localStorage.getItem(`card-${i + 1}-question`),
      answer: localStorage.getItem(`card-${i + 1}-answer`),
      bookmarked: localStorage.getItem(`card-${i + 1}-bookmarked`),
    };
    const tagArray = [];
    for (let j = 0; j < localStorage.getItem(`card-${i + 1}-tagCount`); j++) {
      tagArray.push(localStorage.getItem(`card-${i + 1}-tag-${j + 1}`));
    }
    card.tags = tagArray;
    deck.push(card);
  }
  return deck;
}

export function createCard(data, query) {
  // Create container reference
  const cardContainer = document.querySelector(query);

  // Create card element & add class
  const card = document.createElement("section");
  card.classList.add("card");

  // Create card id & add class
  const cardId = document.createElement("p");
  cardId.classList.add("card__id");
  cardId.textContent = data.id;

  // Create bookmark icon & add classes & attributes
  const bookmark = document.createElement("i");
  bookmark.classList.add("card__bookmark", "fa");
  // Check if card is bookmarked, if yes, apply filled bookmark class, else empty bookmark class
  bookmark.classList.add(`fa-bookmark${data.bookmarked ? "" : "-o"}`);
  // Add event listener to bookmark
  bookmark.addEventListener("click", () => {
    if (bookmark.classList.contains("fa-bookmark")) {
      bookmark.classList.remove("fa-bookmark");
      bookmark.classList.add("fa-bookmark-o");
      data.bookmarked = false;
    } else {
      bookmark.classList.remove("fa-bookmark-o");
      bookmark.classList.add("fa-bookmark");
      data.bookmarked = true;
    }
  });

  // Create question heading & add class
  const heading = document.createElement("h2");
  heading.classList.add("card__heading");
  heading.textContent = data.question;

  // Create answer button & add classes
  const button = document.createElement("button");
  button.classList.add("button", "button__big");
  button.setAttribute("type", "button");
  button.setAttribute("data-showanswer", "false");
  button.textContent = "Show Answer";

  // Create answer container with answer paragraph & add classes & nest answer
  const answerContainer = document.createElement("section");
  answerContainer.classList.add("card__answer-container");
  answerContainer.setAttribute("hidden", "");
  const answerText = document.createElement("p");
  answerText.classList.add("card__answer-text");
  answerText.textContent = data.answer;
  answerContainer.append(answerText);

  // Add even listener to answer button
  button.addEventListener("click", () => {
    if (button.dataset.showanswer === "false") {
      button.setAttribute("data-showanswer", "true");
      button.textContent = "Hide Answer";
      answerContainer.removeAttribute("hidden");
    } else {
      button.setAttribute("data-showanswer", "false");
      button.textContent = "Show Answer";
      answerContainer.setAttribute("hidden", "");
    }
  });

  // Create tag list with tag items & add classes
  const tagList = document.createElement("ul");
  tagList.classList.add("card__tag-list");
  for (const item of data.tags) {
    const tag = document.createElement("li");
    tag.classList.add("card__tag-list-item");
    tag.textContent = item;
    tagList.append(tag);
  }

  // Append sibling elements to card and card to cardContainer
  card.append(cardId, bookmark, heading, button, answerContainer, tagList);
  cardContainer.append(card);
}
