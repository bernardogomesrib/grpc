package com.auxilio.websocket_to_grpc.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.auxilio.websocket_to_grpc.websocket.GrpcWebSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final GrpcWebSocketHandler grpcWebSocketHandler;

    public WebSocketConfig(GrpcWebSocketHandler grpcWebSocketHandler) {
        this.grpcWebSocketHandler = grpcWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(grpcWebSocketHandler, "/ws/grpc").setAllowedOrigins("*");
    }
}
