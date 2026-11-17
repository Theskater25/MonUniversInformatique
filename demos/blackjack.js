'use strict';
(()=>{
const suits=['♠','♥','♦','♣'];const ranks=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let deck=[],player=[],dealer=[],finished=false,messages={},outcome=null;
const $=id=>document.getElementById(id);
function shuffle(array){for(let i=array.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[array[i],array[j]]=[array[j],array[i]]}return array}
function makeDeck(){return shuffle(suits.flatMap(suit=>ranks.map(rank=>({suit,rank}))))}
function value(cards){let total=0,aces=0;for(const c of cards){if(c.rank==='A'){total+=11;aces++}else if(['J','Q','K'].includes(c.rank))total+=10;else total+=Number(c.rank)}while(total>21&&aces){total-=10;aces--}return total}
function cardNode(c,hidden=false){const el=document.createElement('div');el.className='playing-card'+(hidden?' back':(['♥','♦'].includes(c.suit)?' red':''));el.textContent=hidden?'?':c.rank+c.suit;el.setAttribute('aria-label',hidden?'Carte cachée':c.rank+' '+c.suit);return el}
function render(){
 $('dealer-hand').replaceChildren(...dealer.map((c,i)=>cardNode(c,!finished&&i===1)));
 $('player-hand').replaceChildren(...player.map(c=>cardNode(c)));
 $('player-score').textContent='('+value(player)+')';
 $('dealer-score').textContent=finished?'('+value(dealer)+')':'(?)';
 $('hit').disabled=finished;$('stand').disabled=finished;
 $('game-result').textContent=outcome?(messages[outcome]||outcome):'';
}
function resolve(){
 const p=value(player),d=value(dealer);
 if(p>21)outcome='bust';
 else if(d>21)outcome='dealerBust';
 else if(p>d)outcome='win';
 else if(d>p)outcome='lose';
 else outcome='push';
 finished=true;render();
}
function start(){
 deck=makeDeck();player=[deck.pop(),deck.pop()];dealer=[deck.pop(),deck.pop()];finished=false;outcome=null;
 // Blackjack naturals end the round without additional actions.
 if(value(player)===21||value(dealer)===21)resolve();else render();
}
function hit(){if(finished)return;player.push(deck.pop());if(value(player)>=21){if(value(player)===21)stand();else resolve()}else render()}
function stand(){if(finished)return;while(value(dealer)<17)dealer.push(deck.pop());resolve()}
window.updateGameTranslation=map=>{messages=map;render()};
document.addEventListener('DOMContentLoaded',()=>{$('hit').addEventListener('click',hit);$('stand').addEventListener('click',stand);$('new').addEventListener('click',start);start()});
})();