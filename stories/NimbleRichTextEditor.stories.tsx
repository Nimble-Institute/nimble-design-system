import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleRichTextEditor} from '../src';

const NimbleRichTextEditorStory: Meta<typeof NimbleRichTextEditor> = {
  title: 'Nimble Desktop Design/Nimble Rich Text Editor',
  component: NimbleRichTextEditor,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleRichTextEditorStory;

export const NimbleBasicRichTextEditor = {
  args: {
    placeholder: 'Add your content here',
    width: '700px',
    onChange: (value, state) => {
      console.log(value, state);
    },
  },
};

export const NimbleBasicRichTextEditorWithExistingContent = {
  args: {
    placeholder: 'Add your content here',
    width: '700px',
    savedEditorState: `{
      "blocks": [
          {
              "key": "ftpc6",
              "text": "Existing Content",
              "type": "unstyled",
              "depth": 0,
              "inlineStyleRanges": [
                  {
                      "offset": 0,
                      "length": 16,
                      "style": "BOLD"
                  },
                  {
                      "offset": 0,
                      "length": 16,
                      "style": "UNDERLINE"
                  }
              ],
              "entityRanges": [],
              "data": {}
          },
          {
              "key": "2u8ta",
              "text": "category 1",
              "type": "ordered-list-item",
              "depth": 0,
              "inlineStyleRanges": [],
              "entityRanges": [],
              "data": {}
          },
          {
              "key": "2sts",
              "text": "category 2",
              "type": "ordered-list-item",
              "depth": 0,
              "inlineStyleRanges": [],
              "entityRanges": [],
              "data": {}
          },
          {
              "key": "f4ml7",
              "text": "category 3",
              "type": "ordered-list-item",
              "depth": 0,
              "inlineStyleRanges": [],
              "entityRanges": [],
              "data": {}
          }
      ],
      "entityMap": {}
  }`,
    onChange: (value, state) => {
      console.log(value, state);
    },
  },
};
