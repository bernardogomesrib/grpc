import * as jspb from 'google-protobuf'



export class EstimativaRequest extends jspb.Message {
  getLatitude(): number;
  setLatitude(value: number): EstimativaRequest;

  getLongitude(): number;
  setLongitude(value: number): EstimativaRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EstimativaRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EstimativaRequest): EstimativaRequest.AsObject;
  static serializeBinaryToWriter(message: EstimativaRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EstimativaRequest;
  static deserializeBinaryFromReader(message: EstimativaRequest, reader: jspb.BinaryReader): EstimativaRequest;
}

export namespace EstimativaRequest {
  export type AsObject = {
    latitude: number,
    longitude: number,
  }
}

export class EstimativaResponse extends jspb.Message {
  getEstimativasList(): Array<EstimativaVeiculo>;
  setEstimativasList(value: Array<EstimativaVeiculo>): EstimativaResponse;
  clearEstimativasList(): EstimativaResponse;
  addEstimativas(value?: EstimativaVeiculo, index?: number): EstimativaVeiculo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EstimativaResponse.AsObject;
  static toObject(includeInstance: boolean, msg: EstimativaResponse): EstimativaResponse.AsObject;
  static serializeBinaryToWriter(message: EstimativaResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EstimativaResponse;
  static deserializeBinaryFromReader(message: EstimativaResponse, reader: jspb.BinaryReader): EstimativaResponse;
}

export namespace EstimativaResponse {
  export type AsObject = {
    estimativasList: Array<EstimativaVeiculo.AsObject>,
  }
}

export class EstimativaVeiculo extends jspb.Message {
  getVeiculoid(): string;
  setVeiculoid(value: string): EstimativaVeiculo;

  getLatitude(): number;
  setLatitude(value: number): EstimativaVeiculo;

  getLongitude(): number;
  setLongitude(value: number): EstimativaVeiculo;

  getVelocidade(): number;
  setVelocidade(value: number): EstimativaVeiculo;

  getStatus(): string;
  setStatus(value: string): EstimativaVeiculo;

  getTimestamp(): number;
  setTimestamp(value: number): EstimativaVeiculo;

  getTempoestimado(): string;
  setTempoestimado(value: string): EstimativaVeiculo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EstimativaVeiculo.AsObject;
  static toObject(includeInstance: boolean, msg: EstimativaVeiculo): EstimativaVeiculo.AsObject;
  static serializeBinaryToWriter(message: EstimativaVeiculo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EstimativaVeiculo;
  static deserializeBinaryFromReader(message: EstimativaVeiculo, reader: jspb.BinaryReader): EstimativaVeiculo;
}

export namespace EstimativaVeiculo {
  export type AsObject = {
    veiculoid: string,
    latitude: number,
    longitude: number,
    velocidade: number,
    status: string,
    timestamp: number,
    tempoestimado: string,
  }
}

