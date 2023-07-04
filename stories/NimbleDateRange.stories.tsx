import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleDateRange} from '../src';

const NimbleDateRangeStory: Meta<typeof NimbleDateRange> = {
  title: 'Nimble Design/Nimble Date Range',
  component: NimbleDateRange,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleDateRangeStory;

export const Autocomplete = {
  args: {},
};
