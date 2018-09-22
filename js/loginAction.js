var id = document.getElementById("id_tf");
var password = document.getElementById("password_tf");
var login_btn = document.getElementById("pLogin_btn");

function loginClicked(){
    if(loginValidation()){
        window.alert(id.value+" clicked the button\n"+"password is "+password.value);
    }
    else{
        window.alert("wrong input");
    }
}

function loginValidation(){
    if(id.value.length!=8){
        return false;
    }
    else if(password.value ==""){
        return false;
    }
    else{
        return true;
    }
}