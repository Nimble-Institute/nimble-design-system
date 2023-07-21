import {createTheme} from '@mui/material/styles';

const theme = () =>
  createTheme({
    components: {
      MuiAccordionSummary: {
        styleOverrides: {
          expandIconWrapper: {
            transform: 'none !important',
          },
        },
      },
    },
  });

export default theme;
