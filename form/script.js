window.addEventListener("load", () => {
  if (localStorage.getItem("darkmode") == "true") {
    document.querySelector("body").classList.add("dark");
  }
});

const form = document.querySelector('[data-js="form"]');
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
});

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
