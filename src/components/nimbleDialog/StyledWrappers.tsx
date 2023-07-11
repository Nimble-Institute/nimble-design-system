import {styled} from '@mui/system';
import {Button, Box, Typography} from '@mui/material';
import {darken, lighten} from 'polished';

interface ButtonProps {
  buttonColor: string;
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

const PrimaryActionButton = styled(Button)(({buttonColor}: ButtonProps) => ({
  paddingLeft: '20px',
  paddingRight: '20px',
  backgroundColor: buttonColor,
  ':hover': {
    backgroundColor: darken(0.05, buttonColor),
  },
  maxHeight: '30px',
  textTransform: 'none',
}));

const SecondaryActionButton = styled(Button)(({buttonColor}: ButtonProps) => ({
  paddingLeft: '20px',
  paddingRight: '20px',
  maxHeight: '30px',
  border: `1px solid ${buttonColor}`,
  color: buttonColor,
  ':hover': {
    border: `1px solid ${darken(0.05, buttonColor)}`,
    color: darken(0.05, buttonColor),
    backgroundColor: lighten(0.6, buttonColor),
  },
  textTransform: 'none',
}));

const TextActionButton = styled(Button)(({buttonColor}: ButtonProps) => ({
  maxHeight: '30px',
  color: buttonColor,
  textTransform: 'none',
}));

export {PrimaryActionButton, SecondaryActionButton, TextActionButton, TitleWrapper, Title};
