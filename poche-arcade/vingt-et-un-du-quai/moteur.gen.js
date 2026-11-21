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
var ENSEIGNES, FLECHES, Hasard, Partie, RANGS, coordonnee, indice_case, nom, valeur;
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
RANGS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "V", "D", "R"];
ENSEIGNES = ["\u2663", "\u2666", "\u2665", "\u2660"];
valeur = function flx_valeur (main) {
    var as_hauts, carte, rang, stub1_seq, stub2_itr, total;
    total = 0;
    as_hauts = 0;
    stub1_seq = main;
    if ((typeof stub1_seq === "object") && (!Array.isArray(stub1_seq))) { stub1_seq = Object.keys(stub1_seq);}
    for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
        carte = stub1_seq[stub2_itr];
        rang = carte % 13;
        if (_pyfunc_op_equals(rang, 0)) {
            total += 11;
            as_hauts += 1;
        } else {
            total = _pyfunc_op_add(total, Math.min(10, (rang + 1)));
        }
    }
    while ((total > 21) && _pyfunc_truthy(as_hauts)) {
        total -= 10;
        as_hauts -= 1;
    }
    return total;
};

nom = function flx_nom (carte) {
    return _pyfunc_op_add(RANGS[carte % 13], ENSEIGNES[_pyfunc_int((carte / 13))]);
};

Partie = function () {
    // Huit donnes à jetons fictifs. Le croupier reste sur tout total de 17.
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    mode = (mode === undefined) ? 0: mode;
    this.hasard = new Hasard(graine);
    this.banque = 40;
    this.donne = 0;
    this.mise = 0;
    this.joueur = [];
    this.croupier = [];
    this.en_main = false;
    this.etat = 0;
    this.points = 0;
    this.message = "Tu disposes de 40 jetons pour huit donnes. Choisis ta mise.";
    return null;
};

Partie.prototype.regler = function (retour, texte) {
    this.banque = _pyfunc_op_add(this.banque, retour);
    this.en_main = false;
    this.message = texte;
    if (((this.banque < 2) || _pyfunc_op_equals(this.donne, 8))) {
        this.etat = ((this.banque >= 2))? (1) : (-1);
        this.points = this.banque;
        this.message = _pyfunc_op_add(this.message, (" Fin de la table avec " + _pyfunc_str(this.banque)) + " jetons.");
    }
    return null;
};

Partie.prototype.rester = function () {
    var banque, score;
    score = valeur(this.joueur);
    while (valeur(this.croupier) < 17) {
        _pymeth_append.call(this.croupier, this.paquet.pop());
    }
    banque = valeur(this.croupier);
    if (((banque > 21) || (score > banque))) {
        this.regler(_pyfunc_op_mult(this.mise, 2), "Tu gagnes la donne.");
    } else if (_pyfunc_op_equals(score, banque)) {
        this.regler(this.mise, "\u00c9galit\u00e9. Tu r\u00e9cup\u00e8res ta mise.");
    } else {
        this.regler(0, "Le croupier gagne la donne.");
    }
    return null;
};

Partie.prototype.agir = function (action) {
    var adverse, naturel;
    if (_pyfunc_truthy(this.etat)) {
        return null;
    }
    if ((!_pyfunc_truthy(this.en_main))) {
        if ((((!_pyfunc_op_contains(action, ["2", "6", "10"]))) || (_pyfunc_int(action) > this.banque))) {
            this.message = "Choisis une mise disponible.";
            return null;
        }
        this.mise = _pyfunc_int(action);
        this.banque -= this.mise;
        this.donne += 1;
        this.en_main = true;
        this.paquet = this.hasard.melanger((function list_comprehension (iter0) {var res = [];var i, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {i = iter0[i0];{res.push(i);}}return res;}).call(this, _pyfunc_range(0, 52, 1)));
        this.joueur = [this.paquet.pop()];
        this.croupier = [this.paquet.pop()];
        _pymeth_append.call(this.joueur, this.paquet.pop());
        _pymeth_append.call(this.croupier, this.paquet.pop());
        naturel = _pyfunc_op_equals(valeur(this.joueur), 21);
        adverse = _pyfunc_op_equals(valeur(this.croupier), 21);
        if ((_pyfunc_truthy(naturel) && _pyfunc_truthy(adverse))) {
            this.regler(this.mise, "Deux blackjacks. \u00c9galit\u00e9.");
        } else if (_pyfunc_truthy(naturel)) {
            this.regler(_pyfunc_op_add(this.mise, (_pyfunc_int((_pyfunc_op_mult(this.mise, 3) / 2)))), "Blackjack naturel, pay\u00e9 trois pour deux !");
        } else if (_pyfunc_truthy(adverse)) {
            this.regler(0, "Blackjack du croupier.");
        } else {
            this.message = "Tire une carte ou reste sur ton total.";
        }
    } else if (_pyfunc_op_equals(action, "tirer")) {
        _pymeth_append.call(this.joueur, this.paquet.pop());
        if ((valeur(this.joueur) > 21)) {
            this.regler(0, "Tu d\u00e9passes 21. La mise revient au croupier.");
        } else if ((_pyfunc_op_equals(valeur(this.joueur), 21))) {
            this.rester();
        } else {
            this.message = "Carte tir\u00e9e. \u00c0 toi de d\u00e9cider.";
        }
    } else if (_pyfunc_op_equals(action, "rester")) {
        this.rester();
    }
    return null;
};

Partie.prototype.vue = function () {
    var adverse, stub3_, stub3_c, stub3_i0, stub3_iter0, titre, total;
    stub3_ = [];stub3_iter0 = this.croupier;if ((typeof stub3_iter0 === "object") && (!Array.isArray(stub3_iter0))) {stub3_iter0 = Object.keys(stub3_iter0);}for (stub3_i0=0; stub3_i0<stub3_iter0.length; stub3_i0++) {stub3_c = stub3_iter0[stub3_i0];{stub3_.push(nom(stub3_c));}}
    adverse = stub3_;
    if (_pyfunc_truthy(this.en_main)) {
        adverse[1] = "?";
    }
    total = (this.joueur.length)? (_pyfunc_str(valeur(this.joueur))) : ("\u2014");
    titre = ((_pyfunc_truthy(this.en_main) || (adverse.length == 0)))? ("Croupier") : ("Croupier \u00b7 " + (_pyfunc_str(valeur(this.croupier))));
    return ({cartes: [[titre, adverse], ["Ta main \u00b7 " + total, (function list_comprehension (iter0) {var res = [];var c, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {c = iter0[i0];{res.push(nom(c));}}return res;}).call(this, this.joueur)]]});
};

Partie.prototype.commandes = function () {
    if (_pyfunc_truthy(this.en_main)) {
        return [["tirer", "Tirer"], ["rester", "Rester"]];
    }
    return (function list_comprehension (iter0) {var res = [];var v, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {v = iter0[i0];if (!((v <= this.banque))) {continue;}{res.push([_pyfunc_str(v), "Miser " + _pyfunc_str(v)]);}}return res;}).call(this, [2, 6, 10]);
};

Partie.prototype.mesures = function () {
    return [["Jetons", this.banque], ["Mise", this.mise], ["Donne", _pyfunc_str(this.donne) + "/8"]];
};


return { Partie };
})();
