import {createTheme} from '@mui/material/styles';

const theme = (
  activeColor: string,
  fontSize: string,
  color: string,
  fontFamily?: string,
  type?: string,
  activeCardColor?: string,
  inActiveCardColor?: string,
) =>
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
            height: type === 'card' ? 0 : '4px',
          },
          root: {
            maxHeight: '60px',
            ...(type === 'card'
              ? {
                  alignItems: 'center',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }
              : undefined),
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
            ...(type === 'card'
              ? {
                  backgroundColor: inActiveCardColor,
                  '&.Mui-selected': {
                    backgroundColor: activeCardColor,
                  },
                }
              : undefined),
          },
        },
      },
    },
  });

export default theme;
