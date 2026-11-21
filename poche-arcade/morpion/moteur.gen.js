// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurClassique = (() => {
var _pyfunc_all = function (x) { // nargs: 1
    for (var i=0; i<x.length; i++) {
        if (!_pyfunc_truthy(x[i])){return false;}
    } return true;
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
var _pyfunc_range = function (start, end, step) {
    var i, res = [];
    var val = start;
    var n = (end - start) / step;
    for (i=0; i<n; i++) {
        res.push(val);
        val += step;
    }
    return res;
};
var _pyfunc_truthy = function (v) {
    if (v === null || typeof v !== "object") {return v;}
    else if (v.length !== undefined) {return v.length ? v : false;}
    else if (v.byteLength !== undefined) {return v.byteLength ? v : false;}
    else if (v.constructor !== Object) {return true;}
    else {return Object.getOwnPropertyNames(v).length ? v : false;}
};
var LIGNES, Partie;
LIGNES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var stub1_, stub1_i, stub1_i0, stub1_iter0;
    mode = (mode === undefined) ? 0: mode;
    this.mode = mode;
    stub1_ = [];stub1_iter0 = _pyfunc_range(0, 9, 1);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1_i = stub1_iter0[stub1_i0];{stub1_.push(0);}}
    this.plateau = stub1_;
    this.tour = 1;
    this.coups = 0;
    this.ligne = [];
    this.etat = 0;
    this.points = 0;
    this.message = "Les croix ouvrent la partie.";
    return null;
};

Partie.prototype.alignement = function (pion) {
    var ligne, stub2_seq, stub3_itr;
    stub2_seq = LIGNES;
    if ((typeof stub2_seq === "object") && (!Array.isArray(stub2_seq))) { stub2_seq = Object.keys(stub2_seq);}
    for (stub3_itr = 0; stub3_itr < stub2_seq.length; stub3_itr += 1) {
        ligne = stub2_seq[stub3_itr];
        if ((_pyfunc_all(((function list_comprehension (iter0) {var res = [];var i, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {i = iter0[i0];{res.push(_pyfunc_op_equals(this.plateau[i], pion));}}return res;}).call(this, ligne))))) {
            return ligne;
        }
    }
    return [];
};

Partie.prototype.poser = function (i) {
    this.plateau[i] = this.tour;
    this.coups += 1;
    this.ligne = this.alignement(this.tour);
    if ((this.ligne.length > 0)) {
        this.etat = ((_pyfunc_op_equals(this.tour, 1) || _pyfunc_op_equals(this.mode, 1)))? (1) : (-1);
        this.points = 10 - this.coups;
        this.message = (_pyfunc_op_equals(this.tour, 1))? ("Les croix gagnent !") : ("Les ronds gagnent !");
    } else if (_pyfunc_op_equals(this.coups, 9)) {
        this.etat = 2;
        this.message = "Grille compl\u00e8te. Match nul !";
    } else {
        this.tour = 3 - this.tour;
        this.message = (_pyfunc_op_equals(this.tour, 1))? ("Aux croix de jouer.") : ("Aux ronds de jouer.");
    }
    return null;
};

Partie.prototype.choix_auto = function () {
    var gagne, i, pion, stub4_seq, stub5_itr, stub6_seq, stub7_itr;
    stub4_seq = [2, 1];
    if ((typeof stub4_seq === "object") && (!Array.isArray(stub4_seq))) { stub4_seq = Object.keys(stub4_seq);}
    for (stub5_itr = 0; stub5_itr < stub4_seq.length; stub5_itr += 1) {
        pion = stub4_seq[stub5_itr];
        for (i = 0; i < 9; i += 1) {
            if (_pyfunc_op_equals(this.plateau[i], 0)) {
                this.plateau[i] = pion;
                gagne = (this.alignement(pion).length) > 0;
                this.plateau[i] = 0;
                if (_pyfunc_truthy(gagne)) {
                    return i;
                }
            }
        }
    }
    stub6_seq = [4, 0, 2, 6, 8, 1, 3, 5, 7];
    if ((typeof stub6_seq === "object") && (!Array.isArray(stub6_seq))) { stub6_seq = Object.keys(stub6_seq);}
    for (stub7_itr = 0; stub7_itr < stub6_seq.length; stub7_itr += 1) {
        i = stub6_seq[stub7_itr];
        if (_pyfunc_op_equals(this.plateau[i], 0)) {
            return i;
        }
    }
    return -1;
};

Partie.prototype.jouer = function (i) {
    if ((((!_pyfunc_op_equals(this.etat, 0))) || (i < 0) || (i >= 9) || (!_pyfunc_op_equals(this.plateau[i], 0)))) {
        return null;
    }
    this.poser(i);
    if ((_pyfunc_op_equals(this.etat, 0) && _pyfunc_op_equals(this.mode, 0))) {
        this.poser(this.choix_auto());
    }
    return null;
};

Partie.prototype.mesures = function () {
    return [["Coups", this.coups], ["Mode", (_pyfunc_op_equals(this.mode, 1))? ("Duo") : ("Solo")]];
};


return { Partie };
})();
