import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";
export default class CenaJogo extends Cena{
    quandoColidir(a, b){
        if(!(a.tags.has("pc") && b.tags.has("proj"))){
            if(a.tags.has("proj") && b.tags.has("enemy")){
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
        const mapa1 = new Mapa(10, 14, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);
        const cena = this;

        
        const pc = new Sprite({x: 50, vx: 10});
        const proj = new Sprite({x: 1000, color: "blue"});
        pc.tags.add("pc");
        proj.tags.add("proj");
        pc.controlar = function(dt){
            if(cena.input.comandos.get("MOVE_ESQUERDA")){
                this.vx = -100;
            } else if(cena.input.comandos.get("MOVE_DIREITA")){
                this.vx = +100;
            } else{
                this.vx = 0;
            }

            if(cena.input.comandos.get("MOVE_CIMA")){
                this.vy = -100;
            } else if(cena.input.comandos.get("MOVE_BAIXO")){
                this.vy = +100;
            } else{
                this.vy = 0;
            }
        }

        proj.controlar = function(){
            if(cena.input.comandos.get("ATIRAR")){
                proj.x = pc.x;
                proj.y = pc.y;
                proj.vx = +200;
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