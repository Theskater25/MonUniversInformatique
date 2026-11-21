"use strict";
const PISTE={
  noms:["Col des pins","La corniche","Les aiguilles"],unite:"Crevasses",
  touches:[["Sauter","Space",1]],aide:"Espace ou Sauter · une impulsion juste avant la crevasse rapporte un bonus.",
  victoire:"Fanion atteint !",defaite:"Retour au refuge",
  dessiner(c,m,t,n){
    const ciels=[["#71879e","#a5a9ae","#e8bd98"],["#768c9b","#b0b4a7","#efd3ab"],["#635f83","#af8799","#ffc79a"]];
    const ciel=ciels[n];
    rectangle(c,ciel[0],0,0,300,180);
    rectangle(c,ciel[1],0,34,300,52);
    rectangle(c,ciel[2],0,74,300,106);
    disque(c,"#ffe6ad",209,38,16);
    for(let i=0;i<6;i++) {
      const x=i*74-40-Math.floor(t/17)%74;
      const pic=39+((i+Math.floor(t/(17*74)))%3)*8;
      polygone(c,"#67748a",[[x-24,126],[x+40,pic],[x+108,126]]);
      polygone(c,"#e0dbd6",[[x+22,pic+25],[x+40,pic],[x+55,pic+19],[x+45,pic+14],[x+40,pic+20],[x+36,pic+15]]);
    }
    polygone(c,"#435969",[[0,103],[24,96],[80,118],[132,97],[184,123],[240,93],[300,115],[300,180],[0,180]]);
    for(let i=0;i<12;i++){
      const x=i*31-Math.floor(t/3)%31, y=119+(i%3)*4;
      polygone(c,"#304d55",[[x-6,y+11],[x,y-9],[x+6,y+11]]);
    }
    const bord=m.crevasse(),fin=bord+m.largeur_trou();
    for(const [x,w] of [[0,Math.max(0,bord)],[Math.max(0,fin),Math.max(0,300-Math.max(0,fin))]]){
      rectangle(c,"#574856",x,132,w,49);rectangle(c,"#8299a3",x,133,w,6);rectangle(c,"#e3ece1",x,130,w,4);
      for(let i=0;i<Math.floor(w/11);i++)rectangle(c,"#766273",x+i*11,145+(i%3)*7,5,2);
    }
    if(bord<294){rectangle(c,"#4c454c",bord-10,115,2,15);polygone(c,"#ffca6e",[[bord-9,115],[bord,118],[bord-9,121]]);}
    const x=54,y=m.pieds(),pas=y>=131&&t%14<7?3:0;
    rectangle(c,"#34444b",x-8,y-15,4,8);
    rectangle(c,"#283647",x-5,y-7,4,7-pas);rectangle(c,"#283647",x+1,y-6,4,6);
    rectangle(c,"#f4ae57",x-5,y-17,11,11);rectangle(c,"#ffe1b3",x-2,y-23,7,7);
    rectangle(c,"#934b4f",x-3,y-24,9,3);rectangle(c,"#de6963",x-10,y-17,9,3);
  }
};

