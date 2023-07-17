import React from 'react';

import {Button, CircularProgress} from '@mui/material';
import {styled} from '@mui/system';
import {darken, lighten} from 'polished';

interface ButtonProps {
  buttoncolor: string;
}

export interface NimbleButtonProps {
  label: string;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  color?: string;
  disabled?: boolean;
  startIcon?: any;
  loading?: boolean;
  onClick: () => void;
}

const ContainedActionButton = styled(Button)(({buttoncolor}: ButtonProps) => ({
  paddingLeft: '10px',
  paddingRight: '10px',
  backgroundColor: buttoncolor,
  ':hover': {
    backgroundColor: darken(0.1, buttoncolor),
  },
  ':disabled': {
    backgroundColor: lighten(0.4, buttoncolor),
  },

  textTransform: 'none',
}));

const OutlinedActionButton = styled(Button)(({buttoncolor}: ButtonProps) => ({
  paddingLeft: '10px',
  paddingRight: '10px',
  textTransform: 'none',
  border: `1px solid ${buttoncolor}`,
  color: buttoncolor,
  ':hover': {
    border: `1px solid ${darken(0.1, buttoncolor)}`,
    color: darken(0.1, buttoncolor),
  },
  ':disabled': {
    border: `1px solid ${lighten(0.4, buttoncolor)}`,
    color: lighten(0.5, buttoncolor),
  },
}));

const TextActionButton = styled(Button)(({buttoncolor}: ButtonProps) => ({
  textTransform: 'none',
  color: buttoncolor,
  ':disabled': {
    color: lighten(0.4, buttoncolor),
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
          onClick={handleClick}>
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
          onClick={handleClick}>
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
          onClick={handleClick}>
          {label}
        </TextActionButton>
      );
    default:
      return null;
  }
};
