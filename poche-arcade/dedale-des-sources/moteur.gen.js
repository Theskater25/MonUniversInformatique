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
var _pymeth_remove = function (x) { // nargs: 1
    if (!Array.isArray(this)) return this.remove.apply(this, arguments);
    for (var i=0; i<this.length; i++) {
        if (_pyfunc_op_equals(this[i], x)) {this.splice(i, 1); return;}
    }
    var e = Error(x); e.name='ValueError'; throw e;
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
var FLECHES, Hasard, Partie, SENS, coordonnee, indice_case;
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
SENS = ({g: [-1, 0], d: [1, 0], h: [0, -1], b: [0, 1]});
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var choix, direction, dx, dy, hasard, i, libres, pile, stub1_, stub1_i, stub1_i0, stub1_iter0, stub2_seq, stub3_itr, stub4_, stub4_i0, stub4_iter0, suite, x, xx, y, yy;
    mode = (mode === undefined) ? 0: mode;
    hasard = new Hasard(graine);
    stub1_ = [];stub1_iter0 = _pyfunc_range(0, 165, 1);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1_i = stub1_iter0[stub1_i0];{stub1_.push(false);}}
    this.plan = stub1_;
    this.pos = 16;
    this.sortie = 148;
    this.plan[this.pos] = true;
    pile = [this.pos];
    while (pile.length) {
        i = pile[pile.length -1];
        x = i % 15;
        y = _pyfunc_int((i / 15));
        choix = [];
        stub2_seq = ["g", "d", "h", "b"];
        if ((typeof stub2_seq === "object") && (!Array.isArray(stub2_seq))) { stub2_seq = Object.keys(stub2_seq);}
        for (stub3_itr = 0; stub3_itr < stub2_seq.length; stub3_itr += 1) {
            direction = stub2_seq[stub3_itr];
            dx = SENS[direction][0];
            dy = SENS[direction][1];
            xx = _pyfunc_op_add(x, _pyfunc_op_mult(2, dx));
            yy = _pyfunc_op_add(y, _pyfunc_op_mult(2, dy));
            if (((((1 <= xx) && (xx < 14))) && (((1 <= yy) && (yy < 10))) && ((!_pyfunc_truthy(this.plan[_pyfunc_op_add(_pyfunc_op_mult(yy, 15), xx)]))))) {
                _pymeth_append.call(choix, [_pyfunc_op_add(_pyfunc_op_mult(yy, 15), xx), _pyfunc_op_add((_pyfunc_op_add(i, _pyfunc_op_mult(dy, 15))), dx)]);
            }
        }
        if (choix.length) {
            suite = choix[hasard.entier(choix.length)];
            this.plan[suite[0]] = true;
            this.plan[suite[1]] = true;
            _pymeth_append.call(pile, suite[0]);
        } else {
            pile.pop();
        }
    }
    stub4_ = [];stub4_iter0 = _pyfunc_range(0, 165, 1);if ((typeof stub4_iter0 === "object") && (!Array.isArray(stub4_iter0))) {stub4_iter0 = Object.keys(stub4_iter0);}for (stub4_i0=0; stub4_i0<stub4_iter0.length; stub4_i0++) {i = stub4_iter0[stub4_i0];if (!((_pyfunc_truthy(this.plan[i]) && ((!_pyfunc_op_equals(i, this.pos))) && ((!_pyfunc_op_equals(i, this.sortie)))))) {continue;}{stub4_.push(i);}}
    libres = stub4_;
    this.sources = hasard.melanger(libres).slice(0,2);
    this.trace = [this.pos];
    this.coups = 0;
    this.etat = 0;
    this.points = 0;
    this.message = "Trouve la sortie S. Les deux sources ~ rapportent un bonus.";
    return null;
};

Partie.prototype.agir = function (action) {
    var pos, vecteur;
    if (_pyfunc_truthy(_pyfunc_truthy(this.etat) || (!_pyfunc_op_contains(action, SENS)))) {
        return null;
    }
    vecteur = SENS[action];
    pos = _pyfunc_op_add(_pyfunc_op_add(this.pos, vecteur[0]), _pyfunc_op_mult(vecteur[1], 15));
    if ((!_pyfunc_truthy(this.plan[pos]))) {
        this.message = "La galerie est ferm\u00e9e de ce c\u00f4t\u00e9.";
        return null;
    }
    this.pos = pos;
    this.coups += 1;
    if ((!_pyfunc_op_contains(pos, this.trace))) {
        _pymeth_append.call(this.trace, pos);
    }
    this.message = "Tu avances dans la galerie.";
    if (_pyfunc_op_contains(pos, this.sources)) {
        _pymeth_remove.call(this.sources, pos);
        this.message = "Source trouv\u00e9e !";
    }
    if (_pyfunc_op_equals(pos, this.sortie)) {
        this.etat = 1;
        this.points = _pyfunc_op_add((Math.max(10, (300 - this.coups))), (_pyfunc_op_mult((2 - this.sources.length), 60)));
        this.message = ("Tu retrouves la lumi\u00e8re en " + _pyfunc_str(this.coups)) + " pas.";
    }
    return null;
};

Partie.prototype.vue = function () {
    var cases, i, signe, stub10_, stub5_, stub6_, stub7_, stub8_, stub9_, style, styles;
    cases = [];
    styles = [];
    for (i = 0; i < 165; i += 1) {
        if (_pyfunc_op_equals(i, this.pos)) {
            stub5_ = ["@", "heros"];
            signe = stub5_[0];style = stub5_[1];
        } else if (_pyfunc_op_equals(i, this.sortie)) {
            stub6_ = ["S", "sortie"];
            signe = stub6_[0];style = stub6_[1];
        } else if (_pyfunc_op_contains(i, this.sources)) {
            stub7_ = ["~", "source"];
            signe = stub7_[0];style = stub7_[1];
        } else if ((!_pyfunc_truthy(this.plan[i]))) {
            stub8_ = ["#", "mur"];
            signe = stub8_[0];style = stub8_[1];
        } else if (_pyfunc_op_contains(i, this.trace)) {
            stub9_ = ["\u00b7", "trace"];
            signe = stub9_[0];style = stub9_[1];
        } else {
            stub10_ = ["", "galerie"];
            signe = stub10_[0];style = stub10_[1];
        }
        _pymeth_append.call(cases, signe);
        _pymeth_append.call(styles, style);
    }
    return ({colonnes: 15, grille: cases, styles: styles});
};

Partie.prototype.commandes = function () {
    return FLECHES;
};

Partie.prototype.mesures = function () {
    return [["Pas", this.coups], ["Sources", (_pyfunc_str((2 - this.sources.length))) + "/2"]];
};


return { Partie };
})();
