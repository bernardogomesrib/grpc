import { Injectable } from '@angular/core';
import { grpc } from '@improbable-eng/grpc-web';
import { EstimativaRequest, EstimativaResponse } from './rastreio_pb';
import { Carro } from '../main/util/types';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GrpcRastreioService {
  private url = "http:" + window.location.href.split(':')[1] + ':8082/estimativa';

  constructor(private toaster:ToastrService){}

  getEstimativa(latitude: number, longitude: number): Carro[] {

    

    const params = new URLSearchParams({ latitude: latitude.toString(), longitude: longitude.toString() });
    const requestUrl = `${this.url}?${params.toString()}`;

    // Síncrono para exemplo, mas o ideal é usar Observable/Promise em Angular
    const xhr = new XMLHttpRequest();
    xhr.open('GET', requestUrl, false); // false para síncrono (não recomendado em produção)
    xhr.send();

    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      // Supondo que data é um array de objetos
      return data.map((item: any) =>
      new Carro(
        item.latitude,
        item.longitude,
        item.veiculoId,
        item.velocidade,
        item.veiculoId,
        item.tempoEstimado,
        item.timestamp
      )
      );
    } else {
      this.toaster.error(
        xhr.statusText,
        "Erro ao obter dados do servidor:" + xhr.status
      );
      return [];
    }
  }



  // Defina o host do seu backend gRPC-Web (ajuste a porta conforme necessário)




}