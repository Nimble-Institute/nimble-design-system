import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleSelect} from '../src';

const NimbleSelectStory: Meta<typeof NimbleSelect> = {
  title: 'Nimble Form Inputs/Nimble Select',
  component: NimbleSelect,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleSelectStory;

export const NimbleBasicSelect = {
  args: {
    label: 'Nimble Selection',
    width: '500px',
    data: [
      {label: 'Manoj Gamachchige', value: '1'},
      {label: 'Rylie Gamachchige', value: '2'},
      {label: 'Madu Gamachchige', value: '3'},
      {label: 'Anuja Ulpathakubura', value: '4'},
      {label: 'Archan Udaranga', value: '5'},
    ],
    // defaultValue: '1',
    onChange: value => alert(value),
  },
};

export const NimbleSelectWithDeafult = {
  args: {
    label: 'Nimble Selection',
    width: '500px',
    data: [
      {label: 'Manoj Gamachchige', value: '1'},
      {label: 'Rylie Gamachchige', value: '2'},
      {label: 'Madu Gamachchige', value: '3'},
      {label: 'Anuja Ulpathakubura', value: '4'},
      {label: 'Archan Udaranga', value: '5'},
    ],
    defaultValue: '1',
    onChange: value => alert(value),
  },
};

export const NimbleSelectRequired = {
  args: {
    label: 'Nimble Selection',
    width: '500px',
    data: [
      {label: 'Manoj Gamachchige', value: '1'},
      {label: 'Rylie Gamachchige', value: '2'},
      {label: 'Madu Gamachchige', value: '3'},
      {label: 'Anuja Ulpathakubura', value: '4'},
      {label: 'Archan Udaranga', value: '5'},
    ],
    isRequired: true,
    onChange: value => alert(value),
  },
};

export const NimbleSelectError = {
  args: {
    label: 'Nimble Selection',
    width: '500px',
    data: [
      {label: 'Manoj Gamachchige', value: '1'},
      {label: 'Rylie Gamachchige', value: '2'},
      {label: 'Madu Gamachchige', value: '3'},
      {label: 'Anuja Ulpathakubura', value: '4'},
      {label: 'Archan Udaranga', value: '5'},
    ],
    isError: true,
    errorMessage: 'Please select user',
    onChange: value => alert(value),
  },
};

export const NimbleSelectDiabled = {
  args: {
    label: 'Nimble Selection',
    width: '500px',
    data: [
      {label: 'Manoj Gamachchige', value: '1'},
      {label: 'Rylie Gamachchige', value: '2'},
      {label: 'Madu Gamachchige', value: '3'},
      {label: 'Anuja Ulpathakubura', value: '4'},
      {label: 'Archan Udaranga', value: '5'},
    ],
    disabled: true,
    onChange: value => alert(value),
  },
};
