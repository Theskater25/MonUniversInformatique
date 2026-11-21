"use strict";

const idTable = fiche.id;
const jardin = idTable === "jardin-cellulaire";
const defense = idTable === "gardiens-du-sentier";
const flechesTable = { ArrowLeft:"g", ArrowRight:"d", ArrowUp:"h", ArrowDown:"b" };
let partie, lecture = false, minuterie;
terrain.classList.add("salon");

function noeud(balise, classe, texte) {
  const el = document.createElement(balise);
  if (classe) el.className = classe;
  if (texte !== undefined) el.textContent = texte;
  return el;
}

function boutonTable(libelle, code, clic) {
  const b = noeud("button", "outil-table", libelle);
  b.type = "button";
  b.dataset.code = code;
  b.onclick = clic;
  return b;
}

function coordTable(i, n) {
  return String.fromCharCode(65 + Math.floor(i / n)) + (i % n + 1);
}

function grilleTable(vue) {
  const n = vue.colonnes;
  const reperes = vue.ciblable || Array.isArray(vue.cibles);
  const cibles = new Set(vue.cibles || []);
  const grille = noeud("div", "plateau-table" + (reperes ? " repere-table" : ""));
  grille.style.setProperty("--colonnes", n);
  grille.setAttribute("role", "group");
  grille.setAttribute("aria-label", "Plateau de " + fiche.nom);
  if (reperes) {
    grille.append(noeud("span"));
    for (let x = 1; x <= n; x++) grille.append(noeud("span", "axe-table", x));
  }
  const boutons = new Map();
  vue.grille.forEach((signe, i) => {
    const code = coordTable(i, n);
    if (reperes && i % n === 0) grille.append(noeud("span", "axe-table", code[0]));
    const editable = !partie.etat && (vue.ciblable || cibles.has(i));
    const c = editable ? boutonTable(signe, code, () => agirTable(code)) : noeud("span", "", signe);
    c.className = "cellule-table " + (vue.styles?.[i] || "");
    c.setAttribute("aria-label", code + " · " + (signe || "vide"));
    if (editable) {
      boutons.set(i, c);
      c.tabIndex = boutons.size === 1 ? 0 : -1;
      c.onfocus = () => { for (const b of boutons.values()) b.tabIndex = b === c ? 0 : -1; };
      c.onkeydown = e => {
        const ecart = {ArrowLeft:-1, ArrowRight:1, ArrowUp:-n, ArrowDown:n}[e.key];
        if (!ecart) return;
        e.preventDefault();
        e.stopPropagation();
        let k = i + ecart;
        while (k >= 0 && k < vue.grille.length && !boutons.has(k)) k += ecart;
        boutons.get(k)?.focus();
      };
    }
    grille.append(c);
  });
  return grille;
}

function mainsTable(lignes) {
  const tapis = noeud("div", "tapis-table");
  for (const [qui, cartes] of lignes) {
    const rangee = noeud("div", "main-table");
    rangee.append(noeud("strong", "nom-main", qui));
    for (const carte of cartes) {
      const dos = carte === "?", rouge = /[♦♥]/.test(carte);
      const c = noeud("span", "carte-table" + (dos ? " dos" : rouge ? " rouge" : ""), dos ? "◆" : carte);
      if (dos) c.setAttribute("aria-label", "Carte cachée");
      rangee.append(c);
    }
    tapis.append(rangee);
  }
  return tapis;
}

function historiqueTable(vue) {
  const table = noeud("table", "historique-table");
  const thead = table.createTHead(), titres = thead.insertRow();
  for (const titre of vue.entetes) titres.append(noeud("th", "", titre));
  const corps = table.createTBody();
  for (const ligne of vue.historique) {
    const tr = corps.insertRow();
    for (const valeur of ligne) tr.insertCell().textContent = valeur;
  }
  return table;
}

function dessinerTable() {
  const cle = terrain.contains(document.activeElement) ? document.activeElement.dataset.code : null;
  const vue = partie.vue();
  const elements = [];
  if (vue.titre) elements.push(noeud("h2", "titre-table", vue.titre));
  if (vue.grille) elements.push(grilleTable(vue));
  if (vue.cartes) elements.push(mainsTable(vue.cartes));
  if (vue.historique?.length) elements.push(historiqueTable(vue));
  for (const ligne of vue.notes || []) elements.push(noeud("p", "note-table", ligne));
  if (!partie.etat) {
    const outils = noeud("div", "outils-table");
    for (const [code, label] of partie.commandes()) {
      outils.append(boutonTable(label, code, () => agirTable(code)));
    }
    if (jardin) {
      const b = boutonTable(lecture ? "Pause" : "Lecture automatique", "lecture", () => {
        lecture = !lecture;
        dessinerTable();
        programmerTable();
      });
      b.setAttribute("aria-pressed", String(lecture));
      outils.append(b);
    }
    elements.push(outils);
  }
  terrain.replaceChildren(...elements);
  statistiques(partie.mesures());
  if (message.textContent !== partie.message) message.textContent = partie.message;
  if (cle) [...terrain.querySelectorAll("button[data-code]")].find(b => b.dataset.code === cle)?.focus({preventScroll:true});
}

function programmerTable() {
  clearTimeout(minuterie);
  if (document.hidden || palmares.open || partie.etat || !(lecture || (defense && partie.en_vague))) return;
  minuterie = setTimeout(() => agirTable("pas"), jardin ? 400 : 330);
}

function agirTable(code) {
  if (partie.etat) return;
  if (jardin && ["vide", "hasard", "planeur", "oscillateur"].includes(code)) lecture = false;
  partie.agir(code.toLowerCase());
  if ((partie.etat || jardin || idTable === "verrerie-des-doubles") && partie.points > 0) {
    record(fiche.id, partie.points);
    majRecord();
  }
  if (partie.etat) son(partie.etat === 1 ? 740 : 260);
  dessinerTable();
  programmerTable();
}

function nouvelleTable() {
  lecture = false;
  partie = new MoteurClassique.Partie(Math.floor(Math.random() * 233280));
  dessinerTable();
  programmerTable();
}

commande("Nouvelle partie", nouvelleTable, false);
document.addEventListener("keydown", e => {
  if (palmares.open || partie.etat || e.ctrlKey || e.metaKey || e.altKey ||
      e.target.closest("a, input, select, #navigation, #actions")) return;
  let code = flechesTable[e.key];
  if (idTable === "sudoku-des-serres" && /^[0-9]$/.test(e.key)) code = e.key;
  if (idTable === "serrure-a-disques") {
    if (/^[1-6]$/.test(e.key)) code = e.key;
    if (e.key === "Backspace") code = "effacer";
    if (e.key === "Enter" && partie.saisie.length === 4) code = "tester";
  }
  if (code && partie.commandes().some(c => c[0] === code)) {
    e.preventDefault();
    agirTable(code);
  }
});
document.addEventListener("visibilitychange", programmerTable);
document.querySelector(".record-link").addEventListener("click", programmerTable);
palmares.addEventListener("close", programmerTable);
nouvelleTable();
