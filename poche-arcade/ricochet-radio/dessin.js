"use strict";

function ecranRadio(toile) {
  const c = toile.getContext("2d");
  const fond = document.createElement("canvas");
  fond.width = toile.width;
  fond.height = toile.height;
  const f = fond.getContext("2d");
  function rect(ctx, teinte, x, y, largeur, hauteur) {
    ctx.fillStyle = teinte;
    ctx.fillRect(Math.round(x), Math.round(y), largeur, hauteur);
  }
  const ciel = ["#202735", "#232c38", "#27303c", "#2c3440", "#303844"];
  ciel.forEach((v, i) => rect(f, v, 0, i * 32, 240, 32));
  for (let x = 14; x < 237; x += 16) {
    for (let y = 24; y < 138; y += 12) rect(f, "#38504f", x, y, 1, 1);
  }
  // La silhouette de la ville reste assez sombre pour suivre le signal.
  for (let i = 0; i < 21; i++) {
    const x = 6 + i * 11, haut = 132 - (i * 13 + 19) % 29;
    rect(f, "#30323d", x, haut, 10, 145 - haut);
    rect(f, "#41434a", x + 1, haut, 8, 1);
    if (i % 3 === 0) rect(f, "#42454e", x + 6, haut - 4, 1, 4);
    for (let j = 0; j < (i % 3) + 1; j++) rect(f, "#595050", x + 2 + j * 2, haut + 4, 1, 2);
  }
  rect(f, "#151f2c", 1, 13, 5, 135);
  rect(f, "#151f2c", 234, 13, 5, 135);
  for (let y = 15; y < 148; y += 10) {
    rect(f, "#4d7372", 5, y, 1, 4);
    rect(f, "#4d7372", 234, y, 1, 4);
  }
  rect(f, "#6b867a", 7, 15, 226, 1);
  rect(f, "#242430", 7, 147, 226, 11);
  for (let x = 10; x < 232; x += 5) rect(f, "#6c6260", x, 147, 1, x % 20 === 0 ? 5 : 2);

  return (radio, trace, flash) => {
    c.imageSmoothingEnabled = false;
    c.drawImage(fond, 0, 0);
    const total = radio.objectif(), pas = 220 / total;
    for (let i = 0; i < total; i++) {
      const plein = i < radio.retours();
      rect(c, plein ? "#f5b572" : "#3e595a", 10 + i * pas, 5, Math.floor(pas) - 3, 5);
      rect(c, plein ? "#ffde98" : "#58736d", 10 + i * pas, 5, Math.floor(pas) - 3, 1);
    }
    const px = radio.antenne(), demi = radio.demi_antenne();
    rect(c, "#18232e", px - demi - 1, 138, demi * 2 + 2, 8);
    rect(c, flash > 0 ? "#cbf1cc" : "#8ccfc0", px - demi, 138, demi * 2, 4);
    rect(c, "#518f91", px - demi + 2, 142, demi * 2 - 4, 2);
    const repere = px + radio.repere();
    rect(c, "#ffd287", repere - demi * .28, 138, Math.round(demi * .56), 4);
    rect(c, "#fff0b4", repere - demi * .28, 138, Math.round(demi * .56), 1);
    rect(c, "#3f6875", px - 2, 144, 4, 3);

    const traine = ["#40545a", "#54756f", "#78a393", "#b2c5a4"];
    trace.forEach(([x, y], i) => {
      const teinte = traine[Math.min(3, Math.floor(i * 4 / trace.length))];
      rect(c, teinte, x - 1, y - 1, 2, 2);
    });
    const sx = radio.signal_x(), sy = radio.signal_y();
    rect(c, "#ed8d65", sx - 3, sy - 1, 7, 3);
    rect(c, "#ef9f6f", sx - 2, sy - 2, 5, 5);
    rect(c, "#ffebaa", sx - 1, sy - 2, 3, 4);
    rect(c, "#fff4d4", sx - 1, sy - 1, 2, 2);
  };
}

