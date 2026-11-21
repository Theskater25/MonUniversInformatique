from moteurs.poche import Hasard


class Partie:
    def __init__(self, graine, mode=0):
        self.nom = "Coursier des toits"
        self.aide = "Haut ou Espace pour sauter. Maintiens Bas pour te glisser sous le linge."
        self.boutons = [2, 3]
        self.raccourcis = [4]
        self.libelles = ["Gauche", "Droite", "Sauter", "Se baisser", "Sauter"]
        self.fond = "#41485f"
        self.decor = [["e", 236, 19, 29, 29, "#efc895"], ["r", 0, 112, 320, 60, "#8e747d"]]
        for x in range(0, 320, 16):
            y = 111 - (x * 7 % 33)
            self.decor.extend([["r", x, y, 15, 157 - y, "#626479"], ["r", x + 3, y + 6, 3, 5, "#d4ad80"]])
        self.hasard = Hasard(graine)
        self.pied = 155
        self.vy = 0
        self.bas = False
        self.age = 0
        self.distance = 0
        self.franchis = 0
        self.courrier = 0
        self.points = 0
        self.etat = 0
        self.obstacles = [[215, 0, True], [354, 1, True]]
        self.message = "Saute les cheminées, glisse sous les draps et attrape les enveloppes."

    def avancer(self, touches, appuis):
        if self.etat:
            return
        self.age += 1
        vitesse = min(3.1, 1.65 + self.franchis * 0.035)
        self.distance += vitesse
        if (appuis[2] or appuis[4]) and self.pied >= 155:
            self.vy = -4.95
        self.vy += 0.23
        self.pied += self.vy
        if self.pied >= 155:
            self.pied = 155
            self.vy = 0
        self.bas = touches[3] and self.pied == 155
        tete = self.pied - (9 if self.bas else 21)
        for obj in self.obstacles:
            obj[0] -= vitesse
            x, nature = obj[0], obj[1]
            largeur = 15 if nature == 0 else 24
            if x < 60 and x + largeur > 48:
                touche = self.pied > 136 if nature == 0 else (tete < 141 and self.pied > 78)
                if touche:
                    self.etat = -1
                    self.message = "Fin de la tournée après " + str(self.franchis) + " obstacle(s)."
                    return
            if obj[2] and abs(x - 54) < 10 and abs((self.pied - 10) - (101 if nature == 0 else 145)) <= 9:
                self.courrier += 1
                obj[2] = False
            if len(obj) == 3 and x + largeur < 47:
                self.franchis += 1
                obj.append(True)
        if self.obstacles[0][0] < -35:
            self.obstacles.pop(0)
        if self.obstacles[-1][0] < 203:
            x = self.obstacles[-1][0] + 72 + vitesse * 32 + self.hasard.entier(40)
            self.obstacles.append([x, self.hasard.entier(2), True])
        self.points = int(self.distance / 10) + 10 * self.courrier

    def dessin(self):
        formes = [["r", 0, 155, 320, 37, "#975e59"], ["r", 0, 155, 320, 4, "#e5aa78"]]
        for i in range(16):
            x = i * 24 - (int(self.distance) % 24)
            formes.append(["l", x, 161, x - 8, 181, "#734f54"])
            formes.append(["r", x - 4, 174, 19, 2, "#b77865"])
        for objet in self.obstacles:
            x = objet[0]
            if objet[1] == 0:
                formes.extend([["r", x + 2, 135, 11, 20, "#a86e5e"], ["r", x, 132, 15, 6, "#e4ae7e"],
                               ["r", x + 4, 142, 7, 2, "#76545b"]])
            else:
                formes.extend([["l", x - 8, 80, x + 34, 86, "#403b4c"], ["r", x, 85, 24, 55, "#e9c6a9"],
                               ["r", x + 3, 90, 2, 43, "#d0a8a0"], ["r", x + 18, 88, 2, 48, "#d0a8a0"]])
            if objet[2]:
                y = 101 if objet[1] == 0 else 145
                formes.extend([["r", x + 3, y - 3, 7, 5, "#f7dfa1"], ["r", x + 5, y - 1, 3, 1, "#bd855d"]])
        y = self.pied - (9 if self.bas else 17)
        formes.extend([["r", 45, y + 3, 14, 6, "#292c3c"], ["r", 55, y - 1, 8, 8, "#393747"],
                       ["r", 56, y - 4, 2, 4, "#393747"], ["r", 61, y - 4, 2, 4, "#393747"],
                       ["r", 60, y + 1, 2, 2, "#ffda8b"], ["r", 53, y + 5, 7, 2, "#ec8c6c"],
                       ["l", 45, y + 5, 40, y, "#393747"]])
        for x in [46, 55]:
            formes.append(["r", x + (int(self.age / 6) % 2), y + 8, 3, max(2, self.pied - y - 8), "#292c3c"])
        return formes

    def mesures(self):
        return [["Toits", self.franchis], ["Lettres", self.courrier], ["Score", self.points]]
