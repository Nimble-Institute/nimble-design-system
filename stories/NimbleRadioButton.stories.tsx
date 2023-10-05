import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleRadioButton} from '../src';

const NimbleRadioButtonStory: Meta<typeof NimbleRadioButton> = {
  title: 'Nimble Form Inputs/Nimble Radio Button',
  component: NimbleRadioButton,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleRadioButtonStory;

export const NimbleRadioButtonGroupsRows = {
  args: {
    groupLabel: 'Nimble Radio Group',
    onChange: (value: string) => console.log('selected option: ', value),
    radioGroups: [
      {
        label: 'Option A',
        value: 'A',
      },
      {
        label: 'Option B',
        value: 'B',
      },
      {
        label: 'Option C',
        value: 'C',
      },
    ],
  },
};

export const NimbleRadioButtonGroups = {
  args: {
    groupLabel: 'Nimble Radio Group',
    isRowGroup: false,
    onChange: (value: string) => console.log('selected option: ', value),
    radioGroups: [
      {
        label: 'Option A',
        value: 'A',
      },
      {
        label: 'Option B',
        value: 'B',
      },
      {
        label: 'Option C',
        value: 'C',
      },
    ],
  },
};

export const NimbleRadioButtonGroupsWithDisabled = {
  args: {
    groupLabel: 'Nimble Radio Group',
    onChange: (value: string) => console.log('selected option: ', value),
    radioGroups: [
      {
        label: 'Option A',
        value: 'A',
      },
      {
        label: 'Option B',
        value: 'B',
        disabled: true,
      },
      {
        label: 'Option C',
        value: 'C',
      },
    ],
  },
};

export const NimbleRadioButtonGroupsWithDefaultValue = {
  args: {
    groupLabel: 'Nimble Radio Group',
    onChange: (value: string) => console.log('selected option: ', value),
    defaultValue: 'B',
    radioGroups: [
      {
        label: 'Option A',
        value: 'A',
      },
      {
        label: 'Option B',
        value: 'B',
      },
      {
        label: 'Option C',
        value: 'C',
      },
    ],
  },
};

export const NimbleStandaloneRadio = {
  args: {
    onChange: (value: string) => console.log('selected option: ', value),
    type: 'standalone',
    standaloneRadioValue: 'A',
  },
};

export const NimbleStandaloneRadioWithChecked = {
  args: {
    onChange: (value: string) => console.log('selected option: ', value),
    type: 'standalone',
    standaloneRadioValue: 'A',
    defaultValue: 'A',
  },
};
