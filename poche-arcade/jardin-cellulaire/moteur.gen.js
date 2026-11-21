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
var _pymeth_upper = function () { // nargs: 0
    if (this.constructor !== String) return this.upper.apply(this, arguments);
    return this.toUpperCase();
};
var FLECHES, Hasard, Partie, coordonnee, indice_case;
"Petits outils d\u00e9terministes utilis\u00e9s par les m\u00eames jeux en Python et sur le Web.";
Hasard = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Hasard.prototype._base_class = Object;
Hasard.prototype.__name__ = "Hasard";

Hasard.prototype.__init__ = function (graine) {
    this.graine = graine % 233280;
    return null;
};

Hasard.prototype.entier = function (maximum) {
    this.graine = (_pyfunc_op_mult(this.graine, 9301) + 49297) % 233280;
    return _pyfunc_int((_pyfunc_op_mult(this.graine, maximum) / 233280));
};

Hasard.prototype.melanger = function (elements) {
    var i, j, valeur;
    for (i = elements.length - 1; i > 0; i += -1) {
        j = this.entier(i + 1);
        valeur = elements[i];
        elements[i] = elements[j];
        elements[j] = valeur;
    }
    return elements;
};


coordonnee = function flx_coordonnee (i, colonnes) {
    return _pyfunc_op_add(("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[_pyfunc_int((i / colonnes))]), (_pyfunc_str(((i % colonnes) + 1))));
};

indice_case = function flx_indice_case (texte, colonnes, lignes) {
    var x, y;
    texte = _pymeth_upper.call(texte);
    if ((texte.length < 2)) {
        return -1;
    }
    y = _pymeth_find.call("ABCDEFGHIJKLMNOPQRSTUVWXYZ", texte[0]);
    if (((y < 0) || (y >= lignes))) {
        return -1;
    }
    for (x = 0; x < colonnes; x += 1) {
        if ((_pyfunc_op_equals(texte.slice(1), (_pyfunc_str((x + 1)))))) {
            return _pyfunc_op_add(_pyfunc_op_mult(y, colonnes), x);
        }
    }
    return -1;
};

FLECHES = [["g", "Gauche"], ["h", "Haut"], ["b", "Bas"], ["d", "Droite"]];
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    mode = (mode === undefined) ? 0: mode;
    this.hasard = new Hasard(graine);
    this.etat = 0;
    this.points = 0;
    this.motif("planeur");
    return null;
};

Partie.prototype.motif = function (nom) {
    var i, stub1_, stub1_i, stub1_i0, stub1_iter0, stub2_seq, stub3_itr, stub4_seq, stub5_itr, stub6_, stub6_i0, stub6_iter0;
    stub1_ = [];stub1_iter0 = _pyfunc_range(0, 144, 1);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1_i = stub1_iter0[stub1_i0];{stub1_.push(false);}}
    this.cellules = stub1_;
    if (_pyfunc_op_equals(nom, "planeur")) {
        stub2_seq = [15, 28, 38, 39, 40];
        if ((typeof stub2_seq === "object") && (!Array.isArray(stub2_seq))) { stub2_seq = Object.keys(stub2_seq);}
        for (stub3_itr = 0; stub3_itr < stub2_seq.length; stub3_itr += 1) {
            i = stub2_seq[stub3_itr];
            this.cellules[i] = true;
        }
    } else if (_pyfunc_op_equals(nom, "oscillateur")) {
        stub4_seq = [64, 65, 66];
        if ((typeof stub4_seq === "object") && (!Array.isArray(stub4_seq))) { stub4_seq = Object.keys(stub4_seq);}
        for (stub5_itr = 0; stub5_itr < stub4_seq.length; stub5_itr += 1) {
            i = stub4_seq[stub5_itr];
            this.cellules[i] = true;
        }
    } else if (_pyfunc_op_equals(nom, "hasard")) {
        stub6_ = [];stub6_iter0 = _pyfunc_range(0, 144, 1);if ((typeof stub6_iter0 === "object") && (!Array.isArray(stub6_iter0))) {stub6_iter0 = Object.keys(stub6_iter0);}for (stub6_i0=0; stub6_i0<stub6_iter0.length; stub6_i0++) {i = stub6_iter0[stub6_i0];{stub6_.push(_pyfunc_op_equals(this.hasard.entier(4), 0));}}
        this.cellules = stub6_;
    }
    this.generation = 0;
    this.points = _pymeth_count.call(this.cellules, true);
    this.message = "Le jardin est pr\u00eat. Tu peux planter une cellule ou faire passer une g\u00e9n\u00e9ration.";
    return null;
};

Partie.prototype.avancer = function () {
    var i, j, prochaines, voisines, x, xx, y, yy;
    prochaines = [];
    for (i = 0; i < 144; i += 1) {
        x = i % 12;
        y = _pyfunc_int((i / 12));
        voisines = 0;
        for (yy = Math.max(0, (y - 1)); yy < Math.min(12, (y + 2)); yy += 1) {
            for (xx = Math.max(0, (x - 1)); xx < Math.min(12, (x + 2)); xx += 1) {
                j = _pyfunc_op_add(_pyfunc_op_mult(yy, 12), xx);
                if ((((!_pyfunc_op_equals(j, i))) && _pyfunc_truthy(this.cellules[j]))) {
                    voisines += 1;
                }
            }
        }
        _pymeth_append.call(prochaines, (_pyfunc_op_equals(voisines, 3) || (_pyfunc_op_equals(voisines, 2) && _pyfunc_truthy(this.cellules[i]))));
    }
    this.cellules = prochaines;
    this.generation += 1;
    this.points = Math.max(this.points, _pymeth_count.call(this.cellules, true));
    return null;
};

Partie.prototype.agir = function (action) {
    var etapes, i;
    if (_pyfunc_op_contains(action, ["planeur", "oscillateur", "hasard", "vide"])) {
        this.motif(action);
    } else if (_pyfunc_op_contains(action, ["pas", "10"])) {
        etapes = (_pyfunc_op_equals(action, "10"))? (10) : (1);
        for (i = 0; i < etapes; i += 1) {
            this.avancer();
        }
        this.message = ("G\u00e9n\u00e9ration " + _pyfunc_str(this.generation)) + ".";
    } else {
        i = indice_case(action, 12, 12);
        if ((i >= 0)) {
            this.cellules[i] = !_pyfunc_truthy(this.cellules[i]);
            this.points = Math.max(this.points, _pymeth_count.call(this.cellules, true));
        }
    }
    return null;
};

Partie.prototype.vue = function () {
    return ({colonnes: 12, grille: (function list_comprehension (iter0) {var res = [];var v, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {v = iter0[i0];{res.push((_pyfunc_truthy(v))? ("+") : (""));}}return res;}).call(this, this.cellules), styles: (function list_comprehension (iter0) {var res = [];var v, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {v = iter0[i0];{res.push((_pyfunc_truthy(v))? ("pousse") : ("terre"));}}return res;}).call(this, this.cellules), ciblable: true});
};

Partie.prototype.commandes = function () {
    return [["pas", "Une g\u00e9n\u00e9ration"], ["10", "Dix g\u00e9n\u00e9rations"], ["planeur", "Planeur"], ["oscillateur", "Oscillateur"], ["hasard", "Semer au hasard"], ["vide", "Vider"]];
};

Partie.prototype.mesures = function () {
    return [["G\u00e9n\u00e9ration", this.generation], ["Population", _pymeth_count.call(this.cellules, true)]];
};


return { Partie };
})();
