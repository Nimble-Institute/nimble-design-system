import React from 'react';
import {DatePicker} from 'antd';
import {MinusOutlined} from '@ant-design/icons';
import styled from 'styled-components/dist/styled-components.js';

import {InputLabel, InputError, InputLabelProps, InputBoxProps} from '../shared';

interface NimbleDateRangeProps extends InputLabelProps, InputBoxProps {}

const StyledRangePicker = styled(DatePicker.RangePicker)<{
  borderColor: string;
  activeBoxShadow: string;
  hoverBoxShadow: string;
}>`
  width: 575px;
  border-color: ${(props: {borderColor: string}) => props.borderColor};
  box-shadow: none;
  &:hover {
    border: none !important;
    box-shadow: ${(props: {hoverBoxShadow: string}) => props.hoverBoxShadow}!important;
  }
  &:focus {
    border: none !important;
    box-shadow: ${(props: {activeBoxShadow: string}) => props.activeBoxShadow}!important;
  }
  &:active {
    border: none !important;
    box-shadow: ${(props: {activeBoxShadow: string}) => props.activeBoxShadow}!important;
  }
`;

export const NimbleDateRange: React.FC<NimbleDateRangeProps> = ({
  label,
  labelSize = 14,
  labelWeight = '600',
  fontFamily,
  isRequired,
  borderColor = '#9A9FA5',
  activeBoxShadow = '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
  hoverBoxShadow = '0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #50606B inset',
}) => {
  return (
    <span>
      <InputLabel
        labelSize={labelSize}
        labelWeight={labelWeight}
        fontFamily={fontFamily}
        isRequired={isRequired}
        label={label}
      />
      <StyledRangePicker
        size="large"
        separator={<MinusOutlined rev={undefined} />}
        borderColor={borderColor}
        activeBoxShadow={activeBoxShadow}
        hoverBoxShadow={hoverBoxShadow}
      />
    </span>
  );
};
