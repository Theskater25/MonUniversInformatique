from moteurs.poche import Hasard


class Partie:
    def __init__(self, graine, mode=0):
        hasard = Hasard(graine)
        self.secret = "".join([str(1 + hasard.entier(6)) for i in range(4)])
        self.saisie = ""
        self.essais = []
        self.etat = 0
        self.points = 0
        self.message = "Règle les quatre disques, chacun de 1 à 6. Les répétitions sont possibles."

    def agir(self, action):
        if self.etat:
            return
        if action == "effacer":
            self.saisie = self.saisie[:-1]
            return
        if len(action) == 1 and action in "123456":
            if len(self.saisie) < 4:
                self.saisie += action
            return
        if len(action) == 4 and all([c in "123456" for c in action]):
            self.saisie = action
        elif action != "tester":
            self.message = "Utilise quatre chiffres de 1 à 6."
            return
        if len(self.saisie) != 4:
            self.message = "Règle les quatre disques avant de tester."
            return
        exacts = len([i for i in range(4) if self.saisie[i] == self.secret[i]])
        communs = 0
        for chiffre in "123456":
            communs += min(self.saisie.count(chiffre), self.secret.count(chiffre))
        self.essais.append([self.saisie, exacts, communs - exacts])
        self.saisie = ""
        if exacts == 4:
            self.etat = 1
            self.points = 9 - len(self.essais)
            self.message = "Le coffre s’ouvre sur le code " + self.secret + " !"
        elif len(self.essais) == 8:
            self.etat = -1
            self.message = "Le verrou se referme. La combinaison était " + self.secret + "."
        else:
            self.message = str(exacts) + " bien placé(s), " + str(communs - exacts) + " mal placé(s)."

    def vue(self):
        disques = self.secret if self.etat else self.saisie
        return {"colonnes": 4, "grille": [disques[i] if i < len(disques) else "·" for i in range(4)],
                "styles": ["disque" for i in range(4)],
                "historique": [[e[0], e[1], e[2]] for e in self.essais],
                "entetes": ["Code", "Bien placés", "Mal placés"]}

    def commandes(self):
        return [[c, c] for c in "123456"] + [["effacer", "Effacer"], ["tester", "Tester"]]

    def mesures(self):
        return [["Essais", str(len(self.essais)) + "/8"], ["Disques", 4]]
