"""Placement de pièces tournantes avec un point d'ancrage explicite."""

CALES = [["AAB", "CAB", "CCB"], ["AABB", "ACBD", "CCDD"], ["AAAB", "ACBB", "CCCB", "DDDD"]]


class Partie:
    def __init__(self, niveau, graine=0):
        modele = CALES[niveau]
        self.largeur = len(modele[0])
        self.hauteur = len(modele)
        self.cases = [-1 for _ in range(self.largeur * self.hauteur)]
        self.formes = []
        self.rotation = []
        for lettre in "ABCD":
            points = []
            for y in range(self.hauteur):
                for x in range(self.largeur):
                    if modele[y][x] == lettre:
                        points.append([x, y])
            if points:
                self.formes.append(points)
                self.rotation.append((len(self.formes) + niveau) % 4)
        self.selection = 0
        self.coups = 0
        self.etat = "jeu"
        self.message = "Place le point de la pièce sur une case libre."

    def forme(self):
        points = []
        for point in self.formes[self.selection]:
            x, y = point
            for _ in range(self.rotation[self.selection]):
                x, y = -y, x
            points.append([x, y])
        haut = min([p[1] for p in points])
        ancre = min([p[0] for p in points if p[1] == haut])
        return [[p[0] - ancre, p[1] - haut] for p in points]

    def jouer(self, action, valeur):
        if self.etat != "jeu":
            return
        if action == "piece":
            if valeur not in self.cases:
                self.selection = valeur
            return
        if action == "tourner":
            self.rotation[self.selection] = (self.rotation[self.selection] + 1) % 4
            return
        if action != "case":
            return
        contenu = self.cases[valeur]
        if contenu != -1:
            self.selection = contenu
            self.cases = [-1 if p == contenu else p for p in self.cases]
            self.message = "Colis repris. Choisis sa nouvelle place."
            return
        positions = []
        for dx, dy in self.forme():
            x, y = valeur % self.largeur + dx, valeur // self.largeur + dy
            if not (0 <= x < self.largeur and 0 <= y < self.hauteur) or self.cases[y * self.largeur + x] != -1:
                self.message = "Le colis déborde ou chevauche un autre colis."
                return
            positions.append(y * self.largeur + x)
        for i in positions:
            self.cases[i] = self.selection
        self.coups += 1
        for i in range(len(self.formes)):
            if i not in self.cases:
                self.selection = i
                self.message = "Colis arrimé. Le suivant est prêt."
                return
        self.etat = "gagne"
        self.message = "Cale pleine. Le navire peut appareiller !"

