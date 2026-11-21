// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurPlateau = (() => {
var _pyfunc_abs = Math.abs;
var _pyfunc_op_add = function (a, b) { // nargs: 2
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.concat(b);
    } return a + b;
};
var _pyfunc_op_contains = function op_contains (a, b) { // nargs: 2
    if (b == null) {
    } else if (Array.isArray(b)) {
        for (var i=0; i<b.length; i++) {if (_pyfunc_op_equals(a, b[i]))
                                           return true;}
        return false;
    } else if (b.constructor === Object) {
        for (var k in b) {if (a == k) return true;}
        return false;
    } else if (b.constructor == String) {
        return b.indexOf(a) >= 0;
    } var e = Error('Not a container: ' + b); e.name='TypeError'; throw e;
};
var _pyfunc_op_equals = function op_equals (a, b) { // nargs: 2
    var a_type = typeof a;
    // If a (or b actually) is of type string, number or boolean, we don't need
    // to do all the other type checking below.
    if (a_type === "string" || a_type === "boolean" || a_type === "number") {
        return a == b;
    }

    if (a == null || b == null) {
    } else if (Array.isArray(a) && Array.isArray(b)) {
        var i = 0, iseq = a.length == b.length;
        while (iseq && i < a.length) {iseq = op_equals(a[i], b[i]); i+=1;}
        return iseq;
    } else if (a.constructor === Object && b.constructor === Object) {
        var akeys = Object.keys(a), bkeys = Object.keys(b);
        akeys.sort(); bkeys.sort();
        var i=0, k, iseq = op_equals(akeys, bkeys);
        while (iseq && i < akeys.length)
            {k=akeys[i]; iseq = op_equals(a[k], b[k]); i+=1;}
        return iseq;
    } return a == b;
};
var _pyfunc_op_instantiate = function (ob, args) { // nargs: 2
    if ((typeof ob === "undefined") ||
            (typeof window !== "undefined" && window === ob) ||
            (typeof global !== "undefined" && global === ob))
            {throw "Class constructor is called as a function.";}
    for (var name in ob) {
        if (Object[name] === undefined &&
            typeof ob[name] === 'function' && !ob[name].nobind) {
            ob[name] = ob[name].bind(ob);
            ob[name].__name__ = name;
        }
    }
    if (ob.__init__) {
        ob.__init__.apply(ob, args);
    }
};
var _pyfunc_truthy = function (v) {
    if (v === null || typeof v !== "object") {return v;}
    else if (v.length !== undefined) {return v.length ? v : false;}
    else if (v.byteLength !== undefined) {return v.byteLength ? v : false;}
    else if (v.constructor !== Object) {return true;}
    else {return Object.getOwnPropertyNames(v).length ? v : false;}
};
var _pymeth_append = function (x) { // nargs: 1
    if (!Array.isArray(this)) return this.append.apply(this, arguments);
    this.push(x);
};
var CARTES, Partie;
"Sentier sans revisite et d\u00e9nivel\u00e9 exact au refuge.";
CARTES = [[3, [0, 2, 3, 1, 3, 1, 2, 4, 0], 6], [4, [0, 3, -1, 2, 1, 5, 2, 3, 2, 1, 3, 4, -1, 3, 2, 0], 16], [5, [0, 2, 3, -1, 4, 1, -1, 2, 4, 1, 3, 2, 5, -1, 3, 4, -1, 1, 2, 0], 21]];
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (niveau, graine) {
    var stub1_;
    graine = (graine === undefined) ? 0: graine;
    stub1_ = CARTES[niveau];
    this.largeur = stub1_[0];this.cases = stub1_[1];this.cible = stub1_[2];
    this.chemin = [0];
    this.altitude = 0;
    this.coups = 0;
    this.etat = "jeu";
    this.message = "Choisis ton premier pas depuis le drapeau.";
    return null;
};

Partie.prototype.jouer = function (action, valeur) {
    var distance, nouveau, origine, refuge;
    if ((!_pyfunc_op_equals(this.etat, "jeu"))) {
        return null;
    }
    if ((_pyfunc_op_equals(action, "annuler") && (this.chemin.length > 1))) {
        this.altitude -= this.cases[this.chemin.pop()];
        this.coups -= 1;
        this.message = "Retour \u00e0 l\u2019\u00e9tape pr\u00e9c\u00e9dente.";
        return null;
    }
    if ((!_pyfunc_op_equals(action, "case"))) {
        return null;
    }
    origine = this.chemin[this.chemin.length -1];
    distance = _pyfunc_op_add((_pyfunc_abs(((valeur % this.largeur) - (origine % this.largeur)))), (_pyfunc_abs((Math.floor(valeur/this.largeur) - Math.floor(origine/this.largeur)))));
    if ((_pyfunc_op_contains(valeur, this.chemin) || (this.cases[valeur] < 0) || (!_pyfunc_op_equals(distance, 1)))) {
        this.message = "Choisis une case voisine encore libre.";
        return null;
    }
    nouveau = _pyfunc_op_add(this.altitude, this.cases[valeur]);
    refuge = _pyfunc_op_equals(valeur, (this.cases.length - 1));
    if (((nouveau > this.cible) || (_pyfunc_truthy(refuge) && ((!_pyfunc_op_equals(nouveau, this.cible)))))) {
        this.message = "Le refuge exige le d\u00e9nivel\u00e9 exact. Essaie un autre sentier.";
        return null;
    }
    this.altitude = nouveau;
    _pymeth_append.call(this.chemin, valeur);
    this.coups += 1;
    this.message = "Sentier trac\u00e9. Tu peux revenir d\u2019un pas.";
    if (_pyfunc_truthy(refuge)) {
        this.etat = "gagne";
        this.message = "Tu arrives au refuge avec le bon d\u00e9nivel\u00e9 !";
    }
    return null;
};


return { Partie };
})();
