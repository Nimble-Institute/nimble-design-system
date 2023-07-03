import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleDateRange} from '../src';

const NimbleDateRangeStory: Meta<typeof NimbleDateRange> = {
  title: 'Nimble Design/Nimble Date Range',
  component: NimbleDateRange,
  parameters: {
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleDateRangeStory;

export const DateRange = {
  args: {
    label: 'Select Date Range',
    labelSize: 14,
    labelWeight: '600',
    borderColor: '#9A9FA5',
    activeBoxShadow: '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
    hoverBoxShadow: '0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #50606B inset',
  },
};
