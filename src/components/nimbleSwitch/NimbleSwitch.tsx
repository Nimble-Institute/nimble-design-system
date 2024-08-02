import React, { useEffect, useMemo, useState } from 'react';

import { Box, InternalStandardProps as StandardProps, Switch, Typography } from '@mui/material';
import { SwitchProps } from '@mui/material/Switch';
import { ThemeProvider, styled } from '@mui/material/styles';

import { InputLabel, InputLabelProps } from '../shared';

import theme from './CustomTheme';

interface SwitchData {
  id: number;
  label?: string;
}

interface ValueType {
  [key: number]: boolean;
}

interface NimbleSwitchProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'>,
    InputLabelProps {
  color?: string;
  switchData?: SwitchData[];
  values?: ValueType;
  onChange?: (values: ValueType) => void;
  size: 'small' | 'medium';
  name?: string;
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({theme, size}) => ({
  width: size === 'medium' ? 42 : 38,
  height: size === 'medium' ? 26 : 22,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: size === 'medium' ? 22 : 18,
    height: size === 'medium' ? 22 : 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export const NimbleSwitch: React.FC<NimbleSwitchProps> = ({
  label,
  labelSize = 14,
  labelWeight = '600',
  fontFamily,
  isRequired,
  disabled,
  color = '#0057A2',
  switchData,
  values,
  onChange,
  size = 'medium',
  name = undefined,
}) => {
  const [switchValus, setSwitchValues] = useState<ValueType | undefined>({});

  useEffect(() => {
    setSwitchValues(values);
  }, [values]);

  const customTheme = useMemo(() => {
    return theme(color);
  }, [color]);

  return (
    <Box>
      <InputLabel
        labelSize={labelSize}
        labelWeight={labelWeight}
        fontFamily={fontFamily}
        isRequired={isRequired}
        label={label}
        disabled={disabled}
      />
      <ThemeProvider theme={customTheme}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          {switchData?.map((item, index) => (
            <Box sx={{display: 'flex', flexDirection: 'row'}} key={index}>
              <IOSSwitch
                sx={{marginBottom: '10px'}}
                size={size}
                checked={(switchValus && switchValus[item.id]) || false}
                onChange={event => {
                  const newData = {
                    ...switchValus,
                    [item.id]: event.target.checked,
                  };
                  setSwitchValues(newData);
                  onChange && onChange(newData);
                }}
                disabled={disabled}
                name={name}
              />
              {item.label && (
                <Typography
                  sx={{
                    marginLeft: '10px',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily,
                    marginTop: size === 'medium' ? '2px' : '0px',
                  }}>
                  {item.label}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </ThemeProvider>
    </Box>
  );
};
