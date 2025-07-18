const input = document.querySelector("input");
const output = document.getElementById("output");

input.addEventListener("keydown", (e) => {
  e.preventDefault();
  output.innerText = `You pressed the ${e.key} key`;
});
