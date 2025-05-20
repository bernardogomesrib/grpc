package com.rastreio.grpc.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import com.rastreio.grpc.entities.RastreamentoMensagem;
import com.rastreio.grpc.repositories.RastreamentoMensagemRepository;

import lombok.RequiredArgsConstructor;
import rastreio.Rastreio;
import rastreio.Rastreio.EstimativaResponse;
import rastreio.Rastreio.EstimativaVeiculo;

@Service
@RequiredArgsConstructor
public class RastreamentoService {
    private final RastreamentoMensagemRepository repository;
    public List<String> getAllRastreamentosAtuais(){
        return repository.findVeiculoIdsAtivosUltimos30Minutos(LocalDateTime.now().minusMinutes(30));
    }

    public Rastreio.EstimativaResponse getUltimosRastreamentosRecentes( double latitude, double longitude) {

        List<RastreamentoMensagem>  mensagems = repository.findUltimaMensagemFromVeiculos(LocalDateTime.now().minusMinutes(30));
        EstimativaResponse.Builder responseBuilder = EstimativaResponse.newBuilder();
        
        for (RastreamentoMensagem mensagem : mensagems) {

            if (mensagem != null) {
                // Simulação simples de tempo estimado (exemplo: distância/velocidade)
                double distancia = calcularDistancia(
                        mensagem.getLatitude(), mensagem.getLongitude(),
                        latitude, longitude
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
        return responseBuilder.build();
    }
    public List<EstimativaDAO> getUltimosRastreamentosRecentesGet( double latitude, double longitude) {
        List<EstimativaDAO> m = new java.util.ArrayList<>();
        List<RastreamentoMensagem>  mensagems = repository.findUltimaMensagemFromVeiculos(LocalDateTime.now().minusMinutes(30));
        
        for (RastreamentoMensagem mensagem : mensagems) {

            if (mensagem != null) {
                // Simulação simples de tempo estimado (exemplo: distância/velocidade)
                double distancia = calcularDistancia(
                        mensagem.getLatitude(), mensagem.getLongitude(),
                        latitude, longitude
                );
                double velocidade = mensagem.getVelocidade() > 0 ? mensagem.getVelocidade() : 40.0; // km/h padrão
                double tempoHoras = distancia / velocidade;
                long tempoMinutos = (long) (tempoHoras * 60);

                

                m.add(EstimativaDAO.builder()
                        .veiculoId(mensagem.getVeiculoId())
                        .latitude(mensagem.getLatitude())
                        .longitude(mensagem.getLongitude())
                        .velocidade(mensagem.getVelocidade())
                        .status(mensagem.getStatus())
                        .timestamp(mensagem.getTimestamp())
                        .tempoEstimado(tempoMinutos + " min")
                        .dataRegistro(mensagem.getDataRegistro())
                        .build());
            }
        }
        return m;
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
