import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleFileUploader} from '../src';

const NimbleFileUploaderStory: Meta<typeof NimbleFileUploader> = {
  title: 'Nimble Form Inputs/Nimble File Uploader',
  component: NimbleFileUploader,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleFileUploaderStory;

export const NimbleFileUpload = {
  args: {},
};
