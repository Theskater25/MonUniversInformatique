"""Permutation cyclique des fils sur les lignes et les colonnes."""


class Partie:
    def __init__(self, niveau, graine=0):
        self.largeur = [3,3,4][niveau]
        palettes = [[0,1,2, 1,2,0, 2,0,1], [1,2,0, 3,0,1, 2,1,3], [0,1,1,0, 2,3,3,2, 1,0,0,1, 3,2,2,3]]
        self.modele = palettes[niveau]
        self.cases = self.modele[:]
        melanges = [[("ligne",0),("colonne",1)], [("colonne",2),("ligne",1),("colonne",0)], [("ligne",2),("colonne",1),("ligne",0),("colonne",3)]]
        for action, i in melanges[niveau]:
            self.decaler(action, i, -1)
        self.coups = 0
        self.etat = "jeu"
        self.message = "Observe le modèle puis décale les rangées de fils."

    def decaler(self, action, i, pas):
        n = self.largeur
        indices = [i*n+j for j in range(n)] if action == "ligne" else [j*n+i for j in range(n)]
        ancien = [self.cases[k] for k in indices]
        for j in range(n):
            self.cases[indices[(j + pas + n) % n]] = ancien[j]

    def jouer(self, action, valeur):
        if self.etat != "jeu" or action not in ["ligne", "colonne"]:
            return
        self.decaler(action, valeur, 1)
        self.coups += 1
        if self.modele == self.cases:
            self.etat = "gagne"
            self.message = "Les fils reproduisent le motif de l’atelier !"

