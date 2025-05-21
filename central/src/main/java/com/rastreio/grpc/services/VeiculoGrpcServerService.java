package com.rastreio.grpc.services;

import io.grpc.stub.StreamObserver;
import org.springframework.grpc.server.service.GrpcService;

import com.rastreio.grpc.entities.RastreamentoMensagem;
import com.rastreio.grpc.repositories.RastreamentoMensagemRepository;
import rastreio.VeiculoServiceGrpc;
import rastreio.Veiculo.VeiculoMensagem;
import rastreio.Veiculo.ComandoCentral;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@GrpcService
@Slf4j
@RequiredArgsConstructor
public class VeiculoGrpcServerService extends VeiculoServiceGrpc.VeiculoServiceImplBase {

    private final RastreamentoMensagemRepository repository;

    @Override
    public StreamObserver<VeiculoMensagem> comunicar(StreamObserver<ComandoCentral> responseObserver) {
        return new StreamObserver<VeiculoMensagem>() {
            @Override
            public void onNext(VeiculoMensagem mensagem) {
                // Salva mensagem recebida do veículo
                RastreamentoMensagem registro = new RastreamentoMensagem();
                registro.setVeiculoId(mensagem.getVeiculoId());
                registro.setLatitude(mensagem.getLatitude());
                registro.setLongitude(mensagem.getLongitude());
                registro.setVelocidade(mensagem.getVelocidade());
                registro.setStatus(mensagem.getStatus());
                registro.setTimestamp(mensagem.getTimestamp());

                String comando;
                String descricao;

                if (mensagem.getVelocidade() > 100) {
                    comando = "diminuir";
                    descricao = "Reduza a velocidade!";
                } else if (mensagem.getVelocidade() < 60) {
                    comando = "acelerar";
                    descricao = "Aumente a velocidade!";
                } else {
                    comando = "manter";
                    descricao = "Mantenha a velocidade!";
                }

                ComandoCentral resposta = ComandoCentral.newBuilder()
                        .setComando(comando)
                        .setDescricao(descricao)
                        .build();
                registro.setComandoRecebido(comando);
                registro.setDescricaoComando(descricao);
                repository.save(registro);
                log.info("Mensagem recebida do veículo: "+mensagem.getVeiculoId()+" com latitude: "+mensagem.getLatitude()+" e longitude: "+mensagem.getLongitude());
                responseObserver.onNext(resposta);
            }

            @Override
            public void onError(Throwable t) {
                System.err.println("Erro no stream: " + t.getMessage());
            }

            @Override
            public void onCompleted() {
                responseObserver.onCompleted();
            }
        };
    }
}