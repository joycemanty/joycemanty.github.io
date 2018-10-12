var currentUser = getQueryVariable("Staff_ID");
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
    document.getElementById("home_nav").setAttribute("href", "../http/doctorHome.html?iStaff_ID="+currentUser);
    document.getElementById("view_nav").setAttribute("href", "../http/doctorAppointment.html?Staff_ID="+currentUser );
}