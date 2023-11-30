import type {Meta} from '@storybook/react';

import {NimbleGaugeChart} from '../src';

const NimbleGaugeChartStory: Meta<typeof NimbleGaugeChart> = {
  title: 'Nimble Charts/Nimble Gauge Chart',
  component: NimbleGaugeChart,
  parameters: {
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleGaugeChartStory;

export const GaugeChartThresholdGreaterthanChartValue = {
  args: {
    gaugeColor: '#1194a8',
    title: 'Fase 1',
    titleFontSize: '14px',
    amount: 320000,
    amountLabel: '80%',
    amountFontSize: '28px',
    variance: '$320000/380000',
    varianceFontSize: '16px',
    description: 'Fase 1 - Grandexploitatie',
    descriptionFontSize: '14px',
    maxValue: 400000,
    threshold: 380000,
    segments: [
      {value: 50000, label: '50K'},
      {value: 100000, label: '100K'},
      {value: 150000, label: '150K'},
      {value: 200000, label: '200K'},
      {value: 250000, label: '250K'},
      {value: 300000, label: '300K'},
      {value: 350000, label: '350K'},
      {value: 380000, label: '380K'},
    ],
  },
};

export const GaugeChartThresholdLessthanChartValue = {
  args: {
    gaugeColor: '#df10f1',
    title: 'Fase 2',
    titleFontSize: '14px',
    amount: 320000,
    amountLabel: '110%',
    amountFontSize: '28px',
    variance: '$320K/$300k',
    varianceFontSize: '14px',
    description: 'Fase 2 - Grandexploitatie',
    descriptionFontSize: '14px',
    maxValue: 400000,
    threshold: 300000,
    segments: [
      {value: 0, label: '0'},
      {value: 100000, label: '100K'},
      {value: 200000, label: '200K'},
      {value: 300000, label: '300K'},
      {value: 400000, label: '400K'},
    ],
  },
};

export const GaugeChartNoThresholdValue = {
  args: {
    gaugeColor: '#58ae2f',
    title: 'Fase 3',
    titleFontSize: '14px',
    amount: 320000,
    amountLabel: '$320K',
    amountFontSize: '28px',
    varianceFontSize: '16px',
    description: 'Fase 3 - Grandexploitatie',
    descriptionFontSize: '14px',
    maxValue: 400000,
  },
};
