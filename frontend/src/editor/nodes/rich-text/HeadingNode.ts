import { HeadingNode, HeadingTagType, SerializedHeadingNode } from "@lexical/rich-text";
import { $applyNodeReplacement, EditorConfig, NodeKey } from "lexical";
import styles from './rich-nodes.module.css'

export class CoHeadingNode extends HeadingNode {
  static getType() {
    return "co-heading"
  }

  static clone(node: CoHeadingNode): CoHeadingNode {
    return new CoHeadingNode(node.__tag, node.__key);
  }

  constructor(tag: HeadingTagType, key?: NodeKey) {
    super(tag, key)
  }

  createDOM(_config: EditorConfig): HTMLElement {
    console.log(_config)
    const element = document.createElement('div');
    element.classList.add(styles[`co-heading-${this.__tag}`]);

    const placeholderText = `Heading (${this.__tag.toUpperCase()})`;
    // 添加 placeholder 的伪元素或文本节点
    element.setAttribute('data-placeholder', placeholderText);
    
    return element;
  }

  updateDOM(_prevNode: CoHeadingNode, _dom: HTMLElement): boolean {
    return false
  }

  static importJSON(serializedNode: SerializedHeadingNode): CoHeadingNode {
    const node = $createCoHeadingNode(serializedNode.tag)
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  exportJSON(): SerializedHeadingNode {
    return {
      ...super.exportJSON(),
      tag: this.__tag,
      type: CoHeadingNode.getType(),
    }
  }
}

export function $createCoHeadingNode(tag: HeadingTagType, key?: NodeKey): CoHeadingNode {
  return $applyNodeReplacement(new CoHeadingNode(tag, key))
}