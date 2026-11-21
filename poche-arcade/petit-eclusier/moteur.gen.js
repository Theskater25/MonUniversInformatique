// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurPlateau = (() => {
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
var _pyfunc_str = String;
var Partie;
"Deux bassins, des transvasements conservatifs et une mesure \u00e0 atteindre.";
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (niveau, graine) {
    var stub1_;
    graine = (graine === undefined) ? 0: graine;
    stub1_ = [[[3, 5], 4], [[4, 7], 2], [[7, 11], 5]][niveau];
    this.capacites = stub1_[0];this.cible = stub1_[1];
    this.eau = [0, 0];
    this.coups = 0;
    this.etat = "jeu";
    this.message = ("La p\u00e9niche attend " + _pyfunc_str(this.cible)) + " unit\u00e9s d\u2019eau dans un bassin.";
    return null;
};

Partie.prototype.jouer = function (action, valeur) {
    var autre, avant, transfert;
    if ((!_pyfunc_op_equals(this.etat, "jeu"))) {
        return null;
    }
    avant = this.eau.slice(0);
    if (_pyfunc_op_equals(action, "remplir")) {
        this.eau[valeur] = this.capacites[valeur];
    } else if (_pyfunc_op_equals(action, "vider")) {
        this.eau[valeur] = 0;
    } else if (_pyfunc_op_equals(action, "verser")) {
        autre = 1 - valeur;
        transfert = Math.min(this.eau[valeur], (this.capacites[autre] - this.eau[autre]));
        this.eau[valeur] -= transfert;
        this.eau[autre] = _pyfunc_op_add(this.eau[autre], transfert);
    }
    if (_pyfunc_op_equals(avant, this.eau)) {
        this.message = "Cette man\u0153uvre ne change pas le niveau.";
        return null;
    }
    this.coups += 1;
    this.message = ("Niveau ajust\u00e9. Objectif \u00b7 " + _pyfunc_str(this.cible)) + " unit\u00e9s.";
    if (_pyfunc_op_contains(this.cible, this.eau)) {
        this.etat = "gagne";
        this.message = "Niveau exact ! La p\u00e9niche franchit l\u2019\u00e9cluse.";
    }
    return null;
};


return { Partie };
})();
