"""Lance la version de bureau de Poste Polaire avec Python et Tk."""
from pathlib import Path
import tkinter as tk
from tkinter import ttk

from moteur import NIVEAUX, Tournee


class Fenetre:
    def __init__(self, racine):
        self.racine = racine
        racine.title("Poste Polaire · Poche Arcade")
        racine.configure(background="#25405b")
        racine.columnconfigure(0, weight=1)

        self.tuiles = self.charger_tuiles()
        self.titre = tk.StringVar()
        self.info = tk.StringVar()
        self.bilan = tk.StringVar()
        for ligne, variable, taille in [(0, self.titre, 18), (1, self.bilan, 11)]:
            tk.Label(racine, textvariable=variable, bg="#25405b", fg="#fff1d2",
                     font=("TkDefaultFont", taille, "bold")).grid(row=ligne, padx=14, pady=4)
        self.toile = tk.Canvas(racine, highlightthickness=0, bg="#25405b")
        self.toile.grid(row=2, padx=14, pady=6)
        tk.Label(racine, textvariable=self.info, bg="#25405b", fg="white",
                 wraplength=310, justify="center").grid(row=3, padx=12, pady=4)

        commandes = ttk.Frame(racine)
        commandes.grid(row=4, pady=4)
        for touche, texte, dx, dy, colonne, ligne in [
            ("Up", "↑", 0, -1, 1, 0), ("Left", "←", -1, 0, 0, 1),
            ("Down", "↓", 0, 1, 1, 1), ("Right", "→", 1, 0, 2, 1),
        ]:
            def action(event=None, dx=dx, dy=dy):
                self.glisser(dx, dy)
                return "break"
            ttk.Button(commandes, text=texte, command=action, width=5).grid(row=ligne, column=colonne)
            racine.bind("<" + touche + ">", action)

        menu = ttk.Frame(racine)
        menu.grid(row=5, padx=12, pady=10)
        self.retour = ttk.Button(menu, text="Annuler", command=self.annuler)
        self.retour.pack(side="left", padx=2)
        ttk.Button(menu, text="Recommencer", command=lambda: self.ouvrir(self.numero)).pack(side="left", padx=2)
        self.suivante = ttk.Button(menu, text="Tournée suivante", command=self.avancer)
        self.suivante.pack(side="left", padx=2)
        self.ouvrir(0)

    @staticmethod
    def charger_tuiles():
        atlas = tk.PhotoImage(file=str(Path(__file__).with_name("tuiles.png")))
        tuiles = []
        for i in range(7):
            image = tk.PhotoImage(width=48, height=48)
            image.tk.call(str(image), "copy", str(atlas), "-from", 24 * i, 0, 24 * (i + 1), 24, "-zoom", 2, 2)
            tuiles.append(image)
        return tuiles

    def ouvrir(self, numero):
        self.numero = numero
        self.tournee = Tournee(numero)
        self.sprite = 5
        self.toile.configure(width=self.tournee.largeur * 48, height=self.tournee.hauteur * 48)
        self.titre.set("Poste Polaire · " + self.tournee.nom)
        self.info.set("Glisse avec les flèches. Ramasse les enveloppes puis arrête-toi au bureau orange.")
        self.suivante.configure(text="Nouvelle tournée" if numero == len(NIVEAUX) - 1 else "Tournée suivante")
        self.dessiner()

    def avancer(self):
        if self.tournee.distribue():
            self.ouvrir((self.numero + 1) % len(NIVEAUX))

    def glisser(self, dx, dy):
        if self.tournee.distribue():
            return
        if not self.tournee.glisser(dx, dy):
            self.info.set("Le passage est bloqué dans cette direction.")
            return
        if dx:
            self.sprite = 6 if dx < 0 else 5
        if self.tournee.distribue():
            self.info.set("Courrier livré ! Meilleur trajet possible en " + str(self.tournee.objectif) + " glissades.")
        elif not self.tournee.lettres:
            self.info.set("Sacoche pleine. Rejoins le bureau orange.")
        else:
            self.info.set("Continue jusqu’à la prochaine enveloppe.")
        self.dessiner()

    def annuler(self):
        if self.tournee.annuler():
            self.info.set("Dernière glissade annulée.")
            self.dessiner()

    def dessiner(self):
        self.toile.delete("all")
        t = self.tournee
        for y, ligne in enumerate(t.carte):
            for x, contenu in enumerate(ligne):
                index = y * t.largeur + x
                sprites = [(x + y) % 2]
                if contenu == "#":
                    sprites.append(2)
                if index == t.bureau:
                    sprites.append(4)
                if index in t.lettres:
                    sprites.append(3)
                if index == t.position:
                    sprites.append(self.sprite)
                for sprite in sprites:
                    self.toile.create_image(x * 48, y * 48, image=self.tuiles[sprite], anchor="nw")
        self.bilan.set(f"Courrier {t.total - len(t.lettres)}/{t.total}   ·   Glissades {t.coups}")
        self.retour.state(["!disabled"] if t.coups else ["disabled"])
        self.suivante.state(["!disabled"] if t.distribue() else ["disabled"])


if __name__ == "__main__":
    fenetre = tk.Tk()
    Fenetre(fenetre)
    fenetre.mainloop()

