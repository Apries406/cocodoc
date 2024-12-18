import { CodeNode, SerializedCodeNode } from "@lexical/code";
import { $applyNodeReplacement, EditorConfig, NodeKey, SerializedElementNode } from "lexical";
import styles from './rich-nodes.module.css'

export class CoCodeNode extends CodeNode {
  static getType(): string {
    return "co-code";
  }

  static clone(node: CoCodeNode): CoCodeNode {
    return new CoCodeNode(node.__key)
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const element = document.createElement('span');
    element.classList.add(styles['co-code']);
    return element;
  }

  updateDOM(_prevNode: CoCodeNode, _dom: HTMLElement): boolean {
    return false;
  }

  static importJSON(serializedNode: SerializedElementNode): CoCodeNode {
    const node = $createCoCodeNode();
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  exportJSON(): SerializedCodeNode {
    return {
      ...super.exportJSON(),
      type: CoCodeNode.getType(),
    }
  }
}

export function $createCoCodeNode(key?: NodeKey): CoCodeNode {
  return $applyNodeReplacement(new CoCodeNode(key))
}