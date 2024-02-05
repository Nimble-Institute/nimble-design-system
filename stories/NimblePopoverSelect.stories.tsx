import React from 'react';
import type {Meta} from '@storybook/react';

import {NimblePopoverSelect} from '../src';
import CheckIcon from '@mui/icons-material/Check';

const NimblePopoverSelectSrtory: Meta<typeof NimblePopoverSelect> = {
  title: 'Nimble Desktop Design/Nimble Popover Select',
  component: NimblePopoverSelect,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimblePopoverSelectSrtory;

export const NimbleBasicPopoverSelect = {
  args: {
    placeholder: 'Approved',
    color: '#0cc619',
    id: '123',
    data: [
      {label: 'Approved', value: '1'},
      {label: 'Billed', value: '2'},
      {label: 'Preliminary', value: '3'},
      {label: 'Rejected', value: '4'},
    ],
    selectedValue: '3',
    onChange: value => {
      console.log(value);
    },
  },
};

export const NimbleBasicPopoverSelectWithIcon = {
  args: {
    placeholder: 'Approved',
    startIcon: <CheckIcon />,
    color: '#0cc619',
    id: '123',
    data: [
      {label: 'Approved', value: '1'},
      {label: 'Billed', value: '2'},
      {label: 'Preliminary', value: '3'},
      {label: 'Rejected', value: '4'},
    ],
    onChange: value => {
      console.log(value);
    },
  },
};
