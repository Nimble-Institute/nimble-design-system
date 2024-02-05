import React, {ReactElement, useState} from 'react';
import {Box, Typography, Popover, Button, MenuList, MenuItem} from '@mui/material';
import {styled} from '@mui/system';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {NimbleButton} from '../nimbleButton/NimbleButton';
import {fontWeight} from '../shared';

interface ButtonProps {
  buttoncolor: string;
  fontFamily: string;
  fontWeight: string;
  labelColor?: string;
  height?: string;
  fontSize: string;
}

interface OptionType {
  value: string;
  label: string;
}

interface NimblePopoverSelectProps {
  id: string;
  placeholder: string;
  selectedValue?: string;
  startIcon?: ReactElement<any>;
  data: OptionType[];
  color: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: fontWeight;
  height?: string;
  onChange: (value: OptionType) => void;
}

export const NimblePopoverSelect: React.FC<NimblePopoverSelectProps> = ({
  placeholder,
  selectedValue,
  startIcon = undefined,
  id,
  data,
  color,
  fontSize = '14px',
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
  fontWeight = '500',
  height,
  onChange,
}) => {
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [intenalSelectedValue, setInternalSelectedValue] = useState(selectedValue);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(prevOpen => !prevOpen);
    event.stopPropagation();
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    event.stopPropagation();
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleClickMenuItem = (event: Event | React.SyntheticEvent, selectedOption: OptionType) => {
    setInternalSelectedValue(selectedOption.value);
    onChange(selectedOption);
    handleClose(event);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const getSelectedLabel = () => {
    const selectedOption = data.find(option => option.value === intenalSelectedValue);
    return selectedOption?.label || placeholder;
  };

  return (
    <>
      <TextActionButton
        ref={anchorRef}
        id={id}
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant="text"
        endIcon={<KeyboardArrowDownIcon />}
        startIcon={startIcon}
        buttoncolor={color}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        height={height}
        fontSize={fontSize}>
        {getSelectedLabel()}
      </TextActionButton>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <MenuList
          autoFocusItem={open}
          id={`${id}-menu`}
          aria-labelledby={`${id}-button`}
          onKeyDown={handleListKeyDown}
          sx={{
            '&& .Mui-selected': {
              backgroundColor: '#E2E2E2',
            },
          }}>
          {data.map(option => (
            <MenuItem
              key={option.value}
              selected={option.value === intenalSelectedValue}
              onClick={event => handleClickMenuItem(event, option)}
              sx={{
                fontFamily: fontFamily,
                fontWeight: '400',
                fontSize: '12px',
              }}>
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
};

const TextActionButton = styled(Button)(({buttoncolor, fontFamily, fontWeight, height, fontSize}: ButtonProps) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textTransform: 'none',
  paddingLeft: '12px !important',
  paddingRight: '12px !important',
  borderRadius: '5px',
  color: buttoncolor,
  fontFamily,
  fontWeight,
  ':disabled': {
    color: 'rgba(0, 0, 0, 0.26)',
  },
  height: height,
  fontSize: fontSize,
}));
