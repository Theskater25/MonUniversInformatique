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
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var x, y;
    mode = (mode === undefined) ? 0: mode;
    this.nom = "Coursier des toits";
    this.aide = "Haut ou Espace pour sauter. Maintiens Bas pour te glisser sous le linge.";
    this.boutons = [2, 3];
    this.raccourcis = [4];
    this.libelles = ["Gauche", "Droite", "Sauter", "Se baisser", "Sauter"];
    this.fond = "#41485f";
    this.decor = [["e", 236, 19, 29, 29, "#efc895"], ["r", 0, 112, 320, 60, "#8e747d"]];
    for (x = 0; x < 320; x += 16) {
        y = 111 - (_pyfunc_op_mult(x, 7) % 33);
        _pymeth_extend.call(this.decor, ([["r", x, y, 15, 157 - y, "#626479"], ["r", x + 3, y + 6, 3, 5, "#d4ad80"]]));
    }
    this.hasard = new Hasard(graine);
    this.pied = 155;
    this.vy = 0;
    this.bas = false;
    this.age = 0;
    this.distance = 0;
    this.franchis = 0;
    this.courrier = 0;
    this.points = 0;
    this.etat = 0;
    this.obstacles = [[215, 0, true], [354, 1, true]];
    this.message = "Saute les chemin\u00e9es, glisse sous les draps et attrape les enveloppes.";
    return null;
};

Partie.prototype.avancer = function (touches, appuis) {
    var largeur, nature, obj, stub1_, stub2_seq, stub3_itr, tete, touche, vitesse, x;
    if (_pyfunc_truthy(this.etat)) {
        return null;
    }
    this.age += 1;
    vitesse = Math.min(3.1, (1.65 + _pyfunc_op_mult(this.franchis, 0.035)));
    this.distance = _pyfunc_op_add(this.distance, vitesse);
    if (((_pyfunc_truthy(_pyfunc_truthy(appuis[2]) || appuis[4])) && (this.pied >= 155))) {
        this.vy = -4.95;
    }
    this.vy += 0.23;
    this.pied = _pyfunc_op_add(this.pied, this.vy);
    if ((this.pied >= 155)) {
        this.pied = 155;
        this.vy = 0;
    }
    this.bas = _pyfunc_truthy(touches[3]) && _pyfunc_op_equals(this.pied, 155);
    tete = this.pied - ((_pyfunc_truthy(this.bas))? (9) : (21));
    stub2_seq = this.obstacles;
    if ((typeof stub2_seq === "object") && (!Array.isArray(stub2_seq))) { stub2_seq = Object.keys(stub2_seq);}
    for (stub3_itr = 0; stub3_itr < stub2_seq.length; stub3_itr += 1) {
        obj = stub2_seq[stub3_itr];
        obj[0] -= vitesse;
        stub1_ = [obj[0], obj[1]];
        x = stub1_[0];nature = stub1_[1];
        largeur = (_pyfunc_op_equals(nature, 0))? (15) : (24);
        if (((x < 60) && ((_pyfunc_op_add(x, largeur) > 48)))) {
            touche = (_pyfunc_op_equals(nature, 0))? (this.pied > 136) : ((tete < 141) && (this.pied > 78));
            if (_pyfunc_truthy(touche)) {
                this.etat = -1;
                this.message = ("Fin de la tourn\u00e9e apr\u00e8s " + _pyfunc_str(this.franchis)) + " obstacle(s).";
                return null;
            }
        }
        if ((_pyfunc_truthy(obj[2]) && (((_pyfunc_abs((x - 54))) < 10)) && (((_pyfunc_abs(((this.pied - 10) - ((_pyfunc_op_equals(nature, 0))? (101) : (145))))) <= 9)))) {
            this.courrier += 1;
            obj[2] = false;
        }
        if (((obj.length == 3) && ((_pyfunc_op_add(x, largeur) < 47)))) {
            this.franchis += 1;
            _pymeth_append.call(obj, true);
        }
    }
    if (((this.obstacles[0][0]) < (-35))) {
        _pymeth_pop.call(this.obstacles, 0);
    }
    if (((this.obstacles[this.obstacles.length -1][0]) < 203)) {
        x = (((this.obstacles[this.obstacles.length -1][0]) + 72) + _pyfunc_op_mult(vitesse, 32)) + this.hasard.entier(40);
        _pymeth_append.call(this.obstacles, [x, this.hasard.entier(2), true]);
    }
    this.points = _pyfunc_op_add((_pyfunc_int((this.distance / 10))), _pyfunc_op_mult(10, this.courrier));
    return null;
};

Partie.prototype.dessin = function () {
    var formes, i, objet, stub4_seq, stub5_itr, stub6_seq, stub7_itr, x, y;
    formes = [["r", 0, 155, 320, 37, "#975e59"], ["r", 0, 155, 320, 4, "#e5aa78"]];
    for (i = 0; i < 16; i += 1) {
        x = _pyfunc_op_mult(i, 24) - (_pyfunc_int(this.distance) % 24);
        _pymeth_append.call(formes, ["l", x, 161, x - 8, 181, "#734f54"]);
        _pymeth_append.call(formes, ["r", x - 4, 174, 19, 2, "#b77865"]);
    }
    stub4_seq = this.obstacles;
    if ((typeof stub4_seq === "object") && (!Array.isArray(stub4_seq))) { stub4_seq = Object.keys(stub4_seq);}
    for (stub5_itr = 0; stub5_itr < stub4_seq.length; stub5_itr += 1) {
        objet = stub4_seq[stub5_itr];
        x = objet[0];
        if (_pyfunc_op_equals(objet[1], 0)) {
            _pymeth_extend.call(formes, ([["r", x + 2, 135, 11, 20, "#a86e5e"], ["r", x, 132, 15, 6, "#e4ae7e"], ["r", x + 4, 142, 7, 2, "#76545b"]]));
        } else {
            _pymeth_extend.call(formes, ([["l", x - 8, 80, x + 34, 86, "#403b4c"], ["r", x, 85, 24, 55, "#e9c6a9"], ["r", x + 3, 90, 2, 43, "#d0a8a0"], ["r", x + 18, 88, 2, 48, "#d0a8a0"]]));
        }
        if (_pyfunc_truthy(objet[2])) {
            y = (_pyfunc_op_equals(objet[1], 0))? (101) : (145);
            _pymeth_extend.call(formes, ([["r", x + 3, y - 3, 7, 5, "#f7dfa1"], ["r", x + 5, y - 1, 3, 1, "#bd855d"]]));
        }
    }
    y = this.pied - ((_pyfunc_truthy(this.bas))? (9) : (17));
    _pymeth_extend.call(formes, ([["r", 45, y + 3, 14, 6, "#292c3c"], ["r", 55, y - 1, 8, 8, "#393747"], ["r", 56, y - 4, 2, 4, "#393747"], ["r", 61, y - 4, 2, 4, "#393747"], ["r", 60, y + 1, 2, 2, "#ffda8b"], ["r", 53, y + 5, 7, 2, "#ec8c6c"], ["l", 45, y + 5, 40, y, "#393747"]]));
    stub6_seq = [46, 55];
    if ((typeof stub6_seq === "object") && (!Array.isArray(stub6_seq))) { stub6_seq = Object.keys(stub6_seq);}
    for (stub7_itr = 0; stub7_itr < stub6_seq.length; stub7_itr += 1) {
        x = stub6_seq[stub7_itr];
        _pymeth_append.call(formes, ["r", _pyfunc_op_add(x, ((_pyfunc_int((this.age / 6))) % 2)), y + 8, 3, Math.max(2, ((this.pied - y) - 8)), "#292c3c"]);
    }
    return formes;
};

Partie.prototype.mesures = function () {
    return [["Toits", this.franchis], ["Lettres", this.courrier], ["Score", this.points]];
};


return { Partie };
})();
