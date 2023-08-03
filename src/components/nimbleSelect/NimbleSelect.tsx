import React, {useEffect, useMemo, useState} from 'react';
import {Box, InternalStandardProps as StandardProps, Select, MenuItem} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {InputLabel, InputError, InputLabelProps, InputBoxProps} from '../shared';

import theme from './CustomTheme';
import dropdownSVG from '../../assets/images/select/dropdown.svg';

interface NimbleSelectData {
  label: string;
  value: string;
}

interface NimbleSelectProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'>,
    InputLabelProps,
    InputBoxProps {
  isError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  data: NimbleSelectData[];
  defaultValue?: string;
  defaultValueForMultiple?: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
  name?: string;
  multiple?: boolean;
  height?: string;
  fontSize?: number;
}

export const NimbleSelect: React.FC<NimbleSelectProps> = ({
  label,
  labelSize = 14,
  labelWeight = '600',
  fontFamily,
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
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('-');
  const [selectedValueForMultiple, setSelectedValueForMultiple] = useState<string[]>(['-']);

  useEffect(() => {
    setSelectedValue(defaultValue || '-');
  }, [defaultValue]);

  useEffect(() => {
    setSelectedValueForMultiple(defaultValueForMultiple || ['-']);
  }, [defaultValueForMultiple]);

  const customTheme = useMemo(() => {
    return theme(isError, borderColor, hoverBoxShadow, activeBoxShadow, disabled);
  }, [isError, borderColor, hoverBoxShadow, activeBoxShadow, disabled]);

  const handleChnage = (event: any) => {
    const val = event.target.value;

    multiple ? setSelectedValueForMultiple(val.filter((item: string) => item !== '-')) : setSelectedValue(val);
    onChange && onChange(val);
  };

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
          IconComponent={props => <img {...props} src={dropdownSVG} style={{width: fontSize > 13 ? '17px' : '14px'}} />}
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
          name={name}>
          <li value="-" hidden>
            {placeholder}
          </li>
          {data &&
            data.map((item, index) => (
              <MenuItem
                value={item.value}
                key={index}
                sx={{borderBottom: '1px solid #E2E2E2', fontFamily, fontSize: '14px', textTransform: 'none'}}>
                {item.label}
              </MenuItem>
            ))}
        </Select>
      </ThemeProvider>
      <InputError isError={isError} errorMessage={errorMessage} fontFamily={fontFamily} />
    </Box>
  );
};
