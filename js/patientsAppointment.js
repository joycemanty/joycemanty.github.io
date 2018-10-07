setNav();
var current_user = getQueryVariable("id");
var current_appointment = getQueryVariable("id");

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
ref.orderByChild('UTS_ID').equalTo(getQueryVariable("id")).on("child_added", snap => {
    var id = snap.child("UTS_ID").val();
    var fName = snap.child("First_Name").val();
    var lName = snap.child("Last_Name").val();
    var date = snap.child("Date").val();;
    var time = snap.child("Time").val();;
    var aType = snap.child("Appointment_Type").val();
    var doctor = snap.child("Doctor").val();
    var aStatus = snap.child("Appointment_Status").val();


    $("#table_body").append("<tr onClick='openActionForm()'><td>" + id + "</td><td>" + fName + "</td><td>" + lName + "</td><td>" + date + "</td><td>" + time + "</td><td>" + aType + "</td><td>" + doctor + "</td><td>" + aStatus + "</td></tr>");
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
    document.getElementById("home_nav").setAttribute("href", "../http/patientHome.html?id="+getQueryVariable("id"));
    document.getElementById("book_nav").setAttribute("href", "../http/bookAppointment.html?id="+getQueryVariable("id"));
    document.getElementById("view_nav").setAttribute("href", "../http/patientAppointments.html?id="+getQueryVariable("id"));
    
}


function openActionForm() {
    document.getElementById("action_grp").style.display = "block";
    $('#appointment_tb').find('tr').click( function(){
        var row = $(this).find('td:first').text();
        current_appointment=row;
        console.log(current_appointment);
      });
    
}
    
  
function closeActionForm() {
    document.getElementById("action_grp").style.display = "none";
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?id=' +current_user;
        window.history.pushState({path:newurl},'',newurl);
    }
    
}

function cancel(){
    deleteItem();
    window.alert("Please Reload the page after 15seconds")
}

function deleteItem(){
    ref.orderByChild('UTS_ID').equalTo(current_appointment)
    .once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        //remove each child
        ref.child(childSnapshot.key).remove();
    });
    window.location.reload();
});
}


