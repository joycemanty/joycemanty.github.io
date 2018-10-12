setNav();
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
var rootRef = firebase.database().ref().child('Users');

var f_name,l_name,Id,date,time,a_type,doctor;

var email
var userFName;

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
     document.getElementById('datepicker').value = new Date();
     document.getElementById('datepicker').min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
}




function onBookClicked(){
    console.log(getValue);
    getValue();
    getUser();
    saveValue();
    window.alert("Booking success!");

    document.getElementById('form').style.display = 'none';
    document.getElementById('contactMessage').style.display = 'block';
}

function getUser() {
    rootRef.on("child_added", snap => {               
        if(document.getElementById("Id").value == snap.child("UTS_ID").val()) {
                email = snap.child("Email").val();
                userFName = snap.child("First_Name").val();
                // records the staff's key in firebase
                key = snap.key;
        }
    });
}

function getValue(){
    f_name = document.getElementById("f_name").value;
    l_name = document.getElementById("l_name").value;
    Id = document.getElementById("Id").value;
    date = document.getElementById("datepicker").value;
    time = document.getElementById("timepicker").value;
    a_type = document.getElementById("a_type").value;
    doctor = document.getElementById("doctor").value;
}

function saveValue(){
    var data;
    data = {
        UTS_ID: Id,
        First_Name: f_name,
        Last_Name: l_name,
        Date: date,
        Time: time,
        Appointment_Type: a_type,
        Doctor: doctor,
        Appointment_Status: "Not Approved"
    }
    ref.push(data);
    console.log(data);

}

function sendEmail() {
    var subject ='New Appointment Booked';
    var emailBody = 'Hi ' + userFName + ",\n\n" + 'A new appointment has been booked for you, please check the date and time in your account on the UTS Medical Facility website.';
    document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody;

    alert("Please wait for email client to load");
}