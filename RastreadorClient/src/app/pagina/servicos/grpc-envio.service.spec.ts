import { TestBed } from '@angular/core/testing';

import { GrpcEnvioService } from './grpc-envio.service';

describe('GrpcEnvioService', () => {
  let service: GrpcEnvioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrpcEnvioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
