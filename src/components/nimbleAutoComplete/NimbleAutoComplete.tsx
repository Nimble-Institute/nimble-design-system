import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import {createTheme, ThemeProvider} from '@mui/material/styles';

import closeSVG from './close.svg';
import clearSVG from './clear.svg';

import {top100Films} from './data';

interface NimbleAutocompleteDataType {
  label: string;
  value: number;
}

interface NimbleAutoCompleteProps {
  label?: string;
  labelSize: number;
  labelWeight?: '400' | '500' | '600' | '700';
  fontFamily?: string;
  borderColor?: string;
  activeBoxShadow?: string;
  chipColor?: string;
  onChange: (value: NimbleAutocompleteDataType[]) => void;
  data: NimbleAutocompleteDataType[];
}

export const NimbleAutoComplete: React.FC<NimbleAutoCompleteProps> = ({
  label,
  labelSize = 14,
  labelWeight = '600',
  fontFamily,
  borderColor = '#3b3b3b',
  activeBoxShadow = 'rgb(219, 242, 251) 0px 0px 0px 2px, rgb(119, 203, 237) 0px 0px 0px 1px inset',
  chipColor = '#820505',
  onChange,
  data,
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
              borderColor: borderColor,
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
              height: '18px',
            },
          },
        },
      },
      //   MuiAutocomplete: {
      //     styleOverrides: {
      //       option: {
      //         '&[aria-selected="true"]': {
      //           backgroundColor: 'rgb(219, 242, 251)',
      //         },
      //       },
      //     },
      //   },
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
    return <Paper elevation={2} {...props} sx={{marginTop: '3px'}} />;
  };

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
        </Typography>
      )}
      <ThemeProvider theme={theme}>
        <Autocomplete
          onChange={handleOnChnage}
          multiple
          disablePortal
          id="combo-box-demo"
          options={data}
          sx={{
            width: 600,
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="filled"
                label={option.label}
                {...getTagProps({index})}
                key={index}
                sx={{
                  backgroundColor: chipColor,
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '0px 4px 0px 4px',
                  fontFamily: fontFamily,
                  fontSize: '12px',
                  maxHeight: '20px',
                }}
                deleteIcon={<img src={closeSVG} />}
              />
            ))
          }
          getOptionLabel={option => option.label}
          renderOption={(props, option) => (
            <li {...props} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Typography sx={{fontSize: '14px', fontFamily: fontFamily}}>{option.label} </Typography>
              {isValueSelected(option.value) && <CheckCircleOutlineIcon sx={{fontSize: 18, color: '#a7a7a8'}} />}
            </li>
          )}
          renderInput={params => <TextField {...params} size="small" />}
          ListboxProps={{
            style: {
              maxHeight: '175px',
            },
          }}
          clearIcon={<img src={clearSVG} />}
          PaperComponent={CustomPaper}
          {...props}
        />
      </ThemeProvider>
    </span>
  );
};
