import Cena from "./Cena.js";

export default class CenaCarregando extends Cena{
    desenhar(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);

        this.ctx.font = "15px Impact";
        this.ctx.fillStyle = "red"
        this.ctx.textAlign = "center";
        this.ctx.fillText("Você coletou todas as jóias e conseguiu escapar das masmorras.", this.canvas.width/2, this.canvas.height/3);

        this.ctx.fillText("Aperte espaço para jogar novamente!", this.canvas.width/2, this.canvas.height/2 + 40);

    }
    passo(dt){
       
    }

    quadro(t){
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0)/1000;

        if(this.input.comandos.get("PROXIMA_CENA")){
            this.game.selecionaCena("jogo");
            return;
        }
        this.desenhar();
        this.iniciar();
        this.t0 = t;
    }
}