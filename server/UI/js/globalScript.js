if(window.localStorage.getItem("user-id")) {
    const userDetails = window.localStorage.getItem("user-id");
    const userDetailsObj = JSON.parse(userDetails);
    if(userDetailsObj.membership=="member" && userDetailsObj.email!="smbonimpa2011@gmail.com"){
        document.getElementById("logout-button").innerHTML=`
        <a href="login.html"><i class="fa-solid fa-right-from-bracket"></i> Log out </a>
        `
    }
    else{
        document.getElementById("logout-button").innerHTML=`
        <a href="articleMenu.html">Admin Panel</a> <a href="login.html"><i class="fa-solid fa-right-from-bracket"></i> Log out </a>
        `
    }
}
else{
    document.getElementById("logout-button").innerHTML=`
        <a href="login.html"><i class="fa-solid fa-right-to-bracket"></i> Sign in </a>
    `
}