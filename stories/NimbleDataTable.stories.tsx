import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleDataTable} from '../src';

const NimbleDataTableStory: Meta<typeof NimbleDataTable> = {
  title: 'Nimble Design/Nimble Data Table',
  component: NimbleDataTable,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleDataTableStory;

export const Datatable = {
  args: {
    columnData: [
      {
        label: 'Name',
        dataPoint: 'name',
        sort: true,
        filter: true,
        width: '20%',
      },
      {
        label: 'Email',
        dataPoint: 'email',
        sort: true,
        filter: true,
        width: '30%',
      },
      {
        label: 'User Roles',
        dataPoint: 'roles',
        sort: true,
        filter: true,
        width: '20%',
      },
      {
        label: 'Autherization',
        dataPoint: 'autherization',
        sort: true,
        filter: true,
        width: '20%',
      },
    ],
  },
};

// label: string;
//   dataPoint?: string;
//   sort?: boolean;
//   filter?: boolean;
//   component?: any;
//   width?: string;
