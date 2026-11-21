"use strict";

function vueDeLaLune(toile, moteur, mission) {
  const contexte = toile.getContext("2d");
  const fond = document.createElement("canvas");
  fond.width = toile.width;
  fond.height = toile.height;
  const c = fond.getContext("2d");
  const largeur = fond.width, hauteur = fond.height;
  let graine = 16417 + mission * 731;
  function hasard() {
    graine = (Math.imul(graine, 1664525) + 1013904223) >>> 0;
    return graine / 4294967296;
  }

  function rectangle(ctx, couleur, x, y, w, h) {
    ctx.fillStyle = couleur;
    ctx.fillRect(Math.round(x), Math.round(y), w, h);
  }
  function polygone(ctx, couleur, sommets) {
    ctx.fillStyle = couleur;
    ctx.beginPath();
    sommets.forEach(([x, y], i) => {
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
  }

  // Les bandes lointaines et les cratères restent fixes pendant les 60 pas/s.
  const ciel = ["#211e36", "#29253e", "#353047", "#40374d", "#4d4054"];
  ciel.forEach((couleur, i) => rectangle(c, couleur, 0, i * 32, largeur, 40));
  for (let i = 0; i < 145; i++) {
    const x = Math.floor(hasard() * largeur), y = Math.floor(hasard() * 114);
    rectangle(c, i % 4 === 0 ? "#e5cec1" : "#8c8198", x, y, 1, 1);
    if (i % 39 === 0) rectangle(c, "#aaa2b5", x - 1, y + 1, 3, 1);
  }
  const planeteX = [254, 61, 246][mission];
  for (let y = -13; y <= 13; y++) {
    const demi = Math.floor(Math.sqrt(13 * 13 - y * y));
    const couleur = y < -7 ? "#dec4a8" : y < -4 ? "#b49397" : y < 1 ? "#ccb2a2" : y < 4 ? "#ac8790" : "#877187";
    rectangle(c, couleur, planeteX - demi, 35 + y, 2 * demi + 1, 1);
  }
  for (let i = -29; i <= 29; i++) {
    const h = Math.sqrt(1 - (i / 29) ** 2) * 3;
    rectangle(c, "#cdb5a8", planeteX + i, 35 - i * .24 + h, 1, 1);
    if (Math.abs(i) > 12) rectangle(c, "#a68fa1", planeteX + i, 35 - i * .24 - h, 1, 1);
  }

  function chaine(base, amplitude, couleur) {
    const sommets = [[0, hauteur], [0, base]];
    for (let x = 0; x < largeur + 14; x += 8 + Math.floor(hasard() * 12)) {
      sommets.push([x, base - hasard() * amplitude]);
    }
    sommets.push([largeur, base], [largeur, hauteur]);
    polygone(c, couleur, sommets);
  }
  chaine(131, 30, "#69566a");
  chaine(146, 26, "#554a60");

  const station = mission === 2 ? 262 : 43;
  rectangle(c, "#8f7981", station, 116, 22, 9);
  polygone(c, "#b29a93", [[station - 2, 116], [station + 5, 107], [station + 15, 107], [station + 22, 116]]);
  rectangle(c, "#6a6377", station + 8, 109, 4, 7);
  rectangle(c, "#ffe4a0", station + 3, 118, 5, 2);
  rectangle(c, "#938596", station - 6, 105, 2, 21);
  rectangle(c, "#dbab8f", station - 8, 105, 5, 1);

  const sol = Array.from({length: largeur}, (_, x) => Math.round(moteur.sol(x)));
  sol.forEach((y, x) => {
    rectangle(c, "#78636a", x, y, 1, hauteur - y);
    rectangle(c, "#c3a49b", x, y, 1, 2);
    rectangle(c, "#9a807e", x, y + 2, 1, 3);
  });
  for (let i = 0; i < 420; i++) {
    const x = Math.floor(hasard() * largeur), y = Math.floor(hasard() * hauteur);
    if (y > sol[x] + 4) rectangle(c, i % 2 ? "#645664" : "#9b817e", x, y, 1 + Math.floor(hasard() * 4), 1);
  }

  const centre = moteur.centre_quai(), demi = moteur.demi_largeur_quai();
  const quaiY = Math.round(moteur.sol(centre));
  rectangle(c, "#433d50", centre - demi, quaiY, demi * 2, 5);
  rectangle(c, "#f7d391", centre - demi, quaiY, demi * 2, 2);
  for (let x = centre - demi + 4; x < centre + demi - 4; x += 9) {
    rectangle(c, "#ab7b67", x, quaiY + 2, 5, 2);
  }
  for (const x of [centre - demi, centre + demi - 1]) {
    rectangle(c, "#403b4c", x - 1, quaiY - 5, 2, 6);
    rectangle(c, "#ffc37f", x - 2, quaiY - 6, 4, 2);
  }
  // Petit module à deux patins, hublot et propulseurs latéraux.
  return function dessiner(entrees, trame) {
    contexte.imageSmoothingEnabled = false;
    contexte.drawImage(fond, 0, 0);
    const x = Math.round(moteur.position_x()), y = Math.round(moteur.position_y());
    const enPanne = moteur.issue() > 1;
    const feu = trame % 14 < 7 ? "#fff3ad" : "#e6a56c";
    rectangle(contexte, feu, centre - demi - 1, quaiY - 6, 2, 1);
    rectangle(contexte, feu, centre + demi - 2, quaiY - 6, 2, 1);
    if (moteur.issue() === 0 && moteur.reserve() > 0) {
      if (entrees.poussee) {
        const longueur = trame % 10 < 5 ? 13 : 10;
        polygone(contexte, "#ec794f", [[x - 3, y + 4], [x + 3, y + 4], [x, y + longueur]]);
        rectangle(contexte, "#ffdf8d", x - 1, y + 5, 3, 4);
      }
      if (entrees.gauche !== entrees.droite) {
        rectangle(contexte, "#ffc27d", x + (entrees.gauche ? 6 : -11), y + 1, 5, 2);
      }
    }
    const contour = "#393649";
    polygone(contexte, contour, [[x-6,y-2],[x-3,y-6],[x+3,y-6],[x+6,y-2],[x+6,y+3],[x-6,y+3]]);
    polygone(contexte, "#e1c4a6", [[x-5,y-2],[x-2,y-5],[x+2,y-5],[x+5,y-2],[x+4,y+2],[x-4,y+2]]);
    rectangle(contexte, "#52677b", x-3, y-3, 6, 3);
    rectangle(contexte, "#b7d2ca", x-2, y-3, 3, 1);
    rectangle(contexte, enPanne ? "#895b5d" : "#f2ae68", x-6, y+1, 12, 3);
    rectangle(contexte, "#76637a", x-3, y+4, 6, 2);
    for (const cote of [-1, 1]) {
      rectangle(contexte, "#ecd6af", x+cote*5-1, y+3, 2, 3);
      rectangle(contexte, "#d5b99d", x+cote*7-1, y+5, 2, 2);
      rectangle(contexte, contour, x+cote*7-2, y+7, 5, 1);
    }
  };
}

