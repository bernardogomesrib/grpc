package com.rastreio.grpc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.grpc.server.service.GrpcService;

import io.grpc.stub.StreamObserver;
import lombok.extern.slf4j.Slf4j;
import rastreio.EstimativaEntregaGrpc;
import rastreio.Rastreio.EstimativaRequest;
import rastreio.Rastreio.EstimativaResponse;




@GrpcService
@Slf4j
public class EstimativaEntregaService extends EstimativaEntregaGrpc.EstimativaEntregaImplBase {

    @Autowired
    private RastreamentoService rast;

    @Override
    public void calcularEstimativa(EstimativaRequest request, StreamObserver<EstimativaResponse> responseObserver) {

        responseObserver.onNext(rast.getUltimosRastreamentosRecentes(request.getLatitude(), request.getLongitude()));
        log.info("Só falta enviar mesmo, acho...");
        responseObserver.onCompleted();
    }

  
}