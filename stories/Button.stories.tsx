import {Button} from '../src';

export default {
  title: 'Nimble Design/Button',
  component: Button,
};

const Template = args => ({
  //👇 Your template goes here
});

export const Primary = {
  args: {
    label: 'Press Me',
    variant: 'primary',
  },
};
