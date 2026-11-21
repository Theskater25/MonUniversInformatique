LIGNES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]]


class Partie:
    def __init__(self, graine, mode=0):
        self.mode = mode
        self.plateau = [0 for i in range(9)]
        self.tour = 1
        self.coups = 0
        self.ligne = []
        self.etat = 0
        self.points = 0
        self.message = "Les croix ouvrent la partie."

    def alignement(self, pion):
        for ligne in LIGNES:
            if all([self.plateau[i] == pion for i in ligne]):
                return ligne
        return []

    def poser(self, i):
        self.plateau[i] = self.tour
        self.coups += 1
        self.ligne = self.alignement(self.tour)
        if len(self.ligne) > 0:
            self.etat = 1 if self.tour == 1 or self.mode == 1 else -1
            self.points = 10 - self.coups
            self.message = "Les croix gagnent !" if self.tour == 1 else "Les ronds gagnent !"
        elif self.coups == 9:
            self.etat = 2
            self.message = "Grille complète. Match nul !"
        else:
            self.tour = 3 - self.tour
            self.message = "Aux croix de jouer." if self.tour == 1 else "Aux ronds de jouer."

    def choix_auto(self):
        for pion in [2, 1]:
            for i in range(9):
                if self.plateau[i] == 0:
                    self.plateau[i] = pion
                    gagne = len(self.alignement(pion)) > 0
                    self.plateau[i] = 0
                    if gagne:
                        return i
        for i in [4, 0, 2, 6, 8, 1, 3, 5, 7]:
            if self.plateau[i] == 0:
                return i
        return -1

    def jouer(self, i):
        if self.etat != 0 or i < 0 or i >= 9 or self.plateau[i] != 0:
            return
        self.poser(i)
        if self.etat == 0 and self.mode == 0:
            self.poser(self.choix_auto())

    def mesures(self):
        return [["Coups", self.coups], ["Mode", "Duo" if self.mode == 1 else "Solo"]]
