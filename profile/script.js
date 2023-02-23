window.addEventListener("load", () => {
  if (localStorage.getItem("darkmode") == "true") {
    document.querySelector("body").classList.add("dark");
    document.getElementById("toggle").checked = true;
  }
});

const darkModeSwitch = document.querySelector("#toggle");
darkModeSwitch.addEventListener("click", () => {
  document.querySelector("body").classList.toggle("dark");
  if (document.querySelector("body").classList.contains("dark")) {
    localStorage.setItem("darkmode", "true");
  } else {
    localStorage.setItem("darkmode", "false");
  }
});
