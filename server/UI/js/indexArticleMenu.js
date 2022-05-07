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


////////////////////////////////////////////////
////////////////////////////////////////////////

const fetchArticles = ()=>{
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("https://my-brand-pacome.herokuapp.com/api/articles", requestOptions)
    .then(response => response.json())
    .then((result) => {
        document.getElementById("projects-grid").innerHTML = "";
        parseArticles(result);
    })
    .catch(error => console.log('error', error));
}

fetchArticles();
const parseArticles = (articlesArray)=> {
    document.getElementById("projects-grid").innerHTML =`
    <div class="portfolio-title">
        <div class="portfolio-title-raw">
            List of Articles:
        </div>
        <div>
        <button class="add-article">
            <a href="articleEditor.html"><i class="fa-solid fa-plus"></i> Add a New Article</a>
        </button>
        </div>
    </div>`;
    
    const blogCardParser = async (arrayElement) =>{
        let myLikeHeaders = new Headers();
        myLikeHeaders.append("x-auth-token", window.localStorage.getItem("x-auth-token"));

        let likeRequestOptions = {
        method: 'GET',
        headers: myLikeHeaders,
        redirect: 'follow'
        };
        const likes = await fetch("https://my-brand-pacome.herokuapp.com/api/likes/" + arrayElement._id, likeRequestOptions)
        .then(response => response.json())
        .then((result) => {
            if(result.error){
                return 0;
            }
            else{
                return result.length;
            }
        })
        .catch(error => console.log('error', error));

        let commentRequestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          const comments = await fetch("https://my-brand-pacome.herokuapp.com/api/comments/" + arrayElement._id, commentRequestOptions)
            .then(response => response.json())
            .then((result) => {
                if(result.error){
                    return 0;
                }
                else{
                    return result.length;
                }
            })
            .catch(error => console.log('error', error));

        const projectCard = `
        <div class="project-card" id="${arrayElement._id}">
            <img src="${arrayElement.previewImageURL}" class="project-img">
            <div class="project-card-details">
                <span class="blog-title"><strong>${arrayElement.title}</strong></span>
            </div>
            <div class="buttons">
                <button class="edit"><a href="articleEditorFilled.html?id=${arrayElement._id}"><i class="fa-solid fa-file-pen"></i> Edit</button></a>
                <button class="delete" onclick="deleteArticle('${arrayElement._id}')"><a href="#"><i class="fa-solid fa-trash"></i> Delete</a></button>
            </div>
            
            <div class="reactions">
                <div class="like-reaction">
                    <i class="fa-solid fa-heart"></i> ${likes}
                </div>
                <div class="comment-reaction">
                    <i class="fa-solid fa-comment"></i> ${comments}
                </div>
                <div class="view-reaction">
                </div>
            </div>
            
        </div>
        `
        document.getElementById("projects-grid").innerHTML += projectCard;
    }
    (async()=>{
        for(let i=(articlesArray.length -1);i>=0;i--){
            await blogCardParser(articlesArray[i]);
        }
    })();
}

const deleteArticle = (articleID) => {
    let myHeaders = new Headers();
    myHeaders.append("x-auth-token", window.localStorage.getItem("x-auth-token"));

    let raw = "";

    let requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://my-brand-pacome.herokuapp.com/api/articles/" + articleID, requestOptions)
    .then(response => response.text())
    .then((result) => {
        document.getElementById(articleID).innerHTML="";
    })
    .catch(error => console.log('error', error));
}