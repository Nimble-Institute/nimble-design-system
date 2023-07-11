import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleDialog} from '../src';

const NimbleDialogStory: Meta<typeof NimbleDialog> = {
  title: 'Nimble Design/Nimble Dialog',
  component: NimbleDialog,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleDialogStory;

export const NimbleBasicDialog = {
  args: {
    open: true,
    title: 'This Is Simple Dialog Title',
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
  },
};
