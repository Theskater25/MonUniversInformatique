// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurPlateau = (() => {
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
var _pymeth_join = function (x) { // nargs: 1
    if (this.constructor !== String) return this.join.apply(this, arguments);
    return x.join(this);  // call join on the list instead of the string.
};
var CARTES, Partie;
"Expansion d'une baie par recoloration de sa composante connexe.";
CARTES = [["0012", "0112", "3223", "3313"], ["00123", "31223", "31030", "12003", "23111"], ["012303", "111023", "203321", "210012", "301223", "033110"]];
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (niveau, graine) {
    var carte, stub1_, stub1_c, stub1_i0, stub1_iter0;
    graine = (graine === undefined) ? 0: graine;
    carte = CARTES[niveau];
    this.largeur = carte[0].length;
    stub1_ = [];stub1_iter0 = _pymeth_join.call("", carte);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1_c = stub1_iter0[stub1_i0];{stub1_.push(_pyfunc_int(stub1_c));}}
    this.cases = stub1_;
    this.limite = [6, 9, 12][niveau];
    this.coups = 0;
    this.etat = "jeu";
    this.message = "La mar\u00e9e part de l\u2019ancre, en haut \u00e0 gauche.";
    this.explorer();
    return null;
};

Partie.prototype.explorer = function () {
    var curseur, i, stub2_seq, stub3_itr, v, voisins;
    this.baie = [0];
    curseur = 0;
    while (curseur < this.baie.length) {
        i = this.baie[curseur];
        curseur += 1;
        voisins = [i - this.largeur, _pyfunc_op_add(i, this.largeur)];
        if (_pyfunc_truthy(i % this.largeur)) {
            _pymeth_append.call(voisins, (i - 1));
        }
        if (((i % this.largeur) < (this.largeur - 1))) {
            _pymeth_append.call(voisins, (i + 1));
        }
        stub2_seq = voisins;
        if ((typeof stub2_seq === "object") && (!Array.isArray(stub2_seq))) { stub2_seq = Object.keys(stub2_seq);}
        for (stub3_itr = 0; stub3_itr < stub2_seq.length; stub3_itr += 1) {
            v = stub2_seq[stub3_itr];
            if (((((0 <= v) && (v < this.cases.length))) && ((!_pyfunc_op_contains(v, this.baie))) && _pyfunc_op_equals(this.cases[v], this.cases[0]))) {
                _pymeth_append.call(this.baie, v);
            }
        }
    }
    return null;
};

Partie.prototype.jouer = function (action, valeur) {
    var avant, i, stub4_seq, stub5_itr;
    if ((((!_pyfunc_op_equals(this.etat, "jeu"))) || ((!_pyfunc_op_equals(action, "maree"))) || _pyfunc_op_equals(valeur, this.cases[0]))) {
        return null;
    }
    stub4_seq = this.baie;
    if ((typeof stub4_seq === "object") && (!Array.isArray(stub4_seq))) { stub4_seq = Object.keys(stub4_seq);}
    for (stub5_itr = 0; stub5_itr < stub4_seq.length; stub5_itr += 1) {
        i = stub4_seq[stub5_itr];
        this.cases[i] = valeur;
    }
    avant = this.baie.length;
    this.explorer();
    this.coups += 1;
    this.message = "Cases gagn\u00e9es \u00b7 " + (_pyfunc_str((this.baie.length - avant)));
    if ((this.baie.length == this.cases.length)) {
        this.etat = "gagne";
        this.message = "Toute la baie est r\u00e9unie.";
    } else if ((this.coups >= this.limite)) {
        this.etat = "perdu";
        this.message = "La mer se retire. Essaie un autre ordre de mar\u00e9es.";
    }
    return null;
};


return { Partie };
})();
