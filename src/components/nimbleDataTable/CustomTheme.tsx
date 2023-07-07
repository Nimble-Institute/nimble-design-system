import {createTheme} from '@mui/material/styles';

const theme = (borderColor: string, hoverBoxShadow: string, activeBoxShadow: string, primaryColor: string) =>
  createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '5px',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: borderColor,
              boxShadow: 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none',
              boxShadow: hoverBoxShadow,
            },
            '&:focus-within .MuiOutlinedInput-notchedOutline': {
              border: '0px',
              boxShadow: activeBoxShadow,
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
