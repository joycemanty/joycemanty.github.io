
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




function deleteAppointment() {

    var dateCheck = document.getElementById("dateCheck").value;
    var timeCheck = document.getElementById("timeCheck").value;
    var doctorCheck = document.getElementById("doctorCheck").value;
    

    rootRef.on("child_added", snap => {      
        console.log(snap.child("Time").val());
    console.log(timeCheck);
        if(dateCheck === snap.child("Date").val() && timeCheck === snap.child("Time").val() && doctorCheck === snap.child("Doctor").val()) {
                var id = snap.child("UTS_ID").val();
                var type = snap.child("Appointment_Type").val();
                var fName = snap.child("First_Name").val();
                var lName = snap.child("Last_Name").val();
                var date = snap.child("Date").val();
                var time = snap.child("Time").val();
                var doctor = snap.child("Doctor").val();
                var status = snap.child("Appointment_Status").val();


                // records the staff's key in firebase
                var key = snap.key;

                rootRef.orderByChild('Time').equalTo(time)
            .once('value').then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                //remove each child
                rootRef.child(childSnapshot.key).remove();
                window.location.href = "../http/receptionistBooking.html";
                });
            });
        }
    });
}
