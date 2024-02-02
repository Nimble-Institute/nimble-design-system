import {create} from '@storybook/theming/create';

export default create({
  base: 'dark',
  brandTitle: 'Nimble Design System',
  brandUrl: 'https://nimble.expert/',
  brandImage: 'https://nimble.expert/previews/2022/9/21/media_1029_651903_w1200_crop.png',
  brandTarget: '_self',

  //
  colorPrimary: '#0C1B2A',
  colorSecondary: '#585C6D',

  // UI
  appBg: '#0C1B2A',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#585C6D',
  appBorderRadius: 4,

  // Text colors
  textColor: '#9AC03A',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#585C6D',
  barBg: '#0C1B2A',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#10162F',
  inputTextColor: '#10162F',
  inputBorderRadius: 2,
});
