import React from 'react';
import type {Meta} from '@storybook/react';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import {NimbleButton} from '../src';

const NimbleButtonStory: Meta<typeof NimbleButton> = {
  title: 'Nimble Design/Nimble Button',
  component: NimbleButton,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleButtonStory;

export const NimbleContainedButton = {
  args: {
    label: 'Contained Button',
    variant: 'contained',
    size: 'small',
  },
};

export const NimbleContainedIconButton = {
  args: {
    label: 'Contained Button',
    variant: 'contained',
    size: 'small',
    startIcon: <VerifiedUserIcon />,
  },
};

export const NimbleOutlinedButton = {
  args: {
    label: 'Outlined Button',
    variant: 'outlined',
    size: 'small',
  },
};

export const NimbleOutlinedIconButton = {
  args: {
    label: 'Outlined Button',
    variant: 'outlined',
    size: 'small',
    startIcon: <VerifiedUserIcon />,
  },
};

export const NimbleTextButton = {
  args: {
    label: 'Text Button',
    variant: 'text',
    size: 'small',
  },
};