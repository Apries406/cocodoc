import type {Klass, LexicalNode, LexicalNodeReplacement} from 'lexical';
import {CodeHighlightNode, CodeNode} from '@lexical/code';
import {HashtagNode} from '@lexical/hashtag';
import {AutoLinkNode, LinkNode} from '@lexical/link';
import {ListItemNode, ListNode} from '@lexical/list';
import {MarkNode} from '@lexical/mark';
import {OverflowNode} from '@lexical/overflow';
import {HorizontalRuleNode} from '@lexical/react/LexicalHorizontalRuleNode';
import {HeadingNode, QuoteNode} from '@lexical/rich-text';
import {TableCellNode, TableNode, TableRowNode} from '@lexical/table';

import { ImageNode } from './image-node/ImageNode';
import { EmojiNode } from './EmojiNode';
import { MentionNode } from './MentionNode';
import { EquationNode } from './EquationNode';
import { KeywordNode } from './KeywordNode';
import { TweetNode } from './TweetNode';
import { CoQuoteNode } from './rich-text/quote/QuoteNode';

const InitConfigNodes: Array<Klass<LexicalNode> | LexicalNodeReplacement> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  CodeNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  HashtagNode,
  CodeHighlightNode,
  AutoLinkNode,
  LinkNode,
  OverflowNode,
  ImageNode,
  MentionNode,
  EmojiNode,
  EquationNode,
  KeywordNode,
  HorizontalRuleNode,
  TweetNode,
  MarkNode,
  CoQuoteNode,
  {
    // 将 QuoteNode 替换为 CoQuoteNode -> 自定义复写需要继承原有 QuoteNode
    replace: QuoteNode,
    with: (_node: QuoteNode) => new CoQuoteNode(),
    withKlass: CoQuoteNode,
  }
];

export default InitConfigNodes;
