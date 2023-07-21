import React from 'react';
import type {Meta} from '@storybook/react';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import {NimbleTimeline} from '../src';

const NimbleButtonStory: Meta = {
  title: 'Nimble Timeline',
  component: NimbleTimeline,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleButtonStory;

export const NimbleContainedButton = {
  args: {},
};
