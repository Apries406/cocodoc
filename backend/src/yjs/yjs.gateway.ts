import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import * as Y from 'yjs';
import { WebSocket, Server } from 'ws';
 
import { Request } from 'express';
import * as awarenessProtocol from 'y-protocols/awareness';

const utils = require('y-websocket/bin/utils')
const {setupWSConnection} = utils


@WebSocketGateway({
  path: '/yjs',  transport: 'ws',
})
export class YjsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private docs: Map<string, Y.Doc> = new Map();
  private awareness: Map<string, awarenessProtocol.Awareness> = new Map();

  handleConnection(client: WebSocket, request: Request) {
    const url = new URL(request.url, 'http://localhost');
    const docName = url.searchParams.get('document') || 'default';
    console.log('Client connected to document:', docName);
    

    let doc = this.docs.get(docName);
    if (!doc) {
      doc = new Y.Doc();
      this.docs.set(docName, doc);
      const awareness = new awarenessProtocol.Awareness(doc);
      this.awareness.set(docName, awareness);
    }

    setupWSConnection(client, request, {...(docName && { docName })})
  }

  handleDisconnect(client: WebSocket) {
    console.log('Client disconnected');
  }
} 