import React, {useMemo, useState} from 'react';
import {Pagination, IconButton, OutlinedInput, InputAdornment, Button, Collapse, Typography} from '@mui/material';
import Search from '@mui/icons-material/Search';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import {orderBy, forOwn, debounce} from 'lodash';

import {
  Container,
  SearchBarContainer,
  SearchBarWrapper,
  SearchBar,
  FilterIcon,
  MainActionButton,
  MainTable,
  MainTableHead,
} from './StyledWrappers';

import filterIcon from '../../assets/images/table/filter.svg';

interface ColumnDataType {
  label: string;
  dataPoint?: string;
  sort?: boolean;
  filter?: boolean;
  component?: any;
  width?: string;
}

interface NimbleDataTableProps {
  onChangeSearchText?: (text: string) => void;
  searchPlaceHolder?: string;
  mainActionIcon?: any;
  mainActionLabel?: string;
  mainActionButtonColor: string;
  columnData: ColumnDataType[];
}

export const NimbleDataTable: React.FC<NimbleDataTableProps> = ({
  onChangeSearchText,
  searchPlaceHolder = 'Search Data',
  mainActionIcon,
  mainActionLabel = 'Add Data',
  mainActionButtonColor = '#9fc540',
  columnData,
}) => {
  const [enableColumnFilter, setEnableColumnFilter] = useState<boolean>(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChangeSearchText) {
      onChangeSearchText(event.target.value);
    }
  };

  const searchDebounceHandler = useMemo(() => debounce(handleSearch, 500), []);

  return (
    <Container>
      <SearchBarContainer>
        <SearchBarWrapper>
          <SearchBar
            onChange={searchDebounceHandler}
            placeholder={searchPlaceHolder}
            endAdornment={
              <InputAdornment position="end">
                <Search sx={{fontSize: '20px'}} />
              </InputAdornment>
            }
          />
        </SearchBarWrapper>
        <FilterIcon
          src={filterIcon}
          alt="addIcon"
          onClick={() => {
            setEnableColumnFilter(!enableColumnFilter);
          }}
        />
        <MainActionButton
          onClick={() => {}}
          variant="contained"
          size="small"
          startIcon={mainActionIcon ? <img src={mainActionIcon} /> : <ControlPointIcon />}
          mainActionButtonColor={mainActionButtonColor}>
          {mainActionLabel}
        </MainActionButton>
      </SearchBarContainer>
      <MainTable>
        <MainTableHead>
          <tr>
            {columnData.map((item, index) => (
              <th key={index}>
                <Typography
                  sx={{
                    display: 'flex',
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '150.9%',
                    textTransform: 'uppercase',
                  }}>
                  {item.label}
                </Typography>
              </th>
            ))}
          </tr>
        </MainTableHead>
      </MainTable>
    </Container>
  );
};
