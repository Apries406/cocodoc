import { $applyNodeReplacement, EditorConfig, SerializedElementNode } from "lexical"
import styles from '../../nodes.module.css'
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


  static importJSON(serializedNode: SerializedQuoteNode): CoQuoteNode {
    const node = $createCoQuoteNode();
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }

  exportJSON(): SerializedElementNode {
    return {
      ...super.exportJSON(),
      type: QuoteNode.getType(),
    }
  }

  /* 视图区域 */
  createDOM(_config: EditorConfig): HTMLElement{
    const element = document.createElement('div')
    element.classList.add(styles['quote'])

    return element
  }

  updateDOM(_prevNode: QuoteNode, _dom: HTMLElement): boolean {
    return false
  }
}

export function $createCoQuoteNode(): QuoteNode {
  return $applyNodeReplacement(new QuoteNode());
}