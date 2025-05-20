// VeiculoServiceClientStreaming.ts
import { grpc } from '@improbable-eng/grpc-web';
import { VeiculoMensagem, ComandoCentral } from './veiculo_pb'; // adapte o caminho conforme sua estrutura

/**
 * Definição manual do serviço com streaming bidirecional.
 */
export const VeiculoService = {
  // O método Comunicar está definido como bidirecional:
  Comunicar: {
    methodName: 'Comunicar',
    service: { serviceName: 'rastreio.VeiculoService' },
    requestStream: true, // permite enviar várias mensagens do cliente
    responseStream: true, // permite receber várias mensagens do servidor
    requestType: VeiculoMensagem,
    responseType: ComandoCentral,
  },
};

/**
 * Classe que encapsula o cliente de streaming.
 */
export class VeiculoServiceClientStreaming {
  private host: string;

  constructor(host: string) {
    this.host = host;
  }

  /**
   * Cria e retorna um cliente de streaming para o método Comunicar.
   * Você deve usar esse objeto para:
   * - Registrar callbacks de mensagem, erro e encerramento.
   * - Enviar mensagens com client.send(...)
   * - Finalizar o envio usando client.finishSend()
   */
  comunicar(): grpc.Client<VeiculoMensagem, ComandoCentral> {
    const client = grpc.client(VeiculoService.Comunicar, {
      host: this.host,
      transport: grpc.WebsocketTransport(), // importante para habilitar streaming bidirecional
    }) as grpc.Client<VeiculoMensagem, ComandoCentral>;
    return client;
  }
}
