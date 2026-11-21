"""Paires mélangées à chaque nouvelle partie, sans minuterie."""


class Partie:
    def __init__(self, niveau, graine=0):
        paires = [3, 6, 8][niveau]
        self.largeur = [3, 4, 4][niveau]
        self.cartes = [i % paires for i in range(2 * paires)]
        for i in range(len(self.cartes) - 1, 0, -1):
            graine = (graine * 9301 + 49297) % 233280
            j = graine * (i + 1) // 233280
            self.cartes[i], self.cartes[j] = self.cartes[j], self.cartes[i]
        self.ouvertes = []
        self.trouvees = []
        self.coups = 0
        self.etat = "jeu"
        self.message = "Retourne la première feuille du carnet."

    def jouer(self, action, valeur):
        if action != "case" or self.etat != "jeu" or valeur in self.trouvees:
            return
        if len(self.ouvertes) == 2:
            self.ouvertes = []
        if valeur in self.ouvertes:
            return
        self.ouvertes.append(valeur)
        if len(self.ouvertes) == 1:
            self.message = "Cherche sa jumelle."
            return
        self.coups += 1
        a, b = self.ouvertes
        if self.cartes[a] == self.cartes[b]:
            self.trouvees.extend(self.ouvertes)
            self.ouvertes = []
            self.message = "Paire ajoutée à l’herbier."
            if len(self.trouvees) == len(self.cartes):
                self.etat = "gagne"
                self.message = "Le carnet botanique est complet !"
        else:
            self.message = "Deux espèces différentes. Choisis une carte pour continuer."

