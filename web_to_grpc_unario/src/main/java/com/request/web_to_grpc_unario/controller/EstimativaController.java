package com.request.web_to_grpc_unario.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.request.web_to_grpc_unario.entities.EstimativaDAO;
import com.request.web_to_grpc_unario.service.EstimativaService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/estimativa")
@RequiredArgsConstructor
public class EstimativaController {
    private final EstimativaService estimativaService;

    @GetMapping()
    public List<EstimativaDAO> getEstimativas(
            @RequestParam("latitude") double latitude,
            @RequestParam("longitude") double longitude) {
                
        return estimativaService.getEstimativas(latitude, longitude);
    }
    
}
