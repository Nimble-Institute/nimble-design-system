import React from 'react';
import type {Meta} from '@storybook/react';

import {Nimbletab} from '../src';

const NimbletabStory: Meta<typeof Nimbletab> = {
  title: 'Nimble Design/Nimble Tab',
  component: Nimbletab,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbletabStory;

const ClientsActive = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.82031 8C3.82031 8 2.82031 9 2.82031 11V19C2.82031 21 3.82031 22 5.82031 22H13.8203C11.8203 22 10.8203 21 10.8203 19V8M5.82031 8H10.8203M5.82031 8V6C5.82031 4.9 6.72031 4 7.82031 4H10.9303C10.8503 4.3 10.8203 4.63 10.8203 5V8M14.8203 8V13M18.8203 8V13M6.82031 13V17M17.8203 17H15.8203C15.2703 17 14.8203 17.45 14.8203 18V22H18.8203V18C18.8203 17.45 18.3703 17 17.8203 17Z"
      stroke="#9FC540"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.8203 19V5C10.8203 3 11.8203 2 13.8203 2H19.8203C21.8203 2 22.8203 3 22.8203 5V19C22.8203 21 21.8203 22 19.8203 22H13.8203C11.8203 22 10.8203 21 10.8203 19Z"
      stroke="#9FC540"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Clients = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.82031 8C3.82031 8 2.82031 9 2.82031 11V19C2.82031 21 3.82031 22 5.82031 22H13.8203C11.8203 22 10.8203 21 10.8203 19V8M5.82031 8H10.8203M5.82031 8V6C5.82031 4.9 6.72031 4 7.82031 4H10.9303C10.8503 4.3 10.8203 4.63 10.8203 5V8M14.8203 8V13M18.8203 8V13M6.82031 13V17M17.8203 17H15.8203C15.2703 17 14.8203 17.45 14.8203 18V22H18.8203V18C18.8203 17.45 18.3703 17 17.8203 17Z"
      stroke="#0C1B2A"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.8203 19V5C10.8203 3 11.8203 2 13.8203 2H19.8203C21.8203 2 22.8203 3 22.8203 5V19C22.8203 21 21.8203 22 19.8203 22H13.8203C11.8203 22 10.8203 21 10.8203 19Z"
      stroke="#0C1B2A"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Users = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.8853 4.00072C18.8253 4.00072 20.3853 5.57072 20.3853 7.50072C20.3853 9.39072 18.8853 10.9307 17.0153 11.0007C16.9289 10.9907 16.8417 10.9907 16.7553 11.0007M18.8153 20.0007C19.5353 19.8507 20.2153 19.5607 20.7753 19.1307C22.3353 17.9607 22.3353 16.0307 20.7753 14.8607C20.2253 14.4407 19.5553 14.1607 18.8453 14.0007M9.63531 10.8707C9.53531 10.8607 9.41531 10.8607 9.30531 10.8707C8.15752 10.8318 7.06995 10.3476 6.27294 9.52068C5.47593 8.6938 5.03205 7.58918 5.03531 6.44072C5.03531 3.99072 7.01531 2.00072 9.47531 2.00072C10.6515 1.97951 11.788 2.42641 12.6348 3.24314C13.4815 4.05986 13.9691 5.17949 13.9903 6.35572C14.0115 7.53196 13.5646 8.66845 12.7479 9.51517C11.9312 10.3619 10.8115 10.8495 9.63531 10.8707ZM4.63531 14.5607C2.21531 16.1807 2.21531 18.8207 4.63531 20.4307C7.38531 22.2707 11.8953 22.2707 14.6453 20.4307C17.0653 18.8107 17.0653 16.1707 14.6453 14.5607C11.9053 12.7307 7.39531 12.7307 4.63531 14.5607V14.5607Z"
      stroke="#0C1B2A"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const UsersActive = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.8853 4.00072C18.8253 4.00072 20.3853 5.57072 20.3853 7.50072C20.3853 9.39072 18.8853 10.9307 17.0153 11.0007C16.9289 10.9907 16.8417 10.9907 16.7553 11.0007M18.8153 20.0007C19.5353 19.8507 20.2153 19.5607 20.7753 19.1307C22.3353 17.9607 22.3353 16.0307 20.7753 14.8607C20.2253 14.4407 19.5553 14.1607 18.8453 14.0007M9.63531 10.8707C9.53531 10.8607 9.41531 10.8607 9.30531 10.8707C8.15752 10.8318 7.06995 10.3476 6.27294 9.52068C5.47593 8.6938 5.03205 7.58918 5.03531 6.44072C5.03531 3.99072 7.01531 2.00072 9.47531 2.00072C10.6515 1.97951 11.788 2.42641 12.6348 3.24314C13.4815 4.05986 13.9691 5.17949 13.9903 6.35572C14.0115 7.53196 13.5646 8.66845 12.7479 9.51517C11.9312 10.3619 10.8115 10.8495 9.63531 10.8707ZM4.63531 14.5607C2.21531 16.1807 2.21531 18.8207 4.63531 20.4307C7.38531 22.2707 11.8953 22.2707 14.6453 20.4307C17.0653 18.8107 17.0653 16.1707 14.6453 14.5607C11.9053 12.7307 7.39531 12.7307 4.63531 14.5607V14.5607Z"
      stroke="#9FC540"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const NimbleBasicTabWithIcons = {
  args: {
    width: '500px',
    tabs: [
      {
        value: 1,
        label: 'Clients',
        activeImage: <ClientsActive />,
        inactiveImage: <Clients />,
      },
      {
        value: 2,
        label: 'Users',
        activeImage: <UsersActive />,
        inactiveImage: <Users />,
      },
    ],
  },
};

export const NimbleBasicTabWihInlineContent = {
  args: {
    width: '500px',
    showInlineContent: true,
    tabs: [
      {
        value: 1,
        label: 'Clients',
        activeImage: <ClientsActive />,
        inactiveImage: <Clients />,
        content: <div style={{paddingTop: '10px'}}>Client Tab Content</div>,
      },
      {
        value: 2,
        label: 'Users',
        activeImage: <UsersActive />,
        inactiveImage: <Users />,
        content: <div style={{paddingTop: '10px'}}>User Tab Content</div>,
      },
    ],
  },
};

export const NimbleBasicTab = {
  args: {
    width: '500px',
    tabs: [
      {
        value: 1,
        label: 'Clients',
      },
      {
        value: 2,
        label: 'Users',
      },
    ],
  },
};

export const NimbleBasicTabDifferentColor = {
  args: {
    width: '500px',
    color: '#344ceb',
    activeColor: '#ab34eb',
    tabs: [
      {
        value: 1,
        label: 'Clients',
      },
      {
        value: 2,
        label: 'Users',
      },
    ],
  },
};

export const NimbleBasicCardTypeTab = {
  args: {
    width: '500px',
    type: 'card',
    activeColor: '#FFF',
    activeCardColor: '#4b9447',
    inActiveCardColor: '#abbdaa',
    tabs: [
      {
        value: 1,
        label: 'Clients',
      },
      {
        value: 2,
        label: 'Users',
      },
    ],
  },
};
