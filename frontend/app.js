console.log("Tradesparksite.Pro");
window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").style.display="none";
document.getElementById("app").style.display="block";

},3000);

});

setInterval(()=>{

const now=new Date();

document.getElementById("clock").innerHTML=
now.toLocaleTimeString();

},1000);

document.getElementById("const APP_ID = "33p7PVqGTbhzPMv1GNtXr";
const REDIRECT_URL =
"https://alphones142775-cmyk.github.io/Trading-platform/";

document
.getElementById("loginBtn")
.addEventListener("click", () => {

    const authUrl =
        `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&l=EN`;

    window.location.href = authUrl;function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

const token = getQueryParam("token");

if(token){

    localStorage.setItem(
        "deriv_token",
        token
    );

}

});")
.addEventListener("click",()=>{

alert(
"Deriv OAuth integration will be connected here."
);

});

new TradingView.widget({

container_id:"tvchart",

autosize:true,

symbol:"FX:EURUSD",

interval:"1",

timezone:"Etc/UTC",

theme:"dark",

style:"1",

locale:"en",

toolbar_bg:"#131722",

enable_publishing:false,

hide_top_toolbar:false,

allow_symbol_change:true

});
