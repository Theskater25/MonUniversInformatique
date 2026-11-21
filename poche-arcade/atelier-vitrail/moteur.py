MOTIF = ["...011...", ".1223321.", "001333100", ".1223321.", "...011..."]
VERRES = ["#7accc6", "#f38c76", "#bb9bd5", "#f3ca74"]


class Partie:
    """Les pièces étoilées brisent aussi leurs voisines de la même couleur."""

    def __init__(self, graine, mode=0):
        self.nom = "Atelier vitrail"
        self.aide = "Flèches gauche et droite pour la barre. Espace pour lancer la bille."
        self.boutons = [0, 4, 1]
        self.fond = "#28293d"
        self.decor = [["r", 0, 0, 5, 192, "#8c736c"], ["r", 315, 0, 5, 192, "#8c736c"],
                      ["r", 0, 0, 320, 5, "#a88972"], ["r", 6, 164, 308, 1, "#484052"]]
        self.pieces = []
        for y in range(len(MOTIF)):
            for x in range(len(MOTIF[y])):
                signe = MOTIF[y][x]
                if signe != ".":
                    self.pieces.append([25 + 30 * x, 20 + 14 * y, int(signe), (x + 2 * y) % 4 == 0])
                    self.decor.append(["r", 25 + 30 * x, 20 + 14 * y, 28, 12, "#393747"])
        self.total = len(self.pieces)
        self.barre = 160
        self.vies = 3
        self.points = 0
        self.etat = 0
        self.service = True
        self.x = 160
        self.y = 165
        self.vx = 1.15 if graine % 2 else -1.15
        self.vy = -1.9
        self.message = "Vise les pièces étoilées pour détacher les verres voisins de même couleur."

    def briser(self, i):
        morceau = self.pieces.pop(i)
        self.points += 10
        if morceau[3]:
            for n in range(len(self.pieces) - 1, -1, -1):
                voisin = self.pieces[n]
                if voisin[2] == morceau[2] and abs(voisin[0] - morceau[0]) + abs(voisin[1] - morceau[1]) <= 30:
                    self.pieces.pop(n)
                    self.points += 15
        if len(self.pieces) == 0:
            self.etat = 1
            self.message = "Le vitrail laisse passer toute la lumière !"

    def avancer(self, touches, appuis):
        if self.etat != 0:
            return
        self.barre = max(28, min(292, self.barre + (int(touches[1]) - int(touches[0])) * 3.2))
        if self.service:
            self.x = self.barre
            self.y = 166
            if not appuis[4]:
                return
            self.service = False
        avant_x = self.x
        avant_y = self.y
        self.x += self.vx
        self.y += self.vy
        if self.x <= 8 or self.x >= 312:
            self.x = max(8, min(312, self.x))
            self.vx = -self.vx
        if self.y <= 8:
            self.y = 8
            self.vy = abs(self.vy)
        if self.vy > 0 and avant_y <= 169 and self.y >= 169 and abs(self.x - self.barre) <= 25:
            self.y = 168
            self.vx = (self.x - self.barre) * 0.118
            if abs(self.vx) < 0.38:
                self.vx = 0.38 if self.vx >= 0 else -0.38
            self.vy = -max(1.38, 2.45 - abs(self.vx) * 0.28)
        for i in range(len(self.pieces)):
            verre = self.pieces[i]
            if verre[0] - 3 <= self.x <= verre[0] + 30 and verre[1] - 3 <= self.y <= verre[1] + 14:
                if avant_y < verre[1] - 3 or avant_y > verre[1] + 14:
                    self.y = avant_y
                    self.vy = -self.vy
                else:
                    self.x = avant_x
                    self.vx = -self.vx
                self.briser(i)
                break
        if self.y > 195:
            self.vies -= 1
            if self.vies == 0:
                self.etat = -1
                self.message = "La dernière bille est tombée."
            else:
                self.service = True
                self.vx = 1.15 if self.vies % 2 else -1.15
                self.vy = -1.9

    def dessin(self):
        formes = []
        for verre in self.pieces:
            x = verre[0]
            y = verre[1]
            formes.append(["r", x, y, 28, 12, "#5a4655"])
            formes.append(["r", x + 1, y + 1, 25, 9, VERRES[verre[2]]])
            formes.append(["r", x + 3, y + 2, 9, 1, "#ffebcb"])
            if verre[3]:
                formes.append(["r", x + 18, y + 2, 2, 6, "#fff2cc"])
                formes.append(["r", x + 16, y + 4, 6, 2, "#fff2cc"])
        formes.append(["r", self.barre - 23, 172, 46, 7, "#b3735b"])
        formes.append(["r", self.barre - 21, 172, 42, 3, "#f7ca83"])
        formes.append(["e", self.x - 3, self.y - 3, 6, 6, "#fff2c4"])
        return formes

    def mesures(self):
        return [["Verres", str(self.total - len(self.pieces)) + " / " + str(self.total)],
                ["Billes", self.vies], ["Score", self.points]]
