var myToggler = false;
document.getElementById("menuicon").onclick = function() {myFunction()};
document.getElementById("night-day").onclick = function() {togglerFunction()};
var nightDayToggler = true;
function togglerFunction(){
    nightDayToggler = !nightDayToggler;
    var link = document.createElement('link');
    link.rel = "stylesheet";
    if(nightDayToggler){
        link.href="./styles_dark/styleLogin.css";
    }
    else{
        link.href="./styles/styleLogin.css";
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
  
var x = window.matchMedia("(max-width: 890px)");
myFunc(x);
x.addListener(myFunc);


  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  if(window.localStorage.getItem("x-auth-token")) {
      window.localStorage.removeItem("x-auth-token");
  }
  if(window.localStorage.getItem("user-id")) {
        window.localStorage.removeItem("user-id");
    }

const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');

// form.style["margin-bottom"] = "20vh";

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

let success = true;
function checkInputs() {
    success = true;
	const emailValue = email.value.trim();
	const passwordValue = password.value;
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
	}

    if(success){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "email": emailValue,
            "password": passwordValue
        });

        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        let userID = "";

        fetch("https://my-brand-pacome.herokuapp.com/api/users/signin", requestOptions)
        .then((response) => {
            userID = (response.headers.get('user-id'));
            return response.json();
        })
        .then( async (result) => {
            if(result["x-auth-token"]) {
                window.localStorage.setItem("x-auth-token", result["x-auth-token"]);
                let requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                const userDetailsObj = await fetch("https://my-brand-pacome.herokuapp.com/api/users/" + userID, requestOptions)
                .then(response => response.json())
                .then(result => result)
                .catch(error => console.log('error', error));
                window.localStorage.setItem("user-id", JSON.stringify(userDetailsObj));
                window.location.replace("/home.html");
            }
            else{
                throw result;
            }
        })
        .catch((error) => {
            console.log('error', error);
            document.getElementById("uparrow").innerHTML =`
            <div style=" 
            text-align: left;
            background-color: black; 
            opacity:0.8;
            padding: 0px 1ex 1ex 1ex;
            display: inline-block; 
            color:gray;
            border: solid 2px gray;
            border-radius:5px; 
            font-size:0.9ex;
            font-weight: 50;"><span style="font-size:4.5ex;color: #e74c3c;">&#9888;</span> <br> Can't Sign in. <br>${(error.error ? error.error : error)}</div> ${document.getElementById("uparrow").innerHTML}
            `
            const myTimeout = setTimeout(notificationRemover, 5000);
            function notificationRemover() {
                document.getElementById("uparrow").innerHTML =`<i class="fa-solid fa-circle-arrow-up"  style="opacity:0;"></i>`;
            }
        });
    }
	
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
    const label = formControl.querySelector('.label-raw');
    label.style.color = "#e74c3c";
    success = false;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
    const label = formControl.querySelector('.label-raw');
    label.style.color = "#2ecc71";
    if(nightDayToggler){
        label.style.color = "rgba(46,204,113,0.5)";
    }
    success = success && true;
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

