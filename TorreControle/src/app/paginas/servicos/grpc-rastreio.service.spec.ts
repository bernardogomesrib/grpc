import { TestBed } from '@angular/core/testing';

import { GrpcRastreioService
 } from './grpc-rastreio.service';

describe('GrpcRastreioService', () => {
  let service: GrpcRastreioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrpcRastreioService
  
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
