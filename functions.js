/* Populate localStorage with standard data from user.js when no data available yet */
export function populateLocalStorage(data) {
  // Check if localStorage already has no key named quizApp
  if (!localStorage.getItem("quizApp")) {
    // Stringify data JSON for localStorage
    const dataString = JSON.stringify(data);
    // Set dataString as value for quizApp key
    localStorage.setItem("quizApp", dataString);
  }
}

// Backup localStorage item quizApp
export function backupData() {
  // Save current data version in localStorage, use before every data change
  const dataStringCurrent = localStorage.getItem("quizApp").slice();
  localStorage.setItem("quizAppOld", dataStringCurrent);
}

/* Populate local storage with new data on form submit */
export function addData(data) {
  backupData();

  // Update data in JSON object
  const dataJson = JSON.parse(localStorage.getItem("quizApp"));
  // Create tag array from tags form input
  const tagArray = data.tags.split(",").map((tag) => tag.trim());
  // Add new card with form data to quizApp user object
  dataJson[0].cards.push({
    id: dataJson[0].cards.length + 1,
    question: data.question,
    answer: data.answer,
    tags: tagArray,
    bookmarked: false,
  });

  // Save new data version in localStorage
  const dataStringNew = JSON.stringify(dataJson);
  localStorage.setItem("quizApp", dataStringNew);
}

/* Update data string in localStorage
parameters:
data = data object to use as new data */
export function updateData(data) {
  backupData();

  // Save new data version in localStorage
  const dataStringUpdated = JSON.stringify(data);
  localStorage.setItem("quizApp", dataStringUpdated);
}

/* Delete entry in localStorage data string
parameters:
dataString = dataString to delete from
key = key in dataString to delete */
export function deleteData(key) {
  backupData();

  // delete data from JSON object
  const dataJson = JSON.parse(localStorage.getItem("quizApp"));
  delete dataJson[key];

  // Save new data version in localStorage
  const dataStringNew = JSON.stringify(dataJson);
  localStorage.setItem("quizApp", dataStringNew);
}

/* --- Render form function --- */
export function renderForm(container) {
  // Create container references
  const formContainer = document.querySelector(container);
  const cardContainer = document.querySelector(".card-container");

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

  // Create tags label and tag input  & add classes, attributes
  const tagLabel = document.createElement("label");
  tagLabel.classList.add("form__body-label");
  tagLabel.setAttribute("for", "tags");
  tagLabel.textContent = "Your tags:";

  const tagText = document.createElement("input");
  tagText.classList.add("form__body-input");
  tagText.setAttribute("name", "tags");
  tagText.setAttribute("id", "tags");

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
    tagText,
    buttonSubmit
  );

  // add submit event listener
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    addData(data);
    form.question.focus();
    form.reset();
    cardContainer.innerHTML = "";
    renderCards(false, true);
  });
  formContainer.append(form);
}

// Filter words and tags of card with keyword
export function filterCards(card, keyword) {
  const wordArray = card.question
    .slice(0, card.question.length - 1)
    .split(" ")
    .concat(card.tags);
  return wordArray.includes(keyword);
}

/* --- Render cards function ---
  Parameters:
  - query = container element to append cards to
  - bookmarked = show only bookmarked cards if true
  - editor = delete and edit function available  */
export function renderCards(bookmarked = false, editor = false) {
  // Create container reference
  const cardContainer = document.querySelector(".card-container");

  // Convert localStorage quizApp to Array
  const data = JSON.parse(localStorage.getItem("quizApp"));
  // Get cards array from quizApp Array
  const cards = data[0].cards;

  for (const cardItem of cards) {
    // if bookmarked argument is given skip unbookmarked cards
    if (bookmarked && !cardItem.isBookmarked) {
      continue;
    }
    // Create card element & add class
    const card = document.createElement("section");
    card.classList.add("card");

    // Create card id & add class
    const cardId = document.createElement("p");
    cardId.classList.add("card__id");
    cardId.textContent = cardItem.id;

    // Create bookmark icon & add classes & attributes
    const bookmark = document.createElement("i");
    bookmark.classList.add("card__bookmark", "fa");
    // Check if card is bookmarked, if yes, apply filled bookmark class, else empty bookmark class
    bookmark.classList.add(
      `fa-bookmark${cardItem.isBookmarked === true ? "" : "-o"}`
    );
    // Add event listener to bookmark
    bookmark.addEventListener("click", () => {
      if (cardItem.isBookmarked === false) {
        bookmark.classList.remove("fa-bookmark-o");
        bookmark.classList.add("fa-bookmark");
        cardItem.isBookmarked = true;
        updateData(data);
      } else {
        if (bookmarked === true) {
          bookmark.classList.remove("fa-bookmark");
          bookmark.classList.add("fa-bookmark-o");
          cardItem.isBookmarked = false;
          updateData(data);
          cardContainer.innerHTML = "";
          renderCards(true, false);
        }
        bookmark.classList.remove("fa-bookmark");
        bookmark.classList.add("fa-bookmark-o");
        cardItem.isBookmarked = false;
        updateData(data);
      }
    });

    // Create delete button and icon & add classes and attributes
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button", "card__delete-button");
    if (!editor) {
      deleteButton.setAttribute("hidden", "");
    }
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash");
    deleteIcon.setAttribute("aria-hidden", "true");
    deleteButton.append(deleteIcon);

    // Add event listener to deleteButton
    deleteButton.addEventListener("click", () => {
      cards.pop(cardItem);
      cardContainer.innerHTML = "";
      renderCards(false, true);
    });

    // Create question heading & add class
    const heading = document.createElement("h2");
    heading.classList.add("card__heading");
    heading.textContent = cardItem.question;

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
    answerText.textContent = cardItem.answer;
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
    for (const tagItem of cardItem.tags) {
      const tag = document.createElement("li");
      tag.classList.add("card__tag-list-item");
      tag.textContent = `#${tagItem}`;
      tagList.append(tag);
    }

    // Append sibling elements to card and card to cardContainer
    card.append(
      cardId,
      bookmark,
      deleteButton,
      heading,
      button,
      answerContainer,
      tagList
    );
    cardContainer.append(card);
    updateData(data);
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
