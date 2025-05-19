package com.auxilio.websocket_to_grpc.websocket;



import com.auxilio.websocket_to_grpc.DTO.VeiculoMensagemDTO;

import lombok.Data;

@Data
public class GrpcWebSocketRequest {
    private String grpcAddress;
    private VeiculoMensagemDTO payload;
}
