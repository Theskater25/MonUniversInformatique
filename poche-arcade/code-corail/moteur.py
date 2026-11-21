"""Déduction d'un code avec comptage exact des symboles répétés."""


class Partie:
    def __init__(self, niveau, graine=0):
        self.palette = 4 + niveau
        self.limite = [7, 7, 8][niveau]
        self.secret = []
        for _ in range(3):
            graine = (graine * 9301 + 49297) % 233280
            self.secret.append(graine * self.palette // 233280)
        self.ligne = []
        self.essais = []
        self.coups = 0
        self.etat = "jeu"
        self.message = "Compose une proposition de trois coquillages."

    def jouer(self, action, valeur):
        if self.etat != "jeu":
            return
        if action == "choisir" and len(self.ligne) < 3:
            self.ligne.append(valeur)
        elif action == "effacer" and self.ligne:
            self.ligne.pop()
        elif action == "valider" and len(self.ligne) == 3:
            exacts = 0
            restants = []
            proposes = []
            for i in range(3):
                if self.ligne[i] == self.secret[i]:
                    exacts += 1
                else:
                    restants.append(self.secret[i])
                    proposes.append(self.ligne[i])
            ailleurs = 0
            for symbole in proposes:
                if symbole in restants:
                    ailleurs += 1
                    restants.remove(symbole)
            self.essais.append([self.ligne[:], exacts, ailleurs])
            self.ligne = []
            self.coups += 1
            if exacts == 3:
                self.etat = "gagne"
                self.message = "Le coffre de la crique s’ouvre !"
            elif self.coups >= self.limite:
                self.etat = "perdu"
                self.message = "Plus d’essais. La combinaison est révélée."
            else:
                self.message = str(exacts) + " bien placé(s), " + str(ailleurs) + " ailleurs."

