import { styled } from '@mui/material';
import Chip from '@mui/material/Chip';
import React from 'react';
import { fontWeight } from '../shared';

interface NimbleChipProps {
  label: string;
  size: 'small' | 'medium';
  icon?: any;
  background?: string;
  labelcolor?: string;
  fontWeight?: fontWeight;
  fontSize?: string;
  fontFamily?: string;
  width?: string;
}
interface StyledChipProps {
  background?: string;
  labelcolor?: string;
  fontWeight?: fontWeight;
  fontSize?: string;
  fontFamily?: string;
  width: string;
}

const StyledChip = styled(Chip)(
  ({background, labelcolor, fontWeight, fontSize, fontFamily, width}: StyledChipProps) => ({
    borderRadius: '3px',
    padding: '2px, 4px',
    backgroundColor: background,
    color: labelcolor,
    fontWeight: fontWeight,
    fontSize: fontSize,
    fontFamily: fontFamily,
    width,
  }),
);

export const NimbleChip: React.FC<NimbleChipProps> = ({
  label,
  size = 'small',
  icon,
  background = '#90CAF9',
  labelcolor = '#FFFFFE',
  fontWeight = '400',
  fontSize = '14px',
  fontFamily,
  width = 'auto',
}) => {
  return (
    <StyledChip
      label={label}
      size={size}
      icon={icon}
      background={background}
      labelcolor={labelcolor}
      fontWeight={fontWeight}
      fontSize={fontSize}
      fontFamily={fontFamily}
      width={width}
    />
  );
};
