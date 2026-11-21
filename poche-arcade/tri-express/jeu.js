"use strict";
const consignes=[
  {titre:"Trie par symbole", choix:["● Rond","▲ Triangle"],champ:"forme"},
  {titre:"Trie par poids", choix:["1 kg","5 kg"],champ:"poids"}
];
let file, points, erreurs, traites, millisecondes, avantColis, dernierInstant, horloge, etat;
function regle(){return consignes[Math.floor(traites/5)%consignes.length];}
function ajouterColis(){file.push({forme:Math.random()<.5?0:1,poids:Math.random()<.5?0:1});}
function compteur(){
  statistiques([["Temps",Math.ceil(millisecondes/1000)+" s"],["Colis triés",points],["Erreurs",erreurs+"/3"]]);
}
function dessinerTri() {
  const reg=regle();terrain.querySelector(".consigne").textContent=reg.titre;
  const colis=file.map((c,i)=>{
    const el=document.createElement("div");el.className="colis";
    const sym=document.createElement("b"),poids=document.createElement("small");
    sym.textContent=c.forme?"▲":"●";poids.textContent=c.poids?"5 kg":"1 kg";
    el.setAttribute("aria-label",(i===0?"Prochain colis, ":"")+(c.forme?"triangle":"rond")+", "+poids.textContent);
    el.append(sym,poids);return el;
  });
  terrain.querySelector(".tapis").replaceChildren(...colis);
  [...terrain.querySelector(".quais").children].forEach((b,k)=>{b.textContent=(k?"→ ":"← ")+reg.choix[k];b.disabled=etat!=="actif" || !file.length;});
  compteur();
}
function terminer(titre) {
  etat="fini";clearInterval(horloge);record(fiche.id,points);compteur();fin(titre,points+" colis correctement triés pendant ce service.");
  actions.replaceChildren();commande("Nouveau service",()=>preparer(true));
}
function actualiser() {
  if(etat!=="actif")return;
  const instant=performance.now(),dt=instant-dernierInstant;dernierInstant=instant;
  const avantFin=millisecondes;
  millisecondes=Math.max(0,millisecondes-dt);avantColis-=Math.min(avantFin,dt);
  while(avantColis<=0){
    if(file.length>=5){terminer("Tapis saturé !");return;}
    ajouterColis();avantColis+=Math.max(740,1650-traites*22);dessinerTri();
  }
  if(millisecondes<=0){terminer("Service terminé !");return;}
  if(Math.ceil(avantFin/1000)!==Math.ceil(millisecondes/1000))compteur();
}
function expedier(quai) {
  actualiser();if(etat!=="actif" || !file.length)return;
  const c=file.shift(),succes=c[regle().champ]===quai;
  if(succes){points++;son(610);} else {erreurs++;son(170);}
  traites++;dessinerTri();
  if(erreurs===3){terminer("Service interrompu");return;}
  message.textContent=(succes?"Bon quai.":"Erreur de quai.")+(traites%5===0?" Nouvelle consigne ! "+regle().titre+".":file.length?" Passe au colis suivant.":" Le prochain colis arrive.");
}
function lancer() {
  etat="actif";dernierInstant=performance.now();horloge=setInterval(actualiser,100);actions.replaceChildren();
  commande("Pause",pause,false);message.textContent="Trie le colis encadré, à gauche du tapis.";dessinerTri();
}
function pause() {
  actualiser();if(etat!=="actif")return;
  clearInterval(horloge);etat="pause";actions.replaceChildren();commande("Reprendre",lancer);commande("Recommencer",()=>preparer(false),false);
  message.textContent="Service en pause.";dessinerTri();
}
function preparer(immediat) {
  clearInterval(horloge);file=[];points=0;erreurs=0;traites=0;millisecondes=45000;avantColis=1650;etat="attente";ajouterColis();ajouterColis();
  terrain.innerHTML='<h2 class="consigne"></h2><div class="tapis" aria-label="File des colis"></div><div class="quais"><button class="action"></button><button class="action"></button></div>';
  [...terrain.querySelector(".quais").children].forEach((b,k)=>b.onclick=()=>expedier(k));
  actions.replaceChildren();commande("Commencer le service",lancer);message.textContent="Le premier colis à trier est à gauche.";dessinerTri();
  if(immediat)lancer();
}
document.addEventListener("keydown",e=>{
  if(etat!=="actif" || e.repeat || palmares.open || !["ArrowLeft","ArrowRight"].includes(e.key))return;
  e.preventDefault();expedier(e.key==="ArrowLeft"?0:1);
});
document.addEventListener("visibilitychange",()=>{if(document.hidden && etat==="actif")pause();});
document.querySelector(".record-link").addEventListener("click",()=>{if(etat==="actif")pause();});
preparer(false);

