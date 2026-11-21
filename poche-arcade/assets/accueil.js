"use strict";
function installerCarrousel() {
  const bandeau = document.querySelector(".feature");
  const modele = bandeau.querySelector(".feature-panel");
  const points = bandeau.querySelector(".slides");
  const boutonLecture = bandeau.querySelector(".rotation");
  const mouvementReduit = matchMedia("(prefers-reduced-motion: reduce)");
  const vedettes = ["ligne-de-crete", "astrographe", "bulle-de-fond", "cadence-cuivre"];
  const dureeLecture = 6000;
  let index = 0;
  let lecture = !mouvementReduit.matches;
  let minuterie;

  const panneaux = vedettes.map((id, i) => {
    const jeu = jeux.find(j => j.id === id);
    const panneau = i === 0 ? modele : modele.cloneNode(true);
    panneau.inert = i !== 0;
    panneau.setAttribute("aria-label", (i + 1) + " sur " + vedettes.length + " · " + jeu.nom);
    panneau.querySelector("img").src = "assets/" + jeu.image + ".png";
    panneau.querySelector("h1").textContent = jeu.nom;
    panneau.querySelector("p").textContent = jeu.intro;
    const lien = panneau.querySelector(".play");
    lien.href = jeu.id + "/index.html";
    lien.setAttribute("aria-label", "Jouer à " + jeu.nom);
    if (i !== 0) bandeau.append(panneau);

    const point = document.createElement("button");
    point.type = "button";
    point.setAttribute("aria-label", "À la une · " + jeu.nom);
    point.setAttribute("aria-pressed", String(i === 0));
    point.addEventListener("click", () => afficher(i, i < index ? -1 : 1));
    points.append(point);
    return panneau;
  });

  function programmer() {
    clearTimeout(minuterie);
    if (!lecture || document.hidden || panneaux[index].contains(document.activeElement)) return;
    minuterie = setTimeout(() => afficher((index + 1) % panneaux.length, 1), dureeLecture);
  }

  function afficher(i, sens) {
    if (i !== index) {
      const ancien = panneaux[index], suivant = panneaux[i];
      for (const panneau of panneaux) {
        for (const animation of panneau.getAnimations()) animation.cancel();
      }
      ancien.inert = true;
      suivant.inert = false;
      points.children[index].setAttribute("aria-pressed", "false");
      points.children[i].setAttribute("aria-pressed", "true");
      index = i;
      if (!mouvementReduit.matches) {
        const transition = { duration: 450, easing: "ease-in-out" };
        ancien.animate([
          { visibility: "visible", transform: "translateX(0)" },
          { visibility: "visible", transform: "translateX(" + (-sens * 100) + "%)" }
        ], transition);
        suivant.animate([
          { transform: "translateX(" + (sens * 100) + "%)" },
          { transform: "translateX(0)" }
        ], transition);
      }
    }
    programmer();
  }

  function reglerLecture(active) {
    lecture = active;
    const libelle = lecture ? "Mettre le défilement en pause" : "Lancer le défilement";
    boutonLecture.dataset.lecture = String(lecture);
    boutonLecture.setAttribute("aria-label", libelle);
    boutonLecture.title = libelle;
    programmer();
  }

  boutonLecture.addEventListener("click", () => reglerLecture(!lecture));
  // Le lien Jouer garde sa destination pendant une interaction au clavier.
  bandeau.addEventListener("focusin", programmer);
  bandeau.addEventListener("focusout", () => queueMicrotask(programmer));
  document.addEventListener("visibilitychange", programmer);
  window.addEventListener("pageshow", programmer);
  mouvementReduit.addEventListener("change", () => reglerLecture(!mouvementReduit.matches));
  bandeau.querySelector(".feature-controls").hidden = false;
  reglerLecture(lecture);
}
installerCarrousel();
const filtres=document.querySelector(".filters"), cartes=document.querySelector(".cards");
for (const j of jeux) {
  const lien=document.createElement("a"); lien.href=j.id+"/index.html"; lien.className="card"; lien.dataset.genre=j.genre;
  lien.innerHTML='<div class="cover"><img alt="" src="assets/'+j.image+'.png"><span class="cat" style="background:'+j.couleur+'">'+j.genre+'</span></div><div class="card-copy"><h3>'+j.nom+'</h3><span class="card-play" aria-hidden="true">▶</span><p>'+j.bref+'</p></div>';
  cartes.append(lien);
}
document.querySelector("#nombre-jeux").textContent = jeux.length + " jeux";
const recherche = document.querySelector("#recherche");
const resultats = document.querySelector("#resultats");
const effacer = document.querySelector("#effacer-filtres");
let genreActif = "Tous";
function normaliser(texte) {
  return texte.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[-’']/g," ");
}
function filtrer() {
  const mots = normaliser(recherche.value.trim()).split(/\s+/).filter(Boolean);
  let total = 0;
  [...cartes.children].forEach((el,i)=>{
    const jeu = jeux[i], texte = normaliser(jeu.nom+" "+jeu.genre+" "+(jeu.alias || ""));
    el.hidden = (genreActif!=="Tous" && genreActif!==jeu.genre) || !mots.every(m=>texte.includes(m));
    if (!el.hidden) total++;
  });
  [...filtres.children].forEach(b=>b.setAttribute("aria-pressed",String(b.textContent===genreActif)));
  const actif = mots.length>0 || genreActif!=="Tous";
  resultats.textContent = !actif ? "" : total===0 ? "Aucune cartouche ne correspond à cette recherche." : total+(total===1?" jeu trouvé":" jeux trouvés");
  effacer.hidden = total!==0;
}
recherche.addEventListener("input",filtrer);
effacer.onclick=()=>{ recherche.value=""; genreActif="Tous"; filtrer(); recherche.focus(); };
for (const genre of ["Tous", ...new Set(jeux.map(j => j.genre))]) {
  const b=document.createElement("button"); b.textContent=genre; b.setAttribute("aria-pressed",String(genre==="Tous"));
  b.onclick=()=>{
    genreActif=genre;
    filtrer();
  }; filtres.append(b);
}

