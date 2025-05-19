
import { Component, numberAttribute, OnInit } from '@angular/core';
import { GrpcEnvioService } from '../servicos/grpc-envio.service';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  // Variáveis para dados e posição...
  mouseX: number = 0;
  mouseY: number = 0;
  mouseVelocity: number = 0;
  time: number = Date.now();
  distancy: number = 0;
  angulo: number = 0;
  anguloGraus: number = 0;
  showCar: boolean = false;
  definiuUmavez: boolean = false;
  flip: number = -1;
  tamanhoX: number = 0;
  tamanhoY: number = 0;
  latitude: number = 0;
  longitude: number = 0;
  veiculoId: string = '';

  constructor(private grpcEnvio: GrpcEnvioService) {}

  ngOnInit(): void {
    // Solicitação do ID do veículo
    while (true) {
      let v = prompt('Digite o ID do veículo:');
      if (v) {
        this.showCar = true;
        this.veiculoId = v;
        break;
      }
      alert('ID inválido. Tente novamente.');
    }
    this.defineTamanhos();

    // Inicia a stream e inscreve-se para receber mensagens do backend
    this.grpcEnvio.iniciarStream().subscribe({
      next: (resposta: any) => {
        console.log('Resposta do backend:', resposta);
      },
      error: (erro: any) => {
        console.error('Erro na stream:', erro);
      },
      complete: () => {
        console.log('Stream encerrada.');
      },
    });
  }

  defineTamanhos() {
    const mainElement = document.getElementById('main');
    if (mainElement) {
      const rect = mainElement.getBoundingClientRect();
      this.tamanhoX = rect.width;
      this.tamanhoY = rect.height;
    }
  }

  onResize(event: any) {
    this.defineTamanhos();
  }

  onMouseMove(event: MouseEvent): void {
    if (event.timeStamp - this.time <= 24) {
      if (!this.definiuUmavez) {
        this.time = event.timeStamp;
        this.definiuUmavez = true;
      }
      return;
    }
    this.distancy = Math.sqrt(
      (event.clientX - this.mouseX) ** 2 + (event.clientY - this.mouseY) ** 2
    );
    this.angulo = Math.atan2(
      event.clientY - this.mouseY,
      event.clientX - this.mouseX
    );
    this.anguloGraus = (this.angulo * 180) / Math.PI;
    this.flip = this.anguloGraus > -90 && this.anguloGraus < 90 ? -1 : 1;
    this.mouseVelocity = (this.distancy / (event.timeStamp - this.time)) * 1000;
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.time = event.timeStamp;

    // Converte as coordenadas para porcentagem
    this.latitude = event.clientX / this.tamanhoX;
    this.longitude = event.clientY / this.tamanhoY;

    // Envia os dados via stream
    this.grpcEnvio.enviarMensagem({
      veiculoId: this.veiculoId,
      latitude: this.latitude,
      longitude: this.longitude,
      velocidade: this.mouseVelocity,
      status: 'OK',
      timestamp: Date.now(),
    });
  }
}
