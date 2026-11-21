"use strict";
const PISTE={
  noms:["Courrier local","La ceinture","Le grand relais"],unite:"Livraisons",
  touches:[["Expédier","Space",1]],aide:"Expédie quand les deux directions vont se rejoindre. La capsule voyage en ligne droite.",
  victoire:"Courrier orbital livré !",defaite:"La navette rentre à la base",
  dessiner(c,m){
    rectangle(c,"#18172dc9",0,0,300,180);
    const centre=[150,90], rad=a=>a*Math.PI/180;
    const pos=(angle,r)=>[centre[0]+Math.cos(rad(angle))*r,centre[1]+Math.sin(rad(angle))*r];
    for(const r of [41,68]){
      c.strokeStyle="#868399";c.lineWidth=1;c.beginPath();c.arc(...centre,r,0,Math.PI*2);c.stroke();
    }
    disque(c,"#ba807a",...centre,20);
    rectangle(c,"#deac8f",133,83,34,3);rectangle(c,"#9c7389",132,95,36,3);
    const a=m.relais_angle(),b=m.satellite(),tol=m.tolerance();
    c.strokeStyle="#ffcb7c";c.lineWidth=6;c.beginPath();c.arc(...centre,68,rad(a-tol),rad(a+tol));c.stroke();
    const [rx,ry]=pos(a,68);rectangle(c,"#fff0c4",rx-4,ry-4,8,8);
    const [sx,sy]=pos(b,41),[tx,ty]=pos(b,53);
    c.strokeStyle="#bfe8df";c.lineWidth=2;c.beginPath();c.moveTo(sx,sy);c.lineTo(tx,ty);c.stroke();
    rectangle(c,"#70c6c5",sx-5,sy-5,10,10);rectangle(c,"#d6f1db",sx-2,sy-3,4,4);
    if(m.vol()>=0){const [x,y]=pos(m.tir_angle(),41+27*m.vol()/23);disque(c,"#ffeca4",x,y,3);}
  }
};

