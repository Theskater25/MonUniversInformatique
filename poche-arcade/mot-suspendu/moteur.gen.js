// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurClassique = (() => {
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
var _pymeth_find = function (x, start, stop) { // nargs: 1 2 3
    if (this.constructor !== String) return this.find.apply(this, arguments);
    start = (start === undefined) ? 0 : start;
    stop = (stop === undefined) ? this.length : stop;
    start = Math.max(0, ((start < 0) ? this.length + start : start));
    stop = Math.min(this.length, ((stop < 0) ? this.length + stop : stop));
    var i = this.slice(start, stop).indexOf(x);
    if (i >= 0) return i + start;
    return -1;
};
var _pymeth_upper = function () { // nargs: 0
    if (this.constructor !== String) return this.upper.apply(this, arguments);
    return this.toUpperCase();
};
var MOTS, Partie, lettre_simple;
MOTS = ["BOUSSOLE", "\u00c9CUREUIL", "M\u00c9SANGE", "TAMBOUR", "VITRAIL", "\u00c9CLUSE", "LUCIOLE", "LANTERNE", "H\u00c9RISSON", "BOBINE", "NUAGE", "CERISE", "PAPILLON", "M\u00c9T\u00c9ORE", "ORIGAMI", "FEN\u00caTRE", "ATELIER", "RIVI\u00c8RE"];
lettre_simple = function flx_lettre_simple (lettre) {
    var accents, i, simples;
    accents = "\u00c0\u00c2\u00c4\u00c7\u00c9\u00c8\u00ca\u00cb\u00ce\u00cf\u00d4\u00d6\u00d9\u00db\u00dc\u0178";
    simples = "AAACEEEEIIOOUUUY";
    i = _pymeth_find.call(accents, lettre);
    if ((i >= 0)) {
        return simples[i];
    }
    return lettre;
};

Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    mode = (mode === undefined) ? 0: mode;
    this.mot = MOTS[graine % MOTS.length];
    this.lettres = [];
    this.erreurs = 0;
    this.etat = 0;
    this.points = 0;
    this.message = "Compose le mot de l\u2019imprimeur. Tu peux te tromper six fois.";
    return null;
};

Partie.prototype.masque = function () {
    var lettre, lettres, stub1_seq, stub2_itr;
    lettres = [];
    stub1_seq = this.mot;
    if ((typeof stub1_seq === "object") && (!Array.isArray(stub1_seq))) { stub1_seq = Object.keys(stub1_seq);}
    for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
        lettre = stub1_seq[stub2_itr];
        if ((((_pyfunc_op_contains(lettre_simple(lettre), this.lettres))) || (_pyfunc_op_equals(this.etat, (-1))))) {
            _pymeth_append.call(lettres, lettre);
        } else {
            _pymeth_append.call(lettres, "_");
        }
    }
    return lettres;
};

Partie.prototype.jouer = function (saisie) {
    var lettre;
    if ((!_pyfunc_op_equals(this.etat, 0))) {
        return null;
    }
    if (_pyfunc_truthy(saisie.length != 1)) {
        this.message = "Propose une seule lettre.";
        return null;
    }
    lettre = lettre_simple(_pymeth_upper.call(saisie));
    if ((_pyfunc_truthy(lettre.length != 1) || (_pyfunc_op_equals(_pymeth_find.call("ABCDEFGHIJKLMNOPQRSTUVWXYZ", lettre), (-1))))) {
        this.message = "Propose une lettre de l\u2019alphabet.";
        return null;
    }
    if (_pyfunc_op_contains(lettre, this.lettres)) {
        this.message = "Cette lettre est d\u00e9j\u00e0 sur le composteur.";
        return null;
    }
    _pymeth_append.call(this.lettres, lettre);
    if ((_pyfunc_op_contains(lettre, ((function list_comprehension (iter0) {var res = [];var c, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {c = iter0[i0];{res.push(lettre_simple(c));}}return res;}).call(this, this.mot))))) {
        this.message = "Bonne lettre !";
    } else {
        this.erreurs += 1;
        this.message = "Cette lettre manque au tirage.";
    }
    if ((!_pyfunc_op_contains("_", this.masque()))) {
        this.etat = 1;
        this.points = 7 - this.erreurs;
        this.message = ("Bon \u00e0 tirer ! Le mot est " + this.mot) + ".";
    } else if (_pyfunc_op_equals(this.erreurs, 6)) {
        this.etat = -1;
        this.message = ("Plus d\u2019encre ! Le mot \u00e9tait " + this.mot) + ".";
    }
    return null;
};

Partie.prototype.mesures = function () {
    return [["Encre", (_pyfunc_str((6 - this.erreurs))) + " / 6"], ["Mot", _pyfunc_str(this.mot.length) + " lettres"]];
};


return { Partie };
})();
