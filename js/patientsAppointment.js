setNav();
var current_user = getQueryVariable("id");
var current_appointment = getQueryVariable("id");
var current_details;
var id;
var fName ;
var lName ;
var date;
var time;
var aType;
var doctor;
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
var database = firebase.database();
var ref = database.ref('Appointments');


//set up table content
ref.orderByChild('UTS_ID').equalTo(getQueryVariable("id")).on("child_added", snap => {
    id = snap.child("UTS_ID").val();
    fName = snap.child("First_Name").val();
    lName = snap.child("Last_Name").val();
    date = snap.child("Date").val();;
    time = snap.child("Time").val();;
    aType = snap.child("Appointment_Type").val();
    doctor = snap.child("Doctor").val();
    var aStatus = snap.child("Appointment_Status").val();


    $("#table_body").append("<tr onClick='openActionForm()' class='trSelected'><td>" + id + "</td><td>" + fName + "</td><td>" + lName + "</td><td>" + date + "</td><td>" + time + "</td><td>" + aType + "</td><td>" + doctor + "</td><td>" + aStatus + "</td></tr>");
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


function openEditForm() {
    document.getElementById("edit_form").style.display = "block";
    ref.orderByChild('Time').equalTo(current_details)
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
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?id=' +current_user;
        window.history.pushState({path:newurl},'',newurl);
    }
    
}

function openActionForm() {
    document.getElementById("action_grp").style.display = "block";
    $('#appointment_tb').find('tr').click( function(){
        var row = $(this).find('td:first').text();
        current_appointment=row;
        current_details =$(this).find('td').eq(4).text();
        console.log(current_appointment+", "+current_details);
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
    ref.orderByChild('Time').equalTo(current_details)
            .once('value').then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                //remove each child
                ref.child(childSnapshot.key).remove();
            });
        });
    window.location.reload();
}

function onSaveClicked(){
    fName=document.getElementById("f_name").value; 
    lName=document.getElementById("l_name").value;  
    id=document.getElementById("Id").value; 
    date=document.getElementById("datepicker").value;
    time=document.getElementById("timepicker").value;
    aType=document.getElementById("a_type").value; 
    doctor=document.getElementById("doctor").value;

    var edited_appointment = ref.child(key)
    edited_appointment.child("First_Name").set(fName);
    edited_appointment.child("Last_Name").set(lName);
    edited_appointment.child("UTS_ID").set(id);
    edited_appointment.child("Date").set(date);
    edited_appointment.child("Time").set(time);
    edited_appointment.child("Appointment_Type").set(aType);
    edited_appointment.child("Doctor").set(doctor);
    edited_appointment.child("Appointment_Status").set("Not Approved");

    closeEditForm();
    window.alert("Saved! Please wait for approval.");
    window.location.reload();
}



