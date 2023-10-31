import React, {ReactElement} from 'react';

import {Button, CircularProgress} from '@mui/material';
import {styled} from '@mui/system';
import {darken, lighten} from 'polished';

import {fontWeight} from '../shared';

interface ButtonProps {
  buttoncolor: string;
  fontFamily: string;
  fontWeight: string;
  labelColor?: string;
}

interface IconButtonProps {
  buttoncolor: string;
  labelColor?: string;
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
  labelColor?: string;
}

const ContainedActionButton = styled(Button)(({buttoncolor, labelColor, fontFamily, fontWeight}: ButtonProps) => ({
  paddingLeft: '12px !important',
  paddingRight: '12px !important',
  backgroundColor: buttoncolor,
  color: labelColor,
  borderRadius: '5px',
  ':hover': {
    backgroundColor: darken(0.1, buttoncolor),
  },
  ':disabled': {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.26)',
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
    border: `1px solid rgba(0, 0, 0, 0.12)`,
    color: 'rgba(0, 0, 0, 0.26)',
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
    color: 'rgba(0, 0, 0, 0.26)',
  },
}));

const IconButton = styled(Button)(({buttoncolor, labelColor}: IconButtonProps) => ({
  minWidth: '40px !important',
  borderRadius: '5px',
  backgroundColor: buttoncolor,
  color: labelColor,
  ':hover': {
    backgroundColor: darken(0.1, buttoncolor),
  },
  ':disabled': {
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
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
  labelColor,
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
          labelColor={labelColor}
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
          labelColor={color}
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
          labelColor={color}
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
          labelColor={labelColor}
          size={size}
          disabled={disabled}
          onClick={handleClick}>
          {icon}
        </IconButton>
      );
    default:
      return null;
  }
};
