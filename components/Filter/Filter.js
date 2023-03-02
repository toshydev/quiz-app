export function filterCards(card, keyword) {
    const wordArray = card.question
      .slice(0, card.question.length - 1)
      .split(" ")
      .concat(card.tags);
    return wordArray.includes(keyword);
  }