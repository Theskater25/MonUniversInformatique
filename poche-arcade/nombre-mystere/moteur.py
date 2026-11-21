class Partie:
    """Sept propositions pour retrouver le prix entier d'un lot."""

    def __init__(self, graine, mode=0):
        self.secret = 1 + graine % 100
        self.bas = 1
        self.haut = 100
        self.essais = []
        self.etat = 0
        self.points = 0
        self.message = "Le prix du lot est compris entre 1 et 100."

    def jouer(self, valeur):
        if self.etat != 0:
            return
        if valeur < self.bas or valeur > self.haut or valeur != int(valeur):
            self.message = "Choisis un entier entre " + str(self.bas) + " et " + str(self.haut) + "."
            return
        self.essais.append(valeur)
        if valeur == self.secret:
            self.etat = 1
            self.points = 8 - len(self.essais)
            self.message = "Juste prix ! Le lot vaut " + str(valeur) + "."
        elif len(self.essais) == 7:
            self.etat = -1
            self.message = "Le marché ferme. Le prix était " + str(self.secret) + "."
        elif valeur < self.secret:
            self.bas = valeur + 1
            self.message = "Plus grand !"
        else:
            self.haut = valeur - 1
            self.message = "Plus petit !"

    def mesures(self):
        return [["Essais", str(len(self.essais)) + " / 7"], ["Fourchette", str(self.bas) + " – " + str(self.haut)]]
