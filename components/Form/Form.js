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
