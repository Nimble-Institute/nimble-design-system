import React, {useEffect, useRef, useState, useMemo} from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  DraftHandleValue,
  DraftStyleMap,
  ContentBlock,
  convertFromRaw,
} from 'draft-js';
import {Box} from '@mui/material';
import {debounce} from 'lodash';
import {stateToHTML} from 'draft-js-export-html';

import Toolbar from './Toolbar';
import './NimbleRichTextEditor.css';

interface RichTextEditorProps {
  placeholder?: string;
  borderColor?: string;
  toolbarBackgroundColor?: string;
  width?: string;
  highlightColor?: string;
  codeFontFamily?: string;
  codeBlockFontFamily?: string;
  codeBlockBackgroundColor?: string;
  savedEditorState?: string;
  onChange?: (html: any, editorState: any) => void;
}

export const NimbleRichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder = 'Write Here',
  borderColor = '#8a8a8a',
  toolbarBackgroundColor = '#d9d9d9',
  width = '100%',
  highlightColor = '#F7A5F7',
  codeFontFamily = '"Inconsolata", "Menlo", "Consolas", monospace',
  codeBlockFontFamily = '"fira-code", "monospace"',
  codeBlockBackgroundColor = '#ffeff0',
  savedEditorState,
  onChange,
}) => {
  const contentState = savedEditorState && convertFromRaw(JSON.parse(savedEditorState));

  const [editorState, setEditorState] = useState<EditorState>(
    contentState ? EditorState.createWithContent(contentState) : EditorState.createEmpty(),
  );

  const editor = useRef<any>(null);

  useEffect(() => {
    focusEditor();
  }, []);

  const focusEditor = () => {
    if (editor && editor.current) {
      editor.current.focus();
    }
  };

  const handleChange = (html: any, editorState: any) => {
    onChange && onChange(html, JSON.stringify(editorState));
  };

  const inputChangeDebouncer = useMemo(() => debounce(handleChange, 500), []);

  const styleMap: DraftStyleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: codeFontFamily,
      fontSize: 16,
      padding: 2,
    },
    HIGHLIGHT: {
      backgroundColor: highlightColor,
    },
    UPPERCASE: {
      textTransform: 'uppercase',
    },
    LOWERCASE: {
      textTransform: 'lowercase',
    },
    CODEBLOCK: {
      fontFamily: codeBlockFontFamily,
      fontSize: 'inherit',
      background: codeBlockBackgroundColor,
      fontStyle: 'italic',
      lineHeight: 1.5,
      padding: '0.3rem 0.5rem',
      borderRadius: ' 0.2rem',
    },
    SUPERSCRIPT: {
      verticalAlign: 'super',
      fontSize: '80%',
    },
    SUBSCRIPT: {
      verticalAlign: 'sub',
      fontSize: '80%',
    },
  };

  // FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
  const myBlockStyleFn = (contentBlock: ContentBlock): any => {
    const type = contentBlock.getType();
    switch (type) {
      case 'blockQuote':
        return 'superFancyBlockquote';
      case 'leftAlign':
        return 'leftAlign';
      case 'rightAlign':
        return 'rightAlign';
      case 'centerAlign':
        return 'centerAlign';
      case 'justifyAlign':
        return 'justifyAlign';
      default:
        break;
    }
  };

  const handleKeyCommand = (command: string): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (command === 'myeditor-save') {
      if (newState) {
        setEditorState(newState);
      }
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <Box
      onClick={focusEditor}
      sx={{
        border: `1px solid ${borderColor}`,
        borderRadius: '5px',
        width: width,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Toolbar
        editorState={editorState}
        setEditorState={setEditorState}
        toolbarBackgroundColor={toolbarBackgroundColor}
      />
      <Box sx={{padding: '15px', backgroundColor: '#fefefe', borderRadius: '5px'}}>
        <Editor
          ref={editor}
          placeholder={placeholder}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          customStyleMap={styleMap}
          blockStyleFn={myBlockStyleFn}
          onChange={editorState => {
            const contentState = editorState.getCurrentContent();
            inputChangeDebouncer(stateToHTML(editorState.getCurrentContent()), convertToRaw(contentState));
            setEditorState(editorState);
          }}
        />
      </Box>
    </Box>
  );
};
