var myToggler = false;
document.getElementById("menuicon").onclick = function() {myFunction()};
document.getElementById("night-day").onclick = function() {togglerFunction()};
var nightDayToggler = true;
function togglerFunction(){
    nightDayToggler = !nightDayToggler;
    var link = document.createElement('link');
    link.rel = "stylesheet";
    if(nightDayToggler){
        link.href="./styles_dark/styleQuerries.css";
    }
    else{
        link.href="./styles/styleQuerries.css";
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
        if(nightDayToggler){
            menuiconColor = "rgba(65, 65, 130, 1)";
            brandnameColor = "#818181";
            navbarColor = "rgba(15, 15, 15, 0.975)";
        }
    }
    else{
        myToggler = true;
        menuVisibility = "grid";
        brandnameColor = "white";
        navbarColor = "rgba(128, 128, 255, 0.95)";
        if(nightDayToggler){
            navbarColor = "rgba(35, 35, 65, 0.975)";
        }
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

  /////////////////////////////////////////
  ////////////////////////////////////////
  
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", window.localStorage.getItem("x-auth-token"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://my-brand-pacome.herokuapp.com/api/queries/", requestOptions)
    .then(response => response.json())
    .then(result => parseQueries(result))
    .catch(error => console.log('error', error));

    const parseQueries = (queriesArray)=> {
        const queryCardParser = (arrayElement) =>{
            let elementDateRaw = JSON.parse(arrayElement.date);
            let elementDateObj = new Date(elementDateRaw);
            let dateString = elementDateObj.toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"});
            let timeString = elementDateObj.toLocaleDateString('en-us', {  hour:"numeric", minute:"numeric", second:"numeric"}).split(",")[1]; 
            const queryCard = `
            <div class="contact-form">
                <a>Time:</a>
                <div class="timestamp">${dateString}, ${timeString}</div>
                <a>Name:</a>
                <div class="name">${arrayElement.name}</div>
                <a>Email:</a>
                <div class="email">${arrayElement.email} </div>
                <a>Message:</a>
                <div class="message">${arrayElement.queryBody}</div>
            </div>
            `
            document.getElementById("queries-grid").innerHTML += queryCard;
        }
        document.getElementById("queries-grid").innerHTML = "";
        for(let i=queriesArray.length-1; i>=0 ; i-- ){
            queryCardParser(queriesArray[i]);
        }
    }
