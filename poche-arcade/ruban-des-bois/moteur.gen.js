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
var _pymeth_insert = function (i, x) { // nargs: 2
    if (!Array.isArray(this)) return this.insert.apply(this, arguments);
    i = (i < 0) ? this.length + i : i;
    this.splice(i, 0, x);
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
var DIRECTIONS, OPPOSEES, Partie;
DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
OPPOSEES = [1, 0, 3, 2];
Partie = function () {
    // Un serpent de lianes récolte douze baies dans un sous-bois.
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var x, y;
    mode = (mode === undefined) ? 0: mode;
    this.nom = "Ruban des bois";
    this.aide = "Fl\u00e8ches ou ZQSD pour tourner. R\u00e9colte douze baies.";
    this.boutons = [0, 2, 3, 1];
    this.fond = "#162e30";
    this.decor = [["r", 13, 5, 294, 182, "#9d8457"], ["r", 16, 8, 288, 176, "#264641"]];
    for (y = 0; y < 11; y += 1) {
        for (x = 0; x < 18; x += 1) {
            if ((_pyfunc_op_equals((_pyfunc_op_add(x, y) % 2), 0))) {
                _pymeth_append.call(this.decor, ["r", 16 + _pyfunc_op_mult(16, x), 8 + _pyfunc_op_mult(16, y), 16, 16, "#2c4b43"]);
            }
            if ((_pyfunc_op_equals(((_pyfunc_op_add(_pyfunc_op_mult(x, 7), _pyfunc_op_mult(y, 5))) % 13), 0))) {
                _pymeth_append.call(this.decor, ["r", 18 + _pyfunc_op_mult(16, x), 10 + _pyfunc_op_mult(16, y), 2, 3, "#44634a"]);
            }
        }
    }
    this.graine = graine;
    this.corps = [[5, 5], [4, 5], [3, 5]];
    this.direction = 1;
    this.virages = [];
    this.attente = 14;
    this.recolte = 0;
    this.points = 0;
    this.etat = 0;
    this.message = "Les baies dor\u00e9es comptent triple.";
    this.semer();
    return null;
};

Partie.prototype.semer = function () {
    var libres, x, y;
    libres = [];
    for (y = 0; y < 11; y += 1) {
        for (x = 0; x < 18; x += 1) {
            if ((!_pyfunc_op_contains([x, y], this.corps))) {
                _pymeth_append.call(libres, [x, y]);
            }
        }
    }
    this.graine = (_pyfunc_op_mult(this.graine, 9301) + 49297) % 233280;
    this.baie = libres[_pyfunc_int((_pyfunc_op_mult(this.graine, libres.length) / 233280))];
    return null;
};

Partie.prototype.avancer = function (touches, appuis) {
    var avant, i, mange, obstacle, tete, vecteur;
    if ((!_pyfunc_op_equals(this.etat, 0))) {
        return null;
    }
    for (i = 0; i < 4; i += 1) {
        if ((_pyfunc_truthy(appuis[i]) && (this.virages.length < 2))) {
            avant = ((this.virages.length > 0))? (this.virages[this.virages.length -1]) : (this.direction);
            if ((((!_pyfunc_op_equals(i, avant))) && ((!_pyfunc_op_equals(i, OPPOSEES[avant]))))) {
                _pymeth_append.call(this.virages, i);
            }
        }
    }
    this.attente -= 1;
    if ((this.attente > 0)) {
        return null;
    }
    this.attente = Math.max(7, (14 - (_pyfunc_int((this.recolte / 2)))));
    if ((this.virages.length > 0)) {
        this.direction = _pymeth_pop.call(this.virages, 0);
    }
    vecteur = DIRECTIONS[this.direction];
    tete = [_pyfunc_op_add((this.corps[0][0]), vecteur[0]), _pyfunc_op_add((this.corps[0][1]), vecteur[1])];
    mange = _pyfunc_op_equals(tete, this.baie);
    obstacle = (_pyfunc_truthy(mange))? (this.corps) : (this.corps.slice(0,-1));
    if (((tete[0] < 0) || (tete[0] >= 18) || (tete[1] < 0) || (tete[1] >= 11) || _pyfunc_op_contains(tete, obstacle))) {
        this.etat = -1;
        this.message = ("Le ruban s\u2019est emm\u00eal\u00e9. R\u00e9colte : " + _pyfunc_str(this.recolte)) + " / 12.";
        return null;
    }
    _pymeth_insert.call(this.corps, 0, tete);
    if (_pyfunc_truthy(mange)) {
        this.recolte += 1;
        this.points = _pyfunc_op_add(this.points, ((_pyfunc_op_equals((this.recolte % 4), 0)))? (30) : (10));
        if (_pyfunc_op_equals(this.recolte, 12)) {
            this.etat = 1;
            this.message = "Les douze baies sont au panier !";
        } else {
            this.semer();
        }
    } else {
        this.corps.pop();
    }
    return null;
};

Partie.prototype.dessin = function () {
    var couleur, dx, dy, ecart, formes, i, segment, stub1_seq, stub2_itr, teinte, x, y;
    x = 16 + _pyfunc_op_mult(this.baie[0], 16);
    y = 8 + _pyfunc_op_mult(this.baie[1], 16);
    teinte = ((_pyfunc_op_equals((this.recolte % 4), 3)))? ("#ffca62") : ("#f87870");
    formes = [["e", x + 3, y + 5, 10, 9, teinte], ["r", x + 7, y + 3, 5, 3, "#a9cf77"], ["r", x + 5, y + 7, 2, 2, "#fff0ba"]];
    for (i = this.corps.length - 1; i > -1; i += -1) {
        segment = this.corps[i];
        x = 16 + _pyfunc_op_mult(segment[0], 16);
        y = 8 + _pyfunc_op_mult(segment[1], 16);
        couleur = (_pyfunc_op_equals(i, 0))? ("#d6df83") : ("#75b87a");
        _pymeth_append.call(formes, ["r", x + 1, y + 1, 14, 14, "#153a37"]);
        _pymeth_append.call(formes, ["r", x + 2, y + 2, 12, 11, couleur]);
        _pymeth_append.call(formes, ["r", x + 4, y + 3, 6, 2, "#c8dd95"]);
        if (_pyfunc_op_equals(i, 0)) {
            dx = DIRECTIONS[this.direction][0];
            dy = DIRECTIONS[this.direction][1];
            stub1_seq = [-3, 3];
            if ((typeof stub1_seq === "object") && (!Array.isArray(stub1_seq))) { stub1_seq = Object.keys(stub1_seq);}
            for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
                ecart = stub1_seq[stub2_itr];
                _pymeth_append.call(formes, ["r", ((x + 7) + _pyfunc_op_mult(dx, 4)) + _pyfunc_op_mult(dy, ecart), ((y + 7) + _pyfunc_op_mult(dy, 4)) + _pyfunc_op_mult(dx, ecart), 2, 2, "#233a37"]);
            }
        }
    }
    return formes;
};

Partie.prototype.mesures = function () {
    return [["Baies", _pyfunc_str(this.recolte) + " / 12"], ["Score", this.points]];
};


return { Partie };
})();
