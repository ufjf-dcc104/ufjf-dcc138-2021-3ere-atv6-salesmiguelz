import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";
export default class CenaJogoMedio extends Cena{
    desenhar(){
        this.ctx.drawImage(this.assets.img("background"), 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = "25px Impact";
        this.ctx.fillStyle = "red"
        this.ctx.fillText(`Vida: ${this.vida}`, 90, 30);
        this.ctx.fillText(`Sanidade: ${this.sanidade}`, 200, 30);

        this.ctx.font = "20px Impact";
        this.ctx.fillStyle = "red"
        this.ctx.fillText(`Nível 2`, 80, 310);

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

        if(this.spawn >= 1){
            this.spawn = 0;
            this.criaInimigo({vx: -250});
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
        this.verificaInimigo();
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
        if(!(a.tags.has("pc") && b.tags.has("proj"))){
            if(a.tags.has("proj") && b.tags.has("enemy")){
                this.assets.play("explosion");
                this.sanidade++;
                if(this.sanidade == 5){
                    this.sanidade = 0;
                    this.assets.play("level");
                    this.game.selecionaCena("jogoDificil");
                    return;
                }
                this.aRemover.push(b);
                return;
            }
            if(!this.aRemover.includes(a)){
                this.aRemover.push(a);
            } 
    
            if(!this.aRemover.includes(b)){
                this.aRemover.push(b);
            }
            
    
            if(a.tags.has("pc") && b.tags.has("enemy") ){
                this.game.selecionaCena("fim");
            }
        }
    }

    preparar(){
        super.preparar();
        const mapa1 = new Mapa(10, 14, 32, this.assets);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);
        const cena = this;

        
        const pc = new Sprite({x: 50, vx: 10, pers: "pandora", assets:this.assets});
        const proj = new Sprite({x: 1000, pers: "proj", assets: this.assets});
        pc.tags.add("pc");
        proj.tags.add("proj");
        pc.controlar = function(dt){
            if(cena.input.comandos.get("MOVE_ESQUERDA")){
                this.vx = -150;
            } else if(cena.input.comandos.get("MOVE_DIREITA")){
                this.vx = +150;
            } else{
                this.vx = 0;
            }

            if(cena.input.comandos.get("MOVE_CIMA")){
                this.vy = -150;
            } else if(cena.input.comandos.get("MOVE_BAIXO")){
                this.vy = +150;
            } else{
                this.vy = 0;
            }
        }

        proj.controlar = function(){
            if(cena.input.comandos.get("ATIRAR")){
                proj.x = pc.x;
                proj.y = pc.y;
                proj.vx = +200;
                pc.atirando = true;
                this.assets.play("shoot");
            }
        }

        this.adicionar(pc);
        this.adicionar(proj);

            function perseguePc(dt){
                this.vx = 25 * Math.sign(pc.x - this.x);
                this.vy = 25 * Math.sign(pc.y - this.y);
            }
            
    }
}