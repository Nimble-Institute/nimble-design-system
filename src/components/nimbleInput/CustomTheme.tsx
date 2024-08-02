import { createTheme } from '@mui/material/styles';

const theme = (
  isError: boolean | undefined,
  borderColor: string,
  hoverBoxShadow: string,
  activeBoxShadow: string,
  disabled: boolean,
  textColor: string,
  fontFamily?: string,
  backgroundColor?: string,
) =>
  createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '5px',
            background: disabled ? '#ededed' : backgroundColor || undefined,
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: isError ? '#EC4C29' : borderColor,
              boxShadow: isError ? '0px 0px 0px 2px #FAD4CC' : ' 0px 1px 4px 0px rgba(39, 47, 53, 0.08);',
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
            },
            '& input': {
              fontSize: '14px',
              fontFamily,
              fontWeight: '400',

              color: `${textColor} !important`,
            },
            '& textarea': {
              fontSize: '14px',
              fontFamily,
              fontWeight: '400',
            },
            '*::-webkit-scrollbar': {
              width: '0.3em',
            },
            '*::-webkit-scrollbar-track': {
              WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            },
            '*::-webkit-scrollbar-thumb': {
              outline: '1px solid #ababab',
              backgroundColor: '#d6d6d6',
              borderRadius: '4px',
            },
          },
        },
      },
    },
  });

export default theme;
