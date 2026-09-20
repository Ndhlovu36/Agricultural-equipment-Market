<!DOCTYPE html>
<html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Agri Equipment Market - Pi</title>
<script src="https://sdk.minepi.com/pi-sdk.js"></script>
<style>
body{margin:0;font-family:Arial;background:#f1f5eb}
.header{background:#2e7d32;color:#fff;padding:14px;text-align:center;position:sticky;top:0;z-index:99}
.switch{display:flex;justify-content:center;gap:10px;margin:10px 0}
.switch button{padding:8px 18px;border-radius:20px;border:2px solid #fff;background:transparent;color:#fff;font-weight:bold}
.switch button.active{background:#fff;color:#2e7d32}
.actions{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:10px 0}
.btn-top{padding:10px 16px;border-radius:10px;border:none;font-weight:bold}
.login{background:#ff9800;color:#fff} .wa{background:#25D366;color:#fff}
.grid{padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:12px}
.card{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.12)}
.card img{width:100%;height:165px;object-fit:cover;background:#fff}
.body{padding:10px} .price{color:#2e7d32;font-weight:bold;font-size:16px}
.btn{width:100%;padding:11px;background:#2e7d32;color:#fff;border:none;border-radius:10px;margin-top:6px;font-weight:bold}
.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.65);z-index:999;justify-content:center;align-items:center;padding:12px;box-sizing:border-box}
.box{background:#fff;width:100%;max-width:380px;border-radius:16px;padding:18px;box-sizing:border-box}
.box input,.box textarea{width:100%;padding:11px;margin:6px 0;border-radius:9px;border:1px solid #ccc;box-sizing:border-box;font-family:Arial}
.small{font-size:12px;color:#666}
</style>
</head>
<body>
<div class="header">
<h2 style="margin:0">🚜 Agri Market - Pi</h2>
<div id="user" style="margin:6px 0;font-weight:bold">❌ Not logged in</div>
<div class="switch">
<button id="btn-test" class="active" onclick="setMode('testnet')">Testnet</button>
<button id="btn-main" onclick="setMode('mainnet')">Mainnet</button>
</div>
<div class="actions">
<button class="btn-top login" onclick="piLogin()">🔐 Login with Pi</button>
<a id="waBtn" href="https://wa.me/27700000000?text=Hello Agri Market - I need equipment" target="_blank"><button class="btn-top wa">💬 WhatsApp</button></a>
</div>
<small>Real Equipment • Pay with Pi • Gauteng Hub</small>
</div>

<div class="grid" id="grid"></div>

<div class="modal" id="modal">
<div class="box">
<img id="m-img" src="" style="width:100%;height:160px;object-fit:cover;border-radius:10px">
<h3 id="m-name" style="margin:8px 0"></h3>
<div id="m-price" class="price"></div>
<p class="small">Enter delivery details for Pi payment</p>
<input id="d-name" placeholder="Full Name *">
<input id="d-phone" placeholder="Phone / WhatsApp *">
<textarea id="d-address" rows="3" placeholder="Delivery Address - Farm, City, Province *"></textarea>
<input id="d-notes" placeholder="Notes (optional)">
<button class="btn" onclick="confirmPay()">✅ Confirm & Pay with Pi</button>
<button class="btn" style="background:#999" onclick="closeModal()">Cancel</button>
</div>
</div>

<script>
let piUser=null, currentMode='testnet', currentProduct=null;
function initPi(){
  const sandbox = currentMode==='testnet';
  Pi.init({version:"2.0", sandbox:sandbox});
}
initPi();
function setMode(m){
 currentMode=m;
 document.getElementById('btn-test').classList.toggle('active',m==='testnet');
 document.getElementById('btn-main').classList.toggle('active',m==='mainnet');
 initPi();
 if(piUser) document.getElementById('user').innerText="✅ "+piUser.username+" ("+m+")";
}
function piLogin(){
 if(typeof Pi==="undefined"){ alert("Open in Pi Browser! Link: https://agricultural-equipment-market.vercel.app"); return; }
 Pi.authenticate(['username','payments'], function(p){}).then(function(auth){
   piUser=auth.user;
   document.getElementById('user').innerText="✅ "+auth.user.username+" logged in ("+currentMode+")";
 }).catch(function(e){ alert("Login failed: "+e.message); });
}
const products=[
{name:"KUBOTA DSM-W PRO 6000 Trailer",price:1250,image:"./IMG-20260916-WA0169.jpg",desc:"6000L Spreader"},
{name:"John Deere X9 Combine Harvester",price:8900,image:"./IMG-20260916-WA3079.jpg",desc:"45ft Header"},
{name:"John Deere 4120R Sprayer 120ft",price:4200,image:"./IMG-20260916-WA2077.jpg",desc:"Self-Propelled"},
{name:"CLAAS LEXION 8700",price:185,image:"./IMG-20260920-WA7092.jpg",desc:"Combine"},
{name:"CASE IH 4540 Floater",price:145,image:"./IMG-20260920-WA5226.jpg",desc:"Sprayer"},
{name:"John Deere 8R 410 + Disc",price:125,image:"./IMG-20260920-WA3637.jpg",desc:"Tractor"},
{name:"John Deere 8R Tillage",price:115,image:"./IMG-20260917-WA4818.jpg",desc:"Field System"},
{name:"John Deere DB120 Planter",price:135,image:"./IMG-20260920-WA4385.jpg",desc:"48-Row"}
];
const grid=document.getElementById('grid');
products.forEach(p=>{
 grid.innerHTML+=`<div class="card"><img src="${p.image}"><div class="body"><b style="font-size:12px">${p.name}</b><br><small>${p.desc}</small><div class="price">π ${p.price}</div><button class="btn" onclick="openModal('${p.name}',${p.price},'${p.image}')">Buy with Pi</button></div></div>`;
});
function openModal(name,price,img){
 if(!piUser){ piLogin(); return; }
 currentProduct={name,price,img};
 document.getElementById('m-name').innerText=name;
 document.getElementById('m-price').innerText="π "+price;
 document.getElementById('m-img').src=img;
 document.getElementById('modal').style.display='flex';
}
function closeModal(){ document.getElementById('modal').style.display='none'; }
function confirmPay(){
 const name=document.getElementById('d-name').value, phone=document.getElementById('d-phone').value, addr=document.getElementById('d-address').value;
 if(!name||!phone||!addr){ alert("Please fill Name, Phone and Delivery Address"); return; }
 closeModal();
 Pi.createPayment({amount:currentProduct.price,memo:currentProduct.name+" Delivery: "+addr,metadata:{product:currentProduct.name,address:addr,phone:phone,name:name,mode:currentMode}},{
   onReadyForServerApproval:function(id){ fetch('/api/approve',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({paymentId:id})}); },
   onReadyForServerCompletion:function(id,txid){
     fetch('/api/complete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({paymentId:id,txid:txid})});
     alert("✅ Payment Success!\n"+currentProduct.name+"\nDelivery to: "+addr);
     window.open("https://wa.me/27700000000?text=New Order: "+encodeURIComponent(currentProduct.name)+" - Pi "+currentProduct.price+"%0AName: "+encodeURIComponent(name)+"%0APhone: "+encodeURIComponent(phone)+"%0AAddress: "+encodeURIComponent(addr)," _blank");
   },
   onCancel:function(){ alert("Payment cancelled"); },
   onError:function(e){ alert("Payment error: "+e); }
 });
}
</script>
</body>
</html>
