import {createTheme} from '@mui/material/styles';

const theme = (color: string, checkedColor: string) =>
  createTheme({
    palette: {
      primary: {
        main: checkedColor,
      },
    },
    components: {
      MuiRadio: {
        styleOverrides: {
          root: {
            color: color,
          },
        },
      },
    },
  });

export default theme;
