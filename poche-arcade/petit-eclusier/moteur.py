"""Deux bassins, des transvasements conservatifs et une mesure à atteindre."""


class Partie:
    def __init__(self, niveau, graine=0):
        self.capacites, self.cible = [([3,5],4), ([4,7],2), ([7,11],5)][niveau]
        self.eau = [0, 0]
        self.coups = 0
        self.etat = "jeu"
        self.message = "La péniche attend " + str(self.cible) + " unités d’eau dans un bassin."

    def jouer(self, action, valeur):
        if self.etat != "jeu":
            return
        avant = self.eau[:]
        if action == "remplir":
            self.eau[valeur] = self.capacites[valeur]
        elif action == "vider":
            self.eau[valeur] = 0
        elif action == "verser":
            autre = 1 - valeur
            transfert = min(self.eau[valeur], self.capacites[autre] - self.eau[autre])
            self.eau[valeur] -= transfert
            self.eau[autre] += transfert
        if avant == self.eau:
            self.message = "Cette manœuvre ne change pas le niveau."
            return
        self.coups += 1
        self.message = "Niveau ajusté. Objectif · " + str(self.cible) + " unités."
        if self.cible in self.eau:
            self.etat = "gagne"
            self.message = "Niveau exact ! La péniche franchit l’écluse."

