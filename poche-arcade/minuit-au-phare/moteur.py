"""Trajet du faisceau et orientation des miroirs de Minuit au phare."""

VEILLES = [
    ("L’anse tranquille", [
        "##.V.",
        "#..*.",
        "P*.\\.",
        ".#...",
    ]),
    ("La pointe du sel", [
        ".#..#.",
        "P*.\\.V",
        "..#*..",
        "./..#.",
        "#../.\\",
    ]),
    ("La fausse passe", [
        "#.\\*./",
        "....#.",
        "P.\\..*",
        ".#..#.",
        "#.V.*\\",
        ".\\..##",
    ]),
    ("Le cap des quatre feux", [
        "#\\..*V#",
        "..#\\.*\\",
        "#..*.#.",
        ".*..#/.",
        "P..\\#..",
        "#/....\\",
    ]),
]


class Veille:
    def __init__(self, numero):
        self.nom, lignes = VEILLES[numero]
        self.largeur = len(lignes[0])
        self.hauteur = len(lignes)
        self.cases = list("".join(lignes))
        self.depart = self.cases.index("P")
        self.total = self.cases.count("*")
        self.pivots = []
        self.eclairer()

    def eclairer(self):
        x = self.depart % self.largeur
        y = self.depart // self.largeur
        dx, dy = 1, 0
        self.rayon = [[x, y]]
        self.allumees = []
        self.issue = "mer"
        # Il existe au plus quatre directions d'entrée par case.
        for _ in range(4 * self.largeur * self.hauteur):
            x += dx
            y += dy
            if x < 0 or y < 0 or x >= self.largeur or y >= self.hauteur:
                self.rayon.append([x - dx * 0.5, y - dy * 0.5])
                return
            position = y * self.largeur + x
            objet = self.cases[position]
            if objet in ["#", "P"]:
                self.rayon.append([x - dx * 0.4, y - dy * 0.4])
                self.issue = "obstacle"
                return
            self.rayon.append([x, y])
            if objet == "*":
                if position not in self.allumees:
                    self.allumees.append(position)
            elif objet == "V":
                self.issue = "port" if len(self.allumees) == self.total else "incomplet"
                return
            elif objet == "/":
                dx, dy = -dy, -dx
            elif objet == "\\":
                dx, dy = dy, dx

    def retourner(self, position):
        self.cases[position] = "\\" if self.cases[position] == "/" else "/"
        self.eclairer()

    def pivoter(self, position):
        if self.issue == "port" or not 0 <= position < len(self.cases):
            return False
        if self.cases[position] not in ["/", "\\"]:
            return False
        self.pivots.append(position)
        self.retourner(position)
        return True

    def annuler(self):
        if not self.pivots:
            return False
        self.retourner(self.pivots.pop())
        return True

