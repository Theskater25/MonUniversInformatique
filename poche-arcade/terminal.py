"""Jeux de terminal et de plateau, sans dépendance externe. Lancez python terminal.py."""

from outils.cartouches import CARTOUCHES, TERMINAL, choisir, graine, moteur
from outils.salon import jouer_plateau


def lire_entier(saisie):
    try:
        return int(saisie)
    except ValueError:
        return None


def coordonnee(saisie, cote):
    if len(saisie) != 2:
        return None
    y = "abcdefgh".find(saisie[0])
    x = "12345678".find(saisie[1])
    return y * cote + x if 0 <= x < cote and 0 <= y < cote else None


def grille(symboles, colonnes):
    print("      " + " ".join(str(i + 1) for i in range(colonnes)))
    for debut in range(0, len(symboles), colonnes):
        ligne = chr(ord("A") + debut // colonnes)
        print(f"    {ligne} " + " ".join(symboles[debut:debut + colonnes]))


def bassin(partie, camp):
    resultat = []
    for i in range(49):
        bateau = any(i in b for b in partie.flottes[camp])
        if i in partie.tirs[camp]:
            resultat.append("X" if bateau else "o")
        elif bateau and (camp == 0 or partie.etat):
            resultat.append("#")
        else:
            resultat.append(".")
    return resultat


def plateau(jeu, partie):
    if jeu == "mot-suspendu":
        print("  " + " ".join(partie.masque()))
        if partie.lettres:
            print("  Lettres proposées · " + " ".join(partie.lettres))
    elif jeu == "allumettes":
        print("  " + " ".join("|" * min(5, partie.reste - n) for n in range(0, partie.reste, 5)))
    elif jeu == "nombre-mystere" and partie.essais:
        print("  Tes prix · " + ", ".join(str(v) for v in partie.essais))
    elif jeu in {"morpion", "quatre-en-ligne"}:
        grille([".XO"[p] for p in partie.plateau], 3 if jeu == "morpion" else 7)
        if jeu == "quatre-en-ligne":
            print("  X = corail    O = turquoise")
    elif jeu == "bataille-navale":
        print("  Ton bassin    # bateau    X touché    o à l'eau")
        grille(bassin(partie, 0), 7)
        if partie.placement:
            print("  Orientation : " + ("verticale" if partie.vertical else "horizontale"))
        else:
            print("  Bassin adverse")
            grille(bassin(partie, 1), 7)
    elif jeu == "champ-de-balises":
        symboles = []
        for i in range(64):
            if partie.etat and i in partie.mines:
                symboles.append("*")
            elif partie.drapeaux[i]:
                symboles.append("F")
            elif partie.ouvertes[i]:
                symboles.append(str(partie.nombres[i]) if partie.nombres[i] else " ")
            else:
                symboles.append(".")
        grille(symboles, 8)
    print("  " + "    ".join(f"{nom} : {valeur}" for nom, valeur in partie.mesures()))
    print(partie.message)


def proposition(jeu, partie, saisie):
    if jeu == "mot-suspendu":
        partie.jouer(saisie)
    elif jeu == "pierre-feuille-ciseaux":
        signes = {"1": 0, "pierre": 0, "2": 1, "feuille": 1, "papier": 1, "3": 2, "ciseaux": 2}
        if saisie in signes:
            partie.jouer(signes[saisie])
        else:
            partie.message = "Choisis pierre, feuille ou ciseaux (ou 1, 2, 3)."
    elif jeu in {"morpion", "bataille-navale", "champ-de-balises"}:
        if jeu == "bataille-navale" and partie.placement:
            if saisie == "auto":
                partie.repartir()
                return
            if saisie == "pivoter":
                partie.pivoter()
                return
        marquer = jeu == "champ-de-balises" and saisie.startswith("!")
        cote = {"morpion": 3, "bataille-navale": 7, "champ-de-balises": 8}[jeu]
        i = coordonnee(saisie[1:] if marquer else saisie, cote)
        if i is None:
            partie.message = "Entre une coordonnée du plateau, par exemple A1."
        elif marquer:
            partie.baliser(i)
        elif jeu == "bataille-navale" and partie.placement:
            partie.placer(i)
        else:
            partie.jouer(i)
    else:
        nombre = lire_entier(saisie)
        if nombre is None:
            partie.message = "Entre un nombre entier."
        elif jeu == "quatre-en-ligne":
            if 1 <= nombre <= 7:
                partie.jouer(nombre - 1)
            else:
                partie.message = "Choisis une colonne de 1 à 7."
        else:
            partie.jouer(nombre)


def jouer(jeu):
    classe = moteur(jeu)
    if CARTOUCHES[jeu][1] == "plateau":
        return jouer_plateau(TERMINAL[jeu], classe)
    invites = {"nombre-mystere": "Ton prix", "pierre-feuille-ciseaux": "1 Pierre / 2 Feuille / 3 Ciseaux",
               "mot-suspendu": "Ta lettre", "allumettes": "Combien en prends-tu (1 à 3) ?",
               "morpion": "Case (A1 à C3)", "quatre-en-ligne": "Colonne (1 à 7)",
               "bataille-navale": "Tir (A1 à G7)", "champ-de-balises": "Case (A1 à H8), ou !A1 pour un fanion"}
    print(f"\n{TERMINAL[jeu]} · Pour sortir, écris :q ou quitter.")
    mode = 0
    if jeu in {"morpion", "quatre-en-ligne"}:
        choix = input("Entrée pour jouer contre l'automate, 2 pour jouer à deux > ").strip().lower()
        if choix in {":q", "quitter"}:
            return
        mode = int(choix == "2")
    while True:
        partie = classe(graine(), mode)
        plateau(jeu, partie)
        while partie.etat == 0:
            invite = invites[jeu]
            if jeu == "bataille-navale" and partie.placement:
                invite = "Début du bateau (A1 à G7), pivoter ou auto"
            saisie = input(invite + " > ").strip().lower()
            if saisie in {":q", "quitter"}:
                return
            proposition(jeu, partie, saisie)
            plateau(jeu, partie)
        if partie.etat == 1 and mode == 0:
            print(f"Score final · {partie.points} pts")
        if input("Rejouer ? [o/N] > ").strip().lower() not in {"o", "oui"}:
            return


if __name__ == "__main__":
    selection = choisir(TERMINAL, __doc__)
    if selection:
        try:
            jouer(selection)
        except (EOFError, KeyboardInterrupt):
            print()
