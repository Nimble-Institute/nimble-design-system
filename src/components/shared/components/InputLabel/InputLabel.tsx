import React from 'react';
import {styled} from '@mui/system';
import {Typography} from '@mui/material';

import {InputLabelProps} from '../../types/index';
import {fontWeight} from '../../types/index';

interface LabelProps {
  labelsize: number;
  labelweight: fontWeight;
  fontFamily?: string;
  disabled?: boolean;
}
interface RequiredStarProps {
  labelsize: number;
}

const Label = styled(Typography)(({labelsize, labelweight, fontFamily, disabled}: LabelProps) => ({
  fontSize: labelsize,
  fontWeight: labelweight,
  lineHeight: '20px',
  marginBottom: '8px',
  fontFamily: fontFamily,
  color: !disabled ? '#404040' : '#a8a8a8',
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
  disabled,
}) => {
  return label ? (
    <Label labelsize={labelSize} labelweight={labelWeight} fontFamily={fontFamily} disabled={disabled}>
      {label}
      {isRequired && <RequiredStar labelsize={labelSize}>*</RequiredStar>}
    </Label>
  ) : null;
};

export default InputLabel;
