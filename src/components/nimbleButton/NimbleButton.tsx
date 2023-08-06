import React from 'react';

import {Button, CircularProgress} from '@mui/material';
import {styled} from '@mui/system';
import {darken, lighten} from 'polished';

interface ButtonProps {
  buttoncolor: string;
  fontFamily: string;
}

export interface NimbleButtonProps {
  label?: string;
  variant?: 'text' | 'outlined' | 'contained' | 'icon';
  size?: 'small' | 'medium' | 'large';
  color?: string;
  disabled?: boolean;
  startIcon?: any;
  loading?: boolean;
  icon?: any;
  onClick: () => void;
  fontFamily?: string;
}

const ContainedActionButton = styled(Button)(({buttoncolor, fontFamily}: ButtonProps) => ({
  paddingLeft: '12px !important',
  paddingRight: '12px !important',
  backgroundColor: buttoncolor,
  borderRadius: '5px',
  ':hover': {
    backgroundColor: darken(0.1, buttoncolor),
  },
  ':disabled': {
    backgroundColor: lighten(0.4, buttoncolor),
  },

  textTransform: 'none',
  fontFamily,
}));

const OutlinedActionButton = styled(Button)(({buttoncolor, fontFamily}: ButtonProps) => ({
  paddingLeft: '12px !important',
  paddingRight: '12px !important',
  borderRadius: '5px',
  textTransform: 'none',
  border: `1px solid ${buttoncolor}`,
  color: buttoncolor,
  fontFamily,
  ':hover': {
    border: `1px solid ${darken(0.1, buttoncolor)}`,
    color: darken(0.1, buttoncolor),
  },
  ':disabled': {
    border: `1px solid ${lighten(0.4, buttoncolor)}`,
    color: lighten(0.5, buttoncolor),
  },
}));

const TextActionButton = styled(Button)(({buttoncolor, fontFamily}: ButtonProps) => ({
  textTransform: 'none',
  paddingLeft: '12px !important',
  paddingRight: '12px !important',
  borderRadius: '5px',
  color: buttoncolor,
  fontFamily,
  ':disabled': {
    color: lighten(0.4, buttoncolor),
  },
}));

const IconButton = styled(Button)(({buttoncolor}: ButtonProps) => ({
  minWidth: '40px !important',
  borderRadius: '5px',
  backgroundColor: buttoncolor,
  ':hover': {
    backgroundColor: darken(0.1, buttoncolor),
  },
  ':disabled': {
    backgroundColor: lighten(0.4, buttoncolor),
  },
}));

export const NimbleButton: React.FC<NimbleButtonProps> = ({
  label,
  variant = 'contained',
  color = '#0057A2',
  size = 'small',
  disabled,
  startIcon,
  loading,
  onClick,
  icon,
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
}) => {
  const handleClick = () => {
    !loading && onClick();
  };
  switch (variant) {
    case 'contained':
      return (
        <ContainedActionButton
          variant={variant}
          buttoncolor={color}
          size={size}
          disabled={disabled}
          startIcon={loading ? <CircularProgress size={14} sx={{color: '#fff'}} /> : startIcon}
          onClick={handleClick}
          fontFamily={fontFamily}>
          {label}
        </ContainedActionButton>
      );
    case 'outlined':
      return (
        <OutlinedActionButton
          variant={variant}
          buttoncolor={color}
          size={size}
          disabled={disabled}
          startIcon={loading ? <CircularProgress size={14} /> : startIcon}
          onClick={handleClick}
          fontFamily={fontFamily}>
          {label}
        </OutlinedActionButton>
      );
    case 'text':
      return (
        <TextActionButton
          variant={variant}
          buttoncolor={color}
          size={size}
          disabled={disabled}
          startIcon={loading ? <CircularProgress size={14} /> : startIcon}
          onClick={handleClick}
          fontFamily={fontFamily}>
          {label}
        </TextActionButton>
      );
    case 'icon':
      return (
        <IconButton
          variant={'contained'}
          buttoncolor={color}
          size={size}
          disabled={disabled}
          onClick={handleClick}
          fontFamily={fontFamily}>
          {icon}
        </IconButton>
      );
    default:
      return null;
  }
};
