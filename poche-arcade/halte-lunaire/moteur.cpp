// Halte Lunaire. La simulation avance de 1/60 s par appel de avancer().
namespace lune {

constexpr float largeur = 320.0f;
constexpr float demi_train = 7.0f;
constexpr float hauteur_pieds = 7.0f;
constexpr float pas = 1.0f / 60.0f;

struct Mission {
    float depart_x;
    float depart_y;
    float quai_x;
    float demi_quai;
    float quai_y;
    float derive;
    float limite_vx;
    float limite_vy;
};

constexpr Mission missions[] = {
    {147, 63, 160, 37, 145, 2, 18, 19},
    {134, 36, 211, 31, 151, 3, 17, 18},
    {179, 28, 95, 25, 143, -3, 16, 17},
};

enum class Issue { en_vol, pose, hors_quai, trop_vite, hors_zone };

struct Vol {
    float x;
    float y;
    float vx;
    float vy;
    float carburant;
    Issue issue;
};

int numero = 0;
Vol vol{};

float absolu(float valeur) { return valeur < 0 ? -valeur : valeur; }

float altitude_sol(float x) {
    const Mission& m = missions[numero];
    const float distance = absolu(x - m.quai_x) - m.demi_quai;
    if (distance <= 0) return m.quai_y;

    // Un profil linéaire par morceaux produit des cratères reproductibles.
    constexpr int relief[] = {150, 136, 158, 164, 146, 156, 141, 160, 152, 134, 149, 150};
    float colonne = (x < 0 ? 0 : (x > largeur ? largeur : x)) / 32.0f;
    const int i = static_cast<int>(colonne);
    const int a = relief[(i + numero * 3) % 12];
    const int b = relief[(i + numero * 3 + 1) % 12];
    const float terrain = a + (b - a) * (colonne - i);
    const float raccord = distance < 14 ? distance / 14 : 1;
    return m.quai_y + (terrain - m.quai_y) * raccord;
}

void integrer(int gauche, int pousser, int droite) {
    if (vol.issue != Issue::en_vol) return;
    const Mission& m = missions[numero];
    const int axe = (droite != 0) - (gauche != 0);
    const float debit = (pousser ? 10.0f : 0.0f) + (axe ? 3.0f : 0.0f);
    const float besoin = debit * pas;
    const float gaz = besoin > vol.carburant ? vol.carburant / besoin : 1.0f;
    vol.carburant -= besoin * gaz;
    if (vol.carburant < 0.001f) vol.carburant = 0;

    // Les buses latérales amortissent la dérive. La pesanteur reste constante.
    vol.vx += (axe * 30.0f * gaz - 0.65f * vol.vx) * pas;
    vol.vy += (9.0f - (pousser ? 26.0f * gaz : 0.0f)) * pas;
    vol.x += vol.vx * pas;
    vol.y += vol.vy * pas;
    if (vol.x < demi_train || vol.x > largeur - demi_train || vol.y < 6) {
        vol.issue = Issue::hors_zone;
        return;
    }

    const float sol_g = altitude_sol(vol.x - demi_train);
    const float sol_d = altitude_sol(vol.x + demi_train);
    const float contact = sol_g < sol_d ? sol_g : sol_d;
    if (vol.y + hauteur_pieds < contact) return;
    vol.y = contact - hauteur_pieds;
    if (absolu(vol.x - m.quai_x) + demi_train > m.demi_quai) {
        vol.issue = Issue::hors_quai;
    } else if (absolu(vol.vx) > m.limite_vx || vol.vy > m.limite_vy) {
        vol.issue = Issue::trop_vite;
    } else {
        vol.issue = Issue::pose;
    }
}

}  // namespace lune

// Interface de la cartouche WebAssembly. Le navigateur dessine cet état.
extern "C" {

void commencer(int indice) {
    using namespace lune;
    numero = (indice >= 0 && indice < 3) ? indice : 0;
    const auto& m = missions[numero];
    vol = {m.depart_x, m.depart_y, m.derive, 3, 100, Issue::en_vol};
}

void avancer(int gauche, int pousser, int droite) { lune::integrer(gauche, pousser, droite); }
int issue() { return static_cast<int>(lune::vol.issue); }
float position_x() { return lune::vol.x; }
float position_y() { return lune::vol.y; }
float vitesse_x() { return lune::vol.vx; }
float vitesse_y() { return lune::vol.vy; }
float reserve() { return lune::vol.carburant; }
float sol(float x) { return lune::altitude_sol(x); }
float centre_quai() { return lune::missions[lune::numero].quai_x; }
float demi_largeur_quai() { return lune::missions[lune::numero].demi_quai; }
float seuil_x() { return lune::missions[lune::numero].limite_vx; }
float seuil_y() { return lune::missions[lune::numero].limite_vy; }

}

