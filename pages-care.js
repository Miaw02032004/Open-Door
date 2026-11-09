'use strict';
/* shared page helpers */
const reg=(id,r,i)=>{PAGES[id]={r:r,i:i};};
function page(id,lede,inner,wide){
  const sec=SECOF[id];
  return `<div class="page"><div class="wrap"><div class="page-head"><p class="crumbs"><a href="#home">Home</a> / ${esc(sec.title)}</p><h1>${esc(TITLE[id])}</h1>${lede?`<p>${lede}</p>`:''}</div>${inner}</div></div>`;
}
const radios=(name,opts,cur,col)=>`<div class="opts ${col?'col':''}">${opts.map(o=>`<label><input type="radio" id="${name}-${String(o[0]).replace(/\W/g,'_')}" name="${name}" value="${o[0]}" data-chg="${name.split('.')[0]}"${cur===o[0]?' checked':''}><span>${esc(o[1])}</span></label>`).join('')}</div>`;
const checks=(name,opts,cur)=>`<div class="opts">${opts.map((o,i)=>`<label><input type="checkbox" id="${name}-${i}" name="${name}" value="${esc(o)}" data-chg="${name.split('.')[0]}"${(cur||[]).includes(o)?' checked':''}><span>${esc(o)}</span></label>`).join('')}</div>`;
const URGENT='<div class="callout alert"><p><b>Get urgent care now</b> if you have a severe headache with fever or confusion, eye pain or redness with sores near the eye, or you are pregnant and have sores close to delivery. Call 911 or go to the nearest emergency department.</p></div>';

/* ===================== HOME ===================== */
reg('home',()=>`
<header class="hero"><div class="wrap hero-grid">
  <div>
    <p class="eyebrow">Confidential telehealth for Ontario university students</p>
    <h1>A quiet way in for <em>HSV care.</em></h1>
    <p class="lede">Open Door brings herpes simplex virus assessment, testing, treatment and mental health support into one private browser-based service, and works with student-run clubs to take the shame out of asking.</p>
    <div class="cta"><a class="btn btn-glow" href="#care-intake">Start a confidential intake</a><a class="btn btn-ghost" href="#learn-types">Learn about HSV first</a></div>
  </div>
  <div class="door-wrap">
    <button class="doorway" id="door" type="button" aria-pressed="true" aria-label="Door. Toggle open or closed"><span class="frame"><span class="light"></span><span class="leaf"><span class="knob"></span></span></span><span class="spill"></span></button>
    <p class="door-cap" id="doorCap">Door open. Click to close it.</p>
  </div>
</div></header>

<section class="section"><div class="wrap grid2" style="align-items:start;gap:56px">
  <div><p class="kicker">Introduction</p><h2>Most HSV is quiet. The silence is what spreads it.</h2></div>
  <div>
    <p>Herpes simplex virus is very common. In 2020 an estimated 3.8 billion people under 50 had HSV-1 and 520 million people aged 15 to 49 had HSV-2. Many never have symptoms, and the virus can pass on without anyone knowing.</p>
    <p>The hardest part is often not the virus but the shame around it. Stigma keeps people from asking questions, getting tested and talking to partners. Open Door was designed around that barrier: private, clinician-led and built for students.</p>
    <p class="fine">Sources: Harfouche et al., 2024; WHO, 2024; Sabater Cabrera et al., 2025.</p>
  </div>
</div></section>

<section class="section paper"><div class="wrap">
  <div class="sec-head"><p class="kicker">How Open Door works</p><h2>Five steps from worry to care.</h2></div>
  <div class="how">
    <div><b>Confidential intake</b><span>A short private form, after you give informed consent.</span></div>
    <div><b>Clinician review</b><span>A clinician decides if testing would actually help you.</span></div>
    <div><b>Testing referral</b><span>An electronic requisition for campus health or any clinic you choose.</span></div>
    <div><b>Virtual follow-up</b><span>Results, transmission, disclosure and treatment explained.</span></div>
    <div><b>Care at your door</b><span>Discreet delivery of treatment, plus mental health referrals.</span></div>
  </div>
  <p class="fine mt">No at-home test kit is approved by Health Canada yet, so sample collection happens in person. Open Door plans to lobby for approval.</p>
</div></section>

<section class="section"><div class="wrap">
  <div class="sec-head"><p class="kicker">Quick access</p><h2>Go straight to what you need.</h2></div>
  <div class="quick">
    <a class="tile" href="#care-intake">${ic('door')}<b>Start intake</b><span>Private form, about five minutes.</span></a>
    <a class="tile" href="#care-consult">${ic('video')}<b>Book a consultation</b><span>Video or phone with a clinician.</span></a>
    <a class="tile" href="#care-clinics">${ic('pin')}<b>Find a clinic</b><span>Campus and community sites.</span></a>
    <a class="tile" href="#my-results">${ic('flask')}<b>See test results</b><span>Revealed only when you are ready.</span></a>
    <a class="tile" href="#care-assess">${ic('pulse')}<b>Check my symptoms</b><span>Two questions, no account.</span></a>
    <a class="tile" href="#mind-support">${ic('heart')}<b>Talk to someone</b><span>Support and crisis lines.</span></a>
    <a class="tile" href="#rel-disclosure">${ic('chat')}<b>Disclosure guide</b><span>Telling a partner, step by step.</span></a>
    <a class="tile" href="#comm-forum">${ic('users')}<b>Anonymous forum</b><span>Peers who get it.</span></a>
  </div>
</div></section>

<section class="section dark"><div class="wrap">
  <div class="sec-head"><p class="kicker" style="color:var(--glow)">Privacy information</p><h2>No app icon. No notifications. No trace left behind.</h2>
  <p>Open Door follows Ontario's Personal Health Information Protection Act (PHIPA). You control what is shared, and you can leave instantly.</p></div>
  <div class="privgrid">
    <div>${ic('eye')}<b>Runs in a browser</b>Nothing on your home screen and no lock-screen alerts.</div>
    <div>${ic('check')}<b>Consent you control</b>Informed consent first, and you can withdraw it at any time.</div>
    <div>${ic('shield')}<b>Canadian hosting</b>Encrypted, audited and stored in Toronto data centres.</div>
    <div>${ic('box')}<b>Discreet delivery</b>Treatment arrives in plain packaging at your door.</div>
  </div>
  <div class="row mt"><button class="btn btn-glow" data-act="exit">Try Quick exit</button><a class="btn btn-ghost" href="#acct-consent">Manage your privacy</a><span class="fine" style="color:var(--on-ink-muted)">Shortcut: press Esc twice.</span></div>
</div></section>`,
()=>{const d=$('#door'),c=$('#doorCap');if(!d)return;d.addEventListener('click',()=>{const o=d.getAttribute('aria-pressed')==='true';d.setAttribute('aria-pressed',String(!o));c.textContent=o?'Door closed. Nobody sees in. Click to open it.':'Door open. Click to close it.';});});

/* ===================== GET CARE: INTAKE ===================== */
const W={step:0,d:{consent:false,lesionsNow:null,areas:[],onset:'',past:null,prev:null,weak:[],testPref:'campus',contact:'inapp',note:''}};
const ISTEPS=['Consent','Symptoms','History','Preferences','Review'];
reg('care-intake',()=>{
  if(S.intake&&S.stage>=1)return page('care-intake','Your intake is in. Here is where things stand.',intakeDone());
  const d=W.d,s=W.step;
  let body='';
  if(s===0)body=`<h3>Before you start</h3>
    <p>Open Door is a virtual service. That brings some privacy risks, such as someone seeing your screen or a shared device keeping traces. We reduce them with a browser-only design, encryption and a Quick exit button, but we cannot remove them completely.</p>
    <ul class="muted"><li>Your answers go only to the clinicians who care for you (your circle of care).</li><li>You can withdraw consent at any time in Account and privacy.</li><li>This prototype keeps your answers in this browser tab and sends nothing.</li></ul>
    <div class="switch" style="border:2px solid var(--line);border-radius:14px;padding:16px 18px;background:var(--mist)"><div><b>I understand the risks of virtual care and I consent to use Open Door.</b></div>${sw('iw-consent',d.consent,'iw')}</div>`;
  if(s===1)body=`${URGENT}<fieldset class="mt"><legend>Do you have sores, blisters or ulcers right now?</legend><p class="hint">Include anything you thought might be another skin problem.</p>${radios('iw.lesionsNow',[['yes','Yes'],['no','No']],d.lesionsNow)}</fieldset>
    ${d.lesionsNow==='yes'?`<fieldset><legend>Where are they?</legend>${checks('iw.areas',['Mouth or lips','Genital area','Buttocks or thighs','Somewhere else'],d.areas)}</fieldset>
    <div class="field" style="max-width:320px"><label for="onset">When did you first notice them?</label><select id="onset" data-chg="iwsel"><option value="">Choose</option>${['Today','1 to 3 days ago','4 to 7 days ago','More than a week ago'].map(o=>`<option${d.onset===o?' selected':''}>${o}</option>`).join('')}</select></div>`:''}`;
  if(s===2)body=`<fieldset><legend>Have you had sores or blisters like this before?</legend><p class="hint">Even if they cleared up by themselves.</p>${radios('iw.past',[['yes','Yes'],['no','No']],d.past)}</fieldset>
    <fieldset><legend>Have you ever been told you have HSV?</legend>${radios('iw.prev',[['yes','Yes'],['no','No'],['unsure','Not sure']],d.prev)}</fieldset>
    <fieldset><legend>Does any of this apply to you?</legend><p class="hint">Optional. HSV can cause more serious illness in these situations, so your clinician will want to know.</p>${checks('iw.weak',['I am pregnant','I have a weakened immune system'],d.weak)}</fieldset>`;
  if(s===3)body=`<fieldset><legend>If a test is recommended, where would you like to go?</legend>${radios('iw.testPref',[['campus','Campus health, if an appointment is free'],['clinic','A clinic I choose'],['later','I will decide later']],d.testPref,true)}</fieldset>
    <fieldset><legend>How may we reach you?</legend>${radios('iw.contact',[['inapp','Only inside Open Door'],['email','Neutral email that never mentions HSV']],d.contact,true)}</fieldset>
    <div class="field"><label for="note">Anything you want the clinician to know? <span class="muted">(optional)</span></label><textarea id="note" data-inp="iwnote" placeholder="Please do not include your full name, phone number or student number.">${esc(d.note)}</textarea></div>`;
  if(s===4)body=`<h3>Check your answers</h3><div class="tablewrap"><table><tbody>
    <tr><th>Sores right now</th><td>${d.lesionsNow==='yes'?'Yes'+(d.areas.length?': '+esc(d.areas.join(', ')):'')+(d.onset?' ('+esc(d.onset.toLowerCase())+')':''):'No'}</td></tr>
    <tr><th>Past sores</th><td>${d.past==='yes'?'Yes':'No'}</td></tr>
    <tr><th>Previous HSV diagnosis</th><td>${{yes:'Yes',no:'No',unsure:'Not sure'}[d.prev]||'Not answered'}</td></tr>
    <tr><th>Tell the clinician</th><td>${d.weak.length?esc(d.weak.join(', ')):'Nothing added'}</td></tr>
    <tr><th>Test location</th><td>${{campus:'Campus health if free',clinic:'A clinic I choose',later:'Decide later'}[d.testPref]}</td></tr>
    <tr><th>Contact</th><td>${d.contact==='email'?'Neutral email':'Only inside Open Door'}</td></tr></tbody></table></div>
    <p class="fine mt">A clinician reviews your form and decides whether testing is needed. Current guidelines advise against testing people with no symptoms, so a referral is only issued when it is likely to help.</p>`;
  const ok=s===0?d.consent:s===1?!!d.lesionsNow:s===2?!!d.past:true;
  return page('care-intake','A short, private form. A clinician reads it and decides what happens next.',`
  <div class="grid2" style="grid-template-columns:1.4fr .8fr;align-items:start">
    <div class="card"><p class="fine" style="margin-bottom:10px">Step ${s+1} of 5: ${ISTEPS[s]}</p><div class="steps">${ISTEPS.map((x,i)=>`<i class="${i<=s?'on':''}"></i>`).join('')}</div>${body}
      <div class="row mt between"><button class="btn btn-line" data-act="iw-back"${s===0?' disabled':''}>Back</button>${s<4?`<button class="btn btn-primary" data-act="iw-next"${ok?'':' disabled'}>Continue</button>`:`<button class="btn btn-primary" data-act="iw-submit">Submit intake</button>`}</div></div>
    <aside class="stack"><div class="card ink"><h3>Private by design</h3><p>No account, real name or student number is needed. Press Esc twice at any time to hide this page.</p></div><div class="card tight"><h4>Prefer to check first?</h4><p class="muted" style="margin:0 0 10px">The symptom assessment takes two questions and needs no account.</p><a class="btn btn-line sm" href="#care-assess">Check my symptoms</a></div></aside>
  </div>`);
});
function intakeDone(){
  const st=S.stage;
  const msg=st===1?'A clinician is reviewing your form. In this demo that takes a few seconds.':S.referral?'Your clinician issued an electronic requisition for a swab test.':'Your clinician does not advise a test right now and suggests a consultation.';
  return `<div class="grid2" style="grid-template-columns:1.3fr .9fr;align-items:start"><div class="card"><span class="badge ${st===1?'info':'ok'}">${st===1?'In clinician review':'Review complete'}</span><h3 style="margin-top:12px">Reference ${esc(S.intake.ref)}</h3><p>${msg}</p>
    <div class="row mt">${S.referral?'<a class="btn btn-primary" href="#care-referral">Open my requisition</a>':st>1?'<a class="btn btn-primary" href="#care-consult">Book a consultation</a>':''}<a class="btn btn-line" href="#my-dashboard">Go to my dashboard</a></div></div>
    <div class="card"><h4>What happens next</h4><ol class="muted" style="padding-left:1.2em;margin:0"><li>Review by a clinician</li><li>Testing referral, only if it would help</li><li>Virtual follow-up</li><li>Treatment and support</li></ol></div></div>`;
}
CHG.iw=(el)=>{const n=el.name||el.id,d=W.d;
  if(el.id==='iw-consent')d.consent=el.checked;
  else if(el.type==='checkbox'){const k=n.split('.')[1];d[k]=el.checked?d[k].concat(el.value):d[k].filter(v=>v!==el.value);}
  else d[n.split('.')[1]]=el.value;
  rerender();};
CHG.iwsel=(el)=>{W.d.onset=el.value;};
CHG.iwnote=(el)=>{W.d.note=el.value;};
ACT['iw-next']=()=>{W.step=Math.min(4,W.step+1);rerender();window.scrollTo(0,0);};
ACT['iw-back']=()=>{W.step=Math.max(0,W.step-1);rerender();};
ACT['iw-submit']=()=>{submitIntake(JSON.parse(JSON.stringify(W.d)));W.step=0;renderChrome();rerender();toast('Intake submitted');window.scrollTo(0,0);};

/* ===================== ASSESSMENT ===================== */
const A={warn:null,now:null,past:null};
reg('care-assess',()=>{
  let res='';
  if(A.warn==='yes')res=`<div class="callout alert"><h3>Please get urgent care</h3><p>Those signs need a clinician in person today. Call 911 or go to the nearest emergency department. This tool cannot help with an emergency.</p></div>`;
  else if(A.warn==='no'&&A.now==='yes')res=r3('flag','Flagged for clinician review','A clinician would likely send you for testing.','An active lesion is the best moment to test. A swab is most reliable while a lesion is present and can miss infection when it is old or gone.');
  else if(A.warn==='no'&&A.now==='no'&&A.past==='yes')res=r3('flag','Flagged for clinician review','Your history is worth a conversation.','A past lesion is enough for a clinician to consider testing. A swab may miss infection when no lesion is present, so the clinician decides what makes sense.');
  else if(A.warn==='no'&&A.now==='no'&&A.past==='no')res=r3('info','Routine testing not advised','A test would likely not help right now.','Without symptoms, blood tests give many false positives and swabs can miss intermittent shedding, so guidelines advise against routine testing. You can still talk to a clinician about questions, partners or how you feel.');
  else res=`<div class="card" style="border-style:dashed;background:var(--mist)"><span class="badge off">Waiting for answers</span><h3 style="margin-top:12px">Your result appears here</h3><p class="muted">Answer the questions on the left.</p></div>`;
  return page('care-assess','Two quick questions show what a clinician would likely do. Nothing is saved or sent.',`<div class="grid2" style="align-items:start"><div class="card">
   <fieldset><legend>Do you have any urgent warning signs?</legend><p class="hint">A severe headache with fever or confusion, eye pain or redness with sores near the eye, or you are pregnant with sores close to delivery.</p>${radios('as.warn',[['yes','Yes'],['no','No']],A.warn)}</fieldset>
   ${A.warn==='no'?`<fieldset><legend>Do you have sores, blisters or ulcers right now?</legend><p class="hint">Include anything you thought was another skin problem.</p>${radios('as.now',[['yes','Yes'],['no','No']],A.now)}</fieldset>`:''}
   ${A.warn==='no'&&A.now==='no'?`<fieldset><legend>Have you had them before?</legend>${radios('as.past',[['yes','Yes'],['no','No']],A.past)}</fieldset>`:''}
   <p class="fine">This shows the review logic only. It is not medical advice or a diagnosis.</p><button class="link" data-act="as-reset">Clear answers</button></div>
   <div>${res}</div></div>`);
});
function r3(kind,chip,h,p){return `<div class="card" style="border-left:8px solid ${kind==='flag'?'var(--teal)':'#4b6393'}"><span class="badge ${kind==='flag'?'ok':'info'}">${chip}</span><h3 style="margin-top:12px">${h}</h3><p>${p}</p><div class="row"><a class="btn btn-primary" href="#care-intake">Start a confidential intake</a><a class="btn btn-line" href="#care-consult">Book a consultation</a></div></div>`;}
CHG.as=(el)=>{const k=el.name.split('.')[1];A[k]=el.value;if(k==='warn'&&el.value==='yes'){A.now=null;A.past=null;}if(k==='now'&&el.value==='yes')A.past=null;rerender();};
ACT['as-reset']=()=>{A.warn=A.now=A.past=null;rerender();};

/* ===================== REFERRAL ===================== */
reg('care-referral',()=>{
  const r=S.referral;
  if(!r){
    const inner=S.stage===1?`<div class="card"><span class="badge info">In clinician review</span><h3 style="margin-top:12px">Your intake is being reviewed</h3><p class="muted">If testing would help, your electronic requisition appears here.</p></div>`
      :S.stage>=2?`<div class="card"><span class="badge off">No referral</span><h3 style="margin-top:12px">Testing is not advised right now</h3><p class="muted">Guidelines advise against testing without symptoms. A consultation can still help with questions. If sores appear, start a new intake.</p><a class="btn btn-primary" href="#care-consult">Book a consultation</a></div>`
      :`<div class="card"><h3>No referral yet</h3><p class="muted">A referral comes from a clinician after you complete the confidential intake.</p><a class="btn btn-primary" href="#care-intake">Start intake</a></div>`;
    return page('care-referral','Electronic requisitions let you give a sample at the place that suits you.',inner);
  }
  const c=CLINICS.find(x=>x.id===r.clinic);const left=Math.max(0,10-S.campusUsed);
  return page('care-referral','Take this requisition to campus health or any clinic you prefer. Results go back to your clinician.',`
  <div class="grid2" style="grid-template-columns:1.2fr .9fr;align-items:start">
   <div class="stack"><div class="req"><span class="stamp">Issued</span><p class="kicker">Electronic requisition</p><h3>${esc(r.test)}</h3>
    <dl><dt>Reference</dt><dd>${esc(r.ref)}</dd><dt>Issued</dt><dd>${fd(r.issued,{month:'long',day:'numeric',year:'numeric'})}</dd><dt>Issuing clinician</dt><dd>Open Door clinician (sample)</dd><dt>Sample goes to</dt><dd>Public health laboratory</dd><dt>Results go to</dt><dd>Your issuing clinician, then your dashboard</dd><dt>Collection site</dt><dd>${c?esc(c.name):'Not chosen yet'}</dd><dt>Status</dt><dd>${{issued:'Ready to use',collected:'Sample sent to lab',resulted:'Result released'}[r.status]}</dd></dl></div>
    <div class="callout info"><p><b>Timing matters.</b> A swab works best while a lesion is present. If yours is healing, go as soon as you can.</p></div></div>
   <div class="stack"><div class="card"><h3>Where will you collect?</h3>
     <div class="item" style="margin-bottom:12px"><div><b>Campus health</b><div class="fine">${left} of 10 reserved appointments left this month</div></div><button class="btn btn-primary sm" data-act="book-campus"${left?'':' disabled'}>Book</button></div>
     <div class="item"><div><b>A clinic of your choice</b><div class="fine">Accepts electronic requisitions</div></div><a class="btn btn-line sm" href="#care-clinics">Find</a></div></div>
    <div class="card"><h4>What happens to your sample</h4><ol class="muted" style="padding-left:1.2em;margin:0"><li>Collection at the site you chose</li><li>Public health laboratory</li><li>Result returned to your clinician</li><li>You are told when it is ready</li></ol></div></div>
  </div>`);
});
ACT['book-campus']=()=>{S.bookReason='campus';save();location.hash='#care-consult';};

/* ===================== CLINICS ===================== */
const CF={kind:'all',eve:false,q:'',sel:null};
function clinicsFiltered(){return CLINICS.filter(c=>(CF.kind==='all'||c.kind===CF.kind)&&(!CF.eve||c.evening)&&(!CF.q||c.name.toLowerCase().includes(CF.q.toLowerCase()))).sort((a,b)=>a.km-b.km);}
function clinicList(){const l=clinicsFiltered();return l.length?l.map(c=>`<div class="clinic ${CF.sel===c.id?'sel':''}" data-act="c-sel" data-id="${c.id}" role="button" tabindex="0"><div class="row between"><b>${CLINICS.indexOf(c)+1}. ${esc(c.name)}</b><span class="badge ${c.kind==='campus'?'ok':'info'}">${c.kind==='campus'?'On campus':'Off campus'}</span></div><div class="fine">${esc(c.addr)} &middot; ${c.km} km</div><div class="fine">${esc(c.hours)}${c.evening?' &middot; evening hours':''}</div>${CF.sel===c.id?`<p style="margin:6px 0 0">${esc(c.note)}</p><div class="row mt" style="margin-top:12px">${S.referral?`<button class="btn btn-primary sm" data-act="c-use" data-id="${c.id}"${S.referral.clinic===c.id?' disabled':''}>${S.referral.clinic===c.id?'Chosen for my referral':'Use for my referral'}</button>`:'<a class="btn btn-line sm" href="#care-intake">Get a referral first</a>'}</div>`:''}</div>`).join(''):'<div class="card"><p class="muted" style="margin:0">No clinics match those filters.</p></div>';}
function clinicMap(){
  return `<svg viewBox="0 0 600 340" role="img" aria-label="Sample map with five clinic pins"><rect width="600" height="340" fill="#e8efe9"/>
  <path d="M0 270 C120 240 200 300 330 270 S520 230 600 260 L600 300 C500 270 400 330 300 305 S100 280 0 310z" fill="#cfe3ea"/>
  <rect x="240" y="120" width="130" height="110" rx="10" fill="#d6e8d6"/><text x="305" y="222" text-anchor="middle" style="font:700 11px var(--body);fill:#46604a">CAMPUS</text>
  <g stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"><path d="M0 120H600"/><path d="M0 200H600"/><path d="M180 0V340"/><path d="M400 0V260"/><path d="M90 0L260 340"/></g>
  <g stroke="#dfe7e1" stroke-width="2" fill="none"><path d="M0 60H600M0 160H600M0 240H600M300 0V340M500 0V340"/></g>
  ${CLINICS.map((c,i)=>`<g class="pin ${c.kind==='campus'?'campus':''} ${CF.sel===c.id?'sel':''}" data-act="c-sel" data-id="${c.id}" transform="translate(${c.x} ${c.y})" role="button" tabindex="0" aria-label="${esc(c.name)}"><circle r="16"/><text y="5">${i+1}</text></g>`).join('')}</svg>`;
}
reg('care-clinics',()=>page('care-clinics','Find a place to give a sample. Every site here accepts Open Door electronic requisitions.',`
  <div class="callout info" style="margin-bottom:20px"><p><b>Sample listings.</b> These clinics are placeholders. In a live service they would be real, verified sites.</p></div>
  <div class="row" style="margin-bottom:18px"><div class="chips" role="group" aria-label="Filters"><button class="chip" data-act="c-kind" data-k="all" aria-pressed="${CF.kind==='all'}">All</button><button class="chip" data-act="c-kind" data-k="campus" aria-pressed="${CF.kind==='campus'}">On campus</button><button class="chip" data-act="c-kind" data-k="off" aria-pressed="${CF.kind==='off'}">Off campus</button><button class="chip" data-act="c-eve" aria-pressed="${CF.eve}">Evening hours</button></div><div style="flex:1;min-width:200px"><label class="sr" for="cq">Search clinics</label><input type="search" id="cq" data-inp="cq" placeholder="Search by name" value="${esc(CF.q)}"></div></div>
  <div class="grid2" style="grid-template-columns:1.1fr .9fr;align-items:start"><div class="mapbox" id="cmap">${clinicMap()}</div><div class="stack" id="clist">${clinicList()}</div></div>`));
function refreshClinics(){$('#clist').innerHTML=clinicList();$('#cmap').innerHTML=clinicMap();$$('[data-act=c-kind]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.k===CF.kind)));$('[data-act=c-eve]').setAttribute('aria-pressed',String(CF.eve));}
ACT['c-kind']=(b)=>{CF.kind=b.dataset.k;refreshClinics();};
ACT['c-eve']=()=>{CF.eve=!CF.eve;refreshClinics();};
ACT['c-sel']=(a)=>{CF.sel=a.dataset.id;refreshClinics();};
ACT['c-use']=(a)=>{S.referral.clinic=a.dataset.id;addEvent('Collection site chosen',CLINICS.find(c=>c.id===a.dataset.id).name);save();refreshClinics();toast('Saved to your referral');};
CHG.cq=(el)=>{CF.q=el.value;$('#clist').innerHTML=clinicList();};
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('[data-act=c-sel]')){e.preventDefault();ACT['c-sel'](e.target);}});

/* ===================== CONSULT BOOKING ===================== */
const B={reason:'Talk through my intake',mode:'Video',day:null,slot:null,done:null};
const REASONS=['Talk through my intake','Discuss my test result','Treatment options','Counselling check-in'];
function slotsFor(d){const out=[];const now=new Date();for(let h=9;h<=19;h++){const dt=new Date(d.getFullYear(),d.getMonth(),d.getDate(),h);const taken=((d.getDate()*7+h*3)%5===0)||dt<=new Date(now.getTime()+3600e3);out.push({h:h,dt:dt,taken:taken});}return out;}
reg('care-consult',()=>{
  const campus=S.bookReason==='campus';const left=Math.max(0,10-S.campusUsed);
  const days=[];for(let i=0;i<7;i++){days.push(new Date(Date.now()+i*DAY));}
  if(B.day===null){B.day=0;for(let i=0;i<7;i++){if(slotsFor(days[i]).some(s=>!s.taken)){B.day=i;break;}}}
  const sl=slotsFor(days[B.day]);
  if(B.done){return page('care-consult','Booked. You will find it under My health, Appointments.',`<div class="card" style="max-width:640px"><span class="badge ok">Confirmed</span><h3 style="margin-top:12px">${esc(B.done.type)}</h3><p class="when" style="font-family:var(--display);font-size:1.8rem;margin:0 0 6px">${fdt(B.done.when)}</p><p class="muted">${esc(B.done.mode)}${B.done.mode==='In person'?' at the Sample Campus Health Centre':' with an Open Door clinician. Your clinician sees only your nickname.'}</p><div class="row mt"><a class="btn btn-primary" href="#my-appts">Set up reminders</a>${B.done.mode!=='In person'?'<button class="btn btn-line" data-act="room">Preview the waiting room</button>':''}<button class="btn btn-line" data-act="b-again">Book another</button></div></div>`);
  }
  return page('care-consult',campus?'Book a campus health appointment to give your sample. Open Door reserves 10 per month.':'Meet a clinician by video or phone. Choose a time that works around classes.',`
  ${campus?`<div class="callout info" style="margin-bottom:20px"><p><b>Campus sample collection.</b> ${left} of 10 reserved appointments are left this month. ${left?'':'All are taken, so use your requisition at any clinic. '}<button class="link" data-act="b-virtual">Book a virtual consultation instead</button></p></div>`:''}
  <div class="grid2" style="grid-template-columns:.8fr 1.2fr;align-items:start">
   <div class="card">${campus?`<h3>Campus sample collection</h3><p class="muted">In person at the Sample Campus Health Centre, with your electronic requisition.</p>`:`<fieldset><legend>What would you like to talk about?</legend>${radios('bk.reason',REASONS.map(r=>[r,r]),B.reason,true)}</fieldset><fieldset><legend>How would you like to meet?</legend>${radios('bk.mode',[['Video','Video'],['Phone','Phone call']],B.mode)}</fieldset>`}<p class="fine">You can cancel from your appointments page at any time.</p></div>
   <div class="card"><h3>Pick a time</h3><div class="days" role="group" aria-label="Day">${days.map((d,i)=>`<button class="day" data-act="b-day" data-i="${i}" aria-pressed="${B.day===i}">${d.toLocaleDateString('en-CA',{weekday:'short'})}<b>${d.getDate()}</b>${d.toLocaleDateString('en-CA',{month:'short'})}</button>`).join('')}</div>
   <p class="lab" style="margin:20px 0 10px">${fd(days[B.day],{weekday:'long',month:'long',day:'numeric'})}</p>
   <div class="slots">${sl.map(s=>`<button class="chip" data-act="b-slot" data-h="${s.h}" aria-pressed="${B.slot===s.h&&!s.taken}"${s.taken?' disabled':''}>${ft(s.dt)}</button>`).join('')}</div>
   <div class="row mt between"><span class="fine">Times shown in your local time zone.</span><button class="btn btn-primary" data-act="b-confirm"${(B.slot!==null&&!(campus&&!left))?'':' disabled'}>Confirm booking</button></div></div>
  </div>`);
});
CHG.bk=(el)=>{B[el.name.split('.')[1]]=el.value;rerender();};
ACT['b-day']=(a)=>{B.day=+a.dataset.i;B.slot=null;rerender();};
ACT['b-slot']=(a)=>{B.slot=+a.dataset.h;rerender();};
ACT['b-virtual']=()=>{S.bookReason=null;save();rerender();};
ACT['b-again']=()=>{B.done=null;B.slot=null;rerender();};
ACT['b-confirm']=()=>{
  const campus=S.bookReason==='campus';const d=new Date(Date.now()+B.day*DAY);const when=new Date(d.getFullYear(),d.getMonth(),d.getDate(),B.slot);
  S.user=S.user||{nick:S.prefs.nick||'Guest student'};
  const ap={id:'a'+Date.now(),type:campus?'Sample collection at campus health':B.reason,when:when.toISOString(),mode:campus?'In person':B.mode,status:'confirmed'};
  S.appts.push(ap);
  if(campus){S.campusUsed++;if(S.referral)S.referral.clinic='c1';S.bookReason=null;}
  addEvent('Appointment booked',ap.type+' on '+fdt(ap.when)+'.');save();B.done=ap;B.slot=null;renderChrome();rerender();window.scrollTo(0,0);toast('Appointment confirmed');
};
ACT.room=()=>modal({title:'Waiting room preview',body:'<ul class="muted"><li>Find a private space and use headphones if you can.</li><li>Your camera stays off until you turn it on.</li><li>Your clinician sees your nickname, not your real name.</li><li>Press Esc twice if you need to hide the page quickly.</li></ul>',actions:[{label:'Close',cls:'btn-primary'}]});

/* ===================== FOLLOW-UP ===================== */
reg('care-followup',()=>{
  const fu=S.appts.find(a=>/follow-up|result/i.test(a.type)&&a.status==='confirmed');
  const items=[
   ['Review your test result',S.stage>=4?(S.result&&S.result.revealed?['ok','Done']:['info','Ready to open']):(S.stage===3?['warn','At the lab']:['off','Waiting']),'my-results','Open results'],
   ['Virtual follow-up with your clinician',S.stage>=5?['ok','Done']:(fu?['info','Booked '+fd(fu.when)]:['warn','Not booked']),'care-consult','Book a time'],
   ['Treatment plan',S.rx?['ok','Prescription sent']:(S.stage>=5?['off','No prescription needed']:['off','After follow-up']),'my-rx','View prescriptions'],
   ['Emotional support',S.moods.length?['ok','Checked in']:['off','Whenever you want it'],'mind-support','Open support'],
   ['Telling partners, when you are ready',['off','Your pace'],'rel-disclosure','Disclosure guide'],
   ['Symptom journal',S.journal.length?['ok',S.journal.length+' entries']:['off','Optional'],'my-journal','Open journal']];
  const next=S.stage===0?['Start a confidential intake','care-intake']:S.stage===4?['Open your result when you are ready','my-results']:S.stage<5&&!fu?['Book a virtual follow-up','care-consult']:['Check in with how you are feeling','mind-support'];
  return page('care-followup','Care does not stop at a result. Here is your plan, with the next step at the top.',`
  <div class="card ink" style="margin-bottom:20px"><p class="kicker" style="color:var(--glow)">Next best step</p><h3>${next[0]}</h3><a class="btn btn-glow" href="#${next[1]}">Go</a></div>
  <div class="list">${items.map(i=>`<div class="item"><div><b>${i[0]}</b></div><div class="row"><span class="badge ${i[1][0]}">${esc(i[1][1])}</span><a class="btn btn-line sm" href="#${i[2]}">${i[3]}</a></div></div>`).join('')}</div>
  <div class="callout mt"><p><b>New sores later?</b> Test while a lesion is present for the best chance of an accurate swab, and start a new intake. ${''}Urgent warning signs always need in-person care.</p></div>`);
});

/* ===================== LEARN ===================== */
reg('learn-types',()=>page('learn-types','Two closely related viruses. Either can cause infection in either area, but they tend to favour different ones.',`
 <div class="tablewrap card"><table><thead><tr><th></th><th>HSV-1</th><th>HSV-2</th></tr></thead><tbody>
  <tr><th>Mostly spread by</th><td>Oral contact</td><td>Sexual contact</td></tr>
  <tr><th>Most often causes</th><td>Oral herpes, such as cold sores. It can also cause genital herpes.</td><td>Recurrent genital herpes</td></tr>
  <tr><th>People infected (2020)</th><td>An estimated 3.8 billion under age 50</td><td>An estimated 520 million aged 15 to 49</td></tr>
  <tr><th>After infection</th><td colspan="2">Both viruses settle into nerve cells and stay for life, sometimes reactivating.</td></tr></tbody></table></div>
 <div class="grid3 mt"><div class="card"><h3>Infection</h3><p class="muted">The virus enters skin or mucous membranes and multiplies, which can cause sores.</p></div><div class="card"><h3>Latency</h3><p class="muted">It then hides in sensory nerve ganglia with almost no activity, and is not shedding at that point.</p></div><div class="card"><h3>Reactivation</h3><p class="muted">Triggers can wake it. It can then spread, even when there are no symptoms.</p></div></div>
 <p class="fine mt">Sources: Zhu and Viejo-Borbolla, 2021; Harfouche et al., 2024; WHO, 2024.</p>`));
reg('learn-symptoms',()=>page('learn-symptoms','Many people have no symptoms or very mild ones. That is exactly why HSV is often missed.',`
 <div class="grid3"><div class="card"><h3>None or mild</h3><p class="muted">Most infections are mild or silent. A small crack, a patch of irritation or a spot can be the only sign.</p></div><div class="card"><h3>Sores</h3><p class="muted">Painful blisters or ulcers on or around the mouth, genitals or buttocks. They can crust and heal over days to weeks.</p></div><div class="card"><h3>Recurrences</h3><p class="muted">Outbreaks may return, often milder and shorter than the first. They tend to become less frequent over time.</p></div></div>
 <div class="callout mt"><p><b>Easy to mistake.</b> Mild HSV sores are often taken for other skin conditions. They are highly contagious while present, so if you are unsure, get checked.</p></div><div class="mt">${URGENT}</div>
 <div class="row mt"><a class="btn btn-primary" href="#care-assess">Check my symptoms</a><a class="btn btn-line" href="#my-journal">Keep a symptom journal</a></div>`));
reg('learn-transmission',()=>page('learn-transmission','HSV passes through skin-to-skin contact. It can spread without sores, and that is the hard part.',`
 <div class="grid2"><div class="card"><h3>How it spreads</h3><ul class="muted"><li>Oral, vaginal or anal sex, and genital skin contact</li><li>Kissing and other close oral contact</li><li>Contact with sores, which are highly contagious</li><li>Asymptomatic shedding: the virus can be present on the skin with no sign at all</li></ul></div>
 <div class="card"><h3>What lowers the chance</h3><ul class="muted"><li>Avoiding sexual contact while sores or tingling are present</li><li>Antivirals taken as your clinician advises, which reduce viral shedding</li><li>Talking with partners so both people can decide</li><li>Condoms, which reduce but cannot reliably prevent transmission</li></ul></div></div>
 <div class="callout mt"><p>HSV also increases the chance of acquiring HIV on exposure while sores are present. Another reason to be seen when you notice them.</p></div>
 <p class="fine mt">Sources: WHO, 2024; CDC, 2024; CDC, 2026; Looker et al., 2017.</p><a class="btn btn-line mt" href="#rel-disclosure">How to talk to a partner</a>`));
const T={sym:true};
reg('learn-testing',()=>page('learn-testing','Which test works depends on whether you have a lesion. That is why Open Door asks first.',`
 <div class="chips" role="group" aria-label="Situation" style="margin-bottom:20px"><button class="chip" data-act="t-sym" data-v="1" aria-pressed="${T.sym}">I have a lesion</button><button class="chip" data-act="t-sym" data-v="0" aria-pressed="${!T.sym}">I have no symptoms</button></div>
 <div class="grid2">${T.sym?`<div class="card"><span class="badge ok">Preferred</span><h3 style="margin-top:12px">Swab (NAAT)</h3><p class="muted">High sensitivity and specificity, and it can tell HSV-1 from HSV-2. Best collected while a lesion is present.</p></div><div class="card"><span class="badge info">Limited</span><h3 style="margin-top:12px">Blood test</h3><p class="muted">Cannot tell an oral infection from a genital one, so it adds little when a lesion can be swabbed.</p></div>`
 :`<div class="card"><span class="badge warn">Often misses it</span><h3 style="margin-top:12px">Swab (NAAT)</h3><p class="muted">Shedding comes and goes. A swab with no lesion, or from an old one, can come back falsely negative.</p></div><div class="card"><span class="badge warn">Many false positives</span><h3 style="margin-top:12px">Blood test</h3><p class="muted">In low-risk people it often gives false positives and cannot separate oral from genital infection.</p></div>`}</div>
 ${T.sym?'':'<div class="callout mt"><p>Current guidelines advise against routine testing of people without symptoms. You can still talk with a clinician about your concerns.</p></div>'}
 <div class="card mt"><h3>The Open Door testing path</h3><p class="muted">Intake review, then an electronic requisition, then collection at campus health or a clinic you choose, then the public health laboratory, then your clinician, then you.</p><a class="btn btn-primary" href="#care-referral">See testing referrals</a></div>
 <p class="fine mt">Sources: CDC, 2021; CDC, 2026; Public Health Agency of Canada, 2021; Bibbins-Domingo et al., 2016; Tice et al., 2025.</p>`));
ACT['t-sym']=(a)=>{T.sym=a.dataset.v==='1';rerender();};
reg('learn-treatment',()=>page('learn-treatment','There is no cure and no approved vaccine, but treatment can make HSV much easier to live with.',`
 <div class="grid3"><div class="card"><h3>Antivirals</h3><p class="muted">Valacyclovir is a first-line treatment. It can reduce how severe outbreaks are, how long they last and how often they come back, and it reduces viral shedding.</p></div><div class="card"><h3>Episodic</h3><p class="muted">Taken at the start of an outbreak to shorten it. Good for people who have outbreaks only now and then.</p></div><div class="card"><h3>Suppressive</h3><p class="muted">Taken regularly to cut the number of outbreaks and shedding. Often chosen for frequent outbreaks or to lower the chance of passing HSV on.</p></div></div>
 <div class="card mt"><h3>Your clinician decides which is right for you</h3><p class="muted">Dose and timing are set in your virtual follow-up. They depend on your health and history, so this site never suggests doses. Open Door sends a prescription to a partner pharmacy and delivers it discreetly to your door.</p><div class="row"><a class="btn btn-primary" href="#my-rx">Track a prescription</a><a class="btn btn-line" href="#care-consult">Talk to a clinician</a></div></div>
 <p class="fine mt">Sources: WHO, 2024; Workowski et al., 2021; Frejborg et al., 2022.</p>`));
const MYTHS=[
 ['Only people with lots of partners get HSV.','HSV is extremely common. Billions of people carry it, many without ever knowing.'],
 ['If you had it, you would know.','Most infections are mild or silent, and HSV can shed from the skin with no symptoms.'],
 ['Condoms fully protect you.','They reduce the chance but cannot reliably prevent HSV, because it spreads from skin they do not cover.'],
 ['A diagnosis ends your sex life.','Antivirals, honest conversations and informed choices let people have healthy relationships. Stigma is usually the bigger burden.'],
 ['A blood test for everyone is the safest option.','Without symptoms, blood tests give many false positives. Guidelines advise against routine testing.'],
 ['Cold sores are not herpes.','Most cold sores are HSV-1, the same family of virus.'],
 ['There is a cure.','No cure or vaccine exists yet. Antivirals reduce outbreaks and shedding.'],
 ['It only spreads during an outbreak.','Sores are the most contagious time, but spread can happen with no sign at all.']];
reg('learn-myths',()=>page('learn-myths','Tap a card to flip it. Shame grows where facts are missing.',`<div class="grid4" style="grid-template-columns:repeat(auto-fill,minmax(230px,1fr))">${MYTHS.map((m,i)=>`<div class="myth"><button type="button" data-act="flip" aria-pressed="false" aria-label="Myth ${i+1}. Tap to see the fact."><span class="f"><span class="tag">Myth</span><q>${esc(m[0])}</q></span><span class="b"><span class="tag">Fact</span><p>${esc(m[1])}</p></span></button></div>`).join('')}</div>`));
ACT.flip=(b)=>{b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true'));};
const FAQ=[
 ['Is Open Door really confidential?','Open Door is designed around Ontario\'s PHIPA. Only the clinicians caring for you see your information, consent can be withdrawn any time, and the service runs in a browser with no app icon or notifications.'],
 ['Who can see my information?','Your circle of care: the health care practitioners who need it to treat you. Open Door acts as an electronic service provider and agent for the clinicians.'],
 ['Do I have to give my real name?','This prototype only asks for a nickname. A live service would need enough information for clinicians to provide care safely.'],
 ['Do I need a test if I have no symptoms?','Usually not. Guidelines advise against routine testing without symptoms because results can mislead. A clinician can talk it through with you.'],
 ['Can I test at home?','Not yet. Health Canada has not approved at-home testing or specimen collection for HSV. Open Door sends requisitions to the clinic you choose to keep visits short.'],
 ['What if campus health has no free appointments?','Open Door reserves 10 campus screening appointments a month. When they run out, or if you would rather go elsewhere, you use your requisition at any clinic.'],
 ['How do I get my results?','Your sample goes to a public health laboratory and the result returns to your clinician, who releases it to your dashboard. You choose when to open it.'],
 ['How is treatment delivered?','If your clinician prescribes an antiviral, a partner pharmacy sends it to your door in discreet packaging.'],
 ['What if someone sees my screen?','Press Esc twice or click Quick exit. The page is covered at once, and you can choose to clear your session data when you leave.'],
 ['Will HSV affect my relationships?','It can feel that way at first, but many people have healthy relationships with HSV. The disclosure guide and conversation builder can help you plan.'],
 ['Is there a cure or a vaccine?','Not at present. Treatment reduces outbreaks and shedding.']];
function faqList(q){const l=FAQ.filter(f=>!q||(f[0]+f[1]).toLowerCase().includes(q.toLowerCase()));return l.length?l.map(f=>`<details class="acc"><summary>${esc(f[0])}</summary><div>${esc(f[1])}</div></details>`).join(''):'<p class="muted">No questions match. Try a different word, or ask a clinician in a consultation.</p>';}
reg('learn-faq',()=>page('learn-faq','Short answers to the questions people ask most.',`<div style="max-width:760px"><div class="field"><label class="sr" for="fq">Search</label><input type="search" id="fq" data-inp="fq" placeholder="Search the FAQ"></div><div id="faqs">${faqList('')}</div></div>`));
CHG.fq=(el)=>{$('#faqs').innerHTML=faqList(el.value);};
