package com.request.web_to_grpc_unario.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.request.web_to_grpc_unario.entities.EstimativaDAO;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import rastreio.EstimativaEntregaGrpc;
import rastreio.Rastreio.EstimativaRequest;
import rastreio.Rastreio.EstimativaResponse;
@Service
public class EstimativaService {

    @Value("${ip.local}")
    private String ip;
    public List<EstimativaDAO> getEstimativas(double latitude, double longitude) {
        // Cria o canal gRPC (ajuste o endereço conforme necessário)
        ManagedChannel channel = ManagedChannelBuilder.forAddress(ip, 8081)
                .usePlaintext()
                .build();

        // Cria o stub
        EstimativaEntregaGrpc.EstimativaEntregaBlockingStub stub = EstimativaEntregaGrpc.newBlockingStub(channel);

        // Monta a requisição
        EstimativaRequest request = EstimativaRequest.newBuilder()
                .setLatitude(latitude)
                .setLongitude(longitude)
                .build();

        // Faz a chamada unária
        EstimativaResponse response = stub.calcularEstimativa(request);

        // Converte a resposta para sua entidade (ajuste conforme seu EstimativaDAO)
        List<EstimativaDAO> estimativas = response.getEstimativasList().stream()
            .map(ev -> EstimativaDAO.builder()
                .veiculoId(ev.getVeiculoid())
                .latitude(ev.getLatitude())
                .longitude(ev.getLongitude())
                .velocidade(ev.getVelocidade())
                .status(ev.getStatus())
                .timestamp(ev.getTimestamp())
                .tempoEstimado(ev.getTempoEstimado())
                .build())
            .collect(Collectors.toList());

        channel.shutdown();

        return estimativas;
    }
}