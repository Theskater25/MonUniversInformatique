"use strict";
let manche=1, vies=3, trajet=[], saisie=0, phase="attente", delai;
const casesEcho=[];
function melanger(valeurs) {
  for(let i=valeurs.length-1;i>0;i--) {
    const j=Math.floor(Math.random()*(i+1));[valeurs[i],valeurs[j]]=[valeurs[j],valeurs[i]];
  }
  return valeurs;
}
function creerTrajet(longueur) {
  function prolonger(chemin) {
    if(chemin.length===longueur) return chemin;
    const i=chemin.at(-1), voisins=[i-4,i+4];
    if(i%4>0) voisins.push(i-1);if(i%4<3) voisins.push(i+1);
    for(const v of melanger(voisins)) {
      if(v<0 || v>=16 || chemin.includes(v)) continue;
      const suite=prolonger([...chemin,v]);if(suite) return suite;
    }
  }
  return prolonger([Math.floor(Math.random()*16)]);
}
function etatEcho(){statistiques([["Manche",manche+"/6"],["Vies",vies],["Balises",saisie+"/"+trajet.length]]);}
function dessinerEcho(){
  casesEcho.forEach((b,i)=>{
    const ordre=trajet.indexOf(i), visible=phase==="observation" && ordre>=0, trouve=phase==="saisie" && ordre>=0 && ordre<saisie;
    b.classList.toggle("allumee",visible);b.classList.toggle("trouvee",trouve);
    b.textContent=visible || trouve ? ordre+1 : "";
    b.setAttribute("aria-label","Case "+(i+1)+(visible?", balise "+(ordre+1):trouve?", retrouvée":""));
    b.disabled=phase!=="saisie";
  });
  etatEcho();
}
function observer() {
  clearTimeout(delai);saisie=0;phase="observation";actions.replaceChildren();commande("Recommencer",nouvellePartie,false);
  message.textContent="Observe les numéros pendant deux secondes.";dessinerEcho();
  delai=setTimeout(()=>{
    phase="saisie";message.textContent="À toi ! Retrouve la première balise.";dessinerEcho();casesEcho[0].focus({preventScroll:true});
  },2000);
}
function choisir(i) {
  if(phase!=="saisie")return;
  if(i!==trajet[saisie]) {
    vies--;saisie=0;phase="attente";dessinerEcho();actions.replaceChildren();son(170);
    if(!vies){record(fiche.id,manche-1);fin("Signal perdu",(manche-1)+" manche(s) terminée(s) sur 6.");commande("Rejouer",nouvellePartie);}
    else {message.textContent="Le trajet s’est brouillé. Observe-le à nouveau pour réessayer.";commande("Revoir le trajet",observer);}
    return;
  }
  saisie++;son(360+60*saisie);dessinerEcho();
  if(saisie<trajet.length){message.textContent="Retrouve la balise "+(saisie+1)+".";return;}
  phase="attente";record(fiche.id,manche);majRecord();actions.replaceChildren();casesEcho.forEach(b=>b.disabled=true);
  if(manche===6){fin("Mémoire parfaite !","Tu as retrouvé les six trajets.");commande("Rejouer",nouvellePartie);}
  else {message.textContent="Trajet retrouvé !";commande("Manche suivante",()=>{manche++;trajet=creerTrajet(manche+2);observer();});}
}
function nouvellePartie() {
  clearTimeout(delai);manche=1;vies=3;saisie=0;phase="attente";trajet=creerTrajet(3);casesEcho.length=0;
  const grille=document.createElement("div");grille.className="grille";grille.style.setProperty("--n",4);
  for(let i=0;i<16;i++){
    const b=document.createElement("button");b.className="case balise";b.onclick=()=>choisir(i);casesEcho.push(b);grille.append(b);
  }
  terrain.replaceChildren(grille);actions.replaceChildren();commande("Observer le trajet",observer);message.textContent="Prêt à mémoriser les balises ?";dessinerEcho();
}
document.addEventListener("visibilitychange",()=>{
  if(document.hidden && phase==="observation"){
    clearTimeout(delai);phase="attente";dessinerEcho();actions.replaceChildren();commande("Observer le trajet",observer);message.textContent="La manche est en pause.";
  }
});
nouvellePartie();

