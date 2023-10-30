import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleStepper} from '../src';

const NimbleStepperStory: Meta<typeof NimbleStepper> = {
  title: 'Nimble Desktop Design/Nimble Stepper',
  component: NimbleStepper,
  parameters: {
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleStepperStory;

export const NimbleBasicStepperStory = {
  args: {
    steps: ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'],
    activeStep: 1,
    alternativeLabel: true,
  },
};

export const NimbleBasicStepperStoryWithCompletedStep = {
  args: {
    steps: ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'],
    activeStep: 2,
    alternativeLabel: true,
  },
};
