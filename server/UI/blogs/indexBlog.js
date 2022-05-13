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

  const params = new URLSearchParams(window.location.search);
  const storedArticleID = params.get('id');
  document.getElementById('message').value = " ";
const form = document.getElementById('contact-form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

if(window.localStorage.getItem("user-id")) {
    const userDetails = window.localStorage.getItem("user-id");
    const userDetailsObj = JSON.parse(userDetails);
    name.value = userDetailsObj.name;
    email.value = userDetailsObj.email;
}
if(!(window.localStorage.getItem("x-auth-token"))){
    name.disabled = true;
    email.disabled = true;
    message.disabled = true;
    name.onclick = function(){unauthErrorNotify();};
    email.onclick = function(){unauthErrorNotify();};
    message.onclick = function(){unauthErrorNotify();};
    document.getElementById("contact-form").onclick = function(){unauthErrorNotify()};
    document.getElementById("likes").onclick = function() {unauthErrorNotify()};
}
function unauthErrorNotify(){
    errorNotifier("To like and/or comment, Sign In is required.",`click <a href="../login.html" style="font-weight: 900;text-decoration: underline;">here</a> to sign in.`);
}

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

let success = true;
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
	if(success){
        let myHeaders = new Headers();
        myHeaders.append("x-auth-token", window.localStorage.getItem("x-auth-token"));
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "articleID": storedArticleID.trim(),
            "commentBody": messageValue.trim()
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://my-brand-pacome.herokuapp.com/api/comments/", requestOptions)
        .then(response => response.json())
        .then((result) => {
            fetchArticle();
            formResetor();
            if(result.error){
                throw result;
            }
            else{
                successNotifier("Comment Posted!");
            }
        })
        .catch((error) => {
            console.log('error', error);
            errorNotifier("Can't send your comment.",error);
        });
    }
}

function formResetor(){
    document.getElementById('contact-form').innerHTML = `
        <!-- <label for="name"><strong>Name*</strong></label> -->
        <div class="form-control">
        <input type="text" id="name" name="name" required>
        <label for="name" class="label-name">
            <span class="content-name label-raw">Name</span>
        </label>
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
        </div>
        <div class="form-control">
        <input type="text" id="email" name="email" required>
        <label for="email" class="label-email">
            <span class="content-email label-raw">Email</span>
        </label>
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
        </div>
        <!-- <label for="message"><strong>Message*</strong></label> -->
        <div class="form-control">
        <textarea id="message" message="message" style="height:200px" required></textarea>
        <label for="message" class="label-message">
            <span class="content-message label-raw">Your Comment:</span>
        </label>
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-exclamation-circle"></i>
        <small>Error message</small>
        </div>
        <div></div>  
        <button type="submit">SUBMIT <i class="fa-solid fa-right-long"></i></button>
    `;
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
        document.getElementById("project-img").src = articleDetails.article.previewImageURL;
        document.getElementById("article-title").innerHTML = articleDetails.article.title;
        document.getElementById("author").innerHTML = " by " + await fetch("https://my-brand-pacome.herokuapp.com/api/users/" + articleDetails.article.authorID, requestOpts)
            .then(response => response.json())
            .then((result) => {
                document.title = articleDetails.article.title + " - by " + result.name;
                return result.name;
            })
            .catch(error => console.log('error', error));
        let articleDateRaw = JSON.parse(articleDetails.article.date);
        let articleDateObj = new Date(articleDateRaw);
        let dateString = articleDateObj.toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"});
        let timeString = articleDateObj.toLocaleDateString('en-us', {  hour:"numeric", minute:"numeric"}).split(",")[1]; 
        document.getElementById("date").innerHTML  = ` on ${dateString}, at${timeString}`;
        document.getElementById("blog-body").innerHTML = articleDetails.article.articleBody;
        // document.getElementById("likes").innerHTML = "";
        document.getElementById("likes").innerHTML  =  `<i class="fa-solid fa-heart"></i> ${(articleDetails.likes.length +" liked")}`;
        // document.getElementById("comments").innerHTML = "";
        document.getElementById("comments").innerHTML  = " " + (articleDetails.comments.length +" commented");
        renderComments(articleDetails.comments);
    }
}
fetchArticle();

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
if((window.localStorage.getItem("x-auth-token"))){
    document.getElementById("likes").onclick = function() {likeReaction()};
}

function likeReaction(){
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", window.localStorage.getItem("x-auth-token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "articleID": storedArticleID
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://my-brand-pacome.herokuapp.com/api/likes/", requestOptions)
    .then((result) => {
        fetchArticle();
        if(result.error){
            throw result;
        }
        else{
            likeNotifier(result.status);
        }
    })
    .catch((error) => {
        console.log('error', error);
        errorNotifier("Can't like this article.",error);
    });
}
function errorNotifier(title,error){
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
            font-weight: 50;"><span style="font-size:4.5ex;color: #e74c3c;">&#9888;</span> <br> ${title} <br>${(error.error ? error.error : error)}</div> ${document.getElementById("uparrow").innerHTML}
            `
            const myTimeout = setTimeout(notificationRemover, 5000);
            function notificationRemover() {
                document.getElementById("uparrow").innerHTML =`<i class="fa-solid fa-circle-arrow-up"></i>`;
            }
}

function successNotifier(title){
    document.getElementById("night-day").innerHTML =`
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
            font-weight: 50;"><span style="font-size:4.5ex;color: rgba(46,204,113,0.5);">✔️</span> ${title} </div> ${document.getElementById("night-day").innerHTML}
            `
            const myTimeout = setTimeout(notificationRemover, 3000);
            function notificationRemover() {
                document.getElementById("night-day").innerHTML =`<i class="fa-solid fa-circle-half-stroke"></i>`;
            }
}

function likeNotifier(resStatus){
    const title = (resStatus == 200)? `Liked` : `Unliked`;
    const emoji = (resStatus == 200)? `👍` : `👎`;
    document.getElementById("night-day").innerHTML =`
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
            font-weight: 50;"><span style="font-size:4.5ex;color: rgba(46,204,113,0.5);">${emoji}</span> ${title} </div> ${document.getElementById("night-day").innerHTML}
            `
            const myTimeout = setTimeout(notificationRemover, 3000);
            function notificationRemover() {
                document.getElementById("night-day").innerHTML =`<i class="fa-solid fa-circle-half-stroke"></i>`;
            }
}