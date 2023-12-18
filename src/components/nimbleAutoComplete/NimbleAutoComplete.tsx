import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Autocomplete, InternalStandardProps as StandardProps} from '@mui/material';
import {autocompleteClasses} from '@mui/material/Autocomplete';
import {ThemeProvider} from '@mui/material/styles';

import {TagChip, OptionList, OptionLabel, SlectedIcon, TextInput} from './StyledWrappers';
import {InputLabel, InputError, InputLabelProps, InputBoxProps} from '../shared';

import closeSVG from '../../assets/images/close.svg';
import searchSVG from '../../assets/images/search.svg';
import clearSVG from '../../assets/images/clear.svg';
import theme from './CustomTheme';

interface NimbleAutocompleteDataType {
  label: string;
  value: number;
}

interface NimbleAutoCompleteProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'>,
    InputLabelProps,
    InputBoxProps {
  chipColor?: string;
  onChange: (value: NimbleAutocompleteDataType[] | NimbleAutocompleteDataType | null | React.SyntheticEvent) => void;
  onBlur?: () => void;
  data: NimbleAutocompleteDataType[];
  isError?: boolean | never[];
  errorMessage?: string | string[] | never[];
  placeholder?: string;
  multiple?: boolean;
  defaultValue?: NimbleAutocompleteDataType[];
  disabled?: boolean;
  name?: string;
  isFormik?: boolean;
  value?: any;
  backgroundColor?: string;
  fontSize?: number;
}

export const NimbleAutoComplete: React.FC<NimbleAutoCompleteProps> = ({
  label,
  labelSize = 14,
  labelWeight = '600',
  placeholder,
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
  borderColor = '#9A9FA5',
  activeBoxShadow = '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
  hoverBoxShadow = '0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #50606B inset',
  chipColor = '#9FC540',
  onChange,
  onBlur,
  data,
  isRequired,
  isError,
  errorMessage,
  width = '100%',
  multiple = true,
  defaultValue,
  disabled = false,
  name = undefined,
  isFormik = false,
  value,
  backgroundColor,
  fontSize = 14,
  ...props
}) => {
  const inputRef = useRef<any>(null);
  const [internalValue, setInternalValue] = useState<any>(defaultValue || multiple ? [] : null);

  const customTheme = useMemo(() => {
    return theme(
      isError,
      borderColor,
      hoverBoxShadow,
      activeBoxShadow,
      disabled,
      fontFamily,
      fontSize,
      backgroundColor,
    );
  }, [isError, borderColor, hoverBoxShadow, activeBoxShadow, disabled, fontFamily, fontSize, backgroundColor]);

  const handleOnChnage = (
    event: React.SyntheticEvent,
    value: NimbleAutocompleteDataType[] | NimbleAutocompleteDataType | null,
  ) => {
    onChange(value);
    setInternalValue(value);
  };

  useEffect(() => {
    setInternalValue(defaultValue || (multiple ? [] : {}));
  }, [defaultValue]);

  useEffect(() => {
    isFormik && setInternalValue(value);
  }, [isFormik, value]);

  const renderTags = (value: any, getTagProps: any) => {
    return (
      <>
        {value.map((option: any, index: number) => (
          <TagChip
            variant="filled"
            label={option.label}
            {...getTagProps({index})}
            key={index}
            deleteIcon={<img src={closeSVG} />}
            chipcolor={chipColor}
            fontFamily={fontFamily}
          />
        ))}
      </>
    );
  };

  const renderOption = (props: any, option: any, {selected}: any, ownerState: any) => {
    const inputValue = inputRef?.current.value;
    let islastOption;

    if (inputValue) {
      const searchedData = data?.filter(item => item.label.toLowerCase().includes(inputValue.toLowerCase()));
      islastOption = searchedData?.length ? props['data-option-index'] + 1 == searchedData?.length : true;
    } else {
      islastOption = props['data-option-index'] + 1 == data?.length;
    }
    const isFirstOption = props['data-option-index'] === 0;

    return (
      <OptionList {...props} role="list-box" islastOption={islastOption} isFirstOption={isFirstOption}>
        <OptionLabel fontFamily={fontFamily}>{option.label}</OptionLabel>
        {selected && <SlectedIcon chipcolor={chipColor} />}
      </OptionList>
    );
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
      <ThemeProvider theme={customTheme}>
        <Autocomplete
          onChange={handleOnChnage}
          multiple={multiple}
          disableCloseOnSelect={multiple}
          options={data}
          sx={{
            width: width,
            [`& .${autocompleteClasses.popupIndicator}`]: {
              transform: 'none',
            },
          }}
          renderTags={renderTags}
          getOptionLabel={option => option.label || ''}
          renderOption={renderOption}
          renderInput={params => (
            <TextInput
              {...params}
              size="small"
              placeholder={placeholder}
              fontFamily={fontFamily}
              name={name}
              inputRef={inputRef}
            />
          )}
          ListboxProps={{
            style: {
              maxHeight: '172px',
            },
            sx: {
              '&::-webkit-scrollbar': {
                width: '2px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#bdbdbd',
                borderRadius: '10px',
                boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#e3e3e3',
              },
            },
          }}
          clearIcon={<img src={clearSVG} />}
          popupIcon={<img src={searchSVG} />}
          isOptionEqualToValue={(option, newValue) => option.value === newValue.value}
          value={internalValue}
          disabled={disabled}
          onBlur={onBlur}
          componentsProps={{
            paper: {
              elevation: 8,
              sx: {
                marginTop: '8px',
                borderRadius: '5px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 4px 16px 0px rgba(22, 22, 22, 0.11);',
                padding: '0px !important',
              },
            },
          }}
          {...props}
        />
      </ThemeProvider>
      <InputError
        isError={!!isError}
        errorMessage={errorMessage ? errorMessage.toString() : undefined}
        fontFamily={fontFamily}
      />
    </span>
  );
};
