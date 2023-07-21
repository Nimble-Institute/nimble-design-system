import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleMobileListView} from '../src';

const NimbleMobileListViewStory: Meta<typeof NimbleMobileListView> = {
  title: 'Nimble Mobile Design/Nimble Mobile List View',
  component: NimbleMobileListView,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
    backgrounds: {
      default: 'mobile',
      values: [
        {
          name: 'mobile',
          value: '#FAFAFA',
        },
      ],
    },
  },
};

export default NimbleMobileListViewStory;

export const MobileListViewStory = {
  args: {
    onSearch: searchval => {
      alert(searchval);
    },
    sortLabel: 'Name',
    isEnableSearch: true,
    isEnableSort: true,
    onChangeSort: sort => {
      console.log(sort);
    },
    onClickPrimaryAction: () => {
      alert('Primary Action');
    },
    placeholder: 'Search name or email...',
    primaryColor: '#DF8430',
    isPrimaryActionAvailable: true,
    isEnableInfiniteScroll: true,
    scrollableParentHeight: '500px',
    dataLength: 10,
    loadNextPage: () => {
      alert('Load next page');
    },
    onDeleteItem: item => {
      alert(`Item delete- ${item.id}`);
    },
    onEditItem: item => {
      alert(`Item edit- ${item.id}`);
    },
    data: [
      {
        id: 1,
        mainValue: 'Manoj Gamachchige',
        details: [
          {
            label: 'Email',
            value: 'manoj.gamachchige@nimble.com',
          },
          {
            label: 'Role',
            value: 'Production',
            valueColor: '#DF8430',
          },
          {
            label: 'Authorization',
            component: <div>Admin</div>,
          },
        ],
      },
      {
        id: 2,
        mainValue: 'Rylie Gamachchige',
        details: [
          {
            label: 'Email',
            value: 'rylie.gamachchige@nimble.com',
          },
          {
            label: 'Role',
            value: 'Default',
            valueColor: '#e81590',
          },
          {
            label: 'Authorization',
            component: <div>User</div>,
          },
        ],
      },
      {
        id: 3,
        mainValue: 'Max Lagemann',
        details: [
          {
            label: 'Email',
            value: 'max@nimble.com',
          },
          {
            label: 'Role',
            value: 'Production',
            valueColor: '#DF8430',
          },
          {
            label: 'Authorization',
            component: <div>Admin</div>,
          },
        ],
      },
    ],
  },
};
