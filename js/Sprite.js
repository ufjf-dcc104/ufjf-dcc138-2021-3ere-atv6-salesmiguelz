export default class Sprite{
    //Responsavel por modelar algo que se move na tela.
    constructor({x=100, y=100, vx=0, vy=0, w=20, h=20, color="white"}={}){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.w = w;
        this.h = h;
        this.color = color;
        this.cena = null;

        //Posicao no mapa, e nao no canvas todo como o x  e o y originais
        this.mx = 0;
        this.my = 0;
    }
    desenhar(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.w/2, this.y - this.h/2,this.w, this.h);
        ctx.strokeStyle = "blue";
        ctx.strokeRect(this.mx * this.cena.mapa.SIZE, this.my * this.cena.mapa.SIZE, this.cena.mapa.SIZE, this.cena.mapa.SIZE);
    }
    passo(dt){
        this.x = this.x + this.vx * dt;
        this.y = this.y + this.vy * dt;
        //Vou encontrar em qual coluna esta o elemento
        this.mx = Math.floor(this.x / this.cena.mapa.SIZE);

        //Vou encontrar em qual linha esta o elemento
        this.my = Math.floor(this.y/ this.cena.mapa.SIZE);

    }

    colidiuCom(outro){
        return !(
            (this.x - this.w/2 > outro.x + outro.w/2) || (this.x + this.w/2 < outro.x - outro.w/2) ||  (this.y - this.h/2 > outro.y + outro.h/2) || (this.y + this.h/2 < outro.y - outro.h/2)
        )
    }

    aplicaRestricoes(dt){
        this.aplicaRestricoesDireita(this.mx + 1, this.my -1);
        this.aplicaRestricoesDireita(this.mx + 1, this.my);
        this.aplicaRestricoesDireita(this.mx + 1, this.my + 1);


        this.aplicaRestricoesEsquerda(this.mx -1, this.my);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my);
        this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1);

        this.aplicaRestricoesBaixo(this.mx - 1, this.my + 1);
        this.aplicaRestricoesBaixo(this.mx , this.my + 1);
        this.aplicaRestricoesBaixo(this.mx + 1, this.my + 1);


        this.aplicaRestricoesCima(this.pmx - 1, this.pmy -1);
        this.aplicaRestricoesCima(this.pmx, this.pmy -1);
        this.aplicaRestricoesCima(this.pmx + 1, this.pmy -1);
    }

    aplicaRestricoesDireita(pmx, pmy){
        if(this.vx > 0){
            const SIZE = this.cena.mapa.SIZE;
            //Andando no eixo x, portanto o y nao tem relacao
            //PMX - Coluna do proximo tile no eixo X
            //PMY - Linha do proximo tile no eixo Y
            //OBS: so pego o proximo quando somo o + 1, caso contrario é o proprio tile atual
           

            if(this.cena.mapa.tiles[pmy][pmx] != 0){
                //Cria um "sprite fake" na mesma posicao do tile de colisao, para poder verificar a colisao com o mesmo
                //Nao preciso fazer "new Sprite()" pois o proprio js ja entende, por meio das propriedades passadas, que esse objeto eh um sprite (duck typing)
                const tile = {
                    //Preciso somar o SIZE/2 pq na funcao colidiuCom ele subtrai o SIZE/2, ja que agora o x e y dos sprites estao localizados em seu centro, entao preciso "rebater" isso para a logica ficar correta
                    x: pmx * SIZE  + (SIZE/2), 
                    y: pmy * SIZE + (SIZE/2), 
                    w: SIZE, 
                    h: SIZE
                };

                if(this.colidiuCom(tile)){
                    this.vx = 0;

                    //Retiro o w/2 do tile pq o x dele esta centralizado no meio do sprite
                    //O mesmo vale para o proprio sprite
                    this.x = (tile.x - tile.w/2) - this.w/2 - 1;
                }
            }
        }
    }

    aplicaRestricoesEsquerda(pmx, pmy){
        if(this.vx < 0){
            const SIZE = this.cena.mapa.SIZE

            if(this.cena.mapa.tiles[pmy][pmx] != 0){
                const tile = {
                    x: pmx * SIZE  + (SIZE/2), 
                    y: pmy * SIZE + (SIZE/2), 
                    w: SIZE, 
                    h: SIZE
                };

                if(this.colidiuCom(tile)){
                    this.vx = 0;
                    this.x = tile.x + tile.w/2 + this.w/2 + 1;
                }
            }
        }
    }   

    aplicaRestricoesBaixo(pmx, pmy){
        if(this.vy > 0){
            const SIZE = this.cena.mapa.SIZE
            if(this.cena.mapa.tiles[pmy][pmx] != 0){
                const tile = {
                    x: pmx * SIZE  + (SIZE/2), 
                    y: pmy * SIZE + (SIZE/2), 
                    w: SIZE, 
                    h: SIZE
                };

                if(this.colidiuCom(tile)){
                    this.vy = 0;
                    this.y = tile.y - tile.h/2 - this.h/2 - 1;
                }
            }
        }
    }

    aplicaRestricoesCima(pmx, pmy){
        if(this.vy < 0){
            const SIZE = this.cena.mapa.SIZE
            if(this.cena.mapa.tiles[pmy][pmx] != 0){
                const tile = {
                    x: pmx * SIZE  + (SIZE/2), 
                    y: pmy * SIZE + (SIZE/2), 
                    w: SIZE, 
                    h: SIZE
                };

                if(this.colidiuCom(tile)){
                    this.vy = 0;
                    this.y = tile.y + tile.h/2 + this.h/2 + 1;
                }
            }
        }
    }
}