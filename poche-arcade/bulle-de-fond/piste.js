"use strict";
const PISTE={
  noms:["La lagune","Les cheminées","La fosse bleue"],unite:"Passages",
  touches:[["Remonter","Space",1]],aide:"Maintiens pour monter, relâche pour descendre. Vise le centre de l’ouverture.",
  victoire:"Le sous-marin rejoint la baie !",defaite:"La plongée s’arrête ici",
  dessiner(c,m,t,n){
    const mers=[["#347e87","#266777","#1e5266"],["#30667f","#23586e","#214458"],["#2f556c","#294359","#1e344c"]];
    const mer=mers[n];
    rectangle(c,mer[0],0,0,300,180);rectangle(c,mer[1],0,40,300,140);rectangle(c,mer[2],0,104,300,76);
    for(let i=0;i<4;i++){
      const x=i*99-35;
      polygone(c,"#b2d8be16",[[x,0],[x+17,0],[x+58,111],[x+32,97]]);
    }
    for(let i=0;i<13;i++){
      const x=i*28-Math.floor(t/6)%28;
      const haut=155+(i%4)*4;
      polygone(c,"#183c50",[[x-6,180],[x+7,haut],[x+19,haut+8],[x+32,180]]);
      rectangle(c,"#3b7273",x+7,haut-7,2,9);
      rectangle(c,"#417f7c",x+6,haut-5,6,2);
    }
    for(let i=0;i<5;i++){
      const x=300-((t*.34+i*66)%320), y=41+(i*29)%82;
      polygone(c,"#77aaa18a",[[x-4,y],[x,y-2],[x+4,y],[x,y+2]]);
      polygone(c,"#77aaa18a",[[x+3,y],[x+6,y-2],[x+6,y+2]]);
    }
    const x=m.recif_x(),y=m.passage_y(),d=m.demi_passage();
    for(const [haut,bas] of [[0,y-d],[y+d,180]]){
      rectangle(c,"#304558",x,haut,15,bas-haut);rectangle(c,"#d38372",x,haut,4,bas-haut);
      rectangle(c,"#f5b38a",x-2,haut===0?bas-4:haut,19,4);
      for(let v=haut+9;v<bas-7;v+=13)rectangle(c,"#649096",x+6,v,6,3);
    }
    for(let i=0;i<7;i++)disque(c,"#b2d8d27a",43-((t+i*7)%36),m.profondeur()-((t+i*4)%19),1+(i%2));
    const sy=m.profondeur();
    rectangle(c,"#1d3644",44,sy-5,21,11);rectangle(c,"#f0ab67",45,sy-4,19,8);
    rectangle(c,"#82d9cf",52,sy-5,7,6);rectangle(c,"#a9d8cc",46,sy-8,3,5);
    polygone(c,"#eeae6b",[[44,sy],[39,sy-4],[39,sy+4]]);
  }
};

