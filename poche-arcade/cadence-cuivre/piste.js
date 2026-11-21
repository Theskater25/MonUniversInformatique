"use strict";
const PISTE={
  noms:["Le trio","Le contretemps","Le grand chorus"],unite:"Notes",
  touches:[["1 · Cloche","Digit1",1],["2 · Peau","Digit2",2],["3 · Gong","Digit3",4]],
  aide:"Frappe 1, 2 ou 3 au passage de la ligne dorée.",victoire:"Le motif est joué !",defaite:"Le trio reprend son souffle",
  note:m=>[660,330,440][m.note_piste(-1)],
  dessiner(c,m){
    rectangle(c,"#292133c7",0,0,300,180);
    const tons=["#f5a67c","#a7d6b3","#d6adcf"];
    for(let i=0;i<3;i++){
      const x=34+i*82;rectangle(c,"#433440",x,8,66,156);
      rectangle(c,"#68575a",x+32,9,1,132);
      disque(c,tons[i],x+33,145,12);inscription(c,String(i+1),x+33,149,"#302435",12);
    }
    rectangle(c,"#ffdd8e",24,143,249,2);
    for(let i=0;i<4&&m.progres()+i<m.objectif();i++){
      const y=144-m.note_delai(i)*1.35,x=67+82*m.note_piste(i);
      if(y<0||y>178)continue;
      rectangle(c,"#212536",x-16,y-5,32,11);rectangle(c,tons[m.note_piste(i)],x-14,y-4,28,8);
      rectangle(c,"#fff1c8",x-9,y-3,18,2);
    }
  }
};

