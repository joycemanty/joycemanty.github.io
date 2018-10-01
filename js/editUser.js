
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


var rootRef = firebase.database().ref().child('Staffs');


var id;
var key;
var type;
var fName;
var lName;
var pass;
var email;
var contact;
var address;

// reads the inputted ID and inserts staff infomation into input fields
function readID(){
    var staff_ID = document.getElementById("staff_ID").value;


    
    // loops through each staff in firebase
    // when correct ID is found, the information is recorded
    rootRef.on("child_added", snap => {               
        if(staff_ID == snap.child("Staff_ID").val()) {
                id = snap.child("Staff_ID").val();
                type = snap.child("Staff_Type").val();
                fName = snap.child("First_Name").val();
                lName = snap.child("Last_Name").val();
                pass = snap.child("Password").val();
                email = snap.child("Email").val();
                contact = snap.child("Contact_Number").val();
                address = snap.child("Address").val();
                doctorType = snap.child("Doctor_Type").val();

                // identifies which form to use
                if (type === "Receptionist") {
                    document.getElementById('userType').value = 1; 
                }

                if (type === "Doctor") {
                    document.getElementById('userType').value = 2; 

                }

                if (type === "Sysadmin") {
                    document.getElementById('userType').value = 3; 

                }
                document.getElementById('staffID').style.display = 'none';
                document.getElementById('form').style.display = 'block';

                // records the staff's key in firebase
                key = snap.key;

        }

        // displays the correct form and information
        if(document.getElementById('userType').value == 1) {
            document.getElementById('receptionist').style.display = 'block';
                document.getElementById('s_FName').value = fName;
                document.getElementById('s_LName').value = lName;
                document.getElementById('s_ID').value = id;
                document.getElementById("s_Password").value = pass;
                document.getElementById('s_Email').value = email;
                document.getElementById('s_Phone').value = contact;
                document.getElementById('s_Address').value = address;
            

        } else {
            document.getElementById('receptionist').style.display = 'none';
            
        }

        if(document.getElementById('userType').value == 2) {
            document.getElementById('doctor').style.display = 'block';

                document.getElementById('d_FName').value = fName;
                document.getElementById('d_LName').value = lName;
                document.getElementById('d_ID').value = id;
                document.getElementById("d_Password").value = pass;
                document.getElementById('d_Email').value = email;
                document.getElementById('d_Phone').value = contact;
                document.getElementById('d_Type').value = doctorType;
           
        } else {
            document.getElementById('doctor').style.display = 'none';
        }

        if(document.getElementById('userType').value == 3) {
            document.getElementById('sysadmin').style.display = 'block';

                document.getElementById('a_FName').value = fName;
                document.getElementById('a_LName').value = lName;
                document.getElementById('a_ID').value = id;
                document.getElementById("a_Password").value = pass;
          
        } else {
            document.getElementById('sysadmin').style.display = 'none';
        }

    });
}

function getSelectValue() {
    var x = document.getElementById("userType").value;
    console.log(x);
    checkClicked = 0;
    return x;
}


function changeDiv() {

    if(document.getElementById("userType").value == 1) {
        document.getElementById('receptionist').style.display = 'block';
 
        document.getElementById('s_FName').value = fName;
        document.getElementById('s_LName').value = lName;
        document.getElementById('s_ID').value = id;
        document.getElementById('s_Password').value = pass;
        document.getElementById('s_Email').value = email;
        document.getElementById('s_Phone').value = contact;
        document.getElementById('s_Address').value = address;
     

    } else {
        document.getElementById('receptionist').style.display = 'none';
    }


    if(document.getElementById("userType").value == 2) {
        document.getElementById('doctor').style.display = 'block';

        document.getElementById('d_FName').value = fName;
        document.getElementById('d_LName').value = lName;
        document.getElementById('d_ID').value = id;
        document.getElementById('d_Password').value = pass;
        document.getElementById('d_Email').value = email;
        document.getElementById('d_Phone').value = contact;
        document.getElementById('d_Type').value = doctorType;
      
    } else {
        document.getElementById('doctor').style.display = 'none';
    }

    if(document.getElementById("userType").value == 3) {
        document.getElementById('sysadmin').style.display = 'block';

        document.getElementById('a_FName').value = fName;
        document.getElementById('a_LName').value = lName;
        document.getElementById('a_ID').value = id;
        document.getElementById('a_Password').value = pass;
  
    } else {
        document.getElementById('sysadmin').style.display = 'none';
    }
}





function submitClicked(){
    if(formValidation()){
      saveData();
      window.location.href = "../http/sysadminManage.html";

    }
    else{
      window.alert("Form's not completed!");
    }
  }
  
  function formValidation(){
    return true;
  }

  function saveData(){
      // Receptionist Values
var s_FName = document.getElementById("s_FName");
var s_LName = document.getElementById("s_LName");
var s_ID = document.getElementById("s_ID");
var s_Password = document.getElementById("s_Password");
var s_Email = document.getElementById("s_Email");
var s_Phone = document.getElementById("s_Phone");
var s_Address = document.getElementById("s_Address");

// Doctor Values
var d_FName = document.getElementById("d_FName");
var d_LName = document.getElementById("d_LName");
var d_ID = document.getElementById("d_ID");
var d_Password = document.getElementById("d_Password");
var d_Email = document.getElementById("d_Email");
var d_Phone = document.getElementById("d_Phone");
var d_Type = document.getElementById("d_Type");

// System Admin Values
var a_FName = document.getElementById("a_FName");
var a_LName = document.getElementById("a_LName");
var a_ID = document.getElementById("a_ID");
var a_Password = document.getElementById("a_Password");
    //start Saving
    
    var data;
    var staff = rootRef.child(key)
    if(getSelectValue() == 1) {
        staff.child("Staff_Type").set("Receptionist");
        staff.child("Staff_ID").set(s_ID.value);
        staff.child("First_Name").set(s_FName.value);
        staff.child("Last_Name").set(s_LName.value);
        staff.child("Password").set(s_Password.value);
        staff.child("Email").set(s_Email.value);
        staff.child("Contact_Number").set(s_Phone.value);
        staff.child("Address").set(s_Address.value);
        staff.child("Doctor_Type").set(null);


    }

    if(getSelectValue() == 2) {
        staff.child("Staff_Type").set("Doctor");
        staff.child("Staff_ID").set(d_ID.value);
        staff.child("First_Name").set(d_FName.value);
        staff.child("Last_Name").set(d_LName.value);
        staff.child("Password").set(d_Password.value);
        staff.child("Email").set(d_Email.value);
        staff.child("Contact_Number").set(d_Phone.value);
        staff.child("Address").set(null);

        staff.child("Doctor_Type").set(d_Type.value);
    }

    if(getSelectValue() == 3) {
        staff.child("Staff_Type").set("Sysadmin");
        staff.child("Staff_ID").set(a_ID.value);
        staff.child("First_Name").set(a_FName.value);
        staff.child("Last_Name").set(a_LName.value);
        staff.child("Password").set(a_Password.value);
        staff.child("Email").set(null);
        staff.child("Contact_Number").set(null);
        staff.child("Address").set(null);
        staff.child("Doctor_Type").set(null);
    }
  
  }






    