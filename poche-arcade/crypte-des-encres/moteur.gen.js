// Fichier généré par outils/compiler.py. Modifier le moteur source.
// PScript est distribué sous licence BSD-2-Clause (voir LICENCE-PSCRIPT.txt).
const MoteurClassique = (() => {
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
var _pymeth_find = function (x, start, stop) { // nargs: 1 2 3
    if (this.constructor !== String) return this.find.apply(this, arguments);
    start = (start === undefined) ? 0 : start;
    stop = (stop === undefined) ? this.length : stop;
    start = Math.max(0, ((start < 0) ? this.length + start : start));
    stop = Math.min(this.length, ((stop < 0) ? this.length + stop : stop));
    var i = this.slice(start, stop).indexOf(x);
    if (i >= 0) return i + start;
    return -1;
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
var _pymeth_upper = function () { // nargs: 0
    if (this.constructor !== String) return this.upper.apply(this, arguments);
    return this.toUpperCase();
};
var FLECHES, GARDIENS, Hasard, NOMS, PASSAGES, Partie, SALLES, coordonnee, indice_case;
"Petits outils d\u00e9terministes utilis\u00e9s par les m\u00eames jeux en Python et sur le Web.";
Hasard = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Hasard.prototype._base_class = Object;
Hasard.prototype.__name__ = "Hasard";

Hasard.prototype.__init__ = function (graine) {
    this.graine = graine % 233280;
    return null;
};

Hasard.prototype.entier = function (maximum) {
    this.graine = (_pyfunc_op_mult(this.graine, 9301) + 49297) % 233280;
    return _pyfunc_int((_pyfunc_op_mult(this.graine, maximum) / 233280));
};

Hasard.prototype.melanger = function (elements) {
    var i, j, valeur;
    for (i = elements.length - 1; i > 0; i += -1) {
        j = this.entier(i + 1);
        valeur = elements[i];
        elements[i] = elements[j];
        elements[j] = valeur;
    }
    return elements;
};


coordonnee = function flx_coordonnee (i, colonnes) {
    return _pyfunc_op_add(("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[_pyfunc_int((i / colonnes))]), (_pyfunc_str(((i % colonnes) + 1))));
};

indice_case = function flx_indice_case (texte, colonnes, lignes) {
    var x, y;
    texte = _pymeth_upper.call(texte);
    if ((texte.length < 2)) {
        return -1;
    }
    y = _pymeth_find.call("ABCDEFGHIJKLMNOPQRSTUVWXYZ", texte[0]);
    if (((y < 0) || (y >= lignes))) {
        return -1;
    }
    for (x = 0; x < colonnes; x += 1) {
        if ((_pyfunc_op_equals(texte.slice(1), (_pyfunc_str((x + 1)))))) {
            return _pyfunc_op_add(_pyfunc_op_mult(y, colonnes), x);
        }
    }
    return -1;
};

FLECHES = [["g", "Gauche"], ["h", "Haut"], ["b", "Bas"], ["d", "Droite"]];
SALLES = ["Vestibule", "Salle des index", "Apothicairerie", "R\u00e9serve", "Carrefour des plumes", "Galerie du buvard", "Reliquaire", "Bassin de rin\u00e7age", "Chambre du manuscrit"];
PASSAGES = [({d: 1, b: 3}), ({g: 0, d: 2, b: 4}), ({g: 1, b: 5}), ({h: 0, d: 4, b: 6}), ({h: 1, d: 5, b: 7, g: 3}), ({h: 2, g: 4, b: 8}), ({h: 3, d: 7}), ({g: 6, h: 4, d: 8}), ({g: 7, h: 5})];
NOMS = ({g: "Ouest", d: "Est", h: "Nord", b: "Sud"});
GARDIENS = ({5: "Buvard affam\u00e9", 6: "Goutte de suie", 8: "Relieur d\u2019ombre"});
Partie = function () {
    _pyfunc_op_instantiate(this, arguments);
}
Partie.prototype._base_class = Object;
Partie.prototype.__name__ = "Partie";

Partie.prototype.__init__ = function (graine, mode) {
    mode = (mode === undefined) ? 0: mode;
    this.hasard = new Hasard(graine);
    this.salle = 0;
    this.visitees = [0];
    this.fouillees = [];
    this.vaincus = [];
    this.vie = 18;
    this.fioles = 2;
    this.sceaux = 0;
    this.ennemi = 0;
    this.elan = false;
    this.etat = 0;
    this.points = 0;
    this.message = "Les gardiens du buvard et du reliquaire d\u00e9tiennent les deux sceaux du manuscrit.";
    return null;
};

Partie.prototype.agir = function (action) {
    var degats, destination, riposte;
    if (_pyfunc_truthy(this.etat)) {
        return null;
    }
    if (_pyfunc_op_equals(action, "boire")) {
        if ((_pyfunc_op_equals(this.fioles, 0) || _pyfunc_op_equals(this.vie, 18))) {
            this.message = "La fiole se boit quand il te manque de la vie.";
            return null;
        }
        this.fioles -= 1;
        this.vie = Math.min(18, (this.vie + 8));
        this.message = "Tu bois une fiole.";
    } else if (_pyfunc_truthy(this.ennemi)) {
        if (_pyfunc_op_equals(action, "parer")) {
            this.elan = true;
            this.message = "Tu pares sa griffe et pr\u00e9pares une riposte.";
            return null;
        }
        if ((!_pyfunc_op_equals(action, "frapper"))) {
            this.message = "Choisis une action de combat.";
            return null;
        }
        degats = (3 + this.hasard.entier(3)) + ((_pyfunc_truthy(this.elan))? (4) : (0));
        this.elan = false;
        this.ennemi = Math.max(0, (this.ennemi - degats));
        this.message = ("Ton pinceau inflige " + _pyfunc_str(degats)) + " d\u00e9g\u00e2ts.";
        if (_pyfunc_op_equals(this.ennemi, 0)) {
            _pymeth_append.call(this.vaincus, this.salle);
            if (_pyfunc_op_equals(this.salle, 8)) {
                this.etat = 1;
                this.points = (80 + this.vie) + _pyfunc_op_mult(this.fioles, 3);
                this.message = "Le relieur est vaincu. Tu rapportes le manuscrit \u00e0 la biblioth\u00e8que !";
            } else {
                this.sceaux += 1;
                this.message = "Gardien vaincu. Tu ranges son sceau dans ta sacoche.";
            }
            return null;
        }
    } else if (_pyfunc_op_equals(action, "fouiller")) {
        if (_pyfunc_op_contains(this.salle, this.fouillees)) {
            this.message = "Tu as d\u00e9j\u00e0 fouill\u00e9 cette salle.";
            return null;
        }
        _pymeth_append.call(this.fouillees, this.salle);
        if (_pyfunc_op_contains(this.salle, [1, 2, 3, 7])) {
            this.fioles += 1;
            this.message = "Une fiole de soin rejoint ta sacoche.";
        } else {
            this.message = "La poussi\u00e8re ne cache rien d\u2019autre.";
        }
        return null;
    } else if (_pyfunc_op_contains(action, PASSAGES[this.salle])) {
        destination = PASSAGES[this.salle][action];
        if ((_pyfunc_op_equals(destination, 8) && (this.sceaux < 2))) {
            this.message = "La chambre demande les deux sceaux.";
            return null;
        }
        this.salle = destination;
        if ((!_pyfunc_op_contains(destination, this.visitees))) {
            _pymeth_append.call(this.visitees, destination);
        }
        this.message = ("Tu entres dans la salle \u00ab " + SALLES[destination]) + " \u00bb.";
        if ((_pyfunc_op_contains(destination, [5, 6, 8]) && ((!_pyfunc_op_contains(destination, this.vaincus))))) {
            this.ennemi = (_pyfunc_op_equals(destination, 8))? (17) : (10);
            this.elan = false;
            this.message = _pyfunc_op_add(this.message, (" " + GARDIENS[destination]) + " te barre le passage.");
        }
        return null;
    } else {
        this.message = "Choisis un passage ou une action disponible.";
        return null;
    }
    if (_pyfunc_truthy(this.ennemi)) {
        riposte = (2 + this.hasard.entier(2)) + ((_pyfunc_op_equals(this.salle, 8))? (1) : (0));
        this.vie = Math.max(0, (this.vie - riposte));
        this.message = _pyfunc_op_add(this.message, (" Le gardien riposte pour " + _pyfunc_str(riposte)) + ".");
        if (_pyfunc_op_equals(this.vie, 0)) {
            this.etat = -1;
            this.message = "Ta lanterne s\u2019\u00e9teint dans la crypte.";
        }
    }
    return null;
};

Partie.prototype.vue = function () {
    var cases, notes, stub1_, stub1_i, stub1_i0, stub1_iter0;
    stub1_ = [];stub1_iter0 = _pyfunc_range(0, 9, 1);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1_i = stub1_iter0[stub1_i0];{stub1_.push((_pyfunc_op_equals(stub1_i, this.salle))? ("@") : ((_pyfunc_op_contains(stub1_i, this.visitees))? (".") : ("?")));}}
    cases = stub1_;
    notes = [((("Sacoche \u00b7 " + _pyfunc_str(this.fioles)) + " fiole(s) de soin, ") + _pyfunc_str(this.sceaux)) + " sceau(x)."];
    if (_pyfunc_truthy(this.ennemi)) {
        _pymeth_append.call(notes, (((GARDIENS[this.salle] + " \u00b7 ") + _pyfunc_str(this.ennemi)) + " points de vie."));
    }
    return ({titre: SALLES[this.salle], colonnes: 3, grille: cases, styles: (function list_comprehension (iter0) {var res = [];var i, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {i = iter0[i0];{res.push((_pyfunc_op_equals(i, this.salle))? ("heros") : ("salle"));}}return res;}).call(this, _pyfunc_range(0, 9, 1)), notes: notes});
};

Partie.prototype.commandes = function () {
    var actions, stub2_, stub2_d, stub2_i0, stub2_iter0;
    if (_pyfunc_truthy(this.ennemi)) {
        actions = [["frapper", (_pyfunc_truthy(this.elan))? ("Riposter") : ("Frapper")], ["parer", "Parer"]];
    } else {
        stub2_ = [];stub2_iter0 = ["h", "g", "d", "b"];if ((typeof stub2_iter0 === "object") && (!Array.isArray(stub2_iter0))) {stub2_iter0 = Object.keys(stub2_iter0);}for (stub2_i0=0; stub2_i0<stub2_iter0.length; stub2_i0++) {stub2_d = stub2_iter0[stub2_i0];if (!(_pyfunc_op_contains(stub2_d, PASSAGES[this.salle]))) {continue;}{stub2_.push([stub2_d, (NOMS[stub2_d] + " \u00b7 ") + (SALLES[PASSAGES[this.salle][stub2_d]])]);}}
        actions = stub2_;
        if ((!_pyfunc_op_contains(this.salle, this.fouillees))) {
            _pymeth_append.call(actions, ["fouiller", "Fouiller"]);
        }
    }
    if ((_pyfunc_truthy(this.fioles) && (this.vie < 18))) {
        _pymeth_append.call(actions, ["boire", "Boire une fiole"]);
    }
    return actions;
};

Partie.prototype.mesures = function () {
    return [["Vie", _pyfunc_str(this.vie) + "/18"], ["Sceaux", _pyfunc_str(this.sceaux) + "/2"]];
};


return { Partie };
})();
