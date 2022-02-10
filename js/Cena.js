import Sprite from './Sprite.js';

export default class Cena{
    constructor(canvas = null, assets = null){
        this.canvas = canvas;
        this.ctx = canvas?.getContext("2d");
        this.assets = assets;
        this.game = null;
        this.preparar();
    }
    
    // desenhar(){
    //     this.ctx.drawImage(this.assets.img("background"), 0, 0, this.canvas.width, this.canvas.height);

    //     this.mapa?.desenhar(this.ctx);

    //     if(this.assets.acabou()){
    //         for(let i = 0; i < this.sprites.length; i++){
    //             const sprite = this.sprites[i];
    //             sprite.desenhar(this.ctx);
    //             sprite.aplicaRestricoes();
    //         }
    //     }
    // }

    adicionar(sprite){
        sprite.cena = this;
        this.sprites.push(sprite);
    }

    // passo(dt){
    //     //So comeco a contar o passo a partir de quando as imagens estao carregadas
    //     if(this.assets.acabou()){
    //         for (const sprite of this.sprites) {
    //             sprite.passo(dt);
    //         }
    //     }

    //     this.spawn += dt;

    //     if(this.spawn >= 1.5){
    //         this.spawn = 0;
    //         this.criaInimigo();
    //     }
    // }

    // quadro(t){
    //     this.t0 = this.t0 ?? t;
    //     this.dt = (t - this.t0)/1000;

    //     //Passo altera a posicao dos sprites, baseado no dt (equacao do espaco). (lembra que as animacoes tem que ser baseadas no dt para nao ter bugs visuais)
    //     this.passo(this.dt);

    //     //Desenha o "fundo" (canvas) e os sprites na tela, ja com seus estados (posicoes) modificados pelo passo
    //     this.desenhar();
    //     this.checaColisao();
    //     this.verificaInimigo();
    //     this.removerSprites();


    //     //Rodo o iniciar novamente para refazer todo esse processo

    //     if(this.rodando){
    //         this.iniciar();
    //     }
    //     this.t0 = t;
    // }

    iniciar(){
        this.rodando = true;
        this.idAnim = requestAnimationFrame(
            (t) => {this.quadro(t);}
        );
    }

    parar(){
        this.rodando = false;
        cancelAnimationFrame(this.idAnim);
        this.t0 = null;
        this.dt = 0;
    }

    checaColisao(){
        for(let a = 0; a < this.sprites.length - 1; a++){
            const spriteA = this.sprites[a];

            for(let b = a+1; b < this.sprites.length; b++){
                const spriteB = this.sprites[b];
                
                if(spriteA.colidiuCom(spriteB)){
                    this.quandoColidir(spriteA, spriteB);
                }
            }
                
            }
        }

    quandoColidir(a, b){
        if(!this.aRemover.includes(a)){
            this.aRemover.push(a);
        } 

        if(!this.aRemover.includes(b)){
            this.aRemover.push(b);
        }
    }

    removerSprites(){
        for (const alvo of this.aRemover) {
            //Pega o indice do elemento a remover dentro do array original de sprites
            const i = this.sprites.indexOf(alvo);
            if(i >= 0){
                this.sprites.splice(i, 1);
            }
        }

        this.aRemover = [];
    }

    configuraMapa(mapa){
        this.mapa = mapa;
        this.mapa.cena = this;
    }

    preparar(){
        this.sprites = [];
        this.aRemover = [];
        this.t0 = null;
        this.dt = 0;
        this.idAnim = null;
        this.mapa = null;
        this.rodando = true;
        this.spawn = 0;
        this.pont = 0;
    }

    criaInimigo(){
            let sl = Math.floor(Math.random() * (10 - 1 - 1) + 1);
            let sc = 13;
    
            const en1 = new Sprite({
                x: sc * 32 + 32/2,
                y: sl * 32 + 32/2,
                vx: -150,
                color: "red"
            });

            en1.tags.add("enemy");
    
            this.adicionar(en1);
            this.contaInimigos++;
       
    }

    verificaInimigo(){
        //Remove sprite caso ele bata na "parede do outro lado do canvas"
        for(const sprite of this.sprites){
            if(sprite.color == "blue" && sprite.x == 437){
                sprite.x = -1000;
            }
            if(sprite.color == "red" && sprite.x == 43 ){
                this.aRemover.push(sprite);
            }
        }
    }
}