"use strict";
const NOMS = ["Le bief", "Le canal", "Le grand sas"];
function presenter(p) {
  return {
    cols:2,style:"bassins",legende:"Volume demandé · "+p.cible+" unités",
    cases:p.eau.map((e,i)=>({...tuile(e+" / "+p.capacites[i],e===p.cible?"or":"bleu",null,"","Bassin "+(i?"B":"A")),
      remplissage:100*e/p.capacites[i]})),
    options:[...["A","B"].flatMap((nom,i)=>[
      option("Remplir "+nom,"remplir",i,null,p.eau[i]===p.capacites[i]),
      option("Vider "+nom,"vider",i,null,p.eau[i]===0),
      option(nom+" → "+(i?"A":"B"),"verser",i,null,!p.eau[i]||p.eau[1-i]===p.capacites[1-i])
    ])],
    stats:[["Cible",p.cible],["Manœuvres",p.coups]]
  };
}

