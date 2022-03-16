var myToggler = false;
document.getElementById("menuicon").onclick = function() {myFunction()};

function myFunction() {
    var menuVisibility = ""
    if(myToggler){
        myToggler = false;
        menuVisibility = "none"
    }
    else{
        myToggler = true;
        menuVisibility = "grid";
    }
  document.getElementById("navbar-expanded").style.display = menuVisibility;
}


function myFunc(x) {
    if (!x.matches) {
        document.getElementById("navbar-expanded").style.display = "none";
    }
  }
  
  var x = window.matchMedia("(max-width: 890px)")
  myFunc(x) 
  x.addListener(myFunc)
