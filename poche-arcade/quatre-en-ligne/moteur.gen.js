// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurClassique = (() => {
var _pyfunc_int = function (x, base) { // nargs: 1 2
    if(base !== undefined) return parseInt(x, base);
    return x<0 ? Math.ceil(x): Math.floor(x);
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
var _pymeth_append = function (x) { // nargs: 1
    if (!Array.isArray(this)) return this.append.apply(this, arguments);
    this.push(x);
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
Partie = function () {
    // Sept colonnes de six cases, avec chute des jetons et quatre axes de victoire.
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var stub1_, stub1_i, stub1_i0, stub1_iter0;
    mode = (mode === undefined) ? 0: mode;
    this.mode = mode;
    this.graine = graine;
    stub1_ = [];stub1_iter0 = _pyfunc_range(0, 42, 1);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1_i = stub1_iter0[stub1_i0];{stub1_.push(0);}}
    this.plateau = stub1_;
    this.tour = 1;
    this.coups = 0;
    this.ligne = [];
    this.etat = 0;
    this.points = 0;
    this.message = "Les jetons corail commencent. Choisis une colonne.";
    return null;
};

Partie.prototype.arrivee = function (colonne) {
    var i, y;
    for (y = 5; y > -1; y += -1) {
        i = _pyfunc_op_add(_pyfunc_op_mult(y, 7), colonne);
        if (_pyfunc_op_equals(this.plateau[i], 0)) {
            return i;
        }
    }
    return -1;
};

Partie.prototype.alignement = function (i, pion) {
    var axe, ligne, signe, stub2_seq, stub3_itr, stub4_seq, stub5_itr, x, y;
    stub4_seq = [[1, 0], [0, 1], [1, 1], [1, -1]];
    if ((typeof stub4_seq === "object") && (!Array.isArray(stub4_seq))) { stub4_seq = Object.keys(stub4_seq);}
    for (stub5_itr = 0; stub5_itr < stub4_seq.length; stub5_itr += 1) {
        axe = stub4_seq[stub5_itr];
        ligne = [i];
        stub2_seq = [-1, 1];
        if ((typeof stub2_seq === "object") && (!Array.isArray(stub2_seq))) { stub2_seq = Object.keys(stub2_seq);}
        for (stub3_itr = 0; stub3_itr < stub2_seq.length; stub3_itr += 1) {
            signe = stub2_seq[stub3_itr];
            x = _pyfunc_op_add((i % 7), _pyfunc_op_mult(axe[0], signe));
            y = _pyfunc_op_add((_pyfunc_int((i / 7))), _pyfunc_op_mult(axe[1], signe));
            while ((((0 <= x) && (x < 7))) && (((0 <= y) && (y < 6))) && ((_pyfunc_op_equals(this.plateau[_pyfunc_op_add(_pyfunc_op_mult(y, 7), x)], pion)))) {
                _pymeth_append.call(ligne, (_pyfunc_op_add(_pyfunc_op_mult(y, 7), x)));
                x = _pyfunc_op_add(x, _pyfunc_op_mult(axe[0], signe));
                y = _pyfunc_op_add(y, _pyfunc_op_mult(axe[1], signe));
            }
        }
        if ((ligne.length >= 4)) {
            return ligne;
        }
    }
    return [];
};

Partie.prototype.choix_auto = function () {
    var col, colonnes, i, pion, stub6_seq, stub7_itr, stub8_, stub8_c, stub8_i0, stub8_iter0;
    stub6_seq = [2, 1];
    if ((typeof stub6_seq === "object") && (!Array.isArray(stub6_seq))) { stub6_seq = Object.keys(stub6_seq);}
    for (stub7_itr = 0; stub7_itr < stub6_seq.length; stub7_itr += 1) {
        pion = stub6_seq[stub7_itr];
        for (col = 0; col < 7; col += 1) {
            i = this.arrivee(col);
            if (((i >= 0) && (((this.alignement(i, pion).length) >= 4)))) {
                return col;
            }
        }
    }
    stub8_ = [];stub8_iter0 = [3, 2, 4, 1, 5, 0, 6];if ((typeof stub8_iter0 === "object") && (!Array.isArray(stub8_iter0))) {stub8_iter0 = Object.keys(stub8_iter0);}for (stub8_i0=0; stub8_i0<stub8_iter0.length; stub8_i0++) {stub8_c = stub8_iter0[stub8_i0];if (!((this.arrivee(stub8_c) >= 0))) {continue;}{stub8_.push(stub8_c);}}
    colonnes = stub8_;
    this.graine = (_pyfunc_op_mult(this.graine, 9301) + 49297) % 233280;
    return colonnes[this.graine % Math.min(3, colonnes.length)];
};

Partie.prototype.poser = function (colonne) {
    var i;
    i = this.arrivee(colonne);
    this.plateau[i] = this.tour;
    this.coups += 1;
    this.ligne = this.alignement(i, this.tour);
    if ((this.ligne.length >= 4)) {
        this.etat = ((_pyfunc_op_equals(this.tour, 1) || _pyfunc_op_equals(this.mode, 1)))? (1) : (-1);
        this.points = 43 - this.coups;
        this.message = (_pyfunc_op_equals(this.tour, 1))? ("Les jetons corail gagnent !") : ("Les jetons turquoise gagnent !");
    } else if (_pyfunc_op_equals(this.coups, 42)) {
        this.etat = 2;
        this.message = "Grille pleine. Match nul !";
    } else {
        this.tour = 3 - this.tour;
        this.message = (_pyfunc_op_equals(this.tour, 1))? ("Au tour des jetons corail.") : ("Au tour des jetons turquoise.");
    }
    return null;
};

Partie.prototype.jouer = function (colonne) {
    if ((((!_pyfunc_op_equals(this.etat, 0))) || (colonne < 0) || (colonne > 6))) {
        return null;
    }
    if ((_pyfunc_op_equals(this.arrivee(colonne), (-1)))) {
        this.message = "Cette colonne est pleine.";
        return null;
    }
    this.poser(colonne);
    if ((_pyfunc_op_equals(this.etat, 0) && _pyfunc_op_equals(this.mode, 0))) {
        this.poser(this.choix_auto());
    }
    return null;
};

Partie.prototype.mesures = function () {
    return [["Jetons pos\u00e9s", this.coups], ["Mode", (_pyfunc_op_equals(this.mode, 1))? ("Duo") : ("Solo")]];
};


return { Partie };
})();
