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

document.getElementById("loginBtn")
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
