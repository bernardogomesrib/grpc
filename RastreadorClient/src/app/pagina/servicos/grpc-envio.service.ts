// grpc-envio.service.ts
import { Injectable } from '@angular/core';


import { ToastrService } from 'ngx-toastr';
import {
  ComandoCentral,
  VeiculoMensagem
} from '../../../../generated/veiculo_pb';

@Injectable({
  providedIn: 'root',
})
export class GrpcEnvioService {
  private host: string = window.location.href.split(':4200')[0] + ':8080';
  private wsUrl: string = this.host.replace('8080', '8083') + '/ws/grpc';
  private ws?: WebSocket;
  private streamingInterval?: any;
  private request: VeiculoMensagem = new VeiculoMensagem();
  constructor( private toastr: ToastrService){}
  /**
  * Inicia a conexão WebSocket para stream de mensagens
  */
  iniciarStream(host?: string): void {
    if (host) {
      this.host = host;
    }

    const intervaloMs = 300; // valor padrão de 1 segundo

    this.ws = new WebSocket(this.wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket conectado');
      // Inicia o envio periódico assim que conectar
      this.iniciarEnvioPeriodico(intervaloMs);
    };

    this.ws.onmessage = (event) => {
      /* console.log('Mensagem recebida do servidor:', event.data); */
      const resp:ComandoCentral = ComandoCentral.deserializeBinary(new Uint8Array(event.data));
      this.toastr.success(resp.getDescricao(), resp.getComando());
    };

    this.ws.onerror = (event) => {
      console.error('Erro no WebSocket:', event);
      this.toastr.error('Erro na conexão WebSocket', event.toString());
    };

    this.ws.onclose = () => {
      console.log('WebSocket fechado');
      this.pararEnvioPeriodico();
    };
  }

  /**
   * Atualiza a mensagem que será enviada no próximo envio periódico
   */
  enviarMensagem(mensagem: {
    veiculoId: string;
    latitude: number;
    longitude: number;
    velocidade: number;
    status: string;
    timestamp: number;
  }): void {
    this.request.setVeiculoid(mensagem.veiculoId);
    this.request.setLatitude(mensagem.latitude);
    this.request.setLongitude(mensagem.longitude);
    this.request.setVelocidade(mensagem.velocidade);
    this.request.setStatus(mensagem.status);
    this.request.setTimestamp(mensagem.timestamp);
  }

  /**
   * Inicia o envio periódico da mensagem atual via WebSocket
   */
  private iniciarEnvioPeriodico(intervaloMs: number): void {
    this.pararEnvioPeriodico();
    this.streamingInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        const payload = {
          grpcAddress: this.host + "/rastreio.VeiculoMensagemService/Comunicar",
          payload: this.request.toObject ? this.request.toObject() : {}
        };
        this.ws.send(JSON.stringify(payload));
      }
    }, intervaloMs);
  }

  /**
   * Para o envio periódico
   */
  private pararEnvioPeriodico(): void {
    if (this.streamingInterval) {
      clearInterval(this.streamingInterval);
      this.streamingInterval = undefined;
    }
  }

  /**
   * Fecha a conexão WebSocket e para o envio periódico
   */
  fecharStream(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = undefined;
    }
    this.pararEnvioPeriodico();
  }
}
