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