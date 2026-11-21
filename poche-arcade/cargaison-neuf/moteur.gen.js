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
var CALES, Partie;
"Placement de pi\u00e8ces tournantes avec un point d'ancrage explicite.";
CALES = [["AAB", "CAB", "CCB"], ["AABB", "ACBD", "CCDD"], ["AAAB", "ACBB", "CCCB", "DDDD"]];
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (niveau, graine) {
    var lettre, modele, points, stub1_, stub1__, stub1_i0, stub1_iter0, stub2_seq, stub3_itr, x, y;
    graine = (graine === undefined) ? 0: graine;
    modele = CALES[niveau];
    this.largeur = modele[0].length;
    this.hauteur = modele.length;
    stub1_ = [];stub1_iter0 = _pyfunc_range(0, _pyfunc_op_mult(this.largeur, this.hauteur), 1);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1__ = stub1_iter0[stub1_i0];{stub1_.push(-1);}}
    this.cases = stub1_;
    this.formes = [];
    this.rotation = [];
    stub2_seq = "ABCD";
    if ((typeof stub2_seq === "object") && (!Array.isArray(stub2_seq))) { stub2_seq = Object.keys(stub2_seq);}
    for (stub3_itr = 0; stub3_itr < stub2_seq.length; stub3_itr += 1) {
        lettre = stub2_seq[stub3_itr];
        points = [];
        for (y = 0; y < this.hauteur; y += 1) {
            for (x = 0; x < this.largeur; x += 1) {
                if ((_pyfunc_op_equals((modele[y][x]), lettre))) {
                    _pymeth_append.call(points, [x, y]);
                }
            }
        }
        if (_pyfunc_truthy(points)) {
            _pymeth_append.call(this.formes, points);
            _pymeth_append.call(this.rotation, (_pyfunc_op_add(this.formes.length, niveau) % 4));
        }
    }
    this.selection = 0;
    this.coups = 0;
    this.etat = "jeu";
    this.message = "Place le point de la pi\u00e8ce sur une case libre.";
    return null;
};

Partie.prototype.forme = function () {
    var _, ancre, haut, point, points, stub4_, stub5_, stub6_seq, stub7_itr, x, y;
    points = [];
    stub6_seq = this.formes[this.selection];
    if ((typeof stub6_seq === "object") && (!Array.isArray(stub6_seq))) { stub6_seq = Object.keys(stub6_seq);}
    for (stub7_itr = 0; stub7_itr < stub6_seq.length; stub7_itr += 1) {
        point = stub6_seq[stub7_itr];
        stub4_ = point;
        x = stub4_[0];y = stub4_[1];
        for (_ = 0; _ < this.rotation[this.selection]; _ += 1) {
            stub5_ = [-y, x];
            x = stub5_[0];y = stub5_[1];
        }
        _pymeth_append.call(points, [x, y]);
    }
    haut = Math.min.apply(null, (function list_comprehension (iter0) {var res = [];var p, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {p = iter0[i0];{res.push(p[1]);}}return res;}).call(this, points));
    ancre = Math.min.apply(null, (function list_comprehension (iter0) {var res = [];var p, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {p = iter0[i0];if (!(_pyfunc_op_equals(p[1], haut))) {continue;}{res.push(p[0]);}}return res;}).call(this, points));
    return (function list_comprehension (iter0) {var res = [];var p, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {p = iter0[i0];{res.push([p[0] - ancre, p[1] - haut]);}}return res;}).call(this, points);
};

Partie.prototype.jouer = function (action, valeur) {
    var contenu, dx, dy, i, positions, stub10_seq, stub11_itr, stub12_tgt, stub13_seq, stub14_itr, stub8_, stub8_i0, stub8_iter0, stub8_p, stub9_, x, y;
    if ((!_pyfunc_op_equals(this.etat, "jeu"))) {
        return null;
    }
    if (_pyfunc_op_equals(action, "piece")) {
        if ((!_pyfunc_op_contains(valeur, this.cases))) {
            this.selection = valeur;
        }
        return null;
    }
    if (_pyfunc_op_equals(action, "tourner")) {
        this.rotation[this.selection] = (this.rotation[this.selection] + 1) % 4;
        return null;
    }
    if ((!_pyfunc_op_equals(action, "case"))) {
        return null;
    }
    contenu = this.cases[valeur];
    if ((!_pyfunc_op_equals(contenu, (-1)))) {
        this.selection = contenu;
        stub8_ = [];stub8_iter0 = this.cases;if ((typeof stub8_iter0 === "object") && (!Array.isArray(stub8_iter0))) {stub8_iter0 = Object.keys(stub8_iter0);}for (stub8_i0=0; stub8_i0<stub8_iter0.length; stub8_i0++) {stub8_p = stub8_iter0[stub8_i0];{stub8_.push((_pyfunc_op_equals(stub8_p, contenu))? (-1) : (stub8_p));}}
        this.cases = stub8_;
        this.message = "Colis repris. Choisis sa nouvelle place.";
        return null;
    }
    positions = [];
    stub10_seq = this.forme();
    if ((typeof stub10_seq === "object") && (!Array.isArray(stub10_seq))) { stub10_seq = Object.keys(stub10_seq);}
    for (stub11_itr = 0; stub11_itr < stub10_seq.length; stub11_itr += 1) {
        stub12_tgt = stub10_seq[stub11_itr];
        dx = stub12_tgt[0]; dy = stub12_tgt[1];
        stub9_ = [_pyfunc_op_add((valeur % this.largeur), dx), _pyfunc_op_add(Math.floor(valeur/this.largeur), dy)];
        x = stub9_[0];y = stub9_[1];
        if ((((!((((0 <= x) && (x < this.largeur))) && (((0 <= y) && (y < this.hauteur)))))) || (!_pyfunc_op_equals(this.cases[_pyfunc_op_add(_pyfunc_op_mult(y, this.largeur), x)], (-1))))) {
            this.message = "Le colis d\u00e9borde ou chevauche un autre colis.";
            return null;
        }
        _pymeth_append.call(positions, (_pyfunc_op_add(_pyfunc_op_mult(y, this.largeur), x)));
    }
    stub13_seq = positions;
    if ((typeof stub13_seq === "object") && (!Array.isArray(stub13_seq))) { stub13_seq = Object.keys(stub13_seq);}
    for (stub14_itr = 0; stub14_itr < stub13_seq.length; stub14_itr += 1) {
        i = stub13_seq[stub14_itr];
        this.cases[i] = this.selection;
    }
    this.coups += 1;
    for (i = 0; i < this.formes.length; i += 1) {
        if ((!_pyfunc_op_contains(i, this.cases))) {
            this.selection = i;
            this.message = "Colis arrim\u00e9. Le suivant est pr\u00eat.";
            return null;
        }
    }
    this.etat = "gagne";
    this.message = "Cale pleine. Le navire peut appareiller !";
    return null;
};


return { Partie };
})();
