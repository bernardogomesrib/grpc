package com.request.web_to_grpc_unario.entities;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EstimativaDAO {
    private String veiculoId;
    private double latitude;
    private double longitude;
    private double velocidade;
    private String status;
    private long timestamp;
    private String tempoEstimado;
    private LocalDateTime dataRegistro;
}