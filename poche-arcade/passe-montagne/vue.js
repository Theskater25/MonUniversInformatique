"use strict";
const NOMS = ["Les alpages", "Le col rouge", "La traversée"];
function presenter(p) {
  const ici=p.chemin[p.chemin.length-1], sommet=p.cases.length-1;
  return {
    cols:p.largeur,
    cases:p.cases.map((v,i)=>tuile(i===0?"⚑":i===sommet?"⌂":v<0?"▲":"+"+v,
      i===ici?"or":p.chemin.includes(i)?"vert":v<0?"nuit":i===sommet?"corail":"papier",
      v<0?null:i,"Case "+(i+1)+(v<0?" roche":", dénivelé "+v),i===sommet?"refuge":"",i===ici)),
    options:[option("Annuler un pas","annuler",0,null,!p.coups)],
    stats:[["Dénivelé",p.altitude+"/"+p.cible],["Pas",p.coups]]
  };
}

