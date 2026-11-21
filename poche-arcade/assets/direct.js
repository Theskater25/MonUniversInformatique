"use strict";

function rectangle(c, couleur, x, y, largeur, hauteur) {
  c.fillStyle=couleur;
  c.fillRect(Math.round(x),Math.round(y),Math.round(largeur),Math.round(hauteur));
}
function polygone(c, couleur, points) {
  c.fillStyle=couleur;
  c.beginPath();
  points.forEach(([x,y],i)=>{if(i)c.lineTo(x,y);else c.moveTo(x,y);});
  c.closePath(); c.fill();
}
function disque(c, couleur, x, y, rayon) {
  c.fillStyle=couleur; c.beginPath(); c.arc(x,y,rayon,0,Math.PI*2); c.fill();
}
function inscription(c, valeur, x, y, couleur="#fff2cf", taille=10) {
  c.fillStyle=couleur; c.font="bold "+taille+"px monospace"; c.textAlign="center"; c.fillText(valeur,x,y);
}

(async () => {
  let m;
  try {
    const octets=Uint8Array.from(atob(binairePiste),c=>c.charCodeAt(0));
    m=(await WebAssembly.instantiate(octets)).instance.exports;
  } catch {
    message.textContent="Cette cartouche requiert un navigateur compatible WebAssembly.";
    return;
  }
  terrain.classList.add("atelier");
  terrain.style.setProperty("--jaquette","url('../assets/"+fiche.image+".png')");
  terrain.innerHTML='<div class="titre-manche"></div><canvas width="300" height="180" class="ecran-direct" role="img"></canvas><div class="pupitre" role="group" aria-label="Commandes de jeu"></div>';
  const titre=terrain.querySelector(".titre-manche"), toile=terrain.querySelector("canvas");
  const ctx=toile.getContext("2d"), pupitre=terrain.querySelector(".pupitre");
  toile.setAttribute("aria-label",fiche.nom+" · "+fiche.bref);
  const maintiens=new Map(), boutons=[];
  let niveau=0, phase="pret", marques=0, precedent=0, cumul=0, animation, trame=0;
  let dernierScore, dernierProgres, dernieresVies;

  function masque() {
    let v=0;
    for(const valeur of maintiens.values())v|=valeur;
    return v;
  }
  function actualiserTouches() {
    const actives=masque();
    for(const b of boutons){
      b.disabled=phase!=="jeu";
      b.classList.toggle("enfonce",Boolean(actives&Number(b.dataset.bit)));
    }
  }
  function presser(source,bit) {
    if(phase!=="jeu"||maintiens.has(source))return;
    if(!(masque()&bit))marques|=bit;
    maintiens.set(source,bit); actualiserTouches();
  }
  function relacher(source) { if(maintiens.delete(source))actualiserTouches(); }
  for(const [nom,,bit] of PISTE.touches) {
    const b=document.createElement("button");
    b.textContent=nom; b.dataset.bit=bit;
    b.onpointerdown=e=>{
      if(phase!=="jeu"||e.button!==0)return;
      e.preventDefault(); b.setPointerCapture(e.pointerId); presser(e.pointerId,bit);
    };
    b.onpointerup=b.onpointercancel=b.onlostpointercapture=e=>relacher(e.pointerId);
    b.oncontextmenu=e=>e.preventDefault();
    boutons.push(b); pupitre.append(b);
  }
  function panneau() {
    dernierScore=m.score(); dernierProgres=m.progres(); dernieresVies=m.vies();
    statistiques([[PISTE.unite,m.progres()+"/"+m.objectif()],["Vies",m.vies()],["Score",m.score()]]);
  }
  function peindre() {
    ctx.clearRect(0,0,300,180);
    ctx.save(); PISTE.dessiner(ctx,m,trame,niveau); ctx.restore();
  }
  function stopper(etat) {
    phase=etat; cancelAnimationFrame(animation); maintiens.clear(); marques=0; actualiserTouches();
  }
  function finir() {
    stopper("fini");
    const gagne=m.issue()===1;
    record(fiche.id+"."+niveau,m.score()); majRecord();
    message.textContent=(gagne?PISTE.victoire:PISTE.defaite)+" · "+m.score()+" points.";
    actions.replaceChildren();
    if(gagne) {
      const fin=niveau===PISTE.noms.length-1;
      commande(fin?"Repartir à la première étape":"Étape suivante",()=>ouvrir(fin?0:niveau+1));
    }
    commande("Réessayer",()=>ouvrir(niveau),!gagne); son(gagne?760:180);
  }
  function image(instant) {
    if(phase!=="jeu")return;
    cumul+=Math.min(.12,Math.max(0,(instant-precedent)/1000));
    precedent=instant;
    while(cumul>=1/60 && !m.issue()){
      const presse=marques; marques=0;
      m.avancer(masque()|presse,presse);
      trame++; cumul-=1/60;
    }
    if(m.progres()!==dernierProgres||m.vies()!==dernieresVies||m.score()!==dernierScore){
      if(m.vies()<dernieresVies){son(170);message.textContent="Une vie en moins.";}
      else if(m.progres()>dernierProgres){son(PISTE.note?PISTE.note(m):600);message.textContent=PISTE.unite+" · "+m.progres()+"/"+m.objectif();}
      panneau();
    }
    peindre();
    if(m.issue()){finir();return;}
    animation=requestAnimationFrame(image);
  }
  function lancer() {
    if(phase!=="pret"&&phase!=="pause")return;
    phase="jeu"; cumul=0; precedent=performance.now(); actualiserTouches();
    actions.replaceChildren(); commande("Pause",pause,false);
    message.textContent=PISTE.aide; animation=requestAnimationFrame(image);
  }
  function pause() {
    if(phase!=="jeu")return;
    stopper("pause"); message.textContent="Partie en pause.";
    actions.replaceChildren(); commande("Reprendre",lancer); commande("Recommencer",()=>ouvrir(niveau),false);
  }
  function ouvrir(i) {
    stopper("pret"); niveau=i; trame=0; m.ouvrir(i);
    titre.textContent=(i+1)+"/"+PISTE.noms.length+" · "+PISTE.noms[i];
    message.textContent=PISTE.aide; actions.replaceChildren(); commande("Jouer",lancer);
    panneau(); peindre();
  }
  document.addEventListener("keydown",e=>{
    if(phase!=="jeu"||palmares.open||e.altKey||e.ctrlKey||e.metaKey)return;
    if(e.key==="Escape"){pause();return;}
    const bit=((e.key===" "||e.key==="Enter")&&e.target.dataset?.bit)?Number(e.target.dataset.bit):
      PISTE.touches.find(([,code])=>code===e.code||code===e.key||code===e.code.replace("Numpad","Digit"))?.[2];
    if(bit){e.preventDefault();if(!e.repeat)presser(e.code,bit);}
  });
  document.addEventListener("keyup",e=>relacher(e.code));
  document.addEventListener("visibilitychange",()=>{if(document.hidden)pause();});
  window.addEventListener("blur",pause);window.addEventListener("pagehide",pause);
  document.querySelector(".record-link").addEventListener("click",pause);
  ouvrir(0);
})();

