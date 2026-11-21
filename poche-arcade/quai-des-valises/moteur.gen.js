// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurPlateau = (() => {
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
var Partie;
"Un tapis FIFO dessert le train avec l'aide d'une consigne LIFO.";
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (niveau, graine) {
    graine = (graine === undefined) ? 0: graine;
    this.tapis = [[2, 1, 3, 4], [3, 2, 1, 5, 4, 6], [4, 2, 1, 3, 7, 6, 5, 8]][niveau].slice(0);
    this.capacite = [2, 3, 3][niveau];
    this.total = this.tapis.length;
    this.pile = [];
    this.prochain = 1;
    this.historique = [];
    this.coups = 0;
    this.etat = "jeu";
    this.message = "Le train charge les valises dans l\u2019ordre des num\u00e9ros.";
    return null;
};

Partie.prototype.jouer = function (action, valeur) {
    var avant, stub1_;
    if ((!_pyfunc_op_equals(this.etat, "jeu"))) {
        return null;
    }
    if (_pyfunc_op_equals(action, "annuler")) {
        if (_pyfunc_truthy(this.historique)) {
            stub1_ = this.historique.pop();
            this.tapis = stub1_[0];this.pile = stub1_[1];this.prochain = stub1_[2];
            this.coups -= 1;
            this.message = "Le bagagiste reprend son dernier geste.";
        }
        return null;
    }
    avant = [this.tapis.slice(0), this.pile.slice(0), this.prochain];
    if ((_pyfunc_op_equals(action, "ranger") && _pyfunc_truthy(this.tapis) && (this.pile.length < this.capacite))) {
        _pymeth_append.call(this.pile, _pymeth_pop.call(this.tapis, 0));
    } else if ((_pyfunc_op_equals(action, "tapis") && _pyfunc_truthy(this.tapis) && _pyfunc_op_equals(this.tapis[0], this.prochain))) {
        _pymeth_pop.call(this.tapis, 0);
        this.prochain += 1;
    } else if ((_pyfunc_op_equals(action, "pile") && _pyfunc_truthy(this.pile) && _pyfunc_op_equals(this.pile[this.pile.length -1], this.prochain))) {
        this.pile.pop();
        this.prochain += 1;
    } else {
        this.message = "V\u00e9rifie le prochain num\u00e9ro et la place en consigne.";
        return null;
    }
    _pymeth_append.call(this.historique, avant);
    this.coups += 1;
    this.message = "Valise attendue \u00b7 " + _pyfunc_str(this.prochain);
    if ((this.prochain > this.total)) {
        this.etat = "gagne";
        this.message = "Toutes les valises \u00e0 bord. Le train peut partir !";
    }
    return null;
};


return { Partie };
})();
