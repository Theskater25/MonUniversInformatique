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
var Partie;
Partie = function () {
    // Un volant lumineux traverse un ponton et peut allumer sa lanterne centrale.
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var x, y;
    mode = (mode === undefined) ? 0: mode;
    this.nom = "Duel de lanternes";
    this.aide = "Fl\u00e8ches haut et bas ou Z/S pour la raquette. Marque cinq points.";
    this.boutons = [2, 3];
    this.fond = "#24263d";
    this.decor = [["r", 0, 0, 320, 8, "#63465a"], ["r", 0, 184, 320, 8, "#63465a"]];
    for (x = 4; x < 320; x += 16) {
        _pymeth_append.call(this.decor, ["r", x, 3, 8, 2, "#d7a278"]);
        _pymeth_append.call(this.decor, ["r", x, 187, 8, 2, "#d7a278"]);
    }
    for (y = 12; y < 184; y += 12) {
        _pymeth_append.call(this.decor, ["r", 159, y, 2, 5, "#55485c"]);
    }
    this.y = 96;
    this.ia = 96;
    this.toi = 0;
    this.adverse = 0;
    this.renvois = 0;
    this.feux = 0;
    this.points = 0;
    this.ticks = graine % 300;
    this.etat = 0;
    this.message = "Fais passer le volant dans la lanterne pour l\u2019allumer.";
    this.service(1);
    return null;
};

Partie.prototype.service = function (sens) {
    this.x = 160;
    this.balle_y = 96;
    this.vx = _pyfunc_op_mult(1.65, sens);
    this.vy = (_pyfunc_truthy((_pyfunc_op_add(_pyfunc_op_add(this.toi, this.adverse), this.ticks)) % 2))? (0.9) : (-0.9);
    this.delai = 42;
    this.allumee = false;
    this.lanterne = 34 + ((_pyfunc_op_add(_pyfunc_op_mult(this.ticks, 7), _pyfunc_op_mult(this.toi, 13))) % 120);
    return null;
};

Partie.prototype.avancer = function (touches, appuis) {
    var avant, cible, marque;
    if ((!_pyfunc_op_equals(this.etat, 0))) {
        return null;
    }
    this.ticks += 1;
    this.y = Math.max(24, (Math.min(168, (_pyfunc_op_add(this.y, (_pyfunc_op_mult((_pyfunc_int(touches[3]) - _pyfunc_int(touches[2])), 2.8)))))));
    cible = 96;
    if ((this.vx > 0)) {
        cible = (_pyfunc_op_add(this.balle_y, (_pyfunc_op_mult((_pyfunc_abs(((this.ticks % 80) - 40))), 0.34)))) - 6;
    }
    this.ia = Math.max(24, (Math.min(168, (_pyfunc_op_add(this.ia, (Math.max((-1.22), (Math.min(1.22, (cible - this.ia))))))))));
    if ((this.delai > 0)) {
        this.delai -= 1;
        return null;
    }
    avant = this.x;
    this.x = _pyfunc_op_add(this.x, this.vx);
    this.balle_y = _pyfunc_op_add(this.balle_y, this.vy);
    if (((this.balle_y <= 11) || (this.balle_y >= 181))) {
        this.balle_y = Math.max(11, Math.min(181, this.balle_y));
        this.vy = -this.vy;
    }
    if ((((!_pyfunc_truthy(this.allumee))) && (((_pyfunc_op_mult((avant - 160), (this.x - 160))) <= 0)) && (((_pyfunc_abs((this.balle_y - this.lanterne))) < 12)))) {
        this.allumee = true;
        this.feux += 1;
    }
    if (((this.vx < 0) && (avant >= 22) && (this.x <= 22) && (((_pyfunc_abs((this.balle_y - this.y))) <= 19)))) {
        this.x = 22;
        this.vx = Math.min(3.9, ((-this.vx) + 0.18));
        this.vy = _pyfunc_op_mult((this.balle_y - this.y), 0.16);
        this.renvois += 1;
    } else if (((this.vx > 0) && (avant <= 298) && (this.x >= 298) && (((_pyfunc_abs((this.balle_y - this.ia))) <= 19)))) {
        this.x = 298;
        this.vx = -(Math.min(3.9, (this.vx + 0.18)));
        this.vy = _pyfunc_op_mult((this.balle_y - this.ia), 0.16);
    }
    if ((((this.x < (-5))) || (this.x > 325))) {
        marque = this.x > 325;
        if (_pyfunc_truthy(marque)) {
            this.toi += 1;
        } else {
            this.adverse += 1;
        }
        if ((_pyfunc_op_equals(this.toi, 5) || _pyfunc_op_equals(this.adverse, 5))) {
            this.etat = (_pyfunc_op_equals(this.toi, 5))? (1) : (-1);
            this.message = (_pyfunc_op_equals(this.etat, 1))? ("Le ponton est \u00e0 toi !") : ("L\u2019autre rive remporte le match.");
        } else {
            this.service((_pyfunc_truthy(marque))? (-1) : (1));
        }
    }
    this.points = _pyfunc_op_add((_pyfunc_op_add(_pyfunc_op_mult(this.toi, 100), this.renvois)), _pyfunc_op_mult(this.feux, 10));
    return null;
};

Partie.prototype.dessin = function () {
    var formes, lueur, stub1_seq, stub2_itr, stub3_tgt, teinte, x, y;
    lueur = (_pyfunc_truthy(this.allumee))? ("#ffca69") : ("#99775c");
    formes = [["r", 156, this.lanterne - 10, 8, 2, lueur], ["r", 154, this.lanterne - 7, 2, 14, lueur], ["r", 164, this.lanterne - 7, 2, 14, lueur], ["r", 156, this.lanterne + 8, 8, 2, lueur]];
    stub1_seq = [[12, this.y, "#7bd1b8"], [301, this.ia, "#f18e78"]];
    if ((typeof stub1_seq === "object") && (!Array.isArray(stub1_seq))) { stub1_seq = Object.keys(stub1_seq);}
    for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
        stub3_tgt = stub1_seq[stub2_itr];
        x = stub3_tgt[0]; y = stub3_tgt[1]; teinte = stub3_tgt[2];
        _pymeth_append.call(formes, ["r", x, y - 16, 7, 32, "#514454"]);
        _pymeth_append.call(formes, ["r", x + 1, y - 15, 5, 28, teinte]);
        _pymeth_append.call(formes, ["r", x + 2, y - 11, 2, 6, "#fff1bd"]);
    }
    _pymeth_append.call(formes, ["e", this.x - 5, this.balle_y - 5, 10, 10, "#ad735c"]);
    _pymeth_append.call(formes, ["e", this.x - 3, this.balle_y - 3, 6, 6, "#fff2ac"]);
    return formes;
};

Partie.prototype.mesures = function () {
    return [["Toi", this.toi], ["Autre rive", this.adverse], ["Lanternes", this.feux]];
};


return { Partie };
})();
