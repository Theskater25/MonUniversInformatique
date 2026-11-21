COTE = 8
MINES = 10


class Partie:
    def __init__(self, graine, mode=0):
        self.graine = graine
        self.mines = []
        self.ouvertes = [False for i in range(64)]
        self.drapeaux = [False for i in range(64)]
        self.nombres = [0 for i in range(64)]
        self.decouvertes = 0
        self.coups = 0
        self.etat = 0
        self.points = 0
        self.detonation = -1
        self.message = "Ouvre une première case pour commencer le relevé."

    def voisins(self, i):
        x = i % COTE
        y = int(i / COTE)
        cases = []
        for ligne in range(max(0, y - 1), min(COTE, y + 2)):
            for col in range(max(0, x - 1), min(COTE, x + 2)):
                voisin = ligne * COTE + col
                if voisin != i:
                    cases.append(voisin)
        return cases

    def semer(self, depart):
        abri = self.voisins(depart) + [depart]
        libres = [i for i in range(64) if i not in abri]
        for n in range(MINES):
            self.graine = (self.graine * 9301 + 49297) % 233280
            self.mines.append(libres.pop(int(self.graine * len(libres) / 233280)))
        for mine in self.mines:
            for i in self.voisins(mine):
                self.nombres[i] += 1

    def baliser(self, i):
        if self.etat == 0 and 0 <= i < 64 and not self.ouvertes[i]:
            if not self.drapeaux[i] and self.drapeaux.count(True) >= MINES:
                self.message = "Les dix fanions sont posés. Retire-en un pour le déplacer."
                return
            self.drapeaux[i] = not self.drapeaux[i]
            self.message = "Fanion posé." if self.drapeaux[i] else "Fanion retiré."

    def ouvrir(self, i):
        if self.ouvertes[i] or self.drapeaux[i]:
            return
        self.ouvertes[i] = True
        self.decouvertes += 1
        if self.nombres[i] == 0:
            for voisin in self.voisins(i):
                self.ouvrir(voisin)

    def jouer(self, i):
        if self.etat != 0 or i < 0 or i >= 64 or self.ouvertes[i] or self.drapeaux[i]:
            return
        if len(self.mines) == 0:
            self.semer(i)
        self.coups += 1
        if i in self.mines:
            self.etat = -1
            self.detonation = i
            self.message = "Mine découverte. Les emplacements sont révélés."
            return
        self.ouvrir(i)
        self.message = "Le chiffre indique les mines dans les huit cases voisines."
        if self.decouvertes == 64 - MINES:
            self.etat = 1
            self.points = 65 - self.coups
            self.message = "Toutes les cases sûres sont ouvertes !"

    def mesures(self):
        return [["Fanions", str(self.drapeaux.count(True)) + " / 10"], ["Cases sûres", str(self.decouvertes) + " / 54"]]
