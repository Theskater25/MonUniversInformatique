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
var _pyfunc_op_mult = function (a, b) { // nargs: 2
    if ((typeof a === 'number') + (typeof b === 'number') === 1) {
        if (a.constructor === String) return _pymeth_repeat.call(a, b);
        if (b.constructor === String) return _pymeth_repeat.call(b, a);
        if (Array.isArray(b)) {var t=a; a=b; b=t;}
        if (Array.isArray(a)) {
            var res = []; for (var i=0; i<b; i++) res = res.concat(a);
            return res;
        }
    } return a * b;
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
var _pymeth_repeat = function(count) { // nargs: 0
    if (this.repeat) return this.repeat(count);
    if (count < 1) return '';
    var result = '', pattern = this.valueOf();
    while (count > 1) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result + pattern;
};
var Partie;
"Permutation cyclique des fils sur les lignes et les colonnes.";
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (niveau, graine) {
    var action, i, melanges, palettes, stub1_seq, stub2_itr, stub3_tgt;
    graine = (graine === undefined) ? 0: graine;
    this.largeur = [3, 3, 4][niveau];
    palettes = [[0, 1, 2, 1, 2, 0, 2, 0, 1], [1, 2, 0, 3, 0, 1, 2, 1, 3], [0, 1, 1, 0, 2, 3, 3, 2, 1, 0, 0, 1, 3, 2, 2, 3]];
    this.modele = palettes[niveau];
    this.cases = this.modele.slice(0);
    melanges = [[["ligne", 0], ["colonne", 1]], [["colonne", 2], ["ligne", 1], ["colonne", 0]], [["ligne", 2], ["colonne", 1], ["ligne", 0], ["colonne", 3]]];
    stub1_seq = melanges[niveau];
    if ((typeof stub1_seq === "object") && (!Array.isArray(stub1_seq))) { stub1_seq = Object.keys(stub1_seq);}
    for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
        stub3_tgt = stub1_seq[stub2_itr];
        action = stub3_tgt[0]; i = stub3_tgt[1];
        this.decaler(action, i, -1);
    }
    this.coups = 0;
    this.etat = "jeu";
    this.message = "Observe le mod\u00e8le puis d\u00e9cale les rang\u00e9es de fils.";
    return null;
};

Partie.prototype.decaler = function (action, i, pas) {
    var ancien, indices, j, n, stub4_, stub4_i0, stub4_iter0, stub4_k;
    n = this.largeur;
    indices = (_pyfunc_op_equals(action, "ligne"))? ((function list_comprehension (iter0) {var res = [];var j, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {j = iter0[i0];{res.push(_pyfunc_op_add(_pyfunc_op_mult(i, n), j));}}return res;}).call(this, _pyfunc_range(0, n, 1))) : ((function list_comprehension (iter0) {var res = [];var j, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {j = iter0[i0];{res.push(_pyfunc_op_add(_pyfunc_op_mult(j, n), i));}}return res;}).call(this, _pyfunc_range(0, n, 1)));
    stub4_ = [];stub4_iter0 = indices;if ((typeof stub4_iter0 === "object") && (!Array.isArray(stub4_iter0))) {stub4_iter0 = Object.keys(stub4_iter0);}for (stub4_i0=0; stub4_i0<stub4_iter0.length; stub4_i0++) {stub4_k = stub4_iter0[stub4_i0];{stub4_.push(this.cases[stub4_k]);}}
    ancien = stub4_;
    for (j = 0; j < n; j += 1) {
        this.cases[indices[(_pyfunc_op_add(_pyfunc_op_add(j, pas), n)) % n]] = ancien[j];
    }
    return null;
};

Partie.prototype.jouer = function (action, valeur) {
    if ((((!_pyfunc_op_equals(this.etat, "jeu"))) || (!_pyfunc_op_contains(action, ["ligne", "colonne"])))) {
        return null;
    }
    this.decaler(action, valeur, 1);
    this.coups += 1;
    if (_pyfunc_op_equals(this.modele, this.cases)) {
        this.etat = "gagne";
        this.message = "Les fils reproduisent le motif de l\u2019atelier !";
    }
    return null;
};


return { Partie };
})();
