'use strict';
/* ===================== MY HEALTH ===================== */
const upcoming=()=>S.appts.filter(a=>a.status==='confirmed'&&new Date(a.when)>new Date()-36e5).sort((a,b)=>new Date(a.when)-new Date(b.when));
const sens=h=>'<span class="sens" tabindex="0">'+h+'</span>';

reg('my-dashboard',()=>page('my-dashboard','Everything about your care in one private place.',gate(()=>{
  const st=S.stage,rx=S.rx;
  const cls=n=>n==='done'?'done':n==='now'?'now':'';
  const t=[
    st>=1?'done':'now',
    st>=2?'done':st===1?'now':'',
    st>=4?'done':st>=2?'now':'',
    st>=5?'done':st>=4?'now':'',
    (rx&&rx.step===4)||(st>=5&&!rx)?'done':st>=5?'now':''
  ];
  const nx=upcoming()[0];
  const res=st>=4?(S.result&&S.result.revealed?['ok','Opened']:['info','Ready']):st===3?['warn','At the lab']:['off','None yet'];
  const rem=upcoming().filter(a=>new Date(a.when)-new Date()<2*DAY);
  return `
  <div class="card ink" style="margin-bottom:20px"><div class="row between"><div><p class="kicker" style="color:var(--glow)">Welcome back</p><h2 style="font-size:2.2rem">${sens(esc(S.user.nick))}</h2></div><a class="btn btn-glow" href="#care-followup">See my care plan</a></div></div>
  ${rem.length?`<div class="callout info" style="margin-bottom:20px"><p><b>Coming up soon:</b> ${rem.map(a=>esc(a.type)+', '+fdt(a.when)).join('; ')}.</p></div>`:''}
  <div class="card" style="margin-bottom:20px"><h3 style="margin-bottom:18px">Your care pathway</h3><div class="track5"><div class="${cls(t[0])}" data-n="1">Intake</div><div class="${cls(t[1])}" data-n="2">Review</div><div class="${cls(t[2])}" data-n="3">Testing</div><div class="${cls(t[3])}" data-n="4">Follow-up</div><div class="${cls(t[4])}" data-n="5">Care at home</div></div></div>
  <div class="grid4">
   <a class="tile" href="#my-appts">${ic('calendar')}<span>Next appointment</span><div class="big">${nx?sens(fd(nx.when)):'None'}</div><span>${nx?esc(nx.type):'Book a consultation'}</span></a>
   <a class="tile" href="#care-referral">${ic('file')}<span>Testing referral</span><div class="big">${S.referral?esc(S.referral.ref):'None'}</div><span>${S.referral?{issued:'Ready to use',collected:'Sample at lab',resulted:'Result released'}[S.referral.status]:'Issued after review'}</span></a>
   <a class="tile" href="#my-results">${ic('flask')}<span>Test result</span><div class="big"><span class="badge ${res[0]}">${res[1]}</span></div><span>You choose when to open it</span></a>
   <a class="tile" href="#my-rx">${ic('pill')}<span>Prescription</span><div class="big">${rx?RXSTEPS[rx.step]:'None'}</div><span>${rx?'Discreet delivery':'Appears after follow-up'}</span></a>
  </div>
  <div class="grid2 mt">
   <div class="card"><h3>Quick actions</h3><div class="row"><a class="btn btn-primary sm" href="#care-consult">Book consultation</a><a class="btn btn-line sm" href="#my-journal">Add journal entry</a><a class="btn btn-line sm" href="#mind-support">Check in on my mood</a></div></div>
   ${S.feedbackDone?`<div class="card"><h3>Thank you</h3><p class="muted" style="margin:0">Your anonymous feedback helps the Open Door team improve privacy and support.</p></div>`:`<div class="card"><h3>How is Open Door working for you?</h3><p class="hint">Anonymous. Rate from 1 (low) to 5 (high).</p>
    <div class="field"><label for="f1">My anxiety about my health right now</label><input type="range" id="f1" min="1" max="5" value="3"></div><div class="field"><label for="f2">How private this has felt</label><input type="range" id="f2" min="1" max="5" value="3"></div><button class="btn btn-line sm" data-act="feedback">Send feedback</button></div>`}
  </div>`;})));
ACT.feedback=()=>{S.feedbackDone=true;save();rerender();toast('Thanks. Your feedback is anonymous.');};

const REMIND=()=>{const h=S.prefs.lead;const when=h==='2'?'in 2 hours':h==='24'?'tomorrow':'in 3 days';return 'Student Services: you have an appointment '+when+'. Sign in to see details.';};
reg('my-appts',()=>page('my-appts','Your upcoming and past appointments, with reminders that never mention HSV.',gate(()=>{
  const up=upcoming(),past=S.appts.filter(a=>!up.includes(a));
  const card=(a,canC)=>`<div class="item"><div><div class="when">${sens(fdt(a.when))}</div><div class="muted">${esc(a.type)} &middot; ${esc(a.mode)}</div></div><div class="row">${a.status==='cancelled'?'<span class="badge off">Cancelled</span>':canC?`<span class="badge ok">Confirmed</span><button class="btn btn-line sm" data-act="cancel" data-id="${a.id}">Cancel</button>`:'<span class="badge off">Past</span>'}</div></div>`;
  return `<div class="grid2" style="grid-template-columns:1.2fr .9fr;align-items:start"><div class="stack">
   <div class="row between"><h3>Upcoming</h3><a class="btn btn-primary sm" href="#care-consult">Book new</a></div>
   <div class="list">${up.length?up.map(a=>card(a,true)).join(''):'<div class="card"><p class="muted" style="margin:0">Nothing booked. <a href="#care-consult">Book a consultation</a>.</p></div>'}</div>
   ${past.length?`<h3 style="margin-top:12px">Past and cancelled</h3><div class="list">${past.map(a=>card(a,false)).join('')}</div>`:''}</div>
   <div class="card"><h3>Appointment reminders</h3><p class="hint">Reminders are opt-in and use neutral wording, so nothing on your lock screen gives you away.</p>
    <div class="switch"><div><b>Email reminders</b><div class="t">To the neutral address you choose</div></div>${sw('re',S.prefs.remindEmail,'remind-email')}</div>
    <div class="switch"><div><b>Text message reminders</b><div class="t">Plain, one-line texts</div></div>${sw('rs',S.prefs.remindSms,'remind-sms')}</div>
    <div class="field" style="margin-top:16px"><label for="lead">Remind me</label><select id="lead" data-chg="lead"><option value="2"${S.prefs.lead==='2'?' selected':''}>2 hours before</option><option value="24"${S.prefs.lead==='24'?' selected':''}>1 day before</option><option value="72"${S.prefs.lead==='72'?' selected':''}>3 days before</option></select></div>
    <p class="lab">What you would receive</p><div class="callout info" style="margin-top:6px"><p>${esc(REMIND())}</p></div>
    <p class="fine mt">${S.prefs.remindEmail||S.prefs.remindSms?'Reminders are on. This prototype does not actually send messages.':'Reminders are off. Appointments still appear on your dashboard.'}</p></div></div>`;})));
CHG['remind-email']=(el)=>{S.prefs.remindEmail=el.checked;save();rerender();};
CHG['remind-sms']=(el)=>{S.prefs.remindSms=el.checked;save();rerender();};
CHG.lead=(el)=>{S.prefs.lead=el.value;save();rerender();};
ACT.cancel=(a)=>confirmBox('Cancel this appointment?','You can book another time whenever you like.','Cancel appointment',()=>{const ap=S.appts.find(x=>x.id===a.dataset.id);if(ap){ap.status='cancelled';if(/campus/i.test(ap.type))S.campusUsed=Math.max(4,S.campusUsed-1);addEvent('Appointment cancelled',ap.type+'.');}save();rerender();},'btn-danger');

reg('my-results',()=>page('my-results','Your result is released by your clinician and stays closed until you decide to open it.',gate(()=>{
  const r=S.result;
  if(!S.referral)return `<div class="card" style="max-width:600px"><h3>No test yet</h3><p class="muted">A test result appears here after a clinician issues a referral and your sample has been analysed.</p><a class="btn btn-primary" href="#${S.stage===0?'care-intake':'care-referral'}">${S.stage===0?'Start intake':'See my referral'}</a></div>`;
  if(S.stage<3)return `<div class="card" style="max-width:600px"><span class="badge warn">Waiting for your sample</span><h3 style="margin-top:12px">Give your sample, then we will track it</h3><p class="muted">Your requisition is ready. A swab works best while a lesion is present.</p><a class="btn btn-primary" href="#care-referral">Open requisition</a></div>`;
  if(S.stage===3)return `<div class="card" style="max-width:600px"><span class="badge info">At the public health laboratory</span><h3 style="margin-top:12px">Your sample is being analysed</h3><p class="muted">The lab returns results to your clinician, who releases them here. You will not see anything until then, and nothing happens without your say-so.</p><div class="steps"><i class="on"></i><i class="on"></i><i></i></div><p class="fine">Collected, at the lab, released.</p></div>`;
  if(!r.revealed)return `<div class="reveal"><span class="badge info">Result released ${fd(r.date)}</span><h2 style="margin:16px 0 10px">Your result is ready</h2><p>Open it when you have a few quiet minutes and, if you like, someone nearby you trust. A clinician can go through it with you afterwards.</p><div class="row" style="justify-content:center;margin-top:20px"><button class="btn btn-glow" data-act="reveal">Reveal my result</button><a class="btn btn-ghost" href="#care-consult">Book follow-up first</a></div></div>`;
  const pos=r.value==='detected';
  return `<div class="grid2" style="grid-template-columns:1.2fr .9fr;align-items:start"><div class="rcard ${pos?'pos':'neg'}"><p class="kicker">HSV swab (NAAT) &middot; ${esc(S.referral.ref)}</p><div class="val">${pos?'HSV-2 detected':'No HSV detected'}</div>
   ${pos?`<p>The swab found genetic material from herpes simplex virus. This does not show when you were infected or who it came from, and it does not say how often you will have outbreaks. HSV is common and manageable, and treatment can reduce outbreaks and shedding.</p>`:`<p>No virus was found in this sample. A swab taken without a lesion, or from an old one, can miss HSV, so if sores appear later, test again while they are present.</p>`}
   <div class="row mt"><a class="btn btn-primary" href="#${pos?'care-consult':'care-followup'}">${pos?'Book follow-up':'See my care plan'}</a><a class="btn btn-line" href="#mind-support">Support if you need it</a></div></div>
   <div class="card"><h4>Released by</h4><p class="muted">Your Open Door clinician, ${fd(r.date,{month:'long',day:'numeric',year:'numeric'})}</p><h4>What to do next</h4><ul class="muted" style="padding-left:1.1em;margin:0"><li>Meet your clinician virtually</li>${pos?'<li>Talk about episodic or suppressive treatment</li><li>Plan how and when to tell partners</li>':'<li>Ask any questions you still have</li>'}</ul></div></div>`;})));
ACT.reveal=()=>{S.result.revealed=true;addEvent('Result opened','You opened your test result.');save();rerender();window.scrollTo(0,0);};

reg('my-rx',()=>page('my-rx','Treatment prescribed by your clinician, delivered to your door in discreet packaging.',gate(()=>{
  const rx=S.rx;
  if(!rx)return `<div class="card" style="max-width:600px"><h3>No prescription</h3><p class="muted">If your clinician recommends an antiviral, it appears here after your virtual follow-up and goes to the partner pharmacy.</p><div class="row"><a class="btn btn-primary" href="#learn-treatment">About treatment</a><a class="btn btn-line" href="#care-consult">Book follow-up</a></div></div>`;
  return `${!S.consent.pharmacy?'<div class="callout alert" style="margin-bottom:20px"><p>Sharing with the pharmacy is switched off, so delivery cannot go ahead. <a href="#acct-consent">Change this in consent management.</a></p></div>':''}
  <div class="grid2" style="grid-template-columns:1.3fr .9fr;align-items:start"><div class="card"><div class="row between"><div><p class="kicker">Antiviral, as prescribed</p><h3>Valacyclovir</h3></div><span class="badge ${rx.step===4?'ok':'info'}">${RXSTEPS[rx.step]}</span></div>
   <p class="muted">Your clinician chose the plan, either episodic or suppressive. Take it exactly as your clinician and the label say. Questions? Ask your pharmacist or clinician.</p>
   <div class="pstep">${RXSTEPS.map((s,i)=>`<div class="${i<rx.step?'done':i===rx.step?'now':''}">${s}</div>`).join('')}</div>
   <div class="row"><button class="btn btn-line sm" data-act="refill"${rx.step===4&&!rx.refill?'':' disabled'}>${rx.refill?'Refill requested':'Request refill'}</button><a class="btn btn-line sm" href="#care-consult">Talk to a clinician</a></div></div>
   <div class="card"><h3>Delivery</h3><div class="field"><label for="addr">Delivery address</label><input type="text" id="addr" data-inp="rx-addr" value="${esc(rx.address)}" placeholder="Where should it go?"></div><div class="field"><label for="lbl">Name on the package</label><select id="lbl" data-chg="rx-lbl">${['Student Services','Wellness Supplies','Your own name'].map(o=>`<option${rx.label===o?' selected':''}>${o}</option>`).join('')}</select></div><div class="field"><label for="win">Delivery window</label><select id="win" data-chg="rx-win"><option value="any"${rx.win==='any'?' selected':''}>Any time</option><option value="eve"${rx.win==='eve'?' selected':''}>Evenings</option><option value="hold"${rx.win==='hold'?' selected':''}>Hold for pickup</option></select></div><p class="fine">Plain box, no mention of HSV or Open Door on the outside.</p></div></div>`;})));
CHG['rx-addr']=(el)=>{S.rx.address=el.value;save();};
CHG['rx-lbl']=(el)=>{S.rx.label=el.value;save();};
CHG['rx-win']=(el)=>{S.rx.win=el.value;save();};
ACT.refill=()=>{S.rx.refill=true;addEvent('Refill requested','Sent to your clinician for approval.');save();rerender();toast('Refill request sent');};

const J={editing:false,sev:3,areas:[],trig:[]};
const TRIG=['Stress','Illness','Lack of sleep','Friction or injury','Sun exposure','Other'];
const AREAS=['Mouth or lips','Genital area','Buttocks or thighs','Other'];
function journalChart(){
  const e=S.journal.slice().sort((a,b)=>a.date<b.date?-1:1).slice(-14);
  if(e.length<2)return '<p class="muted">Add at least two entries to see a trend.</p>';
  const W_=560,H=190,L=34,Bm=30,n=e.length;
  const x=i=>L+i*((W_-L-14)/(n-1)),y=v=>H-Bm-(v/10)*(H-Bm-14);
  const pts=e.map((d,i)=>[x(i),y(d.sev)]);
  return `<svg class="chart" viewBox="0 0 ${W_} ${H}" role="img" aria-label="Severity over time, 0 to 10">${[0,5,10].map(v=>`<line x1="${L}" x2="${W_-8}" y1="${y(v)}" y2="${y(v)}" stroke="#e1e8e5"/><text x="${L-8}" y="${y(v)+4}" text-anchor="end">${v}</text>`).join('')}
   <polygon points="${pts.map(p=>p.join(',')).join(' ')} ${x(n-1)},${y(0)} ${x(0)},${y(0)}" fill="#0d7a74" opacity=".12"/><polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#0d7a74" stroke-width="2.5" stroke-linejoin="round"/>
   ${pts.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${i===n-1?6:4}" fill="${i===n-1?'#ffb457':'#0d7a74'}" stroke="#fff" stroke-width="2"><title>${fd(e[i].date+'T12:00')}: ${e[i].sev}</title></circle>`).join('')}
   ${[0,n-1].map(i=>`<text x="${x(i)}" y="${H-8}" text-anchor="${i?'end':'start'}">${fd(e[i].date+'T12:00',{month:'short',day:'numeric'})}</text>`).join('')}</svg>`;
}
reg('my-journal',()=>page('my-journal','Track how you feel over time and share a summary with your clinician.',gate(()=>`
 <div class="grid2" style="grid-template-columns:.95fr 1.05fr;align-items:start"><div class="card"><h3>New entry</h3>
  <div class="field"><label for="jd">Date</label><input type="date" id="jd" value="${new Date().toISOString().slice(0,10)}"></div>
  <div class="field"><label for="js">Discomfort today: <b id="jsv">${J.sev}</b> out of 10</label><input type="range" id="js" min="0" max="10" value="${J.sev}" data-inp="jsev"></div>
  <fieldset><legend>Where?</legend>${checks('jr.areas',AREAS,J.areas)}</fieldset><fieldset><legend>Possible triggers</legend>${checks('jr.trig',TRIG,J.trig)}</fieldset>
  <div class="field"><label for="jn">Notes</label><textarea id="jn" placeholder="How did you feel? What changed?"></textarea></div><button class="btn btn-primary" data-act="j-add">Save entry</button></div>
  <div class="stack"><div class="card"><h3>Trend</h3>${journalChart()}</div>
   <div class="card"><div class="row between"><h3>Entries</h3>${S.journal.length?'<button class="btn btn-line sm" data-act="j-copy">Copy summary for my clinician</button>':''}</div>
   <div class="list">${S.journal.length?S.journal.slice().sort((a,b)=>a.date<b.date?1:-1).map(e=>`<div class="item"><div><b>${sens(fd(e.date+'T12:00',{weekday:'short',month:'short',day:'numeric'}))}</b> &middot; ${e.sev}/10<div class="fine">${esc([].concat(e.areas,e.trig).join(', ')||'No details')}${e.note?' &middot; '+esc(e.note):''}</div></div><button class="btn btn-line sm" data-act="j-del" data-id="${e.id}" aria-label="Delete entry">${ic('x','sm')}</button></div>`).join(''):'<p class="muted" style="margin:0">No entries yet.</p>'}</div></div></div></div>`)));
CHG.jr=(el)=>{const k=el.name.split('.')[1];J[k]=el.checked?J[k].concat(el.value):J[k].filter(v=>v!==el.value);};
CHG.jsev=(el)=>{J.sev=+el.value;$('#jsv').textContent=el.value;};
ACT['j-add']=()=>{S.journal.push({id:'j'+Date.now(),date:$('#jd').value||new Date().toISOString().slice(0,10),sev:J.sev,areas:J.areas.slice(),trig:J.trig.slice(),note:($('#jn').value||'').trim()});addEvent('Journal entry','Discomfort '+J.sev+' out of 10.');J.areas=[];J.trig=[];save();rerender();toast('Entry saved');};
ACT['j-del']=(a)=>{S.journal=S.journal.filter(e=>e.id!==a.dataset.id);save();rerender();};
ACT['j-copy']=()=>copyText('Symptom journal summary\n'+S.journal.slice().sort((a,b)=>a.date<b.date?-1:1).map(e=>e.date+': '+e.sev+'/10; '+([].concat(e.areas,e.trig).join(', ')||'no details')+(e.note?'; '+e.note:'')).join('\n'));

reg('my-timeline',()=>page('my-timeline','Every step of your care, in order.',gate(()=>{
  const ev=S.timeline.concat(S.journal.map(j=>({t:j.date+'T12:00:00',label:'Journal entry',detail:'Discomfort '+j.sev+' out of 10.'}))).concat(S.appts.filter(a=>a.status==='confirmed').map(a=>({t:a.when,label:'Appointment: '+a.type,detail:'Scheduled for '+fdt(a.when)+'.',future:new Date(a.when)>new Date()})));
  const uniq=ev.filter((e,i)=>ev.findIndex(x=>x.label===e.label&&x.t===e.t)===i).sort((a,b)=>new Date(b.t)-new Date(a.t));
  return uniq.length?`<ol class="timeline" style="max-width:720px">${uniq.map(e=>`<li><time>${e.future?'UPCOMING &middot; ':''}${fdt(e.t).toUpperCase()}</time><div><b>${esc(e.label)}</b></div><div class="muted">${esc(e.detail)}</div></li>`).join('')}</ol>`:'<div class="card" style="max-width:560px"><p class="muted" style="margin:0">Nothing yet. Your timeline fills in as you use Open Door.</p></div>';})));

/* ===================== MENTAL WELLNESS ===================== */
const MOODS={Overwhelmed:'That is a lot to carry. You do not have to sort it all out today. Try one small step, such as the breathing exercise below, or let a counsellor take some of it with you.',Anxious:'Waiting and not knowing is hard, and anxiety about HSV is very common. Slow breathing can help in the moment, and a clinician can answer the questions behind the worry.',Ashamed:'Shame is one of the most common feelings, and it comes from stigma, not from anything you did wrong. HSV is extremely common. You deserve care without judgement.',Angry:'Anger makes sense too. It can help to let it out somewhere safe, such as with a friend, in the anonymous forum, or in a counselling session.',Okay:'Glad to hear it. Checking in when things are calm is a good habit. You can write a few notes in your journal while you are feeling steady.'};
const BR={on:false,t:null};
reg('mind-support',()=>page('mind-support','Feelings like shame, anxiety and anger are common with HSV. You are not alone with them.',`
 <div class="callout alert" style="margin-bottom:24px"><p><b>If you are in crisis or thinking about harming yourself,</b> call or text <b>9-8-8</b> any time, free, anywhere in Canada. In an emergency call 911.</p></div>
 <div class="grid2" style="align-items:start"><div class="card"><h3>How are you feeling right now?</h3><div class="chips" role="group" aria-label="Mood" style="margin:14px 0">${Object.keys(MOODS).map(m=>`<button class="chip" data-act="mood" data-m="${m}" aria-pressed="${BR.m===m}">${m}</button>`).join('')}</div>
   ${BR.m?`<div class="callout info"><p>${MOODS[BR.m]}</p></div><div class="row mt"><a class="btn btn-primary sm" href="#mind-counselling">Talk to a counsellor</a><a class="btn btn-line sm" href="#comm-forum">Anonymous forum</a></div>`:'<p class="muted">Choose a word. It is just for you.</p>'}
   ${S.moods.length?`<p class="fine mt">Recent check-ins: ${S.moods.slice(-5).map(m=>esc(m.m)).join(', ')}</p>`:''}</div>
  <div class="card" style="text-align:center"><h3>Slow breathing</h3><p class="muted">In for 4 seconds, out for 6. Follow the circle.</p><div class="breath ${BR.on?(BR.ph||'in'):''}" id="breath" aria-live="polite">${BR.on?(BR.ph==='out'?'Out':'In'):'Ready'}</div><button class="btn btn-primary" data-act="breathe">${BR.on?'Stop':'Start'}</button></div></div>
 <div class="card mt"><h3>Why this matters</h3><p class="muted" style="margin:0">Recurrent HSV can carry a real psychological burden, including depression, anger, anxiety and shame, and it can strain relationships. Open Door includes mental health support for that reason, and clinicians can refer you to local services.</p></div>`));
ACT.mood=(b)=>{BR.m=b.dataset.m;S.moods.push({m:BR.m,t:iso(Date.now())});save();rerender();};
ACT.breathe=()=>{
  clearTimeout(BR.t);BR.on=!BR.on;
  if(!BR.on){rerender();return;}
  BR.ph='in';rerender();
  const tick=()=>{if(!BR.on||CUR!=='mind-support'){BR.on=false;return;}BR.ph=BR.ph==='in'?'out':'in';const b=$('#breath');if(b){b.className='breath '+BR.ph;b.textContent=BR.ph==='in'?'In':'Out';}BR.t=setTimeout(tick,BR.ph==='in'?4000:6000);};
  BR.t=setTimeout(tick,4000);
};
reg('mind-counselling',()=>page('mind-counselling','Talk to someone trained to help. Open Door refers you to local services.',`
 <div class="grid3">${[['Campus counselling','Free for students at most campuses. Good for ongoing talks.','campus'],['Local mental health service','A community partner of Open Door. Shorter waits where available.','local'],['Peer support chat','A trained student volunteer who understands. Not a counsellor.','peer']].map(o=>`<div class="card"><h3>${o[0]}</h3><p class="muted">${o[1]}</p>${S.counsel&&S.counsel.k===o[2]?`<span class="badge ok">Requested ${fd(S.counsel.t)}</span>`:`<button class="btn btn-primary sm" data-act="counsel" data-k="${o[2]}" data-n="${o[0]}">Request a referral</button>`}</div>`).join('')}</div>
 <div class="callout mt"><p>Referrals share only what the service needs, and only if you agree. You can see and change that in <a href="#acct-consent">consent management</a>.</p></div>`));
ACT.counsel=(a)=>{
  const go=()=>{S.counsel={k:a.dataset.k,t:iso(Date.now())};addEvent('Mental health referral requested',a.dataset.n+'.');if(!S.user)S.user={nick:S.prefs.nick||'Guest student'};save();renderChrome();rerender();toast('Referral requested');};
  if(!S.consent.mental){modal({title:'Share your referral?',body:'<p class="muted">To refer you, Open Door needs your agreement to share your name and a short note with this service. It will not share your test result.</p>',actions:[{label:'Not now'},{label:'I agree',cls:'btn-primary',fn:()=>{S.consent.mental=true;logConsent('Share referral with mental health services',true);go();}}]});}else go();
};
const COPING=['Pick one trusted person to tell first','Write down my questions for my clinician','Plan one calming activity for this week','Save the 9-8-8 number in my phone','Book a counselling intake'];
reg('mind-manage',()=>page('mind-manage','A diagnosis can feel big at first. Here is a gentler way to take it in.',`
 <div class="grid3"><div class="card"><h3>The first days</h3><p class="muted">Strong feelings are normal. You do not have to decide anything about relationships or the future right away. HSV is common and manageable.</p></div><div class="card"><h3>During outbreaks</h3><p class="muted">Outbreaks tend to get milder and less frequent over time. Rest, follow your clinician's treatment plan and keep your journal to spot patterns.</p></div><div class="card"><h3>Self-compassion</h3><p class="muted">The shame belongs to the stigma, not to you. Talk to yourself the way you would talk to a friend in your position.</p></div></div>
 <div class="card mt" style="max-width:640px"><h3>My coping plan</h3><p class="hint">Tick what you want to do. Saved only in this browser tab.</p>${COPING.map((c,i)=>`<div class="switch"><div><b>${c}</b></div>${sw('cp'+i,S.coping.includes(c),'coping')}</div>`).join('')}</div>`));
CHG.coping=(el)=>{const t=el.closest('.switch').querySelector('b').textContent;S.coping=el.checked?S.coping.concat(t):S.coping.filter(x=>x!==t);save();};
reg('mind-resources',()=>page('mind-resources','Where to turn, in the order that fits how urgent it feels.',`
 <div class="list" style="max-width:760px">${[['alert','Emergency','Call 911 if someone is in immediate danger.'],['alert','9-8-8 Suicide Crisis Helpline','Call or text 9-8-8, 24 hours a day, free, anywhere in Canada.'],['info','Your campus counselling centre','Most universities offer free or low-cost counselling for students.'],['info','211 Ontario','Call 211 to find local community health and social services.'],['ok','Open Door counselling referrals','Request a referral to a local mental health service.'],['ok','Peer support and the anonymous forum','Talk with students who have been there.']].map(r=>`<div class="item"><div><b>${r[1]}</b><div class="muted">${r[2]}</div></div><span class="badge ${r[0]}">${r[0]==='alert'?'Urgent':r[0]==='info'?'Support':'Open Door'}</span></div>`).join('')}</div>
 <div class="row mt"><a class="btn btn-primary" href="#mind-counselling">Request counselling</a><a class="btn btn-line" href="#comm-peer">Peer support</a></div>`));

/* ===================== RELATIONSHIPS ===================== */
const DSTEPS=[['Get informed','Learn the basics so you can answer questions calmly. HSV is common, manageable and often silent.'],['Choose the right time','Tell a partner before sexual contact, not in the middle of it. Pick a moment when neither of you is rushed.'],['Choose the right place','Somewhere private and calm. Not a busy bar and not in bed.'],['Say it plainly','Lead with what you know and how you manage it. Short and honest works better than a long apology.'],['Give them space','They may need time or want to talk to a clinician. Let them ask questions, and do not pressure an answer.'],['Plan together','Talk about treatment, avoiding contact during outbreaks and anything else that helps both of you feel safe.'],['Look after yourself','However it goes, you did a brave thing. Reach out to a friend, the forum or a counsellor afterwards.']];
reg('rel-disclosure',()=>page('rel-disclosure','Telling a partner is hard. A plan makes it easier. Go at your own pace.',`
 <div class="grid2" style="align-items:start;grid-template-columns:1.2fr .8fr"><div>${DSTEPS.map((s,i)=>`<details class="acc"${i===0?' open':''}><summary>${i+1}. ${s[0]}</summary><div>${s[1]}</div></details>`).join('')}</div>
 <div class="stack"><div class="card"><h3>Am I ready?</h3><p class="hint">Tick what feels true.</p>${['I can explain what HSV is','I have thought about when and where','I know who I can lean on afterwards'].map((c,i)=>`<div class="switch"><div><b>${c}</b></div>${sw('rd'+i,S.ready.includes(c),'ready')}</div>`).join('')}<p class="fine mt">${S.ready.length===3?'You seem prepared. Remember, you can still change your mind about timing.':'There is no deadline other than before sexual contact.'}</p></div>
 <div class="card ink"><h3>Need the words?</h3><p>Build a script you can edit and practise.</p><a class="btn btn-glow" href="#rel-builder">Conversation builder</a></div></div></div>`));
CHG.ready=(el)=>{const t=el.closest('.switch').querySelector('b').textContent;S.ready=el.checked?S.ready.concat(t):S.ready.filter(x=>x!==t);save();rerender();};
const CB={who:'new',way:'person',tone:'calm',facts:true,manage:true,invite:true};
function script(){
  const s=[];const who=CB.who;
  s.push(CB.tone==='warm'?(who==='ongoing'?'There is something I want to share with you because I care about us.':'I like where this is going, so I want to be open with you about something first.'):CB.tone==='direct'?'Before we go further, I need to tell you something about my health.':'Can I talk to you about something personal? It is important to me that you hear it from me.');
  s.push('I have herpes simplex virus, or HSV.');
  if(CB.facts)s.push('It is really common. Most people who have it have mild symptoms or none, and many do not know they carry it.');
  if(CB.manage)s.push('I see a clinician about it. I know how to look after myself, and I avoid sexual contact if I notice sores or tingling.');
  if(CB.invite)s.push('You might have questions, or want to talk to a doctor yourself. Take whatever time you need. I am happy to answer anything I can.');
  s.push(who==='friend'?'I am telling you because I trust you.':'I wanted you to have the full picture so we can both make good choices.');
  return s.join(CB.way==='text'?'\n\n':' ');
}
const REACTS=[['They are supportive','Thank them, ask if they have questions and offer to share a reliable page about HSV.'],['They need time','Say that makes sense. Offer to talk again when they are ready, and do not push for an answer.'],['They are scared or ask lots of questions','Answer what you know. For the rest, say you will look it up together or suggest they speak to a clinician.'],['They react badly or blame you','You can end the conversation calmly. Their reaction reflects their own fear. Reach out to a friend or the forum afterwards.']];
reg('rel-builder',()=>page('rel-builder','Shape a script that sounds like you. Edit it and practise out loud.',`
 <div class="grid2" style="grid-template-columns:.9fr 1.1fr;align-items:start"><div class="card">
  <fieldset><legend>Who are you telling?</legend>${radios('cb.who',[['new','Someone new'],['ongoing','Ongoing partner'],['casual','Casual partner'],['friend','Friend or family']],CB.who)}</fieldset>
  <fieldset><legend>How?</legend>${radios('cb.way',[['person','In person'],['text','By message']],CB.way)}</fieldset>
  <fieldset><legend>Tone</legend>${radios('cb.tone',[['calm','Calm'],['warm','Warm'],['direct','Direct']],CB.tone)}</fieldset>
  <fieldset><legend>Include</legend>${[['facts','A few facts about HSV'],['manage','How I manage it'],['invite','An invitation to ask questions']].map(o=>`<div class="switch"><div><b>${o[1]}</b></div>${sw('cb-'+o[0],CB[o[0]],'cbt')}</div>`).join('')}</fieldset></div>
  <div class="stack"><div class="card"><h3>Your script</h3><label class="sr" for="scr">Script</label><textarea id="scr" style="min-height:230px">${esc(script())}</textarea><div class="row mt"><button class="btn btn-primary sm" data-act="copy" data-from="scr">Copy</button><button class="btn btn-line sm" data-act="cb-reset">Rewrite from options</button></div></div>
  <div class="card"><h3>If they say...</h3>${REACTS.map(r=>`<details class="acc"><summary>${r[0]}</summary><div>${r[1]}</div></details>`).join('')}</div></div></div>`));
CHG.cb=(el)=>{CB[el.name.split('.')[1]]=el.value;rerender();};
CHG.cbt=(el)=>{CB[el.id.replace('cb-','')]=el.checked;rerender();};
ACT['cb-reset']=()=>rerender();
reg('rel-partner',()=>page('rel-partner','Share this with a partner so they can learn at their own pace.',`
 <div class="grid2" style="align-items:start"><div class="card" id="pcard"><h3>HSV: what a partner should know</h3><ul class="muted"><li>HSV is very common. Billions of people carry it, and most have mild symptoms or none.</li><li>It spreads through skin-to-skin contact and can pass on with no sores, though sores are the most contagious time.</li><li>Avoiding sexual contact during outbreaks and treatment such as suppressive antivirals lower the chance of passing it on. Condoms reduce risk but cannot fully prevent it.</li><li>Testing a partner without symptoms is generally not advised, because results can mislead. A clinician can talk through your situation.</li><li>It can be managed. Many people have happy, healthy relationships with HSV.</li></ul></div>
 <div class="stack"><div class="card ink"><h3>Share it your way</h3><p>Copy the text and send it, or read it together.</p><button class="btn btn-glow" data-act="copy" data-from="pcard">Copy partner info</button></div><div class="card"><h3>Partners can also</h3><ul class="muted" style="margin:0"><li>Ask a clinician about their own questions</li><li>Visit the Learn section on this site</li><li>Take time. There is no rush</li></ul></div></div></div>`));
reg('rel-healthy',()=>page('rel-healthy','HSV does not decide whether a relationship is healthy. How people treat each other does.',`
 <div class="grid2"><div class="card"><span class="badge ok">Green flags</span><ul class="muted" style="margin-top:14px"><li>They ask questions and listen to the answers</li><li>They thank you for telling them</li><li>Boundaries and timing are respected</li><li>Neither of you uses HSV as a weapon or a secret</li></ul></div><div class="card"><span class="badge alert">Red flags</span><ul class="muted" style="margin-top:14px"><li>Shaming, threats to tell others, or blackmail</li><li>Pressure to skip protection or ignore an outbreak</li><li>Dismissing your feelings or your health</li><li>Making you feel your worth changed</li></ul></div></div>
 <div class="card mt"><h3>Three habits that help</h3><div class="grid3"><div><h4>Consent</h4><p class="muted" style="margin:0">Enthusiastic, informed and ongoing. Either person can pause or stop at any time.</p></div><div><h4>Honesty</h4><p class="muted" style="margin:0">Say what you know and what you do not. Honesty builds trust faster than perfection.</p></div><div><h4>Support</h4><p class="muted" style="margin:0">Healthy partners share the responsibility for staying well together.</p></div></div></div>`));

/* ===================== COMMUNITY ===================== */
const ADJ=['Quiet','Brave','Gentle','Steady','Bright','Calm'],NOUN=['Maple','Harbour','Willow','Lantern','Sparrow','Cedar'];
const newHandle=()=>ADJ[Math.floor(Math.random()*6)]+' '+NOUN[Math.floor(Math.random()*6)];
const SEED=[
 {id:'p1',h:'Steady Cedar',cat:'Just diagnosed',title:'I got a positive result today and feel numb',body:'I have been through a lot of feelings in a few hours. Does it get easier? How did you cope in the first week?',sup:14,replies:[['Brave Harbour','It did for me. The first week was the hardest. The numbness fades and the facts help. You are not alone.']],t:-1},
 {id:'p2',h:'Calm Willow',cat:'Relationships',title:'How did you tell your partner?',body:'We have been seeing each other for a month. I keep putting it off. Any tips that actually worked?',sup:9,replies:[['Gentle Lantern','I told mine before things got physical, in a quiet place, and kept it short. They had questions and we looked up facts together.']],t:-2},
 {id:'p3',h:'Bright Sparrow',cat:'Treatment',title:'Anyone on daily suppressive treatment?',body:'My clinician suggested it. I am curious how it has worked for other people. I know everyone is different.',sup:6,replies:[],t:-3}];
const FC={cat:'All'};
const CATS=['All','Just diagnosed','Relationships','Treatment','Everyday life'];
const PII=/(\b[\w.+-]+@[\w-]+\.[\w.]+\b)|(\b\+?\d[\d\s().-]{8,}\d\b)/;
function postsHtml(){
  const l=(S.posts||SEED).filter(p=>FC.cat==='All'||p.cat===FC.cat);
  return l.length?l.map(p=>`<article class="post"><div class="meta"><span class="avatar" aria-hidden="true">${esc(p.h.charAt(0))}</span><b>${esc(p.h)}</b><span class="badge off">${esc(p.cat)}</span>${p.sample?'':''}<span>${p.t<0?(-p.t)+' day'+(p.t<-1?'s':'')+' ago':'just now'}</span></div><h3 style="font-size:1.35rem">${esc(p.title)}</h3><p class="muted">${esc(p.body)}</p>
   <div class="row"><button class="btn btn-line sm" data-act="support" data-id="${p.id}">${ic('heart','sm')} ${p.sup} support</button><button class="link" data-act="reply" data-id="${p.id}">Reply</button><button class="link" data-act="report" data-id="${p.id}" style="color:var(--muted)">Report</button></div>
   ${p.replies.length?`<div class="replies">${p.replies.map(r=>`<p><b>${esc(r[0])}:</b> ${esc(r[1])}</p>`).join('')}</div>`:''}</article>`).join(''):'<div class="card"><p class="muted" style="margin:0">No posts in this topic yet. Be the first.</p></div>';
}
reg('comm-forum',()=>{if(!S.posts)S.posts=JSON.parse(JSON.stringify(SEED));if(!S.handle)S.handle=newHandle();
  return page('comm-forum','Say it where nobody knows who you are. Your handle is random and can be changed.',`
 <div class="callout" style="margin-bottom:20px"><p><b>Sample posts.</b> The conversations below are examples written for this prototype. In a live service they would be real, moderated posts from students.</p></div>
 <div class="grid2" style="grid-template-columns:1.3fr .8fr;align-items:start"><div class="stack"><div class="chips" role="group" aria-label="Topics">${CATS.map(c=>`<button class="chip" data-act="fcat" data-c="${c}" aria-pressed="${FC.cat===c}">${c}</button>`).join('')}</div><div class="stack" id="posts">${postsHtml()}</div></div>
 <aside class="stack"><div class="card"><div class="row between"><div><p class="lab">You are posting as</p><div class="row"><span class="avatar" aria-hidden="true">${esc(S.handle.charAt(0))}</span><b id="hdl">${esc(S.handle)}</b></div></div><button class="btn btn-line sm" data-act="rehandle">New handle</button></div></div>
 <div class="card"><h3>Start a conversation</h3><div class="field"><label for="pt">Title</label><input type="text" id="pt" maxlength="90"></div><div class="field"><label for="pc">Topic</label><select id="pc">${CATS.slice(1).map(c=>`<option>${c}</option>`).join('')}</select></div><div class="field"><label for="pb">Your message</label><textarea id="pb"></textarea></div><p class="fine" id="pwarn"></p><button class="btn btn-primary" data-act="post">Post anonymously</button></div>
 <div class="card"><h4>House rules</h4><ul class="muted" style="margin:0;font-size:.9rem"><li>Be kind. No shaming.</li><li>No names, numbers or emails</li><li>Peers share experience, not medical advice</li><li>Moderators review reports</li></ul></div></aside></div>`);});
ACT.fcat=(b)=>{FC.cat=b.dataset.c;rerender();};
ACT.rehandle=()=>{S.handle=newHandle();save();$('#hdl').textContent=S.handle;};
ACT.support=(a)=>{const p=S.posts.find(x=>x.id===a.dataset.id);p.sup++;save();$('#posts').innerHTML=postsHtml();};
ACT.report=()=>toast('Thanks. A moderator will review this post.');
ACT.reply=(a)=>{const id=a.dataset.id;modal({title:'Reply anonymously',body:'<div class="field"><label for="rp" class="sr">Reply</label><textarea id="rp" placeholder="Share your experience"></textarea></div><p class="fine">Posting as '+esc(S.handle)+'. Please keep personal details out.</p>',actions:[{label:'Cancel'},{label:'Reply',cls:'btn-primary',fn:()=>{const v=($('#rp').value||'').trim();if(!v)return false;if(PII.test(v)){toast('Please remove emails or phone numbers first.');return false;}S.posts.find(x=>x.id===id).replies.push([S.handle,v]);save();$('#posts').innerHTML=postsHtml();}}]});};
ACT.post=()=>{const t=($('#pt').value||'').trim(),b=($('#pb').value||'').trim();if(!t||!b){$('#pwarn').textContent='Add a title and a message first.';return;}
  if(PII.test(t+' '+b)){$('#pwarn').textContent='That looks like it contains an email or phone number. Please remove it to stay anonymous.';return;}
  S.posts.unshift({id:'p'+Date.now(),h:S.handle,cat:$('#pc').value,title:t,body:b,sup:0,replies:[],t:0});save();FC.cat='All';rerender();toast('Posted as '+S.handle);};
reg('comm-peer',()=>page('comm-peer','Chat with a trained student volunteer. They listen and share experience. They are not clinicians.',`
 <div class="grid2" style="align-items:start"><div class="card"><h3>Request a peer chat</h3>${S.peer?`<span class="badge ok">Requested</span><p class="muted mt">A volunteer would reach out by the way you chose. This prototype does not contact anyone.</p><button class="link" data-act="peer-undo">Cancel request</button>`:`<fieldset style="margin-top:12px"><legend>Format</legend>${radios('pr.fmt',[['text','Text chat'],['call','Scheduled call']],'text')}</fieldset><div class="field"><label for="pt2">What would help most?</label><select id="pt2"><option>Just diagnosed</option><option>Telling someone</option><option>Feeling low about it</option><option>Something else</option></select></div><button class="btn btn-primary" data-act="peer">Request a volunteer</button>`}</div>
 <div class="card ink"><h3>How peer support works</h3><ul><li>Volunteers are students who have completed training</li><li>They never ask for your real name</li><li>Conversations are not medical advice</li><li>If someone is in crisis, volunteers point them to 9-8-8</li></ul></div></div>`));
CHG.pr=()=>{};
ACT.peer=()=>{S.peer={t:iso(Date.now())};if(!S.user)S.user={nick:S.prefs.nick||'Guest student'};addEvent('Peer chat requested','');save();renderChrome();rerender();toast('Request sent');};
ACT['peer-undo']=()=>{S.peer=null;save();rerender();};
reg('comm-clubs',()=>page('comm-clubs','Student-run Open Door clubs make talking about HSV normal on campus and point people to the service.',`
 <div class="grid3"><div class="card"><h3>What clubs do</h3><ul class="muted"><li>Run awareness events and talks</li><li>Share facts and counter myths</li><li>Welcome people without asking questions</li><li>Show students where help is</li></ul></div><div class="card"><h3>Start a chapter</h3><ul class="muted"><li>Gather a few students and a faculty or staff supporter</li><li>Complete Open Door educator training</li><li>Get a toolkit of educational resources</li><li>Receive support for outreach events</li></ul></div><div class="card"><h3>Pilot campuses</h3><p class="muted">Chapters start at select Ontario universities, then expand across Canada. Your campus will appear here when it joins.</p></div></div>
 <div class="card mt" style="max-width:600px"><h3>Express interest</h3>${S.club?`<span class="badge ok">Thanks, we noted ${esc(S.club)}</span><p class="muted mt">This prototype does not store this anywhere beyond your tab.</p>`:`<div class="field"><label for="cmp">Your campus</label><input type="text" id="cmp" placeholder="University name"></div><button class="btn btn-primary" data-act="club">Tell me when it starts</button>`}</div>`));
ACT.club=()=>{const v=($('#cmp').value||'').trim();if(!v){toast('Add your campus first');return;}S.club=v;save();rerender();};
const CAMP=[['Open Door Week','A week of talks, myth-busting tables and quiet drop-ins on campus.','Planned'],['Fact of the Day','Short, shareable facts posted by student microinfluencers.','Planned'],['Ask Anything Booth','An anonymous question box at student centres, answered by clinicians.','Planned'],['Normalize the Talk','Peer-led storytelling nights that take the shame out of sexual health.','Planned']];
reg('comm-campaigns',()=>page('comm-campaigns','Ideas that lower stigma. They run through clubs and university microinfluencers.',`
 <div class="callout" style="margin-bottom:20px"><p><b>Concept campaigns.</b> These are planned ideas, not live events.</p></div>
 <div class="grid2">${CAMP.map(c=>`<div class="card"><span class="badge info">${c[2]}</span><h3 style="margin-top:12px">${c[0]}</h3><p class="muted" style="margin:0">${c[1]}</p></div>`).join('')}</div>
 <div class="card mt"><h3>Share a fact</h3><p class="muted">Copy a short message to post anywhere you like.</p><div class="row"><button class="btn btn-line sm" data-act="copy" data-text="HSV is very common, and most people who have it have no symptoms at all. Facts, not shame.">Copy: Facts, not shame</button><button class="btn btn-line sm" data-act="copy" data-text="Asking about sexual health is a sign of looking after yourself. Support exists, privately.">Copy: Looking after yourself</button></div></div>`));

/* ===================== ACCOUNT & PRIVACY ===================== */
reg('acct-profile',()=>page('acct-profile','Only what you choose to add. No real name or student number needed.',gate(()=>`
 <div class="card" style="max-width:600px"><div class="field"><label for="pn">Nickname</label><input type="text" id="pn" value="${esc(S.prefs.nick||S.user.nick)}" maxlength="24" data-inp="pn"></div>
 <div class="field"><label for="pcmp">Campus (optional)</label><input type="text" id="pcmp" value="${esc(S.prefs.campus)}" placeholder="University name" data-inp="pcmp"></div>
 <fieldset><legend>How should we contact you?</legend>${radios('pc.contact',[['inapp','Only inside Open Door'],['email','Neutral email']],S.prefs.contact,true)}</fieldset>
 <div class="row"><button class="btn btn-primary" data-act="prof">Save</button><button class="btn btn-line" data-act="signout">Sign out</button></div></div>`)));
CHG.pn=()=>{};CHG.pcmp=()=>{};
CHG.pc=(el)=>{S.prefs.contact=el.value;save();};
ACT.prof=()=>{S.prefs.nick=($('#pn').value||'').trim()||S.user.nick;S.user.nick=S.prefs.nick;S.prefs.campus=($('#pcmp').value||'').trim();save();renderChrome();toast('Saved');};
ACT.signout=()=>{S.user=null;save();renderChrome();location.hash='#home';toast('Signed out. Your data stays in this tab until it closes.');};

reg('acct-consent',()=>page('acct-consent','You decide what is shared and with whom. Change your mind any time.',gate(()=>{
  const c=S.consent;
  const row=(k,t,d,locked)=>`<div class="switch"><div><b>${t}</b><div class="t">${d}</div></div>${sw('cs-'+k,c[k],'cons')}</div>`;
  const circle=[['Your clinician','Health information custodian. Sees your intake, referral and result.',true],['Public health laboratory','Receives your sample and requisition only.',!!S.referral],['Partner pharmacy','Receives your prescription and delivery details.',!!S.rx&&c.pharmacy],['Mental health service','Receives a referral note, if you agreed.',!!S.counsel&&c.mental]];
  return `<div class="grid2" style="grid-template-columns:1.1fr .9fr;align-items:start"><div class="stack"><div class="card"><h3>Your consents</h3>
   ${row('care','Virtual care','Required for Open Door to hold and use your health information. Turning it off pauses your services.')}${row('pharmacy','Share with the partner pharmacy','So treatment can be delivered discreetly.')}${row('mental','Share referrals with mental health services','Only a referral note, never your result.')}${row('feedback','Anonymous feedback survey','Helps the team measure privacy and anxiety.')}</div>
   <div class="card"><h3>Consent history</h3>${S.consentLog.length?`<ul class="muted" style="margin:0">${S.consentLog.slice().reverse().map(l=>`<li>${fdt(l.t)}: ${esc(l.what)} ${l.on?'allowed':'withdrawn'}</li>`).join('')}</ul>`:'<p class="muted" style="margin:0">No changes yet.</p>'}</div></div>
   <div class="card"><h3>Who can see your information</h3><p class="hint">Only people who need it to care for you.</p><div class="list">${circle.map(x=>`<div class="item"><div><b>${x[0]}</b><div class="fine">${x[1]}</div></div><span class="badge ${x[2]?'ok':'off'}">${x[2]?'Has access':'No access'}</span></div>`).join('')}</div></div></div>`;})));
const CONS_NAMES={care:'Virtual care',pharmacy:'Share with partner pharmacy',mental:'Share referrals with mental health services',feedback:'Anonymous feedback survey'};
CHG.cons=(el)=>{const k=el.id.replace('cs-','');
  if(k==='care'&&!el.checked){el.checked=true;confirmBox('Withdraw consent for virtual care?','Open Door will pause your services and stop using your information. You can turn this back on at any time.','Withdraw consent',()=>{S.consent.care=false;logConsent(CONS_NAMES.care,false);save();rerender();toast('Consent withdrawn');},'btn-danger');return;}
  S.consent[k]=el.checked;logConsent(CONS_NAMES[k],el.checked);save();rerender();toast(el.checked?'Allowed':'Withdrawn');};

reg('acct-security',()=>page('acct-security','Layers that keep your care private, including on shared devices.',gate(()=>`
 <div class="grid2" style="align-items:start"><div class="card"><h3>Your settings</h3>
  <div class="switch"><div><b>Two-step sign-in</b><div class="t">Ask for a second code at sign-in. Demo only.</div></div>${sw('sc-twofa',S.prefs.twofa,'sec')}</div>
  <div class="switch"><div><b>Neutral browser tab title</b><div class="t">Shows "Student Services" instead of Open Door.</div></div>${sw('sc-stealth',S.prefs.stealth,'sec')}</div>
  <div class="switch"><div><b>Blur sensitive details</b><div class="t">Hides names, dates and results until you hover or tap.</div></div>${sw('sc-blur',S.prefs.blur,'sec')}</div>
  <div class="field" style="margin-top:16px"><label for="lock">Lock the page when idle</label><select id="lock" data-chg="seclock"><option value="0"${S.prefs.lock==='0'?' selected':''}>Never</option><option value="1"${S.prefs.lock==='1'?' selected':''}>After 1 minute</option><option value="5"${S.prefs.lock==='5'?' selected':''}>After 5 minutes</option><option value="10"${S.prefs.lock==='10'?' selected':''}>After 10 minutes</option></select></div></div>
  <div class="card ink"><h3>How the service is protected</h3><ul><li>End-to-end encryption, audit logs and firewalls</li><li>Regular malware scans and security updates</li><li>Toronto-based hosting with data centres in Canada</li><li>Annual privacy and security training for every team member</li><li>Data minimization and breach management in the privacy policy</li></ul><p class="fine" style="color:var(--on-ink-muted)">Sources: IPC, 2024; GHadmin, 2025.</p></div></div>`)));
CHG.sec=(el)=>{const k=el.id.replace('sc-','');S.prefs[k]=el.checked;save();applyPrefs();toast(el.checked?'On':'Off');};
CHG.seclock=(el)=>{S.prefs.lock=el.value;save();armIdle();toast(el.value==='0'?'Auto-lock off':'Auto-lock set');};
CHG.sec2=()=>{};
document.addEventListener('click',e=>{if(e.target.id==='unlock'){$('#lockscr').hidden=true;armIdle();}});

reg('acct-data',()=>page('acct-data','See what Open Door holds about you, take a copy, or erase it.',gate(()=>{
  const rows=[['Intake form',S.intake?'1 form ('+S.intake.ref+')':'None'],['Testing referral',S.referral?S.referral.ref:'None'],['Appointments',S.appts.length+''],['Test result',S.result?'1 result':'None'],['Prescription',S.rx?'1':'None'],['Symptom journal',S.journal.length+' entries'],['Mood check-ins',S.moods.length+''],['Forum posts',(S.posts||[]).filter(p=>p.t===0).length+'']];
  return `<div class="grid2" style="align-items:start"><div class="card"><h3>What we hold</h3><div class="tablewrap"><table><tbody>${rows.map(r=>`<tr><th>${r[0]}</th><td>${sens(esc(r[1]))}</td></tr>`).join('')}</tbody></table></div><p class="fine mt">Where it lives: this prototype keeps data only in this browser tab. A live service stores it in Canadian data centres.</p></div>
   <div class="stack"><div class="card"><h3>Take a copy</h3><p class="muted">Copy your data as text to keep or give to another clinician.</p><button class="btn btn-primary" data-act="data-copy">Copy my data</button></div><div class="card"><h3>Erase everything</h3><p class="muted">Removes all your data from this prototype. This cannot be undone.</p><button class="btn btn-danger" data-act="data-erase">Erase my data</button></div></div></div>`;})));
ACT['data-copy']=()=>copyText(JSON.stringify({nickname:S.user&&S.user.nick,intake:S.intake,referral:S.referral,appointments:S.appts,result:S.result,prescription:S.rx,journal:S.journal,timeline:S.timeline},null,2));
ACT['data-erase']=()=>confirmBox('Erase all your data?','Your intake, appointments, results, journal and settings will be removed from this prototype. This cannot be undone.','Erase everything',()=>{resetAll();},'btn-danger');

reg('acct-exit',()=>page('acct-exit','One click or two taps of Esc and the screen is covered, so nobody sees what you were reading.',`
 <div class="grid2" style="align-items:start"><div class="card"><h3>How Quick exit works</h3><ol class="muted"><li>Click the red button at the top right, or press Esc twice.</li><li>The page is covered with a blank notes screen immediately.</li><li>If you choose, your session data is cleared at the same time.</li><li>To come back, press Esc twice again.</li></ol><div class="row"><button class="btn btn-danger" data-act="exit">Try Quick exit</button></div><p class="fine mt">A website cannot erase a browser's history by itself. In a live service, Quick exit would also send the tab to a neutral site, and we recommend closing the tab on a shared device.</p></div>
 <div class="card"><h3>Your Quick exit settings</h3><div class="switch"><div><b>Clear my session when I exit</b><div class="t">Removes your answers, dashboard and journal from this tab.</div></div>${sw('qe-clear',S.prefs.clearOnExit,'qe')}</div><div class="switch"><div><b>Neutral tab title</b><div class="t">Shows "Student Services" on the browser tab.</div></div>${sw('sc-stealth',S.prefs.stealth,'sec')}</div><p class="fine mt">Open Door is a web page, so there is no app icon, notification or badge to explain.</p></div></div>`));
CHG.qe=(el)=>{S.prefs.clearOnExit=el.checked;save();toast(el.checked?'Session will be cleared on exit':'Session will be kept on exit');};

/* ===================== ABOUT ===================== */
reg('about',()=>`<div class="page"><div class="wrap"><div class="page-head"><p class="crumbs"><a href="#home">Home</a> / About</p><h1>About this project</h1><p>Open Door is a concept designed by Group 15 for MICR 483. It is a clickable prototype, not a clinical service.</p></div>
 <div class="grid2"><div class="card"><h3>Why Open Door</h3><p class="muted">HSV is common, often silent and heavily stigmatised. Stigma stops people from asking, testing and talking to partners. Open Door combines a clinical service with student-led awareness to lower that barrier.</p><h3 style="margin-top:20px">What is real, and what is not</h3><p class="muted" style="margin:0">The care pathway, privacy design and clinical logic follow the group's implementation plan. Clinics, posts, clubs and campaigns are samples. Nothing you type leaves your browser.</p></div>
 <div class="card"><h3>Group 15</h3><ul class="muted" style="margin:0"><li>Mia Tran</li><li>Hana Janfada</li><li>Ryan Taylor</li><li>Skyleigh Hughes-Ahonen</li></ul></div></div></div></div>`);
SECOF.about={id:'about',title:'About'};TITLE.about='About this project';
