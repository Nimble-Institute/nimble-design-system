import React from 'react';
import {Button as MaterialButtom} from '@mui/material';
import {darken, lighten} from 'polished';

interface ButtonProps {
  label: string;
  variant: 'primary' | 'secondary' | 'tertiary';
  size: 'small' | 'medium' | 'large';
  backgroundColor: string;
  labelColor: string;
  disabled?: boolean;
}

enum Variants {
  primary = 'contained',
  secondary = 'outlined',
  tertiary = 'text',
}

enum SizeMap {
  small = 36,
  medium = 40,
  large = 48,
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'small',
  backgroundColor = '#50606B',
  labelColor = '#FFF',
  disabled = false,
  ...props
}) => {
  const selectedVariant = Variants[variant] || 'text';
  const buttonHeight = SizeMap[size] || 36;

  return (
    <MaterialButtom
      variant={selectedVariant}
      {...props}
      disabled={disabled}
      sx={{
        height: buttonHeight,
        backgroundColor: variant === 'primary' ? backgroundColor : undefined,
        color: labelColor,
        border: variant !== 'tertiary' ? `2px solid ${backgroundColor}` : undefined,
        ':hover': {
          backgroundColor: variant === 'primary' ? darken(0.1, backgroundColor) : undefined,
          border: variant !== 'tertiary' ? `2px solid ${darken(0.1, backgroundColor)}` : undefined,
        },
        ':disabled': {
          backgroundColor: variant === 'primary' ? lighten(0.5, backgroundColor) : undefined,
          border: variant !== 'tertiary' ? `2px solid ${lighten(0.5, backgroundColor)}` : undefined,
          color: lighten(0.5, labelColor),
        },
      }}
    >
      {label}
    </MaterialButtom>
  );
};
