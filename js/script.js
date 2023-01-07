// Array of special characters to be included in password
var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Array of uppercase characters to be included in password
var upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//new array to hold selected character types
var newCharacterArray = [];
var newArrayLength = 0;
//prompts
const pLength = "What length would you like your password? (between 10 and 64)";
const pLengthError = "**Incorrect entry** \n Entry must be numeric and between 10 and 64";
const pcharTypes = "What character types would you like in your password?\n Enter all required into the box from the options below\n ( L = lowercase, U = uppercase, N = numeric, S = special characters )";
const pCharTypeError = "**Please select atleast 1 option** \n";
const pConfirm1 = 'Are these options correct ?\n\n';
const pConfirm2 = '\n\nIf not please click cancel to select again';
const regExpLCase = "(?=.*[a-z])";
const regExpUCase = "(?=.*[A-Z])";
const regExpNCase = "(?=.*\\d)";
const regExpSCase = "(?=.*[-+_!@#$%^&*., ?])";
const chars = /[lL]|[uU]|[nN]|[sS]/g;
var RegExpChar = "";

//function to reset variables for new password
function int() {
  newCharacterArray = [];
  newArrayLength = 0;
  RegExpChar = "";
}

//function to combine arrays and set password test
function combineArrays(array, exp, type) {
  newCharacterArray = newCharacterArray.concat(array);
  RegExpChar += exp;
  return type;
}

// Function to prompt user for password options
function getPasswordOptions() {
  var options = {
    length: 0,
    characterTypes: []
  }
  var characterTypes;
  var found;
  var length = 0;
  var exit = false;
  //prompt for length and validate
  while (true) {
    length = prompt(pLength);
    if (length == null) {
      exit = true;
      break;
    }
    else if (length < 10 || length > 64 || isNaN(length)) {
      alert(pLengthError);
    } else {
      break;
    }
  }
  options.length = length; //set length
  //prompt for characters and validate
  while (true && !exit) {
    characterTypes = prompt(pcharTypes);
    if (characterTypes == null) {
      exit = true;
      break;
    }
    found = characterTypes.match(chars);
    if (found == null) {
      alert(pCharTypeError);
    } else {
      break;
    }
  }
  if (!exit) {
    //push selected options to array and confirm all options
    found = found.toString().toUpperCase();
    found.includes('L') ? options.characterTypes.push(combineArrays(lowerCasedCharacters, regExpLCase, 'LowerCase')) : '';
    found.includes('U') ? options.characterTypes.push(combineArrays(upperCasedCharacters, regExpUCase, 'UpperCase')) : '';
    found.includes('N') ? options.characterTypes.push(combineArrays(numericCharacters, regExpNCase, 'Numeric')) : '';
    found.includes('S') ? options.characterTypes.push(combineArrays(specialCharacters, regExpSCase, 'Special')) : '';
    var confirmBox = confirm(pConfirm1 + 'Password Length: ' + options.length + '\n' + options.characterTypes.toString().replace(/,/g, ' - ') + pConfirm2); //Present options to user and ask for confirmtion that they are correct

    //if not, go again
    if (!confirmBox) {
      options = getPasswordOptions();
    }
    newArrayLength = newCharacterArray.length;
  } else {
    return false;
  }
    return options;
}

//function to get random Number
function getRandomNum(max) {
  return Math.floor(Math.random() * max)
}

// Function for getting a random element from an array
function getRandomChar() {
  var char = newCharacterArray[getRandomNum(newArrayLength)];
  return char;
}

// Function to generate password from user input
function generatePassword(passLength) {
  var password = '';
  for (var i = 0; i < passLength; i++) {
    password += getRandomChar();
  }
  isValid(password) ? '' : password = generatePassword(passLength);
  return password;

}
//function to validate all char types in passowrd
function isValid(str) {
  var pattern = new RegExp("^" + RegExpChar + ".+$");
  return pattern.test(str);
}

var generateBtn = document.querySelector('#generate'); // Get references to the #generate element

// Write password to the #password input
function writePassword() {
  int();
  var userOptions = getPasswordOptions()
  if (userOptions != false) {
    var password = generatePassword(userOptions.length);
    var passwordText = document.querySelector('#password');

    passwordText.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);