"use strict";

const ecran = document.createElement("canvas");
ecran.width = 320;
ecran.height = 192;
ecran.tabIndex = 0;
ecran.setAttribute("aria-label", "Terrain de " + fiche.nom + ". Commandes sous le jeu.");
const contexte = ecran.getContext("2d");
const decor = document.createElement("canvas");
decor.width = ecran.width;
decor.height = ecran.height;
const etiquette = document.createElement("strong");
etiquette.className = "etat-2d";
etiquette.hidden = true;
terrain.classList.add("terrain-2d");
terrain.replaceChildren(ecran, etiquette);

const fleches = ["←", "→", "↑", "↓", "●"];
const nomsTouches = ["Gauche", "Droite", "Haut", "Bas", fiche.id === "atelier-vitrail" ? "Lancer" : "Tirer"];
const clavier = {ArrowLeft:0, q:0, a:0, ArrowRight:1, d:1, ArrowUp:2, z:2, w:2, ArrowDown:3, s:3, " ":4};
const actives = new Map();
let appuis = Array(5).fill(false);
let partie, phase, instant, retard, animation, mesuresAffichees;
const pas = 1000 / 60;

function formes(ctx, liste) {
  for (const [type, x, y, w, h, couleur] of liste) {
    ctx.fillStyle = couleur;
    const px = Math.round(x), py = Math.round(y);
    if (type === "l") {
      ctx.strokeStyle = couleur;
      ctx.beginPath();
      ctx.moveTo(px + .5, py + .5);
      ctx.lineTo(Math.round(w) + .5, Math.round(h) + .5);
      ctx.stroke();
    } else if (type === "e") {
      ctx.beginPath();
      ctx.ellipse(px + w / 2, py + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(px, py, w, h);
    }
  }
}

function afficher() {
  contexte.drawImage(decor, 0, 0);
  formes(contexte, partie.dessin());
  const mesures = partie.mesures(), signature = JSON.stringify(mesures);
  if (signature !== mesuresAffichees) {
    statistiques(mesures);
    mesuresAffichees = signature;
  }
  const texte = partie.service === true && !partie.etat ? "Bille sur la barre. Appuie sur Espace ou sur ● pour la lancer." : partie.message;
  if (message.textContent !== texte) message.textContent = texte;
}

function relacher() {
  actives.clear();
  appuis.fill(false);
  for (const b of croix.children) b.classList.remove("enfoncee");
}

function changerPhase(nouvellePhase) {
  cancelAnimationFrame(animation);
  phase = nouvellePhase;
  relacher();
  etiquette.hidden = phase === "jeu" || phase === "pret";
  etiquette.textContent = phase === "pause" ? "En pause" : partie.etat === 1 ? "Victoire !" : "Partie terminée";
  interrupteurJeu.textContent = {pret:"Jouer", jeu:"Pause", pause:"Reprendre", fin:"Rejouer"}[phase];
  recommencer.hidden = phase === "pret" || phase === "fin";
  if (phase === "jeu") {
    instant = null;
    retard = 0;
    ecran.focus({preventScroll:true});
    animation = requestAnimationFrame(imageSuivante);
  }
}

function imageSuivante(maintenant) {
  if (phase !== "jeu") return;
  if (instant !== null) retard += Math.min(100, maintenant - instant);
  instant = maintenant;
  while (retard >= pas && !partie.etat) {
    const touches = appuis.slice();
    for (const i of actives.values()) touches[i] = true;
    partie.avancer(touches, appuis);
    appuis.fill(false);
    retard -= pas;
  }
  afficher();
  if (partie.etat !== 0) {
    if (partie.points > 0) record(fiche.id, partie.points);
    majRecord();
    son(partie.etat === 1 ? 740 : 260);
    changerPhase("fin");
  } else {
    animation = requestAnimationFrame(imageSuivante);
  }
}

function nouvelle(lancer) {
  partie = new MoteurClassique.Partie(Math.floor(Math.random() * 233280));
  const fond = decor.getContext("2d");
  fond.fillStyle = partie.fond;
  fond.fillRect(0, 0, 320, 192);
  formes(fond, partie.decor);
  mesuresAffichees = "";
  afficher();
  changerPhase(lancer ? "jeu" : "pret");
}

function lecture() {
  if (phase === "fin") nouvelle(true);
  else changerPhase(phase === "jeu" ? "pause" : "jeu");
}

function presser(source, i) {
  if (phase === "pret") changerPhase("jeu");
  if (phase !== "jeu" || actives.has(source)) return;
  actives.set(source, i);
  appuis[i] = true;
  croix.querySelector('[data-touche="' + i + '"]')?.classList.add("enfoncee");
}

function lever(source) {
  const i = actives.get(source);
  actives.delete(source);
  if (i !== undefined && ![...actives.values()].includes(i)) {
    croix.querySelector('[data-touche="' + i + '"]')?.classList.remove("enfoncee");
  }
}

const croix = document.createElement("div");
croix.className = "manette-2d";
const interrupteurJeu = commande("Jouer", lecture);
const recommencer = commande("Recommencer", () => nouvelle(true), false);
actions.before(croix);
nouvelle(false);
for (const i of partie.boutons) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "touche-2d";
  b.dataset.touche = i;
  b.textContent = fleches[i];
  b.title = (partie.libelles || nomsTouches)[i];
  b.setAttribute("aria-label", b.title);
  b.onpointerdown = e => {
    if (e.button !== 0) return;
    e.preventDefault();
    b.setPointerCapture(e.pointerId);
    presser("p" + e.pointerId, i);
  };
  b.onpointerup = b.onpointercancel = b.onlostpointercapture = e => lever("p" + e.pointerId);
  b.onclick = e => {
    if (e.detail === 0) { presser("activation", i); lever("activation"); }
  };
  croix.append(b);
}
document.addEventListener("keydown", e => {
  if (palmares.open || e.ctrlKey || e.metaKey || e.altKey) return;
  const cle = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if ((cle === "Escape" || cle === "p") && (phase === "jeu" || phase === "pause")) {
    if (!e.repeat) lecture();
    e.preventDefault();
    return;
  }
  if (e.target.closest("button, a, input, select")) return;
  const i = clavier[cle];
  if (i === undefined || !(partie.boutons.includes(i) || partie.raccourcis?.includes(i)) || (phase !== "jeu" && phase !== "pret")) return;
  e.preventDefault();
  if (!e.repeat) presser("k" + (e.code || cle), i);
});
document.addEventListener("keyup", e => lever("k" + (e.code || e.key)));
function suspendre() { if (phase === "jeu") changerPhase("pause"); }
window.addEventListener("blur", suspendre);
document.addEventListener("visibilitychange", () => { if (document.hidden) suspendre(); });
document.querySelector(".record-link").addEventListener("click", suspendre);
