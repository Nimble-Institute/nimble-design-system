import React, {useEffect, useMemo} from 'react';
import {Radio, RadioGroup, FormControlLabel, FormControl, Typography} from '@mui/material';
import {styled, ThemeProvider} from '@mui/material/styles';

import theme from './CustomTheme';
import {fontWeight} from '../shared';

interface RadioGroupProps {
  label?: string;
  value?: string;
  disabled?: boolean;
}

interface NimbleRadioButtonProps {
  id: string;
  name: string;
  type: 'group' | 'standalone';
  groupLabel?: string;
  labelPlacement?: 'top' | 'start' | 'end' | 'bottom';
  isRowGroup?: boolean;
  width?: string;
  radioGroups?: RadioGroupProps[];
  standaloneRadioValue?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  labelColor?: string;
  labelFontWeight?: fontWeight;
  radioLabelColor?: string;
  radioLabelFontWeight?: fontWeight;
  color?: string;
  checkedColor?: string;
  fontFamily?: string;
  isFormik?: boolean;
  value?: string;
}

export const NimbleRadioButton: React.FC<NimbleRadioButtonProps> = ({
  id,
  name,
  groupLabel,
  type = 'group',
  labelPlacement = 'end',
  isRowGroup = true,
  width = '100%',
  radioGroups,
  onChange,
  defaultValue,
  standaloneRadioValue,
  labelColor = '#000000',
  labelFontWeight = '600',
  radioLabelColor = '#000000D9',
  radioLabelFontWeight = '400',
  color = '#000000',
  checkedColor = '#0057A2',
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
  isFormik = false,
  value,
}) => {
  const [internalvalue, setInternalValue] = React.useState('');

  const customTheme = useMemo(() => {
    return theme(color, checkedColor);
  }, [color, checkedColor]);

  useEffect(() => {
    if (defaultValue) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (isFormik) {
      setInternalValue(value || '');
    }
  }, [value, isFormik]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = (event.target as HTMLInputElement).value;

    setInternalValue(newVal);
    onChange && onChange(newVal);
  };

  const handleStandaloneRadioClick = () => {
    setInternalValue('');
    onChange && onChange('');
  };

  return (
    <ThemeProvider theme={customTheme}>
      <MainFormControl>
        {groupLabel && (
          <MainLabel id={id} color={labelColor} fontWeight={labelFontWeight} fontFamily={fontFamily}>
            {groupLabel}
          </MainLabel>
        )}
        {type === 'group' ? (
          <StyledRadioGroup
            aria-labelledby={id}
            name={name}
            value={internalvalue}
            onChange={handleChange}
            row={isRowGroup}
            width={width}>
            {radioGroups?.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={<Radio size="small" />}
                label={
                  <OptionLabel fontFamily={fontFamily} fontWeight={radioLabelFontWeight} color={radioLabelColor}>
                    {item.label}
                  </OptionLabel>
                }
                labelPlacement={labelPlacement}
                disabled={item.disabled}
              />
            ))}
          </StyledRadioGroup>
        ) : (
          <Radio
            name={name}
            value={standaloneRadioValue}
            onChange={handleChange}
            onClick={handleStandaloneRadioClick}
            checked={internalvalue === standaloneRadioValue}
            size="small"
          />
        )}
      </MainFormControl>
    </ThemeProvider>
  );
};

const MainFormControl = styled(FormControl)({
  alignItems: 'flex-start',
});

const MainLabel = styled(Typography)(
  ({color, fontWeight, fontFamily}: {color?: string; fontWeight: string; fontFamily: string}) => ({
    fontSize: '16px',
    color,
    fontWeight,
    fontFamily,
  }),
);

const StyledRadioGroup = styled(RadioGroup)(({width}: {width?: string}) => ({
  width,
  justifyContent: 'space-between',
}));

const OptionLabel = styled(Typography)(
  ({color, fontWeight, fontFamily}: {color?: string; fontWeight: string; fontFamily: string}) => ({
    fontSize: '14px',
    fontWeight,
    color,
    fontFamily,
  }),
);
