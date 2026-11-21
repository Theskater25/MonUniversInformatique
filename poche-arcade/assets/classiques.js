"use strict";

const identifiant = fiche.id;
const lettres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const signes = ["Pierre", "Feuille", "Ciseaux"];
const mains = ["✊", "✋", "✌"];
let partie, mode = 0, fanion = false;
terrain.classList.add("classique");

function element(type, classe, texte) {
  const el = document.createElement(type);
  if (classe) el.className = classe;
  if (texte !== undefined) el.textContent = texte;
  return el;
}

function bouton(texte, fonction, cle, classe = "choix") {
  const el = element("button", classe, texte);
  el.type = "button";
  el.dataset.cle = cle;
  el.onclick = fonction;
  return el;
}

function agir(fonction) {
  const avant = partie.etat;
  fonction();
  dessiner();
  if (avant === 0 && partie.etat !== 0) {
    if (partie.etat === 1 && mode === 0) record(identifiant, partie.points);
    majRecord();
    son(partie.etat === 1 ? 740 : 260);
  }
}

function jouer(valeur) {
  agir(() => partie.jouer(valeur));
}

function ligneBoutons() {
  return element("div", "choix-rangee");
}

function prix() {
  const intervalle = element("strong", "prix-intervalle", partie.etat ? String(partie.secret) : partie.bas + " – " + partie.haut);
  terrain.append(intervalle);
  if (partie.etat === 0) {
    const form = element("form", "prix-form");
    const saisie = element("input");
    saisie.type = "number";
    saisie.required = true;
    saisie.step = "1";
    saisie.min = partie.bas;
    saisie.max = partie.haut;
    saisie.inputMode = "numeric";
    saisie.autocomplete = "off";
    saisie.dataset.cle = "prix";
    saisie.setAttribute("aria-label", "Ton prix entre " + partie.bas + " et " + partie.haut);
    saisie.placeholder = "Ton prix";
    const valider = element("button", "action", "Proposer");
    form.onsubmit = e => { e.preventDefault(); jouer(saisie.valueAsNumber); terrain.querySelector("input")?.focus({preventScroll:true}); };
    form.append(saisie, valider);
    terrain.append(form);
  }
  if (partie.essais.length) terrain.append(element("p", "historique", "Tes prix · " + partie.essais.join("  ·  ")));
}

function duel() {
  const table = element("div", "table-duel");
  for (const [qui, signe] of [["Toi", partie.dernier], ["Automate", partie.adverse]]) {
    const carte = element("div", "main-duel");
    const main = element("b", "", signe < 0 ? "?" : mains[signe]);
    main.setAttribute("aria-hidden", "true");
    carte.append(element("small", "", qui), main, element("span", "", signe < 0 ? "À jouer" : signes[signe]));
    table.append(carte);
  }
  terrain.append(table);
  const ligne = ligneBoutons();
  signes.forEach((nom, i) => {
    const b = bouton(nom, () => jouer(i), "signe-" + i);
    b.disabled = partie.etat !== 0;
    ligne.append(b);
  });
  terrain.append(ligne);
}

function imprimerie() {
  const tirage = element("div", "tirage");
  for (const c of partie.masque()) tirage.append(element("span", "caractere", c === "_" ? "·" : c));
  tirage.setAttribute("aria-label", partie.masque().map(c => c === "_" ? "lettre cachée" : c).join(" "));
  terrain.append(tirage);
  const clavier = element("div", "clavier-lettres");
  for (const rangee of ["AZERTYUIOP", "QSDFGHJKLM", "WXCVBN"]) {
    const ligne = element("div");
    for (const c of rangee) {
      const touche = bouton(c, () => jouer(c), "lettre-" + c, "touche-lettre");
      touche.disabled = partie.etat !== 0 || partie.lettres.includes(c);
      ligne.append(touche);
    }
    clavier.append(ligne);
  }
  terrain.append(clavier);
}

function reserves() {
  const boite = element("div", "boite-allumettes");
  boite.setAttribute("aria-label", partie.reste + " allumettes restantes");
  for (let i = 0; i < partie.reste; i++) boite.append(element("i", "allumette"));
  terrain.append(boite);
  const ligne = ligneBoutons();
  for (const n of [1, 2, 3]) {
    const b = bouton("Prendre " + n, () => jouer(n), "prendre-" + n);
    b.disabled = n > partie.reste || partie.etat !== 0;
    ligne.append(b);
  }
  terrain.append(ligne);
}

function coord(i, colonnes) {
  return String.fromCharCode(65 + Math.floor(i / colonnes)) + (i % colonnes + 1);
}

// Une seule tabulation par plateau. Les flèches parcourent ses cases.
function navigationGrille(zone, colonnes) {
  const cases = [...zone.querySelectorAll("button[data-cle]")];
  if (!cases.length) return;
  cases.forEach((b, i) => {
    b.tabIndex = i === 0 ? 0 : -1;
    b.onfocus = () => { cases.forEach(c => { c.tabIndex = c === b ? 0 : -1; }); };
    b.onkeydown = e => {
      const pas = { ArrowLeft:-1, ArrowRight:1, ArrowUp:-colonnes, ArrowDown:colonnes }[e.key];
      if (pas === undefined) return;
      e.preventDefault();
      const position = i + pas;
      if (position >= 0 && position < cases.length) cases[position].focus();
    };
  });
}

function ardoise() {
  const grille = element("div", "ardoise");
  partie.plateau.forEach((pion, i) => {
    const texte = ["", "×", "○"][pion];
    const b = bouton(texte, () => jouer(i), "ardoise-" + i, "case-ardoise pion-" + pion);
    b.classList.toggle("alignee", partie.ligne.includes(i));
    b.setAttribute("aria-label", coord(i, 3) + " · " + (["Vide", "Croix", "Rond"][pion]));
    b.setAttribute("aria-disabled", String(Boolean(pion || partie.etat)));
    grille.append(b);
  });
  navigationGrille(grille, 3);
  terrain.append(grille);
}

function chevalet() {
  const cadre = element("div", "chevalet");
  for (let col = 0; col < 7; col++) {
    const b = bouton("", () => jouer(col), "col-" + col, "colonne");
    const pos = partie.arrivee(col);
    const contenu = [];
    b.append(element("span", "numero-colonne", String(col + 1)));
    for (let y = 0; y < 6; y++) {
      const i = y * 7 + col, pion = partie.plateau[i];
      contenu.push(["vide", "corail", "turquoise"][pion]);
      const jeton = element("span", "jeton pion-" + pion, ["", "●", "◆"][pion]);
      jeton.classList.toggle("alignee", partie.ligne.includes(i));
      b.append(jeton);
    }
    b.setAttribute("aria-label", "Colonne " + (col + 1) + " · " + contenu.join(", "));
    b.setAttribute("aria-disabled", String(Boolean(partie.etat || pos < 0)));
    cadre.append(b);
  }
  navigationGrille(cadre, 7);
  terrain.append(cadre);
}

function quadrillage(n, nom, dessinerCase) {
  const grille = element("div", "quadrillage");
  grille.style.setProperty("--cote", n);
  grille.setAttribute("role", "group");
  grille.setAttribute("aria-label", nom);
  grille.append(element("span"));
  for (let col = 0; col < n; col++) grille.append(element("span", "repere", String(col + 1)));
  for (let y = 0; y < n; y++) {
    grille.append(element("span", "repere", String.fromCharCode(65 + y)));
    for (let x = 0; x < n; x++) grille.append(dessinerCase(y * n + x));
  }
  navigationGrille(grille, n);
  return grille;
}

function bassin(camp) {
  const titre = camp === 0 ? "Ton bassin" : "Bassin adverse";
  const zone = element("div", "bassin");
  zone.append(element("strong", "titre-bassin", titre));
  const actif = partie.etat === 0 && (camp === 0 ? partie.placement : !partie.placement);
  const grille = quadrillage(7, titre, i => {
    const bateau = partie.flottes[camp].some(b => b.includes(i));
    const visible = bateau && (camp === 0 || partie.etat !== 0);
    const tir = partie.tirs[camp].includes(i);
    const touche = tir && bateau;
    const symbole = touche ? "×" : tir ? "·" : visible ? "▰" : "";
    const style = "mer " + (touche ? "impact" : tir ? "ecume" : visible ? "navire" : "");
    const c = actif ? bouton(symbole, () => agir(() => camp === 0 ? partie.placer(i) : partie.jouer(i)), "bassin-" + camp + "-" + i, style)
                    : element("span", style, symbole);
    const info = touche ? partie.impact(camp,i) : tir ? "à l’eau" : visible ? "bateau" : "eau";
    c.setAttribute("aria-label", coord(i, 7) + " · " + info);
    return c;
  });
  zone.append(grille);
  return zone;
}

function flottille() {
  if (partie.placement) {
    const ligne = ligneBoutons();
    ligne.append(bouton("Pivoter " + (partie.vertical ? "↓" : "→"), () => agir(() => partie.pivoter()), "rotation"),
                 bouton("Placement automatique", () => agir(() => partie.repartir()), "auto"));
    terrain.append(ligne);
  }
  const bassins = element("div", partie.placement ? "bassins placement" : "bassins");
  bassins.append(bassin(0));
  if (!partie.placement) bassins.append(bassin(1));
  terrain.append(bassins);
}

function demineur() {
  const outil = bouton(fanion ? "⚑ Fanion" : "◇ Ouvrir", () => { fanion = !fanion; dessiner(); }, "outil", "choix outil");
  outil.setAttribute("aria-label", "Utiliser le fanion");
  outil.setAttribute("aria-pressed", String(fanion));
  outil.disabled = partie.etat !== 0;
  terrain.append(outil);
  const grille = quadrillage(8, "Terrain à déminer", i => {
    const mine = partie.etat !== 0 && partie.mines.includes(i);
    const drapeau = partie.drapeaux[i], ouvert = partie.ouvertes[i];
    const symbole = mine ? "✸" : drapeau ? "⚑" : ouvert ? (partie.nombres[i] || "") : "";
    const b = bouton(symbole, () => agir(() => fanion ? partie.baliser(i) : partie.jouer(i)), "sol-" + i, "sol");
    b.classList.toggle("ouvert", ouvert);
    b.classList.toggle("mine", mine);
    b.classList.toggle("fanion", drapeau && !mine);
    if (ouvert) b.dataset.nombre = partie.nombres[i];
    b.setAttribute("aria-label", coord(i, 8) + " · " + (mine ? "mine" : drapeau ? "fanion" : ouvert ? (partie.nombres[i] + " mines voisines") : "inexplorée"));
    b.oncontextmenu = e => { e.preventDefault(); agir(() => partie.baliser(i)); };
    return b;
  });
  terrain.append(grille);
}

const vues = {
  "nombre-mystere":prix, "pierre-feuille-ciseaux":duel, "mot-suspendu":imprimerie, allumettes:reserves,
  morpion:ardoise, "quatre-en-ligne":chevalet, "bataille-navale":flottille, "champ-de-balises":demineur
};

function dessiner() {
  const cle = terrain.contains(document.activeElement) && document.activeElement.dataset.cle;
  terrain.replaceChildren();
  vues[identifiant]();
  statistiques(partie.mesures());
  message.textContent = partie.message;
  message.classList.toggle("termine", partie.etat !== 0);
  if (cle) {
    const cible = [...terrain.querySelectorAll("[data-cle]")].find(b => b.dataset.cle === cle && !b.disabled);
    if (cible) cible.focus({preventScroll:true});
    else if (identifiant === "mot-suspendu") terrain.querySelector("button:enabled")?.focus({preventScroll:true});
  }
}

function nouvelle() {
  partie = new MoteurClassique.Partie(Math.floor(Math.random() * 233280), mode);
  fanion = false;
  dessiner();
}
if (identifiant === "morpion" || identifiant === "quatre-en-ligne") {
  const selecteur = element("select", "mode-classique");
  selecteur.setAttribute("aria-label", "Mode de jeu");
  selecteur.add(new Option("Contre l’automate", "0"));
  selecteur.add(new Option("À deux sur cet écran", "1"));
  selecteur.onchange = () => { mode = Number(selecteur.value); nouvelle(); };
  actions.append(selecteur);
}
commande("Nouvelle partie", nouvelle, false);
document.addEventListener("keydown", e => {
  if (identifiant !== "mot-suspendu" || partie.etat || e.ctrlKey || e.metaKey || e.altKey || palmares.open) return;
  if (/^[a-zÀ-ÿ]$/i.test(e.key) && lettres.includes(e.key.normalize("NFD")[0].toUpperCase())) jouer(e.key);
});
nouvelle();
