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
    data: [
      {name: 'A', value: 30, color: '#1194a8'},
      // {name: 'B', value: 15, color: '#ffffff'},// should calculate based on max and current
    ],
    chartHeight: 300,
    title: 'Fase 1',
    amount: '$320k',
    variance: 5000,
    description: 'Fase 1 - Grandexploitatie dfasdf asdfasdf',
    variancePositiveColor: 'green',
    varianceNegativeColor: 'red',
    amountOffset: -40,
    varianceOffset: -3,
  },
};
