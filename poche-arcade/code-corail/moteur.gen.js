// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurPlateau = (() => {
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
var Partie;
"D\u00e9duction d'un code avec comptage exact des symboles r\u00e9p\u00e9t\u00e9s.";
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (niveau, graine) {
    var _;
    graine = (graine === undefined) ? 0: graine;
    this.palette = 4 + niveau;
    this.limite = [7, 7, 8][niveau];
    this.secret = [];
    for (_ = 0; _ < 3; _ += 1) {
        graine = (_pyfunc_op_mult(graine, 9301) + 49297) % 233280;
        _pymeth_append.call(this.secret, (Math.floor(_pyfunc_op_mult(graine, this.palette)/233280)));
    }
    this.ligne = [];
    this.essais = [];
    this.coups = 0;
    this.etat = "jeu";
    this.message = "Compose une proposition de trois coquillages.";
    return null;
};

Partie.prototype.jouer = function (action, valeur) {
    var ailleurs, exacts, i, proposes, restants, stub1_seq, stub2_itr, symbole;
    if ((!_pyfunc_op_equals(this.etat, "jeu"))) {
        return null;
    }
    if ((_pyfunc_op_equals(action, "choisir") && (this.ligne.length < 3))) {
        _pymeth_append.call(this.ligne, valeur);
    } else if ((_pyfunc_op_equals(action, "effacer") && _pyfunc_truthy(this.ligne))) {
        this.ligne.pop();
    } else if ((_pyfunc_op_equals(action, "valider") && (this.ligne.length == 3))) {
        exacts = 0;
        restants = [];
        proposes = [];
        for (i = 0; i < 3; i += 1) {
            if (_pyfunc_op_equals(this.ligne[i], this.secret[i])) {
                exacts += 1;
            } else {
                _pymeth_append.call(restants, this.secret[i]);
                _pymeth_append.call(proposes, this.ligne[i]);
            }
        }
        ailleurs = 0;
        stub1_seq = proposes;
        if ((typeof stub1_seq === "object") && (!Array.isArray(stub1_seq))) { stub1_seq = Object.keys(stub1_seq);}
        for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
            symbole = stub1_seq[stub2_itr];
            if (_pyfunc_op_contains(symbole, restants)) {
                ailleurs += 1;
                _pymeth_remove.call(restants, symbole);
            }
        }
        _pymeth_append.call(this.essais, [this.ligne.slice(0), exacts, ailleurs]);
        this.ligne = [];
        this.coups += 1;
        if (_pyfunc_op_equals(exacts, 3)) {
            this.etat = "gagne";
            this.message = "Le coffre de la crique s\u2019ouvre !";
        } else if ((this.coups >= this.limite)) {
            this.etat = "perdu";
            this.message = "Plus d\u2019essais. La combinaison est r\u00e9v\u00e9l\u00e9e.";
        } else {
            this.message = ((_pyfunc_str(exacts) + " bien plac\u00e9(s), ") + _pyfunc_str(ailleurs)) + " ailleurs.";
        }
    }
    return null;
};


return { Partie };
})();
