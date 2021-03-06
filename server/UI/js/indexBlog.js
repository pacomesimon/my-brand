var myToggler = false;
document.getElementById("menuicon").onclick = function() {myFunction()};
document.getElementById("night-day").onclick = function() {togglerFunction()};
var nightDayToggler = true;
function togglerFunction(){
    nightDayToggler = !nightDayToggler;
    var link = document.createElement('link');
    link.rel = "stylesheet";
    if(nightDayToggler){
        link.href="./styles_dark/styleBlog.css";
    }
    else{
        link.href="./styles/styleBlog.css";
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


//   document.getElementById("load-button").onclick = function() {blogLoaderFunction()};

  function blogLoaderFunction(){
    document.getElementById("projects-grid").innerHTML += document.getElementById("projects-grid").innerHTML;
    document.getElementById("load-button").style["display"] = "none";
    document.getElementById("end-button").style["display"] = "block";
  }

  /////////////////////////////////////////////////////////////////////////////////////
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

    const parseArticles = (articlesArray)=> {
        const blogCardParser = (arrayElement) =>{
            const projectCard = `
            <a href="blogs/?id=${arrayElement._id}" >
                <div class="project-card">
                    <img src="${arrayElement.previewImageURL}" class="project-img">
                    <div class="project-card-details">
                        <span class="blog-pretitle">${arrayElement.subject}</span>
                        <span class="blog-title"><strong>${arrayElement.title}</strong></span>
                        <span class="blog-subtitle">NEWS | ${arrayElement.readingTime}</span>
                    </div>
                </div>
            </a>
            `
            document.getElementById("projects-grid").innerHTML += projectCard;
        }
        // articlesArray.forEach(blogCardParser);
        (async()=>{
            for(let i=(articlesArray.length -1);i>=0;i--){
                await blogCardParser(articlesArray[i]);
            }
        })();
    }

    const saveArticleID = (articleID) =>{
        window.localStorage.setItem("articleID", articleID);
    }


