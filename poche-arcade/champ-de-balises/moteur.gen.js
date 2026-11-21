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
var _pymeth_count = function (x, start, stop) { // nargs: 1 2 3
    start = (start === undefined) ? 0 : start;
    stop = (stop === undefined) ? this.length : stop;
    start = Math.max(0, ((start < 0) ? this.length + start : start));
    stop = Math.min(this.length, ((stop < 0) ? this.length + stop : stop));
    if (Array.isArray(this)) {
        var count = 0;
        for (var i=0; i<this.length; i++) {
            if (_pyfunc_op_equals(this[i], x)) {count+=1;}
        } return count;
    } else if (this.constructor == String) {
        var count = 0, i = start;
        while (i >= 0 && i < stop) {
            i = this.indexOf(x, i);
            if (i < 0) break;
            count += 1;
            i += Math.max(1, x.length);
        } return count;
    } else return this.count.apply(this, arguments);
};
var _pymeth_pop = function (i, d) { // nargs: 1 2
    if (Array.isArray(this)) {
        i = (i === undefined) ? -1 : i;
        i = (i < 0) ? (this.length + i) : i;
        var popped = this.splice(i, 1);
        if (popped.length)  return popped[0];
        var e = Error(i); e.name='IndexError'; throw e;
    } else if (this.constructor === Object) {
        var res = this[i]
        if (res !== undefined) {delete this[i]; return res;}
        else if (d !== undefined) return d;
        var e = Error(i); e.name='KeyError'; throw e;
    } else return this.pop.apply(this, arguments);
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
var COTE, MINES, Partie;
COTE = 8;
MINES = 10;
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var stub1_, stub1_i, stub1_i0, stub1_iter0, stub2_, stub2_i, stub2_i0, stub2_iter0, stub3_, stub3_i, stub3_i0, stub3_iter0;
    mode = (mode === undefined) ? 0: mode;
    this.graine = graine;
    this.mines = [];
    stub1_ = [];stub1_iter0 = _pyfunc_range(0, 64, 1);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1_i = stub1_iter0[stub1_i0];{stub1_.push(false);}}
    this.ouvertes = stub1_;
    stub2_ = [];stub2_iter0 = _pyfunc_range(0, 64, 1);if ((typeof stub2_iter0 === "object") && (!Array.isArray(stub2_iter0))) {stub2_iter0 = Object.keys(stub2_iter0);}for (stub2_i0=0; stub2_i0<stub2_iter0.length; stub2_i0++) {stub2_i = stub2_iter0[stub2_i0];{stub2_.push(false);}}
    this.drapeaux = stub2_;
    stub3_ = [];stub3_iter0 = _pyfunc_range(0, 64, 1);if ((typeof stub3_iter0 === "object") && (!Array.isArray(stub3_iter0))) {stub3_iter0 = Object.keys(stub3_iter0);}for (stub3_i0=0; stub3_i0<stub3_iter0.length; stub3_i0++) {stub3_i = stub3_iter0[stub3_i0];{stub3_.push(0);}}
    this.nombres = stub3_;
    this.decouvertes = 0;
    this.coups = 0;
    this.etat = 0;
    this.points = 0;
    this.detonation = -1;
    this.message = "Ouvre une premi\u00e8re case pour commencer le relev\u00e9.";
    return null;
};

Partie.prototype.voisins = function (i) {
    var cases, col, ligne, voisin, x, y;
    x = i % COTE;
    y = _pyfunc_int((i / COTE));
    cases = [];
    for (ligne = Math.max(0, (y - 1)); ligne < Math.min(COTE, (y + 2)); ligne += 1) {
        for (col = Math.max(0, (x - 1)); col < Math.min(COTE, (x + 2)); col += 1) {
            voisin = _pyfunc_op_add(_pyfunc_op_mult(ligne, COTE), col);
            if ((!_pyfunc_op_equals(voisin, i))) {
                _pymeth_append.call(cases, voisin);
            }
        }
    }
    return cases;
};

Partie.prototype.semer = function (depart) {
    var abri, i, libres, mine, n, stub4_, stub4_i, stub4_i0, stub4_iter0, stub5_seq, stub6_itr, stub7_seq, stub8_itr;
    abri = _pyfunc_op_add(this.voisins(depart), [depart]);
    stub4_ = [];stub4_iter0 = _pyfunc_range(0, 64, 1);if ((typeof stub4_iter0 === "object") && (!Array.isArray(stub4_iter0))) {stub4_iter0 = Object.keys(stub4_iter0);}for (stub4_i0=0; stub4_i0<stub4_iter0.length; stub4_i0++) {stub4_i = stub4_iter0[stub4_i0];if (!((!_pyfunc_op_contains(stub4_i, abri)))) {continue;}{stub4_.push(stub4_i);}}
    libres = stub4_;
    for (n = 0; n < MINES; n += 1) {
        this.graine = (_pyfunc_op_mult(this.graine, 9301) + 49297) % 233280;
        _pymeth_append.call(this.mines, (_pymeth_pop.call(libres, (_pyfunc_int((_pyfunc_op_mult(this.graine, libres.length) / 233280))))));
    }
    stub7_seq = this.mines;
    if ((typeof stub7_seq === "object") && (!Array.isArray(stub7_seq))) { stub7_seq = Object.keys(stub7_seq);}
    for (stub8_itr = 0; stub8_itr < stub7_seq.length; stub8_itr += 1) {
        mine = stub7_seq[stub8_itr];
        stub5_seq = this.voisins(mine);
        if ((typeof stub5_seq === "object") && (!Array.isArray(stub5_seq))) { stub5_seq = Object.keys(stub5_seq);}
        for (stub6_itr = 0; stub6_itr < stub5_seq.length; stub6_itr += 1) {
            i = stub5_seq[stub6_itr];
            this.nombres[i] += 1;
        }
    }
    return null;
};

Partie.prototype.baliser = function (i) {
    if ((_pyfunc_op_equals(this.etat, 0) && (((0 <= i) && (i < 64))) && ((!_pyfunc_truthy(this.ouvertes[i]))))) {
        if ((((!_pyfunc_truthy(this.drapeaux[i]))) && ((_pymeth_count.call(this.drapeaux, true) >= MINES)))) {
            this.message = "Les dix fanions sont pos\u00e9s. Retire-en un pour le d\u00e9placer.";
            return null;
        }
        this.drapeaux[i] = !_pyfunc_truthy(this.drapeaux[i]);
        this.message = (_pyfunc_truthy(this.drapeaux[i]))? ("Fanion pos\u00e9.") : ("Fanion retir\u00e9.");
    }
    return null;
};

Partie.prototype.ouvrir = function (i) {
    var stub10_itr, stub9_seq, voisin;
    if (_pyfunc_truthy(_pyfunc_truthy(this.ouvertes[i]) || this.drapeaux[i])) {
        return null;
    }
    this.ouvertes[i] = true;
    this.decouvertes += 1;
    if (_pyfunc_op_equals(this.nombres[i], 0)) {
        stub9_seq = this.voisins(i);
        if ((typeof stub9_seq === "object") && (!Array.isArray(stub9_seq))) { stub9_seq = Object.keys(stub9_seq);}
        for (stub10_itr = 0; stub10_itr < stub9_seq.length; stub10_itr += 1) {
            voisin = stub9_seq[stub10_itr];
            this.ouvrir(voisin);
        }
    }
    return null;
};

Partie.prototype.jouer = function (i) {
    if ((((!_pyfunc_op_equals(this.etat, 0))) || (i < 0) || (i >= 64) || _pyfunc_truthy(this.ouvertes[i]) || this.drapeaux[i])) {
        return null;
    }
    if ((this.mines.length == 0)) {
        this.semer(i);
    }
    this.coups += 1;
    if (_pyfunc_op_contains(i, this.mines)) {
        this.etat = -1;
        this.detonation = i;
        this.message = "Mine d\u00e9couverte. Les emplacements sont r\u00e9v\u00e9l\u00e9s.";
        return null;
    }
    this.ouvrir(i);
    this.message = "Le chiffre indique les mines dans les huit cases voisines.";
    if ((_pyfunc_op_equals(this.decouvertes, (64 - MINES)))) {
        this.etat = 1;
        this.points = 65 - this.coups;
        this.message = "Toutes les cases s\u00fbres sont ouvertes !";
    }
    return null;
};

Partie.prototype.mesures = function () {
    return [["Fanions", (_pyfunc_str(_pymeth_count.call(this.drapeaux, true))) + " / 10"], ["Cases s\u00fbres", _pyfunc_str(this.decouvertes) + " / 54"]];
};


return { Partie };
})();
