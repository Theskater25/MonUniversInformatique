SIGNES = ["pierre", "feuille", "ciseaux"]


class Partie:
    def __init__(self, graine, mode=0):
        self.graine = graine
        self.joueur = 0
        self.automate = 0
        self.manches = 0
        self.dernier = -1
        self.adverse = -1
        self.etat = 0
        self.points = 0
        self.message = "Choisis ton signe. Le premier à trois manches gagne."

    def jouer(self, signe):
        if self.etat != 0 or signe < 0 or signe > 2:
            return
        self.graine = (self.graine * 9301 + 49297) % 233280
        self.dernier = signe
        self.adverse = int(self.graine / 77760)
        self.manches += 1
        issue = (signe - self.adverse + 3) % 3
        annonce = SIGNES[signe] + " contre " + SIGNES[self.adverse] + ". "
        if issue == 0:
            annonce += "Égalité, on rejoue."
        elif issue == 1:
            self.joueur += 1
            annonce += "Tu gagnes la manche."
        else:
            self.automate += 1
            annonce += "L’automate gagne la manche."
        if self.joueur == 3:
            self.etat = 1
            self.points = 3 - self.automate
            annonce += " Le match est à toi !"
        elif self.automate == 3:
            self.etat = -1
            annonce += " L’automate remporte le match."
        self.message = annonce

    def mesures(self):
        return [["Toi", self.joueur], ["Automate", self.automate], ["Manches", self.manches]]
