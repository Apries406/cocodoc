import { $applyNodeReplacement, EditorConfig, SerializedElementNode } from "lexical"
import styles from './rich-nodes.module.css'
import { QuoteNode, SerializedQuoteNode } from "@lexical/rich-text"

export class CoQuoteNode extends QuoteNode {
  
  /* 必要函数区域 */
  static getType(): string {
    return 'co-quote'
  }

  static clone(node: CoQuoteNode): CoQuoteNode {
    return new CoQuoteNode(node.__key)
  }

  constructor(key?: string) {
    super(key)
  }

  canMergeWhenEmpty(): true {
    return true
  }

  /* 视图区域 */
  createDOM(_config: EditorConfig): HTMLElement{
    const element = document.createElement('div')
    element.classList.add(styles['co-quote'])

    return element
  }

  updateDOM(_prevNode: CoQuoteNode, _dom: HTMLElement): boolean {
    return false
  }

   static importJSON(serializedNode: SerializedQuoteNode): CoQuoteNode {
    const node = $createCoQuoteNode();
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    return node;
  }

  override exportJSON(): SerializedElementNode {
    return {
      ...super.exportJSON(),
      type: CoQuoteNode.getType(),
      version: 1,
    }
  }
}

export function $createCoQuoteNode(): CoQuoteNode {
  return $applyNodeReplacement(new CoQuoteNode());
}