
function VF_form1() {

    var theform = document.form1;
    var errMsg = "";
    var setfocus = "";


    if (theform['password'].value == "") {
        errMsg = "The password can not be empty!";
        setfocus = "['password']";
    }
    if (theform['id'].value == "") {
        errMsg = "The id can not be empty!";
        setfocus = "['id']";
    }
    if (errMsg != "") {
        alert(errMsg);
        eval_r("theform" + setfocus + ".focus()");
    }
    else {
        theform.submit();
    }
}


   