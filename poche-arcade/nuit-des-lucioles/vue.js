"use strict";
const NOMS = ["La souche", "Les fougères", "Le grand chêne"];
function presenter(p) {
  return {
    cols:p.largeur,style:"lucioles",
    cases:p.cases.map((allumee,i)=>tuile(allumee?"✺":"·",allumee?"or":"nuit",i,"Luciole "+(i+1)+(allumee?" allumée":" éteinte"))),
    stats:[["Lueurs",p.cases.filter(Boolean).length+"/"+p.cases.length],["Gestes",p.coups]]
  };
}

