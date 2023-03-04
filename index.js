import { Card } from "./components/Card/Card.js";
import { buildData } from "./utils/question.js";

console.clear();

const cardSection = document.querySelector(".card-container");
const fetchButton = document.querySelector('[data-js="fetch-question"]');

fetchButton.addEventListener("click", async () => {
  fetchButton.disabled = true;
  const data = await buildData();
  console.log(data);
  const card = Card(data);
  cardSection.append(card);
  fetchButton.disabled = false;
});
