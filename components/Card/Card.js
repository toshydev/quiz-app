import { buildQuestion } from "../../utils/question.js";

export function Card(data) {
  // Convert localStorage quizApp to Array
  const question = buildQuestion(data);

  // Create card element & add class
  const card = document.createElement("section");
  card.classList.add("card");

  // Create question heading & add class
  const heading = document.createElement("h2");
  heading.classList.add("card__heading");
  heading.textContent = question;

  // Create answer form
  const form = document.createElement("form");
  form.classList.add("card__answer-form");

  const fieldset = document.createElement("fieldset");

  const legend = document.createElement("legend");
  legend.textContent = "Take your pick!";

  const answerContainer = document.createElement("section");
  answerContainer.classList.add("card__answer-container");

  data.answers.forEach((answer, index) => {
    answerInput(answerContainer, answer, index);
  });

  const submit = document.createElement("button");
  submit.classList.add("button");
  submit.setAttribute("type", "submit");
  submit.textContent = "Confirm";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const dataObject = Object.fromEntries(formData);
    console.log(dataObject);
    if (dataObject.answer === data.object[data.property]) {
      console.log(true);
    } else console.log(false);
  });
  fieldset.append(legend, answerContainer, submit);
  form.append(fieldset);
  card.append(heading, form);

  return card;
}

function answerInput(container, text, id) {
  const input = document.createElement("input");
  const label = document.createElement("label");

  input.setAttribute("type", "radio");
  input.setAttribute("name", "answer");
  input.setAttribute("id", `answer-${id}`);
  input.setAttribute("value", `${text}`);

  label.setAttribute("for", `answer-${id}`);
  label.textContent = text;
  container.append(input, label);
}
