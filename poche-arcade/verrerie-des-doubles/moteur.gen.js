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
    // Vingt emplacements dans un four et une poire à air chargée par les fusions.
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var stub1_, stub1_i, stub1_i0, stub1_iter0;
    mode = (mode === undefined) ? 0: mode;
    this.hasard = new Hasard(graine);
    stub1_ = [];stub1_iter0 = _pyfunc_range(0, 20, 1);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1_i = stub1_iter0[stub1_i0];{stub1_.push(0);}}
    this.verres = stub1_;
    this.points = 0;
    this.etat = 0;
    this.charge = 0;
    this.coups = 0;
    this.message = "Fais glisser les verres pour souffler une pi\u00e8ce de 2048.";
    this.ajouter();
    this.ajouter();
    return null;
};

Partie.prototype.ajouter = function () {
    var case_libre, libres, stub2_, stub2_i, stub2_i0, stub2_iter0;
    stub2_ = [];stub2_iter0 = _pyfunc_range(0, 20, 1);if ((typeof stub2_iter0 === "object") && (!Array.isArray(stub2_iter0))) {stub2_iter0 = Object.keys(stub2_iter0);}for (stub2_i0=0; stub2_i0<stub2_iter0.length; stub2_i0++) {stub2_i = stub2_iter0[stub2_i0];if (!(_pyfunc_op_equals(this.verres[stub2_i], 0))) {continue;}{stub2_.push(stub2_i);}}
    libres = stub2_;
    if (libres.length) {
        case_libre = libres[this.hasard.entier(libres.length)];
        this.verres[case_libre] = ((_pyfunc_op_equals(this.hasard.entier(8), 0)))? (4) : (2);
    }
    return null;
};

Partie.prototype.lignes = function (direction) {
    if ((_pyfunc_op_equals(direction, "g") || _pyfunc_op_equals(direction, "d"))) {
        return (function list_comprehension (iter0) {var res = [];var y, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {y = iter0[i0];{res.push((function list_comprehension (iter0) {var res = [];var x, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {x = iter0[i0];{res.push(_pyfunc_op_add(_pyfunc_op_mult(y, 5), ((_pyfunc_op_equals(direction, "d"))? (4 - x) : (x))));}}return res;}).call(this, _pyfunc_range(0, 5, 1)));}}return res;}).call(this, _pyfunc_range(0, 4, 1));
    }
    return (function list_comprehension (iter0) {var res = [];var x, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {x = iter0[i0];{res.push((function list_comprehension (iter0) {var res = [];var y, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {y = iter0[i0];{res.push(_pyfunc_op_add((_pyfunc_op_mult(((_pyfunc_op_equals(direction, "b"))? (3 - y) : (y)), 5)), x));}}return res;}).call(this, _pyfunc_range(0, 4, 1)));}}return res;}).call(this, _pyfunc_range(0, 5, 1));
};

Partie.prototype.agir = function (action) {
    var avant, direction, fondu, j, k, ligne, stub3_, stub3_i, stub3_i0, stub3_iter0, stub4_seq, stub5_itr, stub6_seq, stub7_itr, stub8_seq, stub9_itr, v, valeurs;
    if (_pyfunc_truthy(this.etat)) {
        return null;
    }
    if (_pyfunc_op_equals(action, "souffler")) {
        if (((this.charge < 4) || (!_pyfunc_op_contains(2, this.verres)))) {
            this.message = "Le soufflet demande quatre fusions et un verre de valeur 2.";
            return null;
        }
        this.verres[_pymeth_index.call(this.verres, 2)] = 0;
        this.charge = 0;
        this.message = "Le soufflet a lib\u00e9r\u00e9 un emplacement.";
        return null;
    }
    if ((!_pyfunc_op_contains(action, ["g", "d", "h", "b"]))) {
        return null;
    }
    avant = this.verres.slice(0);
    stub4_seq = this.lignes(action);
    if ((typeof stub4_seq === "object") && (!Array.isArray(stub4_seq))) { stub4_seq = Object.keys(stub4_seq);}
    for (stub5_itr = 0; stub5_itr < stub4_seq.length; stub5_itr += 1) {
        ligne = stub4_seq[stub5_itr];
        stub3_ = [];stub3_iter0 = ligne;if ((typeof stub3_iter0 === "object") && (!Array.isArray(stub3_iter0))) {stub3_iter0 = Object.keys(stub3_iter0);}for (stub3_i0=0; stub3_i0<stub3_iter0.length; stub3_i0++) {stub3_i = stub3_iter0[stub3_i0];if (!(this.verres[stub3_i])) {continue;}{stub3_.push(this.verres[stub3_i]);}}
        valeurs = stub3_;
        fondu = [];
        j = 0;
        while (j < valeurs.length) {
            v = valeurs[j];
            if (((((j + 1) < valeurs.length)) && _pyfunc_op_equals(valeurs[j + 1], v))) {
                v = _pyfunc_op_mult(v, 2);
                this.points = _pyfunc_op_add(this.points, v);
                this.charge = Math.min(4, (this.charge + 1));
                j += 1;
            }
            _pymeth_append.call(fondu, v);
            j += 1;
        }
        for (k = 0; k < ligne.length; k += 1) {
            this.verres[ligne[k]] = ((k < fondu.length))? (fondu[k]) : (0);
        }
    }
    if (_pyfunc_op_equals(this.verres, avant)) {
        this.message = "Aucun verre ne glisse dans ce sens.";
        return null;
    }
    this.coups += 1;
    this.ajouter();
    this.message = "Quatre fusions chargent le soufflet.";
    if ((Math.max.apply(null, this.verres) >= 2048)) {
        this.etat = 1;
        this.message = "La pi\u00e8ce de 2048 sort du four !";
    } else if ((((!_pyfunc_op_contains(0, this.verres))) && ((!(_pyfunc_op_equals(this.charge, 4) && _pyfunc_op_contains(2, this.verres)))))) {
        stub8_seq = ["g", "h"];
        if ((typeof stub8_seq === "object") && (!Array.isArray(stub8_seq))) { stub8_seq = Object.keys(stub8_seq);}
        for (stub9_itr = 0; stub9_itr < stub8_seq.length; stub9_itr += 1) {
            direction = stub8_seq[stub9_itr];
            stub6_seq = this.lignes(direction);
            if ((typeof stub6_seq === "object") && (!Array.isArray(stub6_seq))) { stub6_seq = Object.keys(stub6_seq);}
            for (stub7_itr = 0; stub7_itr < stub6_seq.length; stub7_itr += 1) {
                ligne = stub6_seq[stub7_itr];
                for (j = 1; j < ligne.length; j += 1) {
                    if ((_pyfunc_op_equals((this.verres[ligne[j]]), (this.verres[ligne[j - 1]])))) {
                        return null;
                    }
                }
            }
        }
        this.etat = -1;
        this.message = "Le four est rempli et aucune paire ne peut fusionner.";
    }
    return null;
};

Partie.prototype.vue = function () {
    return ({colonnes: 5, grille: (function list_comprehension (iter0) {var res = [];var v, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {v = iter0[i0];{res.push((_pyfunc_truthy(v))? (_pyfunc_str(v)) : (""));}}return res;}).call(this, this.verres), styles: (function list_comprehension (iter0) {var res = [];var v, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {v = iter0[i0];{res.push("verre-" + _pyfunc_str(v));}}return res;}).call(this, this.verres)});
};

Partie.prototype.commandes = function () {
    var boutons;
    boutons = FLECHES.slice(0);
    if ((_pyfunc_op_equals(this.charge, 4) && _pyfunc_op_contains(2, this.verres))) {
        _pymeth_append.call(boutons, ["souffler", "Souffler un 2"]);
    }
    return boutons;
};

Partie.prototype.mesures = function () {
    return [["Score", this.points], ["Plus grand verre", Math.max.apply(null, this.verres)], ["Soufflet", _pyfunc_str(this.charge) + "/4"]];
};


return { Partie };
})();
