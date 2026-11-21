"""Un tapis FIFO dessert le train avec l'aide d'une consigne LIFO."""


class Partie:
    def __init__(self, niveau, graine=0):
        self.tapis = [[2,1,3,4], [3,2,1,5,4,6], [4,2,1,3,7,6,5,8]][niveau][:]
        self.capacite = [2,3,3][niveau]
        self.total = len(self.tapis)
        self.pile = []
        self.prochain = 1
        self.historique = []
        self.coups = 0
        self.etat = "jeu"
        self.message = "Le train charge les valises dans l’ordre des numéros."

    def jouer(self, action, valeur):
        if self.etat != "jeu":
            return
        if action == "annuler":
            if self.historique:
                self.tapis, self.pile, self.prochain = self.historique.pop()
                self.coups -= 1
                self.message = "Le bagagiste reprend son dernier geste."
            return
        avant = [self.tapis[:], self.pile[:], self.prochain]
        if action == "ranger" and self.tapis and len(self.pile) < self.capacite:
            self.pile.append(self.tapis.pop(0))
        elif action == "tapis" and self.tapis and self.tapis[0] == self.prochain:
            self.tapis.pop(0)
            self.prochain += 1
        elif action == "pile" and self.pile and self.pile[-1] == self.prochain:
            self.pile.pop()
            self.prochain += 1
        else:
            self.message = "Vérifie le prochain numéro et la place en consigne."
            return
        self.historique.append(avant)
        self.coups += 1
        self.message = "Valise attendue · " + str(self.prochain)
        if self.prochain > self.total:
            self.etat = "gagne"
            self.message = "Toutes les valises à bord. Le train peut partir !"

