'use strict';

/* ═══════════════════════════════════════════════
   Portfolio-13 v2.0 — main.js
═══════════════════════════════════════════════ */

/* Pre-paint theme load (FOUC prevention) */
(function(){
  try{
    var s = localStorage.getItem('mk-theme');
    if(!s) s = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', s);
  }catch(e){}
})();

document.addEventListener('DOMContentLoaded', function(){
  document.body.classList.add('js-loaded');
  initTheme();
  initNav();
  initActiveLinks();
  initScroll();
  initReveal();
  initCounters();
  initAccordion();
  initContactForm();
  initEffortEstimator();
  initAIAnalyzer();
  initIDSelector();
  initXapi();
  initLms();
  initSpotBug();
  initFooterYear();
});

/* ═══════════ THEME ═══════════ */
function updateThemeIcon(){
  const t = document.documentElement.getAttribute('data-theme') || 'dark';
  document.querySelectorAll('.theme-toggle').forEach(b => b.textContent = (t==='dark' ? '☀️' : '🌙'));
}
function toggleTheme(){
  const c = document.documentElement.getAttribute('data-theme') || 'dark';
  const n = c==='dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', n);
  try{ localStorage.setItem('mk-theme', n); }catch(e){}
  updateThemeIcon();
}
window.toggleTheme = toggleTheme;
function initTheme(){ updateThemeIcon(); }

/* ═══════════ NAV / MOBILE MENU ═══════════ */
function initNav(){
  const ham = document.querySelector('.nav-ham');
  const mob = document.querySelector('.mobile-menu');
  const nav = document.querySelector('nav#site-nav');
  if(!ham || !mob || !nav) return;
  function sync(){ mob.style.top = Math.max(nav.getBoundingClientRect().bottom, 0) + 'px'; }
  ham.addEventListener('click', function(){
    const o = this.classList.toggle('open');
    this.setAttribute('aria-expanded', o ? 'true' : 'false');
    mob.setAttribute('aria-hidden', o ? 'false' : 'true');
    if(o) sync();
    mob.classList.toggle('open', o);
    document.body.style.overflow = o ? 'hidden' : '';
  });
  window.addEventListener('resize', () => { if(mob.classList.contains('open')) sync(); });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
    mob.classList.remove('open');
    mob.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }));
}

/* ═══════════ ACTIVE LINK ═══════════ */
function initActiveLinks(){
  const p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a, .mobile-menu a, .nav-dd a').forEach(a => {
    const h = ((a.getAttribute('href')||'').split('#')[0] || '').toLowerCase();
    if(h===p || (p==='' && h==='index.html')) a.classList.add('active');
  });
}

/* ═══════════ SCROLL: progress bar, nav state, btt ═══════════ */
function initScroll(){
  const nav = document.querySelector('nav#site-nav');
  const prog = document.querySelector('.progress-bar');
  const btt = document.querySelector('.btt');
  function onScroll(){
    const sy = window.scrollY;
    if(nav) nav.classList.toggle('scrolled', sy > 20);
    if(prog){
      const h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (h>0 ? (sy/h)*100 : 0) + '%';
    }
    if(btt) btt.classList.toggle('show', sy > 500);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  btt?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

/* ═══════════ REVEAL ═══════════ */
function initReveal(){
  if(!('IntersectionObserver' in window)){
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold: .1, rootMargin: '0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ═══════════ COUNTERS ═══════════ */
function animCounter(el){
  const target = parseInt(el.dataset.n || el.dataset.target || el.textContent.replace(/\D/g,'')) || 0;
  const sfx = el.dataset.suffix || '';
  const pfx = el.dataset.prefix || '';
  const dur = 1800;
  let start = null;
  requestAnimationFrame(function step(ts){
    if(!start) start = ts;
    const p = Math.min((ts-start)/dur, 1);
    const e = 1 - Math.pow(1-p, 3);
    el.textContent = pfx + Math.round(e * target) + sfx;
    if(p < 1) requestAnimationFrame(step);
  });
}
function initCounters(){
  if(!('IntersectionObserver' in window)) return;
  const co = new IntersectionObserver(es => es.forEach(x => {
    if(x.isIntersecting && !x.target.dataset.animated){
      x.target.dataset.animated = '1';
      animCounter(x.target);
    }
  }), {threshold: .4});
  document.querySelectorAll('.counter,[data-n]').forEach(el => co.observe(el));
}

/* ═══════════ ACCORDION ═══════════ */
function initAccordion(){
  document.addEventListener('click', e => {
    const q = e.target.closest('.acc-q');
    if(!q) return;
    const item = q.closest('.acc-item');
    if(!item) return;
    item.classList.toggle('open');
  });
}

/* ═══════════ MODAL ═══════════ */
window.openModal = function(id){
  const m = document.getElementById(id);
  if(m){ m.classList.add('open'); document.body.style.overflow = 'hidden'; }
};
window.closeModal = function(id){
  const m = document.getElementById(id);
  if(m){ m.classList.remove('open'); document.body.style.overflow = ''; }
};
document.addEventListener('click', e => {
  if(e.target.classList?.contains('modal-bg')){
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    document.querySelectorAll('.modal-bg.open').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
  }
});

/* ═══════════ CONTACT FORM ═══════════ */
function initContactForm(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  const status = document.getElementById('form-status');
  const btn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(status){ status.classList.remove('show'); status.textContent = ''; }
    const fd = new FormData(form);
    if(fd.get('botcheck')) return; // honeypot
    if(btn){ btn.disabled = true; btn._t = btn.textContent; btn.textContent = 'Sending…'; }
    try {
      const key = form.querySelector('input[name="access_key"]')?.value || '';
      if(!key || key.indexOf('YOUR-') === 0){
        // Fallback: open mailto
        const name = encodeURIComponent(fd.get('name')||'');
        const msg = encodeURIComponent(fd.get('message')||'');
        const topic = encodeURIComponent(fd.get('topic')||'New enquiry');
        window.location.href = `mailto:madhukumar5290@gmail.com?subject=${topic}%20%E2%80%94%20${name}&body=${msg}`;
        if(status){ status.textContent = '📨 Opening your email client… (Add a Web3Forms key to enable instant send)'; status.classList.add('show'); }
        return;
      }
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: {Accept:'application/json'}, body: fd
      });
      const json = await res.json();
      if(json.success){
        form.reset();
        if(status){ status.textContent = '✓ Thanks! Your message has been sent. I will reply within 24 hours.'; status.classList.add('show'); status.style.color = ''; }
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch(err){
      if(status){ status.textContent = '⚠ Something went wrong. Please email madhukumar5290@gmail.com directly.'; status.classList.add('show'); status.style.color = 'var(--red)'; }
    } finally {
      if(btn){ btn.disabled = false; btn.textContent = btn._t || 'Send Message'; }
    }
  });
}

/* ═══════════ EFFORT ESTIMATOR ═══════════ */
function initEffortEstimator(){
  const form = document.getElementById('estimator');
  const out = document.getElementById('est-result');
  if(!form || !out) return;
  function recalc(){
    const type = form.elements['courseType']?.value || 'rise';
    const dur = Math.max(5, parseFloat(form.elements['duration']?.value) || 30);
    const cx = form.elements['complexity']?.value || 'medium';
    const ix = form.elements['interactivity']?.value || 'level2';
    // Base rates: hours of dev per minute of finished content
    const baseMap = {rise:1.5, storyline:3.5, video:5, vr:7, scenario:4};
    const cxMap = {easy:1.0, medium:1.4, high:1.9};
    const ixMap = {level1:1.0, level2:1.4, level3:1.9, level4:2.5};
    const base = baseMap[type] || 2;
    const total = Math.round(base * dur * (cxMap[cx]||1.4) * (ixMap[ix]||1.4));
    const lo = Math.round(total*0.85), hi = Math.round(total*1.15);
    out.innerHTML = `<strong>${lo} – ${hi} hrs</strong><span style="font-size:.85rem;display:block;margin-top:.4rem;opacity:.85">≈ ${(total/40).toFixed(1)} weeks (1 FTE) for a ${dur}-min ${type.toUpperCase()} course at ${cx} complexity</span>`;
  }
  form.addEventListener('input', recalc);
  form.addEventListener('change', recalc);
  recalc();
}

/* ═══════════ AI ANALYZER ═══════════ */
function initAIAnalyzer(){
  const txt = document.getElementById('ai-text');
  const btn = document.getElementById('ai-go');
  const out = document.getElementById('ai-result');
  if(!txt || !btn || !out) return;
  function syllables(word){
    word = word.toLowerCase().replace(/[^a-z]/g,'');
    if(!word) return 0;
    if(word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
    const m = word.match(/[aeiouy]{1,2}/g);
    return m ? m.length : 1;
  }
  btn.addEventListener('click', () => {
    const t = txt.value.trim();
    if(!t){ out.innerHTML = '<p style="color:var(--red)">Please paste some text first.</p>'; return; }
    const words = t.split(/\s+/).filter(Boolean);
    const sentences = t.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const syl = words.reduce((s,w) => s + syllables(w), 0);
    const wpcs = sentences.length ? words.length/sentences.length : words.length;
    const spw = words.length ? syl/words.length : 0;
    // Flesch Reading Ease
    const fre = 206.835 - 1.015*wpcs - 84.6*spw;
    // Flesch–Kincaid Grade Level
    const fk = 0.39*wpcs + 11.8*spw - 15.59;
    let band = 'College-level', color = 'var(--red)';
    if(fre>=90){band='5th grade · very easy';color='var(--teal)'}
    else if(fre>=70){band='7th grade · easy';color='var(--teal)'}
    else if(fre>=60){band='8–9th grade · plain English ✓';color='var(--gold)'}
    else if(fre>=50){band='10–12th grade · fairly difficult';color='var(--gold)'}
    else if(fre>=30){band='College · difficult';color='var(--red)'}
    out.innerHTML = `
      <div class="grid grid-4" style="margin-top:1rem">
        <div class="stat"><span class="num">${words.length}</span><span class="lbl">Words</span></div>
        <div class="stat"><span class="num">${sentences.length}</span><span class="lbl">Sentences</span></div>
        <div class="stat"><span class="num">${wpcs.toFixed(1)}</span><span class="lbl">Avg Words/Sent</span></div>
        <div class="stat"><span class="num">${Math.max(0,Math.round(fre))}</span><span class="lbl">Flesch Score</span></div>
      </div>
      <div class="card" style="margin-top:1.25rem;border-left:4px solid ${color}">
        <h3 style="margin-bottom:.4rem">Reading Level: <span style="color:${color}">${band}</span></h3>
        <p>Estimated Flesch–Kincaid Grade: <strong>${Math.max(1,fk).toFixed(1)}</strong>. For workplace eLearning, aim for grade 7–9 (Flesch 60–80).</p>
      </div>`;
  });
}

/* ═══════════ ID MODEL SELECTOR ═══════════ */
function initIDSelector(){
  const form = document.getElementById('ids-form');
  const btn = document.getElementById('ids-go');
  const out = document.getElementById('ids-result');
  if(!form || !btn || !out) return;
  btn.addEventListener('click', () => {
    const get = n => parseInt(form.querySelector(`input[name="${n}"]:checked`)?.value || '0');
    const q1 = get('q1'), q2 = get('q2'), q3 = get('q3'), q4 = get('q4');
    if(!(q1||q2||q3||q4)){ out.innerHTML='<p style="color:var(--red)">Please answer all questions.</p>'; return; }
    const total = q1+q2+q3+q4;
    let rec, why, when, ico;
    if(total<=6){ rec='ADDIE'; ico='📐'; why='Linear, well-documented, stakeholder-friendly. Best when scope is clear and you have time for thorough analysis.'; when='Use for: compliance courses, regulated industries, large-scale rollouts.';}
    else if(total<=10){ rec='SAM (Successive Approximation Model)'; ico='⚡'; why='Iterative & agile. Lets you prototype fast and refine through 3 short cycles.'; when='Use for: tight deadlines, evolving content, stakeholders who want to "see something" early.';}
    else if(total<=14){ rec='Design Thinking + LLAMA'; ico='🎨'; why='Learner-centered & empathetic. Start with learner research, prototype quickly, iterate based on feedback.'; when='Use for: UX-driven training, performance support, behavior-change initiatives.';}
    else { rec='LLAMA + Action Mapping'; ico='🎯'; why='Performance-first. Build the course backward from the on-the-job behavior, skip "nice-to-know".'; when='Use for: skills training, sales enablement, workflows where the gap is doing not knowing.';}
    out.innerHTML = `<div class="card reveal in" style="border-top:4px solid var(--gold);text-align:center">
      <div style="font-size:3rem">${ico}</div>
      <p class="eyebrow gold" style="justify-content:center">Recommended for you</p>
      <h2 style="margin-bottom:.85rem">${rec}</h2>
      <p style="max-width:520px;margin:0 auto 1rem">${why}</p>
      <p style="color:var(--gold);font-family:var(--mono);font-size:.85rem">${when}</p>
    </div>`;
    out.scrollIntoView({behavior:'smooth', block:'center'});
  });
}

/* ═══════════ xAPI DEMO ═══════════ */
function initXapi(){
  const list = document.getElementById('xapi-list');
  const btn = document.getElementById('xapi-emit');
  if(!list || !btn) return;
  const actors = ['Madhu','Priya','Anil','Mary','Sai'];
  const verbs = ['completed','attempted','answered','viewed','passed','failed'];
  const objects = ['Module 1: Intro','Quiz: Fire Safety','Video: Hand Hygiene','Scenario: AML Red Flags','Assessment'];
  const scores = ['85%','92%','100%','67%','78%'];
  function rnd(a){ return a[Math.floor(Math.random()*a.length)]; }
  btn.addEventListener('click', () => {
    const ts = new Date().toLocaleTimeString();
    const div = document.createElement('div');
    div.className = 'xapi-stmt';
    div.innerHTML = `[${ts}] <b>${rnd(actors)}</b> <em>${rnd(verbs)}</em> <b>"${rnd(objects)}"</b> — score: ${rnd(scores)}`;
    list.prepend(div);
    while(list.children.length > 15) list.removeChild(list.lastChild);
  });
}

/* ═══════════ LMS TABS ═══════════ */
function initLms(){
  const tabs = document.querySelectorAll('[data-lms-tab]');
  if(!tabs.length) return;
  tabs.forEach(t => t.addEventListener('click', e => {
    e.preventDefault();
    const id = t.dataset.lmsTab;
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    document.querySelectorAll('[data-lms-pane]').forEach(p => p.style.display = (p.dataset.lmsPane===id ? 'block' : 'none'));
  }));
  tabs[0]?.click();
}

/* ═══════════ SPOT THE BUG ═══════════ */
function initSpotBug(){
  const targets = document.querySelectorAll('.bug-target');
  if(!targets.length) return;
  const score = document.getElementById('bug-score');
  let found = 0;
  targets.forEach(t => t.addEventListener('click', () => {
    if(t.classList.contains('found')) return;
    t.classList.add('found');
    t.style.background = 'var(--teal-dim)';
    t.style.color = 'var(--teal)';
    t.style.textDecoration = 'line-through';
    found++;
    if(score) score.textContent = `${found} / ${targets.length} bugs found`;
    if(found === targets.length){
      const msg = document.getElementById('bug-msg');
      if(msg){ msg.textContent = '🎉 Brilliant! You spotted them all. WCAG champion.'; msg.style.color='var(--teal)'; }
    }
  }));
}

/* ═══════════ FOOTER YEAR ═══════════ */
function initFooterYear(){
  const y = document.getElementById('yr');
  if(y) y.textContent = new Date().getFullYear();
}
