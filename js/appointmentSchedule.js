setNav();
var current_user = getQueryVariable("Staff_ID");
var current_appointment;
var current_details;
var id;
var fName ;
var lName ;
var date;
var time;
var aType;
var aStatus;
var doctor;

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


    var rootRef = firebase.database().ref().child('Appointments');
    var userRef = firebase.database().ref().child('Users');

    var email;
    var userFName;
    var key;

//set up table
    rootRef.on("child_added", snap => {
        var id = snap.child("UTS_ID").val();
        var fName = snap.child("First_Name").val();
        var lName = snap.child("Last_Name").val();
        var date = snap.child("Date").val();
        var time = snap.child("Time").val();
        var type = snap.child("Appointment_Type").val();
        var status = snap.child("Appointment_Status").val();
        var doctor = snap.child("Doctor").val();


        $("#table_body").append("<tr onClick='openActionForm()'><td>" + id + "</td><td>" + fName + "</td><td>" + lName + "</td><td>" + date + "</td><td>" + time + "</td><td>" + type + "</td><td>" + doctor + "</td><td>" + status + "</td></tr>");
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
     document.getElementById('datepicker').value = new Date();
     document.getElementById('datepicker').min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
}
function openEditForm() {
  document.getElementById("edit_form").style.display = "block";
  rootRef.orderByChild('Time').equalTo(current_details)
          .once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                  document.getElementById("f_name").value = childSnapshot.child("First_Name").val();  
                  document.getElementById("l_name").value = childSnapshot.child("Last_Name").val();   
                  document.getElementById("Id").value = childSnapshot.child("UTS_ID").val();   
                  document.getElementById("datepicker").value  = childSnapshot.child("Date").val();   
                  document.getElementById("timepicker").value  = childSnapshot.child("Time").val();   
                  document.getElementById("a_type").value  = childSnapshot.child("Appointment_Type").val();   
                  document.getElementById("doctor").value  = childSnapshot.child("Doctor").val();     
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

function openActionForm() {
  document.getElementById("action_grp").style.display = "block";
  $('#appointment_tb').find('tr').click( function(){
      var row = $(this).find('td:first').text();
      current_appointment=row;
      current_details =$(this).find('td').eq(3).text();
      console.log(current_appointment+", "+current_details);
    });

    rootRef.orderByChild('Date').equalTo(current_details)
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

/** Cancel an appointment */
function cancel(){
  deleteItem();
}

/** Delete an appointment */
function deleteItem(){
  rootRef.child(key).remove();
  window.location.reload();
}

/**Save data on appointment edit form */
function onSaveClicked(){
  fName=document.getElementById("f_name").value; 
  lName=document.getElementById("l_name").value;  
  id=document.getElementById("Id").value; 
  date=document.getElementById("datepicker").value;
  time=document.getElementById("timepicker").value;
  aType=document.getElementById("a_type").value; 
  aStatus=document.getElementById("a_status").value; 
  doctor=document.getElementById("doctor").value;


  var edited_appointment = rootRef.child(key)
  edited_appointment.child("First_Name").set(fName);
  edited_appointment.child("Last_Name").set(lName);
  edited_appointment.child("UTS_ID").set(id);
  edited_appointment.child("Date").set(date);
  edited_appointment.child("Time").set(time);
  edited_appointment.child("Appointment_Type").set(aType);
  edited_appointment.child("Appointment_Status").set(aStatus);
  edited_appointment.child("Doctor").set(doctor);


  closeEditForm();
  window.alert("Saved!");
  window.location.reload();
}

function contact(){
  sendEmail(current_appointment);
}

      function sendEmail(id) {
        userRef.on("child_added", snap => {               
            if(id == snap.child("UTS_ID").val()) {
                    email = snap.child("Email").val();
                    userFName = snap.child("First_Name").val();
                    // records the staff's key in firebase
                    key = snap.key;
                    var subject ='Appointment Reminder';
                    var emailBody = 'Hi ' + userFName + ",\n\n" + ' this is a reminder for your upcomming appointment, to check the appointment details, log in to your account on the UTS Medical Facility website.';
                    document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody;
                    alert("Please wait for email client to load");
            }
        });
    
      }
    
