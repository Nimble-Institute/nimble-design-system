import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleAutoComplete} from '../src';

const NimbleAutocompleteStory: Meta<typeof NimbleAutoComplete> = {
  title: 'Nimble Design/Nimble Autocomplete',
  component: NimbleAutoComplete,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleAutocompleteStory;

export const Autocomplete = {
  args: {
    label: 'Select Users',
    labelSize: 14,
    labelWeight: '600',
    borderColor: '#3b3b3b',
    activeBoxShadow: 'rgb(219, 242, 251) 0px 0px 0px 2px, rgb(119, 203, 237) 0px 0px 0px 1px inset',
    chipColor: '#820505',
    data: [
      {label: 'Option A', value: 1},
      {label: 'Option B', value: 2},
      {label: 'Option C', value: 3},
      {label: 'Option D', value: 4},
      {label: 'Option E', value: 5},
    ],
  },
};
