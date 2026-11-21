// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurClassique = (() => {
var _pyfunc_all = function (x) { // nargs: 1
    for (var i=0; i<x.length; i++) {
        if (!_pyfunc_truthy(x[i])){return false;}
    } return true;
};
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
var _pymeth_split = function (sep, count) { // nargs: 0, 1 2
    if (this.constructor !== String) return this.split.apply(this, arguments);
    if (sep === '') {var e = Error('empty sep'); e.name='ValueError'; throw e;}
    sep = (sep === undefined) ? /\s/ : sep;
    if (count === undefined) { return this.split(sep); }
    var res = [], i = 0, index1 = 0, index2 = 0;
    while (i < count && index1 < this.length) {
        index2 = this.indexOf(sep, index1);
        if (index2 < 0) { break; }
        res.push(this.slice(index1, index2));
        index1 = index2 + sep.length || 1;
        i += 1;
    }
    res.push(this.slice(index1));
    return res;
};
var _pymeth_upper = function () { // nargs: 0
    if (this.constructor !== String) return this.upper.apply(this, arguments);
    return this.toUpperCase();
};
var FLECHES, Hasard, Partie, coordonnee, indice_case, ordre_groupes, permis;
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
ordre_groupes = function flx_ordre_groupes (hasard) {
    var groupe, i, resultat, stub1_seq, stub2_itr, stub3_seq, stub4_itr;
    resultat = [];
    stub3_seq = hasard.melanger([0, 1, 2]);
    if ((typeof stub3_seq === "object") && (!Array.isArray(stub3_seq))) { stub3_seq = Object.keys(stub3_seq);}
    for (stub4_itr = 0; stub4_itr < stub3_seq.length; stub4_itr += 1) {
        groupe = stub3_seq[stub4_itr];
        stub1_seq = hasard.melanger([0, 1, 2]);
        if ((typeof stub1_seq === "object") && (!Array.isArray(stub1_seq))) { stub1_seq = Object.keys(stub1_seq);}
        for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
            i = stub1_seq[stub2_itr];
            _pymeth_append.call(resultat, (_pyfunc_op_add(_pyfunc_op_mult(groupe, 3), i)));
        }
    }
    return resultat;
};

permis = function flx_permis (grille, i, v) {
    var bloc, col, k, ligne, pos, stub5_seq, stub6_itr;
    ligne = _pyfunc_int((i / 9));
    col = i % 9;
    bloc = _pyfunc_op_add((_pyfunc_op_mult((_pyfunc_int((ligne / 3))), 27)), (_pyfunc_op_mult((_pyfunc_int((col / 3))), 3)));
    for (k = 0; k < 9; k += 1) {
        stub5_seq = [_pyfunc_op_add(_pyfunc_op_mult(ligne, 9), k), _pyfunc_op_add(col, _pyfunc_op_mult(9, k)), _pyfunc_op_add((_pyfunc_op_add(bloc, (_pyfunc_op_mult((_pyfunc_int((k / 3))), 9)))), (k % 3))];
        if ((typeof stub5_seq === "object") && (!Array.isArray(stub5_seq))) { stub5_seq = Object.keys(stub5_seq);}
        for (stub6_itr = 0; stub6_itr < stub5_seq.length; stub6_itr += 1) {
            pos = stub5_seq[stub6_itr];
            if ((((!_pyfunc_op_equals(pos, i))) && _pyfunc_op_equals(grille[pos], v))) {
                return false;
            }
        }
    }
    return true;
};

Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var chiffres, cols, hasard, i, lignes, stub10_, stub10_i0, stub10_iter0, stub10_v, stub7_, stub7_i0, stub7_i1, stub7_iter0, stub7_iter1, stub7_x, stub7_y, stub8_seq, stub9_itr;
    mode = (mode === undefined) ? 0: mode;
    hasard = new Hasard(graine);
    chiffres = hasard.melanger((function list_comprehension (iter0) {var res = [];var i, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {i = iter0[i0];{res.push(i + 1);}}return res;}).call(this, _pyfunc_range(0, 9, 1)));
    lignes = ordre_groupes(hasard);
    cols = ordre_groupes(hasard);
    stub7_ = [];stub7_iter0 = lignes;if ((typeof stub7_iter0 === "object") && (!Array.isArray(stub7_iter0))) {stub7_iter0 = Object.keys(stub7_iter0);}for (stub7_i0=0; stub7_i0<stub7_iter0.length; stub7_i0++) {stub7_y = stub7_iter0[stub7_i0];stub7_iter1 = cols;if ((typeof stub7_iter1 === "object") && (!Array.isArray(stub7_iter1))) {stub7_iter1 = Object.keys(stub7_iter1);}for (stub7_i1=0; stub7_i1<stub7_iter1.length; stub7_i1++) {stub7_x = stub7_iter1[stub7_i1];{stub7_.push(chiffres[(_pyfunc_op_add((_pyfunc_op_add(_pyfunc_op_mult(stub7_y, 3), (_pyfunc_int((stub7_y / 3))))), stub7_x)) % 9]);}}}
    this.solution = stub7_;
    this.grille = this.solution.slice(0);
    stub8_seq = hasard.melanger((function list_comprehension (iter0) {var res = [];var k, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {k = iter0[i0];{res.push(k);}}return res;}).call(this, _pyfunc_range(0, 81, 1)));
    if ((typeof stub8_seq === "object") && (!Array.isArray(stub8_seq))) { stub8_seq = Object.keys(stub8_seq);}
    for (stub9_itr = 0; stub9_itr < stub8_seq.length; stub9_itr += 1) {
        i = stub8_seq[stub9_itr];
        if ((_pyfunc_all(((function list_comprehension (iter0) {var res = [];var v, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {v = iter0[i0];{res.push(_pyfunc_op_equals(v, this.solution[i]) || (!_pyfunc_truthy(permis(this.grille, i, v))));}}return res;}).call(this, _pyfunc_range(1, 10, 1)))))) {
            this.grille[i] = 0;
        }
    }
    stub10_ = [];stub10_iter0 = this.grille;if ((typeof stub10_iter0 === "object") && (!Array.isArray(stub10_iter0))) {stub10_iter0 = Object.keys(stub10_iter0);}for (stub10_i0=0; stub10_i0<stub10_iter0.length; stub10_i0++) {stub10_v = stub10_iter0[stub10_i0];{stub10_.push(!_pyfunc_op_equals(stub10_v, 0));}}
    this.fixes = stub10_;
    this.selection = _pymeth_index.call(this.grille, 0);
    this.indices = 0;
    this.etat = 0;
    this.points = 0;
    this.message = "S\u00e9lectionne une case claire, puis un chiffre de 1 \u00e0 9.";
    return null;
};

Partie.prototype.agir = function (action) {
    var i, morceaux, valeur;
    if (_pyfunc_truthy(this.etat)) {
        return null;
    }
    morceaux = _pymeth_split.call(action);
    if ((morceaux.length == 0)) {
        return null;
    }
    i = indice_case(morceaux[0], 9, 9);
    if ((i >= 0)) {
        if (_pyfunc_truthy(this.fixes[i])) {
            this.message = "Ce chiffre fait partie de la grille de d\u00e9part.";
            return null;
        }
        this.selection = i;
        if ((morceaux.length == 1)) {
            this.message = ("Case " + coordonnee(i, 9)) + " s\u00e9lectionn\u00e9e.";
            return null;
        }
        action = morceaux[1];
    }
    i = this.selection;
    if ((_pyfunc_op_equals(action, "0") || _pyfunc_op_equals(action, "effacer"))) {
        this.grille[i] = 0;
        this.message = "Case effac\u00e9e.";
        return null;
    }
    if (_pyfunc_op_equals(action, "indice")) {
        valeur = this.solution[i];
        if (_pyfunc_op_equals(this.grille[i], valeur)) {
            this.message = "Cette case porte d\u00e9j\u00e0 le bon chiffre.";
            return null;
        }
    } else if (((action.length == 1) && _pyfunc_op_contains(action, "123456789"))) {
        valeur = _pyfunc_int(action);
    } else {
        this.message = "Saisis une coordonn\u00e9e et un chiffre, par exemple B3 7.";
        return null;
    }
    if ((!_pyfunc_truthy(permis(this.grille, i, valeur)))) {
        this.message = "Ce chiffre est d\u00e9j\u00e0 dans la ligne, la colonne ou le bloc.";
        return null;
    }
    if (_pyfunc_op_equals(action, "indice")) {
        this.indices += 1;
    }
    this.grille[i] = valeur;
    if ((!_pyfunc_op_contains(0, this.grille))) {
        this.etat = 1;
        this.points = Math.max(1, (100 - _pyfunc_op_mult(3, this.indices)));
        this.message = "Les neuf serres sont compl\u00e8tes !";
    } else {
        this.message = ("Chiffre inscrit en " + coordonnee(i, 9)) + ".";
    }
    return null;
};

Partie.prototype.vue = function () {
    var i, style, styles;
    styles = [];
    for (i = 0; i < 81; i += 1) {
        style = (_pyfunc_truthy(this.fixes[i]))? ("indice") : ("inscrit");
        if (_pyfunc_op_equals(i, this.selection)) {
            style += " choisie";
        }
        if ((_pyfunc_op_contains((i % 9), [2, 5]))) {
            style += " bord-d";
        }
        if ((_pyfunc_op_contains((_pyfunc_int((i / 9))), [2, 5]))) {
            style += " bord-b";
        }
        _pymeth_append.call(styles, style);
    }
    return ({colonnes: 9, grille: (function list_comprehension (iter0) {var res = [];var v, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {v = iter0[i0];{res.push((_pyfunc_truthy(v))? (_pyfunc_str(v)) : (""));}}return res;}).call(this, this.grille), styles: styles, ciblable: true});
};

Partie.prototype.commandes = function () {
    return _pyfunc_op_add(((function list_comprehension (iter0) {var res = [];var v, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {v = iter0[i0];{res.push([_pyfunc_str(v), _pyfunc_str(v)]);}}return res;}).call(this, _pyfunc_range(1, 10, 1))), ([["0", "Effacer"], ["indice", "Indice"]]));
};

Partie.prototype.mesures = function () {
    return [["\u00c0 remplir", _pymeth_count.call(this.grille, 0)], ["Case", coordonnee(this.selection, 9)], ["Indices", this.indices]];
};


return { Partie };
})();
