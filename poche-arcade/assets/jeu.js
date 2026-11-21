"use strict";
const fiche=jeux.find(j=>j.id===document.body.dataset.jeu);
const scene=document.querySelector("#jeu");
scene.innerHTML='<a class="back" href="../index.html">‹ &nbsp; Salle d’arcade</a><div class="game-banner"><img alt="" src="../assets/'+fiche.image+'.png"><div><span class="genre-label">'+fiche.genre+'</span><h1>'+fiche.nom+'</h1></div></div><div class="game-layout"><section class="machine" aria-label="Terrain de jeu"><div class="hud" id="hud"></div><div class="stage" id="terrain"></div><p class="feedback" aria-live="polite" id="message"></p><div class="controls" id="actions"></div></section><aside class="panel"><h2>Comment jouer</h2><p>'+fiche.regle+'</p><div class="best"><span>Record personnel</span><strong id="best"></strong></div></aside></div>';
const terrain=document.querySelector("#terrain"), message=document.querySelector("#message"), actions=document.querySelector("#actions"), hud=document.querySelector("#hud");
function statistiques(paires) {
  hud.replaceChildren(...paires.map(([titre,valeur])=>{
    const span=document.createElement("span"), b=document.createElement("b"); b.textContent=valeur;span.append(titre+" ",b);return span;
  }));
}
function commande(label, fn, principal=true) {
  const b=document.createElement("button"); b.className=principal?"action":"minor";b.textContent=label;b.onclick=fn;actions.append(b);return b;
}
function majRecord(){document.querySelector("#best").textContent=resumeRecord(fiche);}
function fin(titre, details) {
  const r=document.createElement("div");r.className="resultat";
  const h=document.createElement("h2"), p=document.createElement("p"); h.textContent=titre;p.textContent=details;r.append(h,p);terrain.replaceChildren(r);
  message.textContent=titre+" · "+details;majRecord();son(740);
}
majRecord();
