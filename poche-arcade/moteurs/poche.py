"""Petits outils déterministes utilisés par les mêmes jeux en Python et sur le Web."""


class Hasard:
    def __init__(self, graine):
        self.graine = graine % 233280

    def entier(self, maximum):
        self.graine = (self.graine * 9301 + 49297) % 233280
        return int(self.graine * maximum / 233280)

    def melanger(self, elements):
        for i in range(len(elements) - 1, 0, -1):
            j = self.entier(i + 1)
            valeur = elements[i]
            elements[i] = elements[j]
            elements[j] = valeur
        return elements


def coordonnee(i, colonnes):
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[int(i / colonnes)] + str(i % colonnes + 1)


def indice_case(texte, colonnes, lignes):
    texte = texte.upper()
    if len(texte) < 2:
        return -1
    y = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".find(texte[0])
    if y < 0 or y >= lignes:
        return -1
    for x in range(colonnes):
        if texte[1:] == str(x + 1):
            return y * colonnes + x
    return -1


FLECHES = [["g", "Gauche"], ["h", "Haut"], ["b", "Bas"], ["d", "Droite"]]
