import type {Meta} from '@storybook/react';

import NimbleGaugeChart from '../src/components/nimbleGaugeChart/NimbleGaugeChart';

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
    value: 80,
    gaugeColor: '#1194a8',
    chartHeight: 300,
    title: 'Fase 1',
    titleFontSize: '14px',
    amount: '$320k',
    amountFont: '',
    amountFontSize: '28px',
    variance: 50000,
    varianceFont: '',
    varianceFontSize: '16px',
    variancePositiveColor: 'green',
    varianceNegativeColor: 'red',
    description: 'Fase 1 - Grandexploitatie',
    descriptionFont: '',
    descriptionFontSize: '14px',
    maxValue: 100,
  },
};
