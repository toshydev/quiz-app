import { starships, people, planets } from "./question.test.js";

const database = [starships, people, planets];

const owen = {
  name: "Owen Lars",
  height: "178",
  mass: "120",
  hair_color: "brown, grey",
  skin_color: "light",
  eye_color: "blue",
  birth_year: "52BBY",
  gender: "male",
  homeworld: "https://swapi.dev/api/planets/1/",
  films: [
    "https://swapi.dev/api/films/1/",
    "https://swapi.dev/api/films/5/",
    "https://swapi.dev/api/films/6/",
  ],
  species: [],
  vehicles: [],
  starships: [],
  created: "2014-12-10T15:52:14.024000Z",
  edited: "2014-12-20T21:17:50.317000Z",
  url: "https://swapi.dev/api/people/6/",
};

const SW_API_URL = "https://swapi.dev/api/";

/* 
  Get random query
*/
function getRandomQuery() {
  let num = Math.floor(Math.random() * 3);
  switch (num) {
    case 0:
      return "people";
    case 1:
      return "starships";
    case 2:
      return "planets";
  }
}

/* 
  Fetch pool from API
  -> query must be string  ("people" || "planets" || "starships")
*/
async function fetchPool(query) {
  try {
    const result = await fetch(`${SW_API_URL + query}/`);

    if (!result.ok) {
      console.error("An error occurred!");
      return;
    }
    const data = await result.json();
    // data.results -> to be used as pool for getRandomObject and in getAnswerOptions
    return data.results;
  } catch (error) {
    console.error("Error!");
  }
}

/* 
  Get random object from pool to be used as question object
  -> pool must be array 
*/
function getRandomObject(pool) {
  const randomIndex = Math.floor(Math.random() * pool.length);
  // pool[randomIndex] -> to be used as question object in getAnswerOptions
  return pool[randomIndex];
}

/* 
  Get random question properties based on object type
*/
function getRandomProperty(questionObject) {
  // Get valid properties from object type
  if (Object.hasOwn(questionObject, "eye_color")) {
    // define valid properties for people
    const properties = [
      "height",
      "mass",
      "hair_color",
      "eye_color",
      "birth_year",
      "homeworld",
    ];
    return getRandom(properties);
  }
  if (Object.hasOwn(questionObject, "manufacturer")) {
    // define valid properties for starships
    const properties = [
      "manufacturer",
      "cost_in_credits",
      "length",
      "max_atmosphering_speed",
      "crew",
      "passengers",
      "cargo_capacity",
      "consumables",
      "hyperdrive_rating",
    ];
    return getRandom(properties);
  }
  if (Object.hasOwn(questionObject, "climate")) {
    // define valid properties for planets
    const properties = [
      "rotation_period",
      "orbital_period",
      "diameter",
      "climate",
      "gravity",
      "terrain",
      "surface_water",
      "population",
    ];
    return getRandom(properties);
  }

  // Get random property
  function getRandom(array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
}

/* 
  Get answer options to be used as wrong answer options
  -> pool must be array
  -> questionObject must be object from pool
*/
function getAnswerObjects(pool, questionObject, property) {
  const answerOptions = pool.filter((object) => {
    return (
      object.name !== questionObject.name &&
      object[property] !== questionObject[property]
    );
  });
  // if answerOptions array is longer than 3 get random indices for short array
  if (answerOptions.length > 3) {
    const shortOptions = [];
    while (shortOptions.length < 3) {
      let randomIndex = Math.floor(Math.random() * answerOptions.length);
      if (shortOptions.includes(answerOptions[randomIndex])) {
        continue;
      }
      shortOptions.push(answerOptions[randomIndex]);
    }
    return shortOptions;
  }
}

// Build data for quiz card, if parameter query is empty -> random query will be selected
export async function buildData(query = getRandomQuery()) {
  const pool = await fetchPool(query);
  const object = getRandomObject(pool);
  const property = getRandomProperty(object);
  const wrongObjects = getAnswerObjects(pool, object, property);
  const allAnswers = wrongObjects.map((object) => object[property]);

  const data = {};
  data.subject = query;
  data.object = object;
  data.property = property;

  // Mix object.property into answers at random index
  let randomIndex = Math.floor(Math.random() * allAnswers.length);
  allAnswers.splice(randomIndex, 0, object[property]);
  data.answers = allAnswers;
  return data;
}

/* 
  Build data object for question card
*/
export function buildQuestion(data) {
  let propertyDisplay = data.property.slice().replace(/_/g, " ");
  switch (data.subject) {
    case "people":
      return `What's ${data.object.name}'s ${propertyDisplay}?`;
    case "starships":
      if (
        data.property === "crew" ||
        data.property === "passengers" ||
        data.property === "consumables"
      ) {
        propertyDisplay += " count";
      }
      if (data.properties === "manufacturer") {
        return `Who's the ${propertyDisplay} of a ${data.object.name}?`;
      }
      return `What's the ${propertyDisplay} of a ${data.object.name}?`;
    case "planets":
      return `What is the ${propertyDisplay} of planet ${data.object.name}?`;
  }
}

/* console.log(getRandomQuery()); */
/* const pool = await fetchPool(getRandomQuery());
const object = getRandomObject(pool);
const property = getRandomProperty(object);
const answers = getAnswerObjects(pool, object, property);
const answerProperties = answers.map((object) => object[property]);
console.log("AnswerProperties: ", answerProperties);
const options = answers.concat(object).forEach((option) => {
  console.log(`${option.name}, ${property}: ${option[property]}`);
}); */

/* const data = await buildData();
console.log(buildQuestion(data));
 */
