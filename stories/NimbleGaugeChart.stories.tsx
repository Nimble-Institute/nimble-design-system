import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleGaugeChart} from '../src';

const NimbleGaugeChartStory: Meta<typeof NimbleGaugeChart> = {
  title: 'Nimble Design/Nimble Gauge Chart',
  component: NimbleGaugeChart,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleGaugeChartStory;

export const GaugeChart = {
  args: {
    label: 'Gauge Chart',
    labelSize: 14,
    labelWeight: '600',
  },
};

export const GaugeChartWithDefaultValue = {
  args: {
    label: 'Gauge Chart',
    labelSize: 14,
    labelWeight: '600',
  },
};
