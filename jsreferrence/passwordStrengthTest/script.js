const PasswordElement = document.getElementById("Password");
const PasswordStrengthElement = document.getElementById("strength-meter");
const ResultsElement = document.getElementById("reasons");

PasswordElement.addEventListener("input", UpdatePasswordStrengthMeter);

function UpdatePasswordStrengthMeter() {
  ResultsElement.innerHTML = "";
  let strength = 100;
  password = PasswordElement.value;
  const weaknesses = calculatePasswordStrength(password);
  weaknesses.forEach((weakness) => {
    strength -= weakness.deduction;
    const MessageElement = document.createElement("div");
    MessageElement.innerText = weakness.message;
    ResultsElement.appendChild(MessageElement);
    PasswordStrengthElement.style.setProperty("--strength", `${strength}`);
  });
}

function calculatePasswordStrength(password) {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowercaseWeakness(password));
  weaknesses.push(uppercaseWeakness(password));
  weaknesses.push(numberWeakness(password));
  weaknesses.push(specialCharactersWeakness(password));
  weaknesses.push(repeatCharactersWeakness(password));
  return weaknesses;
}

function lengthWeakness(password) {
  if (password.length <= 8) {
    return {
      message: "Password too short",
      deduction: 40,
    };
  }
  return {
    message: "",
    deduction: 0,
  };
}

function lowercaseWeakness(password) {
  return CharacterTypeWeakness(password, /[a-z]/g, "Lower Case Characters");
}

function uppercaseWeakness(password) {
  return CharacterTypeWeakness(password, /[A-Z]/g, "Upper Case Characters");
}

function numberWeakness(password) {
  return CharacterTypeWeakness(password, /[0-9]/g, "Numbers.");
}

function specialCharactersWeakness(password) {
  return CharacterTypeWeakness(
    password,
    /[^0-9a-zA-Z/s]/s,
    "Special Characters"
  );
}

function repeatCharactersWeakness(password) {
  const n = password.match(/(.)\1+/g);
  if (n) {
    return {
      message: "Password can't have repeated characters",
      deduction: 0,
    };
  }
  return {
    message: "",
    deduction: 0,
  };
}

function CharacterTypeWeakness(password, regex, type) {
  const n = password.match(regex);
  if (n == null) {
    return {
      message: `Password must contain ${type}`,
      deduction: 15,
    };
  }
  return {
    message: "",
    deduction: 0,
  };
}
