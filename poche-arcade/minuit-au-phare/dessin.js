"use strict";

function peindreCarte(canvas, veille) {
  const c = canvas.getContext("2d");
  const tuile = 32;
  const pixel = (couleur, x, y, w, h) => {
    c.fillStyle = couleur;
    c.fillRect(x, y, w, h);
  };
  function forme(couleur, points) {
    c.fillStyle = couleur;
    c.beginPath();
    points.forEach(([x, y], i) => { if (i) c.lineTo(x, y); else c.moveTo(x, y); });
    c.closePath();
    c.fill();
  }
  function mer(x, y) {
    const motif = (x * 3 + y * 7) % 5;
    pixel((x + y) % 2 ? "#245060" : "#274f5e", 0, 0, 32, 32);
    pixel("#2f5c69", 0, 31, 32, 1);
    pixel("#2b5766", 31, 0, 1, 31);
    const sx = 3 + motif * 2, sy = 6 + motif * 3;
    pixel("#376774", sx, sy, 5, 1);
    pixel("#376774", sx + 5, sy - 1, 3, 1);
    pixel("#346270", 20, 25 - motif, 5, 1);
    if (motif === 0) pixel("#477582", 5, 26, 2, 1);
  }
  function ilot(x, y) {
    if ((x + y) % 2) { c.translate(32, 0); c.scale(-1, 1); }
    forme("#4f8690", [[1,24],[6,17],[16,8],[25,15],[31,24],[27,27],[8,28]]);
    forme("#1a3b4a", [[1,22],[9,9],[15,7],[20,12],[23,11],[29,21],[25,25],[7,26]]);
    forme("#57717d", [[4,21],[10,10],[15,8],[17,12],[13,16],[11,22]]);
    forme("#7b8d92", [[8,14],[11,10],[15,8],[13,12]]);
    forme("#3a5363", [[14,22],[19,15],[23,12],[26,18],[25,22]]);
    pixel("#8eaaa9", 5, 26, 7, 1);
  }
  function phare() {
    forme("#193340", [[2,26],[8,22],[22,22],[28,27],[20,29],[5,28]]);
    forme("#f3ddbd", [[11,23],[13,14],[19,14],[22,24]]);
    forme("#d96752", [[12,18],[20,18],[21,21],[11,21]]);
    pixel("#39444e", 11, 12, 10, 2);
    pixel("#ffd87c", 13, 9, 6, 4);
    pixel("#fff2c2", 16, 10, 3, 3);
    forme("#df7258", [[10,9],[15,5],[17,5],[22,9]]);
    pixel("#313c4b", 15, 3, 2, 3);
    pixel("#8c6257", 15, 21, 3, 4);
  }
  function bouee(lit) {
    pixel("#437482", 7, 25, 16, 1);
    forme("#182f3d", [[8,20],[23,20],[21,23],[11,23]]);
    forme(lit ? "#f5b765" : "#cd8168", [[10,20],[13,17],[14,12],[18,12],[19,17],[22,20]]);
    pixel("#e9d8bd", 13, 16, 6, 2);
    pixel("#253846", 13, 10, 6, 3);
    pixel(lit ? "#fff6b8" : "#7baeb1", 15, 9, 3, 4);
    if (lit) { pixel("#ffda79", 16, 5, 1, 2); pixel("#ffda79", 9, 10, 2, 1); pixel("#ffda79", 22, 10, 2, 1); }
  }
  function bateau() {
    pixel("#50818a", 5, 26, 21, 1);
    forme("#172e3b", [[3,19],[29,18],[25,24],[8,24]]);
    forme("#d87758", [[4,19],[28,18],[26,21],[6,22]]);
    pixel("#f5d6a8", 10, 14, 12, 5);
    pixel("#4a5f6b", 12, 15, 3, 2); pixel("#4a5f6b", 17, 15, 3, 2);
    pixel("#e6a76c", 9, 12, 14, 2); pixel("#d4cbb2", 17, 5, 1, 8);
    pixel("#ffad6e", 18, 5, 5, 3);
  }
  function miroir(sens) {
    pixel("#183b48", 3, 5, 26, 24);
    pixel("#538888", 4, 3, 24, 23);
    pixel("#243e4b", 5, 4, 22, 21);
    for (const x of [6, 24]) for (const y of [5, 22]) pixel("#cba878", x, y, 2, 2);
    if (sens === "/") { c.translate(32, 0); c.scale(-1, 1); }
    for (let i = 0; i < 16; i++) {
      pixel("#719ba6", 8 + i, 8 + i, 3, 3);
      pixel("#dcf0d7", 8 + i, 7 + i, 2, 2);
    }
  }

  function parcourir(fn) {
    veille.cases.forEach((contenu, i) => {
      const x = i % veille.largeur, y = Math.floor(i / veille.largeur);
      c.save();
      c.translate(x * tuile, y * tuile);
      fn(contenu, i, x, y);
      c.restore();
    });
  }
  parcourir((_, i, x, y) => mer(x, y));
  c.beginPath();
  veille.rayon.forEach(([x, y], i) => {
    const px = (x + .5) * tuile, py = (y + .5) * tuile;
    if (i) c.lineTo(px, py); else c.moveTo(px, py);
  });
  c.lineJoin = "round";
  for (const [largeur, couleur] of [[8,"#fbd57535"],[4,"#e9b766"],[2,"#fff1b1"]]) {
    c.lineWidth = largeur; c.strokeStyle = couleur; c.stroke();
  }
  parcourir((objet, i, x, y) => {
    if (objet === "#") ilot(x, y);
    else if (objet === "P") phare();
    else if (objet === "V") bateau();
    else if (objet === "*") bouee(veille.allumees.includes(i));
    else if (objet === "/" || objet === "\\") miroir(objet);
  });
}

