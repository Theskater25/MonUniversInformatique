"use strict";
const NOMS = ["L’aigrette", "Le renard", "La grande voile"];
function presenter(p) {
  const ici=p.chemin[p.chemin.length-1];
  return {
    cols:p.largeur,style:"etoiles",
    cases:Array.from({length:p.largeur**2},(_,i)=>p.etoiles.includes(i)?
      tuile(String.fromCharCode(65+p.etoiles.indexOf(i)),ici===i?"or":"bleu",i,"Étoile "+String.fromCharCode(65+p.etoiles.indexOf(i))):tuile("","vide")),
    traits:p.traits.map(([a,b],i)=>[a,b,p.faits.includes(i)]),
    options:[option("Annuler le dernier trait","annuler",0,null,!p.chemin.length)],
    stats:[["Traits",p.faits.length+"/"+p.traits.length],["Essais",p.coups]]
  };
}

