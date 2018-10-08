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


    rootRef.on("child_added", snap => {
        var id = snap.child("UTS_ID").val();
        var fName = snap.child("First_Name").val();
        var lName = snap.child("Last_Name").val();
        var date = snap.child("Date").val();
        var time = snap.child("Time").val();
        var type = snap.child("Appointment_Type").val();
        var status = snap.child("Appointment_Status").val();
        var doctor = snap.child("Doctor").val();


        $("#table_body").append("<tr><td>" + id + "</td><td>" + fName + "</td><td>" + lName + "</td><td>" + date + "</td><td>" + time + "</td><td>" + type + "</td><td>" + doctor + "</td><td>" + status + "</td></tr>");
    });



      
      function sendEmail() {
        userRef.on("child_added", snap => {               
            if(document.getElementById('id').value == snap.child("UTS_ID").val()) {
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
    
