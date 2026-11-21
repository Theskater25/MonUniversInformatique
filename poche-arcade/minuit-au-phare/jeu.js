"use strict";

(() => {
  let numero, veille, carte, toile, miroirs, annuler;
  const total = MinuitAuPhare.niveaux.length;

  function actualiser() {
    peindreCarte(toile, veille);
    statistiques([["Veille", (numero + 1) + "/" + total], ["Bouées", veille.allumees.length + "/" + veille.total], ["Pivots", veille.pivots.length]]);
    for (const bouton of miroirs.children) {
      const i = Number(bouton.dataset.case);
      const ligne = Math.floor(i / veille.largeur) + 1, colonne = i % veille.largeur + 1;
      const orientation = veille.cases[i] === "/" ? "montant vers la droite" : "descendant vers la droite";
      bouton.setAttribute("aria-label", "Miroir ligne " + ligne + ", colonne " + colonne + ", " + orientation);
      bouton.disabled = veille.issue === "port";
    }
    annuler.disabled = !veille.pivots.length;
    if (veille.issue === "port") {
      const coups = veille.pivots.length;
      record(fiche.id + "." + numero, coups, true);
      majRecord();
      carte.classList.add("carte-gagnee");
      const dernier = numero + 1 === total;
      message.textContent = (dernier ? "Les quatre passages sont sûrs ! " : "Le navire a trouvé le passage ! ") + coups + (coups > 1 ? " pivots." : " pivot.");
      son(820);
      actions.replaceChildren();
      commande(dernier ? "Refaire les quatre veilles" : "Veille suivante", () => ouvrir(dernier ? 0 : numero + 1)).focus({preventScroll:true});
      commande("Rejouer cette carte", () => ouvrir(numero), false);
    } else {
      const etats = {
        mer: "Le faisceau se perd en mer.",
        obstacle: "Le faisceau rencontre un obstacle.",
        incomplet: "Le navire est éclairé, mais il manque des bouées."
      };
      message.textContent = etats[veille.issue] + " Oriente les miroirs.";
    }
  }

  function ouvrir(indice) {
    numero = indice;
    veille = new MinuitAuPhare.Veille(numero);
    terrain.innerHTML = '<div class="nom-veille"></div><div class="carte-marine"><canvas role="img"></canvas><div class="miroirs" role="group" aria-label="Miroirs pivotants"></div></div>';
    terrain.querySelector(".nom-veille").textContent = veille.nom;
    carte = terrain.querySelector(".carte-marine");
    carte.style.setProperty("--largeur", veille.largeur);
    carte.style.setProperty("--hauteur", veille.hauteur);
    toile = carte.querySelector("canvas");
    toile.width = veille.largeur * 32;
    toile.height = veille.hauteur * 32;
    toile.setAttribute("aria-label", "Carte du passage " + veille.nom);
    miroirs = carte.querySelector(".miroirs");
    veille.cases.forEach((objet, i) => {
      if (objet !== "/" && objet !== "\\") return;
      const b = document.createElement("button");
      b.dataset.case = i;
      b.style.gridColumn = (i % veille.largeur + 1).toString();
      b.style.gridRow = (Math.floor(i / veille.largeur) + 1).toString();
      b.onclick = () => {
        if (veille.pivoter(i)) { son(470); actualiser(); }
      };
      miroirs.append(b);
    });
    actions.replaceChildren();
    annuler = commande("Annuler un pivot", () => { if (veille.annuler()) actualiser(); }, false);
    commande("Recommencer", () => ouvrir(numero), false);
    actualiser();
  }
  ouvrir(0);
})();

