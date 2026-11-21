"""Sentier sans revisite et dénivelé exact au refuge."""

CARTES = [
    (3, [0,2,3, 1,3,1, 2,4,0], 6),
    (4, [0,3,-1,2, 1,5,2,3, 2,1,3,4, -1,3,2,0], 16),
    (5, [0,2,3,-1,4, 1,-1,2,4,1, 3,2,5,-1,3, 4,-1,1,2,0], 21),
]


class Partie:
    def __init__(self, niveau, graine=0):
        self.largeur, self.cases, self.cible = CARTES[niveau]
        self.chemin = [0]
        self.altitude = 0
        self.coups = 0
        self.etat = "jeu"
        self.message = "Choisis ton premier pas depuis le drapeau."

    def jouer(self, action, valeur):
        if self.etat != "jeu":
            return
        if action == "annuler" and len(self.chemin) > 1:
            self.altitude -= self.cases[self.chemin.pop()]
            self.coups -= 1
            self.message = "Retour à l’étape précédente."
            return
        if action != "case":
            return
        origine = self.chemin[-1]
        distance = abs(valeur % self.largeur - origine % self.largeur) + abs(valeur // self.largeur - origine // self.largeur)
        if valeur in self.chemin or self.cases[valeur] < 0 or distance != 1:
            self.message = "Choisis une case voisine encore libre."
            return
        nouveau = self.altitude + self.cases[valeur]
        refuge = valeur == len(self.cases) - 1
        if nouveau > self.cible or (refuge and nouveau != self.cible):
            self.message = "Le refuge exige le dénivelé exact. Essaie un autre sentier."
            return
        self.altitude = nouveau
        self.chemin.append(valeur)
        self.coups += 1
        self.message = "Sentier tracé. Tu peux revenir d’un pas."
        if refuge:
            self.etat = "gagne"
            self.message = "Tu arrives au refuge avec le bon dénivelé !"

