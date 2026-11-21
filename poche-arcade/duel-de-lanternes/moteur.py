class Partie:
    """Un volant lumineux traverse un ponton et peut allumer sa lanterne centrale."""

    def __init__(self, graine, mode=0):
        self.nom = "Duel de lanternes"
        self.aide = "Flèches haut et bas ou Z/S pour la raquette. Marque cinq points."
        self.boutons = [2, 3]
        self.fond = "#24263d"
        self.decor = [["r", 0, 0, 320, 8, "#63465a"], ["r", 0, 184, 320, 8, "#63465a"]]
        for x in range(4, 320, 16):
            self.decor.append(["r", x, 3, 8, 2, "#d7a278"])
            self.decor.append(["r", x, 187, 8, 2, "#d7a278"])
        for y in range(12, 184, 12):
            self.decor.append(["r", 159, y, 2, 5, "#55485c"])
        self.y = 96
        self.ia = 96
        self.toi = 0
        self.adverse = 0
        self.renvois = 0
        self.feux = 0
        self.points = 0
        self.ticks = graine % 300
        self.etat = 0
        self.message = "Fais passer le volant dans la lanterne pour l’allumer."
        self.service(1)

    def service(self, sens):
        self.x = 160
        self.balle_y = 96
        self.vx = 1.65 * sens
        self.vy = 0.9 if (self.toi + self.adverse + self.ticks) % 2 else -0.9
        self.delai = 42
        self.allumee = False
        self.lanterne = 34 + (self.ticks * 7 + self.toi * 13) % 120

    def avancer(self, touches, appuis):
        if self.etat != 0:
            return
        self.ticks += 1
        self.y = max(24, min(168, self.y + (int(touches[3]) - int(touches[2])) * 2.8))
        cible = 96
        if self.vx > 0:
            cible = self.balle_y + abs(self.ticks % 80 - 40) * 0.34 - 6
        self.ia = max(24, min(168, self.ia + max(-1.22, min(1.22, cible - self.ia))))
        if self.delai > 0:
            self.delai -= 1
            return
        avant = self.x
        self.x += self.vx
        self.balle_y += self.vy
        if self.balle_y <= 11 or self.balle_y >= 181:
            self.balle_y = max(11, min(181, self.balle_y))
            self.vy = -self.vy
        if not self.allumee and (avant - 160) * (self.x - 160) <= 0 and abs(self.balle_y - self.lanterne) < 12:
            self.allumee = True
            self.feux += 1
        if self.vx < 0 and avant >= 22 and self.x <= 22 and abs(self.balle_y - self.y) <= 19:
            self.x = 22
            self.vx = min(3.9, -self.vx + 0.18)
            self.vy = (self.balle_y - self.y) * 0.16
            self.renvois += 1
        elif self.vx > 0 and avant <= 298 and self.x >= 298 and abs(self.balle_y - self.ia) <= 19:
            self.x = 298
            self.vx = -min(3.9, self.vx + 0.18)
            self.vy = (self.balle_y - self.ia) * 0.16
        if self.x < -5 or self.x > 325:
            marque = self.x > 325
            if marque:
                self.toi += 1
            else:
                self.adverse += 1
            if self.toi == 5 or self.adverse == 5:
                self.etat = 1 if self.toi == 5 else -1
                self.message = "Le ponton est à toi !" if self.etat == 1 else "L’autre rive remporte le match."
            else:
                self.service(-1 if marque else 1)
        self.points = self.toi * 100 + self.renvois + self.feux * 10

    def dessin(self):
        lueur = "#ffca69" if self.allumee else "#99775c"
        formes = [["r", 156, self.lanterne - 10, 8, 2, lueur], ["r", 154, self.lanterne - 7, 2, 14, lueur],
                  ["r", 164, self.lanterne - 7, 2, 14, lueur], ["r", 156, self.lanterne + 8, 8, 2, lueur]]
        for x, y, teinte in [[12, self.y, "#7bd1b8"], [301, self.ia, "#f18e78"]]:
            formes.append(["r", x, y - 16, 7, 32, "#514454"])
            formes.append(["r", x + 1, y - 15, 5, 28, teinte])
            formes.append(["r", x + 2, y - 11, 2, 6, "#fff1bd"])
        formes.append(["e", self.x - 5, self.balle_y - 5, 10, 10, "#ad735c"])
        formes.append(["e", self.x - 3, self.balle_y - 3, 6, 6, "#fff2ac"])
        return formes

    def mesures(self):
        return [["Toi", self.toi], ["Autre rive", self.adverse], ["Lanternes", self.feux]]
