// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurClassique = (() => {
var _pyfunc_int = function (x, base) { // nargs: 1 2
    if(base !== undefined) return parseInt(x, base);
    return x<0 ? Math.ceil(x): Math.floor(x);
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
var _pymeth_append = function (x) { // nargs: 1
    if (!Array.isArray(this)) return this.append.apply(this, arguments);
    this.push(x);
};
var Partie;
Partie = function () {
    // Sept propositions pour retrouver le prix entier d'un lot.
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    mode = (mode === undefined) ? 0: mode;
    this.secret = 1 + (graine % 100);
    this.bas = 1;
    this.haut = 100;
    this.essais = [];
    this.etat = 0;
    this.points = 0;
    this.message = "Le prix du lot est compris entre 1 et 100.";
    return null;
};

Partie.prototype.jouer = function (valeur) {
    if ((!_pyfunc_op_equals(this.etat, 0))) {
        return null;
    }
    if (((valeur < this.bas) || (valeur > this.haut) || (!_pyfunc_op_equals(valeur, _pyfunc_int(valeur))))) {
        this.message = ((("Choisis un entier entre " + _pyfunc_str(this.bas)) + " et ") + _pyfunc_str(this.haut)) + ".";
        return null;
    }
    _pymeth_append.call(this.essais, valeur);
    if (_pyfunc_op_equals(valeur, this.secret)) {
        this.etat = 1;
        this.points = 8 - this.essais.length;
        this.message = ("Juste prix ! Le lot vaut " + _pyfunc_str(valeur)) + ".";
    } else if ((this.essais.length == 7)) {
        this.etat = -1;
        this.message = ("Le march\u00e9 ferme. Le prix \u00e9tait " + _pyfunc_str(this.secret)) + ".";
    } else if ((valeur < this.secret)) {
        this.bas = valeur + 1;
        this.message = "Plus grand !";
    } else {
        this.haut = valeur - 1;
        this.message = "Plus petit !";
    }
    return null;
};

Partie.prototype.mesures = function () {
    return [["Essais", _pyfunc_str(this.essais.length) + " / 7"], ["Fourchette", (_pyfunc_str(this.bas) + " \u2013 ") + _pyfunc_str(this.haut)]];
};


return { Partie };
})();
