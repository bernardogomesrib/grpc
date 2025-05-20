import * as jspb from 'google-protobuf'



export class VeiculoMensagem extends jspb.Message {
  getVeiculoid(): string;
  setVeiculoid(value: string): VeiculoMensagem;

  getLatitude(): number;
  setLatitude(value: number): VeiculoMensagem;

  getLongitude(): number;
  setLongitude(value: number): VeiculoMensagem;

  getVelocidade(): number;
  setVelocidade(value: number): VeiculoMensagem;

  getStatus(): string;
  setStatus(value: string): VeiculoMensagem;

  getTimestamp(): number;
  setTimestamp(value: number): VeiculoMensagem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VeiculoMensagem.AsObject;
  static toObject(includeInstance: boolean, msg: VeiculoMensagem): VeiculoMensagem.AsObject;
  static serializeBinaryToWriter(message: VeiculoMensagem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VeiculoMensagem;
  static deserializeBinaryFromReader(message: VeiculoMensagem, reader: jspb.BinaryReader): VeiculoMensagem;
}

export namespace VeiculoMensagem {
  export type AsObject = {
    veiculoid: string,
    latitude: number,
    longitude: number,
    velocidade: number,
    status: string,
    timestamp: number,
  }
}

export class ComandoCentral extends jspb.Message {
  getComando(): string;
  setComando(value: string): ComandoCentral;

  getDescricao(): string;
  setDescricao(value: string): ComandoCentral;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ComandoCentral.AsObject;
  static toObject(includeInstance: boolean, msg: ComandoCentral): ComandoCentral.AsObject;
  static serializeBinaryToWriter(message: ComandoCentral, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ComandoCentral;
  static deserializeBinaryFromReader(message: ComandoCentral, reader: jspb.BinaryReader): ComandoCentral;
}

export namespace ComandoCentral {
  export type AsObject = {
    comando: string,
    descricao: string,
  }
}

