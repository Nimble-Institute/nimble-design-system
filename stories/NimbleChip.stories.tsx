import React from 'react';
import type {Meta} from '@storybook/react';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';

import {NimbleChip} from '../src';

const NimbleChipStory: Meta<typeof NimbleChip> = {
  title: 'Nimble Desktop Design/Nimble Chip',
  component: NimbleChip,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleChipStory;

export const NimbleChipMedium = {
  args: {
    label: 'Edou Snoek',
    size: 'medium',
  },
};

export const NimbleChipIcon = {
  args: {
    label: 'Definitief',
    icon: <ArrowCircleDownOutlinedIcon />,
  },
};

export const NimbleChipFontAndBackgroundColors = {
  args: {
    label: 'Definitief',
    backgroundColor: '#9FC540',
    fontColor: '#0C1B2A',
  },
};

export const NimbleChipFontWeightAndSize = {
  args: {
    label: 'Concept',
    fontWeight: 600,
    fontSize: '18px',
    size: 'medium',
  },
};

export const NimbleChipFontFamily = {
    args: {
      label: 'Status',
      fontFamily: 'system-ui'
    },
  };