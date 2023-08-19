import React, {ReactElement} from 'react';

import {Button, CircularProgress} from '@mui/material';
import {styled} from '@mui/system';
import {darken, lighten} from 'polished';

import {fontWeight} from '../../components/shared';

interface ButtonProps {
  buttoncolor: string;
  fontFamily: string;
  fontWeight: string;
}

export interface NimbleButtonProps {
  label?: string;
  variant?: 'text' | 'outlined' | 'contained' | 'icon';
  size?: 'small' | 'medium' | 'large';
  color?: string;
  disabled?: boolean;
  startIcon?: ReactElement<any>;
  endIcon?: ReactElement<any>;
  loading?: boolean;
  icon?: ReactElement<any>;
  onClick: () => void;
  fontFamily?: string;
  fontWeight?: fontWeight;
}

const ContainedActionButton = styled(Button)(({buttoncolor, fontFamily, fontWeight}: ButtonProps) => ({
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
  fontWeight,
}));

const OutlinedActionButton = styled(Button)(({buttoncolor, fontFamily, fontWeight}: ButtonProps) => ({
  paddingLeft: '12px !important',
  paddingRight: '12px !important',
  borderRadius: '5px',
  textTransform: 'none',
  border: `1px solid ${buttoncolor}`,
  color: buttoncolor,
  fontFamily,
  fontWeight,
  ':hover': {
    border: `1px solid ${darken(0.1, buttoncolor)}`,
    color: darken(0.1, buttoncolor),
  },
  ':disabled': {
    border: `1px solid ${lighten(0.4, buttoncolor)}`,
    color: lighten(0.5, buttoncolor),
  },
}));

const TextActionButton = styled(Button)(({buttoncolor, fontFamily, fontWeight}: ButtonProps) => ({
  textTransform: 'none',
  paddingLeft: '12px !important',
  paddingRight: '12px !important',
  borderRadius: '5px',
  color: buttoncolor,
  fontFamily,
  fontWeight,
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
  endIcon,
  loading,
  onClick,
  icon,
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
  fontWeight = '500',
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
          startIcon={startIcon ? loading ? <CircularProgress size={14} sx={{color: '#fff'}} /> : startIcon : undefined}
          endIcon={!startIcon ? loading ? <CircularProgress size={14} sx={{color: '#fff'}} /> : endIcon : undefined}
          onClick={handleClick}
          fontFamily={fontFamily}
          fontWeight={fontWeight}>
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
          startIcon={startIcon ? loading ? <CircularProgress size={14} sx={{color: '#fff'}} /> : startIcon : undefined}
          endIcon={!startIcon ? loading ? <CircularProgress size={14} sx={{color: '#fff'}} /> : endIcon : undefined}
          onClick={handleClick}
          fontFamily={fontFamily}
          fontWeight={fontWeight}>
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
          startIcon={startIcon ? loading ? <CircularProgress size={14} sx={{color: '#fff'}} /> : startIcon : undefined}
          endIcon={!startIcon ? loading ? <CircularProgress size={14} sx={{color: '#fff'}} /> : endIcon : undefined}
          onClick={handleClick}
          fontFamily={fontFamily}
          fontWeight={fontWeight}>
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
