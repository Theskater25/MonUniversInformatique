"use strict";
const NOMS = ["Cabotage", "Le second pont", "Le grand cargo"];
function presenter(p) {
  const forme = p.forme();
  const xs = forme.map(v=>v[0]), ys = forme.map(v=>v[1]);
  const min = Math.min(...xs), max = Math.max(...xs), cols = max-min+1;
  const echantillon = [];
  for(let y=0;y<=Math.max(...ys);y++) for(let x=min;x<=max;x++){
    const pleine=forme.some(([dx,dy])=>dx===x&&dy===y);
    echantillon.push(tuile(pleine?(x===0&&y===0?"●":"■"):"",pleine?tonsAtelier[p.selection]:"nuit"));
  }
  return {
    cols:p.largeur,
    cases:p.cases.map((v,i)=>tuile(v<0?"·":String.fromCharCode(65+v),v<0?"vide":tonsAtelier[v],i,"Case "+(i+1)+(v<0?" libre":" occupée par "+String.fromCharCode(65+v)))),
    modele:p.etat==="jeu"?{nom:"Colis "+String.fromCharCode(65+p.selection),cols,cases:echantillon}:null,
    options:[...p.formes.map((_,i)=>option("Colis "+String.fromCharCode(65+i),"piece",i,i===p.selection,p.cases.includes(i))),option("Pivoter ↻","tourner")],
    stats:[["Cale",p.cases.filter(v=>v>=0).length+"/"+p.cases.length],["Poses",p.coups]]
  };
}

