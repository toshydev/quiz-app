const userCards = [
  {
    id: 1,
    question: "What property controls the wrap behaviour?",
    answer: "flex-wrap: nowrap/wrap/wrap-reverse",
    tags: ["html", "css", "flexbox"],
    bookmarked: false,
  },
  {
    id: 2,
    question: "What property lets you configure a grids' columns and rows?",
    answer: "grid-template",
    tags: ["html", "css", "grid"],
    bookmarked: false,
  },
  {
    id: 3,
    question: "What's the second parameter of the parseInt() method?",
    answer: "radix",
    tags: ["javascript", "datatypes", "coercion"],
    bookmarked: false,
  },
];

window.addEventListener("load", () => {
  if (localStorage.getItem("darkmode") == "true") {
    document.querySelector("body").classList.add("dark");
  }
});

renderForm();

function renderForm() {
  const formContainer = document.querySelector(".form");
  const form = document.createElement("form");
  form.classList.add("form__body");
  form.setAttribute("aria-label", "Add your own questions");
  form.setAttribute("data-js", "form");

  form.innerHTML = `
<fieldset class="form__body-fields">
<legend class="form__body-description">
  Add your own question
</legend>
<label class="form__body-label" for="question"
  >Your question:</label
>
<textarea
  data-js="question"
  class="form__body-textarea"
  name="question"
  id="question"
  cols="30"
  rows="3"
  maxlength="150"
  required
  placeholder="e.g. How many halftones in an octave?"
></textarea>
<aside
  class="form__body-textarea-counter"
  aria-label="question character counter"
  data-js="question-counter"
></aside>
<label class="form__body-label" for="answer">Your answer:</label>
<textarea
  data-js="answer"
  class="form__body-textarea"
  name="answer"
  id="answer"
  cols="30"
  rows="2"
  maxlength="150"
  required
  placeholder="e.g. 42"
></textarea>
<aside
  class="form__body-textarea-counter"
  aria-label="answer character counter"
  data-js="answer-counter"
></aside>
<label class="form__body-label" for="tag">Tag:</label>
<div class="form__body-tag-container">
  <input
    data-js="tag"
    class="form__body-input"
    type="text"
    name="tag-0"
    id="tag"
  />
  <button type="button" class="button" aria-label="add another tag" data-js="tag-add"><i class="fa fa-plus" aria-hidden="true"></i></button>
</div>
</fieldset>
<button
class="button button_lg form__body-submit"
type="submit"
aria-label="Post your new question"
>
Submit
</button>
  `;

  const questionInput = form.querySelector('[data-js="question"]');
  const questionCounter = form.querySelector('[data-js="question-counter"]');
  const answerInput = form.querySelector('[data-js="answer"]');
  const answerCounter = form.querySelector('[data-js="answer-counter"]');
  const tagAddButton = form.querySelector('[data-js="tag-add"]');

  questionInput.addEventListener("input", (event) => {
    countInput(questionCounter, event.target.value, event.target.maxLength);
  });

  answerInput.addEventListener("input", (event) => {
    countInput(answerCounter, event.target.value, event.target.maxLength);
  });
  let tagCounter = 0;
  tagAddButton.addEventListener("click", createTagInput);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    createCard(data);
    form.question.focus();
    form.reset();
  });
  formContainer.append(form);
  console.log(data);
}

/* const form = document.querySelector('[data-js="form"]');
const questionInput = document.querySelector('[data-js="question"]');
const questionCounter = document.querySelector('[data-js="question-counter"]');
const answerInput = document.querySelector('[data-js="answer"]');
const answerCounter = document.querySelector('[data-js="answer-counter"]');


questionInput.addEventListener("input", (event) => {
  countInput(questionCounter, event.target.value, event.target.maxLength);
});

answerInput.addEventListener("input", (event) => {
  countInput(answerCounter, event.target.value, event.target.maxLength);
});




form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  createCard(data);
  form.question.focus();
  form.reset();
}); */

function createCard(data) {
  const cardSection = document.querySelector('[data-js="card-container"]');
  const card = document.createElement("section");
  card.classList.add("card");
  card.innerHTML = `
  <i class="card__bookmark fa fa-bookmark" data-js="bookmark" aria-hidden="true"></i>
  <h2 class="card__heading">${data.question}</h2>
  <button class="button button__big" type="button" data-showanswer="false" data-js="answer-button">Show Answer</button>
  <section class="card__answer-container" data-js="answer-text" hidden>
    <p class="card__answer-text">${data.answer}</p>
  </section>
  <ul class="card__tag-list">
      <li class="card__tag-list-item">#${data.tag}</li>
  </ul>
  `;

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
  const newCard = {
    id: userCards.length,
    question: data.question,
    answer: data.answer,
    tags: ["html", "css", "flexbox"],
    bookmarked: false,
  };
  userCards.push(newCard);
  cardSection.append(card);
}

function countInput(counter, text, maxLength) {
  if (text.length < maxLength) {
    counter.textContent = `Characters left: ${
      maxLength - text.length
    }/${maxLength}`;
  } else {
    counter.style.color = "var(--color-bookmark)";
    counter.textContent = `Maximum length: ${text.length}/${maxLength}`;
  }
}

function createTagInput(counter) {
  const tagContainer = document.querySelector(".form__body-tag-container");
  const input = document.createElement("input");
  input.classList.add("form__body-input");
  input.setAttribute("data-js", "tag");
  input.setAttribute("type", "text");
  input.setAttribute("name", `tag-${counter}`);

  const button = document.createElement("button");
  button.classList.add("button");
  button.setAttribute("aria-label", "add another tag");
  button.setAttribute("data-js", "tag-add");
  button.setAttribute("type", "button");
  button.innerHTML = `
  <i class="fa fa-plus" aria-hidden="true"></i>
  `;
  button.addEventListener("click", createTagInput);
  tagContainer.append(input, button);
}
