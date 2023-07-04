import React from 'react';
// import {DatePicker} from 'antd';
// import {MinusOutlined} from '@ant-design/icons';
import styled from 'styled-components';

interface NimbleDateRangeProps {}

const StyledSpan = styled('span')`
  color: red;
`;

export const NimbleDateRange: React.FC<NimbleDateRangeProps> = ({}) => {
  return <StyledSpan>Date Range</StyledSpan>;
};
