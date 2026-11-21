from moteurs.poche import Hasard, indice_case


class Partie:
    def __init__(self, graine, mode=0):
        self.hasard = Hasard(graine)
        self.etat = 0
        self.points = 0
        self.motif("planeur")

    def motif(self, nom):
        self.cellules = [False for i in range(144)]
        if nom == "planeur":
            for i in [15, 28, 38, 39, 40]:
                self.cellules[i] = True
        elif nom == "oscillateur":
            for i in [64, 65, 66]:
                self.cellules[i] = True
        elif nom == "hasard":
            self.cellules = [self.hasard.entier(4) == 0 for i in range(144)]
        self.generation = 0
        self.points = self.cellules.count(True)
        self.message = "Le jardin est prêt. Tu peux planter une cellule ou faire passer une génération."

    def avancer(self):
        prochaines = []
        for i in range(144):
            x = i % 12
            y = int(i / 12)
            voisines = 0
            for yy in range(max(0, y - 1), min(12, y + 2)):
                for xx in range(max(0, x - 1), min(12, x + 2)):
                    j = yy * 12 + xx
                    if j != i and self.cellules[j]:
                        voisines += 1
            prochaines.append(voisines == 3 or (voisines == 2 and self.cellules[i]))
        self.cellules = prochaines
        self.generation += 1
        self.points = max(self.points, self.cellules.count(True))

    def agir(self, action):
        if action in ["planeur", "oscillateur", "hasard", "vide"]:
            self.motif(action)
        elif action in ["pas", "10"]:
            etapes = 10 if action == "10" else 1
            for i in range(etapes):
                self.avancer()
            self.message = "Génération " + str(self.generation) + "."
        else:
            i = indice_case(action, 12, 12)
            if i >= 0:
                self.cellules[i] = not self.cellules[i]
                self.points = max(self.points, self.cellules.count(True))

    def vue(self):
        return {"colonnes": 12, "grille": ["+" if v else "" for v in self.cellules],
                "styles": ["pousse" if v else "terre" for v in self.cellules], "ciblable": True}

    def commandes(self):
        return [["pas", "Une génération"], ["10", "Dix générations"], ["planeur", "Planeur"],
                ["oscillateur", "Oscillateur"], ["hasard", "Semer au hasard"], ["vide", "Vider"]]

    def mesures(self):
        return [["Génération", self.generation], ["Population", self.cellules.count(True)]]
