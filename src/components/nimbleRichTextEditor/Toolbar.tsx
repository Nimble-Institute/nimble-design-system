import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, DraftHandleValue, DraftStyleMap, ContentBlock} from 'draft-js';
import {Box, Button} from '@mui/material';

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Highlight,
  StrikethroughS,
  Superscript,
  Subscript,
  Code,
  FormatQuote,
  FormatListBulleted,
  FormatListNumbered,
  KeyboardArrowUp,
  KeyboardArrowDown,
  FormatAlignLeft,
  FormatAlignRight,
  FormatAlignCenter,
} from '@mui/icons-material';

interface ToolbarProps {
  editorState: EditorState;
  setEditorState: (value: EditorState) => void;
  toolbarBackgroundColor: string;
}

const Toolbar: React.FC<ToolbarProps> = ({editorState, setEditorState, toolbarBackgroundColor}) => {
  const tools = [
    {
      label: 'bold',
      style: 'BOLD',
      icon: <FormatBold sx={{fontSize: '20px'}} />,
      method: 'inline',
    },
    {
      label: 'italic',
      style: 'ITALIC',
      icon: <FormatItalic sx={{fontSize: '20px'}} />,
      method: 'inline',
    },
    {
      label: 'underline',
      style: 'UNDERLINE',
      icon: <FormatUnderlined sx={{fontSize: '20px'}} />,
      method: 'inline',
    },
    {
      label: 'highlight',
      style: 'HIGHLIGHT',
      icon: <Highlight sx={{fontSize: '20px'}} />,
      method: 'inline',
    },
    {
      label: 'strike-through',
      style: 'STRIKETHROUGH',
      icon: <StrikethroughS sx={{fontSize: '20px'}} />,
      method: 'inline',
    },
    {
      label: 'Superscript',
      style: 'SUPERSCRIPT',
      icon: <Superscript sx={{fontSize: '20px'}} />,
      method: 'inline',
    },
    {
      label: 'Subscript',
      style: 'SUBSCRIPT',
      icon: <Subscript sx={{fontSize: '20px'}} />,
      method: 'inline',
    },
    // {
    //   label: 'Monospace',
    //   style: 'CODE',
    //   icon: <Code />,
    //   method: 'inline',
    // },
    {
      label: 'Blockquote',
      style: 'blockQuote',
      icon: <FormatQuote sx={{fontSize: '20px'}} />,
      method: 'block',
    },
    {
      label: 'Unordered-List',
      style: 'unordered-list-item',
      method: 'block',
      icon: <FormatListBulleted sx={{fontSize: '20px'}} />,
    },
    {
      label: 'Ordered-List',
      style: 'ordered-list-item',
      method: 'block',
      icon: <FormatListNumbered sx={{fontSize: '20px'}} />,
    },
    {
      label: 'Code Block',
      style: 'CODEBLOCK',
      icon: <Code sx={{fontSize: '20px'}} />,
      method: 'inline',
    },
    {
      label: 'Uppercase',
      style: 'UPPERCASE',
      icon: <KeyboardArrowUp sx={{fontSize: '20px'}} />,
      method: 'inline',
    },
    {
      label: 'lowercase',
      style: 'LOWERCASE',
      icon: <KeyboardArrowDown sx={{fontSize: '20px'}} />,
      method: 'inline',
    },
    {
      label: 'Left',
      style: 'leftAlign',
      icon: <FormatAlignLeft sx={{fontSize: '20px'}} />,
      method: 'block',
    },
    {
      label: 'Center',
      style: 'centerAlign',
      icon: <FormatAlignCenter sx={{fontSize: '20px'}} />,
      method: 'block',
    },
    {
      label: 'Right',
      style: 'rightAlign',
      icon: <FormatAlignRight sx={{fontSize: '20px'}} />,
      method: 'block',
    },
    {label: 'H1', style: 'header-one', method: 'block'},
    {label: 'H2', style: 'header-two', method: 'block'},
    {label: 'H3', style: 'header-three', method: 'block'},
    {label: 'H4', style: 'header-four', method: 'block'},
    {label: 'H5', style: 'header-five', method: 'block'},
    {label: 'H6', style: 'header-six', method: 'block'},
  ];

  const applyStyle = (e: any, style: any, method: any) => {
    e.preventDefault();
    method === 'block'
      ? setEditorState(RichUtils.toggleBlockType(editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const isActive = (style: any, method: any) => {
    if (method === 'block') {
      const selection = editorState.getSelection();
      const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexBasis: '1fr 1fr',
        marginBottom: '10PX',
        backgroundColor: toolbarBackgroundColor,
        padding: '5px',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
      }}>
      {tools.map((item, idx) => (
        <Button
          sx={{
            color: isActive(item.style, item.method) ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.3)',
            textTransform: 'none',
            height: '22px',
            marginBottom: '4px',
          }}
          size="small"
          key={`${item.label}-${idx}`}
          title={item.label}
          onClick={e => applyStyle(e, item.style, item.method)}
          onMouseDown={e => e.preventDefault()}>
          {item.icon || item.label}
        </Button>
      ))}
    </div>
  );
};

export default Toolbar;
