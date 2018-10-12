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


var rootRef = firebase.database().ref().child('Staffs');

function deleteStaff(){
    var staff_ID = document.getElementById("staff_ID").value;
    var id;
    var key;

    rootRef.on("child_added", snap => {
        if(staff_ID == snap.child("Staff_ID").val()) {
            id = snap.child("Staff_ID").val();
            var type = snap.child("Staff_Type").val();
            var fName = snap.child("First_Name").val();
            var lName = snap.child("Last_Name").val();
            var email = snap.child("Email").val();
            var contact = snap.child("Contact_Number").val();
            var address = snap.child("Address").val();
            var doctorType = snap.child("Doctor_Type").val();
            
            key = snap.key;
                
            console.log(key);
        }

        rootRef.orderByChild('Staff_ID').equalTo(staff_ID)
            .once('value').then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                //remove each child
                rootRef.child(childSnapshot.key).remove();
                window.location.href = "../http/sysadminManage.html";
            });
        });
    });
}