"use strict";
const NOMS = ["Le ruban", "Le chevron", "Le grand carré"];
function presenter(p) {
  const fil = couleur=>tuile(motifsAtelier[couleur],tonsAtelier[couleur]);
  return {
    cols:p.largeur,style:"trame",cases:p.cases.map(fil),
    modele:{nom:"Modèle",cols:p.largeur,cases:p.modele.map(fil)},
    options:[...["ligne","colonne"].flatMap(cle=>Array.from({length:p.largeur},(_,i)=>
      option((cle==="ligne"?"Ligne ":"Col. ")+(i+1)+(cle==="ligne"?" →":" ↓"),cle,i)))],
    stats:[["Fils en place",p.cases.filter((v,i)=>v===p.modele[i]).length+"/"+p.cases.length],["Décalages",p.coups]]
  };
}

