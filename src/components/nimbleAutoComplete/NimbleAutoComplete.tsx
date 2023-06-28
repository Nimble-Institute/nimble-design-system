import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {autocompleteClasses, AutocompleteProps} from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {InternalStandardProps as StandardProps} from '@mui/material';

import {createTheme, ThemeProvider} from '@mui/material/styles';

import closeSVG from './close.svg';
import searchSVG from './search.svg';
import clearSVG from './clear.svg';
import errorSVG from './error.svg';

interface NimbleAutocompleteDataType {
  label: string;
  value: number;
}

interface NimbleAutoCompleteProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'> {
  label?: string;
  labelSize?: number;
  labelWeight?: '400' | '500' | '600' | '700';
  fontFamily?: string;
  borderColor?: string;
  activeBoxShadow?: string;
  chipColor?: string;
  onChange: (value: NimbleAutocompleteDataType[]) => void;
  data: NimbleAutocompleteDataType[];
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  placeholder?: string;
}

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
  ...props
}) => {
  const [selectedValues, setSelectedValues] = useState<NimbleAutocompleteDataType[]>([]);

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

  const handleOnChnage = (event: React.SyntheticEvent, value: NimbleAutocompleteDataType[]) => {
    setSelectedValues(value);
    onChange(value);
  };

  const isValueSelected = (value: any) => {
    return selectedValues.find(item => item.value === value);
  };

  const CustomPaper = (props: any) => {
    return (
      <Paper
        {...props}
        sx={{
          marginTop: '8px',
          borderRadius: '5px',
          backgroundColor: '#ffffffcc',
          boxShadow: '0px 4px 16px 0px rgba(22, 22, 22, 0.11);',
        }}
      />
    );
  };

  const renderTags = (value: any, getTagProps: any) => {
    return value.map((option: any, index: number) => (
      <Chip
        variant="filled"
        label={option.label}
        {...getTagProps({index})}
        key={index}
        sx={{
          backgroundColor: chipColor,
          color: '#fff',
          borderRadius: '3px',
          padding: '2px, 4px, 2px, 4px',
          fontFamily: fontFamily,
          fontSize: '12px',
          maxHeight: '18px',
        }}
        deleteIcon={<img src={closeSVG} />}
      />
    ));
  };

  const renderOption = (props: any, option: any) => (
    <li
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1px solid #E2E2E2',
      }}>
      <Typography
        sx={{
          fontSize: '16px',
          fontFamily: fontFamily,
          color: '#0C1B2A',
          lineHeight: '20px',
          padding: '6px 4px',
        }}>
        {option.label}{' '}
      </Typography>
      {isValueSelected(option.value) && <CheckCircleOutlineIcon sx={{fontSize: 18, color: chipColor}} />}
    </li>
  );

  return (
    <span>
      {label && (
        <Typography
          sx={{
            fontSize: labelSize,
            fontWeight: labelWeight,
            lineHeight: '20px',
            marginBottom: '8px',
            fontFamily: fontFamily,
          }}>
          {label}
          {isRequired && <span style={{marginLeft: '4px', color: '#EC4C29', fontSize: labelSize}}>*</span>}
        </Typography>
      )}
      <ThemeProvider theme={theme}>
        <Autocomplete
          onChange={handleOnChnage}
          multiple
          disableCloseOnSelect
          disablePortal
          id="combo-box-demo"
          options={data}
          sx={{
            width: 600,
            [`& .${autocompleteClasses.popupIndicator}`]: {
              transform: 'none',
            },
          }}
          renderTags={renderTags}
          getOptionLabel={option => option.label}
          renderOption={renderOption}
          renderInput={params => (
            <TextField {...params} size="small" placeholder={!selectedValues.length ? placeholder : undefined} />
          )}
          ListboxProps={{
            style: {
              maxHeight: '175px',
            },
          }}
          clearIcon={<img src={clearSVG} />}
          PaperComponent={CustomPaper}
          popupIcon={<img src={searchSVG} />}
          {...props}
        />
      </ThemeProvider>
      {isError && (
        <span style={{display: 'flex', marginTop: '4px'}}>
          <img src={errorSVG} />
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: '500',
              lineHeight: '16px',
              fontFamily: fontFamily,
              marginLeft: '4px',
              color: '#EC4C29',
            }}>
            {errorMessage}
          </Typography>
        </span>
      )}
    </span>
  );
};
