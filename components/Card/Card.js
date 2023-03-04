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

  card.append(heading);

  return card;
}
