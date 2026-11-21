from moteurs.poche import Hasard

RANGS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "V", "D", "R"]
ENSEIGNES = ["♣", "♦", "♥", "♠"]


def valeur(main):
    total = 0
    as_hauts = 0
    for carte in main:
        rang = carte % 13
        if rang == 0:
            total += 11
            as_hauts += 1
        else:
            total += min(10, rang + 1)
    while total > 21 and as_hauts:
        total -= 10
        as_hauts -= 1
    return total


def nom(carte):
    return RANGS[carte % 13] + ENSEIGNES[int(carte / 13)]


class Partie:
    """Huit donnes à jetons fictifs. Le croupier reste sur tout total de 17."""

    def __init__(self, graine, mode=0):
        self.hasard = Hasard(graine)
        self.banque = 40
        self.donne = 0
        self.mise = 0
        self.joueur = []
        self.croupier = []
        self.en_main = False
        self.etat = 0
        self.points = 0
        self.message = "Tu disposes de 40 jetons pour huit donnes. Choisis ta mise."

    def regler(self, retour, texte):
        self.banque += retour
        self.en_main = False
        self.message = texte
        if self.banque < 2 or self.donne == 8:
            self.etat = 1 if self.banque >= 2 else -1
            self.points = self.banque
            self.message += " Fin de la table avec " + str(self.banque) + " jetons."

    def rester(self):
        score = valeur(self.joueur)
        while valeur(self.croupier) < 17:
            self.croupier.append(self.paquet.pop())
        banque = valeur(self.croupier)
        if banque > 21 or score > banque:
            self.regler(self.mise * 2, "Tu gagnes la donne.")
        elif score == banque:
            self.regler(self.mise, "Égalité. Tu récupères ta mise.")
        else:
            self.regler(0, "Le croupier gagne la donne.")

    def agir(self, action):
        if self.etat:
            return
        if not self.en_main:
            if action not in ["2", "6", "10"] or int(action) > self.banque:
                self.message = "Choisis une mise disponible."
                return
            self.mise = int(action)
            self.banque -= self.mise
            self.donne += 1
            self.en_main = True
            self.paquet = self.hasard.melanger([i for i in range(52)])
            self.joueur = [self.paquet.pop()]
            self.croupier = [self.paquet.pop()]
            self.joueur.append(self.paquet.pop())
            self.croupier.append(self.paquet.pop())
            naturel = valeur(self.joueur) == 21
            adverse = valeur(self.croupier) == 21
            if naturel and adverse:
                self.regler(self.mise, "Deux blackjacks. Égalité.")
            elif naturel:
                self.regler(self.mise + int(self.mise * 3 / 2), "Blackjack naturel, payé trois pour deux !")
            elif adverse:
                self.regler(0, "Blackjack du croupier.")
            else:
                self.message = "Tire une carte ou reste sur ton total."
        elif action == "tirer":
            self.joueur.append(self.paquet.pop())
            if valeur(self.joueur) > 21:
                self.regler(0, "Tu dépasses 21. La mise revient au croupier.")
            elif valeur(self.joueur) == 21:
                self.rester()
            else:
                self.message = "Carte tirée. À toi de décider."
        elif action == "rester":
            self.rester()

    def vue(self):
        adverse = [nom(c) for c in self.croupier]
        if self.en_main:
            adverse[1] = "?"
        total = str(valeur(self.joueur)) if len(self.joueur) else "—"
        titre = "Croupier" if self.en_main or len(adverse) == 0 else "Croupier · " + str(valeur(self.croupier))
        return {"cartes": [[titre, adverse], ["Ta main · " + total, [nom(c) for c in self.joueur]]]}

    def commandes(self):
        if self.en_main:
            return [["tirer", "Tirer"], ["rester", "Rester"]]
        return [[str(v), "Miser " + str(v)] for v in [2, 6, 10] if v <= self.banque]

    def mesures(self):
        return [["Jetons", self.banque], ["Mise", self.mise], ["Donne", str(self.donne) + "/8"]]
