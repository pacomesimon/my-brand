var myToggler = false;
document.getElementById("menuicon").onclick = function() {myFunction()};
document.getElementById("night-day").onclick = function() {togglerFunction()};
var nightDayToggler = true;
function togglerFunction(){
    nightDayToggler = !nightDayToggler;
    var link = document.createElement('link');
    link.rel = "stylesheet";
    if(nightDayToggler){
        link.href="./styles_dark/styleArticleEditor.css";
    }
    else{
        link.href="./styles/styleArticleEditor.css";
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

      ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const params = new URLSearchParams(window.location.search);
  const storedArticleID = params.get('id');
const form = document.getElementById('contact-form');
const title = document.getElementById('title');
const previewImageURL = document.getElementById('previewImageURL');
const articleBody = document.getElementById('articleBody');

const discardFunction = ()=>{
    window.location.replace("/articleMenu.html");
}
document.getElementById("delete-button").onclick = discardFunction;

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

let success = true;
function checkInputs() {
	const emailValue = previewImageURL.value.trim();
    const nameValue = title.value.trim();
	const messageValue = articleBody.value.trim();
	
	if(emailValue === '') {
		setErrorFor(previewImageURL, 'Image URL cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(previewImageURL, 'Not a valid Image URL');
	} else {
		setSuccessFor(previewImageURL);
	}
	
	if(messageValue === '') {
		setErrorFor(articleBody, 'article\'s body cannot be blank');
	} else {
		setSuccessFor(articleBody);
	}
    if(nameValue === '') {
		setErrorFor(title, 'title cannot be blank');
	} else {
		setSuccessFor(title);
	}
    if(success){
        var myHeaders = new Headers();
        myHeaders.append("x-auth-token", window.localStorage.getItem("x-auth-token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "title": nameValue,
            "previewImageURL": emailValue,
            "articleBody": messageValue
        });

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://my-brand-pacome.herokuapp.com/api/articles/" + storedArticleID, requestOptions)
        .then(response => response.json())
        .then((result) => {
            discardFunction();
        })
        .catch(error => console.log('error', error));
    }
	
}

function setErrorFor(input, articleBody) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = articleBody;
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
	
function isEmail(previewImageURL) {
	// return /./.test(previewImageURL);
    return true;
}

///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

const fetchArticle = () => {
    let requestOpts = {
        method: 'GET',
        redirect: 'follow'
    };
    
    const articleURL = "https://my-brand-pacome.herokuapp.com/api/articles/" + storedArticleID;
    fetch(articleURL, requestOpts)
    .then(response => response.json())
    .then((result) => {
        parseArticle(result);
    })
    .catch(error => console.log('error', error));
    
    const parseArticle = async (articleDetails) => {
        previewImageURL.value = articleDetails.article.previewImageURL;
        title.value = articleDetails.article.title;
        articleBody.value = articleDetails.article.articleBody;
    }
}
fetchArticle();