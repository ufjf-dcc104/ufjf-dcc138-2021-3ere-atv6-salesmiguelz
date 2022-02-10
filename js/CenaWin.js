import Cena from "./Cena.js";

export default class CenaCarregando extends Cena{
    desenhar(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);

        this.ctx.font = "25px Impact";
        this.ctx.fillStyle = "red"
        this.ctx.textAlign = "center";
        this.ctx.fillText("Parabéns! Você sobreviveu ao pesadelo.", this.canvas.width/2, this.canvas.height/3);

    }
    passo(dt){
       
    }

    quadro(t){
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0)/1000;
        this.desenhar();
        this.iniciar();
        this.t0 = t;
    }
}