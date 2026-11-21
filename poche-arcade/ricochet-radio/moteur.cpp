// Ricochet Radio, simulation à pas fixe pour clavier et antenne tactile.
namespace radio {
constexpr float pas = 1.0f / 60.0f;
constexpr float largeur = 240.0f;
constexpr float paroi = 7.0f;
constexpr float plafond = 16.0f;
constexpr float ligne_antenne = 138.0f;
constexpr float rayon = 3.0f;

struct Station {
    int objectif;
    float demi_antenne;
    float vitesse;
};
constexpr Station stations[] = {{4, 27, 86}, {5, 23, 102}, {6, 20, 118}};
constexpr int nombre_stations = sizeof(stations) / sizeof(stations[0]);

enum class Mode { attente, direct, manque, relais, coupure, final };
struct Emission {
    int station, vies, points, retours;
    float antenne, x, y, vx, vy;
    Mode mode;
    bool juste;
};
Emission jeu{};

float limiter(float x, float min, float max) {
    return x < min ? min : (x > max ? max : x);
}
float absolu(float x) { return x < 0 ? -x : x; }
const Station& frequence() { return stations[jeu.station]; }

// Le repère d’accord occupe successivement la gauche, le centre et la droite.
float accord() {
    constexpr float positions[] = {0, -.54f, .54f, 0, .54f, -.54f};
    return positions[(jeu.retours + jeu.station) % 6] * frequence().demi_antenne;
}
void remettre_signal() {
    jeu.x = jeu.antenne;
    jeu.y = ligne_antenne - rayon - 1;
    jeu.vx = 0;
    jeu.vy = 0;
}
void deplacer(float x) {
    const float marge = paroi + frequence().demi_antenne;
    jeu.antenne = limiter(x, marge, largeur - marge);
    if (jeu.mode == Mode::attente || jeu.mode == Mode::manque) remettre_signal();
}
void rebond(float impact) {
    const float demi = frequence().demi_antenne;
    jeu.juste = absolu(impact - accord()) <= demi * .28f;
    jeu.points += jeu.juste ? 160 : 100;
    ++jeu.retours;
    jeu.y = ligne_antenne - rayon;
    if (jeu.retours >= frequence().objectif) {
        jeu.mode = jeu.station + 1 == nombre_stations ? Mode::final : Mode::relais;
        return;
    }
    const float angle = limiter(impact / demi, -1, 1);
    const float vitesse = frequence().vitesse + 2.0f * jeu.retours;
    jeu.vx = .2f * jeu.vx + .85f * angle * vitesse;
    jeu.vy = -vitesse * (1.0f - .16f * absolu(angle));
}
void pas_de_jeu(int axe) {
    if (jeu.mode != Mode::direct) return;
    deplacer(jeu.antenne + limiter(static_cast<float>(axe), -1, 1) * 188.0f * pas);
    const float avant_x = jeu.x, avant_y = jeu.y;
    jeu.x += jeu.vx * pas;
    jeu.y += jeu.vy * pas;
    const float limite = paroi + rayon;
    if (jeu.x < limite || jeu.x > largeur - limite) {
        jeu.x = limiter(jeu.x, limite, largeur - limite);
        jeu.vx = -jeu.vx;
    }
    if (jeu.y < plafond + rayon) {
        jeu.y = plafond + rayon;
        jeu.vy = absolu(jeu.vy);
    }
    if (avant_y + rayon <= ligne_antenne && jeu.y + rayon >= ligne_antenne && jeu.vy > 0) {
        const float fraction = (ligne_antenne - rayon - avant_y) / (jeu.y - avant_y);
        const float impact = avant_x + fraction * (jeu.x - avant_x) - jeu.antenne;
        if (absolu(impact) <= frequence().demi_antenne + rayon) {
            rebond(impact);
            return;
        }
    }
    if (jeu.y - rayon > 157) {
        --jeu.vies;
        jeu.mode = jeu.vies ? Mode::manque : Mode::coupure;
        remettre_signal();
    }
}
}  // namespace radio

extern "C" {

void initialiser() {
    using namespace radio;
    jeu = {};
    jeu.vies = 3;
    jeu.antenne = largeur / 2;
    jeu.mode = Mode::attente;
    remettre_signal();
}
void emettre() {
    using namespace radio;
    if (jeu.mode != Mode::attente && jeu.mode != Mode::manque) return;
    float sens = (jeu.station + jeu.vies) % 2 ? 1.0f : -1.0f;
    jeu.vx = .55f * frequence().vitesse * sens;
    jeu.vy = -frequence().vitesse;
    jeu.mode = Mode::direct;
}
void station_suivante() {
    using namespace radio;
    if (jeu.mode != Mode::relais) return;
    ++jeu.station;
    jeu.retours = 0;
    jeu.antenne = largeur / 2;
    jeu.mode = Mode::attente;
    remettre_signal();
}
void viser(float x) {
    if (radio::jeu.mode == radio::Mode::direct) radio::deplacer(x);
}
void avancer(int axe) { radio::pas_de_jeu(axe); }
int mode() { return static_cast<int>(radio::jeu.mode); }
int station() { return radio::jeu.station; }
int vies() { return radio::jeu.vies; }
int score() { return radio::jeu.points; }
int retours() { return radio::jeu.retours; }
int objectif() { return radio::frequence().objectif; }
int bien_accorde() { return radio::jeu.juste; }
float antenne() { return radio::jeu.antenne; }
float demi_antenne() { return radio::frequence().demi_antenne; }
float repere() { return radio::accord(); }
float signal_x() { return radio::jeu.x; }
float signal_y() { return radio::jeu.y; }

}

