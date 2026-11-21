"use strict";
const NOMS = ["La crique", "Le lagon", "La grotte nacrée"];
const SIGNES = ["✦","◉","◆","≋","☾","▲"];
const NOMS_SIGNES = ["Étoile","Œil","Losange","Vague","Lune","Pic"];
function presenter(p) {
  const fin = p.etat !== "jeu";
  const ligne = fin ? p.secret : p.ligne;
  return {
    cols:3, legende:fin?"Combinaison du coffre":"Ta proposition",
    cases:[0,1,2].map(i=>tuile(i<ligne.length?SIGNES[ligne[i]]:"·",i<ligne.length?tonsAtelier[ligne[i]]:"vide")),
    options:[...SIGNES.slice(0,p.palette).map((s,i)=>option(s+" "+NOMS_SIGNES[i],"choisir",i,null,p.ligne.length===3)),option("Effacer","effacer",0,null,!p.ligne.length),option("Valider","valider",0,null,p.ligne.length!==3)],
    journal:p.essais.map(([proposition,bien,ailleurs])=>proposition.map(i=>SIGNES[i]).join(" ")+"   ·   "+bien+" bien placé(s), "+ailleurs+" ailleurs"),
    stats:[["Essais",p.coups+"/"+p.limite],["Symboles",p.palette]]
  };
}

