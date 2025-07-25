const display = document.getElementById("display");
const pads = document.querySelectorAll(".drum-pad");

function playSound(e) {
  const key = e.type === "keydown" ? e.key.toUpperCase() : e.target.innerText;
  const audio = document.getElementById(key);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
    display.innerText = audio.parentElement.id;
  }
}

pads.forEach(pad => pad.addEventListener("click", playSound));
document.addEventListener("keydown", playSound);
