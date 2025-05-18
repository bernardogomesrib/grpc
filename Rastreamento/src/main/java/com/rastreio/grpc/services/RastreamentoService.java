package com.rastreio.grpc.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.rastreio.grpc.repositories.RastreamentoMensagemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RastreamentoService {
    private final RastreamentoMensagemRepository repository;
    public List<String> getAllRastreamentosAtuais(){
        return repository.findVeiculoIdsAtivosUltimos30Minutos(LocalDateTime.now().minusMinutes(30));
    }
}
