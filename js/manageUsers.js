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

    rootRef.on("child_added", snap => {
        var id = snap.child("Staff_ID").val();
        var type = snap.child("Staff_Type").val();
        var fName = snap.child("First_Name").val();
        var lName = snap.child("Last_Name").val();
        var email = snap.child("Email").val();
        var contact = snap.child("Contact_Number").val();
        var address = snap.child("Address").val();
        var doctorType = snap.child("Doctor_Type").val();


        $("#table_body").append("<tr><td>" + id + "</td><td>" + type + "</td><td>" + fName + "</td><td>" + lName + "</td><td>" + email + "</td><td>" + contact + "</td><td>" + address + "</td><td>" + doctorType + "</td></tr>");
    });