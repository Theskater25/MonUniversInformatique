class Partie:
    """Sept colonnes de six cases, avec chute des jetons et quatre axes de victoire."""

    def __init__(self, graine, mode=0):
        self.mode = mode
        self.graine = graine
        self.plateau = [0 for i in range(42)]
        self.tour = 1
        self.coups = 0
        self.ligne = []
        self.etat = 0
        self.points = 0
        self.message = "Les jetons corail commencent. Choisis une colonne."

    def arrivee(self, colonne):
        for y in range(5, -1, -1):
            i = y * 7 + colonne
            if self.plateau[i] == 0:
                return i
        return -1

    def alignement(self, i, pion):
        for axe in [[1, 0], [0, 1], [1, 1], [1, -1]]:
            ligne = [i]
            for signe in [-1, 1]:
                x = i % 7 + axe[0] * signe
                y = int(i / 7) + axe[1] * signe
                while 0 <= x < 7 and 0 <= y < 6 and self.plateau[y * 7 + x] == pion:
                    ligne.append(y * 7 + x)
                    x += axe[0] * signe
                    y += axe[1] * signe
            if len(ligne) >= 4:
                return ligne
        return []

    def choix_auto(self):
        for pion in [2, 1]:
            for col in range(7):
                i = self.arrivee(col)
                if i >= 0 and len(self.alignement(i, pion)) >= 4:
                    return col
        colonnes = [c for c in [3, 2, 4, 1, 5, 0, 6] if self.arrivee(c) >= 0]
        self.graine = (self.graine * 9301 + 49297) % 233280
        return colonnes[self.graine % min(3, len(colonnes))]

    def poser(self, colonne):
        i = self.arrivee(colonne)
        self.plateau[i] = self.tour
        self.coups += 1
        self.ligne = self.alignement(i, self.tour)
        if len(self.ligne) >= 4:
            self.etat = 1 if self.tour == 1 or self.mode == 1 else -1
            self.points = 43 - self.coups
            self.message = "Les jetons corail gagnent !" if self.tour == 1 else "Les jetons turquoise gagnent !"
        elif self.coups == 42:
            self.etat = 2
            self.message = "Grille pleine. Match nul !"
        else:
            self.tour = 3 - self.tour
            self.message = "Au tour des jetons corail." if self.tour == 1 else "Au tour des jetons turquoise."

    def jouer(self, colonne):
        if self.etat != 0 or colonne < 0 or colonne > 6:
            return
        if self.arrivee(colonne) == -1:
            self.message = "Cette colonne est pleine."
            return
        self.poser(colonne)
        if self.etat == 0 and self.mode == 0:
            self.poser(self.choix_auto())

    def mesures(self):
        return [["Jetons posés", self.coups], ["Mode", "Duo" if self.mode == 1 else "Solo"]]
