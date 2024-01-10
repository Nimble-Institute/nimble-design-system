import React, {useState} from 'react';
import {DatePicker} from 'antd';
import styled from 'styled-components/dist/styled-components.js';
import dayjs from 'dayjs';
import type {Dayjs} from 'dayjs';
import {InternalStandardProps as StandardProps} from '@mui/material';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

import {InputLabel, InputLabelProps, InputBoxProps, InputError} from '../shared';

import './nimbleDatePickerStyles.css';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

type DateType = Dayjs | null;

interface NimbleDatePickerProps
  extends InputLabelProps,
    InputBoxProps,
    StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'> {
  isError?: boolean;
  errorMessage?: string;
  onDateChange?: (dates: string) => void;
  onBlur?: () => void;
  defaultValue?: string;
  disablePast?: boolean;
  minDate?: Date;
  maxDifferentDays?: number;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  isFormik?: boolean;
  value?: any;
  format?: string;
  fontSize?: number;
  height?: string;
}

const StyledDatePicker = styled(DatePicker)<{
  borderColor: string;
  activeBoxShadow: string;
  hoverBoxShadow: string;
  isError?: boolean;
  width: string;
  fontFamily?: string;
  disabled?: boolean;
  fontSize: number;
  height: string;
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
  input {
    font-size: ${(props: {fontSize: number}) => props.fontSize}px!important;
    font-family: ${(props: {fontFamily: string}) => props.fontFamily}!important;
  }
`;

export const NimbleDatePicker: React.FC<NimbleDatePickerProps> = ({
  label,
  labelSize = 14,
  labelWeight = '600',
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
  isRequired,
  borderColor = '#9A9FA5',
  activeBoxShadow = '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
  hoverBoxShadow = '0px 0px 0px 2px #dae3f0',
  width = '100%',
  isError,
  errorMessage,
  onDateChange,
  onBlur,
  defaultValue = '',
  disablePast,
  minDate,
  maxDifferentDays,
  placeholder = 'Select date',
  disabled = false,
  name = undefined,
  isFormik = false,
  value,
  format = 'YYYY-MM-DD',
  fontSize = 14,
  height = '34px',
  ...props
}) => {
  const handleCalandarChange = (date: any, dateString: string) => {
    onDateChange && onDateChange(dateString);
  };

  const disabledDate = (current: Dayjs) => {
    if (disablePast) {
      const tooLate = current && current.valueOf() < Date.now();
      return !!tooLate;
    } else if (minDate) {
      const minSelectableDate = current && current.valueOf() < minDate.valueOf();
      return !!minSelectableDate;
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
      <StyledDatePicker
        size="large"
        borderColor={borderColor}
        activeBoxShadow={activeBoxShadow}
        hoverBoxShadow={hoverBoxShadow}
        width={width}
        isError={isError}
        defaultValue={defaultValue && dayjs(defaultValue)}
        disabledDate={disabledDate}
        onChange={handleCalandarChange}
        changeOnBlur
        placeholder={placeholder}
        fontFamily={fontFamily}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
        value={isFormik ? value && dayjs(value) : undefined}
        format={format}
        fontSize={fontSize}
        height={height}
        {...props}
      />
      <InputError isError={isError} errorMessage={errorMessage} fontFamily={fontFamily} />
    </span>
  );
};
