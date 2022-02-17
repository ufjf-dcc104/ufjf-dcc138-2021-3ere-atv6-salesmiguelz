export default class Mapa{
    constructor(linhas = 8, colunas = 12, tamanho = 32, assets){
        this.LINHAS = linhas;
        this.COLUNAS = colunas;
        this.SIZE = tamanho;
        this.tiles = [];
        this.assets = assets;
        for(let l = 0; l < this.LINHAS; l++){
            //Criando um vetor em cada linha, que sera o vetor de colunas
            this.tiles[l] = [];
            for(let c = 0; c < this.COLUNAS; c++){
                this.tiles[l][c] = 0;
            }
        }
        this.cena = null;
    }

    desenhar(ctx){
        for(let l = 0; l < this.LINHAS; l++){
            for(let c = 0; c < this.COLUNAS; c++){
                switch(this.tiles[l][c]){
                    case 1:
                        ctx.drawImage(this.assets.img("brick"), c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
                        break;
                    case 2:
                        ctx.drawImage(this.assets.img("ground"), c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
                        break;
                    default:
                        ctx.fillStyle = "transparent";
                }

                // ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
            }
        }
    }

    carregaMapa(modelo){
        this.LINHAS = modelo.length;
        this.COLUNAS = modelo[0].length ?? 0;
        this.tiles = [];
        for(let l = 0; l < this.LINHAS; l++){
            //Criando um vetor em cada linha, que sera o vetor de colunas
            this.tiles[l] = [];
            for(let c = 0; c < this.COLUNAS; c++){
                this.tiles[l][c] = modelo[l][c];
            }
        }
        this.cena = null;
    }
}