from moteurs.poche import Hasard

CAPS = [[100, 0], [92, 38], [71, 71], [38, 92], [0, 100], [-38, 92], [-71, 71], [-92, 38],
        [-100, 0], [-92, -38], [-71, -71], [-38, -92], [0, -100], [38, -92], [71, -71], [92, -38]]


def ecart(a, b, limite):
    return (a - b + limite * 1.5) % limite - limite * 0.5


def proche(x, y, a, b, rayon):
    dx = ecart(x, a, 320)
    dy = ecart(y, b, 192)
    return dx * dx + dy * dy <= rayon * rayon


class Partie:
    def __init__(self, graine, mode=0):
        self.nom = "Carrière orbitale"
        self.aide = "Gauche/droite pour tourner, haut pour propulser, Espace pour fendre les rochers."
        self.boutons = [0, 2, 1, 4]
        self.libelles = ["Pivoter à gauche", "Pivoter à droite", "Propulser", "Bas", "Envoyer une impulsion"]
        self.fond = "#21273b"
        self.decor = []
        for i in range(60):
            self.decor.append(["r", (i * 83 + graine) % 320, (i * 47 + int(graine / 4)) % 192,
                               2 if i % 6 == 0 else 1, 1, "#888b9c"])
        self.hasard = Hasard(graine)
        self.vies = 3
        self.points = 0
        self.secteur = 0
        self.etat = 0
        self.message = "Les plus petits rochers libèrent des cristaux. Ramasse-en trois par secteur."
        self.champ()

    def champ(self):
        self.secteur += 1
        self.cristaux = 0
        self.debris = []
        self.ondes = []
        self.roches = []
        self.x, self.y = 160, 96
        self.vx, self.vy = 0, 0
        self.cap = 12
        self.rotation = 0
        self.recharge = 0
        self.bouclier = 100
        self.poussee = False
        for i in range(2 + self.secteur):
            x = 25 + self.hasard.entier(32) if i % 2 == 0 else 255 + self.hasard.entier(42)
            y = 16 + self.hasard.entier(160)
            vitesse = 0.23 + self.hasard.entier(36) / 100
            self.roches.append([x, y, vitesse if i % 2 == 0 else -vitesse, (self.hasard.entier(91) - 45) / 100, 12])

    def fendre(self, i):
        roche = self.roches.pop(i)
        self.points += 5
        if roche[4] > 4:
            rayon = 7 if roche[4] == 12 else 4
            choix = self.hasard.entier(16)
            dx = CAPS[choix][0] / 150
            dy = CAPS[choix][1] / 150
            for signe in [-1, 1]:
                self.roches.append([(roche[0] + signe * dx * rayon + 320) % 320,
                                    (roche[1] + signe * dy * rayon + 192) % 192,
                                    roche[2] + signe * dx, roche[3] + signe * dy, rayon])
        else:
            self.debris.append([roche[0], roche[1]])

    def avancer(self, touches, appuis):
        if self.etat:
            return
        self.bouclier = max(0, self.bouclier - 1)
        self.recharge = max(0, self.recharge - 1)
        self.rotation = max(0, self.rotation - 1)
        sens = int(touches[1]) - int(touches[0])
        if sens and (self.rotation == 0 or appuis[0] or appuis[1]):
            self.cap = (self.cap + sens + 16) % 16
            self.rotation = 4
        dx = CAPS[self.cap][0] / 100
        dy = CAPS[self.cap][1] / 100
        self.poussee = touches[2]
        self.vx = max(-2.6, min(2.6, self.vx * 0.992 + (dx * 0.065 if self.poussee else 0)))
        self.vy = max(-2.6, min(2.6, self.vy * 0.992 + (dy * 0.065 if self.poussee else 0)))
        self.x = (self.x + self.vx + 320) % 320
        self.y = (self.y + self.vy + 192) % 192
        if (touches[4] or appuis[4]) and self.recharge == 0:
            self.ondes.append([self.x + dx * 8, self.y + dy * 8, self.vx + dx * 3.9, self.vy + dy * 3.9, 49])
            self.recharge = 12
        for roche in self.roches:
            roche[0] = (roche[0] + roche[2] + 320) % 320
            roche[1] = (roche[1] + roche[3] + 192) % 192
        for j in range(len(self.ondes) - 1, -1, -1):
            onde = self.ondes[j]
            onde[0] = (onde[0] + onde[2] + 320) % 320
            onde[1] = (onde[1] + onde[3] + 192) % 192
            onde[4] -= 1
            for i in range(len(self.roches)):
                r = self.roches[i]
                if proche(onde[0], onde[1], r[0], r[1], r[4] + 1):
                    self.fendre(i)
                    onde[4] = 0
                    break
            if onde[4] == 0:
                self.ondes.pop(j)
        for j in range(len(self.debris) - 1, -1, -1):
            cristal = self.debris[j]
            if proche(self.x, self.y, cristal[0], cristal[1], 13):
                self.debris.pop(j)
                self.cristaux += 1
                self.points += 25
                if self.cristaux == 3:
                    if self.secteur == 3:
                        self.etat = 1
                        self.message = "La cargaison des trois carrières est à bord !"
                    else:
                        self.champ()
                    return
        if self.bouclier == 0:
            for r in self.roches:
                if proche(self.x, self.y, r[0], r[1], r[4] + 5):
                    self.vies -= 1
                    self.bouclier = 120
                    self.x, self.y = 160, 96
                    self.vx, self.vy = 0, 0
                    if self.vies == 0:
                        self.etat = -1
                        self.message = "Le prospecteur regagne la station."
                    break

    def dessin(self):
        formes = []
        for r in self.roches:
            x, y, t = r[0], r[1], r[4]
            formes.extend([["e", x - t, y - t, t * 2, t * 2, "#907c82"],
                           ["e", x - t * 0.65, y - t * 0.8, t, t, "#b19a95"],
                           ["l", x - t * 0.4, y + t * 0.6, x + t * 0.5, y - t * 0.4, "#73c7b1"]])
        for c in self.debris:
            formes.extend([["e", c[0] - 4, c[1] - 4, 8, 8, "#3d716e"], ["r", c[0] - 2, c[1] - 2, 4, 4, "#aaf2c9"]])
        for onde in self.ondes:
            formes.append(["r", onde[0] - 1, onde[1] - 1, 3, 3, "#f9d99d"])
        dx, dy = CAPS[self.cap][0] / 100, CAPS[self.cap][1] / 100
        x, y = self.x, self.y
        couleur = "#a8cfce" if self.bouclier == 0 or int(self.bouclier / 6) % 2 == 0 else "#dfd6a4"
        for signe in [-1, 1]:
            formes.append(["l", x + dx * 8, y + dy * 8, x - dx * 5 + dy * 5 * signe, y - dy * 5 - dx * 5 * signe, couleur])
            formes.append(["l", x, y, x - dx * 5 + dy * 5 * signe, y - dy * 5 - dx * 5 * signe, couleur])
        formes.append(["e", x - 2, y - 2, 4, 4, "#ded0a6"])
        if self.poussee:
            formes.append(["l", x - dx * 4, y - dy * 4, x - dx * 11, y - dy * 11, "#f39b72"])
        return formes

    def mesures(self):
        return [["Secteur", str(self.secteur) + "/3"], ["Cristaux", str(self.cristaux) + "/3"],
                ["Coques", self.vies], ["Score", self.points]]
