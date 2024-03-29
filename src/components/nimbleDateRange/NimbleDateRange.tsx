import React, {useState} from 'react';
import {DatePicker} from 'antd';
import {MinusOutlined} from '@ant-design/icons';
import styled from 'styled-components/dist/styled-components.js';
import dayjs from 'dayjs';
import type {Dayjs} from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

import {InternalStandardProps as StandardProps} from '@mui/material';

import {InputLabel, InputLabelProps, InputBoxProps, InputError} from '../shared';

import './NimbleDateRangeStyles.css';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

type RangeValue = [Dayjs | null, Dayjs | null] | null;
interface NimbleDateRangeProps
  extends InputLabelProps,
    InputBoxProps,
    StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'> {
  isError?: boolean;
  errorMessage?: string;
  onDateChange?: (dates: [string, string]) => void;
  onBlur?: () => void;
  defaultValue?: [string, string];
  disablePast?: boolean;
  maxDifferentDays?: number;
  placeholderArray?: [string, string];
  disabled?: boolean;
  name?: string;
  height?: string;
  fontSize?: string;
  isFormik?: boolean;
  value?: any;
}

const StyledRangePicker = styled(DatePicker.RangePicker)<{
  borderColor: string;
  activeBoxShadow: string;
  hoverBoxShadow: string;
  isError?: boolean;
  width: string;
  fontFamily?: string;
  disabled?: boolean;
  height: string;
  fontSize: string;
}>`
  width: ${(props: {width: string}) => props.width};
  max-height: ${(props: {height: string}) => props.height};
  border: 1px solid;
  border-color: ${(props: {borderColor: string; isError?: boolean; disabled: boolean}) =>
    props.isError ? '#EC4C29' : !props.disabled ? props.borderColor : '#cbcfd4'}!important;
  box-shadow: ${(props: {isError?: boolean}) => (props.isError ? '0px 0px 0px 2px #FAD4CC' : 'none')};
  &:hover {
    border-color: ${(props: {borderColor: string; disabled: boolean}) =>
      !props.disabled ? props.borderColor : 'none'} !important ;
    box-shadow: ${(props: {hoverBoxShadow: string; disabled: boolean}) =>
      !props.disabled ? props.hoverBoxShadow : 'none'}!important;
  }
  &:focus {
    border: none !important;
    box-shadow: ${(props: {activeBoxShadow: string; disabled: boolean}) =>
      !props.disabled ? props.activeBoxShadow : 'none'}!important;
  }
  &:active {
    border: none !important;
    box-shadow: ${(props: {activeBoxShadow: string; disabled: boolean}) =>
      !props.disabled ? props.activeBoxShadow : 'none '}!important;
  }
  .ant-picker-input > input {
    font-size: ${(props: {fontSize: string}) => props.fontSize};
    font-family: ${(props: {fontFamily: string}) => props.fontFamily}!important;
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
  hoverBoxShadow = '0px 0px 0px 2px #dae3f0',
  width = '575px',
  isError,
  errorMessage,
  onDateChange,
  onBlur,
  defaultValue = [],
  disablePast,
  maxDifferentDays,
  placeholderArray = ['Start Date', 'End Date'],
  disabled = false,
  name = undefined,
  height = '34px',
  fontSize = '14px',
  isFormik = false,
  value,
  ...props
}) => {
  const [dates, setDates] = useState<RangeValue>(null);

  const handleCalandarChange = (dates: any, dateStrings: [string, string]) => {
    onDateChange && onDateChange(dateStrings);
    setDates(dates);
  };

  const disabledDate = (current: Dayjs) => {
    if (disablePast && !maxDifferentDays) {
      return current && current.valueOf() < Date.now() ? true : false;
    } else if (!disablePast && maxDifferentDays) {
      const tooLate = dates && dates[0] && current.diff(dates[0], 'days') >= maxDifferentDays;
      const tooEarly = dates && dates[1] && dates[1].diff(current, 'days') >= maxDifferentDays;
      return !!tooEarly || !!tooLate;
    } else if (disablePast && maxDifferentDays) {
      const tooLate =
        (dates && dates[0] && current.diff(dates[0], 'days') >= maxDifferentDays) ||
        (current && current.valueOf() < Date.now());
      const tooEarly = dates && dates[1] && dates[1].diff(current, 'days') >= maxDifferentDays;
      return !!tooEarly || !!tooLate;
    }
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  return (
    <span>
      <InputLabel
        labelSize={labelSize}
        labelWeight={labelWeight}
        fontFamily={fontFamily}
        isRequired={isRequired}
        label={label}
        disabled={disabled}
      />
      <StyledRangePicker
        size="large"
        separator={<MinusOutlined rev={undefined} />}
        borderColor={borderColor}
        activeBoxShadow={activeBoxShadow}
        hoverBoxShadow={hoverBoxShadow}
        width={width}
        height={height}
        isError={isError}
        onCalendarChange={handleCalandarChange}
        defaultValue={[defaultValue[0] && dayjs(defaultValue[0]), defaultValue[1] && dayjs(defaultValue[1])]}
        disabledDate={disabledDate}
        onChange={(val: any) => {}}
        onOpenChange={onOpenChange}
        changeOnBlur
        placeholder={placeholderArray}
        fontFamily={fontFamily}
        fontSize={fontSize}
        disabled={disabled}
        name={name}
        value={isFormik && value?.length === 2 ? [dayjs(value[0]), dayjs(value[1])] : undefined}
        onBlur={onBlur}
        {...props}
      />
      <InputError isError={isError} errorMessage={errorMessage} fontFamily={fontFamily} />
    </span>
  );
};
