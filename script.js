window.addEventListener("load", () => {
  if (localStorage.getItem("darkmode") == "true") {
    document.querySelector("body").classList.add("dark");
    if (document.querySelector("#toggle")) {
      document.getElementById("toggle").checked = true;
    }
  }
});

const bookmarks = document.querySelectorAll('[data-js="bookmark"]');
bookmarks.forEach((bookmark) => {
  bookmark.addEventListener("click", () => {
    if (bookmark.classList.contains("fa-bookmark")) {
      bookmark.classList.remove("fa-bookmark");
      bookmark.classList.add("fa-bookmark-o");
    } else {
      bookmark.classList.remove("fa-bookmark-o");
      bookmark.classList.add("fa-bookmark");
    }
  });
});

if (document.querySelector("#toggle")) {
  const darkModeSwitch = document.querySelector("#toggle");
  darkModeSwitch.addEventListener("click", () => {
    document.querySelector("body").classList.toggle("dark");
    if (document.querySelector("body").classList.contains("dark")) {
      localStorage.setItem("darkmode", "true");
    } else {
      localStorage.setItem("darkmode", "false");
    }
  });
}

const answerButton = document.querySelector('[data-js="answer-button"]');
const answerText = document.querySelector('[data-js="answer-text"]');
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
