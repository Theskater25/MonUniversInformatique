"""Règles de Poste Polaire, partagées entre Python et le navigateur."""

NIVEAUX = [
    {
        "nom": "Premier courrier",
        "objectif": 3,
        "carte": [
            "S..#..",
            ".#...#",
            "..E.#.",
            "#.....",
            ".....B",
            "..#.#.",
        ],
    },
    {
        "nom": "La passe des glaces",
        "objectif": 6,
        "carte": [
            "..#.B#.",
            ".....#.",
            "#..EE..",
            "#.....#",
            "...#.S.",
            "#.##...",
        ],
    },
    {
        "nom": "Le grand détour",
        "objectif": 9,
        "carte": [
            "..B#E..",
            "#....#.",
            "......S",
            "#...E..",
            "..##.E.",
            "......#",
            ".......",
        ],
    },
]


class Tournee:
    """Une impulsion fait glisser le facteur jusqu’au prochain obstacle."""

    def __init__(self, niveau):
        fiche = NIVEAUX[niveau]
        self.nom = fiche["nom"]
        self.objectif = fiche["objectif"]
        self.carte = fiche["carte"]
        self.hauteur = len(self.carte)
        self.largeur = len(self.carte[0])
        self.lettres = []
        self.historique = []
        self.coups = 0

        for y in range(self.hauteur):
            for x in range(self.largeur):
                contenu = self.carte[y][x]
                position = y * self.largeur + x
                if contenu == "S":
                    self.position = position
                elif contenu == "E":
                    self.lettres.append(position)
                elif contenu == "B":
                    self.bureau = position
        self.total = len(self.lettres)

    def distribue(self):
        return len(self.lettres) == 0 and self.position == self.bureau

    def glisser(self, dx, dy):
        if [dx, dy] not in [[1, 0], [-1, 0], [0, 1], [0, -1]] or self.distribue():
            return False

        x = self.position % self.largeur
        y = self.position // self.largeur
        depart = self.position
        avant = self.lettres[:]
        while 0 <= x + dx < self.largeur and 0 <= y + dy < self.hauteur:
            if self.carte[y + dy][x + dx] == "#":
                break
            x += dx
            y += dy
            self.position = y * self.largeur + x
            if self.position in self.lettres:
                self.lettres.remove(self.position)

        if self.position == depart:
            return False
        self.historique.append([depart, avant])
        self.coups += 1
        return True

    def annuler(self):
        if not self.historique:
            return False
        self.position, self.lettres = self.historique.pop()
        self.coups -= 1
        return True

