// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const PostePolaire = (() => {
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
var _pymeth_remove = function (x) { // nargs: 1
    if (!Array.isArray(this)) return this.remove.apply(this, arguments);
    for (var i=0; i<this.length; i++) {
        if (_pyfunc_op_equals(this[i], x)) {this.splice(i, 1); return;}
    }
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
var NIVEAUX, Tournee;
"R\u00e8gles de Poste Polaire, partag\u00e9es entre Python et le navigateur.";
NIVEAUX = [({nom: "Premier courrier", objectif: 3, carte: ["S..#..", ".#...#", "..E.#.", "#.....", ".....B", "..#.#."]}), ({nom: "La passe des glaces", objectif: 6, carte: ["..#.B#.", ".....#.", "#..EE..", "#.....#", "...#.S.", "#.##..."]}), ({nom: "Le grand d\u00e9tour", objectif: 9, carte: ["..B#E..", "#....#.", "......S", "#...E..", "..##.E.", "......#", "......."]})];
Tournee = function () {
    // Une impulsion fait glisser le facteur jusqu’au prochain obstacle.
    _pyfunc_op_instantiate(this, arguments);
}
Tournee.prototype._base_class = Object;
Tournee.prototype.__name__ = "Tournee";

Tournee.prototype.__init__ = function (niveau) {
    var contenu, fiche, position, x, y;
    fiche = NIVEAUX[niveau];
    this.nom = fiche["nom"];
    this.objectif = fiche["objectif"];
    this.carte = fiche["carte"];
    this.hauteur = this.carte.length;
    this.largeur = this.carte[0].length;
    this.lettres = [];
    this.historique = [];
    this.coups = 0;
    for (y = 0; y < this.hauteur; y += 1) {
        for (x = 0; x < this.largeur; x += 1) {
            contenu = this.carte[y][x];
            position = _pyfunc_op_add(_pyfunc_op_mult(y, this.largeur), x);
            if (_pyfunc_op_equals(contenu, "S")) {
                this.position = position;
            } else if (_pyfunc_op_equals(contenu, "E")) {
                _pymeth_append.call(this.lettres, position);
            } else if (_pyfunc_op_equals(contenu, "B")) {
                this.bureau = position;
            }
        }
    }
    this.total = this.lettres.length;
    return null;
};

Tournee.prototype.distribue = function () {
    return (this.lettres.length == 0) && _pyfunc_op_equals(this.position, this.bureau);
};

Tournee.prototype.glisser = function (dx, dy) {
    var avant, depart, x, y;
    if (_pyfunc_truthy(((!_pyfunc_op_contains([dx, dy], ([[1, 0], [-1, 0], [0, 1], [0, -1]])))) || this.distribue())) {
        return false;
    }
    x = this.position % this.largeur;
    y = Math.floor(this.position/this.largeur);
    depart = this.position;
    avant = this.lettres.slice(0);
    while (((((0 <= _pyfunc_op_add(x, dx))) && ((_pyfunc_op_add(x, dx) < this.largeur)))) && ((((0 <= _pyfunc_op_add(y, dy))) && ((_pyfunc_op_add(y, dy) < this.hauteur))))) {
        if ((_pyfunc_op_equals((this.carte[_pyfunc_op_add(y, dy)][_pyfunc_op_add(x, dx)]), "#"))) {
            break;
        }
        x = _pyfunc_op_add(x, dx);
        y = _pyfunc_op_add(y, dy);
        this.position = _pyfunc_op_add(_pyfunc_op_mult(y, this.largeur), x);
        if (_pyfunc_op_contains(this.position, this.lettres)) {
            _pymeth_remove.call(this.lettres, this.position);
        }
    }
    if (_pyfunc_op_equals(this.position, depart)) {
        return false;
    }
    _pymeth_append.call(this.historique, [depart, avant]);
    this.coups += 1;
    return true;
};

Tournee.prototype.annuler = function () {
    var stub1_;
    if ((!_pyfunc_truthy(this.historique))) {
        return false;
    }
    stub1_ = this.historique.pop();
    this.position = stub1_[0];this.lettres = stub1_[1];
    this.coups -= 1;
    return true;
};


return { Tournee, niveaux: NIVEAUX };
})();
