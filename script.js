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

const darkModeSwitch = document.querySelector("#toggle");
darkModeSwitch.addEventListener("click", () => {
  document.querySelector("body").classList.toggle("dark");
});
