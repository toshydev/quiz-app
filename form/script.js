window.addEventListener("load", () => {
  if (localStorage.getItem("darkmode") == "true") {
    document.querySelector("body").classList.add("dark");
  }
});

const form = document.querySelector('[data-js="form"]');

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
  cardSection.append(card);
}

/* 
<section class="card">
    <i class="card__bookmark fa fa-bookmark" data-js="bookmark" aria-hidden="true"></i>
    <h2 class="card__heading">What property controls the wrap behaviour?</h2>
    <button class="button button__big" type="button" data-showanswer="false" data-js="answer-button">Show Answer</button>
    <section class="card__answer-container" data-js="answer-text" hidden>
      <p class="card__answer-text">flex-wrap: nowrap/wrap/wrap-reverse</p>
    </section>
    <ul class="card__tag-list">
        <li class="card__tag-list-item">#html</li>
        <li class="card__tag-list-item">#css</li>
        <li class="card__tag-list-item">#flexbox</li>
    </ul>
</section> 
        */
