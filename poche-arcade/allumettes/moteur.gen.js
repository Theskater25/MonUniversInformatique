// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurClassique = (() => {
var _pyfunc_int = function (x, base) { // nargs: 1 2
    if(base !== undefined) return parseInt(x, base);
    return x<0 ? Math.ceil(x): Math.floor(x);
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
    // La dernière allumette gagne. L'automate tente des groupes de quatre.
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    mode = (mode === undefined) ? 0: mode;
    this.reste = 17 + (graine % 3);
    this.graine = graine;
    this.tours = 0;
    this.etat = 0;
    this.points = 0;
    this.message = "Tu commences. Celui qui prend la derni\u00e8re allumette gagne.";
    return null;
};

Partie.prototype.jouer = function (prise) {
    var reponse;
    if ((!_pyfunc_op_equals(this.etat, 0))) {
        return null;
    }
    if (((prise < 1) || ((prise > Math.min(3, this.reste))) || (!_pyfunc_op_equals(prise, _pyfunc_int(prise))))) {
        this.message = ("Prends entre 1 et " + (_pyfunc_str(Math.min(3, this.reste)))) + " allumettes.";
        return null;
    }
    this.reste -= prise;
    this.tours += 1;
    if (_pyfunc_op_equals(this.reste, 0)) {
        this.etat = 1;
        this.points = 12 - this.tours;
        this.message = "La derni\u00e8re est pour toi. Gagn\u00e9 !";
        return null;
    }
    reponse = this.reste % 4;
    if (_pyfunc_op_equals(reponse, 0)) {
        this.graine = (_pyfunc_op_mult(this.graine, 9301) + 49297) % 233280;
        reponse = 1 + (this.graine % 3);
    }
    this.reste -= reponse;
    this.message = ((("Tu en prends " + _pyfunc_str(prise)) + ", l\u2019automate en prend ") + _pyfunc_str(reponse)) + ".";
    if (_pyfunc_op_equals(this.reste, 0)) {
        this.etat = -1;
        this.message += " Il prend la derni\u00e8re et gagne.";
    }
    return null;
};

Partie.prototype.mesures = function () {
    return [["Allumettes", this.reste], ["Tes tours", this.tours]];
};


return { Partie };
})();
