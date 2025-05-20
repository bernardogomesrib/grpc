package com.auxilio.websocket_to_grpc.websocket;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.auxilio.websocket_to_grpc.DTO.VeiculoMensagemDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.StreamObserver;
import lombok.extern.slf4j.Slf4j;
import rastreio.Veiculo.ComandoCentral;
import rastreio.Veiculo.VeiculoMensagem;
import rastreio.VeiculoServiceGrpc;
/* 
 * import com.google.protobuf.util.JsonFormat;

// ...

 */

@Component
@Slf4j
public class GrpcWebSocketHandler extends TextWebSocketHandler {

    // Mapa para guardar recursos por sessão
    private final Map<String, ManagedChannel> channelMap = new ConcurrentHashMap<>();
    private final Map<String, StreamObserver<VeiculoMensagem>> requestObserverMap = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Não faz nada aqui, pois o endereço gRPC vem na primeira mensagem
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        GrpcWebSocketRequest request = mapper.readValue(message.getPayload(), GrpcWebSocketRequest.class);
        String grpcAddress = request.getGrpcAddress();
        VeiculoMensagemDTO dto = request.getPayload();
        log.info("mensagem recebida: {}",grpcAddress);
        VeiculoMensagem veiculoMensagem = VeiculoMensagem.newBuilder()
        .setVeiculoId(dto.veiculoid)
        .setLatitude(dto.latitude)
        .setLongitude(dto.longitude)
        .setVelocidade(dto.velocidade)
        .setStatus(dto.status)
        .setTimestamp(dto.timestamp)
        .build();
        
        log.info("Payload: {}", dto);
        // Se não existe canal para essa sessão, cria e guarda
        String target = grpcAddress.replaceFirst("^https?://", "").replaceAll("/.*$", "");
        channelMap.computeIfAbsent(session.getId(), id -> {
            ManagedChannel channel = ManagedChannelBuilder.forTarget(target).usePlaintext().build();
            VeiculoServiceGrpc.VeiculoServiceStub stub = VeiculoServiceGrpc.newStub(channel);

            StreamObserver<ComandoCentral> responseObserver = new StreamObserver<ComandoCentral>() {
                @Override
                public void onNext(ComandoCentral response) {
                    try {
                        session.sendMessage(new TextMessage(response.toString()));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }

                @Override
                public void onError(Throwable t) {
                    t.printStackTrace();
                    channel.shutdown();
                }

                @Override
                public void onCompleted() {
                    channel.shutdown();
                }
            };

            StreamObserver<VeiculoMensagem> requestObserver = stub.comunicar(responseObserver);
            requestObserverMap.put(session.getId(), requestObserver);
            return channel;
        });

        // Envia a mensagem para o gRPC
        StreamObserver<VeiculoMensagem> requestObserver = requestObserverMap.get(session.getId());
        if (requestObserver != null) {
            requestObserver.onNext(veiculoMensagem);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // Fecha canal e limpa recursos
        ManagedChannel channel = channelMap.remove(session.getId());
        if (channel != null) {
            channel.shutdown();
        }
        StreamObserver<VeiculoMensagem> requestObserver = requestObserverMap.remove(session.getId());
        if (requestObserver != null) {
            requestObserver.onCompleted();
        }
    }
}