import {createTheme} from '@mui/material/styles';

const theme = (isError: boolean | undefined, borderColor: string, hoverBoxShadow: string, activeBoxShadow: string) =>
  createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '5px',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: isError ? '#EC4C29' : borderColor,
              boxShadow: isError ? '0px 0px 0px 2px #FAD4CC' : 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none',
              boxShadow: hoverBoxShadow,
            },
            '&:focus-within .MuiOutlinedInput-notchedOutline': {
              border: '0px',
              boxShadow: activeBoxShadow,
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

export default theme;
