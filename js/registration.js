//Setting up firebase
var config = {
  apiKey: "AIzaSyDFuBAb7gmrOzAzhkkpAxphBszEr5O0l_k",
  authDomain: "sep-2018-f456e.firebaseapp.com",
  databaseURL: "https://sep-2018-f456e.firebaseio.com",
  projectId: "sep-2018-f456e",
  storageBucket: "sep-2018-f456e.appspot.com",
  messagingSenderId: "395954175951"
  };
firebase.initializeApp(config);
console.log(firebase); // testing use
var database = firebase.database();
var ref = database.ref('Users');
//End of setup

 //Initailise Fields
 var fName = document.getElementById("fName");
 var lName = document.getElementById("lName");
 var utsId = document.getElementById("utsId");
 var password = document.getElementById("password");
 var email = document.getElementById("email");
 var contact_num = document.getElementById("cNumber");
 var address = document.getElementById("address");
 var allergies = document.querySelector('input[name="allergiesRadios"]:checked');
 var current_meditation = document.getElementById("current_medication");
 var family_history;


function getAllergiesValue(){
   var allergiesRadio = document.forms[0].elements[allergiesRadios]
 console.log(allergiesRadios.length);
   for(var i = 0; i < allergiesRadio.length; i++)
   {
      if(allergiesRadio[i].checked)
      {
         return allergiesRadio[i].value;
      }
   }
   return '';
}

function getFamiliyHistory(){
  var checkedValue = ""; 
  var inputElements = document.getElementsByClassName('checkbox_grp');
  for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
          checkedValue = checkedValue + inputElements[i].value + ", ";
     }
  }
  return checkedValue;
}

function submitClicked(){
  if(formValidation()){
    saveData();
    window.alert("Register success!");
    window.location.replace("../http/login.html");
  }
}

function formValidation(){
  var msg;
  if(utsId.value!=""&&fName.value!==""&&password.value!=""&&email.value!=""&&contact_num.value!=""){
    if(utsId.value.length=8){
    if(document.getElementById("consent_y").checked){
        if(document.getElementById("reg_final_confirm").checked){
          return true;
        }
        else{
          msg = "You need to agree with the policy."
        }
    }
    else{
      msg = "You need to consent."
    }
  }
  else{
    msg = "Please enter valid UTS ID";
  }
  }
  else{
    msg="Please don't leave personal information blank";
  }

  window.alert(msg);
}

function saveData(){
  //start Saving
  var data = {
    UTS_ID: utsId.value,
    First_Name: fName.value,
    Last_Name: lName.value,
    password: password.value,
    Email: email.value,
    Contact_Number: contact_num.value,
    Address: address.value,
    Allergies: allergies.value,
    Current_Medication: current_meditation.value,
    Familiy_History: getFamiliyHistory(),
  }
ref.push(data);

}
