function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnclose = document.getElementById("close");
const modalBody = document.querySelector(".modal-body");
const modalBody2 = document.querySelector(".modal-body2");
const modalBtnclose2 = document.querySelector(".btnclose");
const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputEmail = document.getElementById("email");
const inputBirthdate = document.getElementById("birthdate");
const inputNumber = document.getElementById("quantity");
const radioLocations = document.getElementsByName("location");
const inputCondition = document.getElementById("checkbox1");
const formSubmit = document.getElementsByName("reserve")[0];
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal
modalBtnclose.addEventListener("click", function () {
  closeModal();
});
modalBtnclose2.addEventListener("click", function () {
  closeModal();
});
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// idHtml= id de l'élément html où va etre inséré le message
// messagestr = texte erreur
// input = input concerné
// displayOnOff = booleean pour afficher ou faire disparaitre l'erreur
function displayError(idHtml, messagestr, input, displayOnOff) {
  var messageHtml = document.getElementById(idHtml);
  if (displayOnOff) {
    messageHtml.innerHTML = messagestr;
    messageHtml.setAttribute('data-error-visible', 'true');
    input.setAttribute('data-error-visible', 'true');
  } else {
    messageHtml.setAttribute('data-error-visible', 'false');
    input.setAttribute('data-error-visible', 'false');
  }
}

// fonction vérification input prénom, nom de famille et Email
// vérification non vide et regex
// renvoi un text message erreur 

inputFirstName.addEventListener("input", function () {
  checkText(inputFirstName, "^[a-zA-Z]{2,}$", "errorFirstName", "Veuillez renseigner un prénom");
})

inputLastName.addEventListener("input", function () {
  checkText(inputLastName, "^[a-zA-Z]{2,}$", "errorLastName", "Veuillez renseigner un nom");
})

inputEmail.addEventListener("input", function () {
  checkText(inputEmail, "^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$", "errorEmail", "Veuillez reseigner un email")
})


function checkText(input, regexstr, idHtml, textError) {
  var value = input.value;
  var regex = new RegExp(regexstr);

  if (value === "") {
    displayError(idHtml, textError, input, true);
    return false;
  } else if (!regex.test(value)) {
    displayError(idHtml, textError, input, true);
    return false;
  } else {
    displayError(idHtml, "", input, false);
    return true;
  }
}

// fonction vérification date de naissance
// validation non vide/ vérification date de naissance + 18 ans
// renvoi un texte message erreur
inputBirthdate.addEventListener("input", function () {
  checkBirth(inputBirthdate);
})

function checkBirth(input) {
  if (input.value === "") {
    displayError("errorBirthdate", "Veuillez renseigner une date de naissance", input, true);
    return false;
  } else {
    var birthdate = new Date(input.value);
    var currentDate = new Date();
    var age = currentDate.getFullYear() - birthdate.getFullYear();
    var month = currentDate.getMonth() - birthdate.getMonth();
    if (month < 0 || (month === 0 && currentDate.getDate() < birthdate.getDate())) age--; // mois anniversaire supérieur mois en cours idem jour, age -- = l'age -1
    if (age < 18) {
      displayError("errorBirthdate", "Vous devez avoir 18 ans minimum", input, true);
      return false;
    } else {
      displayError("errorBirthdate", "", input, false);
      return true;
    }
  }

}
// fonction vérification nb de tournoi (chiffres)
// validation non vide et que des chiffres
// renvoi un text message erreur

inputNumber.addEventListener("input", function () {
  checkNum(inputNumber);
})


function checkNum(input) {
  var value = input.value;
  var regex = new RegExp("^[0-9]{1,}$");
  if (value === "") {
    displayError("errorQuantity", "Veuillez renseigner ce champ", input, true);
    return false;
  } else if (!regex.test(value)) {
    displayError("errorQuantity", "Veuillez renseigner un nombre valide", input, true);
    return false;
  }
  else {
    displayError("errorQuantity", "Veuillez renseigner un nombre valide", input, false);
    return true;
  }
}

// fonction vérification radio ville tournoi
// validation au moins une option cochée
// renvoi un text message erreur
for (var i = 0; i < radioLocations.length; i++) {
  radioLocations[i].addEventListener('change', function () {
    if (this.checked) {
      displayError("errorLocation", "", this, false);
    }
  })
}
function checkLocation(radioLocations) {
  for (i = 0; i < radioLocations.length; i++) {
    if (radioLocations[i].checked) {
      displayError("errorLocation", "", radioLocations[i], false);
      return true;
    }
  }
  displayError("errorLocation", "Veuillez selectionner une ville", radioLocations[0], true);
  return false;
}

// fonction vérification option coché condition utilisation
// validation option coché 
// renvoi un text message erreur

inputCondition.addEventListener("input", function () {
  checkCondition(inputCondition);
})

/** 
* definition function
* @param {object} input type checkbox 
* @return {boolean} boolean retourne false si pas coché
*/
function checkCondition(input) {
  var checked = input.checked;
  if (checked) {
    displayError("errorCondition", "", input, false);
  } else {
    displayError("errorCondition", "veuillez accepter les conditions d'utilisation", input, true);
  }

  return checked;
}

// A la validation du formulaire vérifié tous les inputs (return true) avant validation du formulaire
// si return false le form ne s'envoie pas
function validate() {

  var checkIdentity = checkText(inputFirstName, "^[a-zA-Z]{2,}$", "errorFirstName", "Veuillez renseigner un prénom ");
  var checkLastName = checkText(inputLastName, "^[a-zA-Z]{2,}$", "errorLastName", "Veuillez renseigner un nom");
  var checkEmail = checkText(inputEmail, "^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$", "errorEmail", "Veuillez reseigner un email");
  var checkDate = checkBirth(inputBirthdate);
  var checkToornament = checkNum(inputNumber);
  var checkRadio = checkLocation(radioLocations);
  var checkform = checkCondition(inputCondition);

  if (checkIdentity && checkLastName && checkEmail && checkDate && checkToornament && checkRadio && checkform) {
    return true;
  } else {
    return false;
  }
}

formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validate()) {
    modalBody.style.display = "none";
    modalBody2.style.display = "flex";
  }
}, false);
    //si return true apparition message remerciement d'inscription
    //dispparition formulaire/apparition message felicitation + button fermer modal
    //alert = style pop up apparaissant sur mon navigateur