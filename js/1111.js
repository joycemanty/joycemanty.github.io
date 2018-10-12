
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



function contrastTime(start) 
{
    var evalue = document.getElementById(start).value;
    var dB = new Date(evalue.replace(/-/g, "/"));
    var d = new Date();
    var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    if (Date.parse(str) > Date.parse(dB)) 
    {
        return 1;
    }
    return 0;
}

$('#startTime').blur(function () {
    var ret = contrastTime("startTime");
    if (ret == 1) {
        alert("The booking time cannot be the day before today!");
        $(this).val('').focus();
        return;
    }
});
