export default class Cena{
    constructor(canvas, assets = null){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.sprites = [];
        this.aRemover = [];
        this.t0 = 0;
        this.dt = 0;
        this.idAnim = null;
        this.assets = assets;

        this.mapa = null;
    }
    
    desenhar(){
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);

        this.mapa?.desenhar(this.ctx);

        if(this.assets.acabou()){
            for(let i = 0; i < this.sprites.length; i++){
                const sprite = this.sprites[i];
                sprite.desenhar(this.ctx);
                sprite.aplicaRestricoes();
            }
        }
        

        this.ctx.fillStyle = "yellow";
        this.ctx.fillText(this.assets?.progresso(), 10, 20);
    }

    adicionar(sprite){
        sprite.cena = this;
        this.sprites.push(sprite);
    }

    passo(dt){
        //So comeco a contar o passo a partir de quando as imagens estao carregadas
        if(this.assets.acabou()){
            for (const sprite of this.sprites) {
                sprite.passo(dt);
            }
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
        this.removerSprites();

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
}