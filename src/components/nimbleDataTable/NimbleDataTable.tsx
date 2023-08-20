import React, {useMemo, useState, ReactElement} from 'react';
import {orderBy, forOwn, debounce} from 'lodash';
import {Pagination, IconButton, InputAdornment, Collapse, Box} from '@mui/material';
import {ControlPoint, ArrowDropUp, ArrowDropDown} from '@mui/icons-material';
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
  StyledTableRow,
  TableValue,
  PaginationWrapper,
  ActionCell,
} from './StyledWrappers';
import FilterInputItem from './FilterInputItem';

import FilterImage from '../shared/icons/FiltorIcon';
import searchSVG from '../../assets/images/search.svg';

import theme from './CustomTheme';
import {fontWeight} from '../shared';

interface PaginationDataType {
  totalPage: number;
  page: number;
  onPageChnage: (event: any, value: number) => void;
}

interface CustomFilterSelection {
  label: string;
  value: string;
}

export interface ColumnDataType {
  label: string;
  dataPoint?: string;
  sort?: boolean;
  filter?: boolean;
  filterType?: 'text' | 'select';
  customFilterSelections?: CustomFilterSelection[];
  component?: any;
  width?: string;
}

export interface RowActionType {
  icon: ReactElement<any>;
  onClick: (item: any) => void;
}

interface NimbleDataTableProps {
  onChangeSearchText?: (text: string) => void;
  searchPlaceHolder?: string;
  mainActionIcon?: any;
  mainActionLabel?: string;
  primaryColor?: string;
  InputFieldBorderColor?: string;
  InputFieldActiveBoxShadow?: string;
  InputFieldHoverBoxShadow?: string;
  fontFamily?: string;
  headerFontWeight?: fontWeight;
  headerColor?: string;
  dataFontWeight?: fontWeight;
  headerFontSize?: number;
  dataFontSize?: number;
  searchBarFontSize?: number;
  columnData: ColumnDataType[];
  onChangeColumnFilters?: (filterData: {[key: string]: string}) => void;
  data: any[];
  paginationData: PaginationDataType;
  onClickMainAction?: () => void;
  isDesktopScreen?: boolean;
  isEnableMultipleSort?: boolean;
  rowHoverColor?: string;
  rowActions?: RowActionType[];
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
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',

  headerFontWeight = '700',
  headerFontSize = 13,
  dataFontWeight = '400',
  dataFontSize = 12,
  searchBarFontSize = 13,
  headerColor = '#9B9B9B',

  columnData,
  onChangeColumnFilters,
  data,
  paginationData,
  onClickMainAction,
  isDesktopScreen = true,
  isEnableMultipleSort = false,
  rowHoverColor = '#f0f0f0',
  rowActions,
}) => {
  const [enableColumnFilter, setEnableColumnFilter] = useState<boolean>(false);
  const [sortData, setSortData] = useState<any>(null);
  const [filterData, setFilterData] = useState<any>(null);
  const [hoverRowIndex, setHoverRowIndex] = useState<number | null>(null);

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
      const newFilterData = value
        ? {
            ...filterData,
            [dataPoint]: value,
          }
        : {...filterData};

      if (!value) {
        delete newFilterData[dataPoint];
      }

      setFilterData(newFilterData);
      onChangeColumnFilters(newFilterData);
    }
  };

  const searchDebounceHandler = useMemo(() => debounce(handleSearch, 500), []);
  const filterChangeDebounceHandler = useMemo(() => debounce(handleFilterChange, 500), [filterData]);

  const handleClicShort = (sortKey: string | undefined, sortOrder: string): void => {
    if (sortKey) {
      setSortData({
        ...(isEnableMultipleSort ? sortData : {}),
        [sortKey]: sortOrder,
      });
    }
  };

  const handleClickMainAction = () => {
    onClickMainAction && onClickMainAction();
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
                  <img src={searchSVG} />
                </InputAdornment>
              }
              fontFamily={fontFamily}
              fontSize={searchBarFontSize}
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
            onClick={handleClickMainAction}
            variant="contained"
            size="small"
            startIcon={mainActionIcon ? <img src={mainActionIcon} /> : <ControlPoint />}
            buttoncolor={primaryColor}
            fontFamily={fontFamily}>
            {mainActionLabel}
          </MainActionButton>
        </SearchBarContainer>
        <MainTable>
          <MainTableHead>
            <tr>
              {columnData.map((item, index) => (
                <th key={index}>
                  <ColumnHeader>
                    <HeaderLabel
                      fontFamily={fontFamily}
                      fontWeight={headerFontWeight}
                      fontSize={headerFontSize}
                      color={headerColor}>
                      {item.label}
                    </HeaderLabel>
                    {item.sort && (
                      <SortIconsWrapper>
                        <IconButton
                          size="small"
                          sx={{height: '8px', width: '8px'}}
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
                          sx={{height: '8px', width: '8px'}}
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
              {rowActions && rowActions.length > 0 && (
                <th style={{width: '90px'}}>{/* 3<HeaderLabel>Actions</HeaderLabel> */}</th>
              )}
            </tr>
            <tr>
              {columnData.map((item: ColumnDataType, index: number) => (
                <th key={`filter-${index}`}>
                  <Collapse in={enableColumnFilter}>
                    <FilterInputItem
                      item={item}
                      filterChangeDebounceHandler={filterChangeDebounceHandler}
                      sanatizedData={sanatizedData}
                    />
                  </Collapse>
                </th>
              ))}
            </tr>
          </MainTableHead>
          <MainTableBody>
            {sanatizedData.map((item: any, index: number) => (
              <StyledTableRow
                key={index}
                onMouseOver={() => setHoverRowIndex(index)}
                onMouseLeave={() => setHoverRowIndex(null)}
                hoverColor={rowHoverColor}>
                {columnData.map((cData, index) => (
                  <td key={index} style={{width: cData.width}}>
                    {!cData.component && cData.dataPoint && (
                      <TableValue fontFamily={fontFamily} fontWeight={dataFontWeight} fontSize={dataFontSize}>
                        {item[cData.dataPoint]}
                      </TableValue>
                    )}
                    {cData.component && cData.component(item)}
                  </td>
                ))}
                {rowActions && rowActions.length > 0 && (
                  <ActionCell>
                    {rowActions?.map((rowActionsItem, actionIndex) => {
                      return (
                        isDesktopScreen &&
                        index === hoverRowIndex && (
                          <Box
                            sx={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}
                            onClick={() => rowActionsItem.onClick(item)}
                            key={`data-table-action-${actionIndex}`}>
                            {rowActionsItem.icon}
                          </Box>
                        )
                      );
                    })}
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
