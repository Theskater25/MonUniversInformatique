class Partie:
    """La dernière allumette gagne. L'automate tente des groupes de quatre."""

    def __init__(self, graine, mode=0):
        self.reste = 17 + graine % 3
        self.graine = graine
        self.tours = 0
        self.etat = 0
        self.points = 0
        self.message = "Tu commences. Celui qui prend la dernière allumette gagne."

    def jouer(self, prise):
        if self.etat != 0:
            return
        if prise < 1 or prise > min(3, self.reste) or prise != int(prise):
            self.message = "Prends entre 1 et " + str(min(3, self.reste)) + " allumettes."
            return
        self.reste -= prise
        self.tours += 1
        if self.reste == 0:
            self.etat = 1
            self.points = 12 - self.tours
            self.message = "La dernière est pour toi. Gagné !"
            return
        reponse = self.reste % 4
        if reponse == 0:
            self.graine = (self.graine * 9301 + 49297) % 233280
            reponse = 1 + self.graine % 3
        self.reste -= reponse
        self.message = "Tu en prends " + str(prise) + ", l’automate en prend " + str(reponse) + "."
        if self.reste == 0:
            self.etat = -1
            self.message += " Il prend la dernière et gagne."

    def mesures(self):
        return [["Allumettes", self.reste], ["Tes tours", self.tours]]
