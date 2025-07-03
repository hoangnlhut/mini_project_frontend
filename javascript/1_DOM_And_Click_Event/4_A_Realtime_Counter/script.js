const textArea = document.getElementById("text-input");
const charCount = document.getElementById("char-count");

textArea.addEventListener("input", () => {
  let input = textArea.value;

  // Restrict input to 50 characters
  if (input.length > 50) {
    input = input.slice(0, 50);
    textArea.value = input;
  }

  // Update character count
  charCount.textContent = `Character Count: ${input.length}/50`;

  // Change color to red at 50 characters
  charCount.style.color = input.length === 50 ? "red" : "black";
});
