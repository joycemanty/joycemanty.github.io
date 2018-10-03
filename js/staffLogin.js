/*Local variables*/ 
var staffsDict = new Map();
var staffsTypes = new Map();
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
        window.location.href = matchStaffType(utsId);
        console.log(matchStaffType(utsId));
    }
    else{
        window.alert("Wrong ID or password!");
    }
   return false;
}
button.addEventListener("click",onLoginClicked);

function loginValidation(id,pw){

    if(staffsDict.has(id)){
        if(staffsDict.get(id) == pw){
            return true;
        }
    }  
    return false; 

}

function matchStaffType(Id){
    var type = staffsTypes.get(Id);
    console.log(type);
    var href;
    switch(type) {
        case "Receptionist":
            href = "../http/receptionistHome.html?"+"Staff_ID="+Id;
            break;
        case "Doctor":
            href = "#";
            break;
        case "Sysadmin":
            href = "../http/sysadminHome.html?"+"Staff_ID="+Id;
            break;
        default:
            href = "#";
    }
    return href;
}

function snapshotToDict(snapshot) {
    var staffs = snapshot.val();
    var keys = Object.keys(staffs);
    console.log(keys);

    for(var i = 0; i< keys.length; i++){
        var k = keys[i];
        var ID = staffs[k].Staff_ID;
        var PW = staffs[k].Password;
        var Type = staffs[k].Staff_Type;
        staffsDict.set(ID,PW);
        staffsTypes.set(ID,Type);
    }
    console.log(staffsDict);
    console.log(staffsTypes);


};