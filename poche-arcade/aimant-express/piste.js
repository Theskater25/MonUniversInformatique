"use strict";
const PISTE={
  noms:["Le hangar","Double équipe","Grande coulée"],unite:"Pièces",
  touches:[["← Rail","ArrowLeft",1],["± Aimant","Space",2],["Rail →","ArrowRight",4]],
  aide:"← et → changent de rail. Espace inverse le signe. Évite les pièces ×.",
  victoire:"Commande de métal remplie !",defaite:"La fonderie ferme le lot",
  dessiner(c,m){
    rectangle(c,"#212e40b8",0,0,300,180);
    for(let i=0;i<3;i++){
      const x=62+i*88;rectangle(c,"#2b363f",x-16,16,32,148);
      for(let y=20;y<162;y+=10)rectangle(c,"#455963",x-16,y,32,2);
    }
    const x=62+m.rail_piece()*88,y=m.piece_y(),s=m.type_piece();
    disque(c,"#202532",x,y,11);disque(c,s>0?"#ffa975":s<0?"#9acfd2":"#a6a4af",x,y,9);
    inscription(c,s>0?"+":s<0?"−":"×",x,y+4,"#252b39",14);
    const px=62+m.rail_chariot()*88;
    rectangle(c,"#f5cc84",px-18,147,36,13);rectangle(c,"#213441",px-14,160,6,5);rectangle(c,"#213441",px+8,160,6,5);
    rectangle(c,m.polarite()>0?"#f59d71":"#8ec9d0",px-11,133,22,17);
    inscription(c,m.polarite()>0?"+":"−",px,146,"#292c33",15);
    inscription(c,"Lot · "+m.restantes(),254,13,"#fff4d5",9);
  }
};

