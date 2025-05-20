export type Posicao = {
    latitude: number;
    longitude: number;
}
export class Carro {
    clientX: number = 0;
    clientY: number = 0;
    latitude: number = 0;
    longitude: number = 0;
    id: string = '';
    velocidade: number = 0;
    angulo: number = 0;
    anguloGraus: number = 0;
    flip: number = -1;
    veiculoId: string = '';
    tempoEstimado: string = '';
    static tamanhoTelaX: number = 0;
    static tamanhoTelaY: number = 0;
    primeiraPosicao: boolean = true;
    timestamp: number = 0;
    constructor(latitude: number, longitude: number, id: string, velocidade: number, veiculoId: string,tempoEstimado: string,timestamp:number) {
        this.clientX = Carro.tamanhoTelaX * latitude;
        this.clientY = Carro.tamanhoTelaY * longitude;
        this.latitude = latitude;
        this.longitude = longitude;
        this.id = id;
        this.velocidade = velocidade;
        this.angulo = 0;
        this.anguloGraus = 0;
        this.flip = -1;
        this.veiculoId = veiculoId;
        this.tempoEstimado = tempoEstimado;
        this.primeiraPosicao = true;
        this.timestamp = timestamp;
        console.log(tempoEstimado);
    }

    moverCarro(event: Posicao,velocidade:number,tempoEstimado:string): void {
        // Calcula a nova posição em pixels com base na porcentagem (latitude/longitude)
        const novoX = event.latitude * Carro.tamanhoTelaX;
        const novoY = event.longitude * Carro.tamanhoTelaY;

        // Calcula o ângulo entre a posição anterior e a nova posição
        const deltaX = novoX - this.clientX;
        const deltaY = novoY - this.clientY;
        this.angulo = Math.atan2(deltaY, deltaX);
        this.anguloGraus = (this.angulo * 180) / Math.PI;
        this.flip = this.anguloGraus > -90 && this.anguloGraus < 90 ? -1 : 1;
        this.velocidade = velocidade;
        // Atualiza a posição do carro
        this.clientX = novoX;
        this.clientY = novoY;
        this.tempoEstimado = tempoEstimado;
    }
    static definirTamanhoTela(tamanhoX: number, tamanhoY: number): void {
        Carro.tamanhoTelaX = tamanhoX;
        Carro.tamanhoTelaY = tamanhoY;
    }
}
