"use strict";

(async () => {
  let radio;
  try {
    const octets = Uint8Array.from(atob(binaireRadio), c => c.charCodeAt(0));
    radio = (await WebAssembly.instantiate(octets)).instance.exports;
  } catch {
    message.textContent = "Le poste radio requiert un navigateur compatible WebAssembly.";
    return;
  }
  const modes = {attente: 0, direct: 1, manque: 2, relais: 3, coupure: 4, final: 5};
  const stations = ["88,4 · Radio des toits", "97,2 · Canal corail", "106,8 · Pleine onde"];
  terrain.innerHTML = '<div class="poste-radio"><div class="station-radio"></div><div class="fenetre-radio"><canvas class="oscillo" width="240" height="158" role="img" aria-label="Cadran du signal et position de l’antenne"></canvas><div class="etat-radio"></div></div><label class="reglage">Antenne<input type="range" aria-label="Position de l’antenne" step="0.5"></label></div>';
  const toile = terrain.querySelector("canvas");
  const etiquette = terrain.querySelector(".etat-radio");
  const curseur = terrain.querySelector("input");
  const peindre = ecranRadio(toile);
  const touches = new Set(), trace = [];
  let direct = false, animation, precedent, cumul = 0, flash = 0;

  function dessiner() {
    peindre(radio, trace, flash);
    curseur.value = radio.antenne();
  }

  function afficherScores() {
    statistiques([["Retours", radio.retours() + "/" + radio.objectif()], ["Vies", radio.vies()], ["Score", radio.score()]]);
  }

  function stopper() {
    direct = false;
    cancelAnimationFrame(animation);
    touches.clear();
    curseur.disabled = true;
  }

  function bilan() {
    stopper();
    afficherScores();
    dessiner();
    etiquette.hidden = false;
    actions.replaceChildren();
    switch (radio.mode()) {
      case modes.manque:
        etiquette.textContent = "Signal perdu";
        message.textContent = "Le relais conserve tes retours. Il reste " + radio.vies() + (radio.vies() === 1 ? " vie." : " vies.");
        commande("Réémettre", lancer);
        break;
      case modes.relais:
        etiquette.textContent = "Station raccordée !";
        message.textContent = "La fréquence suivante a une antenne plus courte et un signal plus rapide.";
        commande("Station suivante", () => { radio.station_suivante(); preparerStation(); });
        break;
      case modes.coupure:
      case modes.final:
        etiquette.textContent = radio.mode() === modes.final ? "Réseau rétabli !" : "Fin d’émission";
        message.textContent = "Score de l’émission · " + radio.score() + " points.";
        record(fiche.id, radio.score());
        majRecord();
        commande("Nouvelle émission", recommencer);
        break;
    }
  }

  function boucle(instant) {
    if (!direct) return;
    cumul += Math.min((instant - precedent) / 1000, .12);
    precedent = instant;
    const axe = Number(touches.has("ArrowRight")) - Number(touches.has("ArrowLeft"));
    while (cumul >= 1 / 60) {
      cumul -= 1 / 60;
      const avant = radio.retours();
      trace.push([radio.signal_x(), radio.signal_y()]);
      if (trace.length > 9) trace.shift();
      radio.avancer(axe);
      flash = Math.max(0, flash - 1);
      if (radio.retours() !== avant) {
        flash = 12;
        const precis = radio.bien_accorde();
        son(precis ? 740 : 510);
        message.textContent = precis ? "Accord parfait ! +160 points." : "Signal reçu ! +100 points.";
        record(fiche.id, radio.score());
        majRecord();
        afficherScores();
      }
      if (radio.mode() !== modes.direct) { bilan(); return; }
    }
    dessiner();
    animation = requestAnimationFrame(boucle);
  }

  function lancer() {
    if (direct) return;
    if (radio.mode() !== modes.direct) {
      trace.length = 0;
      radio.emettre();
    }
    if (radio.mode() !== modes.direct) return;
    direct = true;
    curseur.disabled = false;
    etiquette.hidden = true;
    actions.replaceChildren();
    commande("Pause", pause, false);
    message.textContent = "Déplace l’antenne sous le signal. Vise le repère doré pour un accord parfait.";
    precedent = performance.now();
    cumul = 0;
    animation = requestAnimationFrame(boucle);
  }

  function pause() {
    if (!direct) return;
    stopper();
    etiquette.textContent = "Émission en pause";
    etiquette.hidden = false;
    message.textContent = "Le signal reprendra au même endroit.";
    actions.replaceChildren();
    commande("Reprendre", lancer);
    commande("Recommencer", recommencer, false);
  }

  function preparerStation() {
    stopper();
    trace.length = 0;
    flash = 0;
    terrain.querySelector(".station-radio").textContent = stations[radio.station()] + " FM";
    const marge = 7 + radio.demi_antenne();
    curseur.min = marge;
    curseur.max = 240 - marge;
    etiquette.textContent = "Prêt à émettre";
    etiquette.hidden = false;
    afficherScores();
    dessiner();
    message.textContent = "Renvoie le signal " + radio.objectif() + " fois pour raccorder cette station.";
    actions.replaceChildren();
    commande("Émettre le signal", lancer);
  }

  function recommencer() { radio.initialiser(); preparerStation(); }

  function viser(e) {
    if (!direct) return;
    const r = toile.getBoundingClientRect();
    radio.viser((e.clientX - r.left) * toile.width / r.width);
    dessiner();
  }
  toile.onpointerdown = e => {
    if (!direct || !e.isPrimary || e.button !== 0) return;
    toile.setPointerCapture(e.pointerId);
    viser(e);
  };
  toile.onpointermove = e => {
    if (e.isPrimary && (e.pointerType === "mouse" || toile.hasPointerCapture(e.pointerId))) viser(e);
  };
  curseur.oninput = () => { if (direct) { radio.viser(Number(curseur.value)); dessiner(); } };
  document.addEventListener("keydown", e => {
    if (!direct || palmares.open || e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key === "Escape") { pause(); return; }
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    touches.add(e.key);
  });
  document.addEventListener("keyup", e => touches.delete(e.key));
  document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); });
  window.addEventListener("blur", pause);
  window.addEventListener("pagehide", pause);
  document.querySelector(".record-link").addEventListener("click", pause);
  recommencer();
})();

