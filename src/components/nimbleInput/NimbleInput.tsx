import React, {useEffect, useMemo, useState, forwardRef, useImperativeHandle} from 'react';
import {
  TextField,
  Box,
  InputAdornment,
  InternalStandardProps as StandardProps,
  IconButton,
  Typography,
} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {debounce} from 'lodash';

import {InputLabel, InputError, InputLabelProps, InputBoxProps, InputHelperText} from '../shared';

import theme from './CustomTheme';
import searchSVG from '../../assets/images/search.svg';

interface NimbleInputProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'>,
    InputLabelProps,
    InputBoxProps {
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  defaultValue?: string;
  onChange?: (value: string | React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: any | undefined) => void;
  startIcon?: any;
  type: 'text' | 'password' | 'number' | 'search' | 'email';
  helperText?: string;
  disabled?: boolean;
  name?: string;
  multiline?: boolean;
  rowCount?: number;
  maxLength?: number;
  showCharCount?: boolean;
  isFormik?: boolean;
  value?: any;
}

export const NimbleInput = forwardRef<any, NimbleInputProps>(
  (
    {
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
      onBlur,
      startIcon,
      type = 'text',
      helperText,
      disabled = false,
      name = undefined,
      multiline = false,
      rowCount,
      maxLength,
      showCharCount,
      isFormik = false,
      value,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<string | undefined>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [emailInputError, setEmailInputError] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      clear() {
        setInternalValue('');
      },
    }));

    useEffect(() => {
      setInternalValue(defaultValue || '');
    }, [defaultValue]);

    const customTheme = useMemo(() => {
      return theme(isError || emailInputError, borderColor, hoverBoxShadow, activeBoxShadow, disabled);
    }, [isError, borderColor, hoverBoxShadow, activeBoxShadow, disabled, emailInputError]);

    const handleSearch = (value: any) => {
      onChange && onChange(value);
    };

    let regex = useMemo(
      () =>
        new RegExp(
          '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])',
        ),
      [],
    );

    const handleOnBlur = (event: any) => {
      if (type === 'email') {
        const valid = regex.test(event.target.value);
        setEmailInputError(event.target.value ? !valid : false);
      }
      onBlur && onBlur(event);
    };

    const inputChangeDebouncer = useMemo(() => debounce(handleSearch, 500), []);

    const handleClickShowPassword = () => setShowPassword(show => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    return (
      <Box sx={{width}}>
        <InputLabel
          labelSize={labelSize}
          labelWeight={labelWeight}
          fontFamily={fontFamily}
          isRequired={isRequired}
          label={label}
          disabled={disabled}
        />
        <ThemeProvider theme={customTheme}>
          <TextField
            size="small"
            sx={{
              width,
              fontFamily,
            }}
            placeholder={placeholder}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const temp = event.target.value;
              if (isFormik) {
                onChange && onChange(event);
              } else {
                setInternalValue(temp);
                inputChangeDebouncer(temp);
              }
            }}
            onBlur={handleOnBlur}
            value={isFormik ? value : internalValue}
            InputProps={{
              startAdornment: startIcon && <InputAdornment position="start">{startIcon}</InputAdornment>,
              endAdornment: (type === 'password' || type === 'search') && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    disabled={disabled}>
                    {type === 'password' && (showPassword ? <VisibilityOff /> : <Visibility />)}
                    {type === 'search' && <img src={searchSVG} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: maxLength || undefined,
            }}
            type={showPassword || type === 'search' ? 'text' : type}
            disabled={disabled}
            name={name}
            multiline={multiline}
            rows={multiline ? rowCount : undefined}
          />
        </ThemeProvider>
        <InputError
          isError={isError || emailInputError}
          errorMessage={emailInputError ? 'Please enter valid email' : errorMessage}
          fontFamily={fontFamily}
        />
        <InputHelperText helperText={helperText} isError={isError} fontFamily={fontFamily} />
        {maxLength && showCharCount && (
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Typography sx={{color: '#6F7175', fontWeight: '400', fontFamily, fontSize: '12px'}}>
              {internalValue?.length || 0}/{maxLength}
            </Typography>
          </Box>
        )}
      </Box>
    );
  },
);
