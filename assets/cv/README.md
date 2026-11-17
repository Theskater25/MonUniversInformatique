# Ajouter le CV

Aucun CV PDF n’est fourni dans ce dépôt. L’accueil affiche donc « CV : en préparation ».

Pour activer le téléchargement lorsque le document est prêt :

1. Ajouter le fichier `assets/cv/CV-Clement-Dufour.pdf`.
2. Dans `index.html`, remplacer le `<span>` portant `data-i18n="contact.cv"` par un lien :

   ```html
   <a class="btn outline" href="assets/cv/CV-Clement-Dufour.pdf" download data-i18n="contact.cv">Télécharger mon CV</a>
   ```

3. Remplacer `contact.cv` dans les traductions : « Télécharger mon CV » en français et « Download my CV » en anglais.
4. Vérifier que le fichier téléchargé est le bon document.
