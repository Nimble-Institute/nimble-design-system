import React from 'react';
import {styled} from '@mui/system';
import {Typography} from '@mui/material';

import {InputLabelProps} from '../../types/index';

interface LabelProps {
  labelsize: number;
  labelweight: '400' | '500' | '600' | '700';
  fontFamily?: string;
}
interface RequiredStarProps {
  labelsize: number;
}

const Label = styled(Typography)(({labelsize, labelweight, fontFamily}: LabelProps) => ({
  fontSize: labelsize,
  fontWeight: labelweight,
  lineHeight: '20px',
  marginBottom: '8px',
  fontFamily: fontFamily,
}));

const RequiredStar = styled('span')(({labelsize}: RequiredStarProps) => ({
  marginLeft: '4px',
  color: '#EC4C29',
  fontSize: labelsize,
}));

const InputLabel: React.FC<InputLabelProps> = ({
  labelSize = 14,
  labelWeight = '600',
  fontFamily,
  isRequired,
  label,
}) => {
  return label ? (
    <Label labelsize={labelSize} labelweight={labelWeight} fontFamily={fontFamily}>
      {label}
      {isRequired && <RequiredStar labelsize={labelSize}>*</RequiredStar>}
    </Label>
  ) : null;
};

export default InputLabel;
