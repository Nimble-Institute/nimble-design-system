import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleInputField} from '../src';

const NimbleInputFieldStory: Meta<typeof NimbleInputField> = {
  title: 'Nimble Design/NimbleInput',
  component: NimbleInputField,
};

export default NimbleInputFieldStory;

export const TextInput = {
  args: {
    type: 'text',
    label: 'Text Input',
    colors: {
      borderColor: '#9A9FA5',
      boxShadow: '0px 1px 4px rgba(39, 47, 53, 0.08);',
      activeBorderColor: '#DBF2FB',
      activeBoxShadow: '0px 0px 0px 2px #DBF2FB, inset 0px 0px 0px 1px #77CBED',
    },
  },
};
