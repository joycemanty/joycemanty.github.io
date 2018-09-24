/*Local variables*/ 
var staffsDict = new Map();
var button = document.getElementById("submit");

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
var ref = database.ref('Staffs');
ref.on('value', function(snapshot) {
    console.log(snapshotToDict(snapshot));
    },function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
//End of setup


function onLoginClicked(){
    var utsId =document.getElementById("utsId").value;
    var password = document.getElementById("password").value;
    if(loginValidation(utsId,password)){
        button.value=utsId;
        window.location("../http/staffHome.html");
    }
    else{
        window.alert("Wrong ID or password!");
    }
}

function loginValidation(id,pw){

    if(staffsDict.has(id)){
        if(staffsDict.get(id) == pw){
            return true;
        }
    }  
    return false; 

}

function snapshotToDict(snapshot) {
    var staffs = snapshot.val();
    var keys = Object.keys(staffs);
    console.log(keys);

    for(var i = 0; i< keys.length; i++){
        var k = keys[i];
        var ID = staffs[k].UTS_ID;
        var PW = staffs[k].Password;

        staffsDict.set(ID,PW);
    }
    console.log(staffsDict);
};