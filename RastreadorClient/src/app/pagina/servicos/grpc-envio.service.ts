// grpc-envio.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { grpc } from '@improbable-eng/grpc-web';

// Importe o novo cliente streaming e a definição do serviço
import {
  VeiculoServiceClientStreaming,
} from '../../../../generated/VeiculoServiceClientPb';
import {
  VeiculoMensagem,
  ComandoCentral,
} from '../../../../generated/veiculo_pb';

@Injectable({
  providedIn: 'root',
})
export class GrpcEnvioService {
  private host: string = window.location.href.split(':4200')[0] + ':8080';
  private sendSubject = new Subject<VeiculoMensagem>(); // para enviar mensagens dinamicamente
  private clientStream!: grpc.Client<VeiculoMensagem, ComandoCentral>;

  /**
   * Inicia a stream bidirecional e retorna um Observable que emite as mensagens recebidas.
   */
  iniciarStream(): Observable<ComandoCentral.AsObject> {
    return new Observable((observer) => {
      // Cria o cliente streaming a partir do nosso novo arquivo
      const clientWrapper = new VeiculoServiceClientStreaming(this.host);
      this.clientStream = clientWrapper.comunicar();

      // Registre callbacks para a stream
      this.clientStream.onHeaders((headers: grpc.Metadata) => {
        console.log('Cabecalhos recebidos:', headers);
      });

      this.clientStream.onMessage((message: ComandoCentral) => {
        observer.next(message.toObject());
      });

      this.clientStream.onEnd(
        (status: grpc.Code, statusMessage: string, trailers: grpc.Metadata) => {
          if (status === grpc.Code.OK) {
            observer.complete();
          } else {
            observer.error({ status, statusMessage, trailers });
          }
        }
      );

      // Inicia o stream
      this.clientStream.start();

      // Inscreve o sendSubject para enviar mensagens conforme forem geradas
      const subscription = this.sendSubject.subscribe(
        (msg: VeiculoMensagem) => {
          this.clientStream.send(msg);
        }
      );

      // Retorna uma função de teardown que encerra a stream e cancela a inscrição
      return () => {
        subscription.unsubscribe();
        this.clientStream.finishSend();
      };
    });
  }

  /**
   * Envia uma mensagem para o servidor via stream.
   */
  enviarMensagem(mensagem: {
    veiculoId: string;
    latitude: number;
    longitude: number;
    velocidade: number;
    status: string;
    timestamp: number;
  }): void {
    const request = new VeiculoMensagem();
    request.setVeiculoid(mensagem.veiculoId);
    request.setLatitude(mensagem.latitude);
    request.setLongitude(mensagem.longitude);
    request.setVelocidade(mensagem.velocidade);
    request.setStatus(mensagem.status);
    request.setTimestamp(mensagem.timestamp);

    // Envia a mensagem para o subject, que a encaminha para o stream
    this.sendSubject.next(request);
  }
}
