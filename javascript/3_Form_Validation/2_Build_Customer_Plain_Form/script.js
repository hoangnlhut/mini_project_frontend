const inputForm = document.getElementById("form");
const inputFullName = document.getElementById("full-name");
const inputEmail = document.getElementById("email");
const inputOderNu = document.getElementById("order-no");
const inputProCode = document.getElementById("product-code");
const inputQuantity = document.getElementById("quantity");
const inputComplainCheckBoxs = document.querySelectorAll("#complaints-group input[type='checkbox']");
const complaintOther = document.getElementById("other-complaint");
const solutionOther = document.getElementById("other-solution");
const inputSolutions = document.querySelectorAll("#solutions-group input[type='radio']");
const inputSolutionDescription = document.getElementById("solution-description");

const clearButton = document.getElementById("clear-btn");
const inputComplainDescription = document.getElementById("complaint-description");

const inputComplainDescriptionContainer = document.getElementById("complaint-description-container");

const solutionDesContainer = document.getElementById("solution-description-container");
const messageBox = document.getElementById("message-box");

function validateData() {
    let isValid = true;
    
    // Validate Full Name
    if(inputFullName.value.trim() === ""){
        isValid = false;
        inputFullName.style.borderColor = "red";
    }
    else {
        inputFullName.style.borderColor = ""; // Reset border color if valid
    }

    // Validate Email
    if(inputEmail.value.trim() === ""){
        isValid = false;
        inputEmail.style.borderColor = "red";
    }
    else{
        inputEmail.style.borderColor = ""; // Reset border color if valid
    }

    // Validate Order Number
    if(! /^2024\d{6}$/.test(inputOderNu.value)){
        isValid = false;
        inputOderNu.style.borderColor = "red";
    }
    else {
        inputOderNu.style.borderColor = ""; // Reset border color if valid
    }

    // // Validate Product Code
    if(! /^XX\d{2}-X\d{3}-XX\d$/.test(inputProCode.value)){
        isValid = false;
        inputProCode.style.borderColor = "red";
    }
    else {
        inputProCode.style.borderColor = ""; // Reset border color if valid 
    }

    // // Validate Quantity
     if(inputQuantity.value.trim() === "" || isNaN(inputQuantity.value) || Number(inputQuantity.value) <= 0){
        isValid = false;
        inputQuantity.style.borderColor = "red";
    }
    else {
        inputQuantity.style.borderColor = ""; // Reset border color if valid
    }

    // Validate Complaints Checkboxes
    if(!Array.from(inputComplainCheckBoxs).some(checkbox => checkbox.checked)){
        isValid = false;
        document.getElementById("complaints-group").style.borderColor = "red";
    }
    else {
        document.getElementById("complaints-group").style.borderColor = ""; // Reset border color if valid
    }

    // if other complaint is selected, validate the description
    if (inputComplainDescriptionContainer.style.display !== "none" && inputComplainDescription.value.trim() === "") 
    {
        isValid = false;
        inputComplainDescription.style.borderColor = "red";
    }
    else 
    {
        inputComplainDescription.style.borderColor = ""; 
    }
    

    // Validate Desired Solution
    if(!Array.from(inputSolutions).some(radio => radio.checked)){
        isValid = false;
        document.getElementById("solutions-group").style.borderColor = "red";
    }
    else {
        document.getElementById("solutions-group").style.borderColor = ""; // Reset border color if valid
    }   

    // if other solution is selected, validate the description
    if (solutionDesContainer.style.display !== "none" && inputSolutionDescription.value.trim() === "") 
    {
        isValid = false;
        inputSolutionDescription.style.borderColor = "red";
       
    }
    else 
    {
        inputSolutionDescription.style.borderColor = ""; 
    }


    return isValid;
}

function submitForm(event) {
  event.preventDefault();

  //1. Validate Input Fields
    if(!validateData()){
         messageBox.textContent = "Please, fill out the required fields correctly before submitting."; 
         return;
    }

  //2. Ok To submit so alert a message
    alert("Form submitted successfully!");

  //3. Clear the form
    inputForm.reset();
    messageBox.textContent = ""; // Clear the message box
  
}


inputForm.addEventListener("submit", submitForm);
clearButton.addEventListener("click", () => inputForm.reset());

complaintOther.addEventListener("change", function() {
    if (this.checked) {
        inputComplainDescriptionContainer.classList.remove("hide");
        inputComplainDescription.focus();
    } else {
        inputComplainDescriptionContainer.classList.add("hide");
        inputComplainDescription.value = "";
    }
});

solutionOther.addEventListener("change", function() {
    if (this.checked) {
        solutionDesContainer.classList.remove("hide");
        inputSolutionDescription.focus();
    } 
    else
    {
        solutionDesContainer.classList.add("hide");
        inputSolutionDescription.value = "";
    }
});
