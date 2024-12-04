import { Provider } from "@lexical/yjs";
import {WebsocketProvider} from 'y-websocket';
import { Doc } from "yjs";

export function createWebsocketProvider(
  id: string,
  yjsDocMap: Map<string, Doc>
): Provider {
  let doc = yjsDocMap.get(id);

  if (doc === undefined) {
    doc = new Doc();
    yjsDocMap.set(id, doc);
  } else {
    doc.load();
  }


  return new WebsocketProvider('ws://localhost:3000/yjs?document=', id, doc, {
    connect: false,
  }) as unknown as Provider;
}