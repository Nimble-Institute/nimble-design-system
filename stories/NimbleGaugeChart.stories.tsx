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
    chartHeight: 300,
    title: 'Fase 1',
    titleFontSize: '14px',
    chartValue: 320000,
    amountLabel: '$320K',
    amountFontSize: '28px',
    variance: -60000,
    varianceFontSize: '16px',
    description: 'Fase 1 - Grandexploitatie',
    descriptionFontSize: '14px',
    maxValue: 400000,
    threshold: 380000,
  },
};

export const GaugeChartThresholdLessthanChartValue = {
  args: {
    gaugeColor: '#df10f1',
    chartHeight: 300,
    title: 'Fase 2',
    titleFontSize: '14px',
    chartValue: 320000,
    amountLabel: '$320K',
    amountFontSize: '28px',
    variance: 20000,
    varianceFontSize: '16px',
    description: 'Fase 2 - Grandexploitatie',
    descriptionFontSize: '14px',
    maxValue: 400000,
    threshold: 300000,
  },
};

export const GaugeChartNoThresholdValue = {
  args: {
    gaugeColor: '#58ae2f',
    chartHeight: 300,
    title: 'Fase 3',
    titleFontSize: '14px',
    chartValue: 320000,
    amountLabel: '$320K',
    amountFontSize: '28px',
    varianceFontSize: '16px',
    description: 'Fase 3 - Grandexploitatie',
    descriptionFontSize: '14px',
    maxValue: 400000,
  },
};
