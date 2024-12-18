import {CollaborationPlugin} from '@lexical/react/LexicalCollaborationPlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';


import { ContentEditable } from './ui'
import { MarkdownPlugin, EquationsPlugin, EmojisPlugin, TreeViewPlugin } from '@/editor/plugin';

import { createWebsocketProvider } from './collaboration';

import './Editor.css';

import InitConfigNodes from '@/editor/nodes/initConfigNodes';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getRandomUserProfile, UserProfile } from './utils/collab';
import { Provider } from '@lexical/yjs';
import * as Y from 'yjs';
// import { ContentEditable } from '@lexical/react/LexicalContentEditable';

const initialConfig = {
  editorState: null,
  namespace: 'Demo',
  nodes: [...InitConfigNodes],
  onError: (error: Error) => {
    throw error;
  },
  theme: {}, // 留作自定义使用
};

interface ActiveUserProfile extends UserProfile {
  userId: number;
}

export default function CocoEditor() {
  const [userProfile, setUserProfile] = useState(() => getRandomUserProfile());
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [yjsProvider, setYjsProvider] = useState<null | Provider>(null);
  const [connected, setConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState<ActiveUserProfile[]>([]);


  const handleAwarenessUpdate = useCallback(() => {
    const awareness = yjsProvider!.awareness!;
    console.log(
      'Awareness update:',
      awareness.getStates().entries(),
    )
    setActiveUsers(
      Array.from(awareness.getStates().entries()).map(
        ([userId, {color, name}]) => ({
          color,
          name,
          userId,
        }),
      ),
    );
  }, [yjsProvider]);

  useEffect(() => {
    if (yjsProvider == null) {
      return;
    }

    yjsProvider.awareness.on('update', handleAwarenessUpdate);

    return () => yjsProvider.awareness.off('update', handleAwarenessUpdate);
  }, [yjsProvider, handleAwarenessUpdate]);

  const providerFactory = 
    (id: string, yjsDocMap: Map<string, Y.Doc>) => {
      console.log(id, yjsDocMap)
      const provider = createWebsocketProvider(id, yjsDocMap);
      return provider;
  }
  
  return (
    <div ref={containerRef}>
    <LexicalComposer initialConfig={initialConfig}>
      <CollaborationPlugin
        id='cocodoc'
        providerFactory={providerFactory}
        shouldBootstrap={false}
        username={userProfile.name}
        cursorColor={userProfile.color}
        cursorsContainerRef={containerRef}
      />
      <div className='editor-container'>
        <RichTextPlugin
          contentEditable={<ContentEditable placeholder='Start typing...' />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownPlugin />
        <EquationsPlugin />
        <EmojisPlugin />
        <TreeViewPlugin />
      </div>
    </LexicalComposer>
       
    </div>
  )
}
