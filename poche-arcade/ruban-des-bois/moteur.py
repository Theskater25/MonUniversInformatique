DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]]
OPPOSEES = [1, 0, 3, 2]


class Partie:
    """Un serpent de lianes récolte douze baies dans un sous-bois."""

    def __init__(self, graine, mode=0):
        self.nom = "Ruban des bois"
        self.aide = "Flèches ou ZQSD pour tourner. Récolte douze baies."
        self.boutons = [0, 2, 3, 1]
        self.fond = "#162e30"
        self.decor = [["r", 13, 5, 294, 182, "#9d8457"], ["r", 16, 8, 288, 176, "#264641"]]
        for y in range(11):
            for x in range(18):
                if (x + y) % 2 == 0:
                    self.decor.append(["r", 16 + 16 * x, 8 + 16 * y, 16, 16, "#2c4b43"])
                if (x * 7 + y * 5) % 13 == 0:
                    self.decor.append(["r", 18 + 16 * x, 10 + 16 * y, 2, 3, "#44634a"])
        self.graine = graine
        self.corps = [[5, 5], [4, 5], [3, 5]]
        self.direction = 1
        self.virages = []
        self.attente = 14
        self.recolte = 0
        self.points = 0
        self.etat = 0
        self.message = "Les baies dorées comptent triple."
        self.semer()

    def semer(self):
        libres = []
        for y in range(11):
            for x in range(18):
                if [x, y] not in self.corps:
                    libres.append([x, y])
        self.graine = (self.graine * 9301 + 49297) % 233280
        self.baie = libres[int(self.graine * len(libres) / 233280)]

    def avancer(self, touches, appuis):
        if self.etat != 0:
            return
        for i in range(4):
            if appuis[i] and len(self.virages) < 2:
                avant = self.virages[-1] if len(self.virages) > 0 else self.direction
                if i != avant and i != OPPOSEES[avant]:
                    self.virages.append(i)
        self.attente -= 1
        if self.attente > 0:
            return
        self.attente = max(7, 14 - int(self.recolte / 2))
        if len(self.virages) > 0:
            self.direction = self.virages.pop(0)
        vecteur = DIRECTIONS[self.direction]
        tete = [self.corps[0][0] + vecteur[0], self.corps[0][1] + vecteur[1]]
        mange = tete == self.baie
        obstacle = self.corps if mange else self.corps[:-1]
        if tete[0] < 0 or tete[0] >= 18 or tete[1] < 0 or tete[1] >= 11 or tete in obstacle:
            self.etat = -1
            self.message = "Le ruban s’est emmêlé. Récolte : " + str(self.recolte) + " / 12."
            return
        self.corps.insert(0, tete)
        if mange:
            self.recolte += 1
            self.points += 30 if self.recolte % 4 == 0 else 10
            if self.recolte == 12:
                self.etat = 1
                self.message = "Les douze baies sont au panier !"
            else:
                self.semer()
        else:
            self.corps.pop()

    def dessin(self):
        x = 16 + self.baie[0] * 16
        y = 8 + self.baie[1] * 16
        teinte = "#ffca62" if self.recolte % 4 == 3 else "#f87870"
        formes = [["e", x + 3, y + 5, 10, 9, teinte], ["r", x + 7, y + 3, 5, 3, "#a9cf77"],
                  ["r", x + 5, y + 7, 2, 2, "#fff0ba"]]
        for i in range(len(self.corps) - 1, -1, -1):
            segment = self.corps[i]
            x = 16 + segment[0] * 16
            y = 8 + segment[1] * 16
            couleur = "#d6df83" if i == 0 else "#75b87a"
            formes.append(["r", x + 1, y + 1, 14, 14, "#153a37"])
            formes.append(["r", x + 2, y + 2, 12, 11, couleur])
            formes.append(["r", x + 4, y + 3, 6, 2, "#c8dd95"])
            if i == 0:
                dx = DIRECTIONS[self.direction][0]
                dy = DIRECTIONS[self.direction][1]
                for ecart in [-3, 3]:
                    formes.append(["r", x + 7 + dx * 4 + dy * ecart, y + 7 + dy * 4 + dx * ecart, 2, 2, "#233a37"])
        return formes

    def mesures(self):
        return [["Baies", str(self.recolte) + " / 12"], ["Score", self.points]]
