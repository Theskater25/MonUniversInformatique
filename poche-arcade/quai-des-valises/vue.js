"use strict";
const NOMS = ["Train local", "Correspondance", "Le train de nuit"];
function presenter(p) {
  const tete=p.pile[p.pile.length-1];
  return {
    cols:Math.min(4,Math.max(1,p.tapis.length)),style:"valises",
    legende:p.tapis.length?"Tapis · la première valise sort en premier":"Tapis vide",
    cases:p.tapis.map((v,i)=>tuile(v,tonsAtelier[(v-1)%6],null,"Valise "+v,i===0?"en tête":"")),
    journal:["Consigne, du fond au dessus · "+(p.pile.join(" › ")||"vide"),"Chargement · "+(p.prochain>p.total?"terminé":"valise "+p.prochain+" attendue")],
    options:[option("Tapis → train","tapis",0,null,!p.tapis.length),option("Tapis → consigne","ranger",0,null,!p.tapis.length||p.pile.length>=p.capacite),
      option("Consigne → train","pile",0,null,tete===undefined),option("Annuler","annuler",0,null,!p.coups)],
    stats:[["À bord",(p.prochain-1)+"/"+p.total],["Opérations",p.coups]]
  };
}

