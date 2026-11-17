# Mon Univers Informatique — Version 2.0

> Version de développement privée. Le portfolio public existant n'est pas modifié.

## Fonctionnalités incluses

- Page d'accueil responsive et présentation actualisée pour le BUT Informatique
- Galerie de projets et filtres par technologie
- Démonstration de Blackjack jouable dans le navigateur, sans argent ni paris
- Frise chronologique du parcours
- Statistiques des dépôts publics GitHub, chargées depuis l'API publique (un indisponibilité de l'API affiche un message)
- Traduction français / anglais mémorisée localement
- Animations légères avec respect de la préférence « réduire les animations »
- Emplacement prévu pour un CV PDF (aucun fichier CV n'a encore été ajouté)

## Fichiers

- `index.html` : accueil, parcours, GitHub et contact
- `generic.html` : projets et filtres
- `assets/css/style.css` : design et responsive
- `assets/js/app.js` : traductions, filtres et statistiques GitHub
- `assets/i18n/fr.json` et `assets/i18n/en.json` : textes traduits
- `demos/blackjack.html` et `demos/blackjack.js` : démo jouable
- `assets/cv/README.md` : instructions pour ajouter ton CV

## Tester localement

Utilise un petit serveur HTTP dans le dossier du dépôt (nécessaire pour charger les fichiers JSON de traduction) :

```bash
python -m http.server 8000
```

Puis ouvre http://localhost:8000/ et teste les pages, les filtres et le changement de langue.

## Avant publication

1. Relire tous les textes et vérifier les informations personnelles.
2. Ajouter un véritable CV PDF et activer le lien seulement après validation.
3. Vérifier le formulaire de contact et les liens GitHub.
4. Tester le responsive, le clavier, les deux langues et le Blackjack.
5. Déployer uniquement dans le dépôt public quand tu décides de publier.

**Note :** les statistiques GitHub font appel à l'API publique directement depuis le navigateur ; leur affichage peut être limité temporairement par le quota API. La démo Blackjack est une adaptation web indépendante du projet Python original.
