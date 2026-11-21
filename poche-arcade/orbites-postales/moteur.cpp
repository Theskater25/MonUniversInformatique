#include "../moteurs/manche.hpp"

namespace poste {
float angle, relais, envoi;
int trajet;
constexpr int duree = 23;
float tourner(float a) { return a >= 360 ? a - 360 : a; }
}
extern "C" {
void ouvrir(int n) {
    using namespace poste;
    manche.ouvrir(n, 3 + n);
    angle = 235; relais = 30 + 24*n; envoi = 0; trajet = -1;
}
void avancer(int, int appuis) {
    using namespace poste;
    if (manche.resultat) return;
    angle = tourner(angle + 1.65f + .33f*manche.niveau);
    relais = tourner(relais + .28f + .19f*manche.niveau);
    if (trajet < 0 && (appuis & 1)) { trajet = 0; envoi = angle; }
    if (trajet >= 0 && ++trajet >= duree) {
        float ecart = envoi - relais;
        if (ecart < 0) ecart = -ecart;
        if (ecart > 180) ecart = 360 - ecart;
        if (ecart <= 24 - 4*manche.niveau) {
            manche.etape(160 - static_cast<int>(ecart*2));
            relais = tourner(relais + 85 + 9*manche.avancement);
        } else manche.faute();
        trajet = -1;
    }
}
float satellite() { return poste::angle; }
float relais_angle() { return poste::relais; }
float tir_angle() { return poste::envoi; }
int vol() { return poste::trajet; }
int tolerance() { return 24 - 4*manche.niveau; }
}

