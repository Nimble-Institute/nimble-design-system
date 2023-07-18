import {createTheme} from '@mui/material/styles';

const theme = (color: string) =>
  createTheme({
    palette: {
      primary: {
        main: color,
      },
    },
  });

export default theme;
