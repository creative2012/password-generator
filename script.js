// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];
//length of character type arrays (used every character call)
const lowerCasedCharactersLength = lowerCasedCharacters.length -1;
const upperCasedCharactersLength = upperCasedCharacters.length -1;
const numericCharactersLength = numericCharacters.length -1; 
const specialCharactersLength = specialCharacters.length -1;
//prompts
const pLength = "What length would you like your password? (between 10 and 64)";
const pLengthError = "**Incorrect entry** \nPlease re-enter a number between 10 and 64 only";
const pcharTypes = "What length would you like your password? (between 10 and 64)";
const pCharTypeError = "**Please select atleast 1 option** \nWhat character types would you like in your password?\n Enter all required into the box from the options below\n ( L = lowercase, U = uppercase, N = numeric, S = special characters )";
const pConfirm1 = 'Are these options correct ?\n\n' ;
const pConfirm2 = '\n\nIf not please click cancel to select again';

//function to shuffle array ref: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

//Function to assign characterType options from input
function getCharTypes() {

  var types = []
  var characterTypes = prompt(pcharTypes); //prompt user for character types

  //check an option has been selected
  const chars = /[lL]|[uU]|[nN]|[sS]/g;
  var found = characterTypes.match(chars);

  //if incorrect entry re-prompt user
  while (found == null) {
    characterTypes = prompt(pCharTypeError); //promot again with error msg
    found = characterTypes.match(chars);
  }

  //assign matches to true in types object if found, false if not
  found = found.toString().toUpperCase();
  found.includes('L') ? types.push('LowerCase') : '';
  found.includes('U') ? types.push('UpperCase') : '';
  found.includes('N') ? types.push('Numeric') : '';
  found.includes('S') ? types.push('Special') : '';


  //present keys to check if user is happy with selection, just incase user spelt out entire word instead of just a letter and we detected other options by mistake
  var confirmBox = confirm(pConfirm1 + types.toString().replace(/,/g, ' - ') + pConfirm2);

  //if not, go again
  if (!confirmBox) {
    types = getCharTypes();
  }

  return types;
}

// Function to prompt user for password options
function getPasswordOptions() {

  var options = {
    length: 0,
    characterTypes: []
  }

  var length = prompt(pLength); //prompt user for length of password

  //Check correct entry
  while (length < 10 || length > 64 || isNaN(length)) {
    length = prompt(pLengthError) //prompt again with error msg
  }
  
  options.length = length; //set length
  options.characterTypes = getCharTypes(); // run function to prompt  user for character types and set

  return options;
}

// Function for getting a random element from an array
function getRandom(arr) {

  var char = '';

  arr == 'LowerCase' ? char = lowerCasedCharacters[Math.floor(Math.random() * lowerCasedCharactersLength)] : '';
  arr == 'UpperCase' ? char = upperCasedCharacters[Math.floor(Math.random() * upperCasedCharactersLength)] : '';
  arr == 'Numeric' ? char = numericCharacters[Math.floor(Math.random() * numericCharactersLength)] : '';
  arr == 'Special' ? char = specialCharacters[Math.floor(Math.random() * specialCharactersLength)] : '';
  
  return char;

}

// Function to generate password with user input
function generatePassword() {
  var password = [];
  var options = getPasswordOptions();

  var charTypeLength = options.characterTypes.length;  //length of character options selected (used twice)
  var optionsLength = options.length //length password needs to be (used twice)
  var characterTimes = Math.floor(optionsLength / (charTypeLength)); //times to add each type of character type based on user chosen length and number of options
  var remainingChar = optionsLength % (options.characterTypes.length); //remaining times to add characters if any left over from the above calc

  //get random characters for each user option character type
  options.characterTypes.forEach(function (x) {
    for (var i = 0; i < characterTimes; i++) {
      var option = x;
      password.push(getRandom(option));
    }
    
  });

  //if the count of options divided by the length of the password has a remainer, add the extra characters here
  if (remainingChar > 0) {
    while (remainingChar > 0) {
      var option = options.characterTypes[Math.floor(Math.random() * (charTypeLength - 1))]; //for the remaining characters choose random type from user options
      password.push(getRandom(option));
      remainingChar --;
    }
  }

  return shuffle(password).toString().replace(/,/g, ''); // shuffle passowrd and return as string
}


var generateBtn = document.querySelector('#generate'); // Get references to the #generate element

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);