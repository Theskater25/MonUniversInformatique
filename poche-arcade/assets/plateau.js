"use strict";

function tuile(texte, ton, valeur = null, nom = "", detail = "", actif = false) {
  return {texte, ton, valeur, nom, detail, actif};
}
function option(texte, action, valeur = 0, selection = null, bloque = false) {
  return {texte, action, valeur, selection, bloque};
}
const tonsAtelier = ["bleu","corail","vert","prune","or","rose"];
const motifsAtelier = ["≈","◆","✳","●","☀","☾"];

(() => {
  let partie, niveau, graine;
  terrain.classList.add("atelier");
  terrain.style.setProperty("--jaquette", "url('../assets/" + fiche.image + ".png')");
  function element(tag, classe, contenu) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (contenu !== undefined) e.textContent = contenu;
    return e;
  }
  function jouer(action, valeur) {
    if (partie.etat !== "jeu") return;
    partie.jouer(action, valeur);
    dessiner();
  }
  function construireGrille(cols, cases, style, traits) {
    const grille = element("div", "atelier-grille " + (style || ""));
    grille.style.setProperty("--cols",cols);
    if (traits) {
      const ns = "http://www.w3.org/2000/svg";
      const lignes = document.createElementNS(ns,"svg");
      lignes.setAttribute("class","liaisons");
      lignes.setAttribute("viewBox","0 0 " + cols + " " + Math.ceil(cases.length/cols));
      lignes.setAttribute("preserveAspectRatio","none");
      lignes.setAttribute("aria-hidden","true");
      for (const [a,b,fait] of traits) {
        const ligne = document.createElementNS(ns,"line");
        for (const [id,i] of [[a,1],[b,2]]) {
          ligne.setAttribute("x"+i,id%cols+.5);
          ligne.setAttribute("y"+i,Math.floor(id/cols)+.5);
        }
        ligne.setAttribute("stroke",fait?"#fbd08a":"#8794a9");
        ligne.setAttribute("stroke-width",fait?".075":".036");
        lignes.append(ligne);
      }
      grille.append(lignes);
    }
    for (const item of cases) {
      const bouton = item.valeur !== null;
      const e = element(bouton?"button":"div","atelier-case");
      e.dataset.ton = item.ton;
      if (item.remplissage !== undefined) e.style.setProperty("--eau",item.remplissage+"%");
      e.classList.toggle("actif",item.actif);
      e.append(element("span","glyphe",item.texte));
      if (item.detail) e.append(element("small","",item.detail));
      if (item.nom) e.setAttribute("aria-label",item.nom);
      if (bouton) {
        e.dataset.cle = "case-" + item.valeur;
        e.disabled = partie.etat !== "jeu";
        e.onclick = () => jouer("case",item.valeur);
      }
      grille.append(e);
    }
    return grille;
  }
  function dessiner() {
    const cle = document.activeElement?.dataset.cle;
    const vue = presenter(partie,niveau);
    const morceaux = [element("div","titre-manche",NOMS[niveau])];
    if (vue.modele) {
      const modele = element("div","modele-atelier",vue.modele.nom);
      modele.append(construireGrille(vue.modele.cols,vue.modele.cases));
      morceaux.push(modele);
    }
    if (vue.legende) morceaux.push(element("p","legende-plateau",vue.legende));
    morceaux.push(construireGrille(vue.cols,vue.cases,vue.style,vue.traits));
    if (vue.journal?.length) {
      const liste = element("ol","journal-atelier");
      for (const ligne of vue.journal) liste.append(element("li","",ligne));
      morceaux.push(liste);
    }
    if (vue.options && partie.etat === "jeu") {
      const barre = element("div","plateau-choix");
      for (const item of vue.options) {
        const b = element("button","",item.texte);
        b.disabled = item.bloque;
        b.dataset.cle = item.action + "-" + item.valeur;
        if (item.selection !== null) b.setAttribute("aria-pressed",String(item.selection));
        b.onclick = () => jouer(item.action,item.valeur);
        barre.append(b);
      }
      morceaux.push(barre);
    }
    terrain.replaceChildren(...morceaux);
    statistiques([["Étape",(niveau+1)+"/"+NOMS.length],...vue.stats]);
    message.textContent = partie.message;
    actions.replaceChildren();
    if (partie.etat === "gagne") {
      record(fiche.id+"."+niveau,partie.coups,true);
      majRecord();
      son(720);
      const derniere = niveau+1 === NOMS.length;
      commande(derniere?"Repartir à la première étape":"Étape suivante",()=>ouvrir(derniere?0:niveau+1,true)).focus({preventScroll:true});
    }
    commande(partie.etat === "jeu"?"Recommencer":"Rejouer cette étape",()=>ouvrir(niveau,partie.etat!=="jeu"),partie.etat === "perdu");
    if (cle && partie.etat === "jeu") terrain.querySelector('[data-cle="'+cle+'"]:enabled')?.focus({preventScroll:true});
  }
  function ouvrir(i,nouvelle) {
    niveau = i;
    if (nouvelle) graine = Math.floor(Math.random()*233280);
    partie = new MoteurPlateau.Partie(niveau,graine);
    dessiner();
  }
  ouvrir(0,true);
})();

