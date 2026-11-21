#include "../moteurs/manche.hpp"

namespace plongee {
float hauteur, vitesse, recif, centre, ouverture;
int passage;
void suivant() {
    constexpr int fonds[] = {82,112,54,93,65,122,73,103,54};
    centre = fonds[(passage++ + 2 * manche.niveau) % 9];
    recif = 288;
}
}
extern "C" {
void ouvrir(int n) {
    using namespace plongee;
    manche.ouvrir(n, 4 + n);
    hauteur = 80; vitesse = 0; passage = 0;
    ouverture = 37 - n*5;
    suivant();
}
void avancer(int maintenu, int) {
    using namespace plongee;
    if (manche.resultat) return;
    vitesse += (maintenu & 1) ? -.09f : .07f;
    if (vitesse > 2.15f) vitesse = 2.15f;
    if (vitesse < -2.15f) vitesse = -2.15f;
    hauteur += vitesse;
    if (hauteur < 8) { hauteur = 8; vitesse = 0; }
    if (hauteur > 169) { hauteur = 169; vitesse = 0; }
    recif -= 1.6f + .32f * manche.niveau;
    const bool dans_recif = recif < 66 && recif + 15 > 44;
    float ecart = hauteur - centre;
    if (ecart < 0) ecart = -ecart;
    if (dans_recif && ecart + 6 > ouverture) {
        manche.faute(); hauteur = 82; vitesse = 0; suivant();
    } else if (recif + 15 <= 44) {
        manche.etape(ecart < 9 ? 150 : 100); suivant();
    }
}
float profondeur() { return plongee::hauteur; }
float recif_x() { return plongee::recif; }
float passage_y() { return plongee::centre; }
float demi_passage() { return plongee::ouverture; }
}

