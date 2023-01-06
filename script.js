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
  const lowerCasedCharactersLength = lowerCasedCharacters.length - 1;
  const upperCasedCharactersLength = upperCasedCharacters.length - 1;
  const numericCharactersLength = numericCharacters.length - 1;
  const specialCharactersLength = specialCharacters.length - 1;
  //prompts
  const pLength = "What length would you like your password? (between 10 and 64)";
  const pLengthError = "**Incorrect entry** \n";
  const pcharTypes = "What character types would you like in your password?\n Enter all required into the box from the options below\n ( L = lowercase, U = uppercase, N = numeric, S = special characters )";
  const pCharTypeError = "**Please select atleast 1 option** \n";
  const pConfirm1 = 'Are these options correct ?\n\n';
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

    var types = [] //ensure empty character type options to begin with
    var characterTypes = prompt(pcharTypes); //prompt user for character type
    //exit if cancel pressed
    if(characterTypes == null){
      return false;
    }
    //check an option has been selected
    const chars = /[lL]|[uU]|[nN]|[sS]/g;
    var found = characterTypes.match(chars);

    //if incorrect entry re-prompt user
    while (found == null) {
      characterTypes = prompt(pCharTypeError+pcharTypes); //prompt again with error msg
      //exit if cancel pressed
      if(characterTypes == null){
        return false;
      }
      found = characterTypes.match(chars);
    }

    //push selected options to array
    found = found.toString().toUpperCase();
    found.includes('L') ? types.push('LowerCase') : '';
    found.includes('U') ? types.push('UpperCase') : '';
    found.includes('N') ? types.push('Numeric') : '';
    found.includes('S') ? types.push('Special') : '';

    var confirmBox = confirm(pConfirm1 + types.toString().replace(/,/g, ' - ') + pConfirm2); //Present options to user and ask for confirmtion that they are correct

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
    var length = +prompt(pLength); //prompt user for length of password
    //exit if cancel pressed
    if(length == 0){
      return false
    }
    //Check correct entry
    while (length < 10 || length > 64  || isNaN(length)) {
      length = +prompt(pLengthError+pLength) //prompt again with error msg
      //exit if cancel pressed
      if(length == 0){
        return false;
      }
    }

    options.length = length; //set length
    options.characterTypes = getCharTypes(); // run function to prompt  user for character types and set
    if(options.characterTypes == false){
      return false;
    }

    return options;
  }
  //function to get random Number
  function getRandomNum(max){
    return Math.floor(Math.random() * max)
  }

  // Function for getting a random element from an array
  function getRandomChar(arr) {

    var char = '';

    arr == 'LowerCase' ? char = lowerCasedCharacters[getRandomNum(lowerCasedCharactersLength)] : '';
    arr == 'UpperCase' ? char = upperCasedCharacters[getRandomNum(upperCasedCharactersLength)] : '';
    arr == 'Numeric' ? char = numericCharacters[getRandomNum(numericCharactersLength)] : '';
    arr == 'Special' ? char = specialCharacters[getRandomNum(specialCharactersLength)] : '';

    return char;

  }

  // Function to generate password with user input
  function generatePassword(opt) {
    var password = []; //ensure empty password to beign with
    var charTypeLength = opt.characterTypes.length;  //length of character options selected (used 3 times)
    var passwordLength = opt.length //length password needs to be (used twice)
    var characterTimes = Math.floor(passwordLength / (charTypeLength)); //times to add each type of character type based on user chosen length and number of options
    var remainingChar = passwordLength % (charTypeLength); //remaining times to add characters if any left over from the above calc

    //get random characters for each user option character type, ensuring all options selected will be present in password
    opt.characterTypes.forEach(function (x) {
      for (var i = 0; i < characterTimes; i++) {
        password.push(getRandomChar(x)); //push random char to password array
      }
    });

    //if the count of options divided by the length of the password has a remainer, add the extra characters here
    if (remainingChar > 0) {
      while (remainingChar > 0) {
        var character = opt.characterTypes[getRandomNum(charTypeLength - 1)]; //for the remaining characters choose random type from user options
        password.push(getRandomChar(character)); //push random char to password array
        remainingChar--;
      }
    }

    return shuffle(password).toString().replace(/,/g, ''); // shuffle password and return as clean string
  }

  var generateBtn = document.querySelector('#generate'); // Get references to the #generate element

  // Write password to the #password input
  function writePassword() {
    var userOptions = getPasswordOptions()
    if(userOptions != false){
      var password = generatePassword(userOptions);
      var passwordText = document.querySelector('#password');

      passwordText.value = password;
    }
  }

  // Add event listener to generate button
  generateBtn.addEventListener('click', writePassword);