setNav();
window.alert("connected");

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
var ref = database.ref('Appointments');

//set up table content
ref.on("child_added", snap => {
    var id = snap.child("UTS_ID").val();
    var fName = snap.child("First_Name").val();
    var lName = snap.child("Last_Name").val();
    var date = snap.child("Date").val();;
    var time = snap.child("Time").val();;
    var aType = snap.child("Appointment_Type").val();
    var doctor = snap.child("Doctor").val();
    var aStatus = snap.child("Appointment_Status").val();


    $("#table_body").append("<tr><td>" + id + "</td><td>" + fName + "</td><td>" + lName + "</td><td>" + date + "</td><td>" + time + "</td><td>" + aType + "</td><td>" + doctor + "</td><td>" + aStatus + "</td></tr>");
});


function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function setNav(){
    document.getElementById("home_nav").setAttribute("href", "../http/patientHome.html?id="+getQueryVariable("id"));
    document.getElementById("book_nav").setAttribute("href", "../http/bookAppointment.html?id="+getQueryVariable("id"));
    document.getElementById("view_nav").setAttribute("href", "../http/patientAppointments.html?id="+getQueryVariable("id"));
    document.getElementById("book_btn").setAttribute("href", "../http/bookAppointment.html?id="+getQueryVariable("id"));
}


