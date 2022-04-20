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
const formData = document.querySelectorAll(".formData");
var modalBtnclose = document.getElementById("close");
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalBtnclose.addEventListener("click", function(){
  closeModal();
});
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
function closeModal() {
  modalbg.style.display = "none";
}


// fonction vérification input prénom et nom de famille
  // vérification non vide, que des lettres et mini 2 caractères
  // renvoi un text message erreur 
  // mettre contour rouge
// vérification first/last Name
var inputFirstName = document.getElementById("firstName");
inputFirstName.addEventListener("input", function(){
  var messageErreur = document.getElementById("errorFirstName");
  if(!checkText(inputFirstName,"^[a-zA-Z]{2,}$")){
    messageErreur.innerHTML = "veuillez renseigner un prénom valide";
    messageErreur.setAttribute('data-error-visible', 'true');
    inputFirstName.setAttribute('data-error-visible', 'true');

  }else {
    messageErreur.setAttribute('data-error-visible', 'false');
    inputFirstName.setAttribute('data-error-visible', 'false');
  }

 

})

var inputLastName = document.getElementById("lastName"); 
inputLastName.addEventListener("input", function(){
  var messageErreur = document.getElementById("errorLastName");
  if(!checkText(inputLastName,"^[a-zA-Z]{2,}$")){
    messageErreur.innerHTML = "veuillez renseigner un nom valide";
    messageErreur.setAttribute('data-error-visible', 'true');
    inputLastName.setAttribute('data-error-visible', 'true');
 
  }else {
    messageErreur.setAttribute('data-error-visible', 'false');
    inputLastName.setAttribute('data-error-visible', 'false');
  }

   
})


var inputEmail = document.getElementById("email");
inputEmail.addEventListener("input",function(){
  var messageErreur = document.getElementById("errorEmail");
  if(!checkText(inputEmail,"^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$")){
    messageErreur.innerHTML = "veuillez renseigner un email valide";
    messageErreur.setAttribute('data-error-visible', 'true');
    inputEmail.setAttribute('data-error-visible', 'true');
  }else {
    messageErreur.setAttribute('data-error-visible', 'false');
    inputEmail.setAttribute('data-error-visible', 'false');
  }
})



function checkText(input,regexstr){
  var value = input.value;
  var regex = new RegExp(regexstr);
 
  
  if(!regex.test(value)){
    console.log("pas Valide");
    return false;
  }
  else{
    console.log("valide");
    return true;
  }
}

// fonction vérification date de naissance
  // validation non vide
  // renvoi un text message erreur
var inputBirthdate = document.getElementById("birthdate");
inputBirthdate.addEventListener("input",function(){
  var messageErreur = document.getElementById("errorBirthdate"); 
  if(!checkBirth(inputBirthdate)){
    messageErreur.innerHTML = "Vous devez avoir 18 ans minimun pour vous inscrire";
    messageErreur.setAttribute('data-error-visible', 'true');
    inputBirthdate.setAttribute('data-error-visible', 'true');
  }else {
    messageErreur.setAttribute('data-error-visible', 'false');
    inputBirthdate.setAttribute('data-error-visible', 'false');
  }
})


function checkBirth(input){
  var birthdate = new Date(input.value);
  var currentDate = new Date();
  var age = currentDate.getFullYear() - birthdate.getFullYear();
  var month = currentDate.getMonth() - birthdate.getMonth(); 
  if (month < 0 ||(month === 0 && currentDate.getDate() < birthdate.getDate())) age--; // mois anniversaire supérieur mois en cours idem jour, age -- = l'age -1
  if(age < 18) {
    console.log("pas valide");
    return false;
  }else {
    console.log("valide");
    return true;
  } 
} 



// fonction vérification nb de tournoi (chiffres)
  // validation non vide et que des chiffres
  // renvoi un text message erreur
var inputNumber = document.getElementById("quantity");
inputNumber.addEventListener("input",function(){
  var messageErreur = document.getElementById("errorQuantity"); 
  if(!checkNum(inputNumber)){
    messageErreur.innerHTML = "Veuillez remplir ce champ";
    messageErreur.setAttribute('data-error-visible', 'true');
    inputNumber.setAttribute('data-error-visible', 'true');
  }else {
    messageErreur.setAttribute('data-error-visible', 'false');
    inputNumber.setAttribute('data-error-visible', 'false');
  }
})


function checkNum(input){
  var value = input.value;
  var regex = new RegExp("^[0-9]{1,}$");
  if( !regex.test(value)){
    return false;

  }
  else{
    return true;
  }
}


// fonction vérification radio ville tournoi
  // validation au moins une option cochée
  // renvoi un text message erreur
var radioLocations = document.getElementsByName("location");
function checkLocation(radioLocations) {
    for(i=0;i<radioLocations.length;i++){
      if(radioLocations[i].checked){
        return true;
      }     
    }
    return false;
}



// fonction vérification option coché condition utilisation
  // validation option coché 
  // renvoi un text message erreur
var inputCondition = document.getElementById("checkbox1");
inputCondition.addEventListener("input",function(){
  var messageErreur = document.getElementById("errorCondition"); 
  if(!checkCondition(inputCondition)){
    messageErreur.innerHTML = "Veuillez accepter les conditions d'utilisations";
    messageErreur.setAttribute('data-error-visible', 'true');

  }else {
    messageErreur.setAttribute('data-error-visible', 'false');
  }
 
})

/** 
* definition function
* @param {object} input type checkbox 
* @return {boolean} boolean retourne false si pas coché
*/
function checkCondition(input){
  var checked = input.checked;
  return checked;
}


// A la validation du formulaire vérifié tous les inputs (return true) avant validation du formulaire
  // si return false le form ne s'envoie pas
  function validate(){
    if(inputFirstName.value === "" || !checkText(inputFirstName,"^[a-zA-Z]{2,}$")) { console.log("prenom pas valide")
      return false};
    if(inputLastName.value === "" || !checkText(inputLastName,"^[a-zA-Z]{2,}$")) { console.log("nom pas valide")
      return false};
    if(inputEmail.value === "" || !checkText(inputEmail,"^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$")) { console.log("email pas valide")
      return false};
    if(inputBirthdate.value === "" || !checkBirth(inputBirthdate)) { console.log("date de naissance pas valide")
      return false};
    if(inputNumber.value === "" || !checkNum(inputNumber)) { console.log("quantity pas valide")
      return false};
    if(!checkLocation(radioLocations)) { console.log("location pas valide")
      return false};
    if(!checkCondition(inputCondition)) { console.log("condition pas valide")
      return false};
    
    return true;

    
  }

  var form = document.getElementsByName("reserve")[0];
      form.addEventListener("submit",function(event){
        event.preventDefault();
        if (validate()){
            console.log("formulaire validé");
           
        }
        else {
            console.log("formulaire non valide");
           
        }
      },false);
    //si return true apparition message remerciement d'inscription
    //dispparition formulaire/apparition message felicitation + button fermer modal
    //alert = style pop up apparaissant sur mon navigateur