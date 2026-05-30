window.addEventListener("load",()=>{

setTimeout(()=>{
document.getElementById("loader").style.display="none";
document.getElementById("app").style.display="block";
},3000);

});

document.getElementById("app").style.display="none";

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
hide_top_toolbar:false
});

document
.getElementById("loginBtn")
.addEventListener("click",()=>{

const DERIV_APP_ID="33p7PVqGTbhzPMv1GNtXr";

window.location.href=
`https://oauth.deriv.com/oauth2/authorize?app_id=${pat_df0cbb0150b40589d016c49888fea3098f54ef3d5dde910f8e0ac4ef9f9fb0f5}`;

});

/*
Future Deriv OAuth Flow

1. Receive token
2. Connect websocket
3. Fetch:
   profile
   balances
   account list
   open trades
   transaction history
4. Update UI

*/

function updateBalance(amount){
document.getElementById("balance").innerText=
"$"+amount;
}

function updateUser(name){
document.getElementById("username").innerText=
name;
}
