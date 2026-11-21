"""Expansion d'une baie par recoloration de sa composante connexe."""

CARTES = [
    ["0012", "0112", "3223", "3313"],
    ["00123", "31223", "31030", "12003", "23111"],
    ["012303", "111023", "203321", "210012", "301223", "033110"],
]


class Partie:
    def __init__(self, niveau, graine=0):
        carte = CARTES[niveau]
        self.largeur = len(carte[0])
        self.cases = [int(c) for c in "".join(carte)]
        self.limite = [6, 9, 12][niveau]
        self.coups = 0
        self.etat = "jeu"
        self.message = "La marée part de l’ancre, en haut à gauche."
        self.explorer()

    def explorer(self):
        self.baie = [0]
        curseur = 0
        while curseur < len(self.baie):
            i = self.baie[curseur]
            curseur += 1
            voisins = [i - self.largeur, i + self.largeur]
            if i % self.largeur:
                voisins.append(i - 1)
            if i % self.largeur < self.largeur - 1:
                voisins.append(i + 1)
            for v in voisins:
                if 0 <= v < len(self.cases) and v not in self.baie and self.cases[v] == self.cases[0]:
                    self.baie.append(v)

    def jouer(self, action, valeur):
        if self.etat != "jeu" or action != "maree" or valeur == self.cases[0]:
            return
        for i in self.baie:
            self.cases[i] = valeur
        avant = len(self.baie)
        self.explorer()
        self.coups += 1
        self.message = "Cases gagnées · " + str(len(self.baie) - avant)
        if len(self.baie) == len(self.cases):
            self.etat = "gagne"
            self.message = "Toute la baie est réunie."
        elif self.coups >= self.limite:
            self.etat = "perdu"
            self.message = "La mer se retire. Essaie un autre ordre de marées."

