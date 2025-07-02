const buttonBtn1 = document.getElementById("btn1");
const buttonBtn2 = document.getElementById("btn2");
const buttonBtn3 = document.getElementById("btn3");

function toggleIcon(buttonObj) {
  if (!buttonObj.classList.contains('filled')) {
    buttonObj.classList.add('filled');
    buttonObj.innerHTML = '&#10084;';
  } else {
    buttonObj.classList.remove('filled');
    buttonObj.innerHTML = '&#9825;';
  }
}

buttonBtn1.addEventListener('click',() => toggleIcon(buttonBtn1)); 
buttonBtn2.addEventListener('click',() => toggleIcon(buttonBtn2)); 
buttonBtn3.addEventListener('click',() => toggleIcon(buttonBtn3)); 

// const p = document.querySelector("p");
// p.addEventListener("click", (event) => {
//   console.log(event.target);
// });

// const p = document.querySelector("p");
// const span = document.querySelector("span");
// p.addEventListener("click", (event) => {
//   console.log("P listener: ");
//   console.log(event.target);
// });
// span.addEventListener("click", (event) => {
//   console.log("Span listener: ");
//   console.log(event.target);
// });

// const p = document.querySelector("p");
// const span = document.querySelector("span");
// p.addEventListener("click", (event) => {
//   console.log("P listener: ");
//   console.log(event.target);
// });
// span.addEventListener("click", (event) => {
//   console.log("Span listener: ");
//   console.log(event.target);
//   event.stopPropagation();
// });

const p = document.querySelector("p");
p.addEventListener("click", (event) => {
  event.target.style.color = "red";
});