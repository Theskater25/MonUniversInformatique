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
    // Une plume recueille les graines suspendues au milieu de mobiles à vent.
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var x;
    mode = (mode === undefined) ? 0: mode;
    this.nom = "Courant de plumes";
    this.aide = "Espace ou fl\u00e8che haut pour donner une impulsion. Traverse les mobiles.";
    this.boutons = [4];
    this.raccourcis = [2];
    this.libelles = ["Gauche", "Droite", "Haut", "Bas", "Prendre le vent"];
    this.fond = "#689cab";
    this.decor = [["r", 0, 0, 320, 45, "#6091a6"], ["r", 0, 118, 320, 74, "#91b5aa"]];
    for (x = -10; x < 335; x += 24) {
        _pymeth_append.call(this.decor, ["e", x, 139 + (x % 9), 43, 40, "#649689"]);
        _pymeth_append.call(this.decor, ["e", x + 7, 157 + (x % 11), 51, 42, "#477d74"]);
    }
    this.hasard = new Hasard(graine);
    this.y = 92;
    this.vy = -1.15;
    this.mobiles = [];
    this.portes = 0;
    this.graines = 0;
    this.points = 0;
    this.age = 0;
    this.etat = 0;
    this.message = "Les graines au centre des passages valent cinq points de plus.";
    this.ajouter(205, 94);
    this.ajouter(322, this.mobiles[this.mobiles.length -1][1]);
    return null;
};

Partie.prototype.ajouter = function (x, precedent) {
    var demi, milieu;
    milieu = Math.max(50, (Math.min(140, ((_pyfunc_op_add(precedent, this.hasard.entier(79))) - 39))));
    demi = Math.max(27, (38 - (_pyfunc_int((this.portes / 6)))));
    _pymeth_append.call(this.mobiles, [x, milieu, demi, false, false]);
    return null;
};

Partie.prototype.avancer = function (touches, appuis) {
    var collision, demi, milieu, mobile, stub1_, stub2_seq, stub3_itr, vitesse, x;
    if (_pyfunc_truthy(this.etat)) {
        return null;
    }
    this.age += 1;
    if (_pyfunc_truthy(_pyfunc_truthy(appuis[4]) || appuis[2])) {
        this.vy = -2.25;
    }
    this.vy = Math.min(3.0, (this.vy + 0.079));
    this.y = _pyfunc_op_add(this.y, this.vy);
    vitesse = Math.min(2.35, (1.15 + _pyfunc_op_mult(this.portes, 0.024)));
    collision = (this.y < 4) || (this.y > 185);
    stub2_seq = this.mobiles;
    if ((typeof stub2_seq === "object") && (!Array.isArray(stub2_seq))) { stub2_seq = Object.keys(stub2_seq);}
    for (stub3_itr = 0; stub3_itr < stub2_seq.length; stub3_itr += 1) {
        mobile = stub2_seq[stub3_itr];
        mobile[0] -= vitesse;
        stub1_ = [mobile[0], mobile[1], mobile[2]];
        x = stub1_[0];milieu = stub1_[1];demi = stub1_[2];
        if (((((_pyfunc_abs((x - 64))) < 11)) && (((((this.y - 4) < (milieu - demi))) || ((this.y + 4) > _pyfunc_op_add(milieu, demi)))))) {
            collision = true;
        }
        if ((((!_pyfunc_truthy(mobile[3]))) && (((_pyfunc_abs((x - 64))) < 7)) && (((_pyfunc_abs((this.y - milieu))) < 8)))) {
            mobile[3] = true;
            this.graines += 1;
            this.points += 5;
        }
        if ((((!_pyfunc_truthy(mobile[4]))) && (x < 51))) {
            mobile[4] = true;
            this.portes += 1;
            this.points += 10;
        }
    }
    if (_pyfunc_truthy(collision)) {
        this.etat = -1;
        this.message = ("La plume se pose apr\u00e8s " + _pyfunc_str(this.portes)) + " passage(s).";
        return null;
    }
    if (((this.mobiles[0][0]) < (-15))) {
        _pymeth_pop.call(this.mobiles, 0);
    }
    if (((this.mobiles[this.mobiles.length -1][0]) < 225)) {
        this.ajouter(((this.mobiles[this.mobiles.length -1][0]) + 112) + this.hasard.entier(18), this.mobiles[this.mobiles.length -1][1]);
    }
    return null;
};

Partie.prototype.dessin = function () {
    var bas, formes, haut, i, mobile, stub4_, stub5_seq, stub6_itr, x, y;
    formes = [];
    for (i = 0; i < 4; i += 1) {
        x = (((1000 + _pyfunc_op_mult(i, 95)) - ((_pyfunc_int((this.age / 4))) % 360)) % 360) - 22;
        y = 22 + (_pyfunc_op_mult((i % 3), 20));
        _pymeth_append.call(formes, ["e", x, y, 31, 7, "#b1ced0"]);
        _pymeth_append.call(formes, ["e", x + 6, y - 4, 17, 8, "#b1ced0"]);
    }
    stub5_seq = this.mobiles;
    if ((typeof stub5_seq === "object") && (!Array.isArray(stub5_seq))) { stub5_seq = Object.keys(stub5_seq);}
    for (stub6_itr = 0; stub6_itr < stub5_seq.length; stub6_itr += 1) {
        mobile = stub5_seq[stub6_itr];
        stub4_ = [mobile[0], mobile[1] - mobile[2], _pyfunc_op_add(mobile[1], mobile[2])];
        x = stub4_[0];haut = stub4_[1];bas = stub4_[2];
        _pymeth_append.call(formes, ["r", x - 1, 0, 2, haut, "#514c59"]);
        _pymeth_append.call(formes, ["r", x - 4, haut - 22, 8, 15, "#ce7964"]);
        _pymeth_append.call(formes, ["r", x - 6, haut - 7, 12, 5, "#fed395"]);
        _pymeth_append.call(formes, ["r", x - 1, bas, 2, 192 - bas, "#54705f"]);
        _pymeth_append.call(formes, ["r", x - 6, bas, 12, 5, "#edbe7d"]);
        _pymeth_append.call(formes, ["r", x - 4, bas + 6, 8, 15, "#a66b59"]);
        if ((!_pyfunc_truthy(mobile[3]))) {
            _pymeth_append.call(formes, (["e", x - 3, mobile[1] - 4, 6, 8, "#ffe4a0"]));
            _pymeth_append.call(formes, (["r", x - 1, mobile[1] - 2, 2, 4, "#a37050"]));
        }
    }
    y = this.y;
    _pymeth_extend.call(formes, ([["e", 55, y - 4, 15, 8, "#f7e5b6"], ["r", 59, y - 5, 6, 3, "#e29072"], ["l", 51, y + 6, 69, y - 2, "#7b514f"], ["r", 65, y - 3, 5, 2, "#fff5d4"]]));
    return formes;
};

Partie.prototype.mesures = function () {
    return [["Passages", this.portes], ["Graines", this.graines], ["Score", this.points]];
};


return { Partie };
})();
