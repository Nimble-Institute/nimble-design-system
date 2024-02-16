import React, {ReactElement} from 'react';

import {Box, Button, CircularProgress} from '@mui/material';
import {styled} from '@mui/system';
import {darken, lighten} from 'polished';

import {fontWeight} from '../shared';

interface ButtonProps {
  buttoncolor: string;
  fontFamily: string;
  fontWeight: string;
  labelColor?: string;
  height?: string;
  hoverColor?: string;
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
  height?: string;
  skipTab?: boolean;
  tabindex?: number;
  hoverColor?: string;
}

const ContainedActionButton = styled(Button)(
  ({buttoncolor, labelColor, fontFamily, fontWeight, height}: ButtonProps) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    height: height,
  }),
);

const OutlinedActionButton = styled(Button)(({buttoncolor, fontFamily, fontWeight, height}: ButtonProps) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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
  height: height,
}));

const TextActionButton = styled(Button)(({buttoncolor, fontFamily, fontWeight, height, hoverColor}: ButtonProps) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textTransform: 'none',
  paddingLeft: '12px !important',
  paddingRight: '12px !important',
  borderRadius: '5px',
  color: buttoncolor,
  '&:hover': {
    backgroundColor: hoverColor ?? '#fafcfb',
    boxShadow: 'none',
  },
  fontFamily,
  fontWeight,
  ':disabled': {
    color: 'rgba(0, 0, 0, 0.26)',
  },
  height: height,
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
  height,
  skipTab = false,
  tabindex = 0,
  hoverColor,
}) => {
  const handleClick = () => {
    !loading && onClick();
  };

  const Loader: React.FC<{color?: string}> = ({color}) => <CircularProgress size={14} sx={{color: color ?? '#FFF'}} />;

  switch (variant) {
    case 'contained':
      return (
        <ContainedActionButton
          variant={variant}
          buttoncolor={color}
          labelColor={labelColor}
          size={size}
          disabled={disabled}
          startIcon={
            startIcon ? (
              loading ? (
                <Loader />
              ) : (
                startIcon
              )
            ) : loading && !endIcon ? (
              <Loader />
            ) : (
              <Box sx={{display: 'flex'}} />
            )
          }
          endIcon={endIcon ? loading ? <Loader /> : endIcon : <Box sx={{display: 'flex'}} />}
          onClick={handleClick}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          height={height}
          tabIndex={skipTab ? -1 : tabindex ?? undefined}>
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
          startIcon={
            startIcon ? (
              loading ? (
                <Loader color={color} />
              ) : (
                startIcon
              )
            ) : loading && !endIcon ? (
              <Loader color={color} />
            ) : (
              <Box sx={{display: 'flex'}} />
            )
          }
          endIcon={endIcon ? loading ? <Loader color={color} /> : endIcon : <Box sx={{display: 'flex'}} />}
          onClick={handleClick}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          height={height}
          tabIndex={skipTab ? -1 : tabindex ?? undefined}>
          {label}
        </OutlinedActionButton>
      );
    case 'text':
      return (
        <TextActionButton
          variant={variant}
          buttoncolor={color}
          hoverColor={hoverColor}
          size={size}
          disabled={disabled}
          startIcon={
            startIcon ? (
              loading ? (
                <Loader color={color} />
              ) : (
                startIcon
              )
            ) : loading && !endIcon ? (
              <Loader color={color} />
            ) : (
              <Box sx={{display: 'flex'}} />
            )
          }
          endIcon={endIcon ? loading ? <Loader color={color} /> : endIcon : <Box sx={{display: 'flex'}} />}
          onClick={handleClick}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          height={height}
          tabIndex={skipTab ? -1 : tabindex ?? undefined}>
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
          onClick={handleClick}
          tabIndex={skipTab ? -1 : tabindex ?? undefined}>
          {icon}
        </IconButton>
      );
    default:
      return null;
  }
};
