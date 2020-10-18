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

//Function for PW options
var passwordOptions = () => {
	//Function to derive desired PW length; parsInt parses integers
	var length = parseInt(
		prompt(`How many characters (8-128) would you like your password to be?`)
	);

	//Conditional ensuring PW character length suffices; 7<PW<129
	if (length < 8 || length > 128) {
		alert(`Password must be between 8 and 128 characters in length`);
		return;
	}

	//Conditional ensuring PW character length input is a number (global isNaN=isNotaNumber)
	if (isNaN(length) === true) {
		alert(`Desired character length must be input as a number`);
		return;
	}

	//variable confirming inclusion of uppercase characters
	var containsUpperCaseCharacters = confirm(
		`Select OK to include uppercase characters in password`
	);

	//variable confirming inclusion of lowercase characters
	var containsLowerCaseCharacters = confirm(
		`Select OK to include lowercase characters in password`
	);

	//variable confirming inclusion of numeric characters
	var containsNumericCharacters = confirm(
		`Select OK to include numeric characters in password`
	);

	//variable confirming inclusion of special characters
	var containsSpecialCharacters = confirm(
		`Select OK to include special characters in password`
	);

	//Program terminates if all four conditionals === false
	if (
		containsUpperCaseCharacters === false &&
		containsLowerCaseCharacters === false &&
		containsNumericCharacters === false &&
		containsSpecialCharacters === false
	) {
		alert('Inclusion of at least one character type required');
		return;
	}

	//Storing user input
	// obj shorthand notation
	var inputPreferences = {
		length,
		containsLowerCaseCharacters,
		containsUpperCaseCharacters,
		containsNumericCharacters,
		containsSpecialCharacters
	};
	return inputPreferences;
};

//Function deriving random elements from aforelisted arrays
var deriveRandom = arr => {
	//randomIndex = arr length*random decimal between 0 to 1 rounded down to call arr element
	var randomIndex = Math.floor(Math.random() * arr.length);
	//var assigning randomly generated element to corresponding array
	var randomElement = arr[randomIndex];
	return randomElement;
};

//Function for password generation
function passwordGeneration() {
	var preferences = passwordOptions();
	//Storing password throughout generation process
	var output = [];

	//Array for storing user desired character types
	var desiredCharacters = [];

	//Array for all possible character types
	var allCharacters = [];

	var { length } = preferences;

	var {
		containsSpecialCharacters,
		containsNumericCharacters,
		containsUpperCaseCharacters,
		containsLowerCaseCharacters
	} = preferences;

	//push random special chars per pref spec
	if (containsSpecialCharacters) {
		allCharacters = allCharacters.concat(specialCharacters);
		desiredCharacters.push(deriveRandom(specialCharacters));
	}

	//push random numeric chars per pref spec
	if (containsNumericCharacters) {
		allCharacters = allCharacters.concat(numericCharacters);
		desiredCharacters.push(deriveRandom(numericCharacters));
	}

	//push random uppercase chars per pref spec
	if (containsUpperCaseCharacters) {
		allCharacters = allCharacters.concat(upperCasedCharacters);
		desiredCharacters.push(deriveRandom(upperCasedCharacters));
	}

	//push random lowercase chars per pref spec
	if (containsLowerCaseCharacters) {
		allCharacters = allCharacters.concat(lowerCasedCharacters);
		desiredCharacters.push(deriveRandom(lowerCasedCharacters));
	}

	//iteration of loop over PW length from preferences object via random arr selection and concatenation of elements
	for (var i = 0; i < length; i++) {
		var allCharacter = deriveRandom(allCharacters);
		output.push(allCharacter);
	}

	//incorporate min of one of each specd char in PW
	for (var i = 0; i < desiredCharacters.length; i++) {
		output[i] = desiredCharacters[i];
	}

	//generate a string result
	return output.join('');
}

var btnC = document.querySelector('#copy');
var btnG = document.querySelector('#generation');
var pwText = document.querySelector('#PW');
//function to write PW
function transcribePassword() {
	var pw = passwordGeneration();
	pwText.value = pw;
	btnC.removeAttribute('disabled');
	btnC.focus();
}

//copy to clipboard function
function copyClip() {
	pwText.select();
	document.execCommand('copy');
	//logs previously copied PWs to innerHTML below card
	alert(`Generated password ${pwText.value} copied to clipboard.`);
	document.getElementById('pastPasswords').innerHTML += pwText.value + '<br />';
}

//add event listener to generate and copy buttons
btnG.addEventListener('click', transcribePassword);
btnC.addEventListener('click', copyClip);
