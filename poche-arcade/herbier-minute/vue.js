"use strict";
const NOMS = ["Page de printemps", "Sous-bois", "Collection complète"];
const FEUILLES = [["☘","Trèfle"],["❀","Anémone"],["✹","Chardon"],["✿","Violette"],["❧","Fougère"],["✾","Aster"],["❁","Rose"],["⚘","Prêle"]];
function presenter(p) {
  return {
    cols:p.largeur,style:"herbier",
    cases:p.cartes.map((v,i)=>{
      const fixe=p.trouvees.includes(i), visible=fixe||p.ouvertes.includes(i);
      return tuile(visible?FEUILLES[v][0]:"❦",fixe?"vert":visible?"papier":"nuit",fixe?null:i,
        "Carte "+(i+1)+(visible?" · "+FEUILLES[v][1]:" retournée"),visible?FEUILLES[v][1]:"",fixe);
    }),
    stats:[["Paires",p.trouvees.length/2+"/"+p.cartes.length/2],["Essais",p.coups]]
  };
}

