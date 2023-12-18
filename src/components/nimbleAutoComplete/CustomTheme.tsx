import {createTheme} from '@mui/material/styles';

const theme = (
  isError: boolean | undefined | never[],
  borderColor: string,
  hoverBoxShadow: string,
  activeBoxShadow: string,
  disabled: boolean,
  fontFamily: string,
  fontSize: number,
  backgroundColor?: string,
) =>
  createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '5px',
            background: disabled ? undefined : backgroundColor || undefined,
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: isError ? '#EC4C29' : borderColor,
              boxShadow: isError ? '0px 0px 0px 2px #FAD4CC' : 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: !disabled ? 'none' : undefined,
              boxShadow: !disabled ? hoverBoxShadow : 'none',
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
              fontSize: `${fontSize}px`,
              fontWeight: '400',
              fontFamily,
            },
            '& input::placeholder': {
              fontSize: `${fontSize}px`,
              fontWeight: '400',
              fontFamily,
            },
          },
        },
      },
    },
  });

export default theme;
