"use strict";
/* Public Firebase config. Mini App reads sessions and writes owner commands to cmds/{session}; Telegram bot validates and applies them. */
const firebaseConfig={apiKey:"AIzaSyANZINM6R29i3erpEdzs60oHZsDPBXVIOI",authDomain:"manageyourbot.firebaseapp.com",projectId:"manageyourbot",storageBucket:"manageyourbot.firebasestorage.app",messagingSenderId:"919379398898",appId:"1:919379398898:web:55798b0893c24f2309c06b",measurementId:"G-ZRQF3WRGVY"};
const VERSION="2.6";
const tg=window.Telegram?.WebApp;
const IC={undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',redo:'<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>',fit:'<path d="M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4"/>',lay:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',fire:'<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.2 1 2 2 2 0-3-1-5 1-8z"/>',cam:'<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>',trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12M9 7V4h6v3"/>',edit:'<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',up:'<path d="m6 15 6-6 6 6"/>',dn:'<path d="m6 9 6 6 6-6"/>',link:'<path d="M8 16 16 8M9 8h7v7"/>',screen:'<rect x="4" y="5" width="16" height="14" rx="3"/>',btn:'<rect x="4" y="8" width="16" height="8" rx="4"/>',plus:'<path d="M12 5v14M5 12h14"/>',play:'<path d="M8 5l11 7-11 7z"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',bot:'<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01"/>',plug:'<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',box:'<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',check:'<path d="m5 12.5 4.5 4.5L19 7"/>',sel:'<path d="M5 9V6a1 1 0 0 1 1-1h3M15 5h3a1 1 0 0 1 1 1v3M19 15v3a1 1 0 0 1-1 1h-3M9 19H6a1 1 0 0 1-1-1v-3"/><path d="m11 11 2 7 1.5-3 3-1.5z"/>',more:'<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',vars:'<path d="M8 4c-2 0-3 1-3 3v2c0 1-1 3-2 3 1 0 2 2 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1 1 3 2 3-1 0-2 2-2 3v2c0 2-1 3-3 3"/>',book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/>',msg:'<path d="M4 5h16v11H9l-5 4z"/>',pc:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'};
const ic=n=>`<svg class="i" viewBox="0 0 24 24">${IC[n]}</svg>`;
const noEmo=t=>String(t).replace(/\p{Extended_Pictographic}\uFE0F?\s*/gu,"");
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const nf=n=>Number(n||0).toLocaleString("en-US");
const lsGet=k=>{try{return JSON.parse(localStorage.getItem(k))}catch{return null}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
const lsDel=k=>{try{localStorage.removeItem(k)}catch{}};
const PREF=Object.assign({haptic:true,snap:true,anim:true},lsGet("bb3:prefs")||{});
const hap=k=>{if(!PREF.haptic)return;try{const h=tg?.HapticFeedback;if(!h)return;k=="ok"?h.notificationOccurred("success"):k=="err"?h.notificationOccurred("error"):h.impactOccurred("light")}catch{}};
function applyPrefs(){document.body.classList.toggle("noanim",!PREF.anim)}
function toast(t,err){const e=document.createElement("div");e.className="toast"+(err?" err":"");e.textContent=t;document.body.append(e);hap(err?"err":"ok");setTimeout(()=>e.remove(),2800)}
const openTg=u=>{const go=()=>{try{tg?.openTelegramLink?tg.openTelegramLink(u):window.open(u,"_blank")}catch{window.open(u,"_blank")}};
 if(tg?.isFullscreen&&tg.exitFullscreen){let d=0;const f=()=>{if(d)return;d=1;try{tg.offEvent("fullscreenChanged",f)}catch{}setTimeout(go,150)};try{tg.onEvent("fullscreenChanged",f);tg.exitFullscreen();setTimeout(f,600)}catch{go()}}else go()};
/* ============ State and model ============ */
const W=230,HDR=34,TXT=46,ROW=32,MAXB=12,MAXN=40;
const S={tab:"flow",range:14,metric:"dau",cmp:false,statsDemo:false,demoRange:14,view:{x:30,y:30,k:1},hist:[],fut:[],set:{},post:"",del:false,sel:null,heat:false,heatMap:{},draw:[],fitted:false,sess:{bots:[]},bot:null,flow:null,base:[],baseSig:"",token:null,expired:false,nosess:false,live:0,cc:null,ms:new Set(),selMode:false,busy:null};
const node=id=>S.flow.nodes.find(n=>n.id==id);
const nh=n=>HDR+TXT+Math.max(1,n.btns.length)*ROW+10;
const uid=(list=S.flow?.nodes||[])=>{let i;do{i=Math.random().toString(36).slice(2,7).padEnd(5,"x")}while(list.some(n=>n.id==i||(n.btns||[]).some(b=>b.id==i)));return i};
const cn=n=>({id:n.id,title:n.title||"Screen",text:n.text||"…",x:Math.round(n.x||0),y:Math.round(n.y||0),cols:n.cols==2?2:1,btns:(n.btns||[]).map(b=>b.kind=="url"?{id:b.id,label:b.label,kind:"url",value:b.value||""}:{id:b.id,label:b.label,kind:"go",to:b.to||""})});
const clone=o=>JSON.parse(JSON.stringify(o));
const bad=b=>!String(b.label||"").trim()||(b.kind=="url"?!/^(https:\/\/|tg:\/\/)\S{3,}$/.test(b.value||""):b.kind!="go"||!(b.to&&node(b.to)));
const errCount=()=>S.flow?S.flow.nodes.reduce((a,n)=>a+n.btns.filter(bad).length,0):0;
const flowDirty=()=>S.flow&&JSON.stringify(S.flow.nodes)!==S.baseSig;
const eff=k=>k in S.set?S.set[k]:S.bot?.[k];
const hasPhoto=n=>(S.bot?.photos||[]).includes(n.id==S.flow.start?"welcome":"n_"+n.id);
const sum=(a,k)=>a.reduce((s,r)=>s+(r[k]||0),0);
const avg=(a,k)=>a.length?sum(a,k)/a.length:0;
function pendingList(){const a=[];if(!S.bot)return a;if(S.del)return["Bot deletion"];if(flowDirty())a.push("Flow");
 const k=Object.keys(S.set);if(k.length)a.push("Settings: "+k.map(x=>({support:"feedback",active:"start/stop",fallback:"fallback reply"}[x])).join(", "));
 if(S.post.trim())a.push("Broadcast");return a}
function starIcon(extra=""){return`<svg class="star-mark ${extra}" viewBox="0 0 32 32" aria-hidden="true"><path fill="#ffc83d" d="M16 2.2 20.2 10.7 29.6 12.1 22.8 18.7 24.4 28.1 16 23.7 7.6 28.1 9.2 18.7 2.4 12.1 11.8 10.7Z"/><path fill="#fff0a8" d="M16 2.2 16 15.5 11.8 10.7Z"/><path fill="#e9a514" d="M16 2.2 20.2 10.7 16 15.5Z"/><path fill="#f4b922" d="M16 15.5 9.2 18.7 7.6 28.1 16 23.7Z"/><path fill="#ffe27b" d="M16 15.5 22.8 18.7 24.4 28.1 16 23.7Z"/></svg>`}
const masterName=()=>S.sess.master||lsGet("bb3:master")||"";
function openMaster(){const m=masterName();
 if(m)return openTg("https://t.me/"+m+"?start=app");
 try{if(tg){toast("Close this window and tap “Open builder” in the main bot");setTimeout(()=>tg.close(),900);return}}catch{}
 toast("Open the main builder bot in Telegram",1)}

/* ============ Data: Firestore ============ */
async function fetchSess(token,peek){
 const r=await fetch(`https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/sessions/${encodeURIComponent(token)}?key=${firebaseConfig.apiKey}`+(peek?"&mask.fieldPaths=exp":""),{cache:"no-store"});
 if(!r.ok)throw new Error("http "+r.status);
 const d=await r.json();if(peek)return d.updateTime;S.ut=d.updateTime;const j=JSON.parse(d.fields.json.stringValue);j.exp=j.exp||d.fields.exp?.timestampValue;return j}

/* Full statistics is available only on active Pro and Business plans. */
function statSrc(){
 const b=S.bot;if(!b)return null;
 return{locked:!["pro","biz"].includes(S.sess.plan),username:b.username,subs:b.subs||0,nodes:b.flow?.nodes||[],stats:b.stats||{},running:!!b.running}}

async function boot(){
 const token=new URLSearchParams(location.search).get("s");
 const requestedTab=new URLSearchParams(location.search).get("tab");
 if(["flow","stats","bot","me"].includes(requestedTab))S.tab=requestedTab;
 lsDel("bb3:demo");
 if(!token){S.nosess=true;S.sess={bots:[],limit:5}}
 else{S.token=token;try{S.sess=await fetchSess(token);S.live=Date.now();if(S.sess.master)lsSet("bb3:master",S.sess.master)}catch(e){S.expired=true;S.err=String(e&&e.message||e);S.sess={bots:[]}}}
 const last=lsGet("bb3:last");openBot((S.sess.bots.find(b=>b.id==last)||S.sess.bots[0])?.id);
 renderTab();ui()}
function openBot(id){
 const b=S.sess.bots.find(x=>x.id==id);S.bot=b||null;S.sel=null;S.ms.clear();S.hist=[];S.fut=[];S.set={};S.post="";S.del=false;S.fitted=false;
 if(!b){S.flow=null;S.base=[];S.baseSig="";renderTop();renderTab();ui();return}
 S.base=b.flow.nodes.map(cn);S.baseSig=JSON.stringify(S.base);S.flow={start:b.flow.start,nodes:clone(S.base)};
 const d=lsGet("bb3:"+b.id);
 if(d&&d.base==b.rev){if(d.nodes)S.flow.nodes=d.nodes.map(cn);S.set=d.set||{};S.post=d.post||""}else if(d)lsDel("bb3:"+b.id);
 lsSet("bb3:last",b.id);calcHeat();renderTop();renderTab();ui()}
async function refresh(){
 if(!S.token||document.hidden)return;
 try{const ut=await fetchSess(S.token,true);if(ut&&ut===S.ut){S.live=Date.now();ui();return}const j=await fetchSess(S.token),cur=S.bot?.id,oldRev=S.bot?.rev;S.sess=j;S.expired=false;S.live=Date.now();if(j.master)lsSet("bb3:master",j.master);
  const had=!!S.bot;S.bot=j.bots.find(x=>x.id==cur)||j.bots[0]||null;
  if(S.bot&&(!had||oldRev!=S.bot.rev||S.bot.id!=cur)){if(!pendingList().length||!had)openBot(S.bot.id);else{S.base=S.bot.flow.nodes.map(cn);S.baseSig=JSON.stringify(S.base);toast("Flow updated")}}
  else if(S.bot){calcHeat()}
  else if(had){openBot(null)}
  renderTop();if(S.tab=="stats")renderStats();if(S.tab=="bot")renderBot();if(S.tab=="me")renderMe();ui()}
 catch{if(S.sess.exp&&new Date(S.sess.exp)<Date.now())S.expired=true;ui()}}
function calcHeat(){const rows=(S.bot?.stats?.days||[]).slice(-30),m={};rows.forEach(r=>{for(const k in r.n||{})m[k]=(m[k]||0)+r.n[k]});S.heatMap=m}

/* ============ History and draft (stored locally on the device only) ============ */
const snapF=()=>JSON.stringify(S.flow.nodes);
function mutate(fn){S.hist.push(snapF());if(S.hist.length>80)S.hist.shift();S.fut=[];fn();afterChange()}
let dTimer;function saveDraftSoon(){clearTimeout(dTimer);dTimer=setTimeout(saveDraft,300)}
function saveDraft(){if(!S.bot)return;if(!pendingList().length||S.del){lsDel("bb3:"+S.bot.id);return}
 lsSet("bb3:"+S.bot.id,{base:S.bot.rev,nodes:flowDirty()?S.flow.nodes:null,set:S.set,post:S.post})}
function afterChange(){renderFlow();saveDraftSoon();ui()}
function undo(){if(!S.flow||!S.hist.length)return;S.fut.push(snapF());S.flow.nodes=JSON.parse(S.hist.pop());afterChange();hap()}
function redo(){if(!S.flow||!S.fut.length)return;S.hist.push(snapF());S.flow.nodes=JSON.parse(S.fut.pop());afterChange();hap()}
function setVal(k,v){if(v===S.bot[k])delete S.set[k];else S.set[k]=v;saveDraftSoon();ui()}

/* ============ Layout and templates ============ */
function layout(nodes,start){
 const by=Object.fromEntries(nodes.map(n=>[n.id,n])),depth={[start]:0},q=[start];
 while(q.length){const id=q.shift();(by[id]?.btns||[]).forEach(b=>{if(b.kind=="go"&&b.to&&by[b.to]&&!(b.to in depth)){depth[b.to]=depth[id]+1;q.push(b.to)}})}
 const md=Math.max(0,...Object.values(depth));nodes.forEach(n=>{if(!(n.id in depth))depth[n.id]=md+1});
 const ys={};nodes.slice().sort((a,b)=>depth[a.id]-depth[b.id]).forEach(n=>{const d=depth[n.id];ys[d]=ys[d]||40;n.x=60+d*300;n.y=ys[d];ys[d]+=nh(n)+28})}
/* item: [title, text, [nested screens], [[caption, https link], …]] */
const TPL=[
 {k:"main",ico:"📦",name:"Main template",desc:"A complete ready-made flow: catalog, delivery, payment, promos, booking, reviews, FAQ, contacts. Just replace the texts.",
  w:"Hi! 👋 Welcome.\nPick a section below:",
  items:[
   ["🛍 Catalog","**Catalog.**\nChoose a category:",[
     ["👕 New arrivals","**New arrivals.**\nFresh in stock:\n• Item 1 — $19.90\n• Item 2 — $24.90"],
     ["🔥 Bestsellers","**Bestsellers.**\nWhat customers buy most often:\n• Item 3 — $12.90\n• Item 4 — $29.90"],
     ["🏷 Sale","**Sale.**\nUp to 50% off selected items."]]],
   ["🚚 Delivery","**Delivery.**\n• Courier — 1–2 days, from $3.50\n• Pickup — free\n• Free on orders over $50"],
   ["💳 Payment","**Payment.**\n• Card online\n• Cash on delivery\n• Installments with no overpayment"],
   ["🎁 Promos","**Promos and bonuses.**\nPromo code for your first order: `WELCOME10`"],
   ["📅 Booking","**Booking.**\nWrite a time that suits you or pick one via the link.",[],[["📅 Pick a time","https://example.com"]]],
   ["⭐ Reviews","**Customer reviews.**\n“Fast and neat!” — Anna\n“Recommended!” — Igor"],
   ["❓ FAQ","**FAQ.**\nPick a question:",[
     ["📦 How to order?","Pick an item in the catalog and message us — we'll place the order together."],
     ["↩️ Can I return an item?","Yes, within 14 days if the item is unused."]]],
   ["ℹ️ About us","**About us.**\nTell visitors what you do and what makes you different."],
   ["📍 Address & hours","**Address.**\n1 Main Street, City\n\n**Opening hours.**\nMon–Fri 10:00–20:00\nSat–Sun 11:00–18:00"],
   ["☎️ Contacts","**Contacts.**\nPhone: +1 000 000-00-00\nEmail: hello@example.com",[],[["🌐 Website","https://example.com"],["✈️ Telegram","https://t.me/example"]]]
  ]},
 {k:"cafe",ico:"☕",name:"Cafés & restaurants",desc:"Menu, table booking, promos, address and opening hours.",
  w:"Hi, {first_name}! ☕\nWelcome to {bot_name}.\nWhat can we get you?",
  items:[["📋 Menu","**Menu.**\nPick a section:",[["☕ Coffee & tea","**Coffee & tea.**\n• Cappuccino — $2.80\n• Latte — $3.00\n• Tea — $2.00"],["🍰 Desserts","**Desserts.**\n• Cheesecake — $3.50\n• Croissant — $2.10"],["🍝 Main dishes","**Main dishes.**\n• Pasta — $5.50\n• Burger — $5.90"]]],
   ["📅 Book a table","**Booking.**\nWrite the date, time and number of guests, or book via the link.",[],[["📅 Book now","https://example.com"]]],
   ["🎁 Promos","**Promos.**\nCoffee is on the house with any dessert. Promo code: `COFFEE`"],
   ["📍 Address & hours","**Address.**\n1 Main Street, City\n\n**Hours.**\nDaily 8:00–22:00"],
   ["☎️ Contacts","**Contacts.**\nPhone: +1 000 000-00-00",[],[["✈️ Telegram","https://t.me/example"]]]]},
 {k:"beauty",ico:"💇",name:"Salon & services",desc:"Services with prices, online booking, stylists, reviews.",
  w:"Hello, {first_name}! ✨\nThis is {bot_name}. We'll book you in within a couple of taps.",
  items:[["💅 Services & prices","**Services.**\nChoose a category:",[["✂️ Haircuts","**Haircuts.**\n• Women's — $25\n• Men's — $15"],["🎨 Coloring","**Coloring.**\n• Single-tone — from $40\n• Complex — from $70"],["💅 Manicure","**Manicure.**\n• Classic — $18\n• Gel polish — $26"]]],
   ["📅 Book now","**Booking.**\nPick a time that suits you:",[],[["📅 Pick a time","https://example.com"]]],
   ["👩‍🎨 Our team","**Our team.**\nAnna — hairstylist, 8 years of experience.\nMaria — nail artist."],
   ["⭐ Reviews","**Reviews.**\n“The best salon in town!” — Olga"],
   ["📍 Address & hours","**Address.**\n1 Main Street, City\n\n**Hours.**\nDaily 10:00–21:00"],
   ["☎️ Contacts","**Contacts.**\nPhone: +1 000 000-00-00"]]},
 {k:"course",ico:"🎓",name:"Courses & education",desc:"About the course, a module-based program, pricing, FAQ, sign-up.",
  w:"Hi, {first_name}! 🎓\nI'll help you pick a course and enroll.",
  items:[["ℹ️ About the course","**About the course.**\nDescribe what students will learn and how long it takes."],
   ["📚 Program","**Program.**\nChoose a module:",[["Module 1","**Module 1.**\nBasics: topics and outcomes."],["Module 2","**Module 2.**\nPractice: topics and outcomes."],["Module 3","**Module 3.**\nFinal project and assessment."]]],
   ["💳 Pricing","**Pricing.**\n• Basic — $110\n• Standard — $165\n• Premium — $275"],
   ["❓ FAQ","**FAQ.**\nPick a question:",[["Do I need experience?","No, we start from scratch."],["Will there be a certificate?","Yes, after the final project."]]],
   ["✅ Enroll","**Enrollment.**\nLeave a request via the link:",[],[["✅ Leave a request","https://example.com"]]],
   ["☎️ Contacts","**Contacts.**\nEmail: hello@example.com"]]},
 {k:"support",ico:"🛟",name:"Support desk",desc:"FAQ, order status, policies and a line to a live operator.",
  w:"Hello, {first_name}! 🛟\nThis is {bot_name} support. Pick a topic:",
  items:[["❓ FAQ","**FAQ.**\nPick a question:",[["How do I pay?","You can pay by card online or on delivery."],["How do I return an item?","Returns are accepted within 14 days."]]],
   ["📦 Order status","**Order status.**\nSend your order number — we'll reply within an hour."],
   ["📜 Policies","**Terms and policies.**\nRead the full terms on our website.",[],[["🌐 Open","https://example.com"]]],
   ["☎️ Contact us","**Talk to an operator.**\nMon–Fri 9:00–18:00. Tap “Contact us” in the menu."]]}
];
function buildTpl(t){
 const nodes=[{id:"start",title:"Start",text:noEmo(t.w),x:0,y:0,cols:2,btns:[]}];
 const add=(parent,it)=>{const[title0,text0,kids=[],urls=[]]=it,title=noEmo(title0),text=noEmo(text0),id=uid(nodes),me={id,title:title.slice(0,40),text,x:0,y:0,cols:1,btns:[]};
  nodes.push(me);parent.btns.push({id:uid(nodes),label:title.slice(0,32),kind:"go",to:id});
  kids.forEach(k=>add(me,k));urls.forEach(([l,u])=>me.btns.push({id:uid(nodes),label:noEmo(l).slice(0,32),kind:"url",value:u}))};
 t.items.forEach(it=>add(nodes[0],it));layout(nodes,"start");return nodes}

/* ============ Canvas ============ */
const cv=$("#cv"),world=$("#world"),svg=$("#svg"),nodesEl=$("#nodes"),P=new Map();let mode=null,st=null;
const out=(n,i)=>({x:n.x+W,y:n.y+HDR+TXT+i*ROW+ROW/2}),inp=n=>({x:n.x,y:n.y+17});
const DEFS='<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#a9a8f8"/></marker></defs>';
const curve=(a,b,c)=>`<path class="${c}" d="M${a.x} ${a.y}C${a.x+70} ${a.y} ${b.x-70} ${b.y} ${b.x} ${b.y}" marker-end="url(#ar)"/>`;
function wires(tmp){let h=DEFS;
 S.flow.nodes.forEach(n=>n.btns.forEach((b,i)=>{if(b.kind=="url")return;const a=out(n,i),t=b.to&&node(b.to);h+=t?curve(a,inp(t),"w"):`<path class="w bad" d="M${a.x} ${a.y}h28"/>`}));
 if(tmp&&tmp.p){const n=node(tmp.nid);h+=curve(out(n,n.btns.findIndex(b=>b.id==tmp.bid)),tmp.p,"w tmp")}
 svg.innerHTML=h}
/* empty state: no bots / no session */
function emptyCard(){
 const t=S.nosess?{i:ic("plug"),h:"Open the builder via Telegram",p:"The builder didn't open. Go back to Telegram and tap “Open builder” in the main bot.",b:"Open builder"}
 :S.expired?{i:ic("clock"),h:"Couldn't connect",p:"Couldn't connect. Check your internet or try again later. You can also reopen the builder from the main bot.",b:"Open builder"}
 :{i:ic("bot"),h:"No bots yet",p:"It takes 1 minute:\n1. In Telegram, open @BotFather and send /newbot\n2. Copy the token and send it to @ManageYourOwnBot\n3. Tap “Open builder” — your bot will appear here, and you can launch it with a single button",b:"Add via the bot"};
 return`<div class="cd hero"><div class="big">${t.i}</div><h3>${t.h}</h3><div class="note">${esc(t.p)}</div><button class="main" data-act="addbot">${t.b}</button></div>`}
function emptyHtml(){return`<div class="wrap">${emptyCard()}</div>`}
function renderEmptyFlow(){const e=$("#eflow"),off=!S.bot;e.hidden=!off;$("#v-flow").classList.toggle("off",off);if(off)e.innerHTML=emptyCard()}
function renderFlow(){
 renderEmptyFlow();
 if(!S.flow){nodesEl.innerHTML="";svg.innerHTML="";$("#undo").disabled=true;$("#redo").disabled=true;return}
 const mx=Math.max(1,...Object.values(S.heatMap));
 nodesEl.innerHTML=S.flow.nodes.map(n=>{const start=n.id==S.flow.start,v=S.heat?(S.heatMap[n.id]||0):null,r=v!=null?v/mx:0;
  const hs=v!=null?`;border-color:var(--o);box-shadow:0 0 ${Math.round(r*34)}px rgba(255,106,43,${(.12+.6*r).toFixed(2)})`:"";
  return`<div class="node ${start?"start":""} ${S.sel==n.id&&!S.ms.size?"sel":""} ${S.ms.has(n.id)?"ms":""}" data-id="${n.id}" style="left:${n.x}px;top:${n.y}px${hs}"><div class="hd"><b class="in"></b><span>${esc(n.title)}</span>${v!=null?`<em class="hv">${nf(v)}</em>`:""}<i class="ph ${hasPhoto(n)?"has":""}">${ic("cam")}</i></div><div class="tx">${esc(n.text)}</div><div class="rows">${n.btns.map(b=>`<div class="row ${b.kind=="url"?"url":""} ${bad(b)?"bad":""}" data-b="${b.id}"><span>${esc(b.label)}<small>${b.kind=="url"?ic("link"):""}</small></span><u class="out"></u></div>`).join("")||'<div class="nempty">+ drop a button here</div>'}</div></div>`}).join("");
 wires();$("#heat").classList.toggle("on",S.heat);gbarUi();$("#undo").disabled=!S.hist.length;$("#redo").disabled=!S.fut.length}
function markSel(){$$(".node").forEach(x=>{x.classList.toggle("sel",x.dataset.id==S.sel&&!S.ms.size);x.classList.toggle("ms",S.ms.has(x.dataset.id))});gbarUi()}
function applyView(){world.style.transform=`translate(${S.view.x}px,${S.view.y}px) scale(${S.view.k})`;cv.style.backgroundSize=`${24*S.view.k}px ${24*S.view.k}px`;cv.style.backgroundPosition=`${S.view.x}px ${S.view.y}px`}
const w2=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left-S.view.x)/S.view.k,y:(e.clientY-r.top-S.view.y)/S.view.k}};
function zoomTo(nk,cx,cy){nk=clamp(nk,.3,1.6);const r=cv.getBoundingClientRect();cx??=r.width/2;cy??=r.height/2;S.view.x=cx-(cx-S.view.x)*nk/S.view.k;S.view.y=cy-(cy-S.view.y)*nk/S.view.k;S.view.k=nk;applyView()}
function fit(){const r=cv.getBoundingClientRect(),ns=S.flow?.nodes||[];if(!ns.length||!r.width)return applyView();S.fitted=true;
 const x0=Math.min(...ns.map(n=>n.x)),y0=Math.min(...ns.map(n=>n.y)),x1=Math.max(...ns.map(n=>n.x+W)),y1=Math.max(...ns.map(n=>n.y+nh(n)));
 S.view.k=Math.max(.3,Math.min(1,(r.width-40)/(x1-x0),(r.height-150)/(y1-y0)));S.view.x=(r.width-(x1-x0)*S.view.k)/2-x0*S.view.k;S.view.y=70-y0*S.view.k;applyView()}
const dist=()=>{const[a,b]=[...P.values()];return Math.hypot(a.x-b.x,a.y-b.y)||1};
const snapG=v=>PREF.snap?Math.round(v/10)*10:Math.round(v);
function tap(t){const nd=t.closest(".node");if(!nd)return;const n=node(nd.dataset.id);S.sel=n.id;markSel();hap();
 if(t.closest(".ph"))return photoInfo(n);
 const row=t.closest(".row");row?openBtn(n.id,row.dataset.b):openNode(n.id)}
cv.addEventListener("pointerdown",e=>{if(!S.flow)return;cv.setPointerCapture(e.pointerId);P.set(e.pointerId,{x:e.clientX,y:e.clientY});clearTimeout(lp);
 if(P.size==2){mode="pinch";st={d:dist(),k:S.view.k};return}
 const t=e.target,nd=t.closest(".node");st={sx:e.clientX,sy:e.clientY,moved:false,t,shift:e.shiftKey||e.ctrlKey||e.metaKey};
 if(t.closest(".out")){mode="wire";st.nid=nd.dataset.id;st.bid=t.closest(".row").dataset.b;st.pre=snapF()}
 else if(nd&&!t.closest(".ph")){const id=nd.dataset.id;if(st.shift){toggleMs(id);mode="noop";return}
  mode="drag";nd.classList.add("dragging");st.n=node(id);st.pre=snapF();st.ox=st.n.x;st.oy=st.n.y;
  if(S.ms.size>1&&S.ms.has(id))st.grp=[...S.ms].map(i=>node(i)).filter(Boolean).map(m=>({m,x:m.x,y:m.y}));
  else{S.ms.clear();S.sel=id}markSel()}
 else if(nd)mode="tap";else if(st.shift||S.selMode){mode="marq";startMarq()}else{mode="pan";st.vx=S.view.x;st.vy=S.view.y;lp=setTimeout(()=>{if(mode=="pan"&&st&&!st.moved){mode="marq";startMarq();hap()}},450)}});
cv.addEventListener("pointermove",e=>{if(!P.has(e.pointerId))return;P.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(mode=="pinch"&&P.size==2){const[a,b]=[...P.values()],r=cv.getBoundingClientRect();zoomTo(st.k*dist()/st.d,(a.x+b.x)/2-r.left,(a.y+b.y)/2-r.top);return}
 if(!st||!mode)return;const dx=e.clientX-st.sx,dy=e.clientY-st.sy;if(Math.hypot(dx,dy)>6){st.moved=true;if(mode=="pan")clearTimeout(lp)}if(mode=="marq"){drawMarq(e);return}if(!st.moved)return;
 if(mode=="pan"){S.view.x=st.vx+dx;S.view.y=st.vy+dy;applyView()}
 else if(mode=="drag"){const nx=snapG(st.ox+dx/S.view.k),ny=snapG(st.oy+dy/S.view.k),ddx=nx-st.ox,ddy=ny-st.oy;
  (st.grp||[{m:st.n,x:st.ox,y:st.oy}]).forEach(g=>{g.m.x=g.x+ddx;g.m.y=g.y+ddy;const el=nodesEl.querySelector(`[data-id="${g.m.id}"]`);if(el){el.style.left=g.m.x+"px";el.style.top=g.m.y+"px"}});wires()}
 else if(mode=="wire"){st.p=w2(e);wires(st)}});
function pointerEnd(e){P.delete(e.pointerId);if(mode=="pinch"){if(P.size<2){mode=null;st=null}return}if(!st)return;clearTimeout(lp);const ok=e.type=="pointerup";if(mode=="marq"){endMarq(e,ok);mode=null;st=null;return}
 if(mode=="wire"&&st.moved&&ok){const under=document.elementFromPoint(e.clientX,e.clientY),inCv=!!under?.closest("#cv"),el=under?.closest(".node"),n=node(st.nid),b=n.btns.find(x=>x.id==st.bid);
  const nid=el&&el.dataset.id!=st.nid?el.dataset.id:null;
  if(nid||(inCv&&!el&&S.flow.nodes.length<MAXN)){S.hist.push(st.pre);S.fut=[];
   if(nid){b.to=nid}else{const p=w2(e),id=uid();S.flow.nodes.push({id,title:"Screen",text:"Screen text",x:snapG(p.x+10),y:snapG(p.y-17),cols:1,btns:[]});b.to=id}
   b.kind="go";delete b.value;afterChange();hap()}else wires()}
 else if(mode=="wire"&&!st.moved&&ok)tap(st.t);
 else if(mode=="wire")wires();
 else if(mode=="drag"&&st.moved){if(st.pre!=snapF()){S.hist.push(st.pre);S.fut=[]}afterChange()}
 else if((mode=="tap"||mode=="drag")&&!st.moved&&ok)tap(st.t);
 else if(mode=="pan"&&!st.moved&&ok&&S.ms.size){S.ms.clear();markSel()}
 st.t?.closest(".node")?.classList.remove("dragging");mode=null;st=null}
cv.addEventListener("pointerup",pointerEnd);cv.addEventListener("pointercancel",pointerEnd);
cv.addEventListener("wheel",e=>{e.preventDefault();const r=cv.getBoundingClientRect();zoomTo(S.view.k*(e.deltaY<0?1.1:.9),e.clientX-r.left,e.clientY-r.top)},{passive:false});
function addScreenAt(x,y){if(S.flow.nodes.length>=MAXN)return toast("Maximum "+MAXN+" screens",1);const id=uid();mutate(()=>S.flow.nodes.push({id,title:"Screen",text:"Screen text",x:snapG(x),y:snapG(y),cols:1,btns:[]}));S.sel=id;markSel();hap();return id}
function addBtn(nid,kind){const n=node(nid);if(n.btns.length>=MAXB)return toast("Maximum "+MAXB+" buttons per screen",1);const b=kind=="url"?{id:uid(),label:"Link",kind:"url",value:"https://"}:{id:uid(),label:"Button",kind:"go",to:""};mutate(()=>n.btns.push(b));return b.id}
function chooseScreenForAddition(kind){
 const current=S.sel&&node(S.sel)?S.sel:S.flow.start;
 const isLink=kind=="url",title=isLink?"Where to add the link?":"Where to add the button?";
 const d=sheet(`${head(title)}<p class="add-target-intro">Choose the screen where the ${isLink?"link":"button"} will appear. Its settings will open right after.</p><div class="target-screen-list">${S.flow.nodes.map(n=>{const excerpt=String(n.text||"").replace(/\s+/g," ").trim().slice(0,64);return`<button class="target-screen ${n.id==current?"current":""}" data-target-screen="${n.id}"><span class="target-screen-icon">${ic("screen")}</span><span class="target-screen-copy"><b>${esc(n.title||"Screen")}</b><small>${esc(excerpt||"No text yet")} · ${n.btns.length} ${n.btns.length==1?"button":"buttons"}</small></span><span class="target-screen-action">${n.id==current?"Current":"Select"}</span></button>`}).join("")}</div><div class="acts2"><button class="ghost" data-x>Cancel</button></div>`,{cls:"modal add-target-modal"});
 d.addEventListener("click",e=>{const target=e.target.closest("[data-target-screen]");if(!target)return;const nid=target.dataset.targetScreen,bid=addBtn(nid,kind);if(!bid)return;d._close=null;closeSheet(d);S.sel=nid;renderFlow();markSel();openBtn(nid,bid,()=>{renderFlow();markSel()})})
}
const addToggle=$("#add-toggle"),addOptions=$("#add-options");
addToggle.onclick=()=>{const open=addOptions.hidden;addOptions.hidden=!open;addToggle.classList.toggle("open",open);addToggle.setAttribute("aria-expanded",String(open));hap()};
addOptions.onclick=e=>{const b=e.target.closest("[data-add]");if(!b)return;const type=b.dataset.add;addOptions.hidden=true;addToggle.classList.remove("open");addToggle.setAttribute("aria-expanded","false");if(!S.flow)return toast("Add a bot first");
 if(type=="screen"){const r=cv.getBoundingClientRect();const id=addScreenAt((r.width/2-S.view.x)/S.view.k-W/2,(r.height/2-S.view.y)/S.view.k-60);if(id)openNode(id);return}
 chooseScreenForAddition(type=="url"?"url":"go")};
document.addEventListener("click",e=>{if(!e.target.closest("#dock")){addOptions.hidden=true;addToggle.classList.remove("open");addToggle.setAttribute("aria-expanded","false")}});

/* ============ Sheets ============ */
const layerEl=$("#layer"),stack=[];
function bb(){try{stack.length?tg?.BackButton?.show():tg?.BackButton?.hide()}catch{}}
function sheet(inner,{cls="",full=false,raw=false}={}){const d=document.createElement("div");d.className="sheet "+cls;d._t=Date.now();
 d.innerHTML=raw?inner:`<div class="sh ${full?"full":""}"><i class="grab"></i>${inner}</div>`;layerEl.append(d);stack.push(d);bb();
 /* guard against a “phantom” click right after opening: it closed the sheet and broke typing */
 d.addEventListener("click",e=>{if(e.target===d){if(Date.now()-d._t<450)return;return closeSheet(d)}if(e.target.closest("[data-x]"))closeSheet(d)});
 requestAnimationFrame(()=>d.classList.add("shown"));return d}
function closeSheet(d){const i=stack.indexOf(d);if(i<0)return;stack.splice(i,1);try{d._close?.()}catch(e){console.error(e)}d.classList.remove("shown");setTimeout(()=>d.remove(),200);bb()}
try{tg?.BackButton?.onClick(()=>stack.length&&closeSheet(stack[stack.length-1]))}catch{}
const head=t=>`<div class="shh"><h3>${t}</h3></div>`;
layerEl.addEventListener("focusin",e=>{const t=e.target;if(!/INPUT|TEXTAREA|SELECT/.test(t.tagName))return;setTimeout(()=>{try{t.scrollIntoView({block:"center",behavior:"smooth"})}catch{}},320)});
const enterBlur=e=>{if(e.key=="Enter"&&e.target.tagName=="INPUT"){e.preventDefault();e.target.blur()}};

function openNode(id){
 const n0=node(id);if(!n0)return;const start=id==S.flow.start;
 const d=sheet(`<div class="shh screen-editor-head"><div class="screen-editor-title"><span class="screen-editor-mark">${ic("screen")}</span><div><h3>${start?"Start screen":"Screen editor"}</h3><small>Set up the message and buttons in the Telegram preview</small></div></div><span class="screen-live"><i></i>PREVIEW</span><button class="main screen-done" data-x>Done</button></div>
 <div class="screen-editor-body"><div class="screen-editor-guide"><span><b>1</b> Write the message</span><i>→</i><span><b>2</b> Add buttons</span><i>→</i><span><b>3</b> Choose their layout</span></div><div class="screen-editor-layout">
  <div class="screen-editor-controls">
   <div class="cd edit-section"><div class="screen-section-head"><span class="screen-step">01</span><div><h3>Message</h3><small>This is how the user will see it in Telegram</small></div></div>
    <label>Screen name</label><input id="nt" type="text" maxlength="40" autocomplete="off" enterkeyhint="done" placeholder="e.g. Main menu">
    <label>Message text <span id="cnt"></span></label><div class="fmt"><button data-f="b" title="Bold">B</button><button data-f="i" title="Italic"><i>I</i></button><button data-f="c" title="Monospace">‹›</button><button data-f="link" title="Link">${ic("link")}</button><button data-f="var" title="Insert variable">${ic("vars")}</button></div>
    <textarea id="nx" maxlength="3500" placeholder="Write the message the bot will send to the user"></textarea><div class="field-help">The text on the right updates instantly. Use the toolbar above the field for styling and variables.</div><div class="vh" id="vh"></div>
    <details class="variable-drawer" id="var-drawer"><summary><span>${ic("vars")}Add a variable</span><small>Name, username, date…</small></summary><div class="variable-grid">${VARS.map(v=>`<button type="button" class="variable-chip" data-insert-var="${v[0]}"><span>${esc(v[1])}</span><code>{${v[0]}}</code></button>`).join("")}</div><div class="note editor-hint">The variable will be substituted automatically when the bot sends the message.</div></details>
   </div>
   <div class="cd edit-section"><div class="screen-section-head"><span class="screen-step">02</span><div><h3>Message buttons</h3><small>Drag ⠿ to reorder</small></div><span class="mu" id="bc"></span></div><div class="bl" id="bl"></div>
    <div class="button-action-help">${ic("edit")}<span>Add a button, then tap its <b>pencil</b> and choose a screen or a link.</span></div><div class="acts2 editor-actions"><button class="ghost" id="ab">${ic("plus")} Add transition</button><button class="ghost" id="au">${ic("link")} Add link</button></div>
   </div>
   <div class="cd edit-section"><div class="screen-section-head"><span class="screen-step">03</span><div><h3>Keyboard layout</h3><small>Choose how the buttons are arranged</small></div></div><div class="seg" id="nc"><button data-c="1">In a column</button><button data-c="2">Two per row</button></div>
    <div class="acts2 editor-actions"><button class="ghost" id="ph">${ic("cam")} Screen photo</button><button class="ghost" id="dp">${ic("copy")} Duplicate</button></div>
   </div>
   <div class="screen-editor-footer">${start?"":`<button class="ghost danger" id="dl">${ic("trash")} Delete screen</button>`}<span class="note">Changes are saved to the flow.</span></div>
  </div>
  <aside class="screen-editor-preview"><div class="screen-preview-label"><span>${ic("screen")} Live preview</span><span class="screen-preview-dot">updates automatically</span></div>
   <div class="screen-chat"><div class="screen-chat-head"><span class="screen-chat-avatar">${esc((S.bot?.username||"B")[0].toUpperCase())}</span><div><b>${esc(S.bot?.name||S.bot?.username||"My bot")}</b><small>bot</small></div><span class="screen-chat-menu">⋮</span></div>
    <div class="screen-chat-body"><div class="screen-chat-date">TODAY</div><div class="screen-message"><div class="screen-message-text" id="screen-preview-text"></div><span class="screen-message-time" id="screen-preview-time"></span></div><div class="screen-inline-keyboard" id="screen-preview-keyboard"></div></div>
   </div><div class="screen-preview-tip">Tap a button in the preview to edit it right away.</div>
  </aside>
 </div></div>`,{cls:"screen-editor"});
 const t=$("#nt",d),x=$("#nx",d);let cols=n0.cols==2?2:1;t.value=n0.title;x.value=n0.text;
 const cnt=()=>{$("#cnt",d).textContent=x.value.length+" / 3500";$("#vh",d).innerHTML=varHint(x.value);preview()};
 const setCols=()=>{$$("#nc button",d).forEach(b=>b.classList.toggle("on",+b.dataset.c==cols));const kb=$("#screen-preview-keyboard",d);if(kb)kb.style.gridTemplateColumns=`repeat(${cols},minmax(0,1fr))`};
 const preview=()=>{const text=$("#screen-preview-text",d),time=$("#screen-preview-time",d),kb=$("#screen-preview-keyboard",d),m=node(id);if(!text||!m)return;text.innerHTML=fmtHtml(applyVars(x.value))||'<span class="preview-placeholder">Your text will appear here</span>';const now=new Date();time.textContent=String(now.getHours()).padStart(2,"0")+":"+String(now.getMinutes()).padStart(2,"0");kb.style.gridTemplateColumns=`repeat(${cols},minmax(0,1fr))`;kb.innerHTML=m.btns.map((b,i)=>`<button class="screen-preview-button" data-preview-btn="${b.id}" title="Tap to edit">${esc(b.label||"Button")}${b.kind=="url"?'<span>↗</span>':""}</button>`).join("")||'<div class="screen-preview-empty">Buttons will appear here</div>'};
 const list=()=>{const m=node(id);if(!m)return;$("#bc",d).textContent=m.btns.length+" / "+MAXB;
  $("#bl",d).innerHTML=m.btns.map((b,i)=>`<div class="br screen-button-row ${bad(b)?"bad":""}" data-i="${i}"><span class="drag-handle" draggable="true" data-drag="${i}" title="Drag">⠿</span><span class="bi">${ic(b.kind=="url"?"link":"btn")}</span><div class="bm"><span class="screen-button-kind ${b.kind}">${b.kind=="url"?"LINK":"GO"}</span><input class="bli" type="text" maxlength="32" autocomplete="off" enterkeyhint="done" placeholder="Button label" value="${esc(b.label)}"><small>${b.kind=="url"?esc(b.value):(node(b.to)?"→ "+esc(node(b.to).title):"Tap the pencil to pick a screen")}</small></div><button data-up aria-label="Move up" title="Up" ${i==0?"disabled":""}>${ic("up")}</button><button data-dn aria-label="Move down" title="Down" ${i==m.btns.length-1?"disabled":""}>${ic("dn")}</button><button data-ed aria-label="Edit button" title="Edit">${ic("edit")}</button></div>`).join("")||`<div class="screen-button-empty">${ic("btn")}<div><b>No buttons yet</b><small>Add a transition to another screen or a link. They'll appear in the message on the right immediately.</small></div></div>`;preview()};
 cnt();setCols();list();x.oninput=cnt;t.oninput=preview;
 $("#nc",d).onclick=e=>{const b=e.target.closest("[data-c]");if(b){cols=+b.dataset.c;setCols();preview()}};
 $(".fmt",d).onclick=e=>{const b=e.target.closest("[data-f]");if(!b)return;const f=b.dataset.f;if(f=="var"){const drawer=$("#var-drawer",d);drawer.open=true;drawer.scrollIntoView({behavior:"smooth",block:"nearest"});return}const s=x.selectionStart,en=x.selectionEnd,v=x.value,sel=v.slice(s,en);let ins;
  if(f=="link")ins="["+(sel||"text")+"](https://)";else{const m={b:"**",i:"__",c:"`"}[f];ins=m+(sel||"text")+m}
  x.value=v.slice(0,s)+ins+v.slice(en);x.focus();x.selectionStart=s;x.selectionEnd=s+ins.length;cnt()};
 $("#var-drawer",d).onclick=e=>{const b=e.target.closest("[data-insert-var]");if(!b)return;insAt(x,"{"+b.dataset.insertVar+"}");cnt()};
 const bl=$("#bl",d);
 bl.onclick=e=>{const r=e.target.closest(".br");if(!r)return;const m=node(id),i=+r.dataset.i;
  if(e.target.closest("[data-ed]")){const b=m.btns[i];openBtn(id,b.id,()=>{list();preview()})}
  else if(e.target.closest("[data-up]")&&i>0){mutate(()=>{[m.btns[i-1],m.btns[i]]=[m.btns[i],m.btns[i-1]]});list()}
  else if(e.target.closest("[data-dn]")&&i<m.btns.length-1){mutate(()=>{[m.btns[i+1],m.btns[i]]=[m.btns[i],m.btns[i+1]]});list()}};
 bl.ondragstart=e=>{const h=e.target.closest("[data-drag]");if(!h)return;e.dataTransfer.effectAllowed="move";e.dataTransfer.setData("text/plain",h.dataset.drag);h.closest(".br").classList.add("dragging")};
 bl.ondragend=e=>e.target.closest("[data-drag]")?.closest(".br")?.classList.remove("dragging");
 bl.ondragover=e=>{if(e.target.closest(".br")){e.preventDefault();e.dataTransfer.dropEffect="move"}};
 bl.ondrop=e=>{const row=e.target.closest(".br");if(!row)return;e.preventDefault();const from=+e.dataTransfer.getData("text/plain"),to=+row.dataset.i,m=node(id);if(!Number.isInteger(from)||from==to||!m.btns[from]||!m.btns[to])return;mutate(()=>{const [item]=m.btns.splice(from,1);m.btns.splice(to,0,item)});list()};
 bl.onchange=e=>{const inp=e.target.closest(".bli");if(!inp)return;const m=node(id),b=m.btns[+inp.closest(".br").dataset.i],v=inp.value.trim().slice(0,32)||"Button";inp.value=v;if(b&&v!=b.label){mutate(()=>{b.label=v});list()}};
 bl.onkeydown=enterBlur;t.onkeydown=enterBlur;
 $("#ab",d).onclick=()=>{const b=addBtn(id,"go");if(b){list();openBtn(id,b,()=>{list();preview()})}};
 $("#au",d).onclick=()=>{const b=addBtn(id,"url");if(b){list();openBtn(id,b,()=>{list();preview()})}};
 $("#screen-preview-keyboard",d).onclick=e=>{const b=e.target.closest("[data-preview-btn]");if(b)openBtn(id,b.dataset.previewBtn,()=>{list();preview()})};
 $("#ph",d).onclick=()=>photoInfo(node(id));
 $("#dp",d).onclick=()=>{if(S.flow.nodes.length>=MAXN)return toast("Maximum "+MAXN+" screens",1);const m=node(id),c=clone(m);c.id=uid();c.title=(m.title+" (copy)").slice(0,40);c.x+=40;c.y+=40;c.btns.forEach(b=>b.id=uid());mutate(()=>S.flow.nodes.push(c));toast("Copy created");closeSheet(d)};
 let arm=0;const dl=$("#dl",d);if(dl)dl.onclick=()=>{if(!arm){arm=1;dl.textContent="Delete for sure?";setTimeout(()=>{arm=0;dl.innerHTML=ic("trash")+" Delete screen"},3000);return}
  d._close=null;mutate(()=>{S.flow.nodes=S.flow.nodes.filter(m=>m.id!=id);S.flow.nodes.forEach(m=>m.btns.forEach(b=>{if(b.to==id)b.to=""}))});S.sel=null;closeSheet(d)};
 d._close=()=>{const m=node(id);if(!m)return;const title=t.value.trim().slice(0,40)||"Screen",text=x.value.trim()||"…";if(title!=m.title||text!=m.text||cols!=m.cols)mutate(()=>{m.title=title;m.text=text;m.cols=cols})}}

function openBtn(nid,bid,after){
 const n=node(nid),b=n?.btns.find(x=>x.id==bid);if(!b)return;
 const d=sheet(`${head("Button settings")}<div class="cd edit-section"><h3>Button label</h3><input id="a" type="text" maxlength="32" autocomplete="off" autocapitalize="sentences" enterkeyhint="done" placeholder="e.g. Open catalog"><div class="note editor-hint">The short label the user will see.</div></div>
 <div class="cd edit-section"><h3>Action</h3><div class="seg wide" id="k"><button data-k="go">Open screen</button><button data-k="url">Open link</button></div>
 <div id="g"><label>Where the button leads</label><select id="t"></select><div class="note editor-hint" id="action-hint"></div></div>
 <div id="u"><label>Link (https:// or tg://)</label><input id="v" type="text" inputmode="url" autocomplete="off" autocapitalize="none" spellcheck="false" enterkeyhint="done" placeholder="https://example.com"><div class="note editor-hint">Paste the full page address or a Telegram link.</div></div></div>
 <div class="acts2" style="margin-top:14px"><button class="ghost danger" id="del">${ic("trash")} Delete button</button><button class="main" data-x>Save</button></div>`);
 const A=$("#a",d),V=$("#v",d),T=$("#t",d);let kind=b.kind;A.value=b.label;V.value=b.value||"";
 T.innerHTML='<option value="">— not selected —</option>'+S.flow.nodes.map(m=>`<option value="${m.id}">${esc(m.title)}${m.id==S.flow.start?" (start)":""}</option>`).join("")+(S.flow.nodes.length<MAXN?'<option value="__new">+ Create a new screen</option>':"");
 T.value=b.to||"";
 const snap=JSON.stringify([b.label,b.kind,b.to||"",b.value||""]);
 const sync=()=>{$$("#k button",d).forEach(x=>x.classList.toggle("on",x.dataset.k==kind));$("#g",d).hidden=kind!="go";$("#u",d).hidden=kind!="url";$("#action-hint",d).textContent=T.value==="__new"?"A new empty screen will appear after saving — its text can be edited later.":T.value?"The user will go to the selected screen.":"Choose a screen or create a new one."};sync();T.onchange=sync;
 $("#k",d).onclick=e=>{const x=e.target.closest("[data-k]");if(x){kind=x.dataset.k;sync()}};
 A.onkeydown=enterBlur;V.onkeydown=enterBlur;
 $("#del",d).onclick=()=>{d._close=null;mutate(()=>{n.btns=n.btns.filter(x=>x!=b)});closeSheet(d);after?.()};
 d._close=()=>{const label=A.value.trim().slice(0,32)||"Button";let to=T.value,val=V.value.trim();
  if(kind=="url"&&val){if(/^http:\/\//i.test(val))val="https://"+val.slice(7);else if(!/^(https:\/\/|tg:\/\/)/i.test(val))val="https://"+val}
  if(to!="__new"&&JSON.stringify([label,kind,kind=="go"?to:"",kind=="url"?val:""])==snap){after?.();return}
  mutate(()=>{b.label=label;b.kind=kind;if(kind=="url"){b.value=val;delete b.to}else{if(to=="__new"){const id=uid();S.flow.nodes.push({id,title:"Screen",text:"Screen text",x:snapG(n.x+W+70),y:snapG(n.y),cols:1,btns:[]});to=id}b.to=to;delete b.value}});after?.()};}
function whyBad(b){if(!String(b.label||"").trim())return"add button text";if(b.kind=="url")return(!b.value||b.value=="https://"?"link is missing":"the link must start with https:// or tg://");if(b.kind!="go")return"unknown button type";return"choose the screen the button leads to"}
function openErrors(){const items=[];(S.flow?.nodes||[]).forEach(n=>n.btns.forEach(b=>{if(bad(b))items.push({n,b})}));
 const d=sheet(`${head("Button check")}<p class="note">These buttons are highlighted orange. Tap an item to open the button and fix it.</p><div class="bl">${items.map((x,i)=>`<div class="br bad" data-i="${i}" style="cursor:pointer"><span class="bi">${ic(x.b.kind=="url"?"link":"btn")}</span><div class="bm"><b>${esc(x.b.label)}</b><small style="white-space:normal">Screen “${esc(x.n.title)}” · ${whyBad(x.b)}</small></div><span class="mu">›</span></div>`).join("")||'<div class="empty">All buttons work</div>'}</div>`);
 d.addEventListener("click",e=>{const r=e.target.closest(".br");if(!r)return;const x=items[+r.dataset.i];if(!x)return;closeSheet(d);S.sel=x.n.id;markSel();setTimeout(()=>openBtn(x.n.id,x.b.id),230)})}
function photoInfo(n){
 const has=hasPhoto(n),onServer=S.bot?.flow.nodes.some(x=>x.id==n.id);
 const d=sheet(`${head("Screen photo")}<p>Screen: <b>${esc(n.title)}</b><br>Now: <b>${has?"photo uploaded":"no photo"}</b></p>
 <p class="note">For security reasons the app uploads nothing itself. The photo is sent to the bot in the chat — the right screen will open.</p>
 ${onServer?"":'<div class="banner" style="margin:0 0 10px">The screen is new: send the flow to the bot first.</div>'}
 <div class="acts2"><button class="main" id="go" ${onServer&&masterName()?"":"disabled"}>Upload photo in chat</button><button class="ghost" data-x>Close</button></div>`,{cls:"modal"});
 $("#go",d).onclick=()=>openTg(`https://t.me/${masterName()}?start=ph_${S.bot.id}_${n.id}`)}
function openTemplates(){
 const cards=TPL.map(t=>{const ns=buildTpl(t),bt=ns.reduce((a,n)=>a+n.btns.length,0);
  return`<div class="cd tplc"><div style="display:flex;gap:12px;align-items:center"><b style="color:var(--y)">${ic("box")}</b><div><b style="font-size:16px">${esc(t.name)}</b><div class="note">${esc(t.desc)}</div></div></div>
  <div style="margin:10px 0 4px"><span class="badge y">${ns.length} screens</span><span class="badge l">${bt} buttons</span><span class="badge">fully prebuilt</span></div>
  <div class="chips" style="margin:8px 0 12px">${t.items.map(i=>`<span class="chp">${esc(noEmo(i[0]))}</span>`).join("")}</div>
  <button class="main" data-ap="${t.k}" style="width:100%">Apply template</button></div>`}).join("");
 const d=sheet(`${head("Template")}<p class="note">A complete ready-made flow — no need to build from scratch. We'll ask for confirmation before replacing anything.</p>${cards}`);
  d.addEventListener("click",e=>{const b=e.target.closest("[data-ap]");if(!b||!S.flow)return;const t=TPL.find(x=>x.k==b.dataset.ap);
   const c=sheet(`${head("Replace the flow?")}<p>Warning: the current flow will be replaced with the “${esc(t.name)}” template. All your previous changes will be lost. Continue?</p><div class="acts2"><button class="ghost" data-x>Cancel</button><button class="main" id="okpl" style="background:var(--r);color:#fff">Continue</button></div>`,{cls:"modal"});
   $("#okpl",c).onclick=()=>{closeSheet(c);mutate(()=>{S.flow.nodes=buildTpl(t);S.flow.start="start"});S.sel=null;S.fitted=false;closeSheet(d);fit();hap("ok");toast("Template applied")}})}
function openBots(){
 const bs=S.sess.bots||[],lim=S.sess.limit||5;
 const list=bs.length?bs.map(b=>`<div class="bot-row ${b.id==S.bot?.id?"cur":""}" data-id="${b.id}"><span class="av">${esc((b.username||"?")[0].toUpperCase())}</span><span class="bn">@${esc(b.username)}<small>${nf(b.subs)} subscribers · ${b.running?"running":"stopped"}</small></span>${spark(b.stats.days.slice(-14).map(r=>r.dau),"#a9a8f8",70,26)}${b.id==S.bot?.id?'<b class="chk">'+ic("check")+'</b>':'<i class="dot '+(b.running?"on":"")+'"></i>'}</div>`).join("")
  :emptyCard();
 const add=`<div class="cd" style="margin-top:10px"><h3>Add a bot ${bs.length?`<small class="mu">${bs.length} / ${lim}</small>`:""}</h3><div class="note">1. Create a bot with @BotFather (/newbot)\n2. Send its token to the main bot\n3. Reopen the builder — the bot will appear in the list\n\nThe token is only ever sent in the chat with the main bot — that keeps it safe.</div>
  <button class="main" id="nb" style="width:100%;margin-top:12px">Open the builder chat</button></div>`;
 const d=sheet(`${head("Your bots")}${bs.length?`<div class="cd" style="padding:6px 10px">${list}</div>`:""}${bs.length?"":`<div style="margin-bottom:4px">${list}</div>`}${bs.length?add:""}`);
 d.addEventListener("click",e=>{const r=e.target.closest(".bot-row");if(r){if(r.dataset.id!=S.bot?.id){if(pendingList().length)toast("Draft saved on this device");openBot(r.dataset.id)}closeSheet(d);return}
  if(e.target.closest("#nb")||e.target.closest('[data-act="addbot"]')){closeSheet(d);openMaster()}})}
function openReview(){
 const p=pendingList(),e=errCount();
 const extra=S.post.trim()||S.del?'<div class="banner" style="margin:0 0 10px">'+(S.del?'The bot and its data will be deleted.':'The broadcast will be sent to subscribers.')+'</div>':'';
  const d=sheet(`${head("Review and apply")}<div class="cd">${p.map(x=>`<div class="line"><span>${esc(x)}</span><span class="dl up">${ic("check")}</span></div>`).join("")||'<div class="empty">No changes</div>'}</div>${extra}${e?`<div class="banner" style="margin:0">Check the buttons: ${e}</div>`:""}<p class="note">Confirm to send the settings to the selected bot.</p><div class="acts2"><button class="ghost danger" id="rs">Reset</button><button class="main" id="sn" ${e||!p.length?"disabled":""}>Apply</button></div>`);
 $("#sn",d).onclick=()=>{closeSheet(d);sendNow()};
 $("#rs",d).onclick=()=>{resetAll();closeSheet(d);toast("Changes reset")}}
function resetAll(){S.flow.nodes=clone(S.base);S.set={};S.post="";S.del=false;S.hist=[];S.fut=[];lsDel("bb3:"+S.bot.id);renderTab();ui()}
async function sendNow(){
 if(!S.bot)return;if(errCount()){go("flow");return toast("Check the buttons: "+errCount(),1)}
 if(!pendingList().length)return toast("Nothing to apply");
 if(S.nosess||S.expired)return toast("Open the builder via the bot",1);
 try{
  const nodes=flowDirty()?S.flow.nodes.map(n=>({...n,type:n.id==S.flow.start?"start":"screen"})):null;
  const ts=await fsCmd(S.bot.id,{nodes,set:Object.keys(S.set).length?S.set:null,post:S.post.trim(),del:S.del});
  toast("Sent to the bot. Waiting for confirmation…");
  let result=null;
  for(let i=0;i<12&&!result;i++){
   await new Promise(r=>setTimeout(r,800));
   try{const j=await fetchSess(S.token);S.sess=j;const a=j.cmd_result;if(Number(a?.ts)>=ts)result=a}catch{}
  }
  if(!result){showCommandResult(false,"The bot didn't confirm execution. Make sure the main bot is running, then try again. The draft is saved.");return}
  if(!result.ok){showCommandResult(false,result.message||"The bot rejected the changes. Check the flow and try again.");return}
  S.set={};S.post="";S.del=false;S.hist=[];S.fut=[];lsDel("bb3:"+S.bot.id);S.ut=null;await refresh();ui();showCommandResult(true,result.message||"Settings updated.");
 }catch(e){console.error(e);showCommandResult(false,"Couldn't send the changes: "+String(e?.message||"check your internet and Firestore rules").slice(0,220))}
}
function showCommandResult(ok,message){
 const canFix=!ok&&/screen|button|flow/i.test(message);
 const d=sheet(`${head(ok?"Changes applied":"Couldn't apply the changes")}<div class="cd"><p class="note" style="white-space:pre-line">${esc(message)}</p></div><div class="acts2"><button class="ghost" data-x>Close</button>${canFix?'<button class="main" id="fix-errors">Fix the flow</button>':""}</div>`,{cls:"modal"});
 $("#fix-errors",d)?.addEventListener("click",()=>{closeSheet(d);go("flow");openErrors()})
}
/* ============ Bot preview ============ */
function fmtHtml(t){
 const inl=s=>s.replace(/\[([^\]\n]{1,64})\]\((https:\/\/[^\s)<>"']{3,300}|tg:\/\/[^\s)<>"']{3,300})\)/g,'<span class="lk">$1</span>').replace(/\*\*(.+?)\*\*/gs,"<b>$1</b>").replace(/(^|[^\w_])__(.+?)__(?![\w_])/gs,"$1<i>$2</i>");
 return String(t||"").split(/(`[^`\n]+`)/).map(p=>/^`[^`\n]+`$/.test(p)?`<code>${esc(p.slice(1,-1))}</code>`:inl(esc(p))).join("")}


/* ============ Charts (pure SVG) ============ */
const C={y:"#e6ff3d",l:"#a9a8f8",o:"#ff6a2b",g:"#5dffb0",b:"#6fd3ff",r:"#ff5d6c"};
function mono(p){const n=p.length;if(n<2)return n?`M${p[0][0]} ${p[0][1]}`:"";
 const dx=[],m=[];for(let i=0;i<n-1;i++){dx[i]=p[i+1][0]-p[i][0]||1;m[i]=(p[i+1][1]-p[i][1])/dx[i]}
 const t=[m[0]];for(let i=1;i<n-1;i++)t[i]=m[i-1]*m[i]<=0?0:(m[i-1]+m[i])/2;t[n-1]=m[n-2];
 for(let i=0;i<n-1;i++){if(m[i]==0){t[i]=t[i+1]=0}else{const a=t[i]/m[i],b=t[i+1]/m[i],s=a*a+b*b;if(s>9){const k=3/Math.sqrt(s);t[i]=k*a*m[i];t[i+1]=k*b*m[i]}}}
 let d=`M${p[0][0]} ${p[0][1]}`;for(let i=0;i<n-1;i++){const h=dx[i]/3;d+=`C${p[i][0]+h} ${p[i][1]+t[i]*h} ${p[i+1][0]-h} ${p[i+1][1]-t[i+1]*h} ${p[i+1][0]} ${p[i+1][1]}`}return d}
function scaleMax(v){if(v<=4)return{max:4,step:1};const raw=v/4,p=10**Math.floor(Math.log10(raw)),f=raw/p,s=(f<=1?1:f<=2?2:f<=5?5:10)*p;return{max:s*4,step:s}}
const nfs=n=>n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e4?(n/1e3).toFixed(0)+"k":String(n);
function spark(vals,color,w=84,h=26){if(!vals.length)return"";const mx=Math.max(1,...vals),mn=Math.min(...vals),X=i=>vals.length<2?w/2:i*(w-4)/(vals.length-1)+2,Y=v=>h-3-(h-6)*((v-mn)/Math.max(1,mx-mn)),p=vals.map((v,i)=>[X(i),Y(v)]),d=mono(p),id="sp"+Math.random().toString(36).slice(2,6);
 return`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".35"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><path d="${d}L${X(vals.length-1)} ${h}L${X(0)} ${h}Z" fill="url(#${id})"/><path class="demo-line" pathLength="1" d="${d}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/></svg>`}
function drawLine(el,labels,series,h=210){
 const w=Math.max(240,el.clientWidth||340),pl=32,pr=8,pt=10,pb=22,n=labels.length;if(!n){el.innerHTML="";return}
 const mx=scaleMax(Math.max(1,...series.flatMap(s=>s.vals))),X=i=>pl+(n<2?(w-pl-pr)/2:i*(w-pl-pr)/(n-1)),Y=v=>pt+(h-pt-pb)*(1-v/mx.max);let g="",paths="",defs="";
 for(let k=0;k<=4;k++){const y=Y(k*mx.step);g+=`<line x1="${pl}" x2="${w-pr}" y1="${y}" y2="${y}" class="gl"/><text x="${pl-6}" y="${y+3}" text-anchor="end" class="ax">${nfs(k*mx.step)}</text>`}
 const every=Math.ceil(n/6);labels.forEach((l,i)=>{if((n-1-i)%every==0)g+=`<text x="${X(i)}" y="${h-6}" text-anchor="middle" class="ax">${l}</text>`});
 series.forEach((s,si)=>{const d=mono(s.vals.map((v,i)=>[X(i),Y(v)]));
  if(s.fill){const id="gr"+si+Math.random().toString(36).slice(2,6);defs+=`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.color}" stop-opacity=".4"/><stop offset="1" stop-color="${s.color}" stop-opacity="0"/></linearGradient>`;paths+=`<path d="${d}L${X(n-1)} ${Y(0)}L${X(0)} ${Y(0)}Z" fill="url(#${id})"/>`}
  paths+=`<path d="${d}" fill="none" stroke="${s.color}" stroke-width="${s.dash?1.6:2.6}" ${s.dash?'stroke-dasharray="4 4" opacity=".55"':'class="draw" pathLength="1"'} stroke-linecap="round" stroke-linejoin="round"/>`});
 const main=series.filter(s=>!s.dash);
 el.innerHTML=`<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${defs}</defs>${g}${paths}<g class="cur" style="display:none"><line y1="${pt}" y2="${h-pb}" class="cl"/>${main.map(s=>`<circle r="4.5" fill="${s.color}" stroke="#000" stroke-width="2"/>`).join("")}</g><rect x="${pl}" y="0" width="${w-pl-pr}" height="${h}" fill="transparent"/></svg><div class="tip" hidden></div>`;
 const sv=el.firstChild,cur=$(".cur",el),tip=$(".tip",el),dots=$$("circle",cur);
 const mv=e=>{const r=sv.getBoundingClientRect(),px=(e.clientX-r.left)*(w/r.width),i=clamp(Math.round((px-pl)/((w-pl-pr)/Math.max(1,n-1))),0,n-1),x=X(i);cur.style.display="";const ln=$("line",cur);ln.setAttribute("x1",x);ln.setAttribute("x2",x);
  dots.forEach((c,k)=>{c.setAttribute("cx",x);c.setAttribute("cy",Y(main[k].vals[i]))});tip.hidden=false;
  tip.innerHTML=`<b>${labels[i]}</b>`+series.map(s=>`<div><i style="background:${s.color}"></i>${esc(s.name)} <b>${nf(s.vals[i])}</b></div>`).join("");
  const tw=tip.offsetWidth;tip.style.left=clamp(x*(r.width/w)-tw/2,0,Math.max(0,r.width-tw))+"px"};
 sv.addEventListener("pointermove",mv);sv.addEventListener("pointerdown",mv);sv.addEventListener("pointerleave",()=>{cur.style.display="none";tip.hidden=true})}
function drawBars(el,vals,labels,o={}){
 const w=Math.max(240,el.clientWidth||340),h=o.h||150,pl=28,pr=4,pt=12,pb=20,n=vals.length;if(!n){el.innerHTML="";return}
 const mx=scaleMax(Math.max(1,...vals)),bw=(w-pl-pr)/n,gap=Math.min(6,bw*.28),pk=vals.indexOf(Math.max(...vals)),Y=v=>pt+(h-pt-pb)*(1-v/mx.max);let g="",b="";
 for(let k=0;k<=4;k+=2){const y=Y(k*mx.step);g+=`<line x1="${pl}" x2="${w-pr}" y1="${y}" y2="${y}" class="gl"/><text x="${pl-6}" y="${y+3}" text-anchor="end" class="ax">${nfs(k*mx.step)}</text>`}
 const every=Math.ceil(n/(o.ticks||8));
 vals.forEach((v,i)=>{const x=pl+i*bw+gap/2,hh=Math.max(v?2:0,(h-pb-pt)*v/mx.max);b+=`<rect class="bar" style="--d:${i*14}ms" x="${x}" y="${h-pb-hh}" width="${Math.max(2,bw-gap)}" height="${hh}" rx="${Math.min(5,(bw-gap)/2)}" fill="${i==pk&&v>0?(o.hi||C.y):(o.color||C.l)}" opacity="${i==pk&&v>0?1:.6}"/>`;
  if(i%every==0)g+=`<text x="${x+(bw-gap)/2}" y="${h-5}" text-anchor="middle" class="ax">${labels[i]}</text>`});
 el.innerHTML=`<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${g}${b}<rect x="${pl}" y="0" width="${w-pl-pr}" height="${h}" fill="transparent"/></svg><div class="tip" hidden></div>`;
 const sv=el.firstChild,tip=$(".tip",el),mv=e=>{const r=sv.getBoundingClientRect(),px=(e.clientX-r.left)*(w/r.width),i=clamp(Math.floor((px-pl)/bw),0,n-1);tip.hidden=false;tip.innerHTML=`<b>${labels[i]}</b><div>${o.unit||""}<b>${nf(vals[i])}</b></div>`;const tw=tip.offsetWidth;tip.style.left=clamp((pl+i*bw+bw/2)*(r.width/w)-tw/2,0,Math.max(0,r.width-tw))+"px"};
 sv.addEventListener("pointermove",mv);sv.addEventListener("pointerdown",mv);sv.addEventListener("pointerleave",()=>tip.hidden=true)}
function donut(parts,total,center,sub){const R=46,L=2*Math.PI*R;let off=0;
 return`<svg viewBox="0 0 120 120" class="donut"><circle cx="60" cy="60" r="${R}" fill="none" stroke="#ffffff12" stroke-width="12"/>${parts.map(p=>{const len=total?p.v/total*L:0,s=`<circle cx="60" cy="60" r="${R}" fill="none" stroke="${p.c}" stroke-width="12" stroke-dasharray="${Math.max(0,len-1.5)} ${L-Math.max(0,len-1.5)}" stroke-dashoffset="${-off}" transform="rotate(-90 60 60)"/>`;off+=len;return s}).join("")}<text x="60" y="61" text-anchor="middle" class="dv">${center}</text><text x="60" y="76" text-anchor="middle" class="ds">${sub}</text></svg>`}
function ring(pct,color,label,sub){const R=34,L=2*Math.PI*R,v=clamp(pct,0,100)/100*L;
 return`<div style="text-align:center"><svg viewBox="0 0 90 90" width="88" height="88"><circle cx="45" cy="45" r="${R}" fill="none" stroke="#ffffff12" stroke-width="9"/><circle cx="45" cy="45" r="${R}" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round" stroke-dasharray="${v} ${L}" transform="rotate(-90 45 45)"/><text x="45" y="50" text-anchor="middle" style="font:700 17px 'Space Grotesk';fill:#fff">${Math.round(pct)}%</text></svg><div class="m">${label}</div><div class="mu" style="text-transform:none">${sub}</div></div>`}

/* ============ Statistics ============ */
const dl=d=>{const[,m,dd]=d.split("-");return m+"/"+dd};
const delta=(c,p)=>p==null||p<=0?null:(c-p)/p*100;
const chip=v=>v==null?'<span class="dl">—</span>':`<span class="dl ${v>=0?"up":"dn"}">${v>=0?"▲":"▼"} ${Math.abs(Math.round(v))}%</span>`;
function nodeViews(rows){const m={};rows.forEach(r=>{for(const k in r.n||{})m[k]=(m[k]||0)+r.n[k]});return m}
function renderLockedStats(el,src){
 const summary=src.stats?.summary||{},range=[7,14,30].includes(+S.demoRange)?+S.demoRange:14;
 const metrics=[["Subscribers",src.subs,"now"],["Active today",summary.dau||0,"today"],["Screen views",summary.views||0,"in 30 days"],["New users",summary.new||0,"in 30 days"]];
 const base=[
  ["Activity by day",[8,12,10,19,16,25,22,31,27,36,32,39,35,43,40,48,45,53,49,58,54,62,60,68,64,72,69,77,73,82],C.l],
  ["Screen views",[5,9,8,14,12,18,17,24,21,30,27,34,32,39,35,42,40,47,43,51,48,56,53,61,57,65,62,70,66,75],C.y],
  ["New users",[2,4,3,7,5,9,8,12,10,15,13,17,15,20,17,22,20,25,23,28,25,30,28,33,30,35,33,38,35,41],C.g],
  ["Audience",[6,7,9,8,12,14,13,17,19,22,21,24,26,25,29,31,34,33,37,39,42,41,45,48,47,51,54,53,57,60],C.b]
 ];
 const demo=base.map(([label,all,color])=>[label,all.slice(-range),color]);
 const dateAt=ago=>{const d=new Date();d.setDate(d.getDate()-ago);return d.toLocaleDateString("en-US",{day:"2-digit",month:"short"})};
 el.innerHTML=`<div class="wrap">
  <div class="stats-account"><div><div class="m mu">Bot statistics</div><b>@${esc(src.username)}</b></div><span class="stats-status"><i class="dot ${src.running?"on":""}"></i>${src.running?"Running":"Stopped"}</span></div>
  <div class="kpis stats-kpis">${metrics.map(([label,value,period])=>`<div class="kpi"><div class="mu">${label}</div><div class="kv">${nf(value)}</div><div class="mu ks">${period}</div></div>`).join("")}</div>
  <div class="stats-preview-head"><div><h3>Charts and trends</h3><div class="note">${S.statsDemo?`Demo · ${dateAt(range-1)} — ${dateAt(0)}`:"Open the demo or get full access with a plan"}</div></div><span class="badge l">PRO · BUSINESS</span></div>
  ${S.statsDemo?`<div class="demo-range-bar"><span>Chart period</span><div class="seg">${[7,14,30].map(n=>`<button data-act="demorange" data-v="${n}" class="${range==n?"on":""}">${n} days</button>`).join("")}</div></div>`:""}
  <div class="stats-gate ${S.statsDemo?"demo-on":""}"><div class="stats-sample">${demo.map(([label,values,color])=>`<div class="cd demo-chart"><div class="demo-chart-head"><b>${label}</b><span class="badge">DEMO</span></div><strong>${nf(values[values.length-1])}</strong><div class="demo-spark">${spark(values,color,280,74)}</div><div class="demo-date-row"><span>${dateAt(range-1)}</span><span>${dateAt(0)}</span></div></div>`).join("")}</div>
   ${S.statsDemo?"":`<div class="stats-lock-overlay"><div class="cd stats-lock-card"><div class="big">${ic("chart")}</div><span class="badge l">PRO · BUSINESS</span><h3>Unlock full statistics</h3><p class="note">Charts of activity, views, audience and broadcasts are available on the Pro and Business plans.</p><button class="main" data-act="plans">Upgrade plan</button></div></div>`}
  </div>
  ${S.statsDemo?`<div class="cd demo-note"><div class="note">These are demo values for the selected period. Real charts and audience statistics are available on the Pro and Business plans.</div><button class="main" data-act="plans" style="width:100%;margin-top:12px">Upgrade plan</button></div>`:`<button class="ghost" data-act="statdemo">${ic("play")} Show chart demo</button>`}
 </div>`
}
function renderStats(){
 const el=$("#v-stats"),src=statSrc();S.draw=[];
 if(!src){el.innerHTML=`<div class="wrap">${emptyCard()}</div>`;return}
 if(src.locked){renderLockedStats(el,src);return}
 const st=src.stats||{days:[],aud:{total:0,active:0,unsub:0,blocked:0},ret:{d1:{base:0,ok:0},d7:{base:0,ok:0}},posts:[]},days=st.days,R=S.range,rows=days.slice(-R),prev=days.length>=2*R?days.slice(-2*R,-R):null,last=days[days.length-1]||{};
 const empty=!st.aud.total&&!sum(days,"views");
 const pv=k=>prev&&sum(prev,k)>0?sum(prev,k):null;
 let run=src.subs;const subSeries=rows.map(()=>0);for(let i=rows.length-1;i>=0;i--){subSeries[i]=Math.max(0,run);run-=rows[i].new}
 const vpu=sum(rows,"dau")?sum(rows,"views")/sum(rows,"dau"):0,vpuP=prev&&sum(prev,"dau")?sum(prev,"views")/sum(prev,"dau"):null;
 const K=[["Subscribers",src.subs,null,`+${nf(sum(rows,"new"))} in ${R} days`,subSeries,C.y],
  ["Active today",last.dau||0,delta(avg(rows,"dau"),prev?avg(prev,"dau"):null),`avg ${avg(rows,"dau").toFixed(1)}`,rows.map(r=>r.dau),C.l],
  ["Screen views",sum(rows,"views"),delta(sum(rows,"views"),pv("views")),`in ${R} days`,rows.map(r=>r.views),C.o],
  ["New users",sum(rows,"new"),delta(sum(rows,"new"),pv("new")),`in ${R} days`,rows.map(r=>r.new),C.g],];
 const M={dau:["Active",C.l,"dau"],new:["New",C.g,"new"],views:["Views",C.o,"views"],support:["Support",C.r,"support"]},mm=M[S.metric];
 const labels=rows.map(r=>dl(r.d));
 const off=Math.round(-new Date().getTimezoneOffset()/60),hours=Array(24).fill(0);rows.forEach(r=>(r.h||[]).forEach((v,h)=>hours[(h+off+24)%24]+=v));
 const hp=hours.indexOf(Math.max(...hours));
 const wd=[0,0,0,0,0,0,0],wc=[0,0,0,0,0,0,0];rows.forEach(r=>{const k=(new Date(r.d+"T00:00:00Z").getUTCDay()+6)%7;wd[k]+=r.dau;wc[k]++});const wavg=wd.map((v,i)=>wc[i]?+(v/wc[i]).toFixed(1):0);
 const nv=nodeViews(rows),tot=Object.values(nv).reduce((a,x)=>a+x,0),top=Object.entries(nv).sort((a,b)=>b[1]-a[1]).slice(0,8),title=id=>src.nodes.find(n=>n.id==id)?.title||"(deleted)";
 const A=st.aud,r1=st.ret.d1,r7=st.ret.d7,p1=r1.base?r1.ok/r1.base*100:0,p7=r7.base?r7.ok/r7.base*100:0;
 el.innerHTML=`<div class="wrap">
 <div class="seg wide sticky" id="rng">${[7,14,30].map(x=>`<button data-act="range" data-v="${x}" class="${R==x?"on":""}">${x} days</button>`).join("")}</div>
  <div><div class="m mu">Live statistics</div><b style="font-size:20px">@${esc(src.username)}</b></div>
 ${empty?`<div class="cd hero"><div class="big">${ic("chart")}</div><h3>No data yet</h3><div class="note">Start the bot and press /start — the charts will fill in as users interact.</div></div>`:""}
 <div class="kpis">${K.map(k=>`<div class="kpi"><div class="mu">${k[0]}</div><div class="kv cu" data-v="${k[1]}">0</div><div class="kd">${chip(k[2])}</div><div class="mu ks" style="text-transform:none">${k[3]}</div></div>`).join("")}</div>
 <div class="cd"><h3>Trend <small class="mu">last ${R} days</small></h3>
  <div class="chips" style="margin-bottom:10px">${Object.entries(M).map(([k,v])=>`<button class="chp ${S.metric==k?"on":""}" data-act="metric" data-v="${k}">${v[0]}</button>`).join("")}</div>
  <div class="ch" id="c-main"></div></div>
 <div class="row2"><div class="cd"><h3>Audience</h3><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">${donut([{v:A.active,c:C.g},{v:A.unsub,c:C.l},{v:A.blocked,c:C.r}],A.total,nf(A.total),"total")}<div class="hb" style="gap:6px;font-size:12.5px"><div><i class="dot" style="display:inline-block;background:${C.g};margin-right:6px"></i>Active <b>${nf(A.active)}</b></div><div><i class="dot" style="display:inline-block;background:${C.l};margin-right:6px"></i>Unsubscribed <b>${nf(A.unsub)}</b></div><div><i class="dot" style="display:inline-block;background:${C.r};margin-right:6px"></i>Blocked <b>${nf(A.blocked)}</b></div></div></div></div>
 <div class="cd"><h3>Retention</h3><div style="display:flex;justify-content:space-around;gap:6px">${ring(p1,C.y,"Day 1",`of ${nf(r1.base)}`)}${ring(p7,C.l,"Day 7",`of ${nf(r7.base)}`)}</div></div></div>
 <div class="cd"><h3>Top screens <small class="mu">${nf(tot)} views</small></h3>${top.length?`<div class="hb">${top.map(([id,v])=>`<div class="hbr"><div class="hbt"><span>${esc(title(id))}</span><span class="mu">${nf(v)} · ${tot?Math.round(v/tot*100):0}%</span></div><div class="hbl"><i data-w="${v/top[0][1]*100}"></i></div></div>`).join("")}</div>`:'<div class="empty">No views yet</div>'}</div>
 <div class="cd"><h3>Activity hours <small class="mu">${hours.some(Boolean)?"peak "+String(hp).padStart(2,"0")+":00":""}</small></h3><div class="ch" id="c-hours"></div></div>
  <div class="cd"><h3>Activity by weekday</h3><div class="ch" id="c-wd"></div></div>
 <div class="cd"><h3>Broadcasts</h3>${st.posts.length?`<div class="plist">${st.posts.slice().reverse().map(p=>{const t=p.sent+p.failed;return`<div class="pit"><div><b>${nf(p.sent)}</b> delivered<div class="mu" style="text-transform:none">${new Date(p.at).toLocaleString("en-US",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})}</div></div><span class="dl ${p.failed/(t||1)>.1?"dn":"up"}">${t?Math.round(p.sent/t*100):0}%</span></div>`}).join("")}</div>`:'<div class="empty">No broadcasts yet. Send your first one from the “Bot” tab.</div>'}</div>
 </div>`;
 S.draw.push(()=>{const e=$("#c-main");if(e){const ser=[{name:mm[0],color:mm[1],vals:rows.map(r=>r[mm[2]]||0),fill:true}];if(S.cmp&&prev)ser.push({name:"Previous period",color:"#ffffff",vals:prev.map(r=>r[mm[2]]||0),dash:true});drawLine(e,labels,ser)}
  const h=$("#c-hours");if(h)drawBars(h,hours,hours.map((_,i)=>String(i).padStart(2,"0")),{color:C.l,hi:C.y,h:150,ticks:8,unit:"events: "});
  const w=$("#c-wd");if(w)drawBars(w,wavg,["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],{color:C.b,hi:C.g,h:140,ticks:7,unit:"active: "})});
 drawCharts();animateNums(el);requestAnimationFrame(()=>$$(".hbl i",el).forEach(i=>i.style.width=i.dataset.w+"%"))}
function drawCharts(){S.draw.forEach(f=>{try{f()}catch(e){console.error(e)}})}
function animateNums(root){$$(".cu",root).forEach(e=>{const v=+e.dataset.v,f=!Number.isInteger(v);if(!PREF.anim||v==0){e.textContent=f?v.toFixed(1):nf(v);return}const t0=performance.now();const tick=t=>{const k=Math.min(1,(t-t0)/700),e1=1-Math.pow(1-k,3),x=v*e1;e.textContent=f?x.toFixed(1):nf(Math.round(x));if(k<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)})}

/* ============ “Bot” tab ============ */
function renderBot(){
 const el=$("#v-bot"),b=S.bot;if(!b){el.innerHTML=emptyHtml();return}
 const sup=eff("support"),fb=eff("fallback"),run=!!b.running,bz=!!(S.busy&&S.busy.id==b.id),shown=bz?S.busy.target:run,err=S.runErr&&S.runErr.id==b.id?S.runErr.t:"";
 el.innerHTML=`<div class="wrap">
  ${S.del?`<div class="cd" style="border-color:var(--r)"><h3>Deletion scheduled</h3><div class="note">The bot will be deleted after confirmation.</div><button class="ghost danger" data-act="undel" style="margin-top:10px;width:100%">Cancel deletion</button></div>`:""}
 <div class="cd runhero"><div class="prof"><span class="av" style="width:52px;height:52px;font-size:22px">${esc((b.username||"?")[0].toUpperCase())}</span><div style="flex:1;min-width:0"><b style="font-size:17px" class="ell">${esc(b.name||b.username)}</b><div class="mu" style="text-transform:none">@${esc(b.username)} · ${nf(b.subs)} subscribers</div><div class="rst"><i class="dot ${shown?"on":""}"></i><span>${bz?(S.busy.target?"Starting…":"Stopping…"):run?"Running and answering users":"Stopped and not responding"}</span></div></div></div>
  <button class="runbtn ${run?"stop":"go"}" data-act="toggle" ${bz?"disabled":""}>${bz?'<i class="spin"></i>'+(S.busy.target?"Starting…":"Stopping…"):run?"Stop the bot":"Start the bot"}</button>
  ${err?`<div class="banner" style="margin:12px 0 0;white-space:pre-line">${esc(err)}</div>`:""}
  <button class="ghost" data-act="copylink" style="width:100%;margin-top:12px">Copy bot link</button></div>
  <div class="cd"><h3>Bot settings</h3>
   <div class="line"><div>Feedback<small>The “Contact us” button and the /support command</small></div><label class="sw" style="margin:0"><input type="checkbox" id="sw-support" ${sup?"checked":""}><i></i></label></div>
   <div class="line"><div style="min-width:0;flex:1">Reply to unknown messages<small>${esc(fb||"Using the default reply")}</small></div><button class="ghost" data-act="editfallback">Edit</button></div>
  </div>
  <div class="cd"><h3>Broadcast <small class="mu">${nf(b.subs)} recipients</small></h3><div class="note">Compose a separate message and review it before sending.</div><button class="main" data-act="editpost" style="width:100%;margin-top:12px">${S.post.trim()?"Open broadcast draft":"Create broadcast"}</button></div>
  <details class="cd"><summary>Advanced</summary><div class="acts2" style="margin-bottom:10px"><button class="ghost" data-act="welcome">Welcome message</button><button class="ghost" data-act="vars">Variables</button></div><div class="note">The bot token is changed in the chat with the main bot: “My bots” → pick the bot → “Replace token”.</div><button class="ghost danger" data-act="delbot" style="width:100%;margin-top:12px">Delete the bot</button></details>
 </div>`}
function editFallback(){
 if(!S.bot)return;
 const value=String(eff("fallback")||"");
 const d=sheet(`${head("Reply to unknown messages")}<div class="cd"><p class="note">The bot will send this text when a user writes a message that has no matching button or dedicated scenario.</p><label for="fallback-edit">Reply text</label><input id="fallback-edit" type="text" maxlength="300" value="${esc(value)}" placeholder="e.g. Pick an option in the menu below"></div><div class="acts2"><button class="ghost" data-x>Cancel</button><button class="main" id="fallback-save">Save</button></div>`,{cls:"modal"});
 $("#fallback-save",d).onclick=()=>{const v=$("#fallback-edit",d).value.trim().slice(0,300)||"Use the menu buttons or the /menu command.";setVal("fallback",v);closeSheet(d);renderBot();ui();toast("Reply saved to draft")}
}
function editBroadcast(){
 if(!S.bot)return;
 const d=sheet(`${head("Broadcast")}<div class="cd"><div class="note">The text will be sent to active subscribers after the changes are applied. Use the /post command in the bot for photos and videos.</div><label for="post-edit">Message text <span id="post-count">${S.post.length}/4000</span></label><textarea id="post-edit" maxlength="4000" placeholder="Write a message for subscribers">${esc(S.post)}</textarea><div class="kb" style="margin-top:12px"><div class="bub" id="post-preview">${esc(S.post||"Broadcast preview")}</div></div></div><div class="acts2"><button class="ghost" data-x>Cancel</button><button class="main" id="post-save">Save draft</button></div>`,{cls:"modal"});
 const input=$("#post-edit",d),count=$("#post-count",d),preview=$("#post-preview",d);
 input.addEventListener("input",()=>{count.textContent=input.value.length+"/4000";preview.textContent=input.value||"Broadcast preview";preview.style.opacity=input.value?"1":".55"});
 $("#post-save",d).onclick=()=>{S.post=input.value.trim().slice(0,4000);saveDraftSoon();closeSheet(d);renderBot();ui();toast(S.post?"Broadcast draft saved":"Broadcast draft cleared")}
}

/* ============ Profile ============ */
function tgUser(){let u=tg?.initDataUnsafe?.user;if(!u?.id&&tg?.initData){try{u=JSON.parse(new URLSearchParams(tg.initData).get("user")||"null")}catch{}}
 if(u?.id){lsSet("bb3:user",u);return u}return lsGet("bb3:user")||{first_name:"User",id:S.sess.uid}}
function renderMe(){
 const el=$("#v-me"),u=tgUser(),name=[u.first_name,u.last_name].filter(Boolean).join(" ")||"User",bs=S.sess.bots||[],lim=S.sess.limit||5;
 const plan=S.sess.plan||"free",planName={free:"Free",pro:"Pro",biz:"Business"}[plan]||String(plan).toUpperCase(),ref=S.sess.ref||{},refN=+ref.count||0,stars=+ref.stars||0,invited=Array.isArray(ref.invited)?ref.invited:[],invitedTotal=Math.max(refN,invited.length);
 const end=S.sess.plan_until?new Date(S.sess.plan_until):null,until=end&&!Number.isNaN(+end)?end.toLocaleDateString("en-US"):"";
 el.innerHTML=`<div class="wrap">
 <div class="cd"><div class="prof"><span class="av" style="width:52px;height:52px;font-size:22px">${esc((name||"?")[0].toUpperCase())}${u.photo_url?`<img src="${esc(u.photo_url)}" alt="" referrerpolicy="no-referrer" onerror="this.remove()">`:""}</span><div style="flex:1;min-width:0"><b style="font-size:18px" class="ell">${esc(name)}</b><div class="mu" style="text-transform:none;margin-top:3px">${u.id?"ID "+esc(u.id)+" · ":""}${esc(planName)}${until?" · until "+until:""}</div></div></div>
  <div class="profile-metrics"><div><span class="mu">MY BOTS</span><b>${nf(bs.length)} <small>/ ${nf(lim)}</small></b></div><div><span class="mu">STARS BALANCE</span><b>${STAR_ICON}${nf(stars)}</b></div></div></div>

 <button class="cd premium-mini" data-act="plans"><span class="premium-gem"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 2.7 6.1L21 11l-6.3 2.9L12 20l-2.7-6.1L3 11l6.3-2.9L12 2Z"/><path d="m19 15 1.2 2.8L23 19l-2.8 1.2L19 23l-1.2-2.8L15 19l2.8-1.2Z"/></svg></span><span class="premium-copy"><b>Buy premium</b><small>Current plan: ${esc(planName)}</small></span><span class="premium-arrow">›</span></button>
 <button class="cd referral-mini" data-act="ref"><span class="ref-gem"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 2 18.5V20M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM16 11a3.5 3.5 0 1 0 0-7M17 14h.5a4.5 4.5 0 0 1 4.5 4.5V20"/></svg></span><span class="ref-copy"><b>Referrals</b><small><span>Invited ${nf(invitedTotal)} · earned</span><span class="ref-earned">${starIcon("tiny")}<b>${nf(stars)}</b></span></small></span><span class="premium-arrow">›</span></button>
 <div class="cd"><h3>My bots <small class="mu">${bs.length} of ${lim}</small></h3>${bs.map(b=>{const bz=!!(S.busy&&S.busy.id==b.id),on=bz?S.busy.target:!!b.running;return`<div class="bot-row ${b.id==S.bot?.id?"cur":""}"><span class="av" data-act="pickbot" data-id="${b.id}">${esc((b.username||"?")[0].toUpperCase())}</span><span class="bn" data-act="pickbot" data-id="${b.id}">@${esc(b.username)}<small>${bz?(S.busy.target?"starting…":"stopping…"):b.running?"running":"stopped"} · ${nf(b.subs)} subscribers</small></span><span class="sww">${bz?'<i class="spin" style="margin:0"></i>':""}<label class="sw" style="margin:0" title="${on?"Stop":"Start"}"><input type="checkbox" data-act="tgbot" data-id="${b.id}" ${on?"checked":""} ${S.busy?"disabled":""}><i></i></label></span></div>`}).join("")||'<div class="empty">No bots yet</div>'}<button class="ghost" data-act="addbot" style="margin-top:10px;width:100%">Add a bot</button></div>
 <button class="cd menurow" data-act="settings">Settings & help <span>›</span></button><button class="cd menurow language-row" data-act="language"><span class="lang-symbol">${ic("globe")}</span><span class="lang-copy"><b>Русская версия</b><small>Open the Russian version</small></span><span class="lang-arrow">↗</span></button></div>`}
function openSettings(){
 sheet(`${head("Settings & help")}
 <div class="cd"><h3>Interface <small class="mu">on this device only</small></h3>${[["haptic","Haptic feedback","short tactile signals"],["snap","Snap to grid","screens align as you move them"],["anim","Animations","smooth charts and transitions"]].map(x=>`<div class="line"><div>${x[1]}<small>${x[2]}</small></div><label class="sw" style="margin:0"><input type="checkbox" data-pref="${x[0]}" ${PREF[x[0]]?"checked":""}><i></i></label></div>`).join("")}</div>
 <div class="cd"><h3>Help</h3>
  <div class="step"><b>1</b><div>You assemble the flow and settings here. Starting and stopping the bot works instantly.</div></div>
  <div class="step"><b>2</b><div>After edits, tap “Apply” to send the flow and settings to the bot.</div></div>
  <div class="step"><b>3</b><div>Screen photos are added in the chat with the bot (the camera icon on a screen).</div></div>
  <button class="main bigbtn" data-act="tour">Open tutorial</button></div>`)}

/* ============ Header, tabs, UI ============ */
function renderTop(){const b=S.bot;$("#bav").textContent=b?(b.username||"?")[0].toUpperCase():"+";
 $("#bname").textContent=b?"@"+b.username:(S.expired?"check the connection":S.nosess?"open via Telegram":"add a bot");$("#bdot").className="dot "+(b?.running?"on":"")}
function renderTab(){
 $$(".view").forEach(v=>v.classList.toggle("on",v.id=="v-"+S.tab));$$(".tb").forEach(t=>t.classList.toggle("on",t.dataset.tab==S.tab));
 if(S.tab=="flow"){renderFlow();if(!S.fitted)requestAnimationFrame(fit)}else if(S.tab=="stats")renderStats();else if(S.tab=="bot")renderBot();else renderMe()}
function go(tab){if(S.tab=="stats"&&tab!="stats"){S.statsDemo=false;S.demoRange=14}S.tab=tab;hap();renderTab();ui()}
function ui(){
 const p=pendingList(),f=$("#fab");f.hidden=!p.length||S.tab!="flow";f.classList.toggle("mini",S.tab=="flow");$("b",f).textContent=p.length;
 const e=errCount();$("#err").hidden=!e;$("#err").textContent="Check buttons · "+e;
 const cc=!!p.length;if(S.cc!==cc){S.cc=cc;try{cc?tg?.enableClosingConfirmation?.():tg?.disableClosingConfirmation?.()}catch{}}
  const ex=$("#exp");if(ex)ex.hidden=true}

document.addEventListener("click",e=>{const a=e.target.closest("[data-act]");if(!a)return;const v=a.dataset.v;
 switch(a.dataset.act){
  case"toggle":toggleBot();break;
   case"tgbot":toggleBot(a.dataset.id);break;
   case"settings":openSettings();break;
  case"language":routeRussian();break;
  case"tour":openTour(true);break;
   case"plans":openPlans();break;
   case"ref":openRef();break;
   case"refshare":shareRef();break;
   case"refcopy":navigator.clipboard?.writeText(refLink()).then(()=>toast("Link copied"),()=>toast("Couldn't copy",1));break;
  case"welcome":S.flow?openWelcome():toast("Add a bot first");break;
  case"vars":openVars();break;
  case"range":S.range=+v;renderStats();break;
  case"metric":S.metric=v;renderStats();break;
  case"cmp":S.cmp=!S.cmp;renderStats();break;
   case"statdemo":S.statsDemo=!S.statsDemo;renderStats();break;
   case"demorange":S.demoRange=+v;renderStats();break;
  case"pickbot":openBot(a.dataset.id);break;
  case"addbot":openMaster();break;
  case"copylink":navigator.clipboard?.writeText("https://t.me/"+S.bot.username).then(()=>toast("Link copied"),()=>toast("Couldn't copy",1));break;
  case"editfallback":editFallback();break;
  case"editpost":editBroadcast();break;
  case"clrpost":S.post="";saveDraftSoon();renderBot();ui();break;
  case"undel":S.del=false;saveDraftSoon();renderBot();ui();break;
  case"delbot":{const d=sheet(`${head("Delete the bot?")}<p>The flow, photos and statistics of @${esc(S.bot.username)} will be deleted. This action cannot be undone. The bot will ask for confirmation in the chat.</p><div class="acts2"><button class="ghost" data-x>No</button><button class="main" style="background:var(--r);color:#fff" id="yes">Delete</button></div>`,{cls:"modal"});$("#yes",d).onclick=()=>{S.del=true;saveDraftSoon();closeSheet(d);renderBot();ui()};break}
  case"cleardrafts":Object.keys(localStorage).filter(k=>k.startsWith("bb3:")&&!["bb3:prefs","bb3:last","bb3:demo","bb3:master","bb3:language"].includes(k)).forEach(k=>lsDel(k));toast("Drafts cleared");break}});
document.addEventListener("change",e=>{const t=e.target;
 if(t.id=="sw-active"){setVal("active",t.checked);renderBot()}else if(t.id=="sw-support"){setVal("support",t.checked);renderBot()}
 else if(t.dataset?.pref){PREF[t.dataset.pref]=t.checked;lsSet("bb3:prefs",PREF);applyPrefs()}});
$$(".tb").forEach(b=>b.onclick=()=>go(b.dataset.tab));
$("#err").onclick=openErrors;
$("#botbtn").onclick=()=>{hap();openBots()};
$("#fab").onclick=()=>{hap();openReview()};
$("#undo").onclick=undo;$("#redo").onclick=redo;$("#fit").onclick=fit;
$("#lay").onclick=()=>{if(!S.flow)return;mutate(()=>layout(S.flow.nodes,S.flow.start));fit();hap()};
$("#heat").onclick=()=>{if(!S.flow)return;S.heat=!S.heat;if(S.heat&&!Object.keys(S.heatMap).length)toast("No view data yet");renderFlow()};
$("#pvb").onclick=()=>S.flow&&openPreview(S.flow.start);
$$(".tools button[data-z]").forEach(b=>b.onclick=()=>zoomTo(S.view.k*(b.dataset.z=="1"?1.2:1/1.2)));
addEventListener("keydown",e=>{if(stack.length||S.tab!="flow"||/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||""))return;
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()=="z"){e.preventDefault();e.shiftKey?redo():undo()}else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()=="y"){e.preventDefault();redo()}});
let rz;addEventListener("resize",()=>{applyView();clearTimeout(rz);rz=setTimeout(()=>{if(S.tab=="stats")drawCharts()},150)});
setInterval(ui,1000);
setInterval(refresh,30000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)refresh()});
if(tg){tg.ready();tg.expand();tg.disableVerticalSwipes?.();tg.setHeaderColor?.("#070708");tg.setBackgroundColor?.("#070708");try{if(tg.isVersionAtLeast?.("8.0")&&!tg.isFullscreen)tg.requestFullscreen()}catch{}}
$$("[data-ic]").forEach(e=>e.innerHTML=ic(e.dataset.ic));addEventListener("keydown",e=>{if(e.key=="Escape"&&stack.length)closeSheet(stack[stack.length-1])});
/* ================= v2.4 ================= */
/* ---- Variables in screen texts ---- */
const VARS=[["first_name","First name","John"],["last_name","Last name","Smith"],["full_name","Full name","John Smith"],["username","@username (falls back to the name)","@john"],["user_id","User ID","123456789"],["bot_name","Bot name","My bot"],["bot_username","Bot @username","@my_bot"],["date","Today's date","10/18/2026"],["time","Current time","14:30"]];
const VAR_RE=/\{([a-z_]{2,16})(?:\|([^{}\n]{0,30}))?\}/gi;
function varMap(){const u=tgUser(),b=S.bot||{},d=new Date(),p=n=>String(n).padStart(2,"0"),f=u.first_name||"John";
 return{first_name:f,last_name:u.last_name||"",full_name:[f,u.last_name].filter(Boolean).join(" "),username:u.username?"@"+u.username:"",user_id:String(u.id||123456789),bot_name:b.name||b.username||"Bot",bot_username:b.username?"@"+b.username:"",date:p(d.getMonth()+1)+"/"+p(d.getDate())+"/"+d.getFullYear(),time:p(d.getHours())+":"+p(d.getMinutes())}}
function applyVars(t){const m=varMap();return String(t||"").replace(VAR_RE,(a,k,fb)=>{k=k.toLowerCase();if(!(k in m))return a;return m[k]||fb||(k=="username"?m.first_name:"")})}
function varHint(t){const bad=[];String(t).replace(VAR_RE,(a,k)=>{if(!VARS.some(v=>v[0]==k.toLowerCase())&&!bad.includes(a))bad.push(a)});return bad.length?`<span style="color:var(--o)">Unknown variable: ${esc(bad.join(", "))}</span>`:""}
function insAt(x,t){const s=x.selectionStart??x.value.length,en=x.selectionEnd??s;x.value=x.value.slice(0,s)+t+x.value.slice(en);const caret=s+t.length;x.setSelectionRange(caret,caret);x.dispatchEvent(new Event("input",{bubbles:true}));requestAnimationFrame(()=>{try{x.focus({preventScroll:true});x.setSelectionRange(caret,caret)}catch{}})}
function pickVar(cb){const m=varMap();
 const d=sheet(`${head("Variable")}<p class="note">Tap — the variable will be inserted into the text. The bot replaces it with the person's data. Fallback value: {username|friend}.</p><div class="bl">${VARS.map(v=>`<div class="br" data-v="${v[0]}" style="cursor:pointer;padding:9px"><div class="bm"><b>{${v[0]}}</b><small>${esc(v[1])} → ${esc(m[v[0]]||v[2])}</small></div><span class="mu">insert</span></div>`).join("")}</div><div class="acts2" style="margin-top:12px"><button class="ghost" data-x>Close</button></div>`,{cls:"modal"});
 d.addEventListener("click",e=>{const r=e.target.closest("[data-v]");if(!r)return;const value="{"+r.dataset.v+"}";closeSheet(d);requestAnimationFrame(()=>cb(value))})}
const FMTROW=()=>`<div class="fmt"><button data-f="b">B</button><button data-f="i"><i>I</i></button><button data-f="c">‹›</button><button data-f="link">${ic("link")}</button><button data-f="var" title="Variable">${ic("vars")}</button></div>`;
function fmtBind(row,x,cb){row.onclick=e=>{const b=e.target.closest("[data-f]");if(!b)return;const f=b.dataset.f;if(f=="var"){pickVar(t=>{insAt(x,t);cb()});return}
 const s=x.selectionStart,en=x.selectionEnd,v=x.value,sel=v.slice(s,en);let ins;if(f=="link")ins="["+(sel||"text")+"](https://)";else{const m={b:"**",i:"__",c:"`"}[f];ins=m+(sel||"text")+m}
 x.value=v.slice(0,s)+ins+v.slice(en);x.focus();x.selectionStart=s;x.selectionEnd=s+ins.length;cb()}}
function openVars(){const m=varMap();
 const d=sheet(`${head("Variables and tags")}<p class="note">Write these in the screen text — the bot will replace them with the data of the person it's talking to. Tap a row to copy.</p>
 <div class="bl">${VARS.map(v=>`<div class="br" data-c="{${v[0]}}" style="cursor:pointer;padding:9px"><div class="bm"><b>{${v[0]}}</b><small>${esc(v[1])} → ${esc(m[v[0]]||v[2])}</small></div><span class="bi">${ic("copy")}</span></div>`).join("")}</div>
 <div class="cd" style="margin-top:12px"><h3>Fallback value</h3><div class="note">{username|friend} — if the person has no username, the bot will write “friend”. For {username} without a fallback, the name is used.</div></div>
 <div class="cd" style="margin-top:12px"><h3>Formatting tags</h3><div class="note">**bold**  ·  __italic__  ·  &#96;code&#96;  ·  [text](https://link)</div></div>
 <div class="acts2" style="margin-top:12px"><button class="main" data-x>Close</button></div>`);
 d.addEventListener("click",e=>{const r=e.target.closest("[data-c]");if(!r)return;const t=r.dataset.c;navigator.clipboard?.writeText(t).then(()=>toast("Copied: "+t),()=>toast("Couldn't copy",1))})}

/* ---- Starting and stopping the bot via Firebase ---- */
const NOCONN="Couldn't connect. Check your internet or try again later.";
const START_HELP="The bot didn't start. What to check:\n1. The bot token is valid: open @BotFather → /mybots → your bot → API Token.\n2. If the token was changed, send the new token to the main bot in the chat.\n3. Wait a minute and tap “Start the bot” again.";
function rerender(){renderTop();if(S.tab=="bot")renderBot();else if(S.tab=="me")renderMe();ui()}
async function fsCmd(id,cmd){
 if(!S.token)throw new Error("no token");
 const ts=Date.now(),f={bot:{stringValue:String(id)},ts:{integerValue:String(ts)},v:{integerValue:"2"},active:{nullValue:null},nodes:{stringValue:""},set:{stringValue:""},post:{stringValue:""},delete:{booleanValue:false}};
 if("active" in cmd)f.active={booleanValue:!!cmd.active};
 if(cmd.nodes)f.nodes={stringValue:JSON.stringify(cmd.nodes)};
 if(cmd.set)f.set={stringValue:JSON.stringify(cmd.set)};
 if(cmd.post)f.post={stringValue:String(cmd.post)};
 if(cmd.del)f.delete={booleanValue:true};
 const r=await fetch(`https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/cmds/${encodeURIComponent(S.token)}?key=${firebaseConfig.apiKey}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({fields:f})});
 if(!r.ok){let detail="";try{detail=(await r.json()).error?.message||""}catch{}throw new Error("Firestore "+r.status+(detail?": "+detail:""))}return ts}
async function toggleBot(id){
 const b=(S.sess.bots||[]).find(x=>x.id==id)||S.bot;if(!b||S.busy)return;
 if(S.nosess||S.expired){S.runErr={id:b.id,t:NOCONN};rerender();return toast(NOCONN,1)}
 const target=!b.running;S.busy={id:b.id,target};S.runErr=null;rerender();hap();let ts;
 try{ts=await fsCmd(b.id,{active:target})}catch(e){S.busy=null;rerender();toast("Couldn't send the command: "+String(e?.message||NOCONN),1);return}
 let ok=false,problem="";
 for(let i=0;i<15&&!ok;i++){await new Promise(r=>setTimeout(r,1800));
  try{const j=await fetchSess(S.token),nb=j.bots.find(x=>x.id==b.id),ack=j.cmd_result;S.live=Date.now();if(Number(ack?.ts)>=ts&&!ack.ok){problem=ack.message||"The bot rejected the command.";break}if(nb){Object.assign((S.sess.bots||[]).find(x=>x.id==b.id)||b,{running:nb.running,active:nb.active,subs:nb.subs});ok=nb.running==target}}catch{}}
 S.busy=null;S.ut=null;if(!ok)S.runErr={id:b.id,t:problem|| (target?START_HELP:"The bot didn't stop. Wait a minute and try again. If that doesn't help, check your internet.")};
 rerender();
 toast(ok?(target?"Bot started":"Bot stopped"):(problem|| (target?"The bot didn't start. The hint is in the “Bot” tab":"The bot didn't stop. Try again")),!ok)}

/* ---- Multi-select: Shift / long press / selection mode ---- */
let lp,garm=0;const mqEl=$("#marq");
function startMarq(){st.mx=st.sx;st.my=st.sy;mqEl.style.display="block";drawMarq({clientX:st.sx,clientY:st.sy})}
function drawMarq(e){const r=cv.getBoundingClientRect(),w=Math.abs(e.clientX-st.mx),h=Math.abs(e.clientY-st.my);
 Object.assign(mqEl.style,{left:Math.min(st.mx,e.clientX)-r.left+"px",top:Math.min(st.my,e.clientY)-r.top+"px",width:w+"px",height:h+"px"});if(w+h>6)st.moved=true}
function endMarq(e,ok){mqEl.style.display="none";if(!ok)return;
 if(!st.moved){S.ms.clear();S.sel=null;markSel();return}
 const a=w2({clientX:Math.min(st.mx,e.clientX),clientY:Math.min(st.my,e.clientY)}),b=w2({clientX:Math.max(st.mx,e.clientX),clientY:Math.max(st.my,e.clientY)});
 if(!st.shift)S.ms.clear();
 S.flow.nodes.forEach(n=>{if(n.x<b.x&&n.x+W>a.x&&n.y<b.y&&n.y+nh(n)>a.y)S.ms.add(n.id)});
 if(S.ms.size==1){S.sel=[...S.ms][0];S.ms.clear()}else S.sel=null;
 markSel();hap()}
function toggleMs(id){if(!S.ms.size&&S.sel&&S.sel!=id)S.ms.add(S.sel);S.ms.has(id)?S.ms.delete(id):S.ms.add(id);S.sel=id;markSel();hap()}
function gbarUi(){S.ms.forEach(i=>{if(!S.flow||!node(i))S.ms.delete(i)});const g=$("#gbar");if(!g)return;const n=S.ms.size;g.hidden=n<2;if(n>=2)$("b",g).textContent="Selected: "+n;$("#sel")?.classList.toggle("on",S.selMode);cv.classList.toggle("selm",S.selMode)}
function delGroup(force){const ids=[...S.ms].filter(id=>id!=S.flow.start);if(!ids.length)return toast("The start screen can't be deleted",1);
 const bt=$('[data-g="del"]');if(!force&&!garm){garm=1;bt.textContent="Sure?";setTimeout(()=>{garm=0;bt.textContent="Delete"},2500);return}
 garm=0;bt.textContent="Delete";
 mutate(()=>{S.flow.nodes=S.flow.nodes.filter(n=>!ids.includes(n.id));S.flow.nodes.forEach(n=>n.btns.forEach(b=>{if(ids.includes(b.to))b.to=""}))});
 S.ms.clear();S.sel=null;markSel();toast("Screens deleted: "+ids.length)}
function dupGroup(){const src=S.flow.nodes.filter(n=>S.ms.has(n.id)&&n.id!=S.flow.start);if(!src.length)return;
 if(S.flow.nodes.length+src.length>MAXN)return toast("Maximum "+MAXN+" screens",1);
 const map={},cp=[];src.forEach(n=>{const c=clone(n);c.id=uid(S.flow.nodes.concat(cp));map[n.id]=c.id;c.title=(n.title+" (copy)").slice(0,40);c.x+=40;c.y+=40;cp.push(c);c.btns.forEach(b=>{b.id=uid(S.flow.nodes.concat(cp))})});
 cp.forEach(c=>c.btns.forEach(b=>{if(b.to&&map[b.to])b.to=map[b.to]}));
 mutate(()=>S.flow.nodes.push(...cp));S.ms=new Set(cp.map(c=>c.id));markSel();toast("Screens copied: "+cp.length)}
$("#gbar").onclick=e=>{const b=e.target.closest("[data-g]");if(!b)return;const k=b.dataset.g;if(k=="x"){S.ms.clear();markSel()}else if(k=="del")delGroup();else if(k=="dup")dupGroup()};
{const sb=$("#sel");if(sb)sb.onclick=()=>{S.selMode=!S.selMode;gbarUi();toast(S.selMode?"Selection on: drag a frame around the screens":"Selection off")}}
addEventListener("keydown",e=>{if(stack.length||S.tab!="flow"||!S.flow||/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||""))return;
 if((e.key=="Delete"||e.key=="Backspace")&&S.ms.size>1){e.preventDefault();delGroup(true)}
 else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()=="a"){e.preventDefault();S.ms=new Set(S.flow.nodes.map(n=>n.id));markSel()}
 else if(e.key=="Escape"&&S.ms.size){S.ms.clear();markSel()}});

/* ---- “More” menu ---- */
function openMore(){
 const it=[["tpl","box","Templates","Ready-made flows for a quick start"]];
 const d=sheet(`${head("More")}<div class="bl">${it.map(x=>`<div class="br" data-m="${x[0]}" style="cursor:pointer;padding:10px"><span class="bi">${ic(x[1])}</span><div class="bm"><b>${x[2]}</b><small>${x[3]}</small></div><span class="mu">›</span></div>`).join("")}</div><div class="acts2" style="margin-top:12px"><button class="ghost" data-x>Close</button></div>`,{cls:"modal"});
 d.addEventListener("click",e=>{if(!e.target.closest('[data-m="tpl"]'))return;closeSheet(d);if(!S.flow)return toast("Add a bot first");setTimeout(openTemplates,230)})}

/* ---- Welcome message builder ---- */
const WEL=[["Friendly","Hi, {first_name}!\nGreat to see you in {bot_name}.\nPick what interests you:"],["Formal","Hello, {full_name}.\nWelcome to {bot_name}. Choose a section:"],["Shop","Hi, {first_name}!\nWe have new arrivals and deals — check the catalog.\nToday is {date}, a great day for shopping."],["Short","{first_name}, welcome! Pick a section below."],["Playful","Hi, {first_name}! 😄\nI'm {bot_name}, and I've been waiting just for you. What can I help with?"],["Services","Hello, {first_name}! Happy to help.\nPick a service or tap “Contact us”."]];
function openWelcome(){
 if(!S.flow)return toast("Add a bot first");
 const s0=node(S.flow.start);let cols=s0.cols;
 const d=sheet(`${head("Welcome message")}<p class="note wnote">The first thing a person sees after /start. Add variables — the bot will address them personally.</p>
 <label>Presets</label><div class="chips" id="wp">${WEL.map((w,i)=>`<button class="chp" data-i="${i}">${w[0]}</button>`).join("")}</div>
 <label>Welcome text <span id="wc"></span></label><div class="chips" id="wq" style="margin-bottom:6px">${[["{first_name}","Name"],["{username}","@handle"],["{full_name}","Full name"],["{bot_name}","Bot"],["{date}","Date"]].map(v=>`<button class="chp" data-t="${v[0]}">+ ${v[1]}</button>`).join("")}</div>${FMTROW()}<textarea id="wx" maxlength="3500"></textarea><div class="vh" id="wv"></div>
 <label>Button layout</label><div class="seg" id="wk"><button data-c="1">In a column</button><button data-c="2">Two per row</button></div>
 <label>How the person will see it</label><div style="background:#0e1621;border-radius:14px;padding:12px"><div class="bub" id="wb" style="max-width:100%"></div></div>
 <div class="acts2" style="margin-top:12px"><button class="ghost" id="wph">${ic("cam")} Photo</button><button class="ghost" id="wpv">${ic("play")} Preview</button></div>
 <div class="acts2" style="margin-top:8px"><button class="main" data-x>Done</button></div>`);
 const x=$("#wx",d);x.value=s0.text=="…"?"":s0.text;
 const upd=()=>{$("#wc",d).textContent=x.value.length+" / 3500";$("#wv",d).innerHTML=varHint(x.value);$("#wb",d).innerHTML=fmtHtml(applyVars(x.value))||'<span class="mu">empty</span>';$$("#wk button",d).forEach(b=>b.classList.toggle("on",+b.dataset.c==cols))};
 const apply=()=>{const m=node(S.flow.start);if(!m)return;const text=x.value.trim()||"…";if(text!=m.text||cols!=m.cols)mutate(()=>{m.text=text;m.cols=cols})};
 x.oninput=upd;upd();fmtBind($(".fmt",d),x,upd);
 $("#wp",d).onclick=e=>{const b=e.target.closest("[data-i]");if(!b)return;x.value=WEL[+b.dataset.i][1];upd();hap()};
 $("#wq",d).onclick=e=>{const b=e.target.closest("[data-t]");if(b){insAt(x,b.dataset.t);hap()}};
  $("#wk",d).onclick=e=>{const b=e.target.closest("[data-c]");if(b){cols=+b.dataset.c;upd()}};
 $("#wph",d).onclick=()=>photoInfo(node(S.flow.start));
 $("#wpv",d).onclick=()=>{apply();openPreview(S.flow.start)};
 d._close=apply}

/* ---- Enhanced preview ---- */
function openPreview(from){
 const d=sheet(`<div class="pv"><div class="pvh"><span class="av">${esc((S.bot?.username||"B")[0].toUpperCase())}</span><div style="flex:1;min-width:0"><b>${esc(S.bot?.name||"Bot")}</b><div class="mu" style="text-transform:none">bot · preview</div></div><button class="ic" id="rst" title="Restart">${ic("undo")}</button><button class="ic" data-x title="Close">✕</button></div><div class="pvb" id="pb"></div></div>`,{raw:true});
 const body=$("#pb",d),tm=()=>{const n=new Date(),p=v=>String(v).padStart(2,"0");return p(n.getHours())+":"+p(n.getMinutes())};let box=null;
 const kb=n=>{const c=n.cols==2?2:1,start=n.id==S.flow.start,rows=[],btns=n.btns.map(b=>`<button class="kbb" data-${b.kind=="url"?"u":"g"}="${esc(b.kind=="url"?b.value:b.to)}">${esc(b.label)}${b.kind=="url"?" ↗":""}</button>`);
  for(let i=0;i<btns.length;i+=c)rows.push(`<div class="kbr" style="grid-template-columns:repeat(${c},1fr)">${btns.slice(i,i+c).join("")}</div>`);
  rows.push(start?(eff("support")?'<div class="kbr"><button class="kbb" data-s>Contact us</button></div>':""):'<div class="kbr"><button class="kbb" data-h>To menu</button></div>');return rows.join("")};
 const show=(id,fresh)=>{const n=node(id);if(!n){toast("Screen not found",1);return}
  if(!box||fresh){box=document.createElement("div");box.className="bw";body.append(box)}
  box.innerHTML=`<div class="bub">${hasPhoto(n)?`<div class="bph">${ic("cam")}</div>`:""}${fmtHtml(applyVars(n.text))}<i class="tm">${tm()}</i></div><div class="kb">${kb(n)}</div>`;
  body.scrollTop=body.scrollHeight;hap()};
 const run=()=>{body.innerHTML="";box=null;
  if(from&&from!=S.flow.start){show(from,1);return}
  body.insertAdjacentHTML("beforeend",`<div class="bub me">/start<i class="tm">${tm()} ✓✓</i></div>`);
  if(!PREF.anim){show(S.flow.start,1);return}
  const t=document.createElement("div");t.className="bub typ";t.innerHTML="<s></s><s></s><s></s>";body.append(t);setTimeout(()=>{t.remove();show(S.flow.start,1)},550)};
 body.onclick=e=>{const b=e.target.closest("button");if(!b)return;
  if(b.dataset.g)show(b.dataset.g);else if(b.dataset.h!=null)show(S.flow.start);else if(b.dataset.u)toast("It will open: "+b.dataset.u.replace(/^https?:\/\//,"").slice(0,36));else if(b.dataset.s!=null)toast("The bot will ask the user to message the owner")};
 $("#rst",d).onclick=()=>{from=null;run()};run()}

/* ---- First-run tutorial ---- */
const TOUR_V=1;
const isDesk=()=>{const p=tg?.platform||"";return["tdesktop","macos","weba","webk","web"].includes(p)||(!p||p=="unknown")&&!/Android|iPhone|iPad/i.test(navigator.userAgent)};
const SV=b=>`<svg viewBox="0 0 340 170" width="100%" height="100%" font-family="Space Grotesk,sans-serif">${b}</svg>`;
const gN=(x,y,w,c,b)=>`<rect x="${x}" y="${y}" width="${w}" height="${28+b*16}" rx="9" fill="#101012" stroke="${c}"/><path d="M${x} ${y+14}V${y+9}a9 9 0 0 1 9-9h${w-18}a9 9 0 0 1 9 9v5z" fill="${c}"/><rect x="${x+8}" y="${y+21}" width="${w*.55}" height="3" rx="1.5" fill="#ffffff55"/>`+Array.from({length:b},(_,i)=>`<rect x="${x+8}" y="${y+30+i*16}" width="${w-16}" height="11" rx="5.5" fill="none" stroke="#ffffff88"/>`).join("");
const cap=(x,y,w,t,c="#f4f4f6")=>`<rect x="${x}" y="${y}" width="${w}" height="20" rx="6" fill="#0a0a0c" stroke="#ffffff44"/><text x="${x+w/2}" y="${y+14}" text-anchor="middle" font-family="Space Mono" font-size="9.5" fill="${c}">${t}</text>`;
const ART=[
 SV(`<defs><linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e6ff3d"/><stop offset="1" stop-color="#a9a8f8"/></linearGradient></defs><circle cx="170" cy="70" r="58" fill="none" stroke="#ffffff14"/><circle cx="170" cy="70" r="40" fill="none" stroke="#ffffff22" stroke-dasharray="3 5"/><rect x="140" y="40" width="60" height="60" rx="19" fill="url(#tg)"/><g transform="translate(152 52) scale(1.5)" fill="none" stroke="#000" stroke-width="1.8" stroke-linecap="round">${IC.bot}</g><circle cx="78" cy="48" r="6" fill="#a9a8f8"/><circle cx="266" cy="96" r="6" fill="#e6ff3d"/><circle cx="262" cy="36" r="4" fill="#5dffb0"/><circle cx="84" cy="104" r="4" fill="#ff6a2b"/><text x="170" y="150" text-anchor="middle" font-size="17" font-weight="700" fill="#f4f4f6">Bot Builder</text>`),
 SV(`${gN(10,40,90,"#e6ff3d",2)}${gN(125,8,90,"#a9a8f8",1)}${gN(125,98,90,"#a9a8f8",1)}${gN(240,52,90,"#a9a8f8",1)}<g fill="none" stroke="#a9a8f8" stroke-width="2"><path d="M100 75.5C115 75.5 110 25 125 25"/><path d="M100 91.5C115 91.5 110 115 125 115"/><path d="M215 43.5C228 43.5 227 69 240 69"/></g><g fill="#a9a8f8"><circle cx="100" cy="75.5" r="4"/><circle cx="100" cy="91.5" r="4"/><circle cx="215" cy="43.5" r="4"/></g><text x="170" y="162" text-anchor="middle" font-size="11" font-family="Space Mono" fill="#8d8d99">screen · button · wire</text>`),
 SV(`${gN(16,18,96,"#a9a8f8",1)}<rect x="196" y="14" width="100" height="44" rx="9" fill="#a9a8f822" stroke="#a9a8f8" stroke-dasharray="4 4"/><path d="M108 124C108 84 150 60 192 40" fill="none" stroke="#e6ff3d" stroke-width="2" stroke-dasharray="5 5"/><circle cx="194" cy="39" r="7" fill="#e6ff3d"/><rect x="60" y="120" width="220" height="38" rx="14" fill="#0c0c0f" stroke="#ffffff26"/><rect x="72" y="126" width="64" height="26" rx="8" fill="#a9a8f8"/><rect x="144" y="126" width="64" height="26" rx="8" fill="none" stroke="#fff"/><rect x="216" y="126" width="52" height="26" rx="8" fill="none" stroke="#e6ff3d"/><g font-family="Space Mono" font-size="9" text-anchor="middle"><text x="104" y="143" fill="#000">SCREEN</text><text x="176" y="143" fill="#fff">BUTTON</text><text x="242" y="143" fill="#e6ff3d">LINK</text></g>`),
 SV(`<rect x="24" y="10" width="292" height="150" rx="14" fill="#101013" stroke="#ffffff26"/><g font-family="Space Mono" font-size="11" font-weight="700" fill="#f4f4f6" text-anchor="middle"><rect x="36" y="22" width="30" height="22" rx="6" fill="#0a0a0c" stroke="#ffffff26"/><text x="51" y="37">B</text><rect x="72" y="22" width="30" height="22" rx="6" fill="#0a0a0c" stroke="#ffffff26"/><text x="87" y="37" font-style="italic">I</text><rect x="108" y="22" width="30" height="22" rx="6" fill="#0a0a0c" stroke="#ffffff26"/><text x="123" y="37">‹›</text><rect x="144" y="22" width="40" height="22" rx="6" fill="#e6ff3d"/><text x="164" y="37" fill="#000">{ }</text></g><text x="38" y="70" font-size="14" fill="#f4f4f6">Hi, <tspan fill="#e6ff3d" font-weight="700">{first_name}</tspan>!</text><rect x="38" y="80" width="190" height="4" rx="2" fill="#ffffff2a"/><rect x="38" y="90" width="140" height="4" rx="2" fill="#ffffff2a"/><path d="M60 100v12m0 0-5-5m5 5 5-5" fill="none" stroke="#8d8d99" stroke-width="1.6" stroke-linecap="round"/><rect x="38" y="120" width="170" height="30" rx="11" fill="#182533"/><text x="52" y="139" font-size="13" fill="#fff">Hi, John!</text>`),
 SV(`<rect x="12" y="6" width="210" height="150" rx="8" fill="#e6ff3d14" stroke="#e6ff3d" stroke-dasharray="5 4" stroke-width="1.5"/>${gN(24,20,80,"#e6ff3d",1)}${gN(132,14,80,"#e6ff3d",1)}${gN(132,84,80,"#e6ff3d",1)}${gN(250,34,76,"#a9a8f8",1)}${cap(240,110,86,"Shift + frame","#e6ff3d")}<path d="M214 148l-3-16 12 7-5 2 4 7-3 1.500-4-7z" fill="#fff" stroke="#000" stroke-width=".8"/>`),
 SV(`<rect x="112" y="6" width="116" height="158" rx="16" fill="#0e1621" stroke="#ffffff33"/><path d="M112 22a16 16 0 0 1 16-16h84a16 16 0 0 1 16 16v10H112z" fill="#17212b"/><circle cx="128" cy="19" r="6" fill="#a9a8f8"/><rect x="138" y="16" width="40" height="5" rx="2.5" fill="#ffffff66"/><rect x="122" y="40" width="86" height="34" rx="10" fill="#182533"/><rect x="130" y="48" width="64" height="4" rx="2" fill="#ffffff66"/><rect x="130" y="57" width="46" height="4" rx="2" fill="#ffffff44"/><rect x="122" y="80" width="96" height="16" rx="6" fill="#2b5278"/><rect x="122" y="100" width="96" height="16" rx="6" fill="#2b5278"/><rect x="122" y="120" width="96" height="16" rx="6" fill="#2b5278"/><g font-family="Space Mono" font-size="10" text-anchor="middle"><rect x="14" y="34" width="76" height="26" rx="13" fill="none" stroke="#ffffff66"/><text x="52" y="51" fill="#f4f4f6">Template</text><rect x="250" y="34" width="76" height="26" rx="13" fill="#e6ff3d"/><text x="288" y="51" fill="#000">Preview</text></g><path d="M92 47h18M248 47h-18" stroke="#8d8d99" stroke-dasharray="3 3"/>`),
 SV(`<g font-family="Space Mono" font-size="9.5" text-anchor="middle"><rect x="14" y="48" width="82" height="64" rx="14" fill="#101013" stroke="#ffffff33"/><rect x="40" y="62" width="30" height="16" rx="8" fill="#e6ff3d"/><circle cx="62" cy="70" r="6" fill="#000"/><text x="55" y="100" fill="#f4f4f6">WEBSITE</text><rect x="129" y="48" width="82" height="64" rx="14" fill="#101013" stroke="#ff6a2b"/><g transform="translate(158 58) scale(1.1)" fill="none" stroke="#ff6a2b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IC.fire}</g><text x="170" y="100" fill="#f4f4f6">FIREBASE</text><rect x="244" y="48" width="82" height="64" rx="14" fill="#101013" stroke="#5dffb0"/><g transform="translate(272 58) scale(1.1)" fill="none" stroke="#5dffb0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IC.bot}</g><text x="285" y="100" fill="#f4f4f6">BOT</text></g><path d="M98 80h26M213 80h26" stroke="#a9a8f8" stroke-width="2"/><path d="m120 75 6 5-6 5M235 75l6 5-6 5" fill="none" stroke="#a9a8f8" stroke-width="2"/><text x="170" y="146" text-anchor="middle" font-size="11" font-family="Space Mono" fill="#5dffb0">start / stop in seconds</text>`),
 SV(`<rect x="50" y="8" width="240" height="116" rx="10" fill="#0c0c0f" stroke="#ffffff44"/><rect x="58" y="16" width="224" height="100" rx="6" fill="#070708"/>${gN(66,28,58,"#e6ff3d",1)}${gN(148,20,58,"#a9a8f8",1)}${gN(148,68,58,"#a9a8f8",1)}${gN(226,44,50,"#a9a8f8",1)}<path d="M150 124h40l4 8h-48z" fill="#ffffff22"/>${cap(40,142,50,"Shift")}${cap(98,142,66,"Ctrl+Z")}${cap(172,142,44,"Del")}${cap(224,142,66,"← →")}`)
];
function openTour(manual){
 const desk=isDesk(),m=masterName(),L=m?`https://t.me/${m}?start=app`:"";
 const SL=[
  [ART[0],"Welcome!","Bot Builder is a constructor for Telegram bots. You draw a flow of screens and buttons, and the bot answers people based on it. The tour takes a minute.",`<div class="pcb">${ic("pc")}<div>${desk?"You're on a desktop — great, that's the most comfortable way to work.":"Tip: the builder is even more comfortable on desktop (Telegram Desktop) — more space, a mouse and hotkeys."}</div></div>`],
  [ART[1],"A flow of screens","A screen is one bot message. A button leads to another screen or opens a link. Drag the circle to the right of a button and connect it to the target screen."],
  [ART[2],"Add by dragging","There is a panel at the bottom: drag a “screen” onto the canvas, and a “button” or a “link” onto the target screen. Pinch with two fingers or scroll the mouse wheel to zoom; drag empty space to pan the canvas."],
  [ART[3],"Texts and variables","Tap a screen to edit its text: bold, italic, links. The { } button inserts a variable — for example “Hi, {first_name}!” — and the bot will call the person by name."],
  [ART[4],"Group selection","Hold Shift and drag a frame around the screens. On a phone — long-press an empty spot or use the selection button on the right. Selected screens move together and can be copied and deleted."],
  [ART[5],"Preview and templates","“Preview” shows how the bot will answer in Telegram — the buttons are tappable. “Template” loads a complete ready-made flow; you only replace the texts."],
  [ART[6],"Launch and apply","In the “Bot” tab, start and stop the bot. After edits, tap “Apply” to send the flow and settings. Screen photos are uploaded via the bot."],
  [ART[7],"Better on desktop","Open the builder in Telegram Desktop: a big canvas and hotkeys. You can always reopen this tutorial from the “Profile” tab.",`<div class="hk"><span><i class="kbd">Shift</i> + frame — select a group</span><span><i class="kbd">Wheel</i> — zoom</span><span><i class="kbd">Ctrl</i> + <i class="kbd">Z</i> / <i class="kbd">Y</i> — undo and redo</span><span><i class="kbd">Del</i> — delete selected</span></div>${!desk&&L?`<button class="ghost" data-copy="${esc(L)}" style="width:100%">Copy link for desktop</button>`:""}`]
 ],n=SL.length;
 const d=sheet(`<div class="tv" id="tv"><div class="tt" id="tt">${SL.map(s=>`<div class="ts"><div class="art">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p>${s[3]||""}</div>`).join("")}</div></div><div class="td" id="td">${SL.map((_,i)=>`<i data-i="${i}"></i>`).join("")}</div><div class="tf"><button class="ghost" id="tp">Skip</button><button class="main" id="tn">Next</button></div>`,{cls:"modal tourm"});
 const tt=$("#tt",d),tv=$("#tv",d);let i=0,x0=null,dx=0;
 const to=k=>{i=clamp(k,0,n-1);tt.classList.remove("drag");tt.style.transform=`translateX(${-i*100}%)`;$$("#td i",d).forEach((e,j)=>e.classList.toggle("on",j==i));$("#tp",d).textContent=i==n-1?"Close":"Skip";$("#tn",d).textContent=i==n-1?"Start":"Next"};
 $("#tn",d).onclick=()=>{hap();i==n-1?closeSheet(d):to(i+1)};
 $("#tp",d).onclick=()=>closeSheet(d);
 $("#td",d).onclick=e=>{const k=e.target.closest("[data-i]");if(k)to(+k.dataset.i)};
 d.addEventListener("click",e=>{const c=e.target.closest("[data-copy]");if(c)navigator.clipboard?.writeText(c.dataset.copy).then(()=>toast("Link copied"),()=>toast("Couldn't copy",1))});
 tv.onpointerdown=e=>{if(e.target.closest("button"))return;x0=e.clientX;dx=0;tt.classList.add("drag");try{tv.setPointerCapture(e.pointerId)}catch{}};
 tv.onpointermove=e=>{if(x0==null)return;dx=e.clientX-x0;tt.style.transform=`translateX(calc(${-i*100}% + ${dx}px))`};
 const end=()=>{if(x0==null)return;const w=tv.clientWidth||300;x0=null;const go=Math.abs(dx)>Math.min(60,w/5);to(go?i+(dx<0?1:-1):i);if(go)hap()};
 tv.onpointerup=end;tv.onpointercancel=end;
 const key=e=>{if(stack[stack.length-1]!==d)return;if(e.key=="ArrowRight")to(i+1);else if(e.key=="ArrowLeft")to(i-1)};
 addEventListener("keydown",key);
 d._close=()=>{lsSet("bb3:tour",TOUR_V);removeEventListener("keydown",key)};
 to(0)}
{const mb=$("#more");if(mb)mb.onclick=()=>{hap();openMore()}}

/* ============ Referrals ============ */
const BOT_URL="https://t.me/ManageYourOwnBot";
const refLink=()=>BOT_URL+"?start=ref_"+(tgUser().id||"0");
function shareRef(){const u="https://t.me/share/url?url="+encodeURIComponent(refLink())+"&text="+encodeURIComponent("I build Telegram bots without any code — try it!");
 try{tg?.openTelegramLink?tg.openTelegramLink(u):window.open(u,"_blank")}catch{window.open(u,"_blank")}}
function openRef(){
 const ref=S.sess.ref||{},invited=Array.isArray(ref.invited)?ref.invited:[],count=Math.max(+ref.count||0,invited.length),stars=+ref.stars||0;
 const rows=invited.length?`<div class="plist">${invited.map(x=>`<div class="pit"><span>${esc(x.name||"User")} ${x.username?`<small class="mu">@${esc(x.username)}</small>`:""}</span><span class="badge ${x.rewarded?"y":""}">${x.rewarded?"rewarded":"pending"}</span></div>`).join("")}</div>`:'<div class="empty">No invitees yet. They will appear here once someone starts a bot via your link.</div>';
 const d=sheet(`${head("Referrals")}<div class="row2"><div class="cd"><div class="mu">INVITED</div><div class="kv">${nf(count)}</div></div><div class="cd"><div class="mu">EARNED</div><div class="kv referral-balance">${STAR_ICON}<span>${nf(stars)}</span></div></div></div><div class="cd"><h3>Your link</h3><div class="note" style="word-break:break-all">${esc(refLink())}</div><div class="acts2" style="margin-top:10px"><button class="main" data-act="refshare">Share</button><button class="ghost" data-act="refcopy">Copy</button></div></div><div class="cd"><h3>Who you've invited</h3>${rows}<div class="note" style="margin-top:10px">The reward is granted when an invitee connects their own bot for the first time.</div></div>`);
 }

/* ============ Plans and Telegram Stars payments ============ */
const PLANS=[{k:"slot",n:"+1 bot slot",s:50,d:"One more bot in your account"},{k:"pro",n:"Pro",s:250,d:"Up to 15 bots, 40 screens, priority support · 30 days"},{k:"biz",n:"Business",s:700,d:"Up to 50 bots, unlimited broadcasts, no builder badge · 30 days"}];
const STAR_ICON=starIcon();
async function payPlan(p,btn){
 if(!S.token||S.nosess||S.expired)return toast("Open the builder via the bot to pay",1);
 if(!tg?.openInvoice)return toast("Payment is only available inside Telegram",1);
 const label=btn.innerHTML,t0=Date.now();btn.disabled=true;btn.textContent="Preparing the invoice…";
 try{
  const f={bot:{stringValue:String(S.bot?.id||"")},plan:{stringValue:p.k},ts:{integerValue:String(t0)},v:{integerValue:"1"}};
  const r=await fetch(`https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/orders/${encodeURIComponent(S.token)}?key=${firebaseConfig.apiKey}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({fields:f})});
  if(!r.ok)throw new Error("order write failed: "+r.status);
  let link=null;
  for(let i=0;i<18&&!link;i++){
   await new Promise(r=>setTimeout(r,1000));
   const session=await fetchSess(S.token);
   if(Number(session?.invoice_error?.ts)>=t0)throw new Error(session.invoice_error.message||"Couldn't create the invoice");
   if(session?.invoice?.link&&Number(session.invoice.ts)>=t0&&session.invoice.plan===p.k)link=session.invoice.link;
  }
  if(!link)throw new Error("invoice link timed out");
  tg.openInvoice(link,status=>{
   if(status==="paid"){
    toast("Payment received! The plan will update automatically");hap("ok");
    setTimeout(()=>refresh(),1000);setTimeout(()=>refresh(),4000);
   }else if(status==="failed")toast("Telegram didn't complete the payment. Please try again",1);
  });
 }catch(e){console.error("Stars payment:",e);const detail=String(e?.message||"");toast(detail.includes("invoice link timed out")?"The bot didn't respond to the payment request. Make sure it's running and try again":detail&&detail!=="Failed to fetch"?"Couldn't create the invoice: "+detail.slice(0,120):"Couldn't prepare the payment. Check your connection and try again",1)}
 finally{btn.disabled=false;btn.innerHTML=label}
}
function openPlans(){
 const current=S.sess.plan||"free",planName={free:"Free",pro:"Pro",biz:"Business"}[current]||current.toUpperCase(),until=S.sess.plan_until?new Date(S.sess.plan_until).toLocaleDateString("en-US"):"";
 const prices=Array.isArray(S.sess.plans)?S.sess.plans:[];
  const currentFeatures=current==="biz"?["Up to 50 bots","Unlimited broadcasts","No builder badge","Full statistics with charts"]:current==="pro"?["Up to 15 bots","Up to 40 screens per flow","Priority support","Charts of activity, views and audience"]:[`Up to ${nf(S.sess.limit||5)} bots`,"Flow editor and bot launching","Manage bots from the web"];
 const tiers=[
   {k:"pro",name:"Premium Pro",term:"30 days",features:["Up to 15 bots","Up to 40 screens per flow","Priority support","Charts of activity, views and audience"]},
   {k:"biz",name:"Premium Business",term:"30 days",features:["Up to 50 bots","Unlimited broadcasts","No builder badge","Full statistics with charts"]}
 ];
 const planCard=t=>{const p=PLANS.find(x=>x.k==t.k),server=prices.find(x=>x.k==t.k),price=server?+server.stars:(p?.s||0),isCurrent=current==t.k;
  return`<div class="cd plan-card"><div class="plan-head"><div><b style="font-size:16px">${t.name}</b><div class="plan-sub">${t.term}</div></div><span class="plan-price">${STAR_ICON}${nf(price)}</span></div><div class="plan-sub">${isCurrent?"Plan active — you can renew it":"Available after purchase"}</div><div class="plan-list">${t.features.map(x=>`<div><i>✓</i><span>${x}</span></div>`).join("")}</div><button class="${isCurrent?"ghost":"main"}" data-pay="${t.k}" style="width:100%">${isCurrent?"Renew":"Buy"}</button></div>`};
 const slot=prices.find(x=>x.k==="slot"),slotPrice=slot?+slot.stars:(PLANS.find(x=>x.k==="slot")?.s||50);
 const d=sheet(`${head("Premium and plans")}<div class="cd plan-current"><div class="mu">YOUR CURRENT PLAN</div><h3 style="margin:4px 0">${esc(planName)}${until?` · until ${until}`:""}</h3><div class="plan-sub">${until?`Active until ${until}`:"Active now"}</div><div class="plan-list">${currentFeatures.map(x=>`<div><i>✓</i><span>${x}</span></div>`).join("")}</div></div>${tiers.map(planCard).join("")}<div class="cd plan-card"><div class="plan-head"><div><b>Extra bot slot</b><div class="plan-sub">A one-time slot, no expiration date</div></div><span class="plan-price">${STAR_ICON}${nf(slotPrice)}</span></div><div class="plan-list"><div><i>✓</i><span>Adds one more slot for a bot</span></div></div><button class="main" data-pay="slot" style="width:100%">Buy</button></div>`);
 d.addEventListener("click",e=>{const b=e.target.closest("[data-pay]");if(b){const tier=PLANS.find(x=>x.k==b.dataset.pay);if(tier)payPlan({...tier,s:+(prices.find(x=>x.k==tier.k)?.stars||tier.s)},b)}})
}
function routeRussian(){lsSet("bb3:language","ru");const target=new URL("./index.html",location.href);target.search=location.search;target.hash=location.hash;location.assign(target.href)}
function launchEnglish(){const gate=$("#language-gate");if(gate)gate.hidden=true;applyPrefs();boot().catch(e=>{console.error(e);S.expired=true;S.sess={bots:[]};renderTop();renderTab();ui()});if(lsGet("bb3:tour")!=TOUR_V)setTimeout(()=>openTour(),700)}
const languageGate=$("#language-gate");languageGate?.addEventListener("click",e=>{const b=e.target.closest("[data-language-choice]");if(!b)return;const lang=b.dataset.languageChoice;lsSet("bb3:language",lang);if(lang==="ru")routeRussian();else launchEnglish()});
const savedLanguage=lsGet("bb3:language");if(savedLanguage==="ru")routeRussian();else if(savedLanguage==="en")launchEnglish();
