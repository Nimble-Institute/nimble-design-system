import React from 'react';
import type {Meta} from '@storybook/react';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import {NimbleButton} from '../src';

const NimbleButtonStory: Meta<typeof NimbleButton> = {
  title: 'Nimble Form Inputs/Nimble Button',
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

export const NimbleContainedStartIconButton = {
  args: {
    label: 'Contained Button',
    variant: 'contained',
    size: 'small',
    startIcon: <VerifiedUserIcon />,
    onClick: () => alert(),
  },
};

export const NimbleContainedEndIconButton = {
  args: {
    label: 'Contained Button',
    variant: 'contained',
    size: 'small',
    endIcon: <VerifiedUserIcon />,
    onClick: () => alert(),
  },
};

export const NimbleContainedLoadingButton = {
  args: {
    label: 'Contained Button',
    variant: 'contained',
    size: 'small',
    loading: true,
    onClick: () => alert(),
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

export const NimbleOutlinedStartAndEndIconButton = {
  args: {
    label: 'Outlined Button',
    variant: 'outlined',
    size: 'small',
    startIcon: <VerifiedUserIcon />,
    endIcon: <CheckCircleOutlineIcon />,
  },
};

export const NimbleTextButton = {
  args: {
    label: 'Text Button',
    variant: 'text',
    size: 'small',
  },
};

export const NimbleIconButton = {
  args: {
    variant: 'icon',
    size: 'small',
    icon: <VerifiedUserIcon />,
  },
};
