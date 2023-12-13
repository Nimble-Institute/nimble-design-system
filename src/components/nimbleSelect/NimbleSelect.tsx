import React, {useEffect, useMemo, useState} from 'react';
import {Box, InternalStandardProps as StandardProps, Select, MenuItem, IconButton} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {InputLabel, InputError, InputLabelProps, InputBoxProps} from '../shared';

import theme from './CustomTheme';
import dropdownSVG from '../../assets/images/select/dropdown.svg';
import clearSVG from '../../assets/images/clear.svg';

interface NimbleSelectData {
  label: string;
  value: string;
}

interface NimbleSelectProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'>,
    InputLabelProps,
    InputBoxProps {
  isError?: boolean;
  errorMessage?: string | string[] | undefined;
  disabled?: boolean;
  data: NimbleSelectData[];
  defaultValue?: string;
  defaultValueForMultiple?: string[];
  placeholder?: string;
  onChange?: (value: any) => void;
  multiple?: boolean;
  height?: string;
  fontSize?: number;
  onBlur?: () => void;
  isEnableClear?: boolean;
  name?: string;
  isFormik?: boolean;
  value?: any;
  backgroundColor?: string;
}

export const NimbleSelect: React.FC<NimbleSelectProps> = ({
  label,
  labelSize = 14,
  labelWeight = '600',
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
  isRequired,
  isError,
  errorMessage,
  borderColor = '#9A9FA5',
  activeBoxShadow = '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
  hoverBoxShadow = '0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #50606B inset',
  width = '100%',
  disabled = false,
  data,
  defaultValue,
  defaultValueForMultiple,
  onChange,
  placeholder,
  ref,
  name = undefined,
  multiple = false,
  height = '34px',
  fontSize = 14,
  onBlur,
  isEnableClear = true,
  isFormik = false,
  value,
  backgroundColor,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('-');
  const [selectedValueForMultiple, setSelectedValueForMultiple] = useState<string[]>(['-']);

  useEffect(() => {
    setSelectedValue(defaultValue || '-');
  }, [defaultValue]);

  useEffect(() => {
    setSelectedValueForMultiple(defaultValueForMultiple || ['-']);
  }, [defaultValueForMultiple]);

  useEffect(() => {
    if (!multiple && isFormik) {
      setSelectedValue(value);
    }
    if (multiple && isFormik) {
      const filterdeValue = value.length > 1 ? value?.filter((item: string) => item !== '-') : value;
      setSelectedValueForMultiple(filterdeValue);
    }
  }, [value, isFormik, multiple]);

  const customTheme = useMemo(() => {
    return theme(isError, borderColor, hoverBoxShadow, activeBoxShadow, disabled, backgroundColor);
  }, [isError, borderColor, hoverBoxShadow, activeBoxShadow, disabled, backgroundColor]);

  const handleChnage = (event: any) => {
    const val = event.target.value;
    multiple ? setSelectedValueForMultiple(val.filter((item: string) => item !== '-')) : setSelectedValue(val);
    onChange && onChange(val);
  };

  const handleClear = () => {
    multiple ? setSelectedValueForMultiple(['-']) : setSelectedValue('-');
    onChange && onChange('');
  };

  const shouldShowTheClearButton = useMemo(() => {
    const hasSingleValue = !multiple && selectedValue !== '-';
    const hasSingleNonDashValue =
      multiple && selectedValueForMultiple.length === 1 && selectedValueForMultiple[0] !== '-';
    const hasMultipleValues = multiple && selectedValueForMultiple.length > 1;

    return (hasSingleValue || hasSingleNonDashValue || hasMultipleValues) && isEnableClear && !disabled;
  }, [multiple, selectedValue, selectedValueForMultiple, disabled]);

  return (
    <Box>
      <InputLabel
        labelSize={labelSize}
        labelWeight={labelWeight}
        fontFamily={fontFamily}
        isRequired={isRequired}
        label={label}
        disabled={disabled}
      />
      <ThemeProvider theme={customTheme}>
        <Select
          value={multiple ? selectedValueForMultiple : selectedValue}
          onChange={handleChnage}
          size="small"
          multiple={multiple}
          sx={{
            width,
            height,
            fontSize,
            fontFamily,
            color: selectedValue === '-' ? '#AAAAAA' : undefined,
            '.MuiSelect-multiple': {
              color: selectedValueForMultiple[0] === '-' ? '#AAAAAA' : 'black',
            },
            textTransform: 'none',
          }}
          disabled={disabled}
          IconComponent={props => (
            <img
              {...props}
              src={dropdownSVG}
              style={{
                width: fontSize > 13 ? '16px' : '14px',
                pointerEvents: 'none !important',
                opacity: disabled ? 0.4 : 0.8,
              }}
            />
          )}
          endAdornment={
            shouldShowTheClearButton && (
              <IconButton
                size="small"
                sx={{marginRight: '10px', position: 'absolute', right: 15}}
                onClick={handleClear}>
                <img
                  src={clearSVG}
                  style={{
                    width: fontSize > 13 ? '16px' : '14px',
                    marginTop: '1px',
                  }}
                />
              </IconButton>
            )
          }
          MenuProps={{
            sx: {
              '&& .Mui-selected': {
                backgroundColor: '#E2E2E2',
                paddingTop: '5px',
              },
            },
            PaperProps: {
              sx: {
                marginTop: '10px',
                padding: 0,
              },
            },
          }}
          ref={ref}
          name={name}
          onBlur={onBlur}>
          <li value="-" hidden>
            {placeholder}
          </li>
          {data &&
            data.map((item, index) => (
              <MenuItem
                value={item.value}
                key={index}
                sx={{
                  borderBottom: '1px solid #E2E2E2',
                  fontFamily,
                  fontSize: '14px',
                  textTransform: 'none',
                  ...(index === data.length - 1 ? {marginBottom: '-8px !important'} : undefined),
                  ...(index === 0 ? {marginTop: '-8px!important'} : undefined),
                }}>
                {item.label}
              </MenuItem>
            ))}
        </Select>
      </ThemeProvider>
      <InputError
        isError={isError}
        errorMessage={errorMessage ? errorMessage.toString() : undefined}
        fontFamily={fontFamily}
      />
    </Box>
  );
};
