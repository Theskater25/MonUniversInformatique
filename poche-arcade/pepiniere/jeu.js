"use strict";
const sprite=[
  ["................","................","............ll..","..........lgll..","..........lgg...","...dg....lg.....","..dggg..dd......","...lgdddgd......",".....gg.dg......","........dg......",".......odgo.....",".....oobbboo....","....obbbbbboo...","...ooobbbbbooo..","................","................"],
  ["................",".......pp.......",".....pphhpp.....","....phhyyhhp....","....phyyyyhp....",".....pphhpp.....",".......pp.......",".......dg...ll..","....gg.dg..ggl..","...lgdgdgggl....",".....ggdg.......",".......dg.......",".....oobboo.....","....obbbbboo....","................","................"]
];
const couleurs={l:"#a4d76e",g:"#54a463",d:"#276458",o:"#95603a",b:"#654631",p:"#e36969",h:"#ff9c83",y:"#ffdc73"};
function vignette(fleur) {
  const c=document.createElement("canvas");c.width=16;c.height=16;
  const ctx=c.getContext("2d");sprite[Number(fleur)].forEach((row,y)=>[...row].forEach((pix,x)=>{if(couleurs[pix]){ctx.fillStyle=couleurs[pix];ctx.fillRect(x,y,1,1);}}));
  return c.toDataURL();
}
const icones=[vignette(false),vignette(true)];
let pousse, eau, tuiles;
function peindre() {
  pousse.forEach((s,i)=>{
    const b=tuiles[i],ombre=i>=4 && pousse[i-4]===4;
    b.classList.toggle("ombre",ombre);b.setAttribute("aria-label","Parcelle "+(i+1)+", "+s+" pousses sur 4"+(ombre?", à l’ombre":""));
    b.firstChild.src=icones[Number(s===4)];b.firstChild.style.transform="scale("+(s===4?1.14:.52+s*.14)+")";
    b.lastChild.textContent=s+"/4";b.disabled=s===4;
  });
  statistiques([["Arrosoir",eau+"/12"],["Fleurs",pousse.filter(s=>s===4).length+"/6"]]);
}
function arroser(i) {
  const avant=pousse.slice();eau--;son(500);
  pousse=pousse.map((s,k)=>{
    const proche=Math.abs(i%4-k%4)+Math.abs(Math.floor(i/4)-Math.floor(k/4))===1;
    const ombre=k>=4 && avant[k-4]===4;
    return Math.min(4,s+(k===i?2:proche&&!ombre?1:0));
  });
  peindre();
  const fleurs=pousse.filter(s=>s===4).length;
  message.textContent=fleurs>avant.filter(s=>s===4).length?"Ça fleurit ! Les parcelles juste en dessous passent à l’ombre.":"Arrosage terminé. À toi de choisir la prochaine parcelle.";
  if(fleurs>=6 || eau===0) {
    record(fiche.id,fleurs);fin(fleurs>=6?"Jardin en fleurs !":"Fin de la saison",fleurs+" fleurs écloses en "+(12-eau)+" arrosages.");
    actions.replaceChildren();commande("Replanter",semer);
  }
}
function semer() {
  eau=12;pousse=Array(16).fill(0);tuiles=[];
  const grille=document.createElement("div");grille.className="grille";grille.style.setProperty("--n",4);
  pousse.forEach((s,i)=>{
    const b=document.createElement("button");b.className="case terre";b.innerHTML='<img alt=""><span class="niveau-plante"></span>';
    b.onclick=()=>arroser(i);tuiles.push(b);grille.append(b);
  });
  terrain.replaceChildren(grille);actions.replaceChildren();commande("Replanter",semer,false);
  message.textContent="Choisis une parcelle pour l’arroser.";peindre();
}
semer();
