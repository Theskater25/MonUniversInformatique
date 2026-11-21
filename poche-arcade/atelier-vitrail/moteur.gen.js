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
var MOTIF, Partie, VERRES;
MOTIF = ["...011...", ".1223321.", "001333100", ".1223321.", "...011..."];
VERRES = ["#7accc6", "#f38c76", "#bb9bd5", "#f3ca74"];
Partie = function () {
    // Les pièces étoilées brisent aussi leurs voisines de la même couleur.
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    var signe, x, y;
    mode = (mode === undefined) ? 0: mode;
    this.nom = "Atelier vitrail";
    this.aide = "Fl\u00e8ches gauche et droite pour la barre. Espace pour lancer la bille.";
    this.boutons = [0, 4, 1];
    this.fond = "#28293d";
    this.decor = [["r", 0, 0, 5, 192, "#8c736c"], ["r", 315, 0, 5, 192, "#8c736c"], ["r", 0, 0, 320, 5, "#a88972"], ["r", 6, 164, 308, 1, "#484052"]];
    this.pieces = [];
    for (y = 0; y < MOTIF.length; y += 1) {
        for (x = 0; x < MOTIF[y].length; x += 1) {
            signe = MOTIF[y][x];
            if ((!_pyfunc_op_equals(signe, "."))) {
                _pymeth_append.call(this.pieces, [25 + _pyfunc_op_mult(30, x), 20 + _pyfunc_op_mult(14, y), _pyfunc_int(signe), _pyfunc_op_equals(((_pyfunc_op_add(x, _pyfunc_op_mult(2, y))) % 4), 0)]);
                _pymeth_append.call(this.decor, ["r", 25 + _pyfunc_op_mult(30, x), 20 + _pyfunc_op_mult(14, y), 28, 12, "#393747"]);
            }
        }
    }
    this.total = this.pieces.length;
    this.barre = 160;
    this.vies = 3;
    this.points = 0;
    this.etat = 0;
    this.service = true;
    this.x = 160;
    this.y = 165;
    this.vx = (_pyfunc_truthy(graine % 2))? (1.15) : (-1.15);
    this.vy = -1.9;
    this.message = "Vise les pi\u00e8ces \u00e9toil\u00e9es pour d\u00e9tacher les verres voisins de m\u00eame couleur.";
    return null;
};

Partie.prototype.briser = function (i) {
    var morceau, n, voisin;
    morceau = _pymeth_pop.call(this.pieces, i);
    this.points += 10;
    if (_pyfunc_truthy(morceau[3])) {
        for (n = this.pieces.length - 1; n > -1; n += -1) {
            voisin = this.pieces[n];
            if ((_pyfunc_op_equals(voisin[2], morceau[2]) && (((_pyfunc_op_add((_pyfunc_abs((voisin[0] - morceau[0]))), (_pyfunc_abs((voisin[1] - morceau[1]))))) <= 30)))) {
                _pymeth_pop.call(this.pieces, n);
                this.points += 15;
            }
        }
    }
    if ((this.pieces.length == 0)) {
        this.etat = 1;
        this.message = "Le vitrail laisse passer toute la lumi\u00e8re !";
    }
    return null;
};

Partie.prototype.avancer = function (touches, appuis) {
    var avant_x, avant_y, i, verre;
    if ((!_pyfunc_op_equals(this.etat, 0))) {
        return null;
    }
    this.barre = Math.max(28, (Math.min(292, (_pyfunc_op_add(this.barre, (_pyfunc_op_mult((_pyfunc_int(touches[1]) - _pyfunc_int(touches[0])), 3.2)))))));
    if (_pyfunc_truthy(this.service)) {
        this.x = this.barre;
        this.y = 166;
        if ((!_pyfunc_truthy(appuis[4]))) {
            return null;
        }
        this.service = false;
    }
    avant_x = this.x;
    avant_y = this.y;
    this.x = _pyfunc_op_add(this.x, this.vx);
    this.y = _pyfunc_op_add(this.y, this.vy);
    if (((this.x <= 8) || (this.x >= 312))) {
        this.x = Math.max(8, Math.min(312, this.x));
        this.vx = -this.vx;
    }
    if ((this.y <= 8)) {
        this.y = 8;
        this.vy = _pyfunc_abs(this.vy);
    }
    if (((this.vy > 0) && (avant_y <= 169) && (this.y >= 169) && (((_pyfunc_abs((this.x - this.barre))) <= 25)))) {
        this.y = 168;
        this.vx = _pyfunc_op_mult((this.x - this.barre), 0.118);
        if ((_pyfunc_abs(this.vx) < 0.38)) {
            this.vx = ((this.vx >= 0))? (0.38) : (-0.38);
        }
        this.vy = -(Math.max(1.38, (2.45 - (_pyfunc_op_mult(_pyfunc_abs(this.vx), 0.28)))));
    }
    for (i = 0; i < this.pieces.length; i += 1) {
        verre = this.pieces[i];
        if (((((((verre[0] - 3) <= this.x)) && ((this.x <= (verre[0] + 30))))) && (((((verre[1] - 3) <= this.y)) && ((this.y <= (verre[1] + 14))))))) {
            if ((((avant_y < (verre[1] - 3))) || (avant_y > (verre[1] + 14)))) {
                this.y = avant_y;
                this.vy = -this.vy;
            } else {
                this.x = avant_x;
                this.vx = -this.vx;
            }
            this.briser(i);
            break;
        }
    }
    if ((this.y > 195)) {
        this.vies -= 1;
        if (_pyfunc_op_equals(this.vies, 0)) {
            this.etat = -1;
            this.message = "La derni\u00e8re bille est tomb\u00e9e.";
        } else {
            this.service = true;
            this.vx = (_pyfunc_truthy(this.vies % 2))? (1.15) : (-1.15);
            this.vy = -1.9;
        }
    }
    return null;
};

Partie.prototype.dessin = function () {
    var formes, stub1_seq, stub2_itr, verre, x, y;
    formes = [];
    stub1_seq = this.pieces;
    if ((typeof stub1_seq === "object") && (!Array.isArray(stub1_seq))) { stub1_seq = Object.keys(stub1_seq);}
    for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
        verre = stub1_seq[stub2_itr];
        x = verre[0];
        y = verre[1];
        _pymeth_append.call(formes, ["r", x, y, 28, 12, "#5a4655"]);
        _pymeth_append.call(formes, (["r", x + 1, y + 1, 25, 9, VERRES[verre[2]]]));
        _pymeth_append.call(formes, ["r", x + 3, y + 2, 9, 1, "#ffebcb"]);
        if (_pyfunc_truthy(verre[3])) {
            _pymeth_append.call(formes, ["r", x + 18, y + 2, 2, 6, "#fff2cc"]);
            _pymeth_append.call(formes, ["r", x + 16, y + 4, 6, 2, "#fff2cc"]);
        }
    }
    _pymeth_append.call(formes, ["r", this.barre - 23, 172, 46, 7, "#b3735b"]);
    _pymeth_append.call(formes, ["r", this.barre - 21, 172, 42, 3, "#f7ca83"]);
    _pymeth_append.call(formes, ["e", this.x - 3, this.y - 3, 6, 6, "#fff2c4"]);
    return formes;
};

Partie.prototype.mesures = function () {
    return [["Verres", ((_pyfunc_str((this.total - this.pieces.length))) + " / ") + _pyfunc_str(this.total)], ["Billes", this.vies], ["Score", this.points]];
};


return { Partie };
})();
