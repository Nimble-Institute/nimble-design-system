import React from 'react';
import Chip from '@mui/material/Chip';
import {styled} from '@mui/material';
import { fontWeight } from '../shared';

interface NimbleChipProps {
  label: string;
  size: 'small' | 'medium';
  icon?: any;
  backgroundColor?: string;
  fontColor?: string;
  fontWeight?: fontWeight;
  fontSize?: string;
  fontFamily?: string;
}
interface StyledChipProps {
  backgroundColor?: string;
  fontColor?: string;
  fontWeight?: fontWeight;
  fontSize?: string;
  fontFamily?: string;
}

const StyledChip = styled(Chip)(({backgroundColor, fontColor, fontWeight, fontSize, fontFamily}: StyledChipProps) => ({
  borderRadius: '3px',
  padding: '2px, 4px',
  backgroundColor: backgroundColor,
  color: fontColor,
  fontWeight: fontWeight,
  fontSize: fontSize,
  fontFamily: fontFamily,
}));

export const NimbleChip: React.FC<NimbleChipProps> = ({
  label,
  size = 'small',
  icon,
  backgroundColor = '#90CAF9',
  fontColor = '#FFFFFE',
  fontWeight = '400',
  fontSize = '14px',
  fontFamily = 'Arial',
}) => {
  return (
    <StyledChip
      label={label}
      size={size}
      icon={icon}
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      fontWeight={fontWeight}
      fontSize={fontSize}
      fontFamily={fontFamily}
    />
  );
};
