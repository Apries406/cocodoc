import { DecoratorNode, EditorConfig, LexicalEditor, LexicalNode, NodeKey } from "lexical";
import { ReactNode } from "react";

export class VideoNode extends DecoratorNode<ReactNode> {
  __id: string;

  static getType(): string {
    return 'video-node'
  }

  static clone(node: VideoNode): VideoNode {
    return new VideoNode(node.__id, node.__key)
  }

  constructor(__id: string, __key?: NodeKey) {
    super(__key)
    this.__id = __id
  }

  createDOM(): HTMLElement {
    return document.createElement('div')
  }

  updateDOM(): boolean {
    return false
  }

  decorate(): ReactNode {
    return <video src={this.__id} controls></video>
  }
}


export function $createVideoNode(id: string): VideoNode {
  return new VideoNode(id);
}

export function $isVideoNode(
  node: LexicalNode | null | undefined,
): node is VideoNode {
  return node instanceof VideoNode;
}