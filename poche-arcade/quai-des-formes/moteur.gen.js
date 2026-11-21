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
var _pymeth_extend = function (x) { // nargs: 1
    if (!Array.isArray(this)) return this.extend.apply(this, arguments);
    this.push.apply(this, x);
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
var FLECHES, FORMES, Hasard, PEINTURES, Partie, coordonnee, indice_case;
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
FORMES = [[[0, 0], [1, 0], [2, 0], [3, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[0, 0], [1, 0], [2, 0], [1, 1]], [[0, 0], [0, 1], [1, 1], [2, 1]], [[2, 0], [0, 1], [1, 1], [2, 1]], [[1, 0], [2, 0], [0, 1], [1, 1]], [[0, 0], [1, 0], [1, 1], [2, 1]]];
PEINTURES = ["#88c7bb", "#d9a377", "#a9b980", "#b39ab7", "#dd8f75", "#80abc5", "#e4c378"];
Partie = function () {
    // Des colis de quatre caisses et des scellés prioritaires sur un quai de huit travées.
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var c, stub1_, stub1_i, stub1_i0, stub1_iter0, y;
    mode = (mode === undefined) ? 0: mode;
    this.nom = "Quai des formes";
    this.aide = "Gauche/droite pour d\u00e9placer, haut pour pivoter, bas pour descendre, Espace pour poser.";
    this.boutons = [0, 2, 3, 1, 4];
    this.libelles = ["\u00c0 gauche", "\u00c0 droite", "Pivoter", "Descendre", "Poser"];
    this.fond = "#273c48";
    this.decor = [["r", 0, 123, 320, 69, "#345564"], ["r", 0, 170, 320, 22, "#775c51"], ["r", 101, 9, 94, 160, "#a17c5c"], ["r", 104, 12, 88, 154, "#202e38"], ["r", 225, 28, 54, 43, "#23303a"], ["r", 18, 30, 7, 138, "#9a7958"], ["r", 12, 27, 85, 5, "#bb946c"], ["l", 20, 54, 65, 32, "#9a7958"], ["r", 79, 32, 1, 38, "#a4aa95"], ["r", 76, 70, 6, 3, "#e1b581"]];
    for (c = 1; c < 8; c += 1) {
        _pymeth_append.call(this.decor, ["r", 104 + _pyfunc_op_mult(c, 11), 12, 1, 154, "#2c3941"]);
    }
    for (y = 1; y < 14; y += 1) {
        _pymeth_append.call(this.decor, ["r", 104, 12 + _pyfunc_op_mult(y, 11), 88, 1, "#2c3941"]);
    }
    this.hasard = new Hasard(graine);
    this.sac = [];
    stub1_ = [];stub1_iter0 = _pyfunc_range(0, 112, 1);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1_i = stub1_iter0[stub1_i0];{stub1_.push(0);}}
    this.grille = stub1_;
    this.points = 0;
    this.lignes = 0;
    this.scelles = 0;
    this.manifeste = 0;
    this.etat = 0;
    this.message = "Les caisses scell\u00e9es d\u2019or rapportent un bonus quand leur rang\u00e9e est exp\u00e9di\u00e9e.";
    this.suivante = this.tirer();
    this.nouveau();
    return null;
};

Partie.prototype.tirer = function () {
    if ((!this.sac.length)) {
        this.sac = this.hasard.melanger((function list_comprehension (iter0) {var res = [];var i, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {i = iter0[i0];{res.push(i);}}return res;}).call(this, _pyfunc_range(0, 7, 1)));
    }
    return this.sac.pop();
};

Partie.prototype.nouveau = function () {
    var stub2_, stub2_i0, stub2_iter0, stub2_p;
    this.forme = this.suivante;
    this.suivante = this.tirer();
    stub2_ = [];stub2_iter0 = FORMES[this.forme];if ((typeof stub2_iter0 === "object") && (!Array.isArray(stub2_iter0))) {stub2_iter0 = Object.keys(stub2_iter0);}for (stub2_i0=0; stub2_i0<stub2_iter0.length; stub2_i0++) {stub2_p = stub2_iter0[stub2_i0];{stub2_.push(stub2_p.slice(0));}}
    this.piece = stub2_;
    this.x = 2;
    this.y = 0;
    this.delai = 0;
    this.repetition = 0;
    this.manifeste += 1;
    this.scelle = _pyfunc_op_equals((this.manifeste % 3), 1);
    if ((!_pyfunc_truthy(this.libre(this.x, this.y, this.piece)))) {
        this.etat = -1;
        this.message = ("Le quai est plein. " + _pyfunc_str(this.lignes)) + " rang\u00e9e(s) ont \u00e9t\u00e9 exp\u00e9di\u00e9es.";
    }
    return null;
};

Partie.prototype.libre = function (x, y, piece) {
    var p, stub3_seq, stub4_itr, xx, yy;
    stub3_seq = piece;
    if ((typeof stub3_seq === "object") && (!Array.isArray(stub3_seq))) { stub3_seq = Object.keys(stub3_seq);}
    for (stub4_itr = 0; stub4_itr < stub3_seq.length; stub4_itr += 1) {
        p = stub3_seq[stub4_itr];
        xx = _pyfunc_op_add(x, p[0]);
        yy = _pyfunc_op_add(y, p[1]);
        if (((xx < 0) || (xx >= 8) || (yy < 0) || (yy >= 14) || this.grille[_pyfunc_op_add(_pyfunc_op_mult(yy, 8), xx)])) {
            return false;
        }
    }
    return true;
};

Partie.prototype.pivoter = function () {
    var dx, hauteur, stub5_, stub5_i0, stub5_iter0, stub5_p, stub6_seq, stub7_itr, tour;
    hauteur = Math.max.apply(null, (function list_comprehension (iter0) {var res = [];var p, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {p = iter0[i0];{res.push(p[1]);}}return res;}).call(this, this.piece));
    stub5_ = [];stub5_iter0 = this.piece;if ((typeof stub5_iter0 === "object") && (!Array.isArray(stub5_iter0))) {stub5_iter0 = Object.keys(stub5_iter0);}for (stub5_i0=0; stub5_i0<stub5_iter0.length; stub5_i0++) {stub5_p = stub5_iter0[stub5_i0];{stub5_.push([hauteur - stub5_p[1], stub5_p[0]]);}}
    tour = stub5_;
    stub6_seq = [0, -1, 1, -2, 2];
    if ((typeof stub6_seq === "object") && (!Array.isArray(stub6_seq))) { stub6_seq = Object.keys(stub6_seq);}
    for (stub7_itr = 0; stub7_itr < stub6_seq.length; stub7_itr += 1) {
        dx = stub6_seq[stub7_itr];
        if (_pyfunc_truthy(this.libre(_pyfunc_op_add(this.x, dx), this.y, tour))) {
            this.x = _pyfunc_op_add(this.x, dx);
            this.piece = tour;
            return null;
        }
    }
    return null;
};

Partie.prototype.poser = function () {
    var complets, i, ligne, marques, p, reste, y;
    for (i = 0; i < 4; i += 1) {
        p = this.piece[i];
        this.grille[_pyfunc_op_add((_pyfunc_op_add((_pyfunc_op_mult(_pyfunc_op_add(this.y, p[1]), 8)), this.x)), p[0])] = (this.forme + 1) + (((_pyfunc_truthy(this.scelle) && _pyfunc_op_equals(i, 0)))? (10) : (0));
    }
    reste = [];
    complets = 0;
    marques = 0;
    for (y = 0; y < 14; y += 1) {
        ligne = this.grille.slice(_pyfunc_op_mult(y, 8),_pyfunc_op_mult(y, 8) + 8);
        if ((!_pyfunc_op_contains(0, ligne))) {
            complets += 1;
            marques = _pyfunc_op_add(marques, ((function list_comprehension (iter0) {var res = [];var v, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {v = iter0[i0];if (!((v > 10))) {continue;}{res.push(v);}}return res;}).call(this, ligne)).length);
        } else {
            _pymeth_extend.call(reste, ligne);
        }
    }
    this.grille = _pyfunc_op_add(((function list_comprehension (iter0) {var res = [];var i, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {i = iter0[i0];{res.push(0);}}return res;}).call(this, _pyfunc_range(0, _pyfunc_op_mult(complets, 8), 1))), reste);
    this.lignes = _pyfunc_op_add(this.lignes, complets);
    this.scelles = _pyfunc_op_add(this.scelles, marques);
    this.points = _pyfunc_op_add(this.points, (2 + (_pyfunc_op_mult(_pyfunc_op_mult(complets, complets), 40))) + _pyfunc_op_mult(marques, 35));
    this.nouveau();
    return null;
};

Partie.prototype.avancer = function (touches, appuis) {
    var direction, vitesse;
    if (_pyfunc_truthy(this.etat)) {
        return null;
    }
    if (_pyfunc_truthy(appuis[2])) {
        this.pivoter();
    }
    direction = _pyfunc_int(touches[1]) - _pyfunc_int(touches[0]);
    if (_pyfunc_op_equals(direction, 0)) {
        this.repetition = 0;
    } else {
        if ((_pyfunc_truthy(appuis[0]) || _pyfunc_truthy(appuis[1]) || _pyfunc_op_equals(this.repetition, 0))) {
            if (_pyfunc_truthy(this.libre(_pyfunc_op_add(this.x, direction), this.y, this.piece))) {
                this.x = _pyfunc_op_add(this.x, direction);
            }
            this.repetition = (_pyfunc_truthy(_pyfunc_truthy(appuis[0]) || appuis[1]))? (9) : (4);
        }
        this.repetition = Math.max(0, (this.repetition - 1));
    }
    if (_pyfunc_truthy(appuis[4])) {
        while (this.libre(this.x, this.y + 1, this.piece)) {
            this.y += 1;
        }
        this.poser();
        return null;
    }
    this.delai += 1;
    vitesse = Math.max(5, (37 - (_pyfunc_op_mult((_pyfunc_int((this.lignes / 2))), 3))));
    if (((this.delai >= vitesse) || (_pyfunc_truthy(touches[3]) && (((this.delai >= 3) || appuis[3]))))) {
        this.delai = 0;
        if (_pyfunc_truthy(this.libre(this.x, this.y + 1, this.piece))) {
            this.y += 1;
        } else {
            this.poser();
        }
    }
    return null;
};

Partie.prototype.caisse = function (formes, x, y, code) {
    var couleur;
    couleur = PEINTURES[(code % 10) - 1];
    _pymeth_extend.call(formes, ([["r", x, y, 10, 10, "#584a45"], ["r", x + 1, y + 1, 8, 8, couleur], ["l", x + 2, y + 7, x + 7, y + 2, "#7b6959"]]));
    if ((code > 10)) {
        _pymeth_append.call(formes, ["r", x + 4, y + 3, 3, 4, "#fff0a1"]);
    }
    return null;
};

Partie.prototype.dessin = function () {
    var fond, formes, i, p, stub8_seq, stub9_itr, xx;
    formes = [];
    for (i = 0; i < 112; i += 1) {
        if (_pyfunc_truthy(this.grille[i])) {
            this.caisse(formes, 104 + (_pyfunc_op_mult((i % 8), 11)), 12 + (_pyfunc_op_mult((_pyfunc_int((i / 8))), 11)), this.grille[i]);
        }
    }
    if ((!_pyfunc_truthy(this.etat))) {
        fond = this.y;
        while (this.libre(this.x, fond + 1, this.piece)) {
            fond += 1;
        }
        for (i = 0; i < 4; i += 1) {
            p = this.piece[i];
            xx = 104 + (_pyfunc_op_mult(_pyfunc_op_add(this.x, p[0]), 11));
            _pymeth_append.call(formes, (["r", xx, 20 + (_pyfunc_op_mult(_pyfunc_op_add(fond, p[1]), 11)), 9, 2, "#77948e"]));
            this.caisse(formes, xx, 12 + (_pyfunc_op_mult(_pyfunc_op_add(this.y, p[1]), 11)), (this.forme + 1) + (((_pyfunc_truthy(this.scelle) && _pyfunc_op_equals(i, 0)))? (10) : (0)));
        }
    }
    stub8_seq = FORMES[this.suivante];
    if ((typeof stub8_seq === "object") && (!Array.isArray(stub8_seq))) { stub8_seq = Object.keys(stub8_seq);}
    for (stub9_itr = 0; stub9_itr < stub8_seq.length; stub9_itr += 1) {
        p = stub8_seq[stub9_itr];
        this.caisse(formes, 231 + _pyfunc_op_mult(p[0], 10), 38 + _pyfunc_op_mult(p[1], 10), this.suivante + 1);
    }
    return formes;
};

Partie.prototype.mesures = function () {
    return [["Rang\u00e9es", this.lignes], ["Scell\u00e9s", this.scelles], ["Score", this.points]];
};


return { Partie };
})();
