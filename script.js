// Array of special characters to be included in password
var specialCharacters = ["@", "%", "+", "\\", "/", "'", "!", "#", "$", "^", "?", ":", ",", ")", "(", "}", "{", "]", "[", "~", "-", "_", "."];
  
// Array of numeric characters to be included in password
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Array of uppercase characters to be included in password
var upperCasedCharacters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//Function for PW options
function passwordOptions() {
    //Function to derive desired PW length; parsInt parses integers
    let length = parseInt(prompt(`How many characters (8-128) would you like your password to be?`)
    );

    //Conditional ensuring PW character length suffices; 7<PW<129
    if (length < 8 || length > 128) {
        alert(`Password must be between 8 and 128 characters in length`);
        return;
    }
    
    //Conditional ensuring PW character length input is a number (global isNaN=isNotaNumber)
    if (isNaN(length)===true) {
        alert(`Desired character length must be input as a number`);
        return;
    }

    //variable confirming inclusion of uppercase characters
    let containsUpperCaseCharacters = confirm(
        `Select OK to include uppercase characters in password`
    );
    
    //variable confirming inclusion of lowercase characters
    let containsLowerCaseCharacters = confirm(
        `Select OK to include lowercase characters in password`
    );
    
    //variable confirming inclusion of numeric characters
    let containsNumericCharacters = confirm(
        `Select OK to include numeric characters in password`
    );
    
    //variable confirming inclusion of special characters
    let containsSpecialCharacters = confirm(
        `Select OK to include special characters in password`
    );

    //Program terminates if all four conditionals === false
    if (containsUpperCaseCharacters === false && containsLowerCaseCharacters === false
        && containsNumericCharacters === false && containsSpecialCharacters === false) {
            alert("Inclusion of at least one character type required");
            return;
        }
    
    //Storing user input
    let inputPreferences = {
        length: length,
        containsLowerCaseCharacters: containsLowerCaseCharacters,
        containsUpperCaseCharacters: containsUpperCaseCharacters,
        containsNumericCharacters: containsNumericCharacters,
        containsSpecialCharacters: containsSpecialCharacters,
    };
    return inputPreferences;
}

//Function deriving random elements from aforelisted arrays
function deriveRandom(arr) {
    //randomIndex = arr length*random decimal between 0 to 1 rounded down to call arr element
    let randomIndex = Math.floor(Math.random()*arr.length);
    //var assigning randomly generated element to corresponding array
    let randomElement = arr[randomIndex];
    return randomElement;
}

//Function for password generation
function passwordGeneration() {
    let preferences = passwordOptions();
    //Storing password throughout generation process
    let output = [];

    //Array for storing user desired character types
    let desiredCharacters = [];

    //Array for all possible character types
    let allCharacters = [];

    //push random special chars per pref spec
    if (preferences.containsSpecialCharacters) {
        allCharacters = allCharacters.concat(specialCharacters);
        desiredCharacters.push(deriveRandom(specialCharacters));
    }

    //push random numeric chars per pref spec
    if (preferences.containsNumericCharacters) {
        allCharacters = allCharacters.concat(numericCharacters);
        desiredCharacters.push(deriveRandom(numericCharacters));
    }

    //push random uppercase chars per pref spec
    if (preferences.containsUpperCaseCharacters) {
        allCharacters = allCharacters.concat(upperCasedCharacters);
        desiredCharacters.push(deriveRandom(upperCasedCharacters));
    }

    //push random lowercase chars per pref spec
    if (preferences.containsLowerCaseCharacters) {
        allCharacters = allCharacters.concat(lowerCasedCharacters);
        desiredCharacters.push(deriveRandom(lowerCasedCharacters));
    }

    //iteration of loop over PW length from preferencs object via random arr selection and concatenation of elements
    for (var i=0; i<preferences.length; i++) {
        let allCharacter = deriveRandom(allCharacters);
        output.push(allCharacter);
    }

    //incorporate min of one of each specd char in PW 
    for (var i=0; i<desiredCharacters.length; i++) {
        output[i]=desiredCharacters[i];
    }

    //generate a string result
    return output.join("");
}

let btnC = document.querySelector("#copy");
let btnG = document.querySelector("#generation");

//function to write PW 
function transcribePassword() {
    let pw = passwordGeneration();
    let pwText = document.querySelector("#PW");
    pwText.value=pw;
    btnC.removeAttribute("disabled");
    btnC.focus();
}

//copy to clipboard function
function copyClip() {
let pwText=document.querySelector("#PW");
pwText.select();
document.execCommand("copy");

alert(`Generated password ${pwText.value} copied to clipboard.`);
}

//add event listener to generate and copy buttons
btnG.addEventListener("click", transcribePassword);
btnC.addEventListener("click", copyClip);