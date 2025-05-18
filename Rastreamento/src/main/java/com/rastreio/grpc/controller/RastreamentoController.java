package com.rastreio.grpc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rastreio.grpc.services.RastreamentoService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/rastreamento")
@RequiredArgsConstructor
public class RastreamentoController {
    private final RastreamentoService rastreamentoService;

    @GetMapping()
    public List<String> getAtivos() {
        return rastreamentoService.getAllRastreamentosAtuais();
    }
    
}
