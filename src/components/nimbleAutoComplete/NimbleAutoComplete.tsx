import React from 'react';
import {TextField, Autocomplete, Chip, Paper, Typography, InternalStandardProps as StandardProps} from '@mui/material';
import {autocompleteClasses} from '@mui/material/Autocomplete';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {styled} from '@mui/system';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
  chipColor?: string;
  onChange: (value: NimbleAutocompleteDataType[] | NimbleAutocompleteDataType | null) => void;
  data: NimbleAutocompleteDataType[];
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  multiple?: boolean;
}

const OptionPaper = styled(Paper)({
  marginTop: '8px',
  borderRadius: '5px',
  backgroundColor: '#ffffffcc',
  boxShadow: '0px 4px 16px 0px rgba(22, 22, 22, 0.11);',
});

export const NimbleAutoComplete: React.FC<NimbleAutoCompleteProps> = ({
  label,
  labelSize = 14,
  labelWeight = '600',
  placeholder,
  fontFamily,
  borderColor = '#9A9FA5',
  activeBoxShadow = '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
  chipColor = '#9FC540',
  onChange,
  data,
  isRequired,
  isError,
  errorMessage,
  width = '100%',
  multiple = true,
  ...props
}) => {
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '5px',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: isError ? '#EC4C29' : borderColor,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: '0px',
              boxShadow:
                activeBoxShadow || 'rgb(219, 242, 251) 0px 0px 0px 2px, rgb(119, 203, 237) 0px 0px 0px 1px inset',
            },
            '&:focus-within .MuiOutlinedInput-notchedOutline': {
              border: '0px',
              boxShadow:
                activeBoxShadow || 'rgb(219, 242, 251) 0px 0px 0px 2px, rgb(119, 203, 237) 0px 0px 0px 1px inset',
            },
            '.MuiAutocomplete-listbox': {
              marginTop: '20px',
            },
            '.MuiInputBase-input': {
              height: '17px',
            },
          },
        },
      },
    },
  });

  const TagWrapper = styled('div')({maxHeight: '100px', overflow: 'auto', minWidth: '105%'});

  const TagChip = styled(Chip)({
    backgroundColor: chipColor,
    color: '#fff',
    borderRadius: '3px',
    padding: '2px, 4px, 2px, 4px',
    fontFamily: fontFamily,
    fontSize: '12px',
    maxHeight: '18px',
  });

  const OptionList = styled('li')({
    display: 'flex ',
    flexDirection: 'row',
    justifyContent: 'space-between ',
    borderBottom: '1px solid #E2E2E2',
  });

  const OptionLabel = styled(Typography)({
    fontSize: '16px',
    fontFamily: fontFamily,
    color: '#0C1B2A',
    lineHeight: '20px',
    padding: '6px 4px',
    width: '100%',
  });

  const SlectedIcon = styled(CheckCircleOutlineIcon)({
    fontSize: 18,
    color: chipColor,
  });

  const Label = styled(Typography)({
    fontSize: labelSize,
    fontWeight: labelWeight,
    lineHeight: '20px',
    marginBottom: '8px',
    fontFamily: fontFamily,
  });

  const ErrorLable = styled(Typography)({
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '16px',
    fontFamily: fontFamily,
    marginLeft: '4px',
    color: '#EC4C29',
  });

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
          />
        ))}
      </TagWrapper>
    );
  };

  const renderOption = (props: any, option: any) => {
    return (
      <OptionList {...props} role="list-box">
        <OptionLabel>{option.label}</OptionLabel>
        {props['aria-selected'] && <SlectedIcon />}
      </OptionList>
    );
  };

  return (
    <span>
      {label && (
        <Label>
          {label}
          {isRequired && <span style={{marginLeft: '4px', color: '#EC4C29', fontSize: labelSize}}>*</span>}
        </Label>
      )}
      <ThemeProvider theme={theme}>
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
          {...props}
        />
      </ThemeProvider>
      {isError && (
        <span style={{display: 'flex', marginTop: '4px'}}>
          <img src={errorSVG} />
          <ErrorLable>{errorMessage}</ErrorLable>
        </span>
      )}
    </span>
  );
};
