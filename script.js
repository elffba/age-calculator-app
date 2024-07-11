// Global Variables
const dayInput = document.querySelector('.day');
const monthInput = document.querySelector('.month');
const yearInput = document.querySelector('.year');
const displayDay = document.querySelector('.displayDay');
const displayMonth = document.querySelector('.displayMonth');
const displayYear = document.querySelector('.displayYear');
const errorMessage = document.querySelectorAll('.emptyerror');
const button = document.querySelector('.submit-btn'); // Button class is .submit-btn

const todayDate = new Date();
let todayDay = todayDate.getDate();
let todayMonth = todayDate.getMonth() + 1;
let todayYear = todayDate.getFullYear();

const numberOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Functions
const calculateAge = () => {
  inputValidate();

  // Parse input values to integers
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  // Check for valid date
  if (!isValidDate(day, month, year)) {
    return;
  }

  let y = todayYear - year;
  let m = todayMonth - month;
  let d = todayDay - day;

  if (d < 0) {
    m -= 1;
    d += numberOfMonth[month - 1];
  }

  if (m < 0) {
    y -= 1;
    m += 12;
  }

  displayDay.textContent = d;
  displayMonth.textContent = m;
  displayYear.textContent = y;
};

// Function to validate input values
const inputValidate = () => {
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  // Validate day
  if (isNaN(day) || day < 1 || day > 31) {
    errorMessage[0].textContent = 'Invalid day';
    dayInput.style.border = '1.5px solid red';
  } else {
    errorMessage[0].textContent = '';
    dayInput.style.border = '1.5px solid hsl(0, 0%, 86%)';
  }

  // Validate month
  if (isNaN(month) || month < 1 || month > 12) {
    errorMessage[1].textContent = 'Invalid month';
    monthInput.style.border = '1.5px solid red';
  } else {
    errorMessage[1].textContent = '';
    monthInput.style.border = '1.5px solid hsl(0, 0%, 86%)';
  }

  // Validate year
  if (isNaN(year) || year < 1900 || year > todayYear) {
    errorMessage[2].textContent = 'Invalid year';
    yearInput.style.border = '1.5px solid red';
  } else {
    errorMessage[2].textContent = '';
    yearInput.style.border = '1.5px solid hsl(0, 0%, 86%)';
  }

  // Reset the displayed age if any field is empty
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    displayDay.textContent = '- -';
    displayMonth.textContent = '- -';
    displayYear.textContent = '- -';
    return;
  }
};

// Function to validate if date is valid
const isValidDate = (day, month, year) => {
  const maxDays = numberOfMonth[month - 1];
  if (month === 2 && isLeapYear(year)) {
    maxDays = 29;
  }
  return !(isNaN(day) || day < 1 || day > maxDays || isNaN(month) || month < 1 || month > 12 || isNaN(year) || year < 1900 || year > todayYear);
};

// Function to check if it's a leap year
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

// Add event listener to the button
button.addEventListener('click', calculateAge);
