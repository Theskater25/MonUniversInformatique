// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurPlateau = (() => {
var _pyfunc_abs = Math.abs;
var _pyfunc_all = function (x) { // nargs: 1
    for (var i=0; i<x.length; i++) {
        if (!_pyfunc_truthy(x[i])){return false;}
    } return true;
};
var _pyfunc_op_add = function (a, b) { // nargs: 2
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.concat(b);
    } return a + b;
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
var _pyfunc_truthy = function (v) {
    if (v === null || typeof v !== "object") {return v;}
    else if (v.length !== undefined) {return v.length ? v : false;}
    else if (v.byteLength !== undefined) {return v.byteLength ? v : false;}
    else if (v.constructor !== Object) {return true;}
    else {return Object.getOwnPropertyNames(v).length ? v : false;}
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
"Une luciole et ses voisines changent ensemble d'\u00e9tat.";
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (niveau, graine) {
    var hauteur, position, stub1_, stub1__, stub1_i0, stub1_iter0, stub2_seq, stub3_itr;
    graine = (graine === undefined) ? 0: graine;
    this.largeur = [3, 4, 5][niveau];
    hauteur = [3, 3, 4][niveau];
    stub1_ = [];stub1_iter0 = _pyfunc_range(0, _pyfunc_op_mult(this.largeur, hauteur), 1);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1__ = stub1_iter0[stub1_i0];{stub1_.push(true);}}
    this.cases = stub1_;
    stub2_seq = [[0, 5], [1, 4, 6, 10], [0, 3, 6, 12, 14, 18]][niveau];
    if ((typeof stub2_seq === "object") && (!Array.isArray(stub2_seq))) { stub2_seq = Object.keys(stub2_seq);}
    for (stub3_itr = 0; stub3_itr < stub2_seq.length; stub3_itr += 1) {
        position = stub2_seq[stub3_itr];
        this.inverser(position);
    }
    this.coups = 0;
    this.etat = "jeu";
    this.message = "Les points dor\u00e9s sont d\u00e9j\u00e0 allum\u00e9s.";
    return null;
};

Partie.prototype.inverser = function (origine) {
    var dx, dy, i;
    for (i = 0; i < this.cases.length; i += 1) {
        dx = _pyfunc_abs(((i % this.largeur) - (origine % this.largeur)));
        dy = _pyfunc_abs((Math.floor(i/this.largeur) - Math.floor(origine/this.largeur)));
        if ((_pyfunc_op_add(dx, dy) <= 1)) {
            this.cases[i] = !_pyfunc_truthy(this.cases[i]);
        }
    }
    return null;
};

Partie.prototype.jouer = function (action, valeur) {
    if ((((!_pyfunc_op_equals(this.etat, "jeu"))) || (!_pyfunc_op_equals(action, "case")))) {
        return null;
    }
    this.inverser(valeur);
    this.coups += 1;
    if (_pyfunc_all(this.cases)) {
        this.etat = "gagne";
        this.message = "Toute la clairi\u00e8re scintille !";
    }
    return null;
};


return { Partie };
})();
