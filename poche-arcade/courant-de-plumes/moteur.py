from moteurs.poche import Hasard


class Partie:
    """Une plume recueille les graines suspendues au milieu de mobiles à vent."""

    def __init__(self, graine, mode=0):
        self.nom = "Courant de plumes"
        self.aide = "Espace ou flèche haut pour donner une impulsion. Traverse les mobiles."
        self.boutons = [4]
        self.raccourcis = [2]
        self.libelles = ["Gauche", "Droite", "Haut", "Bas", "Prendre le vent"]
        self.fond = "#689cab"
        self.decor = [["r", 0, 0, 320, 45, "#6091a6"], ["r", 0, 118, 320, 74, "#91b5aa"]]
        for x in range(-10, 335, 24):
            self.decor.append(["e", x, 139 + x % 9, 43, 40, "#649689"])
            self.decor.append(["e", x + 7, 157 + x % 11, 51, 42, "#477d74"])
        self.hasard = Hasard(graine)
        self.y = 92
        self.vy = -1.15
        self.mobiles = []
        self.portes = 0
        self.graines = 0
        self.points = 0
        self.age = 0
        self.etat = 0
        self.message = "Les graines au centre des passages valent cinq points de plus."
        self.ajouter(205, 94)
        self.ajouter(322, self.mobiles[-1][1])

    def ajouter(self, x, precedent):
        milieu = max(50, min(140, precedent + self.hasard.entier(79) - 39))
        demi = max(27, 38 - int(self.portes / 6))
        self.mobiles.append([x, milieu, demi, False, False])

    def avancer(self, touches, appuis):
        if self.etat:
            return
        self.age += 1
        if appuis[4] or appuis[2]:
            self.vy = -2.25
        self.vy = min(3.0, self.vy + 0.079)
        self.y += self.vy
        vitesse = min(2.35, 1.15 + self.portes * 0.024)
        collision = self.y < 4 or self.y > 185
        for mobile in self.mobiles:
            mobile[0] -= vitesse
            x, milieu, demi = mobile[0], mobile[1], mobile[2]
            if abs(x - 64) < 11 and (self.y - 4 < milieu - demi or self.y + 4 > milieu + demi):
                collision = True
            if not mobile[3] and abs(x - 64) < 7 and abs(self.y - milieu) < 8:
                mobile[3] = True
                self.graines += 1
                self.points += 5
            if not mobile[4] and x < 51:
                mobile[4] = True
                self.portes += 1
                self.points += 10
        if collision:
            self.etat = -1
            self.message = "La plume se pose après " + str(self.portes) + " passage(s)."
            return
        if self.mobiles[0][0] < -15:
            self.mobiles.pop(0)
        if self.mobiles[-1][0] < 225:
            self.ajouter(self.mobiles[-1][0] + 112 + self.hasard.entier(18), self.mobiles[-1][1])

    def dessin(self):
        formes = []
        for i in range(4):
            x = (1000 + i * 95 - (int(self.age / 4) % 360)) % 360 - 22
            y = 22 + i % 3 * 20
            formes.append(["e", x, y, 31, 7, "#b1ced0"])
            formes.append(["e", x + 6, y - 4, 17, 8, "#b1ced0"])
        for mobile in self.mobiles:
            x, haut, bas = mobile[0], mobile[1] - mobile[2], mobile[1] + mobile[2]
            formes.append(["r", x - 1, 0, 2, haut, "#514c59"])
            formes.append(["r", x - 4, haut - 22, 8, 15, "#ce7964"])
            formes.append(["r", x - 6, haut - 7, 12, 5, "#fed395"])
            formes.append(["r", x - 1, bas, 2, 192 - bas, "#54705f"])
            formes.append(["r", x - 6, bas, 12, 5, "#edbe7d"])
            formes.append(["r", x - 4, bas + 6, 8, 15, "#a66b59"])
            if not mobile[3]:
                formes.append(["e", x - 3, mobile[1] - 4, 6, 8, "#ffe4a0"])
                formes.append(["r", x - 1, mobile[1] - 2, 2, 4, "#a37050"])
        y = self.y
        formes.extend([["e", 55, y - 4, 15, 8, "#f7e5b6"], ["r", 59, y - 5, 6, 3, "#e29072"],
                       ["l", 51, y + 6, 69, y - 2, "#7b514f"], ["r", 65, y - 3, 5, 2, "#fff5d4"]])
        return formes

    def mesures(self):
        return [["Passages", self.portes], ["Graines", self.graines], ["Score", self.points]]
