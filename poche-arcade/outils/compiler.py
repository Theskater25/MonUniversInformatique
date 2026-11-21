"""Reconstruit les moteurs Python et C++ livrés avec les cartouches HTML."""

import base64
import subprocess
import sys
import tempfile
from pathlib import Path

from pscript import py2js

RACINE = Path(__file__).resolve().parents[1]
MESSAGE = "// Fichier généré par outils/compiler.py. Modifier le moteur source.\n"


def compiler_python(cartouche, nom_module, exports):
    dossier = RACINE / cartouche
    source = (dossier / "moteur.py").read_text(encoding="utf-8")
    if "from moteurs.poche import " in source:
        commun = (RACINE / "moteurs" / "poche.py").read_text(encoding="utf-8")
        lignes = [ligne for ligne in source.splitlines() if not ligne.startswith("from moteurs.poche import ")]
        source = commun + "\n\n" + "\n".join(lignes)
    corps = py2js(source)
    module = (
        MESSAGE + "// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).\n"
        + f"const {nom_module} = (() => {{\n" + corps
        + "\nreturn { " + exports + " };\n})();\n"
    )
    (dossier / "moteur.gen.js").write_text(module, encoding="utf-8", newline="\n")


def compiler_cpp(cartouche, nom_binaire, fonctions):
    dossier = RACINE / cartouche
    with tempfile.TemporaryDirectory() as temporaire:
        binaire = Path(temporaire) / "moteur.wasm"
        subprocess.run(
            [sys.executable, "-m", "ziglang", "c++", "-target", "wasm32-freestanding",
             "-std=c++17", "-Oz", "-nostdlib", "-fno-exceptions", "-fno-rtti",
             "-Wl,--no-entry", "-Wl,--strip-all",
             *["-Wl,--export=" + f for f in fonctions.split()],
             str(dossier / "moteur.cpp"), "-o", str(binaire)],
            check=True,
        )
        donnees = base64.b64encode(binaire.read_bytes()).decode("ascii")
    # Embarquer le module permet aussi de lancer index.html par double-clic.
    module = MESSAGE + f'const {nom_binaire} = "{donnees}";\n'
    (dossier / "moteur.wasm.js").write_text(module, encoding="utf-8", newline="\n")


PLATEAUX = (
    "marees-douces",
    "astrographe",
    "cargaison-neuf",
    "nuit-des-lucioles",
    "code-corail",
    "herbier-minute",
    "passe-montagne",
    "petit-eclusier",
    "trame-indigo",
    "quai-des-valises",
)

CLASSIQUES = (
    "nombre-mystere", "pierre-feuille-ciseaux", "mot-suspendu", "allumettes",
    "morpion", "quatre-en-ligne", "bataille-navale", "champ-de-balises",
    "ruban-des-bois", "duel-de-lanternes", "atelier-vitrail", "veille-de-saturne",
    "verrerie-des-doubles", "serrure-a-disques", "sudoku-des-serres", "jardin-cellulaire",
    "courant-de-plumes", "quai-des-formes", "carriere-orbitale", "coursier-des-toits",
    "crypte-des-encres", "vingt-et-un-du-quai", "gardiens-du-sentier", "dedale-des-sources",
)

PISTES = {
    "ligne-de-crete": "pieds crevasse largeur_trou",
    "bulle-de-fond": "profondeur recif_x passage_y demi_passage",
    "cadence-cuivre": "note_piste note_delai",
    "aimant-express": "rail_chariot polarite rail_piece type_piece piece_y restantes",
    "orbites-postales": "satellite relais_angle tir_angle vol tolerance",
}


if __name__ == "__main__":
    compiler_python("poste-polaire", "PostePolaire", "Tournee, niveaux: NIVEAUX")
    compiler_python("minuit-au-phare", "MinuitAuPhare", "Veille, niveaux: VEILLES")
    compiler_cpp("halte-lunaire", "binaireLunaire",
                 "commencer avancer issue position_x position_y vitesse_x vitesse_y "
                 "reserve sol centre_quai demi_largeur_quai seuil_x seuil_y")
    compiler_cpp("ricochet-radio", "binaireRadio",
                 "initialiser emettre station_suivante viser avancer mode station vies score "
                 "retours objectif bien_accorde antenne demi_antenne repere signal_x signal_y")
    for cartouche in PLATEAUX:
        compiler_python(cartouche, "MoteurPlateau", "Partie")
    for cartouche in CLASSIQUES:
        compiler_python(cartouche, "MoteurClassique", "Partie")
    for cartouche, fonctions in PISTES.items():
        compiler_cpp(cartouche, "binairePiste", "ouvrir avancer issue score progres objectif vies " + fonctions)

