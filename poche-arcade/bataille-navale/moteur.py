TAILLES = [3, 2, 2]
LETTRES = "ABCDEFG"


def coordonnee(i):
    return LETTRES[int(i / 7)] + str(i % 7 + 1)


class Partie:
    """Deux flottilles de papier dans des bassins de sept cases de côté."""

    def __init__(self, graine, mode=0):
        self.graine = graine
        self.flottes = [[], []]
        self.tirs = [[], []]
        self.placement = True
        self.vertical = False
        self.etat = 0
        self.points = 0
        self.placer_auto(1)
        self.message = "Place ton premier bateau de 3 cases sur ton bassin."

    def choisir(self, n):
        self.graine = (self.graine * 9301 + 49297) % 233280
        return int(self.graine * n / 233280)

    def trace(self, camp, debut, vertical, taille):
        if debut < 0 or debut >= 49:
            return []
        x = debut % 7
        y = int(debut / 7)
        if (vertical and y + taille > 7) or (not vertical and x + taille > 7):
            return []
        pas = 7 if vertical else 1
        places = [debut + i * pas for i in range(taille)]
        for bateau in self.flottes[camp]:
            for pos in places:
                if pos in bateau:
                    return []
        return places

    def placer_auto(self, camp):
        self.flottes[camp] = []
        for taille in TAILLES:
            choix = []
            for debut in range(49):
                for sens in [False, True]:
                    places = self.trace(camp, debut, sens, taille)
                    if len(places) > 0:
                        choix.append(places)
            self.flottes[camp].append(choix[self.choisir(len(choix))])

    def pret(self):
        self.placement = False
        self.message = "À toi ! Vise une coordonnée du bassin adverse."

    def repartir(self):
        if self.placement:
            self.placer_auto(0)
            self.pret()

    def pivoter(self):
        if self.placement:
            self.vertical = not self.vertical
            self.message = "Oriente la proue vers le bas." if self.vertical else "Oriente la proue vers la droite."

    def placer(self, debut):
        if not self.placement:
            return
        places = self.trace(0, debut, self.vertical, TAILLES[len(self.flottes[0])])
        if len(places) == 0:
            self.message = "Le bateau doit tenir dans le bassin sans chevauchement."
            return
        self.flottes[0].append(places)
        if len(self.flottes[0]) == len(TAILLES):
            self.pret()
        else:
            self.message = "Bateau posé. Place maintenant un bateau de 2 cases."

    def impact(self, camp, i):
        for bateau in self.flottes[camp]:
            if i in bateau:
                if all([pos in self.tirs[camp] for pos in bateau]):
                    return "coulé"
                return "touché"
        return "à l’eau"

    def restants(self, camp):
        return len([b for b in self.flottes[camp] if any([p not in self.tirs[camp] for p in b])])

    def jouer(self, cible):
        if self.etat != 0 or self.placement or cible < 0 or cible >= 49:
            return
        if cible in self.tirs[1]:
            self.message = "Cette coordonnée a déjà été sondée."
            return
        self.tirs[1].append(cible)
        self.message = "Toi en " + coordonnee(cible) + " : " + self.impact(1, cible) + "."
        if self.restants(1) == 0:
            self.etat = 1
            self.points = 50 - len(self.tirs[1])
            self.message += " La flottille adverse est repêchée !"
            return
        libres = [i for i in range(49) if i not in self.tirs[0]]
        riposte = libres[self.choisir(len(libres))]
        self.tirs[0].append(riposte)
        self.message += " Adversaire en " + coordonnee(riposte) + " : " + self.impact(0, riposte) + "."
        if self.restants(0) == 0:
            self.etat = -1
            self.message += " Ton dernier bateau a coulé."

    def mesures(self):
        if self.placement:
            return [["Bateaux posés", str(len(self.flottes[0])) + " / 3"], ["Longueur", TAILLES[len(self.flottes[0])]]]
        return [["Tes bateaux", self.restants(0)], ["Adverses", self.restants(1)], ["Tes tirs", len(self.tirs[1])]]
