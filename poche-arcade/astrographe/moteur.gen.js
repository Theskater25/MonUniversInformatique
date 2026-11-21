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
var CROQUIS, Partie;
"Tracer un graphe sans emprunter deux fois la m\u00eame ar\u00eate.";
CROQUIS = [[3, [6, 4, 2, 0, 4, 8]], [4, [0, 5, 2, 7, 10, 5, 8, 13, 10, 15]], [4, [0, 1, 6, 3, 2, 6, 10, 15, 14, 9, 10, 5, 1, 4, 9, 12]]];
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (niveau, graine) {
    var i, stub1_, trace;
    graine = (graine === undefined) ? 0: graine;
    stub1_ = CROQUIS[niveau];
    this.largeur = stub1_[0];trace = stub1_[1];
    this.etoiles = [];
    this.traits = [];
    for (i = 0; i < trace.length; i += 1) {
        if ((!_pyfunc_op_contains(trace[i], this.etoiles))) {
            _pymeth_append.call(this.etoiles, trace[i]);
        }
        if (_pyfunc_truthy(i)) {
            _pymeth_append.call(this.traits, ([trace[i - 1], trace[i]]));
        }
    }
    this.faits = [];
    this.chemin = [];
    this.coups = 1;
    this.etat = "jeu";
    this.message = "Une \u00e9toile avec un nombre impair de traits est un bon d\u00e9part.";
    return null;
};

Partie.prototype.jouer = function (action, valeur) {
    var a, b, i, origine, stub2_;
    if ((!_pyfunc_op_equals(this.etat, "jeu"))) {
        return null;
    }
    if ((_pyfunc_op_equals(action, "annuler") && _pyfunc_truthy(this.chemin))) {
        this.chemin.pop();
        if (_pyfunc_truthy(this.faits)) {
            this.faits.pop();
        }
        this.coups += 1;
        this.message = "Choisis une autre branche.";
        return null;
    }
    if ((((!_pyfunc_op_equals(action, "case"))) || (!_pyfunc_op_contains(valeur, this.etoiles)))) {
        return null;
    }
    if ((!_pyfunc_truthy(this.chemin))) {
        _pymeth_append.call(this.chemin, valeur);
        this.message = "Suis un trait vers une autre \u00e9toile.";
        return null;
    }
    origine = this.chemin[this.chemin.length -1];
    for (i = 0; i < this.traits.length; i += 1) {
        stub2_ = this.traits[i];
        a = stub2_[0];b = stub2_[1];
        if ((((((_pyfunc_op_equals(a, origine) && _pyfunc_op_equals(b, valeur))) || (_pyfunc_op_equals(b, origine) && _pyfunc_op_equals(a, valeur)))) && ((!_pyfunc_op_contains(i, this.faits))))) {
            _pymeth_append.call(this.faits, i);
            _pymeth_append.call(this.chemin, valeur);
            this.message = "Ce trait est maintenant encr\u00e9.";
            if ((this.faits.length == this.traits.length)) {
                this.etat = "gagne";
                this.message = "La constellation est dessin\u00e9e d\u2019un seul trait !";
            }
            return null;
        }
    }
    this.message = "Il faut un trait encore libre depuis l\u2019\u00e9toile dor\u00e9e.";
    return null;
};


return { Partie };
})();
