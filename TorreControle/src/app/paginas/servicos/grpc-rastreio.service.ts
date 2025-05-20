import { Injectable } from '@angular/core';
import { grpc } from '@improbable-eng/grpc-web';
import { EstimativaRequest, EstimativaResponse } from './rastreio_pb';

@Injectable({
  providedIn: 'root',
})
export class GrpcRastreioService {
  private url = "http:" + window.location.href.split(':')[1] + ':8081';


  getEstimativa(veiculosids: string[], latitude: number, longitude: number): void {
    // Defina o método do serviço
    const methodDescriptor = {
      methodName: "CalcularEstimativa",
      service: { serviceName: "rastreio.EstimativaEntrega" },
      requestStream: false,
      responseStream: false,
      requestType: {
        serializeBinary() {
          return request.serializeBinary();
        }
      },
      responseType: {
        deserializeBinary(data: Uint8Array) {
          return EstimativaResponse.deserializeBinary(data);
        }
      }
    };
    const request = new EstimativaRequest();
    request.setLatitude(latitude);
    request.setLongitude(longitude);
    request.setVeiculosidsList([]);
    grpc.unary(methodDescriptor as any, {
      request,
      host: this.url,
      onEnd: res => {
        if (res.status === grpc.Code.OK && res.message) {
          const estimativa = res.message as EstimativaResponse;
          console.log('Resposta:', estimativa.toObject());
        } else {
          console.error('Erro:', res.statusMessage);
        }
      }
    });
  }



  // Defina o host do seu backend gRPC-Web (ajuste a porta conforme necessário)




}