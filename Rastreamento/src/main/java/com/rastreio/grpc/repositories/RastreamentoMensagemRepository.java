package com.rastreio.grpc.repositories;

import com.rastreio.grpc.entities.RastreamentoMensagem;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RastreamentoMensagemRepository extends JpaRepository<RastreamentoMensagem, Long> {
    // Método para encontrar os IDs dos veículos que estão ativos nos últimos 30 minutos
      @Query("SELECT DISTINCT r.veiculoId FROM RastreamentoMensagem r WHERE r.dataRegistro >= :limite")
    List<String> findVeiculoIdsAtivosUltimos30Minutos(@Param("limite") LocalDateTime limite);

    @Query("""
      SELECT r FROM RastreamentoMensagem r
      WHERE r.dataRegistro = (
      SELECT MAX(r2.dataRegistro) FROM RastreamentoMensagem r2
      WHERE r2.veiculoId = r.veiculoId AND r2.dataRegistro >= :limite
      )
      AND r.dataRegistro >= :limite
    """)
    List<RastreamentoMensagem> findUltimaMensagemFromVeiculos(@Param("limite") LocalDateTime limite);
}