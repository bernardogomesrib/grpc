package com.rastreio.grpc.repositories;

import com.rastreio.grpc.entities.RastreamentoMensagem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RastreamentoMensagemRepository extends JpaRepository<RastreamentoMensagem, Long> {
}