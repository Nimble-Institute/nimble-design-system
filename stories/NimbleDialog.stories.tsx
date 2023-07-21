import React from 'react';
import type {Meta} from '@storybook/react';
import SaveIcon from '@mui/icons-material/Save';

import {NimbleDialog} from '../src';

const NimbleDialogStory: Meta<typeof NimbleDialog> = {
  title: 'Nimble Desktop Design/Nimble Dialog',
  component: NimbleDialog,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleDialogStory;

export const NimbleBasicDialog = {
  args: {
    open: false,
    title: 'This Is Simple Dialog Title',
    primaryColor: '#0057A2',
    parimaryActionLabel: 'Save',
    primaryActionIcon: <SaveIcon />,
    secondaryActionlabel: 'Back',
    metaData: {
      id: 1,
      name: 'Manoj',
    },
    onClickSecondaryAction: () => {
      alert('secondary action click ');
    },
    onClickPrimaryAction: () => {
      alert('Primary Action ');
    },
    maxWidth: 'sm',
  },
};

export const NimbleBasicDialogWithTopActions = {
  args: {
    open: false,
    title: 'Dialog With Top Actions',
    primaryColor: '#0057A2',
    parimaryActionLabel: 'Save',
    secondaryActionlabel: 'Back',
    metaData: {
      id: 1,
      name: 'Manoj',
    },
    onClickSecondaryAction: () => {
      alert('secondary action click ');
    },
    onClickPrimaryAction: () => {
      alert('Primary Action ');
    },
    maxWidth: 'sm',
    topActionPanel: true,
    topActionPanalData: [
      {
        label: 'Restore',
        variant: 'outlined',
        size: 'small',
        color: '#0057A2',
      },
      {
        label: 'Delete',
        variant: 'contained',
        size: 'small',
        color: '#E3000A',
      },
    ],
  },
};

export const NimbleBasicDialogWithTopActionsDisabled = {
  args: {
    open: false,
    title: 'Dialog With Top Actions',
    primaryColor: '#0057A2',
    parimaryActionLabel: 'Save',
    secondaryActionlabel: 'Back',
    metaData: {
      id: 1,
      name: 'Manoj',
    },
    onClickSecondaryAction: () => {
      alert('secondary action click ');
    },
    onClickPrimaryAction: () => {
      alert('Primary Action ');
    },
    maxWidth: 'sm',
    topActionPanel: true,
    topActionPanalData: [
      {
        label: 'Archive',
        variant: 'contained',
        size: 'small',
        color: '#0057A2',
        disabled: true,
      },
    ],
  },
};

export const NimbleBasicDialogMainActionInProgress = {
  args: {
    open: false,
    title: 'This Is Simple Dialog Title',
    primaryColor: '#0057A2',
    parimaryActionLabel: 'Save',
    secondaryActionlabel: 'Back',
    mainActionInProgress: true,
    metaData: {
      id: 1,
      name: 'Manoj',
    },
    onClickSecondaryAction: () => {
      alert('secondary action click ');
    },
    onClickPrimaryAction: () => {
      alert('Primary Action ');
    },
    maxWidth: 'sm',
  },
};

export const NimbleBasicDialogSecondaryAction = {
  args: {
    open: false,
    title: 'This Is Simple Dialog Title',
    primaryColor: '#0057A2',
    parimaryActionLabel: 'Save',
    secondaryActionlabel: 'Back',
    isSecondaryActionAvailable: true,
    mainActionInProgress: false,
    metaData: {
      id: 1,
      name: 'Manoj',
    },
    onClickSecondaryAction: () => {
      alert('secondary action click ');
    },
    onClickPrimaryAction: () => {
      alert('Primary Action ');
    },
    maxWidth: 'sm',
  },
};
