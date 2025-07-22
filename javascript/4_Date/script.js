// Step 1: Create a variable with the current date and time
let currentDate = new Date();

// Step 2: Create a formatted string using the current date
let currentDateFormat = `Current Date and Time: ${currentDate}`;
console.log(currentDateFormat);
///Current Date and Time: Tue Jul 22 2025 11:04:36 GMT+0700 (Indochina Time)

// Step 3: Function to format date as MM/DD/YYYY
function formatDateMMDDYYYY(dateObj) {
  return `Formatted Date (MM/DD/YYYY): ${dateObj.toLocaleDateString("en-US")}`;
}

// Step 4: Function to format date as Month Day, Year
function formatDateLong(dateObj) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return `Formatted Date (Month Day, Year): ${dateObj.toLocaleDateString("en-US", options)}`;
}

// Logging both formats
console.log(formatDateMMDDYYYY(currentDate));
///Formatted Date (MM/DD/YYYY): 7/22/2025

console.log(formatDateLong(currentDate));
///Formatted Date (Month Day, Year): July 22, 2025