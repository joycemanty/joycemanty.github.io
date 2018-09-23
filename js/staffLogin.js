/*Local variables*/ 
var staffsDict = [];
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

/* Default Staff Account
var data = {
    UTS_ID: "99999999",
    Password: "99999999",
  }
ref.push(data);
*/

function onLoginClicked(){
    var utsId =document.getElementById("utsId").value;
    var password = document.getElementById("password").value;
    button.value=utsId;
    if(loginValidation(utsId,password)){
        window.location("../http/staffHome.html");
    }
    else{
        window.alert("Wrong ID or password!");
    }
}

function loginValidation(id,pw){
/*
    for(var key in staffsDict){
        if(id==key){
            if(staffsDict.key == pw){
                return true;
            }
        }
    }
    return false;
*/
if(id=="99999999"){
    if(pw="99999999"){
    return true;
    }
}
else{
    return false;
}

}

function snapshotToDict(snapshot) {
    var staffs = snapshot.val();
    var keys = Object.keys(staffs);
    console.log(keys);

    for(var i = 0; i< keys.length; i++){
        var k = keys[i];
        var ID = staffs[k].UTS_ID;
        var PW = staffs[k].Password;

        staffsDict.push({
            key:   ID,
            value: PW
        });
    }
};