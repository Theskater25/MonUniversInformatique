#pragma once

// Chacun des cinq jeux temps réel compile sa propre instance de la manche.
struct Manche {
    int niveau = 0, cible = 0, avancement = 0, reserve = 3, points = 0;
    int resultat = 0;  // 0 en cours, 1 victoire, 2 défaite

    void ouvrir(int indice, int but, int vies = 3) {
        niveau = indice;
        cible = but;
        avancement = 0;
        reserve = vies;
        points = 0;
        resultat = 0;
    }
    void etape(int gain) {
        points += gain;
        if (++avancement >= cible) resultat = 1;
    }
    void faute() {
        if (--reserve <= 0) resultat = 2;
    }
};
static Manche manche;

extern "C" {
int issue() { return manche.resultat; }
int score() { return manche.points; }
int progres() { return manche.avancement; }
int objectif() { return manche.cible; }
int vies() { return manche.reserve; }
}

