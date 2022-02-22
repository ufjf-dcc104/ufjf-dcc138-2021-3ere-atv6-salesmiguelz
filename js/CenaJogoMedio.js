import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";
export default class CenaJogo extends Cena{
    desenhar(){
        this.ctx.drawImage(this.assets.img("background"), 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = "25px Impact";
        this.ctx.fillStyle = "red"
        this.ctx.fillText(`Joias: ${this.contJoia}/5`, 70, 30);

        this.ctx.font = "25px Impact";
        this.ctx.fillStyle = "red"

        if(this.tempo > 10){
            this.ctx.fillText(`Tempo: 00:${Math.floor(this.tempo)}`, 230, 30);
        } else{
            this.ctx.fillText(`Tempo: 00:0${Math.floor(this.tempo)}`, 230, 30);
        }

        this.ctx.font = "25px Impact";
        this.ctx.fillStyle = "red"
        this.ctx.fillText(`Nível 2`, 390, 30);

        this.mapa?.desenhar(this.ctx);

        if(this.assets.acabou()){
            for(let i = 0; i < this.sprites.length; i++){
                const sprite = this.sprites[i];
                sprite.desenhar(this.ctx);
                sprite.aplicaRestricoes();
            }
        }
    }

    passo(dt){
        //So comeco a contar o passo a partir de quando as imagens estao carregadas
        if(this.assets.acabou()){
            for (const sprite of this.sprites) {
                sprite.passo(dt);
            }
        }

        this.spawn += dt;
        this.tempo -= dt;

        if(this.spawn >= 5){
            this.spawn = 0;

            for(let i = 0; i < this.sprites.length; i++){
                if(this.sprites[i].tags.has("joia")){
                    this.aRemover.push(this.sprites[i]);
                }
            }
            this.criaJoia();
        }

        if(this.tempo < 1)
        {
            this.game.selecionaCena("fim");
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

        if(this.rodando){
            this.iniciar();
        }
        this.t0 = t;
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
        if(a.tags.has("pc") && b.tags.has("joia") ){
            this.aRemover.push(b);
            this.assets.play("joia");
            this.contJoia+= 1;

            if(this.contJoia == 5){
                this.assets.play("level");
                this.game.selecionaCena("jogoDificil")
            }
        }
        
    }

    preparar(){
        super.preparar();
        const mapa1 = new Mapa(10, 14, 32, this.assets);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);
        const cena = this;

        
        const pc = new Sprite({x: 50, w:20, h:30, vx: 20, pers: "luke", assets:this.assets});
        pc.tags.add("pc");
        pc.controlar = function(dt){
            if(cena.input.comandos.get("MOVE_ESQUERDA")){
                this.moveEsquerda = true;
                this.vx = -90;
            } else if(cena.input.comandos.get("MOVE_DIREITA")){
                this.moveDireita = true;
                this.vx = +90;
            } else{
                this.moveEsquerda = false;
                this.moveDireita = false;
                this.vx = 0;
            }

            if(cena.input.comandos.get("MOVE_CIMA")){
                this.moveCima = true;
                this.vy = -90;
            } else if(cena.input.comandos.get("MOVE_BAIXO")){
                this.moveBaixo = true;
                this.vy = +90;
            } else{
                this.moveCima = false;
                this.moveBaixo = false;
                this.vy = 0;
            }
        }

        this.adicionar(pc);
    }
}