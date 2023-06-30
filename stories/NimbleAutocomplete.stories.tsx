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
    borderColor: '#9A9FA5',
    activeBoxShadow: '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
    chipColor: '#9FC540',
    data: [
      {label: 'Option A', value: 1},
      {label: 'Option B', value: 2},
      {label: 'Option C', value: 3},
      {label: 'Option D', value: 4},
      {label: 'Option E', value: 5},
    ],
    placeholder: 'Input search',
    width: '500px',
    multiple: true,
  },
};
