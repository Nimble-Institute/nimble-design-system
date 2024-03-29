import type {Meta} from '@storybook/react';

import {NimbleAutoComplete} from '../src';

const NimbleAutocompleteStory: Meta<typeof NimbleAutoComplete> = {
  title: 'Nimble Form Inputs/Nimble Autocomplete',
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
    hoverBoxShadow: '0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #9A9FA5 inset',
    chipColor: '#9FC540',
    data: [
      {label: 'Option A', value: 1},
      {label: 'Option B', value: 2},
      {label: 'Option C', value: 3},
      {label: 'Option D', value: 4},
      {label: 'Option E', value: 5},
      {label: 'Option F', value: 6},
      {label: 'Option G', value: 7},
      {label: 'Option H', value: 8},
      {label: 'Option I', value: 9},
    ],
    placeholder: 'Input search',
    width: '500px',
    multiple: true,
    onBlur: () => console.log('Blure'),
    onChange: value => console.log(value),
  },
};

export const AutocompleteWithDefaultValue = {
  args: {
    label: 'Select Users',
    labelSize: 14,
    labelWeight: '600',
    borderColor: '#9A9FA5',
    activeBoxShadow: '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
    hoverBoxShadow: '0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #9A9FA5 inset',
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
    defaultValue: [
      {label: 'Option A', value: 1},
      {label: 'Option B', value: 2},
    ],
    onChange: value => console.log(value),
  },
};

export const AutocompleteDiabled = {
  args: {
    label: 'Select Users',
    labelSize: 14,
    data: [
      {label: 'Option A', value: 1},
      {label: 'Option B', value: 2},
      {label: 'Option C', value: 3},
      {label: 'Option D', value: 4},
      {label: 'Option E', value: 5},
    ],
    placeholder: 'Input search',
    width: '500px',
    disabled: true,
  },
};

export const AutocompletewithSingleSelection = {
  args: {
    label: 'Select Users',
    labelSize: 14,
    labelWeight: '600',
    borderColor: '#9A9FA5',
    activeBoxShadow: '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
    hoverBoxShadow: '0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #9A9FA5 inset',
    chipColor: '#9FC540',
    data: [
      {label: 'Option A', value: 1},
      {label: 'Option B', value: 2},
      {label: 'Option C', value: 3},
      {label: 'Option D', value: 4},
      {label: 'Option E', value: 5},
      {label: 'Option F', value: 6},
      {label: 'Option G', value: 7},
      {label: 'Option H', value: 8},
      {label: 'Option I', value: 9},
    ],
    placeholder: 'Input search',
    width: '500px',
    multiple: false,
    onBlur: () => console.log('Blue'),
    onChange: value => console.log(value),
  },
};

export const AutocompleteWithSingleSelectionAndDefaultvalue = {
  args: {
    label: 'Select Users',
    labelSize: 14,
    labelWeight: '600',
    borderColor: '#9A9FA5',
    activeBoxShadow: '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
    hoverBoxShadow: '0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #9A9FA5 inset',
    chipColor: '#9FC540',
    data: [
      {label: 'Option A', value: 1},
      {label: 'Option B', value: 2},
      {label: 'Option C', value: 3},
      {label: 'Option D', value: 4},
      {label: 'Option E', value: 5},
      {label: 'Option F', value: 6},
      {label: 'Option G', value: 7},
      {label: 'Option H', value: 8},
      {label: 'Option I', value: 9},
    ],
    placeholder: 'Input search',
    width: '500px',
    multiple: false,
    onBlur: () => console.log('Blue'),
    onChange: value => console.log(value),
    defaultValue: {label: 'Option A', value: 1},
  },
};
