import React, {useMemo} from 'react';
import {TextField, Autocomplete, InternalStandardProps as StandardProps} from '@mui/material';
import {autocompleteClasses} from '@mui/material/Autocomplete';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import theme from './CustomTheme';

import {
  OptionPaper,
  TagWrapper,
  TagChip,
  OptionList,
  OptionLabel,
  SlectedIcon,
  Label,
  ErrorLable,
} from './StyledWrappers';

import closeSVG from '../../assets/images/close.svg';
import searchSVG from '../../assets/images/search.svg';
import clearSVG from '../../assets/images/clear.svg';
import errorSVG from '../../assets/images/error.svg';

interface NimbleAutocompleteDataType {
  label: string;
  value: number;
}

interface NimbleAutoCompleteProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'> {
  label?: string;
  width?: string;
  labelSize?: number;
  labelWeight?: '400' | '500' | '600' | '700';
  fontFamily?: string;
  borderColor?: string;
  activeBoxShadow?: string;
  hoverBoxShadow?: string;
  chipColor?: string;
  onChange: (value: NimbleAutocompleteDataType[] | NimbleAutocompleteDataType | null) => void;
  data: NimbleAutocompleteDataType[];
  isRequired?: boolean;
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
  const customTheme = useMemo(() => {
    return theme(isError, borderColor, hoverBoxShadow, activeBoxShadow);
  }, [isError, borderColor, hoverBoxShadow, activeBoxShadow]);

  const handleOnChnage = (
    event: React.SyntheticEvent,
    value: NimbleAutocompleteDataType[] | NimbleAutocompleteDataType | null,
  ) => {
    onChange(value);
  };

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
      {label && (
        <Label labelsize={labelSize} labelweight={labelWeight} fontFamily={fontFamily}>
          {label}
          {isRequired && <span style={{marginLeft: '4px', color: '#EC4C29', fontSize: labelSize}}>*</span>}
        </Label>
      )}
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
          renderInput={params => <TextField {...params} size="small" placeholder={placeholder} />}
          ListboxProps={{
            style: {
              maxHeight: '172px',
            },
          }}
          clearIcon={<img src={clearSVG} />}
          PaperComponent={(props: any) => <OptionPaper {...props} />}
          popupIcon={<img src={searchSVG} />}
          defaultValue={defaultValue}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          {...props}
        />
      </ThemeProvider>
      {isError && (
        <span style={{display: 'flex', marginTop: '4px'}}>
          <img src={errorSVG} />
          <ErrorLable fontFamily={fontFamily}>{errorMessage}</ErrorLable>
        </span>
      )}
    </span>
  );
};
