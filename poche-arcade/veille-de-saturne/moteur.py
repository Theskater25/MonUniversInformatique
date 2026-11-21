def triangle(t, periode):
    phase = t % periode
    return 1 - 4 * abs(phase / periode - 0.5)


class Partie:
    """Trois nuées de lucioles cosmiques à disperser avec du pollen."""

    def __init__(self, graine, mode=0):
        self.nom = "Veille de Saturne"
        self.aide = "Flèches gauche et droite pour piloter. Maintiens Espace pour envoyer le pollen."
        self.boutons = [0, 4, 1]
        self.fond = "#20263c"
        self.decor = [["e", 235, 13, 30, 30, "#705963"], ["r", 229, 30, 43, 2, "#aa8872"]]
        for i in range(55):
            x = (graine + i * 73) % 320
            y = (graine % 47 + i * 37) % 190
            self.decor.append(["r", x, y, 2 if i % 4 == 0 else 1, 1, "#827e91"])
        self.x = 160
        self.vies = 3
        self.points = 0
        self.vague = 0
        self.etat = 0
        self.invincible = 0
        self.recharge = 0
        self.graine = graine
        self.message = "Disperse les trois nuées au pollen. Évite les gouttes ambrées."
        self.nuee()

    def nuee(self):
        self.vague += 1
        self.age = 0
        self.ennemis = []
        self.pollens = []
        self.gouttes = []
        self.prochaine = 95
        for i in range(5 + self.vague * 2):
            col = i % 5
            rang = int(i / 5)
            self.ennemis.append([48 + col * 54 + rang * 6, 27 + rang * 24, i])

    def position(self, insecte):
        phase = self.age + insecte[2] * (7 + self.vague * 3)
        x = insecte[0] + triangle(phase, 125 + 8 * self.vague) * (15 + self.vague * 3)
        y = insecte[1] + triangle(phase, 95) * (4 + self.vague) + min(70, self.age * 0.023)
        return [x, y]

    def avancer(self, touches, appuis):
        if self.etat != 0:
            return
        self.age += 1
        self.x = max(11, min(309, self.x + (int(touches[1]) - int(touches[0])) * 2.65))
        self.invincible = max(0, self.invincible - 1)
        self.recharge = max(0, self.recharge - 1)
        if (touches[4] or appuis[4]) and self.recharge == 0:
            self.pollens.append([self.x, 167])
            self.recharge = 12
        for k in range(len(self.pollens) - 1, -1, -1):
            pollen = self.pollens[k]
            pollen[1] -= 3.6
            touche = False
            for i in range(len(self.ennemis) - 1, -1, -1):
                pos = self.position(self.ennemis[i])
                if abs(pollen[0] - pos[0]) <= 8 and abs(pollen[1] - pos[1]) <= 7:
                    self.ennemis.pop(i)
                    self.points += 10 * self.vague
                    touche = True
                    break
            if touche or pollen[1] < 0:
                self.pollens.pop(k)
        if len(self.ennemis) == 0:
            if self.vague == 3:
                self.etat = 1
                self.message = "Les trois nuées ont retrouvé les jardins de Saturne !"
            else:
                self.nuee()
            return
        self.prochaine -= 1
        if self.prochaine <= 0:
            self.graine = (self.graine * 9301 + 49297) % 233280
            insecte = self.ennemis[int(self.graine * len(self.ennemis) / 233280)]
            pos = self.position(insecte)
            derive = max(-0.65, min(0.65, (self.x - pos[0]) / 125))
            self.gouttes.append([pos[0], pos[1] + 6, derive])
            self.prochaine = 65 - 9 * self.vague
        for k in range(len(self.gouttes) - 1, -1, -1):
            goutte = self.gouttes[k]
            goutte[0] += goutte[2]
            goutte[1] += 1.05 + self.vague * 0.24
            if abs(goutte[0] - self.x) <= 8 and abs(goutte[1] - 177) <= 7:
                self.gouttes.pop(k)
                if self.invincible == 0:
                    self.vies -= 1
                    self.invincible = 85
                    if self.vies == 0:
                        self.etat = -1
                        self.message = "Le jardinier rentre à la serre."
                        return
            elif goutte[1] > 193:
                self.gouttes.pop(k)

    def dessin(self):
        formes = []
        for insecte in self.ennemis:
            pos = self.position(insecte)
            x = pos[0]
            y = pos[1]
            aile = "#c8a9db" if insecte[2] % 2 == 0 else "#75c5b5"
            battement = 2 if (int(self.age / 8) + insecte[2]) % 2 == 0 else 0
            formes.append(["e", x - 8, y - 4 - battement, 7, 6, aile])
            formes.append(["e", x + 1, y - 4 - battement, 7, 6, aile])
            formes.append(["r", x - 2, y - 3, 4, 8, "#ebc575"])
            formes.append(["r", x - 1, y + 2, 2, 3, "#fff1bd"])
        for pollen in self.pollens:
            formes.append(["r", pollen[0] - 1, pollen[1] - 3, 3, 6, "#a6f1c0"])
        for goutte in self.gouttes:
            formes.append(["e", goutte[0] - 2, goutte[1] - 3, 5, 7, "#ff9d67"])
        if self.invincible == 0 or int(self.invincible / 6) % 2 == 0:
            formes.append(["r", self.x - 10, 177, 20, 5, "#e29c6e"])
            formes.append(["r", self.x - 5, 174, 10, 10, "#ad7b66"])
            formes.append(["e", self.x - 4, 168, 8, 10, "#a1d9bf"])
            formes.append(["r", self.x - 1, 166, 2, 6, "#d4e4a4"])
        return formes

    def mesures(self):
        return [["Nuée", str(self.vague) + " / 3"], ["Coques", self.vies], ["Score", self.points]]
