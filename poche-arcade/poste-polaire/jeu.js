"use strict";

(() => {
  const taille = 24;
  const atlas = new Image();
  const directions = {
    ArrowUp:    {dx: 0, dy: -1, signe: "↑", nom: "Haut"},
    ArrowLeft:  {dx: -1, dy: 0, signe: "←", nom: "Gauche"},
    ArrowDown:  {dx: 0, dy: 1, signe: "↓", nom: "Bas"},
    ArrowRight: {dx: 1, dy: 0, signe: "→", nom: "Droite"}
  };
  let numero = 0;
  let tournee, toile, pinceau, annuler;
  let imageSuivante = null;
  let actif = false;
  let regardeAGauche = false;

  function dessiner(x, y, lettres) {
    function tuile(sprite, col, ligne) {
      pinceau.drawImage(atlas, sprite * taille, 0, taille, taille,
        Math.round(col * taille), Math.round(ligne * taille), taille, taille);
    }
    for (let ligne = 0; ligne < tournee.hauteur; ligne++) {
      for (let col = 0; col < tournee.largeur; col++) {
        const pos = ligne * tournee.largeur + col;
        tuile((ligne + col) % 2, col, ligne);
        if (tournee.carte[ligne][col] === "#") tuile(2, col, ligne);
        if (pos === tournee.bureau) tuile(4, col, ligne);
        if (lettres.includes(pos)) tuile(3, col, ligne);
      }
    }
    tuile(regardeAGauche ? 6 : 5, x, y);
  }

  function positionActuelle() {
    return [tournee.position % tournee.largeur, Math.floor(tournee.position / tournee.largeur)];
  }

  function afficherEtat() {
    const [x, y] = positionActuelle();
    const ramassees = tournee.total - tournee.lettres.length;
    dessiner(x, y, tournee.lettres);
    statistiques([["Tournée", (numero + 1) + "/3"], ["Courrier", ramassees + "/" + tournee.total], ["Glissades", tournee.coups]]);
    toile.setAttribute("aria-label", "Banquise. Facteur en ligne " + (y + 1) + ", colonne " + (x + 1) + ". " + ramassees + " lettre(s) sur " + tournee.total + ".");
    annuler.disabled = tournee.coups === 0;
  }

  function terminer() {
    actif = false;
    record(fiche.id + "." + numero, tournee.coups, true);
    const dernier = numero === PostePolaire.niveaux.length - 1;
    const bilan = tournee.coups + " glissades. " + (tournee.coups === tournee.objectif
      ? "C’est le chemin le plus court !" : "Le trajet le plus court en demande " + tournee.objectif + ".");
    fin(dernier ? "Tout le courrier est arrivé !" : "Courrier livré !", bilan);
    actions.replaceChildren();
    commande(dernier ? "Nouvelle tournée" : "Tournée suivante", () => ouvrir(dernier ? 0 : numero + 1));
    commande("Rejouer ce trajet", () => ouvrir(numero), false);
  }

  function glisser(dx, dy) {
    if (!actif || imageSuivante !== null) return;
    const [x, y] = positionActuelle();
    const avant = tournee.lettres.slice();
    if (!tournee.glisser(dx, dy)) {
      message.textContent = "Le passage est bloqué dans cette direction.";
      return;
    }
    if (dx) regardeAGauche = dx < 0;
    const [arriveeX, arriveeY] = positionActuelle();
    const distance = Math.abs(arriveeX - x) + Math.abs(arriveeY - y);
    const duree = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 55 * distance + 45;
    const debut = performance.now();

    function image(instant) {
      const t = duree ? Math.min(1, (instant - debut) / duree) : 1;
      const parcouru = distance * (1 - (1 - t) ** 2);
      const lettresVisibles = avant.filter(pos => {
        if (tournee.lettres.includes(pos)) return true;
        const ecart = Math.abs(pos % tournee.largeur - x) + Math.abs(Math.floor(pos / tournee.largeur) - y);
        return parcouru + 0.2 < ecart;
      });
      dessiner(x + dx * parcouru, y + dy * parcouru, lettresVisibles);
      if (t < 1) {
        imageSuivante = requestAnimationFrame(image);
        return;
      }
      imageSuivante = null;
      afficherEtat();
      if (tournee.distribue()) {
        terminer();
        return;
      }
      if (avant.length > tournee.lettres.length) {
        son(670);
        message.textContent = tournee.lettres.length ? "Courrier ramassé !" : "Sacoche pleine. Arrête-toi au bureau orange.";
      } else {
        son(365);
        message.textContent = tournee.lettres.length ? "Continue jusqu’à la prochaine enveloppe." : "Rejoins le bureau orange.";
      }
    }
    imageSuivante = requestAnimationFrame(image);
  }

  function ouvrir(niveau) {
    cancelAnimationFrame(imageSuivante);
    imageSuivante = null;
    actif = true;
    numero = niveau;
    tournee = new PostePolaire.Tournee(niveau);
    regardeAGauche = false;
    terrain.innerHTML = '<div class="tournee-titre"></div><canvas class="banquise" role="img"></canvas><div class="direction-pad" role="group" aria-label="Glisser"></div>';
    terrain.querySelector(".tournee-titre").textContent = tournee.nom;
    toile = terrain.querySelector("canvas");
    toile.width = tournee.largeur * taille;
    toile.height = tournee.hauteur * taille;
    pinceau = toile.getContext("2d");
    pinceau.imageSmoothingEnabled = false;

    const pad = terrain.querySelector(".direction-pad");
    for (const {dx, dy, signe, nom} of Object.values(directions)) {
      const b = document.createElement("button");
      b.textContent = signe;
      b.setAttribute("aria-label", "Glisser vers le " + nom.toLowerCase());
      if (dy === 0) b.setAttribute("aria-label", "Glisser à " + nom.toLowerCase());
      b.onclick = () => glisser(dx, dy);
      pad.append(b);
    }
    let toucher = null;
    toile.onpointerdown = e => {
      if (!e.isPrimary || e.button !== 0) return;
      toile.setPointerCapture(e.pointerId);
      toucher = [e.clientX, e.clientY];
    };
    toile.onpointercancel = () => { toucher = null; };
    toile.onpointerup = e => {
      if (!e.isPrimary || !toucher) return;
      const dx = e.clientX - toucher[0], dy = e.clientY - toucher[1];
      toucher = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 14) return;
      if (Math.abs(dx) > Math.abs(dy)) glisser(Math.sign(dx), 0);
      else glisser(0, Math.sign(dy));
    };

    actions.replaceChildren();
    annuler = commande("Annuler un coup", () => {
      if (!tournee.annuler()) return;
      cancelAnimationFrame(imageSuivante);
      imageSuivante = null;
      afficherEtat();
      message.textContent = "Dernière glissade annulée.";
    }, false);
    commande("Recommencer", () => ouvrir(numero), false);
    message.textContent = "Ramasse le courrier, puis arrête-toi au bureau orange.";
    afficherEtat();
  }

  document.addEventListener("keydown", e => {
    const direction = directions[e.key];
    if (!actif || !direction || e.repeat || palmares.open || e.ctrlKey || e.altKey || e.metaKey) return;
    e.preventDefault();
    glisser(direction.dx, direction.dy);
  });

  atlas.onload = () => ouvrir(0);
  atlas.onerror = () => { message.textContent = "Impossible de charger les tuiles de la banquise."; };
  atlas.src = "tuiles.png";
})();

