const Form = document.getElementById("PasswordCustomization");
const NumberOfCharactersSlider = document.getElementById(
  "NumberOfCharactersSlider"
);
const GeneratedPasswordElement = document.getElementById("Generatedpassword");
const NumberOfCharacters = document.getElementById("NumberOfCharacters");
const IncludeUpperCase = document.getElementById("IncludeUpperCaseCharacters");
const IncludeNumbers = document.getElementById("IncludeNumbers");
const IncludeSpecialCharacter = document.getElementById(
  "IncludeSpecialCharacters"
);
const UPPER_CASE_ALPHABETS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const LOWER_CASE_ALPHABETS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const SPECIAL_CHARACTERS = [
  "!",
  '"',
  "#",
  "$",
  "%",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  ".",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "[",
  "\\",
  "]",
  "^",
  "_",
  "{",
  "|",
  "}",
  "//",
];

// Functions

function SynchNumberOfCharacters(e) {
  NumberOfCharacters.value = e.target.value;
  NumberOfCharactersSlider.value = e.target.value;
}

function HandleSubmitEvent(e) {
  e.preventDefault();
  let password = generatePassword(
    NumberOfCharacters.value,
    IncludeUpperCase.checked,
    IncludeNumbers.checked,
    IncludeSpecialCharacter.checked
  );
  GeneratedPasswordElement.value = password;
  GeneratedPasswordElement.innerText = password;
}

function generatePassword(
  NumberOfCharacters,
  IncludeUpperCaseBool,
  IncludeNumbersBool,
  IncludeSpecialCharactersBool
) {
  let CharacterSet = LOWER_CASE_ALPHABETS;
  if (IncludeUpperCaseBool === true) {
    CharacterSet = CharacterSet.concat(UPPER_CASE_ALPHABETS);
  }
  if (IncludeNumbersBool === true) {
    CharacterSet = CharacterSet.concat(NUMBERS);
  }
  if (IncludeSpecialCharactersBool === true) {
    CharacterSet = CharacterSet.concat(SPECIAL_CHARACTERS);
  }
  let passwordChar = [];
  for (let i = 0; i < NumberOfCharacters; ++i) {
    charCode = Math.floor(Math.random() * CharacterSet.length);
    passwordChar.push(CharacterSet[charCode]);
  }
  return passwordChar.join("");
}

// Events

NumberOfCharacters.oninput = SynchNumberOfCharacters;
NumberOfCharactersSlider.oninput = SynchNumberOfCharacters;
Form.addEventListener("submit", HandleSubmitEvent);
