# Mon Univers Informatique

Portfolio de Clément Dufour : parcours, projets personnels et démonstrations.

## Parcourir le site

- `index.html` : présentation, sélection de projets, parcours, activité GitHub et contact.
- `generic.html` : galerie avec filtres par technologie.
- `the-fantasy.html` : présentation du projet, captures de gameplay et historique de la V1 Python à la 2.7.
- `mancala.html` : fiche du projet collectif et contribution de Clément à l’affichage avec Pygame.
- `blackjack.html` : présentation du projet Python et de l’adaptation web.
- `creation-site-web.html` : évolution du portfolio, de sa première version à la version actuelle.
- `demos/blackjack.html` : démonstration jouable dans le navigateur, sans mises ni paris.

Le bouton « Jouer » de The Fantasy ouvre le site public du jeu. Le portfolio conserve aussi les liens vers son code et sa première version Python.

## Interface et ressources

- Français / anglais, avec mémorisation de la langue.
- Menu dépliant sur mobile ; navigation conservée si JavaScript est désactivé.
- Images locales en WebP, dimensions explicites et variantes adaptées à l’écran.
- Navigation clavier, indicateurs de focus et respect de la préférence de réduction des animations.
- Statistiques des dépôts publics issues de l’API publique GitHub, avec message de repli en cas d’indisponibilité.

Les textes sont dans `assets/i18n/`, les styles dans `assets/css/style.css` et les interactions communes dans `assets/js/app.js`.

## CV

Le PDF du CV n’a pas encore été fourni. L’accueil affiche « CV : en préparation ». La procédure pour activer un vrai téléchargement est dans [assets/cv/README.md](assets/cv/README.md).

## Tester localement

Depuis la racine du dépôt :

```bash
python -m http.server 8126
```

Ouvrir http://localhost:8126/. Un serveur HTTP est nécessaire pour les traductions JSON.

## Sources et crédits

- Mancala : Clément Faure, Clément Dufour et Tom Torrente. Clément Dufour a réalisé l’affichage.
- [Historique de The Fantasy](docs/the-fantasy-sources.md).
- [Sources des captures](assets/images/projects/README.md).
- [Sources des illustrations](assets/images/portraits/README.md).
- La première version du portfolio utilise le thème Hyperspace de HTML5 UP, crédité sur sa page d’évolution.
