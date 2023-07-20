import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleSwitch} from '../src';

const NimbleSwitchStory: Meta<typeof NimbleSwitch> = {
  title: 'Nimble Form Inputs/Nimble Swicth',
  component: NimbleSwitch,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleSwitchStory;

export const NimbleSingleSwitch = {
  args: {
    label: 'Basic Switch',
    switchData: [
      {
        id: 1,
      },
    ],
  },
};

export const NimbleMultipleSwitches = {
  args: {
    label: 'Multiple Switches',
    multiple: true,
    switchData: [
      {
        id: 1,
        label: 'Action 01',
      },
      {
        id: 2,
        label: 'Action 02',
      },
      {
        id: 3,
        label: 'Action 03',
      },
    ],
    onChange: values => console.log(values),
  },
};

export const NimbleMultipleSwitchesWithDefaultValues = {
  args: {
    label: 'Multiple switches with default',
    multiple: true,
    switchData: [
      {
        id: 1,
        label: 'Action 01',
      },
      {
        id: 2,
        label: 'Action 02',
      },
      {
        id: 3,
        label: 'Action 03',
      },
    ],
    values: {
      1: false,
      2: true,
      3: true,
    },
    onChange: values => console.log(values),
  },
};

export const NimbleMultipleSwitchesOnChange = {
  args: {
    label: 'Multiple Switches',
    multiple: true,
    switchData: [
      {
        id: 1,
        label: 'Action 01',
      },
      {
        id: 2,
        label: 'Action 02',
      },
      {
        id: 3,
        label: 'Action 03',
      },
    ],
    values: {
      1: false,
      2: true,
      3: true,
    },
    onChange: values => alert(JSON.stringify(values)),
  },
};

export const NimbleSmallSwitches = {
  args: {
    label: 'Small Switches',
    multiple: true,
    size: 'small',
    switchData: [
      {
        id: 1,
        label: 'Action 01',
      },
      {
        id: 2,
        label: 'Action 02',
      },
      {
        id: 3,
        label: 'Action 03',
      },
    ],
    values: {
      1: false,
      2: true,
      3: true,
    },
    onChange: values => console.log(values),
  },
};
