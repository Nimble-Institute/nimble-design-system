import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleInput} from '../src';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NimbleInputStory: Meta<typeof NimbleInput> = {
  title: 'Nimble Form Inputs/Nimble Input',
  component: NimbleInput,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleInputStory;

export const NimbleBasicInput = {
  args: {
    label: 'Basic Input',
    placeholder: 'Enter your input here',
    width: '500px',
    onBlur: () => console.log('On Blur call'),
  },
};

export const NimblePasswordInput = {
  args: {
    label: 'Password Input',
    placeholder: 'Enter your password',
    width: '500px',
    type: 'password',
  },
};

export const NimbleSearchInput = {
  args: {
    label: 'Search Input',
    placeholder: 'Enter username for search',
    width: '500px',
    type: 'search',
  },
};

export const NimbleBasicInputWithIcon = {
  args: {
    label: 'Input With Icon',
    placeholder: 'Enter Username',
    width: '500px',
    startIcon: <AccountCircleIcon />,
  },
};

export const NimbleBasicInputWithHelperText = {
  args: {
    label: 'Basic Input',
    placeholder: 'Enter your input here',
    width: '500px',
    helperText: 'Please add your full name here',
  },
};

export const NimbleBasicInputWithError = {
  args: {
    label: 'Basic Input error stage',
    placeholder: 'Enter your input here',
    width: '500px',
    isError: true,
    errorMessage: 'invalid username type',
  },
};

export const NimbleBasicInputWithDefaultvalue = {
  args: {
    label: 'Basic Input with default value',
    placeholder: 'Enter Name',
    width: '500px',
    defaultValue: 'Manoj Gamachchige',
  },
};

export const NimbleBasicInputOnChange = {
  args: {
    label: 'Basic Input ',
    placeholder: 'Enter Name',
    width: '500px',
    onChange: value => alert(value),
  },
};

export const NimbleBasicInputDisabled = {
  args: {
    label: 'Basic Diabled Input ',
    placeholder: 'Enter Name',
    width: '500px',
    disabled: true,
  },
};

export const NimbleTextArea = {
  args: {
    label: 'Basic Textarea',
    placeholder: 'Enter Details',
    width: '500px',
    multiline: true,
    rowCount: 4,
  },
};

export const NimbleTextAreaWithMaxLength = {
  args: {
    label: 'Basic Textarea',
    placeholder: 'Enter Details',
    width: '500px',
    multiline: true,
    rowCount: 4,
    maxLength: 100,
    showCharCount: true,
  },
};
