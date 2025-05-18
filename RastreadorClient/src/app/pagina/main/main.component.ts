import { Component, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  mouseX: number = 0;
  mouseY: number = 0;
  mouseVelocity: number = 0;
  time: number = Date.now();
  distancy: number = 0;
  angulo: number = 0; // em radianos
  anguloGraus: number = 0; // em graus
  showCar: boolean = false;
  definiuUmavez: boolean = false;
  flip: number = -1;
  tamanhoX: number = 0;
  tamanhoY: number = 0;
  latitude: number = 0;
  longitude: number = 0;

  veiculoId: string = '';

  onResize(event: UIEvent): void {
    this.defineTamanhos();
  }

  defineTamanhos() {
    const mainElement = document.getElementById('main');
    if (mainElement) {
      const rect = mainElement.getBoundingClientRect();
      this.tamanhoX = rect.width;
      this.tamanhoY = rect.height;
    }
  }
  ngOnInit(): void {
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
    // Ajuste: não some 180, use flip para espelhar quando necessário
    this.anguloGraus = (this.angulo * 180) / Math.PI;

    // Flip: espelha apenas quando indo para a direita
    this.flip = this.anguloGraus > -90 && this.anguloGraus < 90 ? -1 : 1;
    this.mouseVelocity = this.distancy / (event.timeStamp - this.time);
    this.mouseVelocity = this.mouseVelocity * 1000;
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.time = event.timeStamp;
    // transformando em porcentagem para posicionar o carro depois em outra tela que tiverá o tamanho diferente na mesma posição
    this.latitude = event.clientX / this.tamanhoX;
    this.longitude = event.clientY / this.tamanhoY;
  }
}
