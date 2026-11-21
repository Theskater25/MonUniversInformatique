// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MinuitAuPhare = (() => {
var _pyfunc_list = function (x) {
    var r=[];
    if (typeof x==="object" && !Array.isArray(x)) {x = Object.keys(x)}
    for (var i=0; i<x.length; i++) {
        r.push(x[i]);
    }
    return r;
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
var _pymeth_count = function (x, start, stop) { // nargs: 1 2 3
    start = (start === undefined) ? 0 : start;
    stop = (stop === undefined) ? this.length : stop;
    start = Math.max(0, ((start < 0) ? this.length + start : start));
    stop = Math.min(this.length, ((stop < 0) ? this.length + stop : stop));
    if (Array.isArray(this)) {
        var count = 0;
        for (var i=0; i<this.length; i++) {
            if (_pyfunc_op_equals(this[i], x)) {count+=1;}
        } return count;
    } else if (this.constructor == String) {
        var count = 0, i = start;
        while (i >= 0 && i < stop) {
            i = this.indexOf(x, i);
            if (i < 0) break;
            count += 1;
            i += Math.max(1, x.length);
        } return count;
    } else return this.count.apply(this, arguments);
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
var _pymeth_join = function (x) { // nargs: 1
    if (this.constructor !== String) return this.join.apply(this, arguments);
    return x.join(this);  // call join on the list instead of the string.
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
var VEILLES, Veille;
"Trajet du faisceau et orientation des miroirs de Minuit au phare.";
VEILLES = [["L\u2019anse tranquille", ["##.V.", "#..*.", "P*.\\.", ".#..."]], ["La pointe du sel", [".#..#.", "P*.\\.V", "..#*..", "./..#.", "#../.\\"]], ["La fausse passe", ["#.\\*./", "....#.", "P.\\..*", ".#..#.", "#.V.*\\", ".\\..##"]], ["Le cap des quatre feux", ["#\\..*V#", "..#\\.*\\", "#..*.#.", ".*..#/.", "P..\\#..", "#/....\\"]]];
Veille = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Veille.prototype._base_class = Object;
Veille.prototype.__name__ = "Veille";

Veille.prototype.__init__ = function (numero) {
    var lignes, stub1_;
    stub1_ = VEILLES[numero];
    this.nom = stub1_[0];lignes = stub1_[1];
    this.largeur = lignes[0].length;
    this.hauteur = lignes.length;
    this.cases = _pyfunc_list(_pymeth_join.call("", lignes));
    this.depart = _pymeth_index.call(this.cases, "P");
    this.total = _pymeth_count.call(this.cases, "*");
    this.pivots = [];
    this.eclairer();
    return null;
};

Veille.prototype.eclairer = function () {
    var _, dx, dy, objet, position, stub2_, stub3_, stub4_, x, y;
    x = this.depart % this.largeur;
    y = Math.floor(this.depart/this.largeur);
    stub2_ = [1, 0];
    dx = stub2_[0];dy = stub2_[1];
    this.rayon = [[x, y]];
    this.allumees = [];
    this.issue = "mer";
    for (_ = 0; _ < _pyfunc_op_mult(_pyfunc_op_mult(4, this.largeur), this.hauteur); _ += 1) {
        x = _pyfunc_op_add(x, dx);
        y = _pyfunc_op_add(y, dy);
        if (((x < 0) || (y < 0) || (x >= this.largeur) || (y >= this.hauteur))) {
            _pymeth_append.call(this.rayon, [x - _pyfunc_op_mult(dx, 0.5), y - _pyfunc_op_mult(dy, 0.5)]);
            return null;
        }
        position = _pyfunc_op_add(_pyfunc_op_mult(y, this.largeur), x);
        objet = this.cases[position];
        if (_pyfunc_op_contains(objet, ["#", "P"])) {
            _pymeth_append.call(this.rayon, [x - _pyfunc_op_mult(dx, 0.4), y - _pyfunc_op_mult(dy, 0.4)]);
            this.issue = "obstacle";
            return null;
        }
        _pymeth_append.call(this.rayon, [x, y]);
        if (_pyfunc_op_equals(objet, "*")) {
            if ((!_pyfunc_op_contains(position, this.allumees))) {
                _pymeth_append.call(this.allumees, position);
            }
        } else if (_pyfunc_op_equals(objet, "V")) {
            this.issue = ((this.allumees.length == this.total))? ("port") : ("incomplet");
            return null;
        } else if (_pyfunc_op_equals(objet, "/")) {
            stub3_ = [-dy, -dx];
            dx = stub3_[0];dy = stub3_[1];
        } else if (_pyfunc_op_equals(objet, "\\")) {
            stub4_ = [dy, dx];
            dx = stub4_[0];dy = stub4_[1];
        }
    }
    return null;
};

Veille.prototype.retourner = function (position) {
    this.cases[position] = (_pyfunc_op_equals(this.cases[position], "/"))? ("\\") : ("/");
    this.eclairer();
    return null;
};

Veille.prototype.pivoter = function (position) {
    if ((_pyfunc_op_equals(this.issue, "port") || (!((0 <= position) && (position < this.cases.length))))) {
        return false;
    }
    if ((!_pyfunc_op_contains(this.cases[position], ["/", "\\"]))) {
        return false;
    }
    _pymeth_append.call(this.pivots, position);
    this.retourner(position);
    return true;
};

Veille.prototype.annuler = function () {
    if ((!_pyfunc_truthy(this.pivots))) {
        return false;
    }
    this.retourner(this.pivots.pop());
    return true;
};


return { Veille, niveaux: VEILLES };
})();
