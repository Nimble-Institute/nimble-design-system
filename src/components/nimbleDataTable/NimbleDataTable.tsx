import React, {useMemo, useState} from 'react';
import {orderBy, forOwn, debounce} from 'lodash';
import {Pagination, IconButton, InputAdornment, Collapse} from '@mui/material';
import {Search, ControlPoint, ArrowDropUp, ArrowDropDown} from '@mui/icons-material';
import {ThemeProvider} from '@mui/material/styles';

import {
  Container,
  SearchBarContainer,
  SearchBarWrapper,
  SearchBar,
  FilterIcon,
  MainActionButton,
  MainTable,
  MainTableHead,
  MainTableBody,
  ColumnHeader,
  HeaderLabel,
  SortIconsWrapper,
  FilterInput,
  StyledTableRow,
  TableValue,
  ActionCell,
  PaginationWrapper,
} from './StyledWrappers';

import workSpaceIcon from '../../assets/images/table/workspaceIcon.svg';
import deleteIcon from '../../assets/images/table/delete.svg';
import editIcon from '../../assets/images/table/edit.svg';
import FilterImage from '../shared/icons/FiltorIcon';

import theme from './CustomTheme';

interface PaginationDataType {
  totalPage: number;
  page: number;
  onPageChnage: (event: any, value: number) => void;
}
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
  primaryColor: string;

  InputFieldBorderColor?: string;
  InputFieldActiveBoxShadow?: string;
  InputFieldHoverBoxShadow?: string;

  columnData: ColumnDataType[];
  dataViewEnable?: boolean;
  dataEditEnable?: boolean;
  dataDeleteEnable?: boolean;
  onChangeColumnFilters?: (value: string, dataPoint: string) => void;
  data: any[];
  paginationData: PaginationDataType;
}

export const NimbleDataTable: React.FC<NimbleDataTableProps> = ({
  onChangeSearchText,
  searchPlaceHolder = 'Search Data',
  mainActionIcon,
  mainActionLabel = 'Add Data',
  primaryColor = '#0057A2',
  InputFieldBorderColor = '#9A9FA5',
  InputFieldActiveBoxShadow = '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
  InputFieldHoverBoxShadow = '0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #50606B inset',
  columnData,
  onChangeColumnFilters,
  data,
  paginationData,
  dataViewEnable,
  dataEditEnable,
  dataDeleteEnable,
}) => {
  const [enableColumnFilter, setEnableColumnFilter] = useState<boolean>(false);
  const [sortData, setSortData] = useState<any>(null);

  const customTheme = useMemo(() => {
    return theme(InputFieldBorderColor, InputFieldHoverBoxShadow, InputFieldActiveBoxShadow, primaryColor);
  }, [InputFieldBorderColor, InputFieldHoverBoxShadow, InputFieldActiveBoxShadow, primaryColor]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChangeSearchText) {
      onChangeSearchText(event.target.value);
    }
  };

  const handleFilterChange = (value: string, dataPoint: string | undefined): void => {
    if (onChangeColumnFilters && dataPoint) {
      onChangeColumnFilters(value, dataPoint);
    }
  };

  const searchDebounceHandler = useMemo(() => debounce(handleSearch, 500), []);
  const filterChangeDebounceHandler = useMemo(() => debounce(handleFilterChange, 500), []);

  const handleClicShort = (sortKey: string | undefined, sortOrder: string): void => {
    if (sortKey) {
      setSortData({
        ...sortData,
        [sortKey]: sortOrder,
      });
    }
  };

  const sanatizedData =
    useMemo(() => {
      if (sortData) {
        const sortKeys: string[] = [];
        const values: any[] = [];
        forOwn(sortData, (value, key) => {
          sortKeys.push(key);
          values.push(value);
        });
        return orderBy(data, sortKeys, values);
      } else {
        return data;
      }
    }, [sortData, data]) || [];

  return (
    <Container>
      <ThemeProvider theme={customTheme}>
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
            size="small"
            onClick={() => {
              setEnableColumnFilter(!enableColumnFilter);
            }}>
            <FilterImage color={primaryColor} />
          </FilterIcon>
          <MainActionButton
            onClick={() => {}}
            variant="contained"
            size="small"
            startIcon={mainActionIcon ? <img src={mainActionIcon} /> : <ControlPoint />}
            mainActionButtonColor={primaryColor}>
            {mainActionLabel}
          </MainActionButton>
        </SearchBarContainer>
        <MainTable>
          <MainTableHead>
            <tr>
              {columnData.map((item, index) => (
                <th key={index}>
                  <ColumnHeader>
                    <HeaderLabel>{item.label}</HeaderLabel>
                    {item.sort && (
                      <SortIconsWrapper>
                        <IconButton
                          size="small"
                          sx={{height: '12px', width: '12px'}}
                          onClick={() => {
                            handleClicShort(item.dataPoint, 'desc');
                          }}>
                          <ArrowDropUp
                            sx={{
                              fontSize: '25px',
                              color:
                                item.dataPoint &&
                                sortData &&
                                sortData[item.dataPoint] &&
                                sortData[item.dataPoint] === 'desc'
                                  ? primaryColor
                                  : '#bbbdbf',
                            }}
                          />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{height: '12px', width: '12px'}}
                          onClick={() => {
                            handleClicShort(item.dataPoint, 'asc');
                          }}>
                          <ArrowDropDown
                            sx={{
                              fontSize: '25px',
                              color:
                                item.dataPoint &&
                                sortData &&
                                sortData[item.dataPoint] &&
                                sortData[item.dataPoint] === 'asc'
                                  ? primaryColor
                                  : '#bbbdbf',
                            }}
                          />
                        </IconButton>
                      </SortIconsWrapper>
                    )}
                  </ColumnHeader>
                </th>
              ))}
              {(dataViewEnable || dataEditEnable || dataDeleteEnable) && (
                <th style={{width: '90px'}}>
                  <HeaderLabel>Actions</HeaderLabel>
                </th>
              )}
            </tr>
            <tr>
              {columnData.map((item: ColumnDataType, index: number) => (
                <th key={`filter-${index}`}>
                  <Collapse in={enableColumnFilter}>
                    <div style={{display: 'flex'}}>
                      <FilterInput
                        onChange={e => filterChangeDebounceHandler(e.target.value, item.dataPoint)}
                        placeholder={`Filter ${item.label}`}
                        endAdornment={
                          <InputAdornment position="end">
                            <Search sx={{fontSize: 18}} />
                          </InputAdornment>
                        }
                      />
                    </div>
                  </Collapse>
                </th>
              ))}
            </tr>
          </MainTableHead>
          <MainTableBody>
            {sanatizedData.map((item: any, index: number) => (
              <StyledTableRow key={index}>
                {columnData.map((cData, index) => (
                  <>
                    {!cData.component && cData.dataPoint && (
                      <td key={index} style={{width: cData.width}}>
                        <TableValue>{item[cData.dataPoint]}</TableValue>
                      </td>
                    )}
                    {cData.component && (
                      <td key={index} style={{width: cData.width}}>
                        {cData.component(item)}
                      </td>
                    )}
                  </>
                ))}

                {(dataViewEnable || dataEditEnable || dataDeleteEnable) && (
                  <ActionCell>
                    {dataViewEnable && <img style={{cursor: 'pointer'}} src={workSpaceIcon} />}
                    {dataEditEnable && <img style={{cursor: 'pointer'}} src={editIcon} onClick={() => {}} />}
                    {dataDeleteEnable && <img style={{cursor: 'pointer'}} src={deleteIcon} onClick={() => {}} />}
                  </ActionCell>
                )}
              </StyledTableRow>
            ))}
          </MainTableBody>
        </MainTable>
        {paginationData.totalPage > 0 && (
          <PaginationWrapper>
            <Pagination
              count={paginationData.totalPage}
              page={paginationData.page}
              onChange={paginationData.onPageChnage}
              sx={{button: {color: '#383838'}}}
              color="primary"
            />
          </PaginationWrapper>
        )}
      </ThemeProvider>
    </Container>
  );
};
