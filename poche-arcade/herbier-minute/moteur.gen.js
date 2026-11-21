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
var _pyfunc_range = function (start, end, step) {
    var i, res = [];
    var val = start;
    var n = (end - start) / step;
    for (i=0; i<n; i++) {
        res.push(val);
        val += step;
    }
    return res;
};
var _pymeth_append = function (x) { // nargs: 1
    if (!Array.isArray(this)) return this.append.apply(this, arguments);
    this.push(x);
};
var _pymeth_extend = function (x) { // nargs: 1
    if (!Array.isArray(this)) return this.extend.apply(this, arguments);
    this.push.apply(this, x);
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
"Paires m\u00e9lang\u00e9es \u00e0 chaque nouvelle partie, sans minuterie.";
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (niveau, graine) {
    var i, j, paires, stub1_, stub1_i, stub1_i0, stub1_iter0, stub2_;
    graine = (graine === undefined) ? 0: graine;
    paires = [3, 6, 8][niveau];
    this.largeur = [3, 4, 4][niveau];
    stub1_ = [];stub1_iter0 = _pyfunc_range(0, _pyfunc_op_mult(2, paires), 1);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1_i = stub1_iter0[stub1_i0];{stub1_.push(stub1_i % paires);}}
    this.cartes = stub1_;
    for (i = this.cartes.length - 1; i > 0; i += -1) {
        graine = (_pyfunc_op_mult(graine, 9301) + 49297) % 233280;
        j = Math.floor((_pyfunc_op_mult(graine, (i + 1)))/233280);
        stub2_ = [this.cartes[j], this.cartes[i]];
        this.cartes[i] = stub2_[0];this.cartes[j] = stub2_[1];
    }
    this.ouvertes = [];
    this.trouvees = [];
    this.coups = 0;
    this.etat = "jeu";
    this.message = "Retourne la premi\u00e8re feuille du carnet.";
    return null;
};

Partie.prototype.jouer = function (action, valeur) {
    var a, b, stub3_;
    if ((((!_pyfunc_op_equals(action, "case"))) || ((!_pyfunc_op_equals(this.etat, "jeu"))) || _pyfunc_op_contains(valeur, this.trouvees))) {
        return null;
    }
    if ((this.ouvertes.length == 2)) {
        this.ouvertes = [];
    }
    if (_pyfunc_op_contains(valeur, this.ouvertes)) {
        return null;
    }
    _pymeth_append.call(this.ouvertes, valeur);
    if ((this.ouvertes.length == 1)) {
        this.message = "Cherche sa jumelle.";
        return null;
    }
    this.coups += 1;
    stub3_ = this.ouvertes;
    a = stub3_[0];b = stub3_[1];
    if (_pyfunc_op_equals(this.cartes[a], this.cartes[b])) {
        _pymeth_extend.call(this.trouvees, this.ouvertes);
        this.ouvertes = [];
        this.message = "Paire ajout\u00e9e \u00e0 l\u2019herbier.";
        if ((this.trouvees.length == this.cartes.length)) {
            this.etat = "gagne";
            this.message = "Le carnet botanique est complet !";
        }
    } else {
        this.message = "Deux esp\u00e8ces diff\u00e9rentes. Choisis une carte pour continuer.";
    }
    return null;
};


return { Partie };
})();
