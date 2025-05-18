package com.rastreio.grpc.services;

import com.rastreio.grpc.repositories.RastreamentoMensagemRepository;
import com.rastreio.grpc.entities.RastreamentoMensagem;
import io.grpc.stub.StreamObserver;
import rastreio.EstimativaEntregaGrpc;
import rastreio.Rastreio.EstimativaRequest;
import rastreio.Rastreio.EstimativaResponse;
import rastreio.Rastreio.EstimativaVeiculo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.grpc.server.service.GrpcService;


import java.util.List;

@GrpcService
public class EstimativaEntregaService extends EstimativaEntregaGrpc.EstimativaEntregaImplBase {

    @Autowired
    private RastreamentoMensagemRepository mensagemRepository;

    @Override
    public void calcularEstimativa(EstimativaRequest request, StreamObserver<EstimativaResponse> responseObserver) {
        EstimativaResponse.Builder responseBuilder = EstimativaResponse.newBuilder();
        List<RastreamentoMensagem> mensagems = mensagemRepository.findUltimaMensagemByVeiculoIds(request.getVeiculosIdsList());

        for (RastreamentoMensagem mensagem : mensagems) {
            // Busca a última mensagem do veículo

            if (mensagem != null) {
                // Simulação simples de tempo estimado (exemplo: distância/velocidade)
                double distancia = calcularDistancia(
                        mensagem.getLatitude(), mensagem.getLongitude(),
                        request.getLatitude(), request.getLongitude()
                );
                double velocidade = mensagem.getVelocidade() > 0 ? mensagem.getVelocidade() : 40.0; // km/h padrão
                double tempoHoras = distancia / velocidade;
                long tempoMinutos = (long) (tempoHoras * 60);

                EstimativaVeiculo estimativa = EstimativaVeiculo.newBuilder()
                        .setVeiculoId(mensagem.getVeiculoId())
                        .setLatitude(mensagem.getLatitude())
                        .setLongitude(mensagem.getLongitude())
                        .setVelocidade(mensagem.getVelocidade())
                        .setStatus(mensagem.getStatus())
                        .setTimestamp(mensagem.getTimestamp())
                        .setTempoEstimado(tempoMinutos + " min")
                        .build();

                responseBuilder.addEstimativas(estimativa);
            }
        }

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }

    // Função para calcular distância entre dois pontos (Haversine)
    private double calcularDistancia(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Raio da Terra em km
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}