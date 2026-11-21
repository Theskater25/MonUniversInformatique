from moteurs.poche import Hasard

SALLES = ["Vestibule", "Salle des index", "Apothicairerie", "Réserve", "Carrefour des plumes",
          "Galerie du buvard", "Reliquaire", "Bassin de rinçage", "Chambre du manuscrit"]
PASSAGES = [{"d": 1, "b": 3}, {"g": 0, "d": 2, "b": 4}, {"g": 1, "b": 5},
            {"h": 0, "d": 4, "b": 6}, {"h": 1, "d": 5, "b": 7, "g": 3}, {"h": 2, "g": 4, "b": 8},
            {"h": 3, "d": 7}, {"g": 6, "h": 4, "d": 8}, {"g": 7, "h": 5}]
NOMS = {"g": "Ouest", "d": "Est", "h": "Nord", "b": "Sud"}
GARDIENS = {5: "Buvard affamé", 6: "Goutte de suie", 8: "Relieur d’ombre"}


class Partie:
    def __init__(self, graine, mode=0):
        self.hasard = Hasard(graine)
        self.salle = 0
        self.visitees = [0]
        self.fouillees = []
        self.vaincus = []
        self.vie = 18
        self.fioles = 2
        self.sceaux = 0
        self.ennemi = 0
        self.elan = False
        self.etat = 0
        self.points = 0
        self.message = "Les gardiens du buvard et du reliquaire détiennent les deux sceaux du manuscrit."

    def agir(self, action):
        if self.etat:
            return
        if action == "boire":
            if self.fioles == 0 or self.vie == 18:
                self.message = "La fiole se boit quand il te manque de la vie."
                return
            self.fioles -= 1
            self.vie = min(18, self.vie + 8)
            self.message = "Tu bois une fiole."
        elif self.ennemi:
            if action == "parer":
                self.elan = True
                self.message = "Tu pares sa griffe et prépares une riposte."
                return
            if action != "frapper":
                self.message = "Choisis une action de combat."
                return
            degats = 3 + self.hasard.entier(3) + (4 if self.elan else 0)
            self.elan = False
            self.ennemi = max(0, self.ennemi - degats)
            self.message = "Ton pinceau inflige " + str(degats) + " dégâts."
            if self.ennemi == 0:
                self.vaincus.append(self.salle)
                if self.salle == 8:
                    self.etat = 1
                    self.points = 80 + self.vie + self.fioles * 3
                    self.message = "Le relieur est vaincu. Tu rapportes le manuscrit à la bibliothèque !"
                else:
                    self.sceaux += 1
                    self.message = "Gardien vaincu. Tu ranges son sceau dans ta sacoche."
                return
        elif action == "fouiller":
            if self.salle in self.fouillees:
                self.message = "Tu as déjà fouillé cette salle."
                return
            self.fouillees.append(self.salle)
            if self.salle in [1, 2, 3, 7]:
                self.fioles += 1
                self.message = "Une fiole de soin rejoint ta sacoche."
            else:
                self.message = "La poussière ne cache rien d’autre."
            return
        elif action in PASSAGES[self.salle]:
            destination = PASSAGES[self.salle][action]
            if destination == 8 and self.sceaux < 2:
                self.message = "La chambre demande les deux sceaux."
                return
            self.salle = destination
            if destination not in self.visitees:
                self.visitees.append(destination)
            self.message = "Tu entres dans la salle « " + SALLES[destination] + " »."
            if destination in [5, 6, 8] and destination not in self.vaincus:
                self.ennemi = 17 if destination == 8 else 10
                self.elan = False
                self.message += " " + GARDIENS[destination] + " te barre le passage."
            return
        else:
            self.message = "Choisis un passage ou une action disponible."
            return
        if self.ennemi:
            riposte = 2 + self.hasard.entier(2) + (1 if self.salle == 8 else 0)
            self.vie = max(0, self.vie - riposte)
            self.message += " Le gardien riposte pour " + str(riposte) + "."
            if self.vie == 0:
                self.etat = -1
                self.message = "Ta lanterne s’éteint dans la crypte."

    def vue(self):
        cases = ["@" if i == self.salle else "." if i in self.visitees else "?" for i in range(9)]
        notes = ["Sacoche · " + str(self.fioles) + " fiole(s) de soin, " + str(self.sceaux) + " sceau(x)."]
        if self.ennemi:
            notes.append(GARDIENS[self.salle] + " · " + str(self.ennemi) + " points de vie.")
        return {"titre": SALLES[self.salle], "colonnes": 3, "grille": cases,
                "styles": ["heros" if i == self.salle else "salle" for i in range(9)], "notes": notes}

    def commandes(self):
        if self.ennemi:
            actions = [["frapper", "Riposter" if self.elan else "Frapper"], ["parer", "Parer"]]
        else:
            actions = [[d, NOMS[d] + " · " + SALLES[PASSAGES[self.salle][d]]] for d in ["h", "g", "d", "b"] if d in PASSAGES[self.salle]]
            if self.salle not in self.fouillees:
                actions.append(["fouiller", "Fouiller"])
        if self.fioles and self.vie < 18:
            actions.append(["boire", "Boire une fiole"])
        return actions

    def mesures(self):
        return [["Vie", str(self.vie) + "/18"], ["Sceaux", str(self.sceaux) + "/2"]]
