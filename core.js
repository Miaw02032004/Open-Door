'use strict';
/* ---------- helpers ---------- */
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const PATHS={
  door:'M5 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M3 21h18M13 12h.01',
  calendar:'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  flask:'M9 3h6M10 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3',
  pill:'M10.5 20.5l10-10a4.95 4.95 0 0 0-7-7l-10 10a4.95 4.95 0 0 0 7 7zM8.5 8.5l7 7',
  book:'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM20 17v4H6.5A2.5 2.5 0 0 1 4 18.5',
  heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z',
  chat:'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  shield:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  pin:'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  user:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  lock:'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  bell:'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  check:'M20 6L9 17l-5-5',
  x:'M18 6L6 18M6 6l12 12',
  arrow:'M5 12h14M12 5l7 7-7 7',
  search:'M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM21 21l-4.3-4.3',
  clock:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2',
  phone:'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z',
  video:'M23 7l-7 5 7 5V7zM3 5h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z',
  users:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  file:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8',
  pulse:'M22 12h-4l-3 9L9 3l-3 9H2',
  edit:'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
  copy:'M9 9h11v11H9zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1',
  home:'M3 11l9-8 9 8M5 10v10h14V10',
  menu:'M3 6h18M3 12h18M3 18h18',
  chev:'M6 9l6 6 6-6',
  info:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 16v-4M12 8h.01',
  warn:'M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01',
  eye:'M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  box:'M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8'
};
const ic=(n,c)=>'<svg class="ic '+(c||'')+'" viewBox="0 0 24 24" aria-hidden="true"><path d="'+PATHS[n]+'"/></svg>';
const DAY=864e5;
const iso=t=>new Date(t).toISOString();
const fd=(d,o)=>new Date(d).toLocaleDateString('en-CA',o||{weekday:'short',month:'short',day:'numeric'});
const ft=d=>new Date(d).toLocaleTimeString('en-CA',{hour:'numeric',minute:'2-digit'});
const fdt=d=>fd(d)+', '+ft(d);
const rid=p=>p+'-'+Math.floor(1000+Math.random()*9000);
const sw=(id,on,act)=>'<span class="sw"><input type="checkbox" id="'+id+'" data-chg="'+act+'"'+(on?' checked':'')+'><i></i></span>';

/* ---------- data ---------- */
const CLINICS=[
  {id:'c1',name:'Sample Campus Health Centre',kind:'campus',addr:'Student Wellness Building, main campus',hours:'Mon to Fri, 9:00 to 4:30',evening:false,km:.4,x:300,y:170,note:'Open Door reserves 10 screening appointments here each month.'},
  {id:'c2',name:'Sample Downtown Community Clinic',kind:'off',addr:'120 Sample Street',hours:'Mon to Sat, 8:00 to 8:00',evening:true,km:1.8,x:430,y:250,note:'Accepts Open Door electronic requisitions.'},
  {id:'c3',name:'Sample Walk-in Clinic, Westside',kind:'off',addr:'48 Example Avenue',hours:'Daily, 10:00 to 9:00',evening:true,km:3.2,x:130,y:230,note:'No booking needed for sample collection.'},
  {id:'c4',name:'Sample Sexual Health Clinic',kind:'off',addr:'7 Demo Road',hours:'Tue to Thu, 10:00 to 6:00',evening:false,km:2.4,x:480,y:100,note:'Public health clinic with confidential walk-in hours.'},
  {id:'c5',name:'Sample Family Health Team',kind:'off',addr:'300 Placeholder Boulevard',hours:'Mon to Fri, 8:30 to 5:00',evening:false,km:4.9,x:90,y:90,note:'Appointment recommended.'}
];
const SECTIONS=[
  {id:'home',title:'Home',pages:[['home','Home']]},
  {id:'care',title:'Get care',pages:[['care-intake','Confidential intake'],['care-assess','Symptom assessment'],['care-referral','Testing referrals'],['care-clinics','Find a clinic'],['care-consult','Virtual consultations'],['care-followup','Follow-up care']]},
  {id:'learn',title:'Learn about HSV',pages:[['learn-types','HSV-1 and HSV-2'],['learn-symptoms','Symptoms'],['learn-transmission','Transmission'],['learn-testing','Testing'],['learn-treatment','Treatment'],['learn-myths','Myths and facts'],['learn-faq','FAQ']]},
  {id:'my',title:'My health',pages:[['my-dashboard','Dashboard'],['my-appts','Appointments'],['my-results','Test results'],['my-rx','Prescriptions'],['my-journal','Symptom journal'],['my-timeline','Health timeline']]},
  {id:'mind',title:'Mental wellness',pages:[['mind-support','Emotional support'],['mind-counselling','Counselling'],['mind-manage','Managing a diagnosis'],['mind-resources','Resources']]},
  {id:'rel',title:'Relationships',pages:[['rel-disclosure','Disclosure guide'],['rel-builder','Conversation builder'],['rel-partner','Partner education'],['rel-healthy','Healthy relationships']]},
  {id:'comm',title:'Community',pages:[['comm-peer','Peer support'],['comm-forum','Anonymous forum'],['comm-clubs','Student clubs'],['comm-campaigns','Awareness campaigns']]},
  {id:'acct',title:'Account and privacy',pages:[['acct-profile','Account settings'],['acct-consent','Consent management'],['acct-security','Security settings'],['acct-data','Data access'],['acct-exit','Quick exit']]}
];
const SECOF={};SECTIONS.forEach(s=>s.pages.forEach(p=>SECOF[p[0]]=s));
const TITLE={};SECTIONS.forEach(s=>s.pages.forEach(p=>TITLE[p[0]]=p[1]));
const RXSTEPS=['Prescribed','Pharmacy checking','Packed discreetly','Out for delivery','Delivered'];

/* ---------- state ---------- */
const KEY='od-proto-v2';
const DEF=()=>({user:null,stage:0,intake:null,referral:null,appts:[],result:null,rx:null,journal:[],timeline:[],
  consent:{care:true,pharmacy:true,mental:false,feedback:true},consentLog:[],
  prefs:{nick:'',campus:'',contact:'inapp',remindEmail:false,remindSms:false,lead:'24',stealth:false,blur:false,lock:'0',clearOnExit:true,twofa:false},
  outcome:'detected',posts:null,moods:[],coping:[],ready:[],feedbackDone:false,handle:null,counsel:null,peer:null,club:null,campusUsed:4,bookReason:null});
let S=load();
function load(){try{const r=sessionStorage.getItem(KEY);if(r){const o=JSON.parse(r);const d=DEF();return Object.assign(d,o,{prefs:Object.assign(d.prefs,o.prefs||{}),consent:Object.assign(d.consent,o.consent||{})});}}catch(e){}return DEF();}
function save(){try{sessionStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function addEvent(label,detail,t){S.timeline.push({t:t||iso(Date.now()),label:label,detail:detail||''});save();}
function logConsent(what,on){S.consentLog.push({t:iso(Date.now()),what:what,on:on});save();}

/* ---------- ui bits ---------- */
function toast(msg){const r=$('#toastRoot');r.innerHTML='<div class="toast">'+esc(msg)+'</div>';clearTimeout(toast.t);toast.t=setTimeout(()=>{r.innerHTML='';},3600);}
let MODAL=null,MODAL_PREV=null;
function modal(o){MODAL=o;MODAL_PREV=document.activeElement;
  $('#modalRoot').innerHTML='<div class="modal-bg" id="mbg"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="mt"><h3 id="mt">'+esc(o.title)+'</h3><div>'+(o.body||'')+'</div><div class="row">'+(o.actions||[]).map((a,i)=>'<button class="btn '+(a.cls||'btn-line')+'" data-modal="'+i+'">'+esc(a.label)+'</button>').join('')+'</div></div></div>';
  const b=$('#modalRoot .btn:last-child');b&&b.focus();}
function closeModal(){$('#modalRoot').innerHTML='';MODAL=null;try{MODAL_PREV&&MODAL_PREV.focus();}catch(e){}}
function confirmBox(title,body,label,fn,cls){modal({title:title,body:'<p class="muted">'+body+'</p>',actions:[{label:'Cancel'},{label:label,cls:cls||'btn-primary',fn:fn}]});}
const copyText=async(t)=>{try{await navigator.clipboard.writeText(t);toast('Copied to clipboard');}catch(e){toast('Copy was blocked here. Select the text and copy it manually.');}};

/* ---------- gating ---------- */
const gate=f=>S.user?f():signinCard();
function signinCard(){return '<div class="card" style="max-width:520px"><h3>Open your private space</h3><p class="muted">Pick any nickname. Open Door never needs your real name to show this dashboard. In this prototype, everything is kept in this browser tab only.</p><div class="field"><label for="nick">Nickname</label><input type="text" id="nick" maxlength="24" placeholder="For example, Maple" autocomplete="off"></div><div class="row"><button class="btn btn-primary" data-act="signin">Continue</button><button class="btn btn-line" data-act="d-sample">Use a sample patient</button></div></div>';}

/* ---------- pipeline ---------- */
function nextLabel(){
  if(S.stage===0)return null;
  if(S.stage===1)return 'Clinician finishes review';
  if(S.stage===2)return S.referral?'Sample collected and sent to lab':'Consultation completed';
  if(S.stage===3)return 'Lab result arrives';
  if(S.stage===4)return 'Virtual follow-up completed';
  if(S.stage===5&&S.rx&&S.rx.step<4)return 'Prescription: '+RXSTEPS[S.rx.step+1].toLowerCase();
  return null;
}
function advance(){
  const now=iso(Date.now());
  if(S.stage===1){S.stage=2;
    if(S.intake&&S.intake.flagged){S.referral={ref:rid('REQ'),test:'HSV swab (NAAT)',issued:now,clinic:null,status:'issued'};addEvent('Clinician review complete','An electronic requisition for a swab test was issued to you.');}
    else addEvent('Clinician review complete','Testing is not advised right now. A consultation is suggested to talk through your questions.');
  }else if(S.stage===2){
    if(S.referral){S.stage=3;S.referral.status='collected';addEvent('Sample collected','Your sample was sent to a public health laboratory.');}
    else{S.stage=5;addEvent('Consultation complete','Your clinician talked through your questions and next steps.');}
  }else if(S.stage===3){S.stage=4;S.result={revealed:false,value:S.outcome,date:now};if(S.referral)S.referral.status='resulted';addEvent('Result released','Your clinician released your test result.');
  }else if(S.stage===4){S.stage=5;addEvent('Virtual follow-up complete','Your clinician went through your result with you.');
    if(S.result&&S.result.value==='detected'){S.rx={step:0,created:now,address:'',label:'Student Services',win:'any',refill:false};addEvent('Prescription sent','Your antiviral prescription went to the partner pharmacy.');}
  }else if(S.stage===5&&S.rx&&S.rx.step<4){S.rx.step++;addEvent('Prescription update',RXSTEPS[S.rx.step]+'.');}
  save();
}
function submitIntake(d){
  const flagged=d.lesionsNow==='yes'||d.past==='yes';
  S.user=S.user||{nick:S.prefs.nick||'Guest student'};
  S.intake=Object.assign({ref:rid('OD'),date:iso(Date.now()),flagged:flagged},d);
  S.stage=1;addEvent('Intake submitted','Your confidential intake form reached the clinician review queue.');save();
  clearTimeout(submitIntake.t);
  submitIntake.t=setTimeout(()=>{if(S.stage===1){advance();toast('A clinician finished reviewing your intake. Check your dashboard.');if(/^(care|my)-/.test(CUR))rerender();renderChrome();}},9000);
}
function loadSample(){
  const n=Date.now();const t=(days,h)=>{const d=new Date(n+days*DAY);d.setHours(h,0,0,0);return d.toISOString();};
  S=DEF();S.user={nick:'Sample student'};S.prefs.nick='Sample student';
  S.intake={ref:'OD-4821',date:t(-3,10),flagged:true,lesionsNow:'yes',areas:['Genital area'],onset:'1 to 3 days',past:'no',prev:'no',weak:[],testPref:'clinic',contact:'inapp',note:''};
  S.stage=3;S.referral={ref:'REQ-7305',test:'HSV swab (NAAT)',issued:t(-2,9),clinic:'c2',status:'collected'};
  S.appts=[{id:'a1',type:'Virtual follow-up',when:t(2,15),mode:'Video',status:'confirmed'}];
  S.journal=[{id:'j1',date:t(-3,0).slice(0,10),sev:6,areas:['Genital area'],trig:['Stress'],note:'First day I noticed it.'},{id:'j2',date:t(-2,0).slice(0,10),sev:5,areas:['Genital area'],trig:[],note:''},{id:'j3',date:t(-1,0).slice(0,10),sev:3,areas:['Genital area'],trig:['Lack of sleep'],note:'Feeling a bit better.'}];
  S.timeline=[{t:t(-3,10),label:'Intake submitted',detail:'Your confidential intake form reached the clinician review queue.'},{t:t(-2,9),label:'Clinician review complete',detail:'An electronic requisition for a swab test was issued to you.'},{t:t(-1,11),label:'Sample collected',detail:'Your sample was sent to a public health laboratory.'}];
  save();renderChrome();rerender();toast('Sample patient loaded');
}
function resetAll(){clearTimeout(submitIntake.t);S=DEF();save();closeModal();location.hash='#home';CUR='home';render(true);toast('Demo reset');}

/* ---------- prefs ---------- */
function applyPrefs(){
  document.body.classList.toggle('blur-sens',!!S.prefs.blur);
  document.title=S.prefs.stealth?'Student Services':'Open Door HSV Care';
  armIdle();
}
let IDLE=null;
function armIdle(){clearTimeout(IDLE);const m=+S.prefs.lock;if(m>0&&$('#lockscr').hidden)IDLE=setTimeout(()=>{$('#lockscr').hidden=false;$('#unlock').focus();},m*60000);}
['click','keydown','mousemove','touchstart'].forEach(e=>document.addEventListener(e,()=>{if($('#lockscr').hidden)armIdle();},{passive:true}));

/* ---------- quick exit ---------- */
let LASTFOCUS=null,EXITED=false;
function exitToggle(){
  const d=$('#decoy');
  if(d.hidden){
    closeModal();closeDrops();$('#mnav').classList.remove('open');
    LASTFOCUS=document.activeElement;d.hidden=false;document.body.classList.add('locked');document.title='Notes';
    if(S.prefs.clearOnExit){clearTimeout(submitIntake.t);const p=S.prefs;S=DEF();S.prefs=Object.assign(DEF().prefs,{stealth:p.stealth,blur:p.blur,lock:p.lock,clearOnExit:p.clearOnExit});save();EXITED=true;}
    d.focus();
  }else{
    d.hidden=true;document.body.classList.remove('locked');applyPrefs();
    if(EXITED){EXITED=false;location.hash='#home';CUR='home';render(true);renderChrome();toast('Session data was cleared when you left');}
    else if(LASTFOCUS&&LASTFOCUS.focus){try{LASTFOCUS.focus();}catch(e){}}
  }
}

/* ---------- router ---------- */
const PAGES={};
let CUR='home';
function route(){const id=(location.hash||'#home').slice(1);CUR=PAGES[id]?id:'home';render(true);}
function render(top){
  const p=PAGES[CUR];
  $('#view').innerHTML=p.r();
  renderChrome();
  p.i&&p.i();
  if(top){window.scrollTo(0,0);try{$('#view').focus({preventScroll:true});}catch(e){}}
  applyPrefs();
}
function rerender(){const y=window.scrollY;const a=document.activeElement&&document.activeElement.id;render(false);window.scrollTo(0,y);if(a){const e=document.getElementById(a);if(e&&e.focus&&e.tagName!=='BODY')try{e.focus({preventScroll:true});}catch(x){}}}
function renderChrome(){
  const sec=SECOF[CUR];
  $('#subnav').innerHTML=(sec&&sec.pages&&sec.id!=='home')?'<div class="subnav"><div class="wrap" role="navigation" aria-label="'+esc(sec.title)+' pages">'+sec.pages.map(p=>'<a href="#'+p[0]+'"'+(p[0]===CUR?' aria-current="page"':'')+'>'+esc(p[1])+'</a>').join('')+'</div></div>':'';
  $$('#menu>li').forEach(li=>li.classList.toggle('cur',li.dataset.sec===(sec&&sec.id)));
  const n=S.user?(S.user.nick||'You'):'';
  $('#acctBtn').innerHTML=S.user?'<i>'+esc(n.charAt(0).toUpperCase())+'</i><span>'+esc(n)+'</span>':'<i>'+ic('user','sm')+'</i><span>Sign in</span>';
  if(!$('#demo').hidden)renderDemo();
}
function buildMenu(){
  $('#menu').innerHTML=SECTIONS.map(s=>s.id==='home'?'<li data-sec="home"><a href="#home">Home</a></li>':'<li data-sec="'+s.id+'"><button type="button" aria-expanded="false" data-act="drop" data-d="'+s.id+'">'+esc(s.title)+ic('chev')+'</button><div class="drop" id="drop-'+s.id+'">'+s.pages.map(p=>'<a href="#'+p[0]+'">'+esc(p[1])+'</a>').join('')+'</div></li>').join('');
  $('#mnav').innerHTML=SECTIONS.filter(s=>s.id!=='home').map(s=>'<details><summary>'+esc(s.title)+'</summary>'+s.pages.map(p=>'<a href="#'+p[0]+'">'+esc(p[1])+'</a>').join('')+'</details>').join('')+'<p class="fine" style="color:var(--on-ink-muted);margin-top:20px">Need to talk to someone now? Call or text 9-8-8 any time in Canada.</p>';
  $('#burger').innerHTML=ic('menu');
}
function closeDrops(){$$('.drop.open').forEach(d=>d.classList.remove('open'));$$('#menu button[aria-expanded=true]').forEach(b=>b.setAttribute('aria-expanded','false'));}

/* ---------- demo panel ---------- */
function renderDemo(){
  const d=$('#demo');const lbl=nextLabel();
  const stage=['Not started','In clinician review','Review complete','At the lab','Result ready','Follow-up done'][S.stage];
  d.innerHTML='<h4>Prototype tools</h4><p>Real care needs clinicians, labs and pharmacies. These buttons stand in for them so you can try the whole journey. Current stage: <b style="color:var(--on-ink)">'+stage+'</b></p>'
   +'<button class="btn btn-glow sm" data-act="d-sample">Load sample patient</button>'
   +'<button class="btn btn-ghost sm" data-act="d-next"'+(lbl?'':' disabled')+'>'+(lbl?'Next: '+esc(lbl):(S.stage===0?'Next: submit an intake first':'Journey complete'))+'</button>'
   +'<div class="field" style="margin:4px 0 12px"><label for="outcome" class="fine" style="color:var(--on-ink-muted)">Lab result outcome</label><select id="outcome" data-chg="outcome"><option value="detected"'+(S.outcome==='detected'?' selected':'')+'>HSV detected</option><option value="none"'+(S.outcome==='none'?' selected':'')+'>No HSV detected</option></select></div>'
   +'<button class="btn btn-ghost sm" data-act="d-reset">Reset everything</button>';
}

/* ---------- events ---------- */
const ACT={};
const CHG={};
document.addEventListener('click',e=>{
  const m=e.target.closest('[data-modal]');
  if(m&&MODAL){const a=MODAL.actions[+m.dataset.modal];const r=a.fn?a.fn():undefined;if(r!==false)closeModal();return;}
  if(e.target.id==='mbg'){closeModal();return;}
  if(!e.target.closest('#menu'))closeDrops();
  const a=e.target.closest('[data-act]');
  if(a&&ACT[a.dataset.act])ACT[a.dataset.act](a,e);
});
document.addEventListener('change',e=>{const a=e.target.closest('[data-chg]');if(a&&CHG[a.dataset.chg])CHG[a.dataset.chg](e.target,e);});
document.addEventListener('input',e=>{const a=e.target.closest('[data-inp]');if(a&&CHG[a.dataset.inp])CHG[a.dataset.inp](e.target,e);});
let LASTESC=0;
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  const now=Date.now();
  if(now-LASTESC<650){LASTESC=0;exitToggle();return;}
  LASTESC=now;
  if(MODAL){closeModal();return;}
  if($('.drop.open')){closeDrops();return;}
  if($('#mnav.open')){$('#mnav').classList.remove('open');$('#burger').setAttribute('aria-expanded','false');}
});

ACT.drop=(b)=>{const d=$('#drop-'+b.dataset.d);const was=d.classList.contains('open');closeDrops();if(!was){d.classList.add('open');b.setAttribute('aria-expanded','true');}};
ACT.signin=()=>{const n=($('#nick').value||'').trim()||'Guest';S.user={nick:n};S.prefs.nick=n;save();renderChrome();rerender();toast('Welcome, '+n);};
ACT['d-sample']=()=>loadSample();
ACT['d-next']=()=>{advance();renderChrome();if(/^(care|my)-/.test(CUR))rerender();toast('Updated: '+STAGE_TOAST());};
function STAGE_TOAST(){return ['','Intake in review','Review complete','Sample at the lab','Result ready','Follow-up complete'][S.stage]+(S.stage===5&&S.rx?' ('+RXSTEPS[S.rx.step].toLowerCase()+')':'');}
ACT['d-reset']=()=>confirmBox('Reset the demo?','This clears everything you entered in this prototype and starts again.','Reset',()=>{resetAll();},'btn-danger');
CHG.outcome=(el)=>{S.outcome=el.value;save();};
ACT.exit=()=>exitToggle();
ACT['go']=(a)=>{location.hash='#'+a.dataset.to;};
ACT.copy=(a)=>copyText(a.dataset.text||($('#'+a.dataset.from)||{}).value||($('#'+a.dataset.from)||{}).textContent||'');
