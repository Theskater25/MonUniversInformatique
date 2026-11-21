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
var Partie, triangle;
triangle = function flx_triangle (t, periode) {
    var phase;
    phase = t % periode;
    return 1 - (_pyfunc_op_mult(4, (_pyfunc_abs(((phase / periode) - 0.5)))));
};

Partie = function () {
    // Trois nuées de lucioles cosmiques à disperser avec du pollen.
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var i, x, y;
    mode = (mode === undefined) ? 0: mode;
    this.nom = "Veille de Saturne";
    this.aide = "Fl\u00e8ches gauche et droite pour piloter. Maintiens Espace pour envoyer le pollen.";
    this.boutons = [0, 4, 1];
    this.fond = "#20263c";
    this.decor = [["e", 235, 13, 30, 30, "#705963"], ["r", 229, 30, 43, 2, "#aa8872"]];
    for (i = 0; i < 55; i += 1) {
        x = (_pyfunc_op_add(graine, _pyfunc_op_mult(i, 73))) % 320;
        y = (_pyfunc_op_add((graine % 47), _pyfunc_op_mult(i, 37))) % 190;
        _pymeth_append.call(this.decor, ["r", x, y, ((_pyfunc_op_equals((i % 4), 0)))? (2) : (1), 1, "#827e91"]);
    }
    this.x = 160;
    this.vies = 3;
    this.points = 0;
    this.vague = 0;
    this.etat = 0;
    this.invincible = 0;
    this.recharge = 0;
    this.graine = graine;
    this.message = "Disperse les trois nu\u00e9es au pollen. \u00c9vite les gouttes ambr\u00e9es.";
    this.nuee();
    return null;
};

Partie.prototype.nuee = function () {
    var col, i, rang;
    this.vague += 1;
    this.age = 0;
    this.ennemis = [];
    this.pollens = [];
    this.gouttes = [];
    this.prochaine = 95;
    for (i = 0; i < 5 + _pyfunc_op_mult(this.vague, 2); i += 1) {
        col = i % 5;
        rang = _pyfunc_int((i / 5));
        _pymeth_append.call(this.ennemis, [(48 + _pyfunc_op_mult(col, 54)) + _pyfunc_op_mult(rang, 6), 27 + _pyfunc_op_mult(rang, 24), i]);
    }
    return null;
};

Partie.prototype.position = function (insecte) {
    var phase, x, y;
    phase = _pyfunc_op_add(this.age, (_pyfunc_op_mult(insecte[2], (7 + _pyfunc_op_mult(this.vague, 3)))));
    x = _pyfunc_op_add(insecte[0], (_pyfunc_op_mult((triangle(phase, 125 + _pyfunc_op_mult(8, this.vague))), (15 + _pyfunc_op_mult(this.vague, 3)))));
    y = _pyfunc_op_add((_pyfunc_op_add(insecte[1], (_pyfunc_op_mult(triangle(phase, 95), (4 + this.vague))))), (Math.min(70, _pyfunc_op_mult(this.age, 0.023))));
    return [x, y];
};

Partie.prototype.avancer = function (touches, appuis) {
    var derive, goutte, i, insecte, k, pollen, pos, touche;
    if ((!_pyfunc_op_equals(this.etat, 0))) {
        return null;
    }
    this.age += 1;
    this.x = Math.max(11, (Math.min(309, (_pyfunc_op_add(this.x, (_pyfunc_op_mult((_pyfunc_int(touches[1]) - _pyfunc_int(touches[0])), 2.65)))))));
    this.invincible = Math.max(0, (this.invincible - 1));
    this.recharge = Math.max(0, (this.recharge - 1));
    if (((_pyfunc_truthy(_pyfunc_truthy(touches[4]) || appuis[4])) && _pyfunc_op_equals(this.recharge, 0))) {
        _pymeth_append.call(this.pollens, [this.x, 167]);
        this.recharge = 12;
    }
    for (k = this.pollens.length - 1; k > -1; k += -1) {
        pollen = this.pollens[k];
        pollen[1] -= 3.6;
        touche = false;
        for (i = this.ennemis.length - 1; i > -1; i += -1) {
            pos = this.position(this.ennemis[i]);
            if (((((_pyfunc_abs((pollen[0] - pos[0]))) <= 8)) && (((_pyfunc_abs((pollen[1] - pos[1]))) <= 7)))) {
                _pymeth_pop.call(this.ennemis, i);
                this.points = _pyfunc_op_add(this.points, _pyfunc_op_mult(10, this.vague));
                touche = true;
                break;
            }
        }
        if ((_pyfunc_truthy(touche) || (pollen[1] < 0))) {
            _pymeth_pop.call(this.pollens, k);
        }
    }
    if ((this.ennemis.length == 0)) {
        if (_pyfunc_op_equals(this.vague, 3)) {
            this.etat = 1;
            this.message = "Les trois nu\u00e9es ont retrouv\u00e9 les jardins de Saturne !";
        } else {
            this.nuee();
        }
        return null;
    }
    this.prochaine -= 1;
    if ((this.prochaine <= 0)) {
        this.graine = (_pyfunc_op_mult(this.graine, 9301) + 49297) % 233280;
        insecte = this.ennemis[_pyfunc_int((_pyfunc_op_mult(this.graine, this.ennemis.length) / 233280))];
        pos = this.position(insecte);
        derive = Math.max((-0.65), (Math.min(0.65, ((this.x - pos[0]) / 125))));
        _pymeth_append.call(this.gouttes, ([pos[0], pos[1] + 6, derive]));
        this.prochaine = 65 - _pyfunc_op_mult(9, this.vague);
    }
    for (k = this.gouttes.length - 1; k > -1; k += -1) {
        goutte = this.gouttes[k];
        goutte[0] = _pyfunc_op_add(goutte[0], goutte[2]);
        goutte[1] = _pyfunc_op_add(goutte[1], 1.05 + _pyfunc_op_mult(this.vague, 0.24));
        if (((((_pyfunc_abs((goutte[0] - this.x))) <= 8)) && (((_pyfunc_abs((goutte[1] - 177))) <= 7)))) {
            _pymeth_pop.call(this.gouttes, k);
            if (_pyfunc_op_equals(this.invincible, 0)) {
                this.vies -= 1;
                this.invincible = 85;
                if (_pyfunc_op_equals(this.vies, 0)) {
                    this.etat = -1;
                    this.message = "Le jardinier rentre \u00e0 la serre.";
                    return null;
                }
            }
        } else if ((goutte[1] > 193)) {
            _pymeth_pop.call(this.gouttes, k);
        }
    }
    return null;
};

Partie.prototype.dessin = function () {
    var aile, battement, formes, goutte, insecte, pollen, pos, stub1_seq, stub2_itr, stub3_seq, stub4_itr, stub5_seq, stub6_itr, x, y;
    formes = [];
    stub1_seq = this.ennemis;
    if ((typeof stub1_seq === "object") && (!Array.isArray(stub1_seq))) { stub1_seq = Object.keys(stub1_seq);}
    for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
        insecte = stub1_seq[stub2_itr];
        pos = this.position(insecte);
        x = pos[0];
        y = pos[1];
        aile = ((_pyfunc_op_equals((insecte[2] % 2), 0)))? ("#c8a9db") : ("#75c5b5");
        battement = ((_pyfunc_op_equals(((_pyfunc_op_add((_pyfunc_int((this.age / 8))), insecte[2])) % 2), 0)))? (2) : (0);
        _pymeth_append.call(formes, ["e", x - 8, (y - 4) - battement, 7, 6, aile]);
        _pymeth_append.call(formes, ["e", x + 1, (y - 4) - battement, 7, 6, aile]);
        _pymeth_append.call(formes, ["r", x - 2, y - 3, 4, 8, "#ebc575"]);
        _pymeth_append.call(formes, ["r", x - 1, y + 2, 2, 3, "#fff1bd"]);
    }
    stub3_seq = this.pollens;
    if ((typeof stub3_seq === "object") && (!Array.isArray(stub3_seq))) { stub3_seq = Object.keys(stub3_seq);}
    for (stub4_itr = 0; stub4_itr < stub3_seq.length; stub4_itr += 1) {
        pollen = stub3_seq[stub4_itr];
        _pymeth_append.call(formes, (["r", pollen[0] - 1, pollen[1] - 3, 3, 6, "#a6f1c0"]));
    }
    stub5_seq = this.gouttes;
    if ((typeof stub5_seq === "object") && (!Array.isArray(stub5_seq))) { stub5_seq = Object.keys(stub5_seq);}
    for (stub6_itr = 0; stub6_itr < stub5_seq.length; stub6_itr += 1) {
        goutte = stub5_seq[stub6_itr];
        _pymeth_append.call(formes, (["e", goutte[0] - 2, goutte[1] - 3, 5, 7, "#ff9d67"]));
    }
    if ((_pyfunc_op_equals(this.invincible, 0) || (_pyfunc_op_equals(((_pyfunc_int((this.invincible / 6))) % 2), 0)))) {
        _pymeth_append.call(formes, ["r", this.x - 10, 177, 20, 5, "#e29c6e"]);
        _pymeth_append.call(formes, ["r", this.x - 5, 174, 10, 10, "#ad7b66"]);
        _pymeth_append.call(formes, ["e", this.x - 4, 168, 8, 10, "#a1d9bf"]);
        _pymeth_append.call(formes, ["r", this.x - 1, 166, 2, 6, "#d4e4a4"]);
    }
    return formes;
};

Partie.prototype.mesures = function () {
    return [["Nu\u00e9e", _pyfunc_str(this.vague) + " / 3"], ["Coques", this.vies], ["Score", this.points]];
};


return { Partie };
})();
