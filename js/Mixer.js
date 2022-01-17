export default class Mixer{
    constructor(numCanais){
        this.configuraCanais(numCanais);
    }
    configuraCanais(numCanais = 10){
        this.canais = [];
        this.CANAIS = numCanais;
        for(let c = 0; c < this.CANAIS; c++){
            const canal = {
                fim: new Date().getTime(),
                audio: new Audio()
            };
            this.canais[c] = canal;
        }
    }

    play(audio){
    
        const agora = new Date().getTime();
        for(let c = 0; c < this.CANAIS; c++){
            const canal = this.canais[c];

            //Caso entre na condicional, quer dizer que o canal pode ser usado
            if(agora > canal.fim){
                canal.audio.src = audio.src;
                canal.audio.play();
                canal.fim = agora + audio.duration * 1000;
                break;
            }
        }
    }
}