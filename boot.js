'use strict';
(function(){
  buildMenu();
  $('#footer').innerHTML='<div class="wrap"><div class="fcols"><div><a class="brand" href="#home">Open Door</a><p style="max-width:42ch">A confidential telehealth concept for stigma-free HSV care, built for university students. Student prototype by Group 15. Not a live clinical service and not medical advice.</p></div>'
   +'<div><h4>Get care</h4><ul><li><a href="#care-intake">Confidential intake</a></li><li><a href="#care-clinics">Find a clinic</a></li><li><a href="#care-consult">Consultations</a></li><li><a href="#my-dashboard">My health</a></li></ul></div>'
   +'<div><h4>Learn and connect</h4><ul><li><a href="#learn-types">Learn about HSV</a></li><li><a href="#rel-disclosure">Disclosure guide</a></li><li><a href="#comm-forum">Anonymous forum</a></li><li><a href="#about">About this project</a></li></ul></div>'
   +'<div><h4>Need help now?</h4><ul><li>Crisis line: call or text <b style="color:var(--on-ink)">9-8-8</b></li><li>Emergency: <b style="color:var(--on-ink)">911</b></li><li><a href="#mind-resources">More resources</a></li></ul></div></div></div>';
  $('#exit').addEventListener('click',exitToggle);
  $('#burger').addEventListener('click',()=>{const m=$('#mnav');const o=m.classList.toggle('open');$('#burger').setAttribute('aria-expanded',String(o));});
  $('#mnav').addEventListener('click',e=>{if(e.target.tagName==='A'){$('#mnav').classList.remove('open');$('#burger').setAttribute('aria-expanded','false');}});
  $('#demoBtn').addEventListener('click',()=>{const d=$('#demo');d.hidden=!d.hidden;$('#demoBtn').setAttribute('aria-expanded',String(!d.hidden));if(!d.hidden)renderDemo();});
  $('#unlock').addEventListener('click',()=>{$('#lockscr').hidden=true;armIdle();});
  window.addEventListener('hashchange',()=>{$('#mnav').classList.remove('open');closeDrops();route();});
  route();
})();
