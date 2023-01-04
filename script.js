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

//Function to assign characterType options from input
function getCharTypes() {

  var types = {
    LowerCase: false,
    UpperCase: false,
    Numeric: false,
    Special: false,
  }

  //prompt user
  var characterTypes = prompt("What character types would you like in your password?\n Enter all required options into the box together from the options below\n ( L = lowercase, U = uppercase, N = numeric, S = special characters )");

  //check an option has been selected
  const chars = /[lL]|[uU]|[nN]|[sS]/g;
  var found = characterTypes.match(chars);

  while (found === null) {
    characterTypes = prompt("**Please select atleast 1 option** \nWhat character types would you like in your password?\n Enter all required into the box from the options below\n ( L = lowercase, U = uppercase, N = numeric, S = special characters )");
    found = characterTypes.match(chars);
  }

  //assign matches to true in types object if found, false if not
  found = found.toString().toUpperCase();
  found.includes('L') ? types.LowerCase = true : types.LowerCase = false;
  found.includes('U') ? types.UpperCase = true : types.UpperCase = false;
  found.includes('N') ? types.Numeric = true : types.Numeric = false;
  found.includes('S') ? types.Special = true : types.Special = false;

  //parse keys with true value only and return them to check with user
  var keys = Object.keys(types);
  var filtered = keys.filter(function (key) {
    return types[key]
  }).toString().replace(/,/g, ' - ');

  //present keys to check if user is happy with selection, just incase user spelt out entire word instead of just a letter and we detected other options by mistake
  var confirmBox = confirm('Are these options correct ?\n\n' + filtered + '\n\nIf not please click cancel to select again');

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
    characterTypes: {}
  }

  //prompt user
  var length = prompt("What length would you like your password? (between 10 and 64)");

  //Check correct entry
  while (length < 10 || length > 64 || isNaN(length)) {
    length = prompt("**Incorrect entry** \nPlease re-enter a number between 10 and 64 only")
  }
  options.length = length;
  options.characterTypes = getCharTypes();

  return options;
}

// Function for getting a random element from an array
function getRandom(arr) {

}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();
  console.log(options);
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);