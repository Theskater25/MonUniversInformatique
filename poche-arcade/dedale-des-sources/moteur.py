from moteurs.poche import Hasard, FLECHES

SENS = {"g": [-1, 0], "d": [1, 0], "h": [0, -1], "b": [0, 1]}


class Partie:
    def __init__(self, graine, mode=0):
        hasard = Hasard(graine)
        self.plan = [False for i in range(165)]
        self.pos = 16
        self.sortie = 148
        self.plan[self.pos] = True
        pile = [self.pos]
        while len(pile):
            i = pile[-1]
            x = i % 15
            y = int(i / 15)
            choix = []
            for direction in ["g", "d", "h", "b"]:
                dx = SENS[direction][0]
                dy = SENS[direction][1]
                xx = x + 2 * dx
                yy = y + 2 * dy
                if 1 <= xx < 14 and 1 <= yy < 10 and not self.plan[yy * 15 + xx]:
                    choix.append([yy * 15 + xx, i + dy * 15 + dx])
            if len(choix):
                suite = choix[hasard.entier(len(choix))]
                self.plan[suite[0]] = True
                self.plan[suite[1]] = True
                pile.append(suite[0])
            else:
                pile.pop()
        libres = [i for i in range(165) if self.plan[i] and i != self.pos and i != self.sortie]
        self.sources = hasard.melanger(libres)[:2]
        self.trace = [self.pos]
        self.coups = 0
        self.etat = 0
        self.points = 0
        self.message = "Trouve la sortie S. Les deux sources ~ rapportent un bonus."

    def agir(self, action):
        if self.etat or action not in SENS:
            return
        vecteur = SENS[action]
        pos = self.pos + vecteur[0] + vecteur[1] * 15
        if not self.plan[pos]:
            self.message = "La galerie est fermée de ce côté."
            return
        self.pos = pos
        self.coups += 1
        if pos not in self.trace:
            self.trace.append(pos)
        self.message = "Tu avances dans la galerie."
        if pos in self.sources:
            self.sources.remove(pos)
            self.message = "Source trouvée !"
        if pos == self.sortie:
            self.etat = 1
            self.points = max(10, 300 - self.coups) + (2 - len(self.sources)) * 60
            self.message = "Tu retrouves la lumière en " + str(self.coups) + " pas."

    def vue(self):
        cases = []
        styles = []
        for i in range(165):
            if i == self.pos:
                signe, style = "@", "heros"
            elif i == self.sortie:
                signe, style = "S", "sortie"
            elif i in self.sources:
                signe, style = "~", "source"
            elif not self.plan[i]:
                signe, style = "#", "mur"
            elif i in self.trace:
                signe, style = "·", "trace"
            else:
                signe, style = "", "galerie"
            cases.append(signe)
            styles.append(style)
        return {"colonnes": 15, "grille": cases, "styles": styles}

    def commandes(self):
        return FLECHES

    def mesures(self):
        return [["Pas", self.coups], ["Sources", str(2 - len(self.sources)) + "/2"]]
