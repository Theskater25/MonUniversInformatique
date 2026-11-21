"""Joue aux cartouches de Poche Arcade en Python."""

import os
import subprocess
import sys
from importlib.util import find_spec

from outils.cartouches import CARTOUCHES, RACINE, TERMINAL, jeu_en_argument, menu
from terminal import jouer as jouer_terminal


def lancer(jeu):
    if jeu in TERMINAL:
        jouer_terminal(jeu)
        return 0

    python = sys.executable
    if find_spec("pygame") is None:
        chemin = "Scripts/python.exe" if os.name == "nt" else "bin/python"
        python_projet = RACINE / ".venv" / chemin
        if python_projet.is_file():
            python = str(python_projet)
    return subprocess.run([python, str(RACINE / "jeux_2d.py"), jeu]).returncode


def main():
    catalogue = {jeu: f"{nom} ({'terminal' if jeu in TERMINAL else 'Pygame'})"
                 for jeu, (nom, _) in CARTOUCHES.items()}
    selection = jeu_en_argument(catalogue, __doc__)
    if selection:
        return lancer(selection)

    while jeu := menu(catalogue):
        lancer(jeu)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (EOFError, KeyboardInterrupt):
        print()
