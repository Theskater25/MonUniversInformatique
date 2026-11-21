// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurClassique = (() => {
var _pyfunc_abs = Math.abs;
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
var _pymeth_index = function (x, start, stop) { // nargs: 1 2 3
    start = (start === undefined) ? 0 : start;
    stop = (stop === undefined) ? this.length : stop;
    start = Math.max(0, ((start < 0) ? this.length + start : start));
    stop = Math.min(this.length, ((stop < 0) ? this.length + stop : stop));
    if (Array.isArray(this)) {
        for (var i=start; i<stop; i++) {
            if (_pyfunc_op_equals(this[i], x)) {return i;} // indexOf cant
        }
    } else if (this.constructor === String) {
        var i = this.slice(start, stop).indexOf(x);
        if (i >= 0) return i + start;
    } else return this.index.apply(this, arguments);
    var e = Error(x); e.name='ValueError'; throw e;
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
var _pymeth_upper = function () { // nargs: 0
    if (this.constructor !== String) return this.upper.apply(this, arguments);
    return this.toUpperCase();
};
var CHEMIN, FLECHES, Hasard, Partie, SOCLES, coordonnee, indice_case;
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
CHEMIN = [9, 10, 11, 12, 21, 30, 31, 32, 33, 24, 15, 16, 17];
SOCLES = [2, 13, 19, 22, 25, 29, 34, 41];
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var stub1_, stub1_i, stub1_i0, stub1_iter0;
    mode = (mode === undefined) ? 0: mode;
    stub1_ = [];stub1_iter0 = SOCLES;if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1_i = stub1_iter0[stub1_i0];{stub1_.push(0);}}
    this.tours = stub1_;
    this.escargots = [];
    this.soleils = 6;
    this.vies = 5;
    this.vague = 0;
    this.chasses = 0;
    this.points = 0;
    this.en_vague = false;
    this.etat = 0;
    this.message = "Installe des lanternes sur les socles (+), puis lance la premi\u00e8re vague.";
    return null;
};

Partie.prototype.pas = function () {
    var bete, distance, j, k, pos, socle, stub2_seq, stub3_itr;
    if ((!_pyfunc_truthy(this.en_vague))) {
        return null;
    }
    this.temps += 1;
    if (((this.reserve > 0) && _pyfunc_truthy(this.temps % 2))) {
        _pymeth_append.call(this.escargots, [-1, (2 + this.vague) + (this.reserve % 2)]);
        this.reserve -= 1;
    }
    stub2_seq = this.escargots;
    if ((typeof stub2_seq === "object") && (!Array.isArray(stub2_seq))) { stub2_seq = Object.keys(stub2_seq);}
    for (stub3_itr = 0; stub3_itr < stub2_seq.length; stub3_itr += 1) {
        bete = stub2_seq[stub3_itr];
        bete[0] += 1;
    }
    for (k = this.escargots.length - 1; k > -1; k += -1) {
        if (((this.escargots[k][0]) >= CHEMIN.length)) {
            _pymeth_pop.call(this.escargots, k);
            this.vies -= 1;
        }
    }
    if ((this.vies <= 0)) {
        this.vies = 0;
        this.etat = -1;
        this.en_vague = false;
        this.message = "Les escargots ont atteint les cinq laitues.";
        return null;
    }
    for (j = 0; j < SOCLES.length; j += 1) {
        if (_pyfunc_op_equals(this.tours[j], 0)) {
            continue;
        }
        socle = SOCLES[j];
        for (k = 0; k < this.escargots.length; k += 1) {
            bete = this.escargots[k];
            pos = CHEMIN[bete[0]];
            distance = _pyfunc_op_add((_pyfunc_abs(((pos % 9) - (socle % 9)))), (_pyfunc_abs(((_pyfunc_int((pos / 9))) - (_pyfunc_int((socle / 9)))))));
            if ((distance <= 2)) {
                bete[1] -= this.tours[j];
                if ((bete[1] <= 0)) {
                    _pymeth_pop.call(this.escargots, k);
                    this.chasses += 1;
                    this.soleils += 1;
                    this.points += 5;
                }
                break;
            }
        }
    }
    if ((_pyfunc_op_equals(this.reserve, 0) && (this.escargots.length == 0))) {
        this.en_vague = false;
        this.soleils += 2;
        this.message = "Vague termin\u00e9e. Tu re\u00e7ois deux soleils de renfort.";
        if (_pyfunc_op_equals(this.vague, 5)) {
            this.etat = 1;
            this.points = _pyfunc_op_add(this.points, _pyfunc_op_mult(this.vies, 10));
            this.message = "Les cinq vagues sont pass\u00e9es. Le potager est sauv\u00e9 !";
        }
    }
    return null;
};

Partie.prototype.agir = function (action) {
    var cout, i, j;
    if (_pyfunc_truthy(this.etat)) {
        return null;
    }
    if (_pyfunc_truthy(this.en_vague)) {
        if (_pyfunc_op_equals(action, "pas")) {
            this.pas();
        } else if (_pyfunc_op_equals(action, "finir")) {
            while (this.en_vague) {
                this.pas();
            }
        }
        return null;
    }
    if (_pyfunc_op_equals(action, "vague")) {
        this.vague += 1;
        this.reserve = 3 + this.vague;
        this.temps = 0;
        this.en_vague = true;
        this.message = "Les escargots arrivent par la gauche.";
        return null;
    }
    i = indice_case(action, 9, 5);
    if ((!_pyfunc_op_contains(i, SOCLES))) {
        this.message = "Choisis un socle marqu\u00e9 + pour construire.";
        return null;
    }
    j = _pymeth_index.call(SOCLES, i);
    cout = (_pyfunc_op_equals(this.tours[j], 0))? (3) : (4);
    if (_pyfunc_op_equals(this.tours[j], 2)) {
        this.message = "Cette lanterne est d\u00e9j\u00e0 \u00e0 sa pleine puissance.";
    } else if ((this.soleils < cout)) {
        this.message = ("Il te faut " + _pyfunc_str(cout)) + " soleils.";
    } else {
        this.soleils -= cout;
        this.tours[j] += 1;
        this.message = ((("Lanterne en " + coordonnee(i, 9)) + " \u00b7 puissance ") + _pyfunc_str(this.tours[j])) + ".";
    }
    return null;
};

Partie.prototype.vue = function () {
    var bete, i, j, stub4_, stub4_i, stub4_i0, stub4_iter0, stub5_, stub5_i, stub5_i0, stub5_iter0, stub6_seq, stub7_itr, stub8_seq, stub9_itr, styles, symboles;
    stub4_ = [];stub4_iter0 = _pyfunc_range(0, 45, 1);if ((typeof stub4_iter0 === "object") && (!Array.isArray(stub4_iter0))) {stub4_iter0 = Object.keys(stub4_iter0);}for (stub4_i0=0; stub4_i0<stub4_iter0.length; stub4_i0++) {stub4_i = stub4_iter0[stub4_i0];{stub4_.push("");}}
    symboles = stub4_;
    stub5_ = [];stub5_iter0 = _pyfunc_range(0, 45, 1);if ((typeof stub5_iter0 === "object") && (!Array.isArray(stub5_iter0))) {stub5_iter0 = Object.keys(stub5_iter0);}for (stub5_i0=0; stub5_i0<stub5_iter0.length; stub5_i0++) {stub5_i = stub5_iter0[stub5_i0];{stub5_.push("gazon");}}
    styles = stub5_;
    stub6_seq = CHEMIN;
    if ((typeof stub6_seq === "object") && (!Array.isArray(stub6_seq))) { stub6_seq = Object.keys(stub6_seq);}
    for (stub7_itr = 0; stub7_itr < stub6_seq.length; stub7_itr += 1) {
        i = stub6_seq[stub7_itr];
        styles[i] = "chemin";
        symboles[i] = "\u00b7";
    }
    symboles[17] = "S";
    for (j = 0; j < SOCLES.length; j += 1) {
        i = SOCLES[j];
        styles[i] = (_pyfunc_op_equals(this.tours[j], 0))? ("socle") : ("tour");
        symboles[i] = ((!_pyfunc_truthy(this.tours[j])))? ("+") : (_pyfunc_str(this.tours[j]));
    }
    stub8_seq = this.escargots;
    if ((typeof stub8_seq === "object") && (!Array.isArray(stub8_seq))) { stub8_seq = Object.keys(stub8_seq);}
    for (stub9_itr = 0; stub9_itr < stub8_seq.length; stub9_itr += 1) {
        bete = stub8_seq[stub9_itr];
        i = CHEMIN[bete[0]];
        symboles[i] = "@";
        styles[i] = "bete";
    }
    return ({colonnes: 9, grille: symboles, styles: styles, cibles: ((!_pyfunc_truthy(this.en_vague)))? (SOCLES) : ([]), notes: ["+ Socle \u00b7 1/2 Lanterne \u00b7 @ Escargot \u00b7 S Sortie"]});
};

Partie.prototype.commandes = function () {
    if (_pyfunc_truthy(this.en_vague)) {
        return [["pas", "Un pas"], ["finir", "R\u00e9soudre la vague"]];
    }
    return [["vague", "Lancer la vague " + (_pyfunc_str((this.vague + 1)))]];
};

Partie.prototype.mesures = function () {
    return [["Vague", _pyfunc_str(this.vague) + "/5"], ["Soleils", this.soleils], ["Laitues", this.vies]];
};


return { Partie };
})();
