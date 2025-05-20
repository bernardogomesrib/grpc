
import { Component, OnInit } from '@angular/core';
import { GrpcRastreioService } from '../servicos/grpc-rastreio.service';
import { ToastrService } from 'ngx-toastr';
import { Carro } from './util/types';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  // Variáveis para dados e posição...
  carros: Carro[] = [];
  constructor(private toaster: ToastrService, private service: GrpcRastreioService) { }
  posicaoX: number = -1;
  posicaoY: number = -1;
  tempX: number = 0;
  tempY: number = 0;
  listaIds: string[] = [];
  ngOnInit(): void {
    this.pegaridsDeCarrosDaApi();
    this.defineTamanhos();
  }
  private intervalId: any;

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startPeriodicFetch(): void {
    this.intervalId = setInterval(() => {
      this.pegarPosicoes();
    }, 1000); 
  }

  ngAfterViewInit(): void {
    this.startPeriodicFetch();
  }
  pegarPosicoes() {
    
    if (this.listaIds.length >= 0 && this.posicaoX != -1 && this.posicaoY != -1) {
      console.log(this.listaIds, this.posicaoX/Carro.tamanhoTelaX, this.posicaoY/Carro.tamanhoTelaY);
      this.service.getEstimativa(this.listaIds, this.posicaoX/Carro.tamanhoTelaX, this.posicaoY/Carro.tamanhoTelaY)/* .then((response) => {
        console.log('Resposta do serviço:', response);
        this.carros = response;
      }).catch((error) => {
        console.log(error);
        this.toaster.error( `${error.message}`,'Erro ao obter estimativas');
      }); */
    }
  }

  defineTamanhos() {
    const mainElement = document.getElementById('main');
    if (mainElement) {
      const rect = mainElement.getBoundingClientRect();
      Carro.definirTamanhoTela(rect.width, rect.height);
    }
  }

  onResize(event: any) {
    this.defineTamanhos();
  }

  onMouseMove(event: MouseEvent) {
    this.tempX = event.clientX;
    this.tempY = event.clientY;
  }
  definePosicao() {
    this.posicaoX = this.tempX;
    this.posicaoY = this.tempY;
    console.log('Posição:', this.posicaoX, this.posicaoY);
  }
  mostrarToaster() {
    console.log('Toaster');
    this.toaster.success('Teste', 'Sucesso um toaster apareceu');
  }
  pegaridsDeCarrosDaApi() {
    const url = "http:" + window.location.href.split(':')[1] + ':8081/rastreamento';
    // fazendo fetch para pegar os ids
    console.log('URL:', url);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        this.listaIds = data
        console.log('IDs dos carros:', this.listaIds);
      })
      .catch((error) => {
        console.error('Erro ao buscar os IDs dos carros:', error);
      });
  }
}
