"use strict";
const NOMS = ["Le petit bassin", "Les salines", "La grande baie"];
function presenter(p) {
  return {
    cols:p.largeur,
    cases:p.cases.map((couleur,i)=>tuile(i===0?"⚓":motifsAtelier[couleur],tonsAtelier[couleur],null,"",i===0?motifsAtelier[couleur]:"",p.baie.includes(i))),
    options:["Vague","Sable","Algue","Galet"].map((nom,i)=>option(motifsAtelier[i]+" "+nom,"maree",i,i===p.cases[0],i===p.cases[0])),
    stats:[["Marées",p.coups+"/"+p.limite],["Baie",p.baie.length+"/"+p.cases.length]]
  };
}

