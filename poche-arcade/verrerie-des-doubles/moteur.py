from moteurs.poche import Hasard, FLECHES


class Partie:
    """Vingt emplacements dans un four et une poire à air chargée par les fusions."""

    def __init__(self, graine, mode=0):
        self.hasard = Hasard(graine)
        self.verres = [0 for i in range(20)]
        self.points = 0
        self.etat = 0
        self.charge = 0
        self.coups = 0
        self.message = "Fais glisser les verres pour souffler une pièce de 2048."
        self.ajouter()
        self.ajouter()

    def ajouter(self):
        libres = [i for i in range(20) if self.verres[i] == 0]
        if len(libres):
            case_libre = libres[self.hasard.entier(len(libres))]
            self.verres[case_libre] = 4 if self.hasard.entier(8) == 0 else 2

    def lignes(self, direction):
        if direction == "g" or direction == "d":
            return [[y * 5 + (4 - x if direction == "d" else x) for x in range(5)] for y in range(4)]
        return [[(3 - y if direction == "b" else y) * 5 + x for y in range(4)] for x in range(5)]

    def agir(self, action):
        if self.etat:
            return
        if action == "souffler":
            if self.charge < 4 or 2 not in self.verres:
                self.message = "Le soufflet demande quatre fusions et un verre de valeur 2."
                return
            self.verres[self.verres.index(2)] = 0
            self.charge = 0
            self.message = "Le soufflet a libéré un emplacement."
            return
        if action not in ["g", "d", "h", "b"]:
            return
        avant = self.verres[:]
        for ligne in self.lignes(action):
            valeurs = [self.verres[i] for i in ligne if self.verres[i]]
            fondu = []
            j = 0
            while j < len(valeurs):
                v = valeurs[j]
                if j + 1 < len(valeurs) and valeurs[j + 1] == v:
                    v *= 2
                    self.points += v
                    self.charge = min(4, self.charge + 1)
                    j += 1
                fondu.append(v)
                j += 1
            for k in range(len(ligne)):
                self.verres[ligne[k]] = fondu[k] if k < len(fondu) else 0
        if self.verres == avant:
            self.message = "Aucun verre ne glisse dans ce sens."
            return
        self.coups += 1
        self.ajouter()
        self.message = "Quatre fusions chargent le soufflet."
        if max(self.verres) >= 2048:
            self.etat = 1
            self.message = "La pièce de 2048 sort du four !"
        elif 0 not in self.verres and not (self.charge == 4 and 2 in self.verres):
            for direction in ["g", "h"]:
                for ligne in self.lignes(direction):
                    for j in range(1, len(ligne)):
                        if self.verres[ligne[j]] == self.verres[ligne[j - 1]]:
                            return
            self.etat = -1
            self.message = "Le four est rempli et aucune paire ne peut fusionner."

    def vue(self):
        return {"colonnes": 5, "grille": [str(v) if v else "" for v in self.verres],
                "styles": ["verre-" + str(v) for v in self.verres]}

    def commandes(self):
        boutons = FLECHES[:]
        if self.charge == 4 and 2 in self.verres:
            boutons.append(["souffler", "Souffler un 2"])
        return boutons

    def mesures(self):
        return [["Score", self.points], ["Plus grand verre", max(self.verres)], ["Soufflet", str(self.charge) + "/4"]]
