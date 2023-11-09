import type {Meta} from '@storybook/react';

import {NimbleDatePicker} from '../src';

const NimbleDatePickerStory: Meta<typeof NimbleDatePicker> = {
  title: 'Nimble Form Inputs/Nimble Date Picker',
  component: NimbleDatePicker,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleDatePickerStory;

export const DatePicker = {
  args: {
    label: 'Select Date',
    labelSize: 14,
    labelWeight: '600',
    borderColor: '#9A9FA5',
    activeBoxShadow: '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
    hoverBoxShadow: '0px 0px 0px 2px #dae3f0',
    onDateChange: date => console.log('selected dates', date),
    onBlur: () => console.log('Blur'),
    width: '288px',
  },
};

export const DatePickerWithDefaultValue = {
  args: {
    label: 'Select Date',
    labelSize: 14,
    labelWeight: '600',
    borderColor: '#9A9FA5',
    activeBoxShadow: '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
    hoverBoxShadow: '0px 0px 0px 2px #dae3f0',
    onDateChange: dates => console.log('selected dates', dates),
    defaultValue: '2023-09-02',
    width: '288px',
  },
};

export const DatePickerDiablePast = {
  args: {
    label: 'Select Date',
    labelSize: 14,
    labelWeight: '600',
    borderColor: '#9A9FA5',
    activeBoxShadow: '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
    hoverBoxShadow: '0px 0px 0px 2px #dae3f0',
    onDateChange: dates => console.log('selected dates', dates),
    disablePast: true,
    width: '288px',
  },
};

export const DatePickerMinimumSelectableDate = {
  args: {
    label: 'Select Date',
    labelSize: 14,
    labelWeight: '600',
    borderColor: '#9A9FA5',
    activeBoxShadow: '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
    hoverBoxShadow: '0px 0px 0px 2px #dae3f0',
    onDateChange: dates => console.log('selected dates', dates),
    minDate: new Date().setDate(new Date().getDate() + 3),
    width: '288px',
  },
};