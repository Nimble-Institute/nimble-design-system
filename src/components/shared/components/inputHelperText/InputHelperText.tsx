import React from 'react';
import {styled} from '@mui/system';
import {Typography} from '@mui/material';

interface InputHelperTextProps {
  isError?: boolean;
  fontFamily?: string;
  helperText?: string;
}

interface HelperTextProps {
  fontFamily?: string;
}

const HelperText = styled(Typography)(({fontFamily}: HelperTextProps) => ({
  fontSize: '12px',
  fontFamily,
  color: '#737373',
  fontWeight: '400',
  lineHeight: '140%',
  marginTop: '5px',
}));

const InputHelperText: React.FC<InputHelperTextProps> = ({isError, fontFamily, helperText}) => {
  return !isError && helperText ? <HelperText fontFamily={fontFamily}>{helperText}</HelperText> : null;
};

export default InputHelperText;
