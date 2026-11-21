"""Jeux d'arcade en fenêtre Pygame. Lancez python jeux_2d.py."""

from outils.cartouches import ARCADE, choisir, graine, moteur


def peindre(pygame, surface, formes):
    for type_forme, x, y, largeur, hauteur, teinte in formes:
        if type_forme == "l":
            pygame.draw.line(surface, teinte, (round(x), round(y)), (round(largeur), round(hauteur)))
            continue
        rectangle = pygame.Rect(round(x), round(y), largeur, hauteur)
        if type_forme == "e":
            pygame.draw.ellipse(surface, teinte, rectangle)
        else:
            pygame.draw.rect(surface, teinte, rectangle)


def jouer(pygame, jeu):
    pygame.display.init()
    pygame.font.init()
    fenetre = pygame.display.set_mode((880, 630), pygame.RESIZABLE)
    horloge = pygame.time.Clock()
    police = pygame.font.Font(None, 24)
    petite = pygame.font.Font(None, 20)
    grande = pygame.font.Font(None, 38)
    classe = moteur(jeu)
    touches = {pygame.K_LEFT: 0, pygame.K_q: 0, pygame.K_a: 0, pygame.K_RIGHT: 1, pygame.K_d: 1,
               pygame.K_UP: 2, pygame.K_z: 2, pygame.K_w: 2, pygame.K_DOWN: 3, pygame.K_s: 3, pygame.K_SPACE: 4}
    etats = {"pret": "Entrée pour jouer", "pause": "En pause · P pour reprendre", "fin": "Entrée pour rejouer"}
    decor = pygame.Surface((320, 192))
    cadre = decor.copy()

    def demarrer():
        partie = classe(graine())
        decor.fill(partie.fond)
        peindre(pygame, decor, partie.decor)
        pygame.display.set_caption(partie.nom + " · Poche Arcade")
        return partie

    partie = demarrer()
    phase = "pret"
    actives = set()
    appuis = [False] * 5
    retard = 0.0
    marche = True
    while marche:
        delta = min(horloge.tick(60) / 1000, 0.1)
        for evt in pygame.event.get():
            if evt.type == pygame.QUIT:
                marche = False
            elif evt.type == pygame.WINDOWFOCUSLOST:
                if phase == "jeu":
                    phase = "pause"
                actives.clear()
                appuis = [False] * 5
            elif evt.type == pygame.KEYUP:
                actives.discard(evt.key)
            elif evt.type == pygame.KEYDOWN:
                if evt.key == pygame.K_ESCAPE:
                    marche = False
                elif evt.key == pygame.K_RETURN and phase in {"pret", "fin", "pause"}:
                    if phase == "fin":
                        partie = demarrer()
                    phase = "jeu"
                    retard = 0.0
                elif evt.key == pygame.K_r:
                    partie = demarrer()
                    phase = "jeu"
                    actives.clear()
                    appuis = [False] * 5
                    retard = 0.0
                elif evt.key == pygame.K_p and phase in {"jeu", "pause"}:
                    phase = "pause" if phase == "jeu" else "jeu"
                    actives.clear()
                    appuis = [False] * 5
                    retard = 0.0
                elif phase == "jeu" and evt.key in touches and evt.key not in actives:
                    actives.add(evt.key)
                    appuis[touches[evt.key]] = True
        if not marche:
            break
        if phase == "jeu":
            retard += delta
            while retard >= 1 / 60 and partie.etat == 0:
                maintenu = appuis[:]
                for touche in actives:
                    maintenu[touches[touche]] = True
                partie.avancer(maintenu, appuis)
                appuis = [False] * 5
                retard -= 1 / 60
            if partie.etat:
                phase = "fin"
                actives.clear()
        cadre.blit(decor, (0, 0))
        peindre(pygame, cadre, partie.dessin())
        largeur, hauteur = fenetre.get_size()
        echelle = min(max(1, largeur - 16) / 320, max(1, hauteur - 100) / 192)
        taille = (max(1, int(320 * echelle)), max(1, int(192 * echelle)))
        centre = largeur // 2
        haut = max(31, (hauteur - taille[1]) // 2 - 8)
        fenetre.fill("#282634")
        stats = "     ".join(f"{nom}  {valeur}" for nom, valeur in partie.mesures())
        fenetre.blit(police.render(stats, True, "#ffe7b0"), (10, 7))
        fenetre.blit(pygame.transform.scale(cadre, taille), (centre - taille[0] // 2, haut))
        if phase in etats:
            bandeau = grande.render(etats[phase], True, "#ffe8b1", "#332e40")
            fenetre.blit(bandeau, bandeau.get_rect(center=(centre, haut + taille[1] // 2)))
        aide = partie.message if phase == "fin" else partie.aide
        if partie.etat == 0 and getattr(partie, "service", False) is True:
            aide = "Espace pour lancer la bille. Flèches ou Q/D pour déplacer la barre."
        fenetre.blit(petite.render(aide, True, "#fff0d4"), (10, hauteur - 42))
        fenetre.blit(petite.render("P · Pause     R · Rejouer     Échap · Quitter", True, "#d4c7c0"), (10, hauteur - 22))
        pygame.display.flip()


if __name__ == "__main__":
    selection = choisir(ARCADE, __doc__)
    if selection:
        try:
            import pygame
        except ModuleNotFoundError:
            raise SystemExit("Installe Pygame avec : python -m pip install -r requirements-jeux.txt")
        try:
            jouer(pygame, selection)
        finally:
            pygame.quit()
