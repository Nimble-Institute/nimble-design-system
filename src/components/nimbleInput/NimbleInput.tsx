import React, {useEffect, useMemo, useState} from 'react';
import {TextField, Box, InputAdornment, InternalStandardProps as StandardProps, IconButton} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {debounce} from 'lodash';

import {InputLabel, InputError, InputLabelProps, InputBoxProps, InputHelperText} from '../shared';

import theme from './CustomTheme';

interface NimbleInputProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'>,
    InputLabelProps,
    InputBoxProps {
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  startIcon?: any;
  type: 'text' | 'password' | 'number';
  helperText?: string;
}

export const NimbleInput: React.FC<NimbleInputProps> = ({
  label,
  labelSize = 14,
  labelWeight = '600',
  placeholder,
  fontFamily,
  isRequired,
  isError,
  errorMessage,
  borderColor = '#9A9FA5',
  activeBoxShadow = '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
  hoverBoxShadow = '0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #50606B inset',
  width = '100%',
  defaultValue,
  onChange,
  startIcon,
  type = 'text',
  ref,
  helperText,
}) => {
  const [internalValue, setInternalValue] = useState<string | undefined>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setInternalValue(defaultValue || '');
  }, [defaultValue]);

  const customTheme = useMemo(() => {
    return theme(isError, borderColor, hoverBoxShadow, activeBoxShadow);
  }, [isError, borderColor, hoverBoxShadow, activeBoxShadow]);

  const handleSearch = (value: any) => {
    onChange && onChange(value);
  };

  const inputChangeDebouncer = useMemo(() => debounce(handleSearch, 500), []);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box>
      <InputLabel
        labelSize={labelSize}
        labelWeight={labelWeight}
        fontFamily={fontFamily}
        isRequired={isRequired}
        label={label}
      />
      <ThemeProvider theme={customTheme}>
        <TextField
          size="small"
          sx={{width, fontFamily}}
          placeholder={placeholder}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const temp = event.target.value;
            setInternalValue(temp);
            inputChangeDebouncer(temp);
          }}
          value={internalValue}
          InputProps={{
            startAdornment: startIcon && <InputAdornment position="start">{startIcon}</InputAdornment>,
            endAdornment: type === 'password' && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          type={showPassword ? 'text' : type}
          inputRef={ref}
        />
      </ThemeProvider>
      <InputError isError={isError} errorMessage={errorMessage} fontFamily={fontFamily} />
      <InputHelperText helperText={helperText} isError={isError} fontFamily={fontFamily} />
    </Box>
  );
};
