MOTS = ["BOUSSOLE", "ÉCUREUIL", "MÉSANGE", "TAMBOUR", "VITRAIL", "ÉCLUSE",
        "LUCIOLE", "LANTERNE", "HÉRISSON", "BOBINE", "NUAGE", "CERISE",
        "PAPILLON", "MÉTÉORE", "ORIGAMI", "FENÊTRE", "ATELIER", "RIVIÈRE"]


def lettre_simple(lettre):
    accents = "ÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸ"
    simples = "AAACEEEEIIOOUUUY"
    i = accents.find(lettre)
    if i >= 0:
        return simples[i]
    return lettre


class Partie:
    def __init__(self, graine, mode=0):
        self.mot = MOTS[graine % len(MOTS)]
        self.lettres = []
        self.erreurs = 0
        self.etat = 0
        self.points = 0
        self.message = "Compose le mot de l’imprimeur. Tu peux te tromper six fois."

    def masque(self):
        lettres = []
        for lettre in self.mot:
            if lettre_simple(lettre) in self.lettres or self.etat == -1:
                lettres.append(lettre)
            else:
                lettres.append("_")
        return lettres

    def jouer(self, saisie):
        if self.etat != 0:
            return
        if len(saisie) != 1:
            self.message = "Propose une seule lettre."
            return
        lettre = lettre_simple(saisie.upper())
        if len(lettre) != 1 or "ABCDEFGHIJKLMNOPQRSTUVWXYZ".find(lettre) == -1:
            self.message = "Propose une lettre de l’alphabet."
            return
        if lettre in self.lettres:
            self.message = "Cette lettre est déjà sur le composteur."
            return
        self.lettres.append(lettre)
        if lettre in [lettre_simple(c) for c in self.mot]:
            self.message = "Bonne lettre !"
        else:
            self.erreurs += 1
            self.message = "Cette lettre manque au tirage."
        if "_" not in self.masque():
            self.etat = 1
            self.points = 7 - self.erreurs
            self.message = "Bon à tirer ! Le mot est " + self.mot + "."
        elif self.erreurs == 6:
            self.etat = -1
            self.message = "Plus d’encre ! Le mot était " + self.mot + "."

    def mesures(self):
        return [["Encre", str(6 - self.erreurs) + " / 6"], ["Mot", str(len(self.mot)) + " lettres"]]
