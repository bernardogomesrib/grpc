package com.auxilio.websocket_to_grpc.DTO;

import lombok.Data;

@Data
public class VeiculoMensagemDTO {
     public String veiculoid;
    public double latitude;
    public double longitude;
    public double velocidade;
    public String status;
    public long timestamp;
}
