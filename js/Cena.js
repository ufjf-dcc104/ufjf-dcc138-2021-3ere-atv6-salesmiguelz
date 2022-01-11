export default class Cena{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.sprites = [];
        this.t0 = 0;
        this.dt = 0;

        this.idAnim = null;
    }
    
    desenhar(){
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        for(let i = 0; i < this.sprites.length; i++){
            const sprite = this.sprites[i];
            sprite.desenhar(this.ctx);
        }
    }

    adicionar(sprite){
        this.sprites.push(sprite);
    }

    passo(dt){
        for (const sprite of this.sprites) {
            sprite.passo(dt);
        }
    }

    quadro(t){
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0)/1000;

        //Passo altera a posicao dos sprites, baseado no dt (equacao do espaco). (lembra que as animacoes tem que ser baseadas no dt para nao ter bugs visuais)
        this.passo(this.dt);

        //Desenha o "fundo" (canvas) e os sprites na tela, ja com seus estados (posicoes) modificados pelo passo
        this.desenhar();
        this.checaColisao();

        //Rodo o iniciar novamente para refazer todo esse processo
        this.iniciar();
        this.t0 = t;
    }

    iniciar(){
        this.idAnim = requestAnimationFrame(
            (t) => {this.quadro(t);}
        );
    }

    parar(){
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
                    console.log(spriteA, spriteB);
                }
            }
        }
    }
}