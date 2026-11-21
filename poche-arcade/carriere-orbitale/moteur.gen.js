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
var CAPS, FLECHES, Hasard, Partie, coordonnee, ecart, indice_case, proche;
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
CAPS = [[100, 0], [92, 38], [71, 71], [38, 92], [0, 100], [-38, 92], [-71, 71], [-92, 38], [-100, 0], [-92, -38], [-71, -71], [-38, -92], [0, -100], [38, -92], [71, -71], [92, -38]];
ecart = function flx_ecart (a, b, limite) {
    return ((_pyfunc_op_add((a - b), _pyfunc_op_mult(limite, 1.5))) % limite) - _pyfunc_op_mult(limite, 0.5);
};

proche = function flx_proche (x, y, a, b, rayon) {
    var dx, dy;
    dx = ecart(x, a, 320);
    dy = ecart(y, b, 192);
    return (_pyfunc_op_add(_pyfunc_op_mult(dx, dx), _pyfunc_op_mult(dy, dy))) <= _pyfunc_op_mult(rayon, rayon);
};

Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var i;
    mode = (mode === undefined) ? 0: mode;
    this.nom = "Carri\u00e8re orbitale";
    this.aide = "Gauche/droite pour tourner, haut pour propulser, Espace pour fendre les rochers.";
    this.boutons = [0, 2, 1, 4];
    this.libelles = ["Pivoter \u00e0 gauche", "Pivoter \u00e0 droite", "Propulser", "Bas", "Envoyer une impulsion"];
    this.fond = "#21273b";
    this.decor = [];
    for (i = 0; i < 60; i += 1) {
        _pymeth_append.call(this.decor, ["r", (_pyfunc_op_add(_pyfunc_op_mult(i, 83), graine)) % 320, (_pyfunc_op_add(_pyfunc_op_mult(i, 47), (_pyfunc_int((graine / 4))))) % 192, ((_pyfunc_op_equals((i % 6), 0)))? (2) : (1), 1, "#888b9c"]);
    }
    this.hasard = new Hasard(graine);
    this.vies = 3;
    this.points = 0;
    this.secteur = 0;
    this.etat = 0;
    this.message = "Les plus petits rochers lib\u00e8rent des cristaux. Ramasse-en trois par secteur.";
    this.champ();
    return null;
};

Partie.prototype.champ = function () {
    var i, stub1_, stub2_, vitesse, x, y;
    this.secteur += 1;
    this.cristaux = 0;
    this.debris = [];
    this.ondes = [];
    this.roches = [];
    stub1_ = [160, 96];
    this.x = stub1_[0];this.y = stub1_[1];
    stub2_ = [0, 0];
    this.vx = stub2_[0];this.vy = stub2_[1];
    this.cap = 12;
    this.rotation = 0;
    this.recharge = 0;
    this.bouclier = 100;
    this.poussee = false;
    for (i = 0; i < 2 + this.secteur; i += 1) {
        x = ((_pyfunc_op_equals((i % 2), 0)))? (25 + this.hasard.entier(32)) : (255 + this.hasard.entier(42));
        y = 16 + this.hasard.entier(160);
        vitesse = 0.23 + (this.hasard.entier(36) / 100);
        _pymeth_append.call(this.roches, [x, y, ((_pyfunc_op_equals((i % 2), 0)))? (vitesse) : (-vitesse), (this.hasard.entier(91) - 45) / 100, 12]);
    }
    return null;
};

Partie.prototype.fendre = function (i) {
    var choix, dx, dy, rayon, roche, signe, stub3_seq, stub4_itr;
    roche = _pymeth_pop.call(this.roches, i);
    this.points += 5;
    if ((roche[4] > 4)) {
        rayon = (_pyfunc_op_equals(roche[4], 12))? (7) : (4);
        choix = this.hasard.entier(16);
        dx = (CAPS[choix][0]) / 150;
        dy = (CAPS[choix][1]) / 150;
        stub3_seq = [-1, 1];
        if ((typeof stub3_seq === "object") && (!Array.isArray(stub3_seq))) { stub3_seq = Object.keys(stub3_seq);}
        for (stub4_itr = 0; stub4_itr < stub3_seq.length; stub4_itr += 1) {
            signe = stub3_seq[stub4_itr];
            _pymeth_append.call(this.roches, ([((_pyfunc_op_add(roche[0], (_pyfunc_op_mult(_pyfunc_op_mult(signe, dx), rayon)))) + 320) % 320, ((_pyfunc_op_add(roche[1], (_pyfunc_op_mult(_pyfunc_op_mult(signe, dy), rayon)))) + 192) % 192, _pyfunc_op_add(roche[2], _pyfunc_op_mult(signe, dx)), _pyfunc_op_add(roche[3], _pyfunc_op_mult(signe, dy)), rayon]));
        }
    } else {
        _pymeth_append.call(this.debris, ([roche[0], roche[1]]));
    }
    return null;
};

Partie.prototype.avancer = function (touches, appuis) {
    var cristal, dx, dy, i, j, onde, r, roche, sens, stub10_itr, stub5_seq, stub6_itr, stub7_, stub8_, stub9_seq;
    if (_pyfunc_truthy(this.etat)) {
        return null;
    }
    this.bouclier = Math.max(0, (this.bouclier - 1));
    this.recharge = Math.max(0, (this.recharge - 1));
    this.rotation = Math.max(0, (this.rotation - 1));
    sens = _pyfunc_int(touches[1]) - _pyfunc_int(touches[0]);
    if ((_pyfunc_truthy(sens) && ((_pyfunc_op_equals(this.rotation, 0) || _pyfunc_truthy(appuis[0]) || appuis[1])))) {
        this.cap = (_pyfunc_op_add(this.cap, sens) + 16) % 16;
        this.rotation = 4;
    }
    dx = (CAPS[this.cap][0]) / 100;
    dy = (CAPS[this.cap][1]) / 100;
    this.poussee = touches[2];
    this.vx = Math.max((-2.6), (Math.min(2.6, (_pyfunc_op_add(_pyfunc_op_mult(this.vx, 0.992), ((_pyfunc_truthy(this.poussee))? (_pyfunc_op_mult(dx, 0.065)) : (0)))))));
    this.vy = Math.max((-2.6), (Math.min(2.6, (_pyfunc_op_add(_pyfunc_op_mult(this.vy, 0.992), ((_pyfunc_truthy(this.poussee))? (_pyfunc_op_mult(dy, 0.065)) : (0)))))));
    this.x = (_pyfunc_op_add(this.x, this.vx) + 320) % 320;
    this.y = (_pyfunc_op_add(this.y, this.vy) + 192) % 192;
    if (((_pyfunc_truthy(_pyfunc_truthy(touches[4]) || appuis[4])) && _pyfunc_op_equals(this.recharge, 0))) {
        _pymeth_append.call(this.ondes, [_pyfunc_op_add(this.x, _pyfunc_op_mult(dx, 8)), _pyfunc_op_add(this.y, _pyfunc_op_mult(dy, 8)), _pyfunc_op_add(this.vx, _pyfunc_op_mult(dx, 3.9)), _pyfunc_op_add(this.vy, _pyfunc_op_mult(dy, 3.9)), 49]);
        this.recharge = 12;
    }
    stub5_seq = this.roches;
    if ((typeof stub5_seq === "object") && (!Array.isArray(stub5_seq))) { stub5_seq = Object.keys(stub5_seq);}
    for (stub6_itr = 0; stub6_itr < stub5_seq.length; stub6_itr += 1) {
        roche = stub5_seq[stub6_itr];
        roche[0] = (_pyfunc_op_add(roche[0], roche[2]) + 320) % 320;
        roche[1] = (_pyfunc_op_add(roche[1], roche[3]) + 192) % 192;
    }
    for (j = this.ondes.length - 1; j > -1; j += -1) {
        onde = this.ondes[j];
        onde[0] = (_pyfunc_op_add(onde[0], onde[2]) + 320) % 320;
        onde[1] = (_pyfunc_op_add(onde[1], onde[3]) + 192) % 192;
        onde[4] -= 1;
        for (i = 0; i < this.roches.length; i += 1) {
            r = this.roches[i];
            if (_pyfunc_truthy(proche(onde[0], onde[1], r[0], r[1], r[4] + 1))) {
                this.fendre(i);
                onde[4] = 0;
                break;
            }
        }
        if (_pyfunc_op_equals(onde[4], 0)) {
            _pymeth_pop.call(this.ondes, j);
        }
    }
    for (j = this.debris.length - 1; j > -1; j += -1) {
        cristal = this.debris[j];
        if (_pyfunc_truthy(proche(this.x, this.y, cristal[0], cristal[1], 13))) {
            _pymeth_pop.call(this.debris, j);
            this.cristaux += 1;
            this.points += 25;
            if (_pyfunc_op_equals(this.cristaux, 3)) {
                if (_pyfunc_op_equals(this.secteur, 3)) {
                    this.etat = 1;
                    this.message = "La cargaison des trois carri\u00e8res est \u00e0 bord !";
                } else {
                    this.champ();
                }
                return null;
            }
        }
    }
    if (_pyfunc_op_equals(this.bouclier, 0)) {
        stub9_seq = this.roches;
        if ((typeof stub9_seq === "object") && (!Array.isArray(stub9_seq))) { stub9_seq = Object.keys(stub9_seq);}
        for (stub10_itr = 0; stub10_itr < stub9_seq.length; stub10_itr += 1) {
            r = stub9_seq[stub10_itr];
            if (_pyfunc_truthy(proche(this.x, this.y, r[0], r[1], r[4] + 5))) {
                this.vies -= 1;
                this.bouclier = 120;
                stub7_ = [160, 96];
                this.x = stub7_[0];this.y = stub7_[1];
                stub8_ = [0, 0];
                this.vx = stub8_[0];this.vy = stub8_[1];
                if (_pyfunc_op_equals(this.vies, 0)) {
                    this.etat = -1;
                    this.message = "Le prospecteur regagne la station.";
                }
                break;
            }
        }
    }
    return null;
};

Partie.prototype.dessin = function () {
    var c, couleur, dx, dy, formes, onde, r, signe, stub11_, stub12_seq, stub13_itr, stub14_seq, stub15_itr, stub16_seq, stub17_itr, stub18_, stub19_, stub20_seq, stub21_itr, t, x, y;
    formes = [];
    stub12_seq = this.roches;
    if ((typeof stub12_seq === "object") && (!Array.isArray(stub12_seq))) { stub12_seq = Object.keys(stub12_seq);}
    for (stub13_itr = 0; stub13_itr < stub12_seq.length; stub13_itr += 1) {
        r = stub12_seq[stub13_itr];
        stub11_ = [r[0], r[1], r[4]];
        x = stub11_[0];y = stub11_[1];t = stub11_[2];
        _pymeth_extend.call(formes, ([["e", x - t, y - t, _pyfunc_op_mult(t, 2), _pyfunc_op_mult(t, 2), "#907c82"], ["e", x - _pyfunc_op_mult(t, 0.65), y - _pyfunc_op_mult(t, 0.8), t, t, "#b19a95"], ["l", x - _pyfunc_op_mult(t, 0.4), _pyfunc_op_add(y, _pyfunc_op_mult(t, 0.6)), _pyfunc_op_add(x, _pyfunc_op_mult(t, 0.5)), y - _pyfunc_op_mult(t, 0.4), "#73c7b1"]]));
    }
    stub14_seq = this.debris;
    if ((typeof stub14_seq === "object") && (!Array.isArray(stub14_seq))) { stub14_seq = Object.keys(stub14_seq);}
    for (stub15_itr = 0; stub15_itr < stub14_seq.length; stub15_itr += 1) {
        c = stub14_seq[stub15_itr];
        _pymeth_extend.call(formes, ([["e", c[0] - 4, c[1] - 4, 8, 8, "#3d716e"], ["r", c[0] - 2, c[1] - 2, 4, 4, "#aaf2c9"]]));
    }
    stub16_seq = this.ondes;
    if ((typeof stub16_seq === "object") && (!Array.isArray(stub16_seq))) { stub16_seq = Object.keys(stub16_seq);}
    for (stub17_itr = 0; stub17_itr < stub16_seq.length; stub17_itr += 1) {
        onde = stub16_seq[stub17_itr];
        _pymeth_append.call(formes, (["r", onde[0] - 1, onde[1] - 1, 3, 3, "#f9d99d"]));
    }
    stub18_ = [(CAPS[this.cap][0]) / 100, (CAPS[this.cap][1]) / 100];
    dx = stub18_[0];dy = stub18_[1];
    stub19_ = [this.x, this.y];
    x = stub19_[0];y = stub19_[1];
    couleur = ((_pyfunc_op_equals(this.bouclier, 0) || (_pyfunc_op_equals(((_pyfunc_int((this.bouclier / 6))) % 2), 0))))? ("#a8cfce") : ("#dfd6a4");
    stub20_seq = [-1, 1];
    if ((typeof stub20_seq === "object") && (!Array.isArray(stub20_seq))) { stub20_seq = Object.keys(stub20_seq);}
    for (stub21_itr = 0; stub21_itr < stub20_seq.length; stub21_itr += 1) {
        signe = stub20_seq[stub21_itr];
        _pymeth_append.call(formes, ["l", _pyfunc_op_add(x, _pyfunc_op_mult(dx, 8)), _pyfunc_op_add(y, _pyfunc_op_mult(dy, 8)), _pyfunc_op_add((x - _pyfunc_op_mult(dx, 5)), (_pyfunc_op_mult(_pyfunc_op_mult(dy, 5), signe))), (y - _pyfunc_op_mult(dy, 5)) - (_pyfunc_op_mult(_pyfunc_op_mult(dx, 5), signe)), couleur]);
        _pymeth_append.call(formes, ["l", x, y, _pyfunc_op_add((x - _pyfunc_op_mult(dx, 5)), (_pyfunc_op_mult(_pyfunc_op_mult(dy, 5), signe))), (y - _pyfunc_op_mult(dy, 5)) - (_pyfunc_op_mult(_pyfunc_op_mult(dx, 5), signe)), couleur]);
    }
    _pymeth_append.call(formes, ["e", x - 2, y - 2, 4, 4, "#ded0a6"]);
    if (_pyfunc_truthy(this.poussee)) {
        _pymeth_append.call(formes, ["l", x - _pyfunc_op_mult(dx, 4), y - _pyfunc_op_mult(dy, 4), x - _pyfunc_op_mult(dx, 11), y - _pyfunc_op_mult(dy, 11), "#f39b72"]);
    }
    return formes;
};

Partie.prototype.mesures = function () {
    return [["Secteur", _pyfunc_str(this.secteur) + "/3"], ["Cristaux", _pyfunc_str(this.cristaux) + "/3"], ["Coques", this.vies], ["Score", this.points]];
};


return { Partie };
})();
