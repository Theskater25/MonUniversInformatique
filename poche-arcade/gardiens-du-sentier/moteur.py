from moteurs.poche import coordonnee, indice_case

CHEMIN = [9, 10, 11, 12, 21, 30, 31, 32, 33, 24, 15, 16, 17]
SOCLES = [2, 13, 19, 22, 25, 29, 34, 41]


class Partie:
    def __init__(self, graine, mode=0):
        self.tours = [0 for i in SOCLES]
        self.escargots = []
        self.soleils = 6
        self.vies = 5
        self.vague = 0
        self.chasses = 0
        self.points = 0
        self.en_vague = False
        self.etat = 0
        self.message = "Installe des lanternes sur les socles (+), puis lance la première vague."

    def pas(self):
        if not self.en_vague:
            return
        self.temps += 1
        if self.reserve > 0 and self.temps % 2:
            self.escargots.append([-1, 2 + self.vague + self.reserve % 2])
            self.reserve -= 1
        for bete in self.escargots:
            bete[0] += 1
        for k in range(len(self.escargots) - 1, -1, -1):
            if self.escargots[k][0] >= len(CHEMIN):
                self.escargots.pop(k)
                self.vies -= 1
        if self.vies <= 0:
            self.vies = 0
            self.etat = -1
            self.en_vague = False
            self.message = "Les escargots ont atteint les cinq laitues."
            return
        for j in range(len(SOCLES)):
            if self.tours[j] == 0:
                continue
            socle = SOCLES[j]
            for k in range(len(self.escargots)):
                bete = self.escargots[k]
                pos = CHEMIN[bete[0]]
                distance = abs(pos % 9 - socle % 9) + abs(int(pos / 9) - int(socle / 9))
                if distance <= 2:
                    bete[1] -= self.tours[j]
                    if bete[1] <= 0:
                        self.escargots.pop(k)
                        self.chasses += 1
                        self.soleils += 1
                        self.points += 5
                    break
        if self.reserve == 0 and len(self.escargots) == 0:
            self.en_vague = False
            self.soleils += 2
            self.message = "Vague terminée. Tu reçois deux soleils de renfort."
            if self.vague == 5:
                self.etat = 1
                self.points += self.vies * 10
                self.message = "Les cinq vagues sont passées. Le potager est sauvé !"

    def agir(self, action):
        if self.etat:
            return
        if self.en_vague:
            if action == "pas":
                self.pas()
            elif action == "finir":
                while self.en_vague:
                    self.pas()
            return
        if action == "vague":
            self.vague += 1
            self.reserve = 3 + self.vague
            self.temps = 0
            self.en_vague = True
            self.message = "Les escargots arrivent par la gauche."
            return
        i = indice_case(action, 9, 5)
        if i not in SOCLES:
            self.message = "Choisis un socle marqué + pour construire."
            return
        j = SOCLES.index(i)
        cout = 3 if self.tours[j] == 0 else 4
        if self.tours[j] == 2:
            self.message = "Cette lanterne est déjà à sa pleine puissance."
        elif self.soleils < cout:
            self.message = "Il te faut " + str(cout) + " soleils."
        else:
            self.soleils -= cout
            self.tours[j] += 1
            self.message = "Lanterne en " + coordonnee(i, 9) + " · puissance " + str(self.tours[j]) + "."

    def vue(self):
        symboles = ["" for i in range(45)]
        styles = ["gazon" for i in range(45)]
        for i in CHEMIN:
            styles[i] = "chemin"
            symboles[i] = "·"
        symboles[17] = "S"
        for j in range(len(SOCLES)):
            i = SOCLES[j]
            styles[i] = "socle" if self.tours[j] == 0 else "tour"
            symboles[i] = "+" if not self.tours[j] else str(self.tours[j])
        for bete in self.escargots:
            i = CHEMIN[bete[0]]
            symboles[i] = "@"
            styles[i] = "bete"
        return {"colonnes": 9, "grille": symboles, "styles": styles,
                "cibles": SOCLES if not self.en_vague else [], "notes": ["+ Socle · 1/2 Lanterne · @ Escargot · S Sortie"]}

    def commandes(self):
        if self.en_vague:
            return [["pas", "Un pas"], ["finir", "Résoudre la vague"]]
        return [["vague", "Lancer la vague " + str(self.vague + 1)]]

    def mesures(self):
        return [["Vague", str(self.vague) + "/5"], ["Soleils", self.soleils], ["Laitues", self.vies]]
