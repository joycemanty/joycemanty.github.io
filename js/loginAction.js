var id = document.getElementById("id_tf");
var password = document.getElementById("password_tf");
var login_btn = document.getElementById("pLogin_btn");
var usersDict = new Map();

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
var ref = database.ref('Users');
ref.on('value', function(snapshot) {
    console.log(snapshotToDict(snapshot));
    },function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
//End of setup


function loginClicked(){
    console.log(id.value,password.value);
    if(loginValidation(id.value,password.value)){
        login_btn.value=id.value;
        window.location("../http/patientHome.html");

    }
    else{
        window.alert("wrong input");
    }
}

function loginValidation(id,pw){

    if(usersDict.has(id)){
        if(usersDict.get(id) == pw){
            return true;
        }
    }  
    return false; 
}

function snapshotToDict(snapshot) {
    var users = snapshot.val();
    var keys = Object.keys(users);
    console.log(keys);

    for(var i = 0; i< keys.length; i++){
        var k = keys[i];
        var ID = users[k].UTS_ID;
        var PW = users[k].password;

        usersDict.set(ID,PW);
    }
    console.log(usersDict);
};