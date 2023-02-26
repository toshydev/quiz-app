/* Populate localStorage with standard data from user.js when no data available yet */
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
  if (localStorage.getItem("social") === null) {
    localStorage.setItem("social", user.social);
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

/* --- Render form function --- */
export function renderForm(container) {
  // Create container reference
  const formContainer = document.querySelector(container);

  // Create form element & add class & add attributes
  const form = document.createElement("form");
  form.classList.add("form__body");
  form.setAttribute("aria-label", "Add your own questions");

  // Create fieldset, legent elements & add classes
  const fieldset = document.createElement("fieldset");
  fieldset.classList.add("form__body-fields");
  const legend = document.createElement("legend");
  legend.classList.add("form__body-description");
  legend.textContent = "Add your own question";

  // Create question label & add classes, attributes
  const questionLabel = document.createElement("label");
  questionLabel.classList.add("form__body-label");
  questionLabel.setAttribute("for", "question");
  questionLabel.textContent = "Your question:";

  // Create question textarea & add classes, attributes
  const questionText = document.createElement("textarea");
  questionText.classList.add("form__body-textarea");
  questionText.setAttribute(
    "placeholder",
    "e.g. How many halftones in an octave?"
  );
  questionText.setAttribute("id", "question");
  questionText.setAttribute("name", "question");
  questionText.setAttribute("required", "");
  questionText.setAttribute("maxlength", "150");
  questionText.setAttribute("cols", "30");
  questionText.setAttribute("rows", "3");

  // Create question character counter
  const questionCounter = document.createElement("aside");
  questionCounter.classList.add("form__body-textarea-counter");
  questionCounter.setAttribute("aria-label", "question character counter");

  // Create answer label & add classes, attributes
  const answerLabel = document.createElement("label");
  answerLabel.classList.add("form__body-label");
  answerLabel.setAttribute("for", "answer");
  answerLabel.textContent = "Your answer:";

  // Create answer textarea & add classes, attributes
  const answerText = document.createElement("textarea");
  answerText.classList.add("form__body-textarea");
  answerText.setAttribute("placeholder", "e.g. 42");
  answerText.setAttribute("id", "answer");
  answerText.setAttribute("name", "answer");
  answerText.setAttribute("required", "");
  answerText.setAttribute("maxlength", "150");
  answerText.setAttribute("cols", "30");
  answerText.setAttribute("rows", "2");

  // Create answer character counter
  const answerCounter = document.createElement("aside");
  answerCounter.classList.add("form__body-textarea-counter");
  answerCounter.setAttribute("aria-label", "answer character counter");

  // Create tags label and tag input container & add classes
  const tagLabel = document.createElement("label");
  tagLabel.classList.add("form__body-label");
  tagLabel.setAttribute("for", "tags");
  tagLabel.textContent = "Your tags:";
  const tagContainer = document.createElement("div");
  tagContainer.classList.add("form__body-tag-container");
  tagContainer.setAttribute("id", "tags");

  // Create 3 tag inputs & add classes, attributes
  for (let i = 1; i <= 3; i++) {
    const tagText = document.createElement("input");
    tagText.classList.add("form__body-input");
    tagText.setAttribute("name", `tag-${i}`);

    // Nest tag input inside container
    tagContainer.append(tagText);
  }

  /* // Create add tag button and icon & add classes
  const buttonAddTag = document.createElement("button");
  buttonAddTag.classList.add("button");
  buttonAddTag.setAttribute("type", "button");
  buttonAddTag.setAttribute("aria-label", "add another tag");
  const iconAddTag = document.createElement("i");
  iconAddTag.classList.add("fa", "fa-plus");
  iconAddTag.setAttribute("aria-hidden", "true"); */

  // Create submit button & add classes
  const buttonSubmit = document.createElement("button");
  buttonSubmit.classList.add("button", "button_lg", "form__body-submit");
  buttonSubmit.setAttribute("type", "submit");
  buttonSubmit.setAttribute("aria-label", "Post your new question");
  buttonSubmit.textContent = "Submit";

  /* --- Event listener section --- */

  // question input char counter
  questionText.addEventListener("input", (event) => {
    countInput(questionCounter, event.target.value, event.target.maxLength);
  });

  // answer input char counter
  answerText.addEventListener("input", (event) => {
    countInput(answerCounter, event.target.value, event.target.maxLength);
  });

  /* // add another tag button
  buttonAddTag.addEventListener("click", () => {
    createTagInput(1);
  }); */

  form.append(
    fieldset,
    legend,
    questionLabel,
    questionText,
    questionCounter,
    answerLabel,
    answerText,
    answerCounter,
    tagLabel,
    tagContainer,
    buttonSubmit
  );

  // add submit event listener
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    addCard(data);
    form.question.focus();
    form.reset();
    renderCards(".card-container", false, true);
  });
  formContainer.append(form);
}

/* --- Render cards function ---
  Parameters:
  - query = container element to append cards to
  - bookmarked = show only bookmarked cards if true
  - editor = delete and edit function available  */
export function renderCards(query, bookmarked = false, editor = false) {
  // Create container reference
  const cardContainer = document.querySelector(query);

  // Iterate through deck and create cards
  for (let i = 1; i <= parseInt(localStorage.getItem("cardCount"), 10); i++) {
    const localId = `card-${i}`;
    const localQuestion = `card-${i}-question`;
    const localAnswer = `card-${i}-answer`;
    const localBookmarked = `card-${i}-bookmarked`;
    const localTagCount = `card-${i}-tagCount`;
    // If bookmarked parameter is true only render bookmarked cards
    if (bookmarked === true) {
      if (localStorage.getItem(`${localBookmarked}`) === "false") {
        continue;
      }
    }
    // Create card element & add class
    const card = document.createElement("section");
    card.classList.add("card");

    // Create card id & add class
    const cardId = document.createElement("p");
    cardId.classList.add("card__id");
    cardId.textContent = localStorage.getItem(`${localId}`);

    // Create bookmark icon & add classes & attributes
    const bookmark = document.createElement("i");
    bookmark.classList.add("card__bookmark", "fa");
    // Check if card is bookmarked, if yes, apply filled bookmark class, else empty bookmark class
    bookmark.classList.add(
      `fa-bookmark${
        localStorage.getItem(`${localBookmarked}`) === "true" ? "" : "-o"
      }`
    );
    // Add event listener to bookmark
    bookmark.addEventListener("click", () => {
      if (localStorage.getItem(`${localBookmarked}`) === "false") {
        bookmark.classList.remove("fa-bookmark-o");
        bookmark.classList.add("fa-bookmark");
        localStorage.setItem(`${localBookmarked}`, "true");
      } else {
        if (bookmarked === true) {
          bookmark.classList.remove("fa-bookmark");
          bookmark.classList.add("fa-bookmark-o");
          localStorage.setItem(`${localBookmarked}`, "false");
          cardContainer.innerHTML = "";
          renderCards(".card-container", true, false);
        }
        bookmark.classList.remove("fa-bookmark");
        bookmark.classList.add("fa-bookmark-o");
        localStorage.setItem(`${localBookmarked}`, "false");
      }
    });

    // Create question heading & add class
    const heading = document.createElement("h2");
    heading.classList.add("card__heading");
    heading.textContent = localStorage.getItem(`${localQuestion}`);

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
    answerText.textContent = localStorage.getItem(`${localAnswer}`);
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
    for (
      let j = 1;
      j <= parseInt(localStorage.getItem(`${localTagCount}`));
      j++
    ) {
      const tag = document.createElement("li");
      tag.classList.add("card__tag-list-item");
      tag.textContent = localStorage.getItem(`card-${i}-tag-${j}`);
      tagList.append(tag);
    }

    // Append sibling elements to card and card to cardContainer
    card.append(cardId, bookmark, heading, button, answerContainer, tagList);
    cardContainer.append(card);
  }
}

/* Populate local storage with new card on form submit */
export function addCard(data) {
  const newCardCount = `${parseInt(localStorage.getItem("cardCount"), 10) + 1}`;
  localStorage.setItem("cardCount", `${newCardCount}`);
  localStorage.setItem(
    `card-${localStorage.getItem("cardCount")}`,
    `${newCardCount}`
  );
  localStorage.setItem(
    `card-${localStorage.getItem("cardCount")}-question`,
    `${data.question}`
  );
  localStorage.setItem(
    `card-${localStorage.getItem("cardCount")}-answer`,
    `${data.answer}`
  );
  localStorage.setItem(
    `card-${localStorage.getItem("cardCount")}-bookmarked`,
    "false"
  );
  for (let i = 1; i <= 3; i++) {
    if (data[`tag-${i}`] === "") {
      continue;
    }
    localStorage.setItem(
      `card-${localStorage.getItem("cardCount")}-tag-${i}`,
      data[`tag-${i}`]
    );
    localStorage.setItem(
      `card-${localStorage.getItem("cardCount")}-tagCount`,
      `${i}`
    );
  }
}

/* Character counter used in form.js */
export function countInput(counter, text, maxLength) {
  if (text.length < maxLength) {
    counter.textContent = `Characters left: ${
      maxLength - text.length
    }/${maxLength}`;
  } else {
    counter.style.color = "var(--color-bookmark)";
    counter.textContent = `Maximum length: ${text.length}/${maxLength}`;
  }
}

// To be implemented
export function createTagInput(counter) {
  const tagContainer = document.querySelector(".form__body-tag-container");
  const input = document.createElement("input");
  input.classList.add("form__body-input");
  input.setAttribute("type", "text");
  input.setAttribute("name", `tag-${counter}`);

  const button = document.createElement("button");
  button.classList.add("button");
  button.setAttribute("aria-label", "add another tag");
  button.setAttribute("type", "button");
  button.innerHTML = `<i class="fa fa-minus" aria-hidden="true"></i>`;
  button.addEventListener("click", () => {
    counter--;
    tagContainer.removeChild(input);
    tagContainer.removeChild(button);
  });
  tagContainer.append(input, button);
  counter++;
}
