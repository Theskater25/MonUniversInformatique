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
var _pymeth_join = function (x) { // nargs: 1
    if (this.constructor !== String) return this.join.apply(this, arguments);
    return x.join(this);  // call join on the list instead of the string.
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
    var hasard;
    mode = (mode === undefined) ? 0: mode;
    hasard = new Hasard(graine);
    this.secret = _pymeth_join.call("", ((function list_comprehension (iter0) {var res = [];var i, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {i = iter0[i0];{res.push(_pyfunc_str((1 + hasard.entier(6))));}}return res;}).call(this, _pyfunc_range(0, 4, 1))));
    this.saisie = "";
    this.essais = [];
    this.etat = 0;
    this.points = 0;
    this.message = "R\u00e8gle les quatre disques, chacun de 1 \u00e0 6. Les r\u00e9p\u00e9titions sont possibles.";
    return null;
};

Partie.prototype.agir = function (action) {
    var chiffre, communs, exacts, stub1_seq, stub2_itr;
    if (_pyfunc_truthy(this.etat)) {
        return null;
    }
    if (_pyfunc_op_equals(action, "effacer")) {
        this.saisie = this.saisie.slice(0,-1);
        return null;
    }
    if (((action.length == 1) && _pyfunc_op_contains(action, "123456"))) {
        if ((this.saisie.length < 4)) {
            this.saisie = _pyfunc_op_add(this.saisie, action);
        }
        return null;
    }
    if (((action.length == 4) && ((_pyfunc_all(((function list_comprehension (iter0) {var res = [];var c, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {c = iter0[i0];{res.push(_pyfunc_op_contains(c, "123456"));}}return res;}).call(this, action))))))) {
        this.saisie = action;
    } else if ((!_pyfunc_op_equals(action, "tester"))) {
        this.message = "Utilise quatre chiffres de 1 \u00e0 6.";
        return null;
    }
    if (_pyfunc_truthy(this.saisie.length != 4)) {
        this.message = "R\u00e8gle les quatre disques avant de tester.";
        return null;
    }
    exacts = ((function list_comprehension (iter0) {var res = [];var i, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {i = iter0[i0];if (!(_pyfunc_op_equals(this.saisie[i], this.secret[i]))) {continue;}{res.push(i);}}return res;}).call(this, _pyfunc_range(0, 4, 1))).length;
    communs = 0;
    stub1_seq = "123456";
    if ((typeof stub1_seq === "object") && (!Array.isArray(stub1_seq))) { stub1_seq = Object.keys(stub1_seq);}
    for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
        chiffre = stub1_seq[stub2_itr];
        communs = _pyfunc_op_add(communs, Math.min(_pymeth_count.call(this.saisie, chiffre), _pymeth_count.call(this.secret, chiffre)));
    }
    _pymeth_append.call(this.essais, [this.saisie, exacts, communs - exacts]);
    this.saisie = "";
    if (_pyfunc_op_equals(exacts, 4)) {
        this.etat = 1;
        this.points = 9 - this.essais.length;
        this.message = ("Le coffre s\u2019ouvre sur le code " + this.secret) + " !";
    } else if ((this.essais.length == 8)) {
        this.etat = -1;
        this.message = ("Le verrou se referme. La combinaison \u00e9tait " + this.secret) + ".";
    } else {
        this.message = ((_pyfunc_str(exacts) + " bien plac\u00e9(s), ") + (_pyfunc_str((communs - exacts)))) + " mal plac\u00e9(s).";
    }
    return null;
};

Partie.prototype.vue = function () {
    var disques;
    disques = (_pyfunc_truthy(this.etat))? (this.secret) : (this.saisie);
    return ({colonnes: 4, grille: (function list_comprehension (iter0) {var res = [];var i, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {i = iter0[i0];{res.push(((i < disques.length))? (disques[i]) : ("\u00b7"));}}return res;}).call(this, _pyfunc_range(0, 4, 1)), styles: (function list_comprehension (iter0) {var res = [];var i, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {i = iter0[i0];{res.push("disque");}}return res;}).call(this, _pyfunc_range(0, 4, 1)), historique: (function list_comprehension (iter0) {var res = [];var e, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {e = iter0[i0];{res.push([e[0], e[1], e[2]]);}}return res;}).call(this, this.essais), entetes: ["Code", "Bien plac\u00e9s", "Mal plac\u00e9s"]});
};

Partie.prototype.commandes = function () {
    return _pyfunc_op_add(((function list_comprehension (iter0) {var res = [];var c, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {c = iter0[i0];{res.push([c, c]);}}return res;}).call(this, "123456")), ([["effacer", "Effacer"], ["tester", "Tester"]]));
};

Partie.prototype.mesures = function () {
    return [["Essais", _pyfunc_str(this.essais.length) + "/8"], ["Disques", 4]];
};


return { Partie };
})();
