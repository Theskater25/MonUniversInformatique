// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurClassique = (() => {
var _pyfunc_all = function (x) { // nargs: 1
    for (var i=0; i<x.length; i++) {
        if (!_pyfunc_truthy(x[i])){return false;}
    } return true;
};
var _pyfunc_any = function (x) { // nargs: 1
    for (var i=0; i<x.length; i++) {
        if (_pyfunc_truthy(x[i])){return true;}
    } return false;
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
var LETTRES, Partie, TAILLES, coordonnee;
TAILLES = [3, 2, 2];
LETTRES = "ABCDEFG";
coordonnee = function flx_coordonnee (i) {
    return _pyfunc_op_add(LETTRES[_pyfunc_int((i / 7))], (_pyfunc_str(((i % 7) + 1))));
};

Partie = function () {
    // Deux flottilles de papier dans des bassins de sept cases de côté.
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    mode = (mode === undefined) ? 0: mode;
    this.graine = graine;
    this.flottes = [[], []];
    this.tirs = [[], []];
    this.placement = true;
    this.vertical = false;
    this.etat = 0;
    this.points = 0;
    this.placer_auto(1);
    this.message = "Place ton premier bateau de 3 cases sur ton bassin.";
    return null;
};

Partie.prototype.choisir = function (n) {
    this.graine = (_pyfunc_op_mult(this.graine, 9301) + 49297) % 233280;
    return _pyfunc_int((_pyfunc_op_mult(this.graine, n) / 233280));
};

Partie.prototype.trace = function (camp, debut, vertical, taille) {
    var bateau, pas, places, pos, stub1_, stub1_i, stub1_i0, stub1_iter0, stub2_seq, stub3_itr, stub4_seq, stub5_itr, x, y;
    if (((debut < 0) || (debut >= 49))) {
        return [];
    }
    x = debut % 7;
    y = _pyfunc_int((debut / 7));
    if ((((_pyfunc_truthy(vertical) && ((_pyfunc_op_add(y, taille) > 7)))) || (((!_pyfunc_truthy(vertical))) && ((_pyfunc_op_add(x, taille) > 7))))) {
        return [];
    }
    pas = (_pyfunc_truthy(vertical))? (7) : (1);
    stub1_ = [];stub1_iter0 = _pyfunc_range(0, taille, 1);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1_i = stub1_iter0[stub1_i0];{stub1_.push(_pyfunc_op_add(debut, _pyfunc_op_mult(stub1_i, pas)));}}
    places = stub1_;
    stub4_seq = this.flottes[camp];
    if ((typeof stub4_seq === "object") && (!Array.isArray(stub4_seq))) { stub4_seq = Object.keys(stub4_seq);}
    for (stub5_itr = 0; stub5_itr < stub4_seq.length; stub5_itr += 1) {
        bateau = stub4_seq[stub5_itr];
        stub2_seq = places;
        if ((typeof stub2_seq === "object") && (!Array.isArray(stub2_seq))) { stub2_seq = Object.keys(stub2_seq);}
        for (stub3_itr = 0; stub3_itr < stub2_seq.length; stub3_itr += 1) {
            pos = stub2_seq[stub3_itr];
            if (_pyfunc_op_contains(pos, bateau)) {
                return [];
            }
        }
    }
    return places;
};

Partie.prototype.placer_auto = function (camp) {
    var choix, debut, places, sens, stub6_seq, stub7_itr, stub8_seq, stub9_itr, taille;
    this.flottes[camp] = [];
    stub8_seq = TAILLES;
    if ((typeof stub8_seq === "object") && (!Array.isArray(stub8_seq))) { stub8_seq = Object.keys(stub8_seq);}
    for (stub9_itr = 0; stub9_itr < stub8_seq.length; stub9_itr += 1) {
        taille = stub8_seq[stub9_itr];
        choix = [];
        for (debut = 0; debut < 49; debut += 1) {
            stub6_seq = [false, true];
            if ((typeof stub6_seq === "object") && (!Array.isArray(stub6_seq))) { stub6_seq = Object.keys(stub6_seq);}
            for (stub7_itr = 0; stub7_itr < stub6_seq.length; stub7_itr += 1) {
                sens = stub6_seq[stub7_itr];
                places = this.trace(camp, debut, sens, taille);
                if ((places.length > 0)) {
                    _pymeth_append.call(choix, places);
                }
            }
        }
        _pymeth_append.call(this.flottes[camp], choix[this.choisir(choix.length)]);
    }
    return null;
};

Partie.prototype.pret = function () {
    this.placement = false;
    this.message = "\u00c0 toi ! Vise une coordonn\u00e9e du bassin adverse.";
    return null;
};

Partie.prototype.repartir = function () {
    if (_pyfunc_truthy(this.placement)) {
        this.placer_auto(0);
        this.pret();
    }
    return null;
};

Partie.prototype.pivoter = function () {
    if (_pyfunc_truthy(this.placement)) {
        this.vertical = !_pyfunc_truthy(this.vertical);
        this.message = (_pyfunc_truthy(this.vertical))? ("Oriente la proue vers le bas.") : ("Oriente la proue vers la droite.");
    }
    return null;
};

Partie.prototype.placer = function (debut) {
    var places;
    if ((!_pyfunc_truthy(this.placement))) {
        return null;
    }
    places = this.trace(0, debut, this.vertical, TAILLES[this.flottes[0].length]);
    if ((places.length == 0)) {
        this.message = "Le bateau doit tenir dans le bassin sans chevauchement.";
        return null;
    }
    _pymeth_append.call(this.flottes[0], places);
    if ((_pyfunc_op_equals((this.flottes[0].length), TAILLES.length))) {
        this.pret();
    } else {
        this.message = "Bateau pos\u00e9. Place maintenant un bateau de 2 cases.";
    }
    return null;
};

Partie.prototype.impact = function (camp, i) {
    var bateau, stub10_seq, stub11_itr;
    stub10_seq = this.flottes[camp];
    if ((typeof stub10_seq === "object") && (!Array.isArray(stub10_seq))) { stub10_seq = Object.keys(stub10_seq);}
    for (stub11_itr = 0; stub11_itr < stub10_seq.length; stub11_itr += 1) {
        bateau = stub10_seq[stub11_itr];
        if (_pyfunc_op_contains(i, bateau)) {
            if ((_pyfunc_all(((function list_comprehension (iter0) {var res = [];var pos, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {pos = iter0[i0];{res.push(_pyfunc_op_contains(pos, this.tirs[camp]));}}return res;}).call(this, bateau))))) {
                return "coul\u00e9";
            }
            return "touch\u00e9";
        }
    }
    return "\u00e0 l\u2019eau";
};

Partie.prototype.restants = function (camp) {
    return ((function list_comprehension (iter0) {var res = [];var b, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {b = iter0[i0];if (!((_pyfunc_any(((function list_comprehension (iter0) {var res = [];var p, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {p = iter0[i0];{res.push(!_pyfunc_op_contains(p, this.tirs[camp]));}}return res;}).call(this, b)))))) {continue;}{res.push(b);}}return res;}).call(this, this.flottes[camp])).length;
};

Partie.prototype.jouer = function (cible) {
    var libres, riposte, stub12_, stub12_i, stub12_i0, stub12_iter0;
    if ((((!_pyfunc_op_equals(this.etat, 0))) || _pyfunc_truthy(this.placement) || (cible < 0) || (cible >= 49))) {
        return null;
    }
    if (_pyfunc_op_contains(cible, this.tirs[1])) {
        this.message = "Cette coordonn\u00e9e a d\u00e9j\u00e0 \u00e9t\u00e9 sond\u00e9e.";
        return null;
    }
    _pymeth_append.call(this.tirs[1], cible);
    this.message = ((("Toi en " + coordonnee(cible)) + " : ") + this.impact(1, cible)) + ".";
    if ((_pyfunc_op_equals(this.restants(1), 0))) {
        this.etat = 1;
        this.points = 50 - (this.tirs[1].length);
        this.message += " La flottille adverse est rep\u00each\u00e9e !";
        return null;
    }
    stub12_ = [];stub12_iter0 = _pyfunc_range(0, 49, 1);if ((typeof stub12_iter0 === "object") && (!Array.isArray(stub12_iter0))) {stub12_iter0 = Object.keys(stub12_iter0);}for (stub12_i0=0; stub12_i0<stub12_iter0.length; stub12_i0++) {stub12_i = stub12_iter0[stub12_i0];if (!((!_pyfunc_op_contains(stub12_i, this.tirs[0])))) {continue;}{stub12_.push(stub12_i);}}
    libres = stub12_;
    riposte = libres[this.choisir(libres.length)];
    _pymeth_append.call(this.tirs[0], riposte);
    this.message = _pyfunc_op_add(this.message, (((" Adversaire en " + coordonnee(riposte)) + " : ") + this.impact(0, riposte)) + ".");
    if ((_pyfunc_op_equals(this.restants(0), 0))) {
        this.etat = -1;
        this.message += " Ton dernier bateau a coul\u00e9.";
    }
    return null;
};

Partie.prototype.mesures = function () {
    if (_pyfunc_truthy(this.placement)) {
        return [["Bateaux pos\u00e9s", (_pyfunc_str((this.flottes[0].length))) + " / 3"], ["Longueur", TAILLES[this.flottes[0].length]]];
    }
    return [["Tes bateaux", this.restants(0)], ["Adverses", this.restants(1)], ["Tes tirs", this.tirs[1].length]];
};


return { Partie };
})();
