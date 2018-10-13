setNav();

document.getElementById('idReceived').innerHTML="Welcome back,"+getQueryVariable("Staff_ID")+" !";
function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
    }
    return(false);
  }
  
  
function setNav(){
     document.getElementById("home_nav").setAttribute("href", "../http/receptionistHome.html?Staff_ID="+getQueryVariable("Staff_ID"));
     document.getElementById("book_nav").setAttribute("href", "../http/receptionistBookAppointment.html?Staff_ID="+getQueryVariable("Staff_ID"));
     document.getElementById("view_nav").setAttribute("href", "../http/receptionistBooking.html?Staff_ID="+getQueryVariable("Staff_ID"));
     document.getElementById("patient_nav").setAttribute("href", "../http/receptionistManagePatients.html?Staff_ID="+getQueryVariable("Staff_ID"));
}