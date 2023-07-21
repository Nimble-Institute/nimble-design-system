import React from 'react';
import {Box} from '@mui/material';
import {styled} from '@mui/system';
import {PersonAddAlt} from '@mui/icons-material';

import {NimbleInput, NimbleButton} from '../index';

const Container = styled(Box)({
  display: 'flex',
  flex: 1,
});

const SerahcInputWrapper = styled(Box)(({isprimaryactionavailable}: {isprimaryactionavailable?: boolean}) => ({
  width: '100%',
  marginRight: isprimaryactionavailable ? '8px' : '0px',
}));

export interface NimbleMobileSearchProps {
  placeholder?: string;
  borderColor?: string;
  activeBoxShadow?: string;
  hoverBoxShadow?: string;
  fontFamily?: string;
  onSearch?: (searchValue: string) => void;
  primaryColor?: string;
  isPrimaryActionAvailable?: boolean;
  primaryActionIcon?: any;
  onClickPrimaryAction?: () => void;
  searchDisabled?: boolean;
  primaryActionDisabled?: boolean;
}

export const NimbleMobileSearch: React.FC<NimbleMobileSearchProps> = ({
  placeholder,
  fontFamily,
  borderColor = '#9A9FA5',
  activeBoxShadow = '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
  hoverBoxShadow = '0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #50606B inset',
  onSearch,
  primaryColor,
  isPrimaryActionAvailable,
  onClickPrimaryAction = () => {},
  searchDisabled,
  primaryActionDisabled,
  primaryActionIcon = <PersonAddAlt />,
}) => {
  return (
    <Container>
      <SerahcInputWrapper isprimaryactionavailable={isPrimaryActionAvailable}>
        <NimbleInput
          type="search"
          onChange={onSearch}
          placeholder={placeholder}
          fontFamily={fontFamily}
          borderColor={borderColor}
          activeBoxShadow={activeBoxShadow}
          hoverBoxShadow={hoverBoxShadow}
          disabled={searchDisabled}
        />
      </SerahcInputWrapper>
      {isPrimaryActionAvailable && (
        <NimbleButton
          variant="icon"
          icon={primaryActionIcon}
          onClick={onClickPrimaryAction}
          color={primaryColor}
          disabled={primaryActionDisabled}
        />
      )}
    </Container>
  );
};
