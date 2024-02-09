import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleBasicDataTable} from '../src';
import moment from 'moment';

const NimbleBasicDataTableStory: Meta<typeof NimbleBasicDataTable> = {
  title: 'Nimble Desktop Design/Nimble Basic Data Table',
  component: NimbleBasicDataTable,
  parameters: {
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleBasicDataTableStory;

export const NimbleBasicDataTableStoryDefault = {
  args: {
    onChangeColumnFilters: (filterData: any) => {
      console.log(filterData);
    },
    columns: [
      {label: 'Date', key: 'date', width: '15%', sort: true},
      {label: 'User', key: 'user', width: '20%', sort: true},
      {label: 'Comment', key: 'comment', sort: true},
    ],
    rows: [
      {
        id: '1',
        date: moment(new Date().setDate(20)).format('YYYY-MM-DD'),
        user: 'Sendra Thronhill',
        comment: 'This lead is passed to Sandra Thronhill',
      },
      {
        id: '2',
        date: moment(new Date().setFullYear(2020)).format('YYYY-MM-DD'),
        user: 'sandra Thronhill',
        comment:
          'This lead is passed to Roel defGraaf This lead is passed to Sandra Thronhill This lead is passed to Sandra Thronhill This lead is passed to Sandra Thronhill This lead is passed to Sandra Thronhill',
      },
      {
        id: '3',
        date: moment(new Date().setMonth(8)).format('YYYY-MM-DD'),
        user: 'Waieneke Goud',
        comment: 'zesta do rico',
      },
      {
        id: '4',
        date: moment(new Date().setDate(9)).format('YYYY-MM-DD'),
        user: 'Wzeneke Goud',
        comment: 'zesta do rico',
      },
    ],
    selectedRows: [{id: '1'}],
  },
};

export const NimbleBasicDataTableStoryWithPagination = {
  args: {
    columns: [
      {label: 'Date', key: 'date', width: '15%', sort: true},
      {label: 'User', key: 'user', width: '20%', sort: true},
      {label: 'Comment', key: 'comment', sort: true},
    ],
    rows: [
      {
        id: '1',
        date: moment(new Date().setDate(20)).format('YYYY-MM-DD'),
        user: 'Sendra Thronhill',
        comment: 'This lead is passed to Sandra Thronhill',
      },
      {
        id: '2',
        date: moment(new Date().setFullYear(2020)).format('YYYY-MM-DD'),
        user: 'sandra Thronhill',
        comment:
          'This lead is passed to Roel defGraaf This lead is passed to Sandra Thronhill This lead is passed to Sandra Thronhill This lead is passed to Sandra Thronhill This lead is passed to Sandra Thronhill',
      },
      {
        id: '3',
        date: moment(new Date().setMonth(8)).format('YYYY-MM-DD'),
        user: 'Waieneke Goud',
        comment: 'zesta do rico',
      },
      {
        id: '4',
        date: moment(new Date().setDate(9)).format('YYYY-MM-DD'),
        user: 'Wzeneke Goud',
        comment: 'zesta do rico',
      },
    ],
    paginationData: {
      totalPage: 10,
      page: 4,
      onPageChnage: (event: any, value: number) => {
        alert(value);
      },
    },
    clickCustomPagination: value => {
      alert(value);
    },
  },
};
