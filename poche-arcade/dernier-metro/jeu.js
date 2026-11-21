"use strict";
const lignes=[
  {taille:4, trajet:[8,9,5,6,10,11], annexes:[2,7,13]},
  {taille:5, trajet:[5,6,11,16,17,12,13,8,9], annexes:[1,3,7,15,18,22]},
  {taille:6, trajet:[12,13,7,8,2,3,4,10,16,15,21,22,28,29], annexes:[0,1,6,11,14,19,23,26,32]}
];
const nomsDirs=["nord","est","sud","ouest"];
const bords=[[30,0],[60,30],[30,60],[0,30]];
let indice=0, coups, rails, boutons, depart, arrivee;
function direction(a,b,n) {return [-n,1,n,-1].indexOf(b-a);}
function voisin(i,d,n) {
  const x=i%n+[0,1,0,-1][d], y=Math.floor(i/n)+[-1,0,1,0][d];
  return x<0 || y<0 || x>=n || y>=n ? -1 : y*n+x;
}
function relies() {
  const vus=new Set([depart]), aVoir=[depart];
  while(aVoir.length) {
    const i=aVoir.pop();
    for(const d of rails[i]) {
      const v=voisin(i,d,lignes[indice].taille);
      if(rails[v]?.includes((d+2)%4) && !vus.has(v)) {vus.add(v);aVoir.push(v);}
    }
  }
  return vus;
}
function dessiner(canvas,dirs,actif,station) {
  const ctx=canvas.getContext("2d");ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,60,60);
  const a=bords[dirs[0]], b=dirs.length===2?bords[dirs[1]]:[30,30];
  const points=[];
  for(let pas=0;pas<=24;pas++) {
    const t=pas/24,u=1-t;
    const x=u*u*a[0]+2*u*t*30+t*t*b[0], y=u*u*a[1]+2*u*t*30+t*t*b[1];
    const dx=u*(30-a[0])+t*(b[0]-30), dy=u*(30-a[1])+t*(b[1]-30);
    const longueur=Math.hypot(dx,dy)||1;points.push([x,y,-dy/longueur,dx/longueur]);
  }
  ctx.strokeStyle=actif?"#c58964":"#817784";ctx.lineWidth=3.5;
  for(let p=2;p<24;p+=4) {const [x,y,nx,ny]=points[p];ctx.beginPath();ctx.moveTo(x-9*nx,y-9*ny);ctx.lineTo(x+9*nx,y+9*ny);ctx.stroke();}
  for(const cote of [-5,5]) {
    ctx.beginPath(); for(const [k,[x,y,nx,ny]] of points.entries()) {if(!k)ctx.moveTo(x+cote*nx,y+cote*ny);else ctx.lineTo(x+cote*nx,y+cote*ny);}
    ctx.strokeStyle=actif?"#ffdb96":"#d4cbd0";ctx.lineWidth=2.7;ctx.stroke();
  }
  if(station){ctx.fillStyle=station==="D"?"#a5e0bb":"#ffa17b";ctx.fillRect(17,17,26,26);ctx.fillStyle="#262331";ctx.font="bold 20px monospace";ctx.textAlign="center";ctx.fillText(station,30,37);}
}
function rafraichir() {
  const actifs=relies();
  rails.forEach((dirs,i)=>{
    if(!dirs) return;
    const b=boutons[i], station=i===depart?"D":i===arrivee?"A":"";
    b.classList.toggle("active",actifs.has(i));
    b.setAttribute("aria-label",(station?"Station "+station:"Rail")+" ligne "+(1+Math.floor(i/lignes[indice].taille))+", colonne "+(1+i%lignes[indice].taille)+", "+dirs.map(d=>nomsDirs[d]).join(" et "));
    dessiner(b.firstChild,dirs,actifs.has(i),station);
  });
  statistiques([["Ligne",(indice+1)+"/3"],["Coups",coups]]);
  if(actifs.has(arrivee)) {
    record(fiche.id+"."+indice,coups,true);fin("Terminus atteint !","Ligne "+(indice+1)+" reliée en "+coups+" coups.");
    actions.replaceChildren();
    if(indice<2) commande("Ligne suivante",()=>{indice++;demarrerMetro();});
    else commande("Reprendre à la ligne 1",()=>{indice=0;demarrerMetro();});
    commande("Rejouer cette ligne",demarrerMetro,false);
  }
}
function demarrerMetro() {
  const {taille:n,trajet,annexes}=lignes[indice];coups=0; depart=trajet[0];arrivee=trajet.at(-1);
  rails=Array(n*n).fill(null);boutons=[];
  trajet.forEach((i,k)=>{
    const dirs=[trajet[k-1],trajet[k+1]].filter(Number.isInteger).map(v=>direction(i,v,n));
    const rotation=dirs.length===1 ? 0 : (k*7+indice+1)%4;
    rails[i]=dirs.map(d=>(d+rotation)%4);
  });
  annexes.forEach((i,k)=>rails[i]=k%2?[0,2]:[2,3]);
  const grille=document.createElement("div");grille.className="grille";grille.style.setProperty("--n",n);
  rails.forEach((dirs,i)=>{
    const b=document.createElement(dirs?"button":"div");b.className="case rail";boutons[i]=b;
    if(dirs) {
      const dessin=document.createElement("canvas");dessin.width=120;dessin.height=120;b.append(dessin);
      b.disabled=dirs.length===1;
      b.onclick=()=>{rails[i]=rails[i].map(d=>(d+1)%4);coups++;son(360);rafraichir();};
    } else b.classList.add("vide");
    grille.append(b);
  });
  terrain.replaceChildren(grille);actions.replaceChildren();commande("Recommencer",demarrerMetro,false);
  message.textContent="Les rails dorés sont reliés au départ D.";rafraichir();
}
demarrerMetro();

