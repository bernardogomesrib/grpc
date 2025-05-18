package com.rastreio.grpc.entities;

import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class RastreamentoMensagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String veiculoId;
    private double latitude;
    private double longitude;
    private double velocidade;
    private String status;
    private long timestamp;

    private String comandoRecebido;
    private String descricaoComando;

    @CreatedDate
    private LocalDateTime dataRegistro;

}