var current_user = getQueryVariable("Staff_ID");
var current_doctor;
var current_patient;
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
var pRef = database.ref('Users');
getCurrentDoctor();

//set up table content
ref.orderByChild('Doctor').equalTo(current_doctor).on("child_added", snap => {
        id = snap.child("UTS_ID").val();
        fName = snap.child("First_Name").val();
        lName = snap.child("Last_Name").val();
        date = snap.child("Date").val();;
        time = snap.child("Time").val();;
        aType = snap.child("Appointment_Type").val();
        var aStatus = snap.child("Appointment_Status").val();

    $("#table_body").append("<tr onClick='openActionForm()' class='trSelected'><td>" + id + "</td><td>" + fName + "</td><td>" + lName + "</td><td>" + date + "</td><td>" + time + "</td><td>" + aType + "</td><td>" + aStatus + "</td></tr>");
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
    document.getElementById("home_nav").setAttribute("href", "../http/doctorHome.html?iStaff_ID="+getQueryVariable("Staff_ID"));
    document.getElementById("view_nav").setAttribute("href", "../http/doctorAppointment.html?Staff_ID="+getQueryVariable("Staff_ID"));
}

function getCurrentDoctor(){
    switch(current_user) {
        case "00000001":
            current_doctor = "Dr Beena Chaugule";
            break;
        case "00000002":
            current_doctor =  "Dr Albert Ling";
            break;
        case "00000003":
            current_doctor =  "Dr Leonie Matthews";
            break;
        case "00000004":
            current_doctor =  "Dr Keping Xu";
            break;
        default:
            current_doctor = "Any";
    }
    console.log(current_doctor);
}

function openActionForm() {
    document.getElementById("action_grp").style.display = "block";
    $('#appointment_tb').find('tr').click( function(){
        var row = $(this).find('td:first').text();
        current_patient=row;
      });
    console.log(current_patient);
    
}
  
function closeActionForm() {
    document.getElementById("action_grp").style.display = "none";
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?Staff_ID=' +current_user;
        window.history.pushState({path:newurl},'',newurl);
    }

}

function openProfile() {
    document.getElementById("profile").style.display = "block";
    pRef.orderByChild('UTS_ID').equalTo(current_patient)
            .once('value').then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    document.getElementById("fName").innerHTML = childSnapshot.child("First_Name").val();  
                    document.getElementById("lName").innerHTML= childSnapshot.child("Last_Name").val();   
                    document.getElementById("id").innerHTML= childSnapshot.child("UTS_ID").val();   
                    document.getElementById("medication").innerHTML= childSnapshot.child("Current_Medication").val();   
                    document.getElementById("history").innerHTML= childSnapshot.child("Familiy_History").val();   
                    key = childSnapshot.key;   
            });
        });
}
    
function closeProfile() {
    document.getElementById("profile").style.display = "none";
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?Staff_ID=' +current_user;
        window.history.pushState({path:newurl},'',newurl);
    }
    
}