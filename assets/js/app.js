'use strict';
(() => {
const STORAGE='mui-language';
const getLang=()=>{try{return localStorage.getItem(STORAGE)==='en'?'en':'fr'}catch{return 'fr'}};
let dictionary={}; let lang=getLang();
const translate=(key)=>key.split('.').reduce((o,k)=>o?.[k],dictionary);
function updateFilterResult(){
  const message=document.getElementById('filter-result');
  if(message){
    const count=document.querySelectorAll('[data-tags]:not([hidden])').length;
    message.textContent=count+' '+(lang==='en'?'projects':'projets');
  }
}
async function setLanguage(next) {
  lang=next;
  try {localStorage.setItem(STORAGE,next)} catch {}
  document.documentElement.lang=next;
  const button=document.getElementById('lang-switch');
  if(button){button.textContent=next==='fr'?'EN':'FR';button.setAttribute('aria-label',next==='fr'?'Switch to English':'Passer en français');}
  try{
    const prefix=location.pathname.includes('/demos/')?'../':'';
    const response=await fetch(prefix+'assets/i18n/'+next+'.json');
    if(!response.ok) throw Error(response.status);
    dictionary=await response.json();
    document.querySelectorAll('[data-i18n]').forEach(el=>{const val=translate(el.dataset.i18n);if(typeof val==='string')el.textContent=val;});
    document.querySelectorAll('[data-i18n-alt]').forEach(el=>{const val=translate(el.dataset.i18nAlt);if(typeof val==='string')el.setAttribute('alt',val);});
    updateFilterResult();
    if(typeof window.updateGameTranslation==='function')window.updateGameTranslation(dictionary.game||{});
  }catch(err){console.warn('Translation not loaded',err)}
}
function updateNavigation(){
  const hash=location.hash;
  const home=location.pathname.endsWith('/')||location.pathname.endsWith('/index.html');
  if(!home)return;
  document.querySelectorAll('.site-header nav a').forEach(link=>{
    const target=new URL(link.href);
    const active=target.hash?target.hash===hash:link.dataset.i18n==='nav.home'&&!hash;
    if(active)link.setAttribute('aria-current',target.hash?'location':'page');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('hashchange',updateNavigation);
document.addEventListener('DOMContentLoaded',()=>{
  updateNavigation();
  document.getElementById('lang-switch')?.addEventListener('click',()=>setLanguage(lang==='fr'?'en':'fr'));
  setLanguage(lang);
  const filters=[...document.querySelectorAll('[data-filter]')];
  const cards=[...document.querySelectorAll('[data-tags]')];
  filters.forEach(btn=>btn.addEventListener('click',()=>{
    const tag=btn.dataset.filter;
    filters.forEach(b=>{const on=b===btn;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});
    cards.forEach(card=>{const match=tag==='all'||card.dataset.tags.split(' ').includes(tag);card.hidden=!match});
    updateFilterResult();
  }));
  if(filters.length)filters[0].click();
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});
    document.querySelectorAll('.panel,.project-card,.timeline li,.stat').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
  }
  loadGithub();
});
async function loadGithub(){
  if(!document.getElementById('github-stats'))return;
  const message=document.getElementById('stats-message');
  try{
    // GitHub's public API is sufficient for public repository statistics; no token is embedded in the site.
    let repos=[], page=1;
    while(page<=5){
      const r=await fetch('https://api.github.com/users/Theskater25/repos?per_page=100&page='+page+'&type=owner&sort=updated');
      if(!r.ok)throw Error('GitHub API '+r.status);
      const batch=await r.json();repos.push(...batch);if(batch.length<100)break;page++;
    }
    repos=repos.filter(r=>!r.fork&&!r.private);
    const languages=new Set(repos.map(r=>r.language).filter(Boolean));
    const year=new Date().getFullYear();
    const updated=repos.filter(r=>new Date(r.pushed_at).getFullYear()===year).length;
    document.getElementById('repo-count').textContent=repos.length;
    document.getElementById('language-count').textContent=languages.size;
    document.getElementById('updated-count').textContent=updated;
    if(message)message.textContent='';
  }catch(err){
    if(message)message.textContent=lang==='en'?'GitHub statistics unavailable right now. Visit the profile for current information.':'Statistiques GitHub temporairement indisponibles. Consulte mon profil pour les informations actuelles.';
  }
}
window.portfolioSetLanguage=setLanguage;
})();
