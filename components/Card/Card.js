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
        if (deletePrompt(cardItem.id)) {
          data[0].cards = cards.filter((card) => card.id !== cardItem.id);
          updateData(data);
          cardContainer.innerHTML = "";
          renderCards(false, true);
        }
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