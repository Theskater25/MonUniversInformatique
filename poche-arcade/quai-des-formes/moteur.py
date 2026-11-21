from moteurs.poche import Hasard

FORMES = [
    [[0, 0], [1, 0], [2, 0], [3, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [2, 0], [1, 1]], [[0, 0], [0, 1], [1, 1], [2, 1]],
    [[2, 0], [0, 1], [1, 1], [2, 1]], [[1, 0], [2, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [1, 1], [2, 1]]]
PEINTURES = ["#88c7bb", "#d9a377", "#a9b980", "#b39ab7", "#dd8f75", "#80abc5", "#e4c378"]


class Partie:
    """Des colis de quatre caisses et des scellés prioritaires sur un quai de huit travées."""

    def __init__(self, graine, mode=0):
        self.nom = "Quai des formes"
        self.aide = "Gauche/droite pour déplacer, haut pour pivoter, bas pour descendre, Espace pour poser."
        self.boutons = [0, 2, 3, 1, 4]
        self.libelles = ["À gauche", "À droite", "Pivoter", "Descendre", "Poser"]
        self.fond = "#273c48"
        self.decor = [["r", 0, 123, 320, 69, "#345564"], ["r", 0, 170, 320, 22, "#775c51"],
                      ["r", 101, 9, 94, 160, "#a17c5c"], ["r", 104, 12, 88, 154, "#202e38"],
                      ["r", 225, 28, 54, 43, "#23303a"], ["r", 18, 30, 7, 138, "#9a7958"],
                      ["r", 12, 27, 85, 5, "#bb946c"], ["l", 20, 54, 65, 32, "#9a7958"],
                      ["r", 79, 32, 1, 38, "#a4aa95"], ["r", 76, 70, 6, 3, "#e1b581"]]
        for c in range(1, 8):
            self.decor.append(["r", 104 + c * 11, 12, 1, 154, "#2c3941"])
        for y in range(1, 14):
            self.decor.append(["r", 104, 12 + y * 11, 88, 1, "#2c3941"])
        self.hasard = Hasard(graine)
        self.sac = []
        self.grille = [0 for i in range(112)]
        self.points = 0
        self.lignes = 0
        self.scelles = 0
        self.manifeste = 0
        self.etat = 0
        self.message = "Les caisses scellées d’or rapportent un bonus quand leur rangée est expédiée."
        self.suivante = self.tirer()
        self.nouveau()

    def tirer(self):
        if not len(self.sac):
            self.sac = self.hasard.melanger([i for i in range(7)])
        return self.sac.pop()

    def nouveau(self):
        self.forme = self.suivante
        self.suivante = self.tirer()
        self.piece = [p[:] for p in FORMES[self.forme]]
        self.x = 2
        self.y = 0
        self.delai = 0
        self.repetition = 0
        self.manifeste += 1
        self.scelle = self.manifeste % 3 == 1
        if not self.libre(self.x, self.y, self.piece):
            self.etat = -1
            self.message = "Le quai est plein. " + str(self.lignes) + " rangée(s) ont été expédiées."

    def libre(self, x, y, piece):
        for p in piece:
            xx = x + p[0]
            yy = y + p[1]
            if xx < 0 or xx >= 8 or yy < 0 or yy >= 14 or self.grille[yy * 8 + xx]:
                return False
        return True

    def pivoter(self):
        hauteur = max([p[1] for p in self.piece])
        tour = [[hauteur - p[1], p[0]] for p in self.piece]
        for dx in [0, -1, 1, -2, 2]:
            if self.libre(self.x + dx, self.y, tour):
                self.x += dx
                self.piece = tour
                return

    def poser(self):
        for i in range(4):
            p = self.piece[i]
            self.grille[(self.y + p[1]) * 8 + self.x + p[0]] = self.forme + 1 + (10 if self.scelle and i == 0 else 0)
        reste = []
        complets = 0
        marques = 0
        for y in range(14):
            ligne = self.grille[y * 8:y * 8 + 8]
            if 0 not in ligne:
                complets += 1
                marques += len([v for v in ligne if v > 10])
            else:
                reste.extend(ligne)
        self.grille = [0 for i in range(complets * 8)] + reste
        self.lignes += complets
        self.scelles += marques
        self.points += 2 + complets * complets * 40 + marques * 35
        self.nouveau()

    def avancer(self, touches, appuis):
        if self.etat:
            return
        if appuis[2]:
            self.pivoter()
        direction = int(touches[1]) - int(touches[0])
        if direction == 0:
            self.repetition = 0
        else:
            if appuis[0] or appuis[1] or self.repetition == 0:
                if self.libre(self.x + direction, self.y, self.piece):
                    self.x += direction
                self.repetition = 9 if appuis[0] or appuis[1] else 4
            self.repetition = max(0, self.repetition - 1)
        if appuis[4]:
            while self.libre(self.x, self.y + 1, self.piece):
                self.y += 1
            self.poser()
            return
        self.delai += 1
        vitesse = max(5, 37 - int(self.lignes / 2) * 3)
        if self.delai >= vitesse or (touches[3] and (self.delai >= 3 or appuis[3])):
            self.delai = 0
            if self.libre(self.x, self.y + 1, self.piece):
                self.y += 1
            else:
                self.poser()

    def caisse(self, formes, x, y, code):
        couleur = PEINTURES[(code % 10) - 1]
        formes.extend([["r", x, y, 10, 10, "#584a45"], ["r", x + 1, y + 1, 8, 8, couleur],
                       ["l", x + 2, y + 7, x + 7, y + 2, "#7b6959"]])
        if code > 10:
            formes.append(["r", x + 4, y + 3, 3, 4, "#fff0a1"])

    def dessin(self):
        formes = []
        for i in range(112):
            if self.grille[i]:
                self.caisse(formes, 104 + i % 8 * 11, 12 + int(i / 8) * 11, self.grille[i])
        if not self.etat:
            fond = self.y
            while self.libre(self.x, fond + 1, self.piece):
                fond += 1
            for i in range(4):
                p = self.piece[i]
                xx = 104 + (self.x + p[0]) * 11
                formes.append(["r", xx, 20 + (fond + p[1]) * 11, 9, 2, "#77948e"])
                self.caisse(formes, xx, 12 + (self.y + p[1]) * 11, self.forme + 1 + (10 if self.scelle and i == 0 else 0))
        for p in FORMES[self.suivante]:
            self.caisse(formes, 231 + p[0] * 10, 38 + p[1] * 10, self.suivante + 1)
        return formes

    def mesures(self):
        return [["Rangées", self.lignes], ["Scellés", self.scelles], ["Score", self.points]]
