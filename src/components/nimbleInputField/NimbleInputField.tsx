import React from 'react';
import {TextField, Typography} from '@mui/material';

import warningSVG from './warning.svg';

interface NimbleInputFieldColorProps {
  borderColor?: string;
  boxShadow?: string;
  activeBorderColor?: string;
  activeBoxShadow?: string;
}

interface NimbleInputFieldProps {
  label: string;
  type: 'text' | 'number' | 'password' | 'color';
  error?: boolean;
  errorText?: string;
  helperText?: string;
  colors: NimbleInputFieldColorProps;
}

enum Type {
  text = 'text',
  number = 'number',
  password = 'password',
  color = 'color',
}

const HelperText = ({text, error}: any) => (
  <span style={{display: 'flex', flexDirection: 'row', marginLeft: '-12px'}}>
    {error && <img src={warningSVG} alt="" />}
    <Typography
      sx={{
        marginLeft: '5px',
        color: error ? '#EC4C29' : '#50606B',
        fontSize: '12px',
        fontWeight: '400',
        lineHeight: '16px',
      }}
    >
      {text}
    </Typography>
  </span>
);

export const NimbleInputField: React.FC<NimbleInputFieldProps> = ({
  label,
  type,
  error,
  errorText,
  helperText,
  colors: {
    borderColor = '#9A9FA5',
    boxShadow = '0px 1px 4px rgba(39, 47, 53, 0.08)',
    activeBorderColor = '#DBF2FB',
    activeBoxShadow = '0px 0px 0px 2px #DBF2FB, inset 0px 0px 0px 1px #77CBED',
  },
  ...props
}) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '19px',
          color: '#0C1B2A',
          marginBottom: '4px',
          marginLeft: '1px',
        }}
      >
        {label}
      </Typography>
      <TextField
        size="small"
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: error ? '#EC4C29' : borderColor,
              boxShadow: error ? '0px 0px 0px 2px #FAD4CC, inset 0px 0px 0px 1px #EC4C29' : boxShadow,
            },
            '&:hover fieldset': {
              borderColor: activeBorderColor,
              boxShadow: activeBoxShadow,
            },
            '&.Mui-focused fieldset': {
              borderColor: activeBorderColor,
              boxShadow: activeBoxShadow,
            },
          },
        }}
        inputProps={{
          style: {
            height: '15px',
            fontSize: '12px',
          },
        }}
        helperText={(errorText || helperText) && <HelperText text={error ? errorText : helperText} error={error} />}
        {...props}
      />
    </>
  );
};
