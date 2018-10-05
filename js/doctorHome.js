var parameters = location.search.substring(1).split("&");
var temp = parameters[0].split("=");
x = unescape(temp[1]);
document.getElementById('idReceived').innerHTML="Welcome back Doctor"+x+"!";
setNav();

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function setNav(){
    document.getElementById("home_nav").setAttribute("href", "../http/patientHome.html?id="+getQueryVariable("id"));
    document.getElementById("book_nav").setAttribute("href", "../http/bookAppointment.html?id="+getQueryVariable("id"));
    document.getElementById("view_nav").setAttribute("href", "../http/patientAppointments.html?id="+getQueryVariable("id"));
    document.getElementById("book_btn").setAttribute("href", "../http/bookAppointment.html?id="+getQueryVariable("id"));
}