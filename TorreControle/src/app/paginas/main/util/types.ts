export type Posicao = {
    latitude: number;
    longitude: number;
}
export class Carro {
    clientX: number = 0;
    clientY: number = 0;
    id: string = '';
    velocidade: number = 0;
    angulo: number = 0;
    anguloGraus: number = 0;
    flip: number = -1;
    veiculoId: string = '';

    static tamanhoTelaX: number = 0;
    static tamanhoTelaY: number = 0;
    primeiraPosicao: boolean = true;

    constructor(clientX: number, clientY: number, id: string, velocidade: number, angulo: number, anguloGraus: number, flip: number, veiculoId: string) {
        this.clientX = clientX;
        this.clientY = clientY;
        this.id = id;
        this.velocidade = velocidade;
        this.angulo = angulo;
        this.anguloGraus = anguloGraus;
        this.flip = flip;
        this.veiculoId = veiculoId;
    }

    moverCarro(event: Posicao,velocidade:number): void {
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
    }
    static definirTamanhoTela(tamanhoX: number, tamanhoY: number): void {
        Carro.tamanhoTelaX = tamanhoX;
        Carro.tamanhoTelaY = tamanhoY;
    }
}
