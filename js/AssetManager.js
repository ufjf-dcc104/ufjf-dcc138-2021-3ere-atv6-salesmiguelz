export default class AssetManager{
    constructor(){
        this.aCarregar = 0;
        this.carregadas = 0;
        this.imagens = new Map();
    }
    
    carregaImagem(chave, source){
        const img = new Image();
        img.src = source;

        this.imagens.set(chave, img);
    }

    img(chave){
        return this.imagens.get(chave);
    }

    progresso(){
        if(this.aCarregar > 0){
            return `${(this.carregadas/this.aCarregar * 100).toFixed(2)}%`;
        }

        return "Nada a carregar!";
    }
}