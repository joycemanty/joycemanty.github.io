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

var f_name,l_name,Id,date,time,a_type,doctor;
setNav();

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
}


function onBookClicked(){
    console.log(getValue);
    getValue();
    saveValue();
    window.alert("Booking success! Please wait for approval.");
    window.location.herf= "../http/patientAppointments.html";
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