"""Une luciole et ses voisines changent ensemble d'état."""


class Partie:
    def __init__(self, niveau, graine=0):
        self.largeur = [3, 4, 5][niveau]
        hauteur = [3, 3, 4][niveau]
        self.cases = [True for _ in range(self.largeur * hauteur)]
        for position in [[0, 5], [1, 4, 6, 10], [0, 3, 6, 12, 14, 18]][niveau]:
            self.inverser(position)
        self.coups = 0
        self.etat = "jeu"
        self.message = "Les points dorés sont déjà allumés."

    def inverser(self, origine):
        for i in range(len(self.cases)):
            dx = abs(i % self.largeur - origine % self.largeur)
            dy = abs(i // self.largeur - origine // self.largeur)
            if dx + dy <= 1:
                self.cases[i] = not self.cases[i]

    def jouer(self, action, valeur):
        if self.etat != "jeu" or action != "case":
            return
        self.inverser(valeur)
        self.coups += 1
        if all(self.cases):
            self.etat = "gagne"
            self.message = "Toute la clairière scintille !"

