import {createTheme} from '@mui/material/styles';

const theme = (activeColor: string, fontSize: string, color: string, fontFamily?: string) =>
  createTheme({
    palette: {
      primary: {
        main: activeColor,
      },
    },
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            height: '4px',
          },
          root: {
            maxHeight: '60px',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontSize,
            fontWeight: '600',
            fontFamily,
            color,
            textTransform: 'none',
          },
        },
      },
    },
  });

export default theme;
