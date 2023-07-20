import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleMobileSearch} from '../src';

const NimbleMobileSearchStory: Meta<typeof NimbleMobileSearch> = {
  title: 'Nimble Mobile Design/Nimble Mobile Search',
  component: NimbleMobileSearch,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleMobileSearchStory;

export const NimbleBasicMobileSearch = {
  args: {
    placeholder: 'Search name or email...',
    isPrimaryActionAvailable: true,
    onSearch: (searchvalue: string) => alert(searchvalue),
    primaryColor: '#DF8430',
  },
};

export const NimbleBasicMobileSearchWithoutAction = {
  args: {
    placeholder: 'Search name or email...',
    isPrimaryActionAvailable: false,
    onSearch: (searchvalue: string) => alert(searchvalue),
  },
};

export const NimbleBasicMobileSearchDiabled = {
  args: {
    placeholder: 'Search name or email...',
    isPrimaryActionAvailable: true,
    onSearch: (searchvalue: string) => alert(searchvalue),
    primaryColor: '#DF8430',
    searchDisabled: true,
    primaryActionDisabled: true,
  },
};
