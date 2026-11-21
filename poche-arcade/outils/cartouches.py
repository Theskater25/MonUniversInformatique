"""Accès aux mêmes moteurs que ceux embarqués dans les pages HTML."""

import argparse
import importlib.util
import random
from pathlib import Path


RACINE = Path(__file__).resolve().parents[1]
CARTOUCHES = {
    "nombre-mystere": ("Nombre mystère", "terminal"),
    "pierre-feuille-ciseaux": ("Pierre-feuille-ciseaux", "terminal"),
    "mot-suspendu": ("Le Pendu de l’imprimerie", "terminal"),
    "allumettes": ("Jeu des allumettes", "terminal"),
    "morpion": ("Morpion", "terminal"),
    "quatre-en-ligne": ("Quatre en ligne", "terminal"),
    "bataille-navale": ("Bataille navale", "terminal"),
    "champ-de-balises": ("Champ de balises", "terminal"),
    "ruban-des-bois": ("Ruban des bois", "Pygame"),
    "duel-de-lanternes": ("Duel de lanternes", "Pygame"),
    "atelier-vitrail": ("Atelier vitrail", "Pygame"),
    "veille-de-saturne": ("Veille de Saturne", "Pygame"),
    "verrerie-des-doubles": ("Verrerie des doubles", "plateau"),
    "serrure-a-disques": ("Serrure à disques", "plateau"),
    "sudoku-des-serres": ("Sudoku des serres", "plateau"),
    "jardin-cellulaire": ("Jardin cellulaire", "plateau"),
    "courant-de-plumes": ("Courant de plumes", "Pygame"),
    "quai-des-formes": ("Quai des formes", "Pygame"),
    "carriere-orbitale": ("Carrière orbitale", "Pygame"),
    "coursier-des-toits": ("Coursier des toits", "Pygame"),
    "crypte-des-encres": ("Crypte des encres", "plateau"),
    "vingt-et-un-du-quai": ("Vingt et un du quai", "plateau"),
    "gardiens-du-sentier": ("Gardiens du sentier", "plateau"),
    "dedale-des-sources": ("Dédale des sources", "plateau"),
}
TERMINAL = {jeu: nom for jeu, (nom, mode) in CARTOUCHES.items() if mode != "Pygame"}
ARCADE = {jeu: nom for jeu, (nom, mode) in CARTOUCHES.items() if mode == "Pygame"}


def jeu_en_argument(catalogue, description):
    parser = argparse.ArgumentParser(description=description)
    parser.add_argument("jeu", choices=list(catalogue), nargs="?", help="cartouche à ouvrir")
    return parser.parse_args().jeu


def menu(catalogue):
    print("\nPoche Arcade\n")
    for numero, titre in enumerate(catalogue.values(), 1):
        print(f"  {numero}. {titre}")
    while True:
        try:
            reponse = input("\nNuméro du jeu (ou Q pour quitter) > ").strip().lower()
        except (EOFError, KeyboardInterrupt):
            return None
        if reponse in {"q", "quitter"}:
            return None
        if reponse in {str(n) for n in range(1, len(catalogue) + 1)}:
            return list(catalogue)[int(reponse) - 1]
        print("Choisis un des numéros affichés.")


def choisir(catalogue, description):
    return jeu_en_argument(catalogue, description) or menu(catalogue)


def moteur(jeu):
    fiche = importlib.util.spec_from_file_location("cartouche_" + jeu.replace("-", "_"), RACINE / jeu / "moteur.py")
    module = importlib.util.module_from_spec(fiche)
    fiche.loader.exec_module(module)
    return module.Partie


def graine():
    return random.randrange(233280)
