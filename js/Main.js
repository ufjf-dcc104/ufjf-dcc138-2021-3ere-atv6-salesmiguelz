
import AssetManager from "./AssetManager.js";
import CenaFim from "./CenaFim.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js";
import CenaJogoMedio from "./CenaJogoMedio.js";
import CenaJogoDificil from "./CenaJogoDificil.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaWin from "./CenaWin.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

input.configurarTeclado({
    "ArrowLeft": "MOVE_ESQUERDA",
    "ArrowRight": "MOVE_DIREITA",
    "ArrowUp": "MOVE_CIMA",
    "ArrowDown": "MOVE_BAIXO",
    "f": "ATIRAR",
    " ": "PROXIMA_CENA"
});

assets.carregaImagem("luke", "assets/luke.png");
assets.carregaImagem("energy", "assets/energy.png");
assets.carregaImagem("background", "assets/background.png");


assets.carregaImagem("brick", "assets/brick.png");
assets.carregaImagem("ground", "assets/ground.png");
assets.carregaImagem("joia", "assets/ruby.png");


assets.carregaAudio("lose", "assets/lose.wav");
assets.carregaAudio("level", "assets/level.wav");
assets.carregaAudio("joia", "assets/coin.wav");
assets.carregaAudio("win", "assets/win.wav");

const canvas = document.querySelector("canvas");

const game = new Game(canvas, assets, input);

const cena0 = new CenaCarregando();
const cena1 = new CenaJogo();
const cena2 = new CenaJogoMedio();
const cena3 = new CenaJogoDificil();
const cena4 = new CenaFim();
const cena5 = new CenaWin();

game.adicionarCena("carregando", cena0);
game.adicionarCena("jogo", cena1);
game.adicionarCena("jogoMedio", cena2);
game.adicionarCena("jogoDificil", cena3);
game.adicionarCena("fim", cena4);
game.adicionarCena("win", cena5);

canvas.width = 14*32;
canvas.height = 10*32;



game.iniciar();

