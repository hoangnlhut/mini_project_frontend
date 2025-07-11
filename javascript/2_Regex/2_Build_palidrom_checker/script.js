const inputCheck = document.querySelector("#text-input");
const btn = document.querySelector("#check-btn");
const para = document.querySelector("#result");

btn.addEventListener("click", () => {
    if ( inputCheck.value === "") {
        alert("Please input a value");
        return;
    }

    //check if the input is a palindrome by regex pattern
    const cleanedInput = inputCheck.value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    
    const reversedInput = cleanedInput.split("").reverse().join("");
    const isPalindrome = cleanedInput === reversedInput;

    if (isPalindrome) {
        para.innerHTML = `<span>${inputCheck.value}</span> is a palindrome.`;
        return;
    }

    para.innerHTML = `<span>${inputCheck.value}</span> is not a palindrome.`;
    
});