"use strict";
const jeux = [
  {
    id: "verrerie-des-doubles", nom: "Verrerie des doubles", image: "verrerie-des-doubles", genre: "Puzzle",
    couleur: "#efbd91", unite: "pts", alias: "2048 nombres fusion tuiles",
    bref: "Souffle un verre de 2048 dans un four de vingt cases.",
    regle: "Glisse tous les verres avec les flèches. Deux valeurs identiques fusionnent une fois par mouvement. Une nouvelle pièce arrive après chaque glissade réussie. Quatre fusions chargent le soufflet, qui peut retirer un verre de valeur 2."
  },
  {
    id: "serrure-a-disques", nom: "Serrure à disques", image: "serrure-a-disques", genre: "Déduction",
    couleur: "#cebe9a", unite: "pts", alias: "mastermind combinaison code couleurs chiffres",
    bref: "Trouve les quatre chiffres du coffre en huit essais.",
    regle: "Règle les quatre disques de 1 à 6, puis teste le code. Un chiffre peut être répété. Le coffre indique combien sont bien placés et combien figurent ailleurs. Tu peux aussi saisir les quatre chiffres au clavier, puis appuyer sur Entrée."
  },
  {
    id: "sudoku-des-serres", nom: "Sudoku des serres", image: "sudoku-des-serres", genre: "Puzzle",
    couleur: "#aac9a5", unite: "pts", alias: "sudoku grille chiffres 9x9",
    bref: "Complète neuf serres avec les chiffres de 1 à 9.",
    regle: "Sélectionne une case claire, puis un chiffre. Chaque ligne, colonne et bloc de 3 × 3 contient une seule fois les chiffres de 1 à 9. Tu peux corriger tes entrées, effacer la case ou demander un indice."
  },
  {
    id: "jardin-cellulaire", nom: "Jardin cellulaire", image: "jardin-cellulaire", genre: "Simulation",
    couleur: "#a5d1b3", unite: "cellules", alias: "jeu de la vie conway game of life automate",
    bref: "Sème un planeur et observe ses générations.",
    regle: "Clique sur les cellules pour les planter ou les enlever. Trois voisines font naître une cellule. Une cellule vivante survit avec deux ou trois voisines. Les cases au-delà du jardin sont vides. Avance pas à pas ou lance la lecture automatique."
  },
  {
    id: "courant-de-plumes", nom: "Courant de plumes", image: "courant-de-plumes", genre: "Réflexes",
    couleur: "#e8c99a", unite: "pts", alias: "flappy bird vol gravité impulsion obstacles infinis",
    bref: "Porte une plume entre les mobiles à vent.",
    regle: "Espace, la flèche haut ou le bouton rond donnent une impulsion. Relâche pour descendre. Les mobiles se succèdent tant que la plume vole. Traverser un passage rapporte dix points, attraper sa graine en rapporte cinq."
  },
  {
    id: "quai-des-formes", nom: "Quai des formes", image: "quai-des-formes", genre: "Puzzle",
    couleur: "#b0ccc4", unite: "pts", alias: "tetris tetrominos tétriminos blocs chute lignes",
    bref: "Expédie des rangées de caisses et leurs scellés dorés.",
    regle: "Gauche et droite déplacent le colis de quatre caisses. Haut le fait pivoter, bas accélère sa chute et Espace le pose aussitôt. Une rangée pleine quitte le quai. Les scellés dorés expédiés rapportent un bonus. Le rythme accélère toutes les deux rangées."
  },
  {
    id: "carriere-orbitale", nom: "Carrière orbitale", image: "carriere-orbitale", genre: "Pilotage",
    couleur: "#b8bdd6", unite: "pts", alias: "astéroïdes asteroids vaisseau inertie tirs rochers",
    bref: "Fends les rochers pour récolter leur cœur de cristal.",
    regle: "Tourne avec gauche et droite, propulse le vaisseau avec haut et envoie des impulsions avec Espace. Le vaisseau conserve son élan et traverse les bords de l’écran. Les rochers se divisent. Récupère trois cristaux dans chacun des trois secteurs."
  },
  {
    id: "coursier-des-toits", nom: "Coursier des toits", image: "coursier-des-toits", genre: "Réflexes",
    couleur: "#e1b5a3", unite: "pts", alias: "dino runner jeu chrome course sans fin sauts",
    bref: "Livre le courrier par les toits au crépuscule.",
    regle: "Appuie sur haut ou Espace pour sauter les cheminées. Maintiens bas pour passer sous le linge. Les enveloppes ajoutent dix points au score de distance. La course continue aussi longtemps que le chat franchit les obstacles."
  },
  {
    id: "crypte-des-encres", nom: "Crypte des encres", image: "crypte-des-encres", genre: "Aventure",
    couleur: "#c4b1ce", unite: "pts", alias: "donjon textuel rpg inventaire aventure monstres",
    bref: "Rapporte le manuscrit gardé par le relieur d’ombre.",
    regle: "Explore les salles et fouille-les pour trouver des fioles. En combat, frappe ou pare pour préparer une riposte plus forte. Boire une fiole rend huit points de vie et occupe ton tour. Réunis les deux sceaux pour ouvrir la chambre du manuscrit."
  },
  {
    id: "vingt-et-un-du-quai", nom: "Vingt et un du quai", image: "vingt-et-un-du-quai", genre: "Cartes",
    couleur: "#a5c7bb", unite: "jetons", alias: "blackjack black jack 21 vingt et un cartes mise",
    bref: "Huit donnes et quarante jetons au café du quai.",
    regle: "Mise 2, 6 ou 10 jetons fictifs. L’as vaut 1 ou 11 et les figures valent 10. Tire ou reste sans dépasser 21. Le croupier tire jusqu’à 17 et reste sur tout 17. Un blackjack naturel paie 3 pour 2. Une égalité rend la mise. La table ferme après huit donnes."
  },
  {
    id: "gardiens-du-sentier", nom: "Gardiens du sentier", image: "gardiens-du-sentier", genre: "Stratégie",
    couleur: "#b4c996", unite: "pts", alias: "tower defense défense tours vagues chemin",
    bref: "Protège les laitues de cinq vagues d’escargots.",
    regle: "Avant chaque vague, choisis un socle +. Une lanterne coûte trois soleils. Choisis-la à nouveau pour l’améliorer pour quatre soleils. Elle éclaire un escargot à deux cases de distance. Chaque escargot repoussé rapporte un soleil. Protège au moins une laitue jusqu’à la fin."
  },
  {
    id: "dedale-des-sources", nom: "Dédale des sources", image: "dedale-des-sources", genre: "Exploration",
    couleur: "#97c6c1", unite: "pts", alias: "labyrinthe procédural aléatoire maze dédale",
    bref: "Retrouve la sortie d’un réseau de galeries.",
    regle: "Déplace-toi avec les flèches ou les boutons. Tu es le repère @ et la sortie porte un S. Les deux sources ~ sont facultatives et rapportent un bonus. Chaque nouvelle partie creuse un autre labyrinthe."
  },
  {
    id: "nombre-mystere", nom: "Nombre mystère", image: "nombre-mystere", genre: "Déduction",
    couleur: "#ffcc8b", unite: "pts", alias: "Le juste prix devine le nombre console terminal",
    bref: "Retrouve le juste prix en sept essais.",
    regle: "Propose un prix entier de 1 à 100. Après chaque essai, le marchand indique si son prix est plus grand ou plus petit. Tu as sept propositions. Une découverte rapide rapporte davantage de points."
  },
  {
    id: "pierre-feuille-ciseaux", nom: "Pierre-feuille-ciseaux", image: "pierre-feuille-ciseaux", genre: "Duel",
    couleur: "#a4d5c7", unite: "pts", alias: "chifoumi pierre papier ciseaux console terminal",
    bref: "Gagne trois manches contre l’automate.",
    regle: "La pierre casse les ciseaux, les ciseaux coupent la feuille et la feuille enveloppe la pierre. Une égalité relance la manche. Gagne trois manches pour remporter le match."
  },
  {
    id: "mot-suspendu", nom: "Le Pendu de l’imprimerie", image: "mot-suspendu", genre: "Déduction",
    couleur: "#efbd9a", unite: "pts", alias: "le pendu mot suspendu lettres console terminal",
    bref: "Retrouve le mot avant de manquer d’encre.",
    regle: "Clique sur une lettre ou tape-la au clavier. Une bonne lettre révèle toutes ses occurrences, accents compris. Tu disposes de six réserves d’encre pour les erreurs. Proposer à nouveau la même lettre ne coûte rien."
  },
  {
    id: "allumettes", nom: "Jeu des allumettes", image: "allumettes", genre: "Stratégie",
    couleur: "#ffb393", unite: "pts", alias: "nim console terminal",
    bref: "Garde la dernière allumette pour toi.",
    regle: "À tour de rôle, toi et l’automate retirez une, deux ou trois allumettes de la réserve. Celui qui prend la dernière gagne. Tu commences."
  },
  {
    id: "morpion", nom: "Morpion", image: "morpion", genre: "Duel",
    couleur: "#bbcedc", unite: "pts", alias: "tic tac toe ox grille",
    bref: "Aligne trois signes sur une ardoise.",
    regle: "Pose une croix dans une case libre. Les ronds répondent. Le premier à aligner trois signes en ligne, en colonne ou en diagonale gagne. Joue contre l’automate ou à deux sur le même écran."
  },
  {
    id: "quatre-en-ligne", nom: "Quatre en ligne", image: "quatre-en-ligne", genre: "Duel",
    couleur: "#efbd95", unite: "pts", alias: "puissance 4 quatre en ligne connect four",
    bref: "Fais tomber le quatrième jeton de ta ligne.",
    regle: "Choisis une colonne pour y lâcher un jeton. Relie quatre jetons de ta couleur à l’horizontale, à la verticale ou en diagonale. Joue en solo ou passe la main à une autre personne."
  },
  {
    id: "bataille-navale", nom: "Bataille navale", image: "bataille-navale", genre: "Stratégie",
    couleur: "#9acdd4", unite: "pts", alias: "flotte bateaux",
    bref: "Retrouve la flottille de papier adverse.",
    regle: "Place tes trois bateaux sur ton bassin. Tu peux les faire pivoter ou demander un placement automatique. Ensuite, vise une coordonnée adverse à chaque tour. Les croix indiquent les touches, les points les tirs à l’eau. Coule les trois bateaux adverses pour gagner."
  },
  {
    id: "champ-de-balises", nom: "Champ de balises", image: "champ-de-balises", genre: "Déduction",
    couleur: "#bcd79e", unite: "pts", alias: "démineur minesweeper drapeaux",
    bref: "Un démineur de poche à dix fanions.",
    regle: "Ouvre toutes les cases sûres. Chaque chiffre compte les mines qui le touchent, diagonales comprises. La première ouverture est sûre. Utilise le bouton Fanion ou le clic droit pour marquer ou démarquer une case."
  },
  {
    id: "ruban-des-bois", nom: "Ruban des bois", image: "ruban-des-bois", genre: "Réflexes",
    couleur: "#aacb90", unite: "pts", alias: "snake serpent pygame",
    bref: "Guide un serpent de lianes vers douze baies.",
    regle: "Dirige le serpent avec les flèches, ZQSD ou les boutons tactiles. Il avance en continu et grandit à chaque baie. Évite les bordures et son corps. Chaque quatrième baie est dorée et vaut triple."
  },
  {
    id: "duel-de-lanternes", nom: "Duel de lanternes", image: "duel-de-lanternes", genre: "Duel",
    couleur: "#dfb0ae", unite: "pts", alias: "pong raquettes pygame",
    bref: "Renvoie le volant et allume le ponton.",
    regle: "Monte ou descends la raquette turquoise avec les flèches, Z/S ou les boutons tactiles. Le point d’impact change l’angle du renvoi. Vise la lanterne pour un bonus. Le premier à marquer cinq points remporte le duel."
  },
  {
    id: "atelier-vitrail", nom: "Atelier vitrail", image: "atelier-vitrail", genre: "Précision",
    couleur: "#c2b1d6", unite: "pts", alias: "casse briques breakout pygame",
    bref: "Détache une rosace avec trois billes.",
    regle: "Déplace la barre avec les flèches ou Q/D. Lance la bille avec Espace ou le bouton rond. Une pièce étoilée détache aussi les verres voisins de la même couleur. Termine la rosace avec trois billes."
  },
  {
    id: "veille-de-saturne", nom: "Veille de Saturne", image: "veille-de-saturne", genre: "Pilotage",
    couleur: "#b0bedf", unite: "pts", alias: "space invaders shoot em up pygame",
    bref: "Disperse trois nuées au pollen cosmique.",
    regle: "Déplace le vaisseau-jardinier avec les flèches ou Q/D. Maintiens Espace ou le bouton rond pour tirer du pollen. Disperse les trois nuées en évitant les gouttes ambrées. Ta coque supporte trois impacts."
  },
  {
    id: "ligne-de-crete", nom: "Ligne de crête", image: "ligne-de-crete", genre: "Réflexes",
    couleur: "#ffba94", niveaux: 3, unite: "pts",
    bref: "Saute d’une corniche à l’autre.",
    intro: "Le fanion se rapproche, la roche défile. Choisis le bon instant pour sauter au-dessus de chaque crevasse.",
    regle: "Appuie sur Espace ou sur Sauter quand une crevasse approche. Tu ne peux reprendre appui qu’au sol. Rejoins le fanion avant de perdre tes trois vies."
  },
  {
    id: "marees-douces", nom: "Marées douces", image: "marees-douces", genre: "Stratégie",
    couleur: "#bcdfac", niveaux: 3, unite: "marées",
    bref: "Réunis les eaux de l’archipel.",
    intro: "La marée part du coin marqué d’une ancre. Change sa couleur pour réunir les bassins en une seule baie.",
    regle: "Choisis un symbole pour recolorer la zone de l’ancre. Les cases voisines de même symbole la rejoignent. Recouvre toute la baie avant d’épuiser tes marées."
  },
  {
    id: "astrographe", nom: "Astrographe", image: "astrographe", genre: "Puzzle",
    couleur: "#b9dbe5", niveaux: 3, unite: "essais", uniteSingulier: "essai",
    bref: "Trace une constellation d’un seul trait.",
    intro: "D’une étoile à l’autre, relie tout le ciel. Chaque trait de la constellation ne peut servir qu’une fois.",
    regle: "Choisis une étoile de départ, puis des étoiles reliées à ta position. Parcours chaque trait exactement une fois. Tu peux revenir d’un trait avec Annuler."
  },
  {
    id: "bulle-de-fond", nom: "Bulle de fond", image: "bulle-de-fond", genre: "Pilotage",
    couleur: "#acd9dd", niveaux: 3, unite: "pts",
    bref: "Pilote un sous-marin entre les coraux.",
    intro: "Le petit submersible dérive entre les coraux. Une poussée le fait remonter, un relâchement le laisse descendre.",
    regle: "Maintenir Espace ou Remonter fait monter le sous-marin. Relâche pour descendre. Traverse les ouvertures entre les coraux avec tes trois points de coque."
  },
  {
    id: "cargaison-neuf", nom: "Cargaison Neuf", image: "cargaison-neuf", genre: "Puzzle",
    couleur: "#b9dbe5", niveaux: 3, unite: "poses",
    bref: "Emboîte les colis dans la cale.",
    intro: "Chaque colis a une forme. Trouve sa place dans la cale pour que le navire puisse quitter le port.",
    regle: "Sélectionne une pièce, tourne-la si besoin puis touche une case. Cette case accueille le premier carré de la pièce, repéré par un point dans l’aperçu. Touche un colis posé pour le reprendre. Remplis toute la cale."
  },
  {
    id: "nuit-des-lucioles", nom: "Nuit des lucioles", image: "nuit-des-lucioles", genre: "Puzzle",
    couleur: "#b9dbe5", niveaux: 3, unite: "gestes",
    bref: "Rallume une clairière de lucioles.",
    intro: "Une luciole s’éveille, ses voisines changent d’état. Fais briller toute la clairière dans la même nuit.",
    regle: "Touche une luciole pour inverser son état et celui de ses voisines du haut, du bas, de gauche et de droite. Allume toute la clairière en aussi peu de gestes que possible."
  },
  {
    id: "cadence-cuivre", nom: "Cadence cuivre", image: "cadence-cuivre", genre: "Rythme",
    couleur: "#f2c595", niveaux: 3, unite: "pts",
    bref: "Joue les notes sur trois percussions.",
    intro: "Les notes descendent vers les cuivres. Attrape le tempo à l’oreille ou en regardant la ligne dorée.",
    regle: "Frappe la bonne piste quand sa note arrive sur la ligne dorée. Utilise les touches 1, 2 et 3 ou les trois boutons. Chaque note manquée ou frappe à vide coûte une vie."
  },
  {
    id: "code-corail", nom: "Code corail", image: "code-corail", genre: "Déduction",
    couleur: "#efbdab", niveaux: 3, unite: "essais", uniteSingulier: "essai",
    bref: "Déduis la combinaison de coquillages.",
    intro: "Le coffre de la crique s’ouvre avec trois coquillages. Chaque essai révèle un indice sur leur ordre.",
    regle: "Compose une rangée de trois coquillages, puis valide. L’indice distingue les coquillages bien placés de ceux présents ailleurs. Un même coquillage peut apparaître plusieurs fois."
  },
  {
    id: "herbier-minute", nom: "Herbier minute", image: "herbier-minute", genre: "Mémoire",
    couleur: "#dabee7", niveaux: 3, unite: "essais",
    bref: "Retrouve les paires de feuilles.",
    intro: "Les pages du carnet cachent des feuilles deux par deux. Retrouve les paires et complète l’herbier.",
    regle: "Retourne deux cartes. Une paire identique reste visible. Si elles diffèrent, mémorise-les puis touche une autre carte pour les recouvrir et poursuivre. Termine avec le moins de paires essayées."
  },
  {
    id: "passe-montagne", nom: "Passe-montagne", image: "passe-montagne", genre: "Stratégie",
    couleur: "#bcdfac", niveaux: 3, unite: "pas",
    bref: "Atteins le refuge à la bonne altitude.",
    intro: "Chaque pas ajoute un peu de dénivelé. Trace un sentier jusqu’au refuge avec le total exact.",
    regle: "Pars du drapeau et touche une case voisine par un côté. Son nombre s’ajoute à ton dénivelé. Rejoins le refuge avec le total demandé, sans repasser sur une case. Annuler te ramène au pas précédent."
  },
  {
    id: "aimant-express", nom: "Aimant Express", image: "aimant-express", genre: "Réflexes",
    couleur: "#ffba94", niveaux: 3, unite: "pts",
    bref: "Ramasse les pièces de la bonne polarité.",
    intro: "La fonderie lâche ses pièces sur trois rails. Place le chariot, règle son aimant et laisse filer les scories.",
    regle: "Déplace le chariot avec ← et →. Espace inverse sa polarité. Attrape les pièces + ou − avec le signe correspondant et évite les scories ×. Une pièce manquée peut être remplacée par la suivante."
  },
  {
    id: "petit-eclusier", nom: "Le Petit Éclusier", image: "petit-eclusier", genre: "Stratégie",
    couleur: "#bcdfac", niveaux: 3, unite: "manœuvres",
    bref: "Mesure l’eau du canal.",
    intro: "Deux bassins, une péniche et un volume précis à atteindre. Dose l’eau avant d’ouvrir l’écluse.",
    regle: "Remplis, vide ou transvase les deux bassins. Un transvasement s’arrête quand le premier bassin est vide ou le second plein. Obtiens le volume demandé dans l’un des deux."
  },
  {
    id: "trame-indigo", nom: "Trame indigo", image: "trame-indigo", genre: "Puzzle",
    couleur: "#b9dbe5", niveaux: 3, unite: "décalages",
    bref: "Recompose le motif du métier à tisser.",
    intro: "Le métier a décalé les fils. Ramène chaque couleur à sa place pour reproduire le motif de l’atelier.",
    regle: "Compare l’étoffe au modèle. Chaque bouton décale d’une case toute une ligne vers la droite ou toute une colonne vers le bas. Le fil sorti réapparaît de l’autre côté."
  },
  {
    id: "quai-des-valises", nom: "Quai des valises", image: "quai-des-valises", genre: "Stratégie",
    couleur: "#bcdfac", niveaux: 3, unite: "opérations",
    bref: "Remets les bagages dans l’ordre.",
    intro: "Le train attend ses valises dans un ordre précis. Une consigne permet de mettre les bagages encombrants de côté.",
    regle: "Expédie la première valise du tapis si elle correspond au prochain numéro. Sinon, range-la sur la pile de consigne. Seule la dernière valise rangée peut ressortir."
  },
  {
    id: "orbites-postales", nom: "Orbites postales", image: "orbites-postales", genre: "Précision",
    couleur: "#e6c6e8", niveaux: 3, unite: "pts",
    bref: "Livre les capsules au relais orbital.",
    intro: "Le satellite tourne. Expédie ta capsule au moment où le relais entre dans son axe.",
    regle: "Appuie sur Espace ou Expédier pour lancer une capsule dans la direction du satellite. La capsule met un court instant à atteindre l’orbite extérieure. Anticipe le mouvement du relais doré."
  },
  {
    id: "minuit-au-phare", nom: "Minuit au phare", image: "minuit-au-phare", genre: "Puzzle",
    couleur: "#a9d8ca", niveaux: 4, unite: "pivots", uniteSingulier: "pivot",
    intro: "Le bateau attend au large. Oriente les miroirs pour éclairer les bouées et lui ouvrir un passage dans la nuit.",
    bref: "Guide le bateau d’un rayon de lumière.",
    regle: "Le phare éclaire vers la droite. Touche un miroir pour le faire pivoter, ou sélectionne-le avec Tab puis Entrée. Le même faisceau doit traverser toutes les bouées et finir sur le bateau. Ton record compte les pivots de chaque carte."
  },
  {
    id: "ricochet-radio", nom: "Ricochet Radio", image: "ricochet-radio", genre: "Réflexes",
    couleur: "#ffd19e", unite: "points",
    intro: "Trois stations attendent le retour du signal. Glisse ton antenne sous l’onde et vise la bande dorée pour un accord parfait.",
    bref: "Fais rebondir le signal sur ton antenne.",
    regle: "Déplace l’antenne avec les flèches ← et →, la souris ou le doigt sur le cadran. Le curseur sous l’écran fonctionne aussi. Chaque retour vaut 100 points, ou 160 sur le repère doré. Les bords de l’antenne dévient le signal. Raccorde trois stations avec tes trois vies."
  },
  {
    id: "poste-polaire", nom: "Poste Polaire", image: "poste-polaire", genre: "Puzzle",
    couleur: "#b4e2eb", niveaux: 3, unite: "glissades",
    intro: "Une sacoche, des lettres et une banquise sans freins. Trace ta tournée jusqu’au petit bureau orange.",
    bref: "Livre le courrier en glissant sur la glace.",
    regle: "Choisis une direction avec les flèches ou glisse le doigt sur la carte. Le facteur file jusqu’au bord de la glace ou jusqu’à un rocher. Passe sur toutes les enveloppes, puis arrête-toi au bureau orange. Essaie de livrer en un minimum de glissades."
  },
  {
    id: "halte-lunaire", nom: "Halte Lunaire", image: "halte-lunaire", genre: "Pilotage",
    couleur: "#edd4ac", niveaux: 3, unite: "%",
    intro: "Derniers mètres avant le quai. Dose tes propulseurs et pose le module sur trois escales lunaires.",
    bref: "Pose ton module en douceur sur la Lune.",
    regle: "Maintiens ← ou → pour te déplacer et ↑ pour freiner la descente. Sur écran tactile, maintiens les boutons sous le paysage. Pose les deux patins sur la bande dorée. La dérive et la descente doivent rester sous les limites affichées au contact. Ton record mesure le carburant restant."
  },
  {id:"dernier-metro", nom:"Dernier Métro", image:"metro", genre:"Puzzle", couleur:"#ffc299", niveaux:3, intro:"La ville s’endort. Fais pivoter les rails pour guider le dernier métro jusqu’au terminus.", bref:"Relie les stations avant le terminus.", unite:"coups", regle:"Fais pivoter chaque rail d’un quart de tour. Relie le départ D à l’arrivée A en utilisant le moins de coups possible."},
  {id:"pepiniere", nom:"Pépinière", image:"jardin", genre:"Stratégie", couleur:"#c6df9f", intro:"Une parcelle, douze arrosages et un jardin à faire fleurir. Choisis bien où tombe la pluie.", bref:"Fais fleurir ton carré de jardin.", unite:"fleurs", regle:"Tu as 12 arrosages pour faire éclore 6 fleurs. La case choisie gagne 2 pousses et ses voisines directes 1. Une plante fleurit à 4 pousses. Une fleur fait de l’ombre à la case juste en dessous, qui ne profite alors que de l’arrosage direct."},
  {id:"echo", nom:"Écho", image:"echo", genre:"Mémoire", couleur:"#e5b7f5", intro:"Les balises s’allument puis s’effacent. Retrouve le trajet de mémoire, une case après l’autre.", bref:"Mémorise le trajet des balises.", unite:"manches", regle:"Observe pendant deux secondes le trajet numéroté. Quand il disparaît, touche les cases dans le même ordre. Termine les 6 manches avec tes 3 vies."},
  {id:"tri-express", nom:"Tri Express", image:"tri", genre:"Réflexes", couleur:"#ffdc88", intro:"Le tapis tourne et les colis arrivent. Lis la consigne et dirige chacun vers le bon quai.", bref:"Aiguille les colis vers le bon quai.", unite:"colis", regle:"Trie le premier colis du tapis d’après la consigne affichée. Utilise les boutons ou les flèches du clavier. La consigne change tous les 5 colis traités. Tiens 45 secondes sans faire 3 erreurs ni laisser s’accumuler plus de 5 colis."}
];
const racine = document.body.dataset.jeu ? "../" : "";
function lire(cle) {
  try { return JSON.parse(localStorage.getItem("poche-arcade."+cle)); } catch { return null; }
}
function sauver(cle, valeur) {
  try { localStorage.setItem("poche-arcade."+cle, JSON.stringify(valeur)); } catch { /* Stockage facultatif. */ }
}
function record(cle, score, minimum=false) {
  const avant=lire(cle);
  if (!Number.isFinite(avant) || (minimum ? score<avant : score>avant)) sauver(cle,score);
}
function resumeRecord(jeu) {
  if (jeu.niveaux) {
    const scores = Array.from({length: jeu.niveaux}, (_, i) => lire(jeu.id + "." + i));
    if (!scores.some(Number.isFinite)) return "À découvrir";
    return scores.map((s, i) => {
      const unite = s === 1 && jeu.uniteSingulier ? jeu.uniteSingulier : jeu.unite;
      return "N" + (i + 1) + " · " + (Number.isFinite(s) ? s + " " + unite : "—");
    }).join(" / ");
  }
  const score=lire(jeu.id);
  return Number.isFinite(score) ? score+" "+jeu.unite : "À découvrir";
}
let sonActif=lire("son")===true, audioCtx;
function son(frequence=440) {
  if (!sonActif) return;
  try {
    audioCtx ??= new AudioContext();
    if (audioCtx.state==="suspended") audioCtx.resume().catch(()=>{});
    const note=audioCtx.createOscillator(), gain=audioCtx.createGain(), t=audioCtx.currentTime;
    note.type="triangle"; note.frequency.value=frequence;
    gain.gain.setValueAtTime(.08,t); gain.gain.exponentialRampToValueAtTime(.001,t+.13);
    note.connect(gain); gain.connect(audioCtx.destination); note.start(); note.stop(t+.14);
  } catch { /* Le jeu fonctionne aussi en silence. */ }
}
const sonIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3z"/><path class="onde" d="M15 8q5 4 0 8m3-11q8 7 0 14"/><path class="muet" d="m16 9 6 6m0-6-6 6"/></svg>';
document.querySelector("#navigation").innerHTML='<div class="wrap nav"><a class="brand" href="'+racine+'index.html"><img src="'+racine+'assets/poche.svg" alt="">Poche <strong>Arcade</strong></a><nav aria-label="Navigation principale"><a class="nav-home" href="'+racine+'index.html">Salle d’arcade</a><button class="record-link">Mes records</button><button class="sound" aria-label="Son des jeux">'+sonIcon+'</button></nav></div>';
const interrupteur=document.querySelector(".sound");
function afficherSon() {interrupteur.setAttribute("aria-pressed",String(sonActif)); interrupteur.title=sonActif?"Couper le son":"Activer le son";}
interrupteur.onclick=()=>{sonActif=!sonActif; sauver("son",sonActif); afficherSon(); son(660);};
afficherSon();
const palmares=document.createElement("dialog");
palmares.setAttribute("aria-labelledby","palmares-titre");
palmares.innerHTML='<div class="dialog-title"><h2 id="palmares-titre">Mes records</h2><button aria-label="Fermer">×</button></div><p>Les meilleurs résultats de ce navigateur.</p><div class="scores"></div>';
document.body.append(palmares);
document.querySelector(".record-link").onclick=()=>{
  palmares.querySelector(".scores").replaceChildren(...jeux.map(j=>{
    const row=document.createElement("div"); row.className="score-row";
    const title=document.createElement("strong"), val=document.createElement("span");
    title.textContent=j.nom; val.textContent=resumeRecord(j); row.append(title,val); return row;
  }));
  palmares.showModal();
};
palmares.querySelector("button").onclick=()=>palmares.close();
palmares.onclick=e=>{if(e.target===palmares && (e.offsetX<0 || e.offsetX>palmares.clientWidth || e.offsetY<0 || e.offsetY>palmares.clientHeight)) palmares.close();};

