import type {
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedTextNode,
  Spread,
} from 'lexical';

import {$applyNodeReplacement, TextNode} from 'lexical';

import styles from './nodes.module.css'

export type SerializedEmojiNode = Spread<
  {
    className: string;
  },
  SerializedTextNode
>;

export class EmojiNode extends TextNode {
  __className: string;

  static getType(): string {
    return 'emoji';
  }

  static clone(node: EmojiNode): EmojiNode {
    return new EmojiNode(node.__className, node.__text, node.__key);
  }
  /**
   * getType() Cclone()
   *  方法允许 Lexical 正确识别节点类型，并能够正确克隆它，因为我们可能想要自定义克隆行为。
   */

  constructor(className: string, text: string, key?: NodeKey) {
    super(text, key);
    this.__className = className;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement('span');
    const inner = super.createDOM(config);
    dom.className = this.__className;
    inner.className = styles['emoji'];
    return dom;
  }

  updateDOM(
    prevNode: TextNode,
    dom: HTMLElement,
    config: EditorConfig,
  ): boolean {
    const inner = dom.firstChild;
    if (inner === null) {
      return true;
    }
    super.updateDOM(prevNode, inner as HTMLElement, config);
    return false;
  }

  static importJSON(serializedNode: SerializedEmojiNode): EmojiNode {
    const node = $createEmojiNode(
      serializedNode.className,
      serializedNode.text,
    );
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON(): SerializedEmojiNode {
    return {
      ...super.exportJSON(),
      className: this.getClassName(),
      type: 'emoji',
    };
  }

  getClassName(): string {
    const self = this.getLatest();
    return self.__className;
  }
}

export function $isEmojiNode(
  node: LexicalNode | null | undefined,
): node is EmojiNode {
  return node instanceof EmojiNode;
}

export function $createEmojiNode(
  className: string,
  emojiText: string,
): EmojiNode {
  const node = new EmojiNode(className, emojiText).setMode('token');
  return $applyNodeReplacement(node);
}