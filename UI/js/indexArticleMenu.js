var myToggler = false;
document.getElementById("menuicon").onclick = function() {myFunction()};
document.getElementById("night-day").onclick = function() {togglerFunction()};
var nightDayToggler = true;
function togglerFunction(){
    nightDayToggler = !nightDayToggler;
    var link = document.createElement('link');
    link.rel = "stylesheet";
    if(nightDayToggler){
        link.href="./styles_dark/styleArticleMenu.css";
    }
    else{
        link.href="./styles/styleArticleMenu.css";
    }
    document.head.appendChild(link);
}

function myFunction() {
    var menuVisibility = "";
    var brandnameColor = "";
    var navbarColor = "";
    var menuiconColor =""
    if(myToggler){
        myToggler = false;
        menuVisibility = "none";
        brandnameColor = "black";
        navbarColor = "white";
        menuiconColor = "rgba(0, 0, 255, 0.49)";
    }
    else{
        myToggler = true;
        menuVisibility = "grid";
        brandnameColor = "white";
        navbarColor = "rgba(128, 128, 255, 0.95)";
        menuiconColor = "white";
    }
  document.getElementById("navbar-expanded").style.display = menuVisibility;
  document.getElementById("brandname").style.color = brandnameColor;
  document.getElementById("navbar2").style["background"] = navbarColor;
  document.getElementById("menuicon").style.color = menuiconColor;
}


function myFunc(x) {
    if (!x.matches) {
        document.getElementById("navbar-expanded").style.display = "none";
    }
  }
  
  var x = window.matchMedia("(max-width: 890px)")
  myFunc(x) 
  x.addListener(myFunc)
