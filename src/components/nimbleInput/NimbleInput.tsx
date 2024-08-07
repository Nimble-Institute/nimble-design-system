import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  InternalStandardProps as StandardProps,
  TextField,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { debounce } from 'lodash';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';

import { InputBoxProps, InputError, InputHelperText, InputLabel, InputLabelProps } from '../shared';

import searchSVG from '../../assets/images/search.svg';
import theme from './CustomTheme';

export interface NimbleInputProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'>,
    InputLabelProps,
    InputBoxProps {
  /**
   * Placeholder that is shown when the input is empty
   * MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/placeholder)
   */
  placeholder?: string;
  /**
   * Toggle if the input has a error
   */
  isError?: boolean;
  /**
   * Error message that is shown when isError is true
   */
  errorMessage?: string;
  /**
   * The default value that is put into the input
   */
  defaultValue?: string;
  /**
   * Event that is triggered the value of the input changes
   * @param value The value of the input
   * @returns {void}
   */
  onChange?: (value: string | React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Event that is triggered when the input is blurred
   * @param event The event of the input
   * @returns {void}
   */
  onBlur?: (event: any | undefined) => void;
  /**
   * Icon that is shown at the start of the input
   */
  startIcon?: any;
   /**
   * Icon that is shown at the end of the input
   */
  endIcon?: any;
  /**
   * Type of the input element that is shown
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/type)
   */
  type: string;
  /**
   * Shows a helper text below the input field
   */
  helperText?: string;
  /**
   * Toggles the disabled state of the input
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/disabled)
   */
  disabled?: boolean;
  /**
   * Name of the input field that is sent with the form data
   */
  name?: string;
  /**
   * Toggles if the input is a multiline input
   */
  multiline?: boolean;
  /**
   * Number of rows that are shown in the multiline input
   */
  rowCount?: number;
  /**
   * Maximum length of the input
   */
  maxLength?: number;
  /**
   * Toggles if the character count is shown
   */
  showCharCount?: boolean;
  /**
   * Toggles if the input is used in a formik form
   */
  isFormik?: boolean;
  /**
   * Value of the input field
   */
  value?: any;
  /**
   * Color that the text of the input has
   */
  textColor?: string;
  /**
   * Background color of the input
   */
  backgroundColor?: string;
}

export const NimbleInput = forwardRef<any, NimbleInputProps>(
  (
    {
      label,
      labelSize = 14,
      labelWeight = '600',
      placeholder,
      fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
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
      endIcon,
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
      backgroundColor,
      textColor = '#121212',
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
      return theme(
        isError || emailInputError,
        borderColor,
        hoverBoxShadow,
        activeBoxShadow,
        disabled,
        fontFamily,
        textColor,
        backgroundColor,
      );
    }, [
      isError,
      borderColor,
      hoverBoxShadow,
      activeBoxShadow,
      disabled,
      emailInputError,
      fontFamily,
      backgroundColor,
      textColor,
    ]);

    const handleSearch = (value: any) => {
      onChange && onChange(value);
    };

    const regex = useMemo(
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
              endAdornment: endIcon ? <InputAdornment position="end">{endIcon}</InputAdornment> :
              (type === 'password' || type === 'search') && (
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
