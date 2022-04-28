var myToggler = false;
document.getElementById("menuicon").onclick = function() {myFunction()};
document.getElementById("night-day").onclick = function() {togglerFunction()};
var nightDayToggler = true;
function togglerFunction(){
    nightDayToggler = !nightDayToggler;
    var link = document.createElement('link');
    link.rel = "stylesheet";
    if(nightDayToggler){
        link.href="./styleBlog_dark.css";
    }
    else{
        link.href="./styleBlog.css";
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


const form = document.getElementById('contact-form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	const emailValue = email.value.trim();
    const nameValue = name.value.trim();
	const messageValue = message.value.trim();
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(messageValue === '') {
		setErrorFor(message, 'message cannot be blank');
	} else {
		setSuccessFor(message);
	}
    if(nameValue === '') {
		setErrorFor(name, 'name cannot be blank');
	} else {
		setSuccessFor(name);
	}
	
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
    const label = formControl.querySelector('.label-raw');
    label.style.color = "#e74c3c";
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
    const label = formControl.querySelector('.label-raw');
    label.style.color = "#2ecc71";
    if(nightDayToggler){
        label.style.color = "rgba(46,204,113,0.5)";
    }
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const articleURL = "/api/articles/" + window.localStorage.getItem("articleID");
fetch(articleURL, requestOptions)
.then(response => response.json())
.then((result) => {
    // console.log(result);
    parseArticle(result);
})
.catch(error => console.log('error', error));

const parseArticle = async (articleDetails) => {
    document.getElementById("project-img").src = articleDetails.article.previewImageURL;
    document.getElementById("article-title").innerHTML = articleDetails.article.title;
    document.getElementById("author").innerHTML += articleDetails.article.authorID;
    document.getElementById("date").innerHTML += articleDetails.article.date;
    document.getElementById("blog-body").innerHTML = articleDetails.article.articleBody;
    document.getElementById("likes").innerHTML += (articleDetails.likes.length +" liked");
    document.getElementById("comments").innerHTML += (articleDetails.comments.length +" commented");
    renderComments(articleDetails.comments);
}
const renderComments = (commentsArray) =>{
    if(commentsArray.length==0){
        document.getElementById("comments-section").innerHTML = `<span id="comments-title">Comment(s):</span>
        <div class="comment-template">
            <div class="comment-payload" style="text-align: center;padding-left: 0px">
                -- No comments yet ... Be the first! -- 
            </div>
        </div>`;
    }
    else{
        document.getElementById("comments-section").innerHTML = `<span id="comments-title">Comment(s):</span>`;
        const commentsCardParser = (commentItem)=>{
            // console.log(commentItem);
            const commentCard = `
            <div class="comment-template">
                <div class="commenter-name">
                    ${commentItem.name}:
                </div>
                <div class="comment-payload">
                    ${commentItem.commentBody}
                </div>
            </div>
            `
            document.getElementById("comments-section").innerHTML += commentCard;
        }
        commentsArray.forEach(commentsCardParser);
    }
}

