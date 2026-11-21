#include "../moteurs/manche.hpp"

namespace cuivre {
int temps;
constexpr int motif[] = {0,2,1,0,1,2,2,0,1,2,0,1,1,0,2};
int date(int i) {
    constexpr int swing[] = {0, 3, 0, 5};
    return 92 + i * (46 - 5 * manche.niveau) + swing[i % 4];
}
int piste(int i) { return motif[(i + 3*manche.niveau) % 15]; }
}
extern "C" {
void ouvrir(int n) { manche.ouvrir(n, 8 + n*3); cuivre::temps = 0; }
void avancer(int, int appuis) {
    using namespace cuivre;
    if (manche.resultat) return;
    ++temps;
    int ecart = temps - date(manche.avancement);
    int fenetre = 11 - manche.niveau;
    if (ecart > fenetre) {
        manche.faute();
        if (!manche.resultat) manche.etape(0);
    } else if (appuis & 7) {
        if (ecart >= -fenetre && (appuis & 7) == (1 << piste(manche.avancement))) {
            int distance = ecart < 0 ? -ecart : ecart;
            manche.etape(distance <= 3 ? 160 : 100);
        } else {
            manche.faute();
        }
    }
}
int note_piste(int avance) { return cuivre::piste(manche.avancement + avance); }
int note_delai(int avance) { return cuivre::date(manche.avancement + avance) - cuivre::temps; }
}

