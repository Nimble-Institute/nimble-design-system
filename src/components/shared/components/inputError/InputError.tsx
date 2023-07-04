import React from 'react';
import {styled} from '@mui/system';
import {Typography} from '@mui/material';

import errorSVG from '../../../../assets/images/error.svg';

interface InputErrorProps {
  isError?: boolean;
  fontFamily?: string;
  errorMessage?: string;
}

interface ErrorLableProps {
  fontFamily?: string;
}

const ErrorLable = styled(Typography)(({fontFamily}: ErrorLableProps) => ({
  fontSize: '12px',
  fontWeight: '500',
  lineHeight: '16px',
  fontFamily: fontFamily,
  marginLeft: '4px',
  color: '#EC4C29',
}));

const InputError: React.FC<InputErrorProps> = ({isError, fontFamily, errorMessage}) => {
  return isError ? (
    <span style={{display: 'flex', marginTop: '4px'}}>
      <img src={errorSVG} />
      <ErrorLable fontFamily={fontFamily}>{errorMessage}</ErrorLable>
    </span>
  ) : null;
};

export default InputError;
