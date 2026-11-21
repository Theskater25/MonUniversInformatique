from moteurs.poche import Hasard, coordonnee, indice_case


def ordre_groupes(hasard):
    resultat = []
    for groupe in hasard.melanger([0, 1, 2]):
        for i in hasard.melanger([0, 1, 2]):
            resultat.append(groupe * 3 + i)
    return resultat


def permis(grille, i, v):
    ligne = int(i / 9)
    col = i % 9
    bloc = int(ligne / 3) * 27 + int(col / 3) * 3
    for k in range(9):
        for pos in [ligne * 9 + k, col + 9 * k, bloc + int(k / 3) * 9 + k % 3]:
            if pos != i and grille[pos] == v:
                return False
    return True


class Partie:
    def __init__(self, graine, mode=0):
        hasard = Hasard(graine)
        chiffres = hasard.melanger([i + 1 for i in range(9)])
        lignes = ordre_groupes(hasard)
        cols = ordre_groupes(hasard)
        self.solution = [chiffres[(y * 3 + int(y / 3) + x) % 9] for y in lignes for x in cols]
        self.grille = self.solution[:]
        # Dans l'ordre inverse du retrait, chaque case a une seule valeur possible.
        for i in hasard.melanger([k for k in range(81)]):
            if all([v == self.solution[i] or not permis(self.grille, i, v) for v in range(1, 10)]):
                self.grille[i] = 0
        self.fixes = [v != 0 for v in self.grille]
        self.selection = self.grille.index(0)
        self.indices = 0
        self.etat = 0
        self.points = 0
        self.message = "Sélectionne une case claire, puis un chiffre de 1 à 9."

    def agir(self, action):
        if self.etat:
            return
        morceaux = action.split()
        if len(morceaux) == 0:
            return
        i = indice_case(morceaux[0], 9, 9)
        if i >= 0:
            if self.fixes[i]:
                self.message = "Ce chiffre fait partie de la grille de départ."
                return
            self.selection = i
            if len(morceaux) == 1:
                self.message = "Case " + coordonnee(i, 9) + " sélectionnée."
                return
            action = morceaux[1]
        i = self.selection
        if action == "0" or action == "effacer":
            self.grille[i] = 0
            self.message = "Case effacée."
            return
        if action == "indice":
            valeur = self.solution[i]
            if self.grille[i] == valeur:
                self.message = "Cette case porte déjà le bon chiffre."
                return
        elif len(action) == 1 and action in "123456789":
            valeur = int(action)
        else:
            self.message = "Saisis une coordonnée et un chiffre, par exemple B3 7."
            return
        if not permis(self.grille, i, valeur):
            self.message = "Ce chiffre est déjà dans la ligne, la colonne ou le bloc."
            return
        if action == "indice":
            self.indices += 1
        self.grille[i] = valeur
        if 0 not in self.grille:
            self.etat = 1
            self.points = max(1, 100 - 3 * self.indices)
            self.message = "Les neuf serres sont complètes !"
        else:
            self.message = "Chiffre inscrit en " + coordonnee(i, 9) + "."

    def vue(self):
        styles = []
        for i in range(81):
            style = "indice" if self.fixes[i] else "inscrit"
            if i == self.selection:
                style += " choisie"
            if i % 9 in [2, 5]:
                style += " bord-d"
            if int(i / 9) in [2, 5]:
                style += " bord-b"
            styles.append(style)
        return {"colonnes": 9, "grille": [str(v) if v else "" for v in self.grille],
                "styles": styles, "ciblable": True}

    def commandes(self):
        return [[str(v), str(v)] for v in range(1, 10)] + [["0", "Effacer"], ["indice", "Indice"]]

    def mesures(self):
        return [["À remplir", self.grille.count(0)], ["Case", coordonnee(self.selection, 9)], ["Indices", self.indices]]
