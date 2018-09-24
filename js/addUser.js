 /*  

function showReceptionistForm(){
    document.getElementById('receptionist').style.display="block";
    document.getElementById('doctor').style.display="none";  
    document.getElementById('sysadmin').style.display="none";  

}

function showDoctorForm(){
    document.getElementById('receptionist').style.display="none";
    document.getElementById('doctor').style.display="block";  
    document.getElementById('sysadmin').style.display="none";  
}

function showSysadminFOrm(){
    document.getElementById('receptionist').style.display="none";
    document.getElementById('doctor').style.display="none";  
    document.getElementById('sysadmin').style.display="block"; 
}
*/
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
var ref = database.ref('Staffs');
//End of setup

// Receptionist Values
var s_FName = document.getElementById("s_FName");
var s_LName = document.getElementById("s_LName");
var s_ID = document.getElementById("s_ID");
var s_Password = document.getElementById("s_Password");
var s_Email = document.getElementById("s_LName");
var s_Phone = document.getElementById("s_Phone");
var s_Address = document.getElementById("s_Address");

// Doctor Values
var d_FName = document.getElementById("d_FName");
var d_LName = document.getElementById("d_LName");
var d_ID = document.getElementById("d_ID");
var d_Password = document.getElementById("d_Password");
var d_Email = document.getElementById("d_LName");
var d_Phone = document.getElementById("d_Phone");
var d_Type = document.getElementById("d_Type");

// System Admin Values
var a_FName = document.getElementById("a_FName");
var a_LName = document.getElementById("a_LName");
var a_ID = document.getElementById("a_ID");
var a_Password = document.getElementById("a_Password");

function submitClicked(){
    if(formValidation()){
      saveData();
      window.location.href = "../http/sysadminManage.html";
    }
    else{
      window.alert("Form's not completed!");
    }
  }
  
  function formValidation(){
    return true;
  }

  function saveData(){
    //start Saving
    var data;
    if(getSelectValue() == 1) {
        data = {
        Staff_ID: s_ID.value,
        First_Name: s_FName.value,
        Last_Name: s_LName.value,
        password: s_Password.value,
        Email: s_Email.value,
        Contact_Number: s_Phone.value,
        Address: s_Address.value,
        
        }
    }

    if(getSelectValue() == 2) {
        data = {
        Doctor_ID: d_ID.value,
        First_Name: d_FName.value,
        Last_Name: d_LName.value,
        password: d_Password.value,
        Email: d_Email.value,
        Contact_Number: d_Phone.value,
        Doctor_Type: d_Type.value,
        }
    }

    if(getSelectValue() == 3) {
        data = {
        Sysadmin_ID: a_ID.value,
        First_Name: a_FName.value,
        Last_Name: a_LName.value,
        password: a_Password.value,
        
        }
    }
  ref.push(data);
  
  }




function getSelectValue() {
    var x = document.getElementById("userType").value;
    console.log(x);
    showDiv(x);
    return x;
}


function showDiv(x) {

    if (x == 0) {
        document.getElementById('receptionist').style.display = 'none';
        document.getElementById('doctor').style.display = 'none';
        document.getElementById('sysadmin').style.display = 'none';

    }

    if (x == 1) {
        document.getElementById('receptionist').style.display = 'block';
    } else {
        document.getElementById('receptionist').style.display = 'none';
 
    }
    if (x == 2) {
        document.getElementById('doctor').style.display = 'block';
    } else {
        document.getElementById('doctor').style.display = 'none';
 
    }
    if (x == 3) {
        document.getElementById('sysadmin').style.display = 'block';
    } else {
        document.getElementById('sysadmin').style.display = 'none';
 
    }
}

    