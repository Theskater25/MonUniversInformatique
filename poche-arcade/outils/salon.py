"""Affichage terminal des huit cartouches de logique et d'aventure."""

from outils.cartouches import graine


def afficher(partie):
    vue = partie.vue()
    if "titre" in vue:
        print("\n" + vue["titre"])
    if "grille" in vue:
        cases = vue["grille"]
        cols = vue["colonnes"]
        largeur = max(len(str(cols)), max(len(c) for c in cases), 1)
        print("   " + " ".join(str(i + 1).rjust(largeur) for i in range(cols)))
        for debut in range(0, len(cases), cols):
            rang = chr(65 + debut // cols)
            ligne = " ".join((c or ".").rjust(largeur) for c in cases[debut:debut + cols])
            print(f" {rang} {ligne}")
    if "cartes" in vue:
        enseignes = {"♣": "trèfle", "♦": "carreau", "♥": "cœur", "♠": "pique"}
        for qui, cartes in vue["cartes"]:
            noms = [c[:-1] + " de " + enseignes[c[-1]] if c[-1] in enseignes else c for c in cartes]
            print("  " + qui + "  " + "  ".join(noms))
    if vue.get("historique"):
        print("  " + " | ".join(vue["entetes"]))
        for entree in vue["historique"]:
            print("  " + " | ".join(str(c) for c in entree))
    for note in vue.get("notes", []):
        print(note)
    print("   ".join(f"{nom} · {valeur}" for nom, valeur in partie.mesures()))
    print(partie.message)
    if not partie.etat:
        print("   ".join(code if code == nom else f"{code} = {nom}" for code, nom in partie.commandes()))
        if vue.get("ciblable") or vue.get("cibles"):
            print("Saisis une coordonnée comme B3 pour choisir une case.")


def jouer_plateau(titre, classe):
    print(f"\n{titre} · Écris :q pour quitter.")
    while True:
        partie = classe(graine())
        while True:
            afficher(partie)
            if partie.etat:
                break
            action = input("Ton choix > ").strip().lower()
            if action in {":q", "quitter"}:
                return
            partie.agir(action)
        if input("Rejouer ? [o/N] > ").strip().lower() not in {"o", "oui"}:
            return
