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
        component: (item: any) => (
          <div
            style={{
              display: 'flex',
              width: '50%',
              flexDirection: 'row',
              height: '20px',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0057A2',
              borderRadius: '5px',
              color: '#fff',
            }}>
            {item.autherization}
          </div>
        ),
      },
    ],
    data: [
      {
        name: 'Manoj Gamachchige',
        email: 'manoj@nimble.com',
        roles: 'admin',
        autherization: 'user',
      },
      {
        name: 'Rylie Gamachchige',
        email: 'rylie.amelia@gmail.com',
        roles: 'admin',
        autherization: 'user',
      },
      {
        name: 'Anuja Ulpathakubura',
        email: 'anuja@nimble.com',
        roles: 'admin',
        autherization: 'user',
      },
      {
        name: 'Max.L',
        email: 'max@nimble.com',
        roles: 'super-admin',
        autherization: 'super',
      },
    ],
    paginationData: {
      totalPage: 10,
      page: 3,
      onPageChnage: (event: any, value: number) => {
        alert(value);
      },
    },
    dataViewEnable: false,
    dataDeleteEnable: true,
    dataEditEnable: true,
    onChangeSearchText: searchvalue => {
      alert(searchvalue);
    },
    searchPlaceHolder: 'boom',
    mainActionLabel: 'Add some Data',
    onChangeColumnFilters: (value, dataPoint) => {
      alert(value + '-' + dataPoint);
    },
  },
};
