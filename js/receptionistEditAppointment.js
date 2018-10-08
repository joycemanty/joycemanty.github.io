
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


var rootRef = firebase.database().ref().child('Appointments');
var userRef = firebase.database().ref().child('Users');

var id;
var fName;
var lName;
var date;
var time;
var type;
var doctor;
var status;
var key;
var dateCheck;
var timeCheck;
var doctorCheck;

var email
var userFName;


function readDetails() {

    dateCheck = document.getElementById("dateCheck").value;
    timeCheck = document.getElementById("timeCheck").value;
    doctorCheck = document.getElementById("doctorCheck").value;
    

    rootRef.on("child_added", snap => {      
        if(dateCheck === snap.child("Date").val() && timeCheck === snap.child("Time").val() && doctorCheck === snap.child("Doctor").val()) {
                id = snap.child("UTS_ID").val();
                type = snap.child("Appointment_Type").val();
                fName = snap.child("First_Name").val();
                lName = snap.child("Last_Name").val();
                date = snap.child("Date").val();
                time = snap.child("Time").val();
                doctor = snap.child("Doctor").val();
                status = snap.child("Appointment_Status").val();

                // identifies which form to use
                
                document.getElementById('appointmentCheck').style.display = 'none';
                document.getElementById('form').style.display = 'block';

                // records the staff's key in firebase
                key = snap.key;

        }

        document.getElementById('f_name').value = fName;
        document.getElementById('l_name').value = lName;
        document.getElementById('Id').value = id;
        document.getElementById("datepicker").value = date;
        document.getElementById('timepicker').value = time;
        document.getElementById('a_type').value = type;
        document.getElementById('doctor').value = doctor;

    
    });
}


function submitClicked(){
    if(formValidation()){
      saveData();
      getUser();
      
      document.getElementById('form').style.display = 'none';
      document.getElementById('contactMessage').style.display = 'block';
    }
    else{
      window.alert("Form's not completed!");
    }
  }
  
  function formValidation(){
    return true;
  }


  function saveData(){
    // Appointment Values
    fName = document.getElementById('f_name').value;
    lName = document.getElementById('l_name').value;
    id = document.getElementById('Id').value;
    date = document.getElementById("datepicker").value;
    time = document.getElementById('timepicker').value;
    type = document.getElementById('a_type').value;
    doctor = document.getElementById('doctor').value;
  //start Saving
  
  var data;
  var appointment = rootRef.child(key)

      appointment.child("UTS_ID").set(id);
      appointment.child("Appointment_Type").set(type);
      appointment.child("First_Name").set(fName);
      appointment.child("Last_Name").set(lName);
      appointment.child("Date").set(date);
      appointment.child("Time").set(time);
      appointment.child("Doctor").set(doctor);

}

function getUser() {
  userRef.on("child_added", snap => {               
      if(id == snap.child("UTS_ID").val()) {
              email = snap.child("Email").val();
              userFName = snap.child("First_Name").val();
              // records the staff's key in firebase
              key = snap.key;
      }
  });
}

function sendEmail() {
  var subject ='Appointment Detials Changed';
  var emailBody = 'Hi ' + userFName + ",\n\n" + ' your ' + dateCheck + ' ' + timeCheck + ' appointment has been changed. Please check the new details in your account on the UTS Medical Facility website.';
  document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody;
  alert("Please wait for email client to load");

}