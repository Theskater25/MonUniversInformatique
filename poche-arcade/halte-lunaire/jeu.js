"use strict";

(async () => {
  let moteur;
  try {
    const octets = Uint8Array.from(atob(binaireLunaire), c => c.charCodeAt(0));
    const {instance} = await WebAssembly.instantiate(octets);
    moteur = instance.exports;
  } catch {
    message.textContent = "Le module de vol requiert un navigateur compatible WebAssembly.";
    return;
  }

  const sites = ["Plaine d’Ambre", "Port d’Atlas", "Baie du Croissant"];
  const manettes = {
    gauche: {signe: "←", nom: "Gauche", touche: "ArrowLeft"},
    poussee: {signe: "↑", nom: "Poussée", touche: "ArrowUp"},
    droite: {signe: "→", nom: "Droite", touche: "ArrowRight"}
  };
  const maintiens = new Map();
  const boutons = {};
  const instruments = {};
  const pas = 1 / 60;
  let numero = 0, phase = "pret", trame = 0, dernierInstant = 0, cumul = 0, animation;
  let dessiner, rapport, toile;

  function lireManettes() {
    const etat = {gauche: false, poussee: false, droite: false};
    for (const valeur of maintiens.values()) etat[valeur] = true;
    return etat;
  }

  function actualiserManettes() {
    const etat = lireManettes();
    for (const [cle, b] of Object.entries(boutons)) {
      b.disabled = phase !== "vol";
      b.classList.toggle("actif", etat[cle]);
    }
  }

  function actualiserInstruments() {
    instruments.site.textContent = (numero + 1) + "/" + sites.length;
    instruments.carburant.textContent = Math.ceil(moteur.reserve()) + " %";
    for (const [cle, vitesse, limite] of [
      ["derive", moteur.vitesse_x(), moteur.seuil_x()],
      ["descente", moteur.vitesse_y(), moteur.seuil_y()]
    ]) {
      const mesure = cle === "derive" ? Math.abs(vitesse) : Math.max(0, vitesse);
      instruments[cle].textContent = Math.ceil(mesure) + " / " + limite;
      instruments[cle].classList.toggle("hors-seuil", mesure > limite);
    }
  }

  function afficherRapport(texte) {
    rapport.hidden = !texte;
    rapport.textContent = texte;
  }

  function stopper(nouvellePhase) {
    phase = nouvellePhase;
    cancelAnimationFrame(animation);
    maintiens.clear();
    actualiserManettes();
    actualiserInstruments();
    dessiner(lireManettes(), trame);
  }

  function terminer() {
    stopper("fini");
    const resultat = moteur.issue(), reussi = resultat === 1;
    const causes = ["", "", "Hors du quai", "Contact trop rapide", "Sortie de la zone de vol"];
    afficherRapport(reussi ? "Contact confirmé !" : causes[resultat]);
    if (reussi) {
      const restant = Math.floor(moteur.reserve());
      record(fiche.id + "." + numero, restant, false);
      majRecord();
      message.textContent = "Module posé à " + sites[numero] + " avec " + restant + " % de carburant.";
      son(740);
    } else {
      message.textContent = resultat === 3 ? "Freine par petites poussées. Au contact, les deux vitesses doivent être sous leurs limites."
        : resultat === 2 ? "Les deux patins doivent toucher la bande éclairée." : "Garde le module à l’intérieur de l’écran.";
      son(175);
    }
    actions.replaceChildren();
    if (reussi && numero + 1 < sites.length) commande("Mission suivante", () => preparer(numero + 1));
    else if (reussi) commande("Repartir en mission", () => preparer(0));
    commande("Réessayer ce vol", () => preparer(numero), !reussi);
  }

  function boucler(instant) {
    if (phase !== "vol") return;
    cumul += Math.min((instant - dernierInstant) / 1000, .12);
    dernierInstant = instant;
    const entrees = lireManettes();
    while (cumul >= pas) {
      moteur.avancer(Number(entrees.gauche), Number(entrees.poussee), Number(entrees.droite));
      cumul -= pas;
      trame++;
      if (moteur.issue() !== 0) { terminer(); return; }
    }
    dessiner(entrees, trame);
    if (trame % 4 < 2) actualiserInstruments();
    animation = requestAnimationFrame(boucler);
  }

  function lancer() {
    if (phase !== "pret" && phase !== "pause") return;
    phase = "vol";
    dernierInstant = performance.now();
    cumul = 0;
    actualiserManettes();
    afficherRapport("");
    actions.replaceChildren();
    commande("Pause", pause, false);
    message.textContent = "Vise la bande dorée. Maintiens ↑ pour ralentir ta descente.";
    animation = requestAnimationFrame(boucler);
  }

  function pause() {
    if (phase !== "vol") return;
    stopper("pause");
    afficherRapport("Vol en pause");
    message.textContent = "Le module reprendra sa trajectoire au même endroit.";
    actions.replaceChildren();
    commande("Reprendre", lancer);
    commande("Recommencer", () => preparer(numero), false);
  }

  function preparer(indice) {
    cancelAnimationFrame(animation);
    maintiens.clear();
    numero = indice;
    phase = "pret";
    trame = 0;
    moteur.commencer(numero);
    hud.classList.add("instruments");
    hud.replaceChildren();
    for (const [cle, nom] of [["site","Mission"],["carburant","Réserve"],["derive","Dérive · m/s"],["descente","Descente · m/s"]]) {
      const groupe = document.createElement("span");
      instruments[cle] = document.createElement("b");
      groupe.append(nom, instruments[cle]);
      hud.append(groupe);
    }
    terrain.innerHTML = '<div class="fenetre-vol"><canvas class="vue-lunaire" width="320" height="180" role="img"></canvas><div class="rapport-vol"></div></div><div class="pilotage" role="group" aria-label="Propulseurs"></div>';
    toile = terrain.querySelector("canvas");
    toile.setAttribute("aria-label", "Module lunaire et quai de " + sites[numero]);
    rapport = terrain.querySelector(".rapport-vol");
    for (const [cle, info] of Object.entries(manettes)) {
      const b = document.createElement("button");
      const signe = document.createElement("span");
      signe.setAttribute("aria-hidden", "true");
      signe.textContent = info.signe;
      b.append(signe, info.nom);
      b.dataset.manette = cle;
      b.setAttribute("aria-keyshortcuts", info.touche);
      b.onpointerdown = e => {
        if (phase !== "vol" || e.button !== 0) return;
        e.preventDefault();
        b.setPointerCapture(e.pointerId);
        maintiens.set(e.pointerId, cle);
        actualiserManettes();
      };
      b.onpointerup = b.onpointercancel = b.onlostpointercapture = e => {
        maintiens.delete(e.pointerId);
        actualiserManettes();
      };
      b.oncontextmenu = e => e.preventDefault();
      terrain.querySelector(".pilotage").append(b);
      boutons[cle] = b;
    }
    dessiner = vueDeLaLune(toile, moteur, numero);
    dessiner(lireManettes(), trame);
    afficherRapport(sites[numero]);
    actualiserManettes();
    actualiserInstruments();
    actions.replaceChildren();
    commande("Démarrer le vol", lancer);
    message.textContent = "Pose le module entre les feux du quai. Les instruments indiquent vitesse / limite.";
  }

  document.addEventListener("keydown", e => {
    if (phase !== "vol" || palmares.open || e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key === "Escape") { pause(); return; }
    const cle = (e.key === "Enter" || e.key === " ") ? e.target.dataset?.manette
      : Object.keys(manettes).find(k => manettes[k].touche === e.key);
    if (!cle) return;
    e.preventDefault();
    maintiens.set(e.key, cle);
    actualiserManettes();
  });
  document.addEventListener("keyup", e => {
    if (maintiens.delete(e.key)) { e.preventDefault(); actualiserManettes(); }
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); });
  window.addEventListener("blur", pause);
  window.addEventListener("pagehide", pause);
  document.querySelector(".record-link").addEventListener("click", pause);
  preparer(0);
})();

