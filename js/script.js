  // Array of special characters to be included in password
  var specialCharacters = ['@','%','+','\\','/',"'",'!','#','$','^','?',':',',',')','(','}','{',']','[','~','-','_','.'];

  // Array of numeric characters to be included in password
  var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // Array of lowercase characters to be included in password
  var lowerCasedCharacters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

  // Array of uppercase characters to be included in password
  var upperCasedCharacters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
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
  const regExpLCase = "(?=.*[a-z])";
  const regExpUCase = "(?=.*[A-Z])";
  const regExpNCase = "(?=.*\\d)";
  const regExpSCase = "(?=.*[-+_!@#$%^&*.,?])";
  var RegExpChar = "";

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
    if(found.includes('L')){
      types.push('LowerCase');
      RegExpChar += regExpLCase;
    } 
    if(found.includes('U')){
      types.push('UpperCase');
      RegExpChar += regExpUCase;
    }
    if(found.includes('N')){
      types.push('Numeric');
      RegExpChar += regExpNCase;
    }
    if(found.includes('S')){
      types.push('Special');
      RegExpChar += regExpSCase;
    }
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

    var password = '';
    var charTypeLength = opt.characterTypes.length;
    var passLength = opt.length;
    var test = false;

    while (!test){
      for( var i = 0; i < passLength; i++){
        var character = opt.characterTypes[getRandomNum(charTypeLength)];
        password = password + getRandomChar(character);
      }
      if(password.length == passLength && isValid(password)){
        test = true;
      } else {
        password = '';
      } 
        
    } 


      return password;
    
  }
  //function to validate all char types in passowrd
  function isValid(str) {

    var result;
    var pattern = new RegExp("^"+RegExpChar+".+$");
    pattern.test(str) ? result = true : result =false;

    return result;
    
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