#include "../moteurs/manche.hpp"

namespace usine {
int rail, aimant, objet, voie, numero, lot;
float hauteur;
void piece() {
    constexpr int voies[] = {1,0,2,0,2,1,0,2,1,2,0};
    constexpr int signes[] = {1,-1,0,1,-1,1,0,-1,1,-1,1,0};
    voie = voies[(numero + manche.niveau) % 11];
    objet = signes[(numero + manche.niveau * 2) % 12];
    hauteur = 11; ++numero;
}
}
extern "C" {
void ouvrir(int n) {
    using namespace usine;
    manche.ouvrir(n, 5 + 2*n);
    rail = 1; aimant = 1; numero = 0; lot = manche.cible + 6;
    piece();
}
void avancer(int, int appuis) {
    using namespace usine;
    if (manche.resultat) return;
    if ((appuis & 1) && rail > 0) --rail;
    if ((appuis & 4) && rail < 2) ++rail;
    if (appuis & 2) aimant = -aimant;
    hauteur += 1.4f + .36f * manche.niveau;
    if (hauteur < 141) return;
    if (rail == voie) {
        if (objet == aimant) manche.etape(120);
        else manche.faute();
    }
    if (!manche.resultat && numero >= lot) manche.resultat = 2;
    if (!manche.resultat) piece();
}
int rail_chariot() { return usine::rail; }
int polarite() { return usine::aimant; }
int rail_piece() { return usine::voie; }
int type_piece() { return usine::objet; }
float piece_y() { return usine::hauteur; }
int restantes() { return usine::lot - usine::numero + 1; }
}

