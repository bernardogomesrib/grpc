package com.rastreio.grpc.services;

import io.grpc.stub.StreamObserver;
import rastreio.EstimativaEntregaGrpc;
import rastreio.Rastreio.EstimativaRequest;
import rastreio.Rastreio.EstimativaResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.grpc.server.service.GrpcService;




@GrpcService
public class EstimativaEntregaService extends EstimativaEntregaGrpc.EstimativaEntregaImplBase {

    @Autowired
    private RastreamentoService rast;

    @Override
    public void calcularEstimativa(EstimativaRequest request, StreamObserver<EstimativaResponse> responseObserver) {

        responseObserver.onNext(rast.getUltimosRastreamentosRecentes(request.getLatitude(), request.getLongitude()));
        responseObserver.onCompleted();
    }

  
}