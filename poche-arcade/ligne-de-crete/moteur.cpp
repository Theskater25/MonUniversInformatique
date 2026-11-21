#include "../moteurs/manche.hpp"

namespace crete {
constexpr float coureuse = 54, sol = 132;
float pieds, vitesse_y, bord, largeur, defilement;
bool en_vol, audace;
int essai;

void nouvelle_crevasse(bool premiere) {
    largeur = 29 + manche.niveau * 6 + (essai * 7) % 18;
    bord = premiere ? 237 : 251 + (essai * 23) % 56;
    ++essai;
    audace = false;
}
}
extern "C" {
void ouvrir(int n) {
    using namespace crete;
    manche.ouvrir(n, 4 + 2*n);
    pieds = sol; vitesse_y = 0; en_vol = false; essai = 0;
    defilement = 1.65f + .3f*n;
    nouvelle_crevasse(true);
}
void avancer(int, int appuis) {
    using namespace crete;
    if (manche.resultat) return;
    if ((appuis & 1) && !en_vol) {
        vitesse_y = -4.25f; en_vol = true;
        audace = bord - coureuse >= 0 && bord - coureuse < 15;
    }
    bord -= defilement;
    if (en_vol) {
        vitesse_y += .14f;
        pieds += vitesse_y;
        if (pieds >= sol) { pieds = sol; en_vol = false; }
    }
    if (!en_vol && bord <= coureuse && coureuse <= bord + largeur) {
        manche.faute();
        nouvelle_crevasse(false);
    } else if (bord + largeur < coureuse - 1) {
        manche.etape(audace ? 150 : 100);
        nouvelle_crevasse(false);
    }
}
float pieds() { return crete::pieds; }
float crevasse() { return crete::bord; }
float largeur_trou() { return crete::largeur; }
}

