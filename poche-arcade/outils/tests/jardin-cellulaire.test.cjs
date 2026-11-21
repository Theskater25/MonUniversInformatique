const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

test("le moteur HTML avance un oscillateur de une puis dix générations", () => {
  const fichier = path.join(__dirname, "../../jardin-cellulaire/moteur.gen.js");
  const contexte = vm.createContext({});
  vm.runInContext(fs.readFileSync(fichier, "utf8"), contexte);

  // Exécuter le fichier livré au navigateur avec un délai borné détecte aussi une boucle de compilation.
  vm.runInContext(`
    const jardin = new MoteurClassique.Partie(0);
    jardin.agir("oscillateur");
    jardin.agir("pas");
  `, contexte, { timeout: 2000 });
  const vivantes = () => Array.from(vm.runInContext(
    "jardin.cellules.flatMap((vivante, i) => vivante ? [i] : [])", contexte));
  assert.deepEqual(vivantes(), [53, 65, 77]);

  vm.runInContext('jardin.agir("10")', contexte, { timeout: 2000 });
  assert.equal(vm.runInContext("jardin.generation", contexte), 11);
  assert.deepEqual(vivantes(), [53, 65, 77]);
});
