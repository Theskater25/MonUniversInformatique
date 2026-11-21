"""Tracer un graphe sans emprunter deux fois la même arête."""

CROQUIS = [
    (3, [6,4,2,0,4,8]),
    (4, [0,5,2,7,10,5,8,13,10,15]),
    (4, [0,1,6,3,2,6,10,15,14,9,10,5,1,4,9,12]),
]


class Partie:
    def __init__(self, niveau, graine=0):
        self.largeur, trace = CROQUIS[niveau]
        self.etoiles = []
        self.traits = []
        for i in range(len(trace)):
            if trace[i] not in self.etoiles:
                self.etoiles.append(trace[i])
            if i:
                self.traits.append([trace[i-1], trace[i]])
        self.faits = []
        self.chemin = []
        self.coups = 1
        self.etat = "jeu"
        self.message = "Une étoile avec un nombre impair de traits est un bon départ."

    def jouer(self, action, valeur):
        if self.etat != "jeu":
            return
        if action == "annuler" and self.chemin:
            self.chemin.pop()
            if self.faits:
                self.faits.pop()
            self.coups += 1
            self.message = "Choisis une autre branche."
            return
        if action != "case" or valeur not in self.etoiles:
            return
        if not self.chemin:
            self.chemin.append(valeur)
            self.message = "Suis un trait vers une autre étoile."
            return
        origine = self.chemin[-1]
        for i in range(len(self.traits)):
            a, b = self.traits[i]
            if ((a == origine and b == valeur) or (b == origine and a == valeur)) and i not in self.faits:
                self.faits.append(i)
                self.chemin.append(valeur)
                self.message = "Ce trait est maintenant encré."
                if len(self.faits) == len(self.traits):
                    self.etat = "gagne"
                    self.message = "La constellation est dessinée d’un seul trait !"
                return
        self.message = "Il faut un trait encore libre depuis l’étoile dorée."

