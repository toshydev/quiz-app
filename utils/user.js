export const user = [
  {
    userName: "playerunknown",
    description: "Nothing to see here...",
    darkmode: "false",
    picture: "./assets/images/snek.png",
    social: "https://quiz-app-toshydev.vercel.app/",
    cards: [],
  },
];

export function getNewUser() {
  return JSON.parse(JSON.stringify(user));
}

export function getUser() {
  return window.user;
}
