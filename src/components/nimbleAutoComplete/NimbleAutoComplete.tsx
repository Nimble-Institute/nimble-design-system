import React, {useMemo, useState} from 'react';
import {Autocomplete, InternalStandardProps as StandardProps} from '@mui/material';
import {autocompleteClasses} from '@mui/material/Autocomplete';
import {ThemeProvider} from '@mui/material/styles';

import {OptionPaper, TagWrapper, TagChip, OptionList, OptionLabel, SlectedIcon, TextInput} from './StyledWrappers';
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
  onChange: (value: NimbleAutocompleteDataType[] | NimbleAutocompleteDataType | null) => void;
  data: NimbleAutocompleteDataType[];
  isError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  multiple?: boolean;
  defaultValue?: NimbleAutocompleteDataType[];
}

export const NimbleAutoComplete: React.FC<NimbleAutoCompleteProps> = ({
  label,
  labelSize = 14,
  labelWeight = '600',
  placeholder,
  fontFamily,
  borderColor = '#9A9FA5',
  activeBoxShadow = '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
  hoverBoxShadow = '0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #50606B inset',
  chipColor = '#9FC540',
  onChange,
  data,
  isRequired,
  isError,
  errorMessage,
  width = '100%',
  multiple = true,
  defaultValue,
  ...props
}) => {
  const [value, setValue] = useState<NimbleAutocompleteDataType[] | NimbleAutocompleteDataType | null>(null);

  const customTheme = useMemo(() => {
    return theme(isError, borderColor, hoverBoxShadow, activeBoxShadow);
  }, [isError, borderColor, hoverBoxShadow, activeBoxShadow]);

  const handleOnChnage = (
    event: React.SyntheticEvent,
    value: NimbleAutocompleteDataType[] | NimbleAutocompleteDataType | null,
  ) => {
    onChange(value);
    setValue(value);
  };

  const preSelectedvalue = useMemo(() => {
    if (defaultValue && Array.isArray(defaultValue)) {
      setValue(defaultValue);
    }
    return defaultValue && Array.isArray(defaultValue) ? [...defaultValue] : undefined;
  }, [defaultValue]);

  const renderTags = (value: any, getTagProps: any) => {
    return (
      <TagWrapper>
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
      </TagWrapper>
    );
  };

  const renderOption = (props: any, option: any) => {
    return (
      <OptionList {...props} role="list-box">
        <OptionLabel fontFamily={fontFamily}>{option.label}</OptionLabel>
        {props['aria-selected'] && <SlectedIcon chipcolor={chipColor} />}
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
      />
      <ThemeProvider theme={customTheme}>
        <Autocomplete
          onChange={handleOnChnage}
          multiple={multiple}
          disableCloseOnSelect
          id="combo-box-demo"
          options={data}
          sx={{
            width: width,
            [`& .${autocompleteClasses.popupIndicator}`]: {
              transform: 'none',
            },
          }}
          renderTags={renderTags}
          getOptionLabel={option => option.label}
          renderOption={renderOption}
          renderInput={params => (
            <TextInput {...params} size="small" placeholder={placeholder} fontFamily={fontFamily} />
          )}
          ListboxProps={{
            style: {
              maxHeight: '172px',
            },
          }}
          clearIcon={<img src={clearSVG} />}
          PaperComponent={(props: any) => <OptionPaper {...props} />}
          popupIcon={<img src={searchSVG} />}
          defaultValue={preSelectedvalue}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          value={value || []}
          {...props}
        />
      </ThemeProvider>
      <InputError isError={isError} errorMessage={errorMessage} fontFamily={fontFamily} />
    </span>
  );
};
