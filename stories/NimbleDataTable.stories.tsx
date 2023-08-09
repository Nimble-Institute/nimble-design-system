import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleDataTable} from '../src';

const NimbleDataTableStory: Meta<typeof NimbleDataTable> = {
  title: 'Nimble Desktop Design/Nimble Data Table',
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
        filterType: 'select',
        customFilterSelections: [
          {
            label: 'super-admin',
            value: '1',
          },
          {
            label: 'admin',
            value: '2',
          },
        ],
      },
      {
        label: 'Autherization',
        dataPoint: 'autherization',
        sort: true,
        filter: true,
        width: '20%',
        filterType: 'select',
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
    onChangeSearchText: searchvalue => {
      alert(searchvalue);
    },
    searchPlaceHolder: 'Search user data',
    mainActionLabel: 'Add Some Data',
    onChangeColumnFilters: (data: {[key: string]: string}) => {
      console.log(data);
    },

    rowActions: [
      {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.11328 4.95999L7.99995 8.36666L13.8466 4.97999M7.99995 14.4067V8.35999"
              stroke="#9FC540"
              stroke-width="0.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.4066 8.55334V6.11334C14.4066 5.19334 13.7466 4.07334 12.9399 3.62668L9.37993 1.65334C8.61993 1.22668 7.37993 1.22668 6.61993 1.65334L3.05993 3.62668C2.25326 4.07334 1.59326 5.19334 1.59326 6.11334V9.88668C1.59326 10.8067 2.25326 11.9267 3.05993 12.3733L6.61993 14.3467C6.99993 14.56 7.49993 14.6667 7.99993 14.6667C8.49993 14.6667 8.99993 14.56 9.37993 14.3467"
              stroke="#9FC540"
              stroke-width="0.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.3332 14.6667L14.6665 14M12.7998 14.2667C13.3656 14.2667 13.9083 14.0419 14.3083 13.6418C14.7084 13.2418 14.9332 12.6991 14.9332 12.1333C14.9332 11.5675 14.7084 11.0249 14.3083 10.6248C13.9083 10.2248 13.3656 10 12.7998 10C12.234 10 11.6914 10.2248 11.2913 10.6248C10.8913 11.0249 10.6665 11.5675 10.6665 12.1333C10.6665 12.6991 10.8913 13.2418 11.2913 13.6418C11.6914 14.0419 12.234 14.2667 12.7998 14.2667Z"
              stroke="#9FC540"
              stroke-width="0.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
        onClick: (item: any) => alert('Action 01 click'),
      },
      {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_14_3499)">
              <path
                d="M7.3335 1.33334H6.00016C2.66683 1.33334 1.3335 2.66668 1.3335 6.00001V10C1.3335 13.3333 2.66683 14.6667 6.00016 14.6667H10.0002C13.3335 14.6667 14.6668 13.3333 14.6668 10V8.66668"
                stroke="#536891"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.6933 2.01332L5.43992 7.26665C5.23992 7.46665 5.03992 7.85999 4.99992 8.14665L4.71325 10.1533C4.60659 10.88 5.11992 11.3867 5.84659 11.2867L7.85325 11C8.13325 10.96 8.52659 10.76 8.73325 10.56L13.9866 5.30665C14.8933 4.39999 15.3199 3.34665 13.9866 2.01332C12.6533 0.679985 11.5999 1.10665 10.6933 2.01332Z"
                stroke="#536891"
                stroke-width="0.9"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.93994 2.76666C10.161 3.55164 10.5799 4.26671 11.1566 4.84336C11.7332 5.42001 12.4483 5.83894 13.2333 6.06"
                stroke="#536891"
                stroke-width="0.9"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_14_3499">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
        onClick: (item: any) => alert('Action 02 click'),
      },
      {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 3.98668C11.78 3.76668 9.54667 3.65334 7.32 3.65334C6 3.65334 4.68 3.72001 3.36 3.85334L2 3.98668M5.66667 3.31334L5.81333 2.44001C5.92 1.80668 6 1.33334 7.12667 1.33334H8.87333C10 1.33334 10.0867 1.83334 10.1867 2.44668L10.3333 3.31334M12.5667 6.09334L12.1333 12.8067C12.06 13.8533 12 14.6667 10.14 14.6667H5.86C4 14.6667 3.94 13.8533 3.86667 12.8067L3.43333 6.09334M6.88667 11H9.10667M6.33333 8.33334H9.66667"
              stroke="#EC4C29"
              stroke-width="0.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
        onClick: (item: any) => alert('Action 03 click'),
      },
    ],
  },
};
