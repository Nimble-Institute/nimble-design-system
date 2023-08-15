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
  },
};
