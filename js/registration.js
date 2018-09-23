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
console.log(firebase);
var database = firebase.database();
var ref = database.ref('Users');
//End of setup

//Initailise Fields
var fName;
var lName;
var utsId;
var password;
var email;
var contact_num;



function submitClicked(){
  var data = {
    UTS_ID: "12345678",
    First_Name: "Joyce"
  }
ref.push(data);
}

