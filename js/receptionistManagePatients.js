setNav();
var current_user = getQueryVariable("Staff_ID");
var current_patient;
var id,fName,lName,contactNum,email,address,medication,allergies,history ;
var key;

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
var userRef = firebase.database().ref().child('Users');

//set up table
userRef.on("child_added", snap => {
    id = snap.child("UTS_ID").val();
    fName = snap.child("First_Name").val();
    lName = snap.child("Last_Name").val();
    contactNum = snap.child("Contact_Number").val();
    email = snap.child("Email").val();
    address = snap.child("Address").val();
    medication = snap.child("Current_Medication").val();
    allergies = snap.child("Allergies").val();


    $("#table_body").append("<tr onClick='openActionForm()'><td>" + id + "</td><td>" + fName + "</td><td>" + lName + "</td><td>" + contactNum + "</td><td>" + email + "</td><td>" + address + "</td><td>" + medication + "</td><td>" + allergies + "</td></tr>");
});

function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
    }
    return(false);
  }
  

function setNav(){
     document.getElementById("home_nav").setAttribute("href", "../http/receptionistHome.html?Staff_ID="+getQueryVariable("Staff_ID"));
     document.getElementById("book_nav").setAttribute("href", "../http/receptionistBookAppointment.html?Staff_ID="+getQueryVariable("Staff_ID"));
     document.getElementById("view_nav").setAttribute("href", "../http/receptionistBooking.html?Staff_ID="+getQueryVariable("Staff_ID"));
     document.getElementById("patient_nav").setAttribute("href", "../http/receptionistManagePatients.html?Staff_ID="+getQueryVariable("Staff_ID"));
}

function openActionForm() {
    document.getElementById("action_grp").style.display = "block";
    $('#patient_tb').find('tr').click( function(){
        var row = $(this).find('td:first').text();
        current_patient=row;
        console.log(current_patient);
      });
  
      userRef.orderByChild('UTS_ID').equalTo(current_patient)
            .once('value').then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {   
                    key = childSnapshot.key;   
            });
        });
  }

  function closeActionForm() {
    document.getElementById("action_grp").style.display = "none";
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?Staff_ID=' +getQueryVariable("Staff_ID");
        window.history.pushState({path:newurl},'',newurl);
    }
    
  }



  function openEditForm() {
    document.getElementById("edit_form").style.display = "block";

    userRef.orderByChild('UTS_ID').equalTo(current_patient)
          .once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                  document.getElementById("fName").value =childSnapshot.child("First_Name").val();
                  document.getElementById("lName").value =childSnapshot.child("Last_Name").val();
                  document.getElementById("utsId").value =childSnapshot.child("UTS_ID").val();
                  document.getElementById("cNumber").value =childSnapshot.child("Contact_Number").val();
                  document.getElementById("email").value =childSnapshot.child("Email").val();
                  document.getElementById("address").value =childSnapshot.child("Address").val();
                  document.getElementById("medication").value =childSnapshot.child("Current_Medication").val();
                  document.querySelector('input[name="allergiesRadios"]:checked').value=childSnapshot.child("Allergies").val();
                  document.getElementById("history").value =childSnapshot.child("Familiy_History").val();    
                  key = childSnapshot.key;   
          });
      });
  }
    
  function closeEditForm() {
    document.getElementById("edit_form").style.display = "none";
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?Staff_ID=' +current_user;
        window.history.pushState({path:newurl},'',newurl);
    }
    
  }

  /** Delete an patient*/
function remove(){
    userRef.child(key).remove();
    window.location.reload();
}

  /**Save data on patient edit form */
function onSaveClicked(){
    fName=document.getElementById("fName").value; 
    lName=document.getElementById("lName").value;  
    id=document.getElementById("utsId").value; 
    contactNum=document.getElementById("cNumber").value;
    email=document.getElementById("email").value;
    address=document.getElementById("address").value; 
    medication=document.getElementById("medication").value; 
    allergies=document.querySelector('input[name="allergiesRadios"]:checked').value
    history=document.getElementById("history").value;
  
  
    var edited_patient = userRef.child(key)
    edited_patient.child("First_Name").set(fName);
    edited_patient.child("Last_Name").set(lName);
    edited_patient.child("UTS_ID").set(id);
    edited_patient.child("Contact_Number").set(contactNum);
    edited_patient.child("Email").set(email);
    edited_patient.child("Address").set(address);
    edited_patient.child("Medication").set(medication);
    edited_patient.child("Allergies").set(allergies);
    edited_patient.child("Familiy_History").set(history);
    
  
  
    closeEditForm();
    window.alert("Saved!");
    window.location.reload();
}
