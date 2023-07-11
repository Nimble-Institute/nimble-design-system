import {styled} from '@mui/system';
import {Button, Box, Typography} from '@mui/material';
import {darken, lighten} from 'polished';

interface ButtonProps {
  buttoncolor: string;
}

interface TitleProps {
  fontFamily?: string;
}

const TitleWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Title = styled(Typography)(({fontFamily}: TitleProps) => ({
  fontSize: '25px',
  fontWeight: '600',
  color: '#2B3645',
  lineHeight: 'normal',
  letterSpacing: '0.52px',
  fontFamily: fontFamily,
}));

const PrimaryActionButton = styled(Button)(({buttoncolor}: ButtonProps) => ({
  paddingLeft: '20px',
  paddingRight: '20px',
  backgroundColor: buttoncolor,
  ':hover': {
    backgroundColor: darken(0.05, buttoncolor),
  },
  maxHeight: '30px',
  textTransform: 'none',
}));

const SecondaryActionButton = styled(Button)(({buttoncolor}: ButtonProps) => ({
  paddingLeft: '20px',
  paddingRight: '20px',
  maxHeight: '30px',
  border: `1px solid ${buttoncolor}`,
  color: buttoncolor,
  ':hover': {
    border: `1px solid ${darken(0.05, buttoncolor)}`,
    color: darken(0.05, buttoncolor),
    backgroundColor: lighten(0.6, buttoncolor),
  },
  textTransform: 'none',
}));

const TextActionButton = styled(Button)(({buttoncolor}: ButtonProps) => ({
  maxHeight: '30px',
  color: buttoncolor,
  textTransform: 'none',
}));

export {PrimaryActionButton, SecondaryActionButton, TextActionButton, TitleWrapper, Title};
