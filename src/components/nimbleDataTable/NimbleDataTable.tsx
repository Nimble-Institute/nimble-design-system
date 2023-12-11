import React, {useMemo, useState, ReactElement, useRef, useEffect} from 'react';
import {orderBy, forOwn, debounce} from 'lodash';
import {Pagination, IconButton, InputAdornment, Collapse, Box, CircularProgress, Radio} from '@mui/material';
import {ControlPoint, ArrowDropUp, ArrowDropDown} from '@mui/icons-material';
import {ThemeProvider} from '@mui/material/styles';

import {
  Container,
  SearchBarContainer,
  SearchBarWrapper,
  SearchBar,
  ActionIcon,
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
  CustomPaginationWrapper,
  CustomPaginationText,
  PageNumberInput,
  PaginationGoButton,
  PaginationGoButtonText,
  LoaderWrapper,
  IconWrapper,
} from './StyledWrappers';
import FilterInputItem from './FilterInputItem';

import FilterImage from '../shared/icons/FiltorIcon';
import DownloadImage from '../shared/icons/DownloadIcon';
import RefreshImage from '../shared/icons/RefreshIcon';
import searchSVG from '../../assets/images/search.svg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import theme from './CustomTheme';
import {fontWeight, PaginationDataType} from '../shared';
import {NimbleButton} from '../nimbleButton/NimbleButton';

interface CustomFilterSelection {
  label: string;
  value: string;
}

export interface ColumnDataType {
  label: string;
  dataPoint?: string;
  sort?: boolean;
  filter?: boolean;
  filterType?: 'text' | 'select' | 'date-range' | 'multi-select';
  customFilterSelections?: CustomFilterSelection[];
  component?: any;
  width?: string;
}

export interface RowActionType {
  icon: ReactElement<any>;
  onClick: (item: any) => void;
  swapAction?: (value: any) => boolean;
  swapActionColumn?: string;
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
  clickCustomPagination?: (page: number) => void;
  onClickSort?: (sortKey: string | undefined, sortOrder: string) => void;
  onClickRow?: (item: any) => void;
  loading?: boolean;
  isEnableRowHoverPointer?: boolean;
  defaultSorting?: {sortKey: string; sortOrder: string};
  isEnableTopActions?: boolean;
  mainFilterComponent?: React.ReactNode;
  isEnableSelections?: boolean;
  selectionDataKey?: string;
  selectionCallBack?: (value: Record<string, boolean>) => void;
  isEnableRefresh?: boolean;
  refreshCallBack?: () => void;
  isEnableExport?: boolean;
  exportCallback?: () => void;
  selectAllCallback?: () => void;
  copySelectionButtonLabel?: string;
  selectAllButtonLabel?: string;
  onClickRowSelection?: (item: any) => void;
  selectedRows?: string[];
  selectAllDisabled?: boolean;
  copySlecetionDisabled?: boolean;
  minHeight?: string;
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
  clickCustomPagination,
  rowActions,
  onClickSort,
  onClickRow,
  loading = false,
  isEnableRowHoverPointer = false,
  defaultSorting,
  isEnableTopActions = false,
  mainFilterComponent,
  isEnableSelections = false,
  selectionDataKey,
  selectionCallBack,
  isEnableRefresh = false,
  isEnableExport = false,
  refreshCallBack,
  exportCallback,
  selectAllCallback,
  copySelectionButtonLabel = 'Copy Selection',
  selectAllButtonLabel = 'Select All',
  onClickRowSelection,
  selectedRows,
  selectAllDisabled = false,
  copySlecetionDisabled = false,
  minHeight = '40vh',
}) => {
  const [enableColumnFilter, setEnableColumnFilter] = useState<boolean>(false);
  const [sortData, setSortData] = useState<any>(null);
  const [filterData, setFilterData] = useState<any>(null);
  const [hoverRowIndex, setHoverRowIndex] = useState<number | null>(null);

  const [selectedRadioValues, setSelectedRadioValues] = React.useState<Record<string, boolean>>({});

  useEffect(() => {
    if (selectionDataKey) {
      const selections: Record<string, boolean> = {};

      data?.forEach(item => {
        const key = item[selectionDataKey];
        selections[key] = selectedRows?.includes(key) ? true : false;
      });
      setSelectedRadioValues({
        ...selections,
      });
    }
  }, [data, selectionDataKey]);

  useEffect(() => {
    defaultSorting &&
      setSortData({
        ...(isEnableMultipleSort ? sortData : {}),
        [defaultSorting.sortKey]: defaultSorting.sortOrder,
      });
  }, []);

  const customPaginationInputref = useRef<any>(null);

  const customTheme = useMemo(() => {
    return theme(InputFieldBorderColor, InputFieldHoverBoxShadow, InputFieldActiveBoxShadow, primaryColor);
  }, [InputFieldBorderColor, InputFieldHoverBoxShadow, InputFieldActiveBoxShadow, primaryColor]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChangeSearchText) {
      onChangeSearchText(event.target.value);
    }
  };

  const handleFilterChange = (value: string | string[], dataPoint: string | undefined): void => {
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
      onClickSort && onClickSort(sortKey, sortOrder);
      setSortData({
        ...(isEnableMultipleSort ? sortData : {}),
        [sortKey]: sortOrder,
      });
    }
  };

  const handleClickMainAction = () => {
    onClickMainAction && onClickMainAction();
  };

  const handleClickCustomPagination = () => {
    const val = customPaginationInputref?.current.value;
    const {totalPage} = paginationData;
    if (totalPage >= parseInt(val)) {
      clickCustomPagination && clickCustomPagination(val || 1);
    } else {
      alert('The value you entered greater than total page count');
    }
  };

  const sanatizedData =
    useMemo(() => {
      if (sortData && !onClickSort) {
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
    <Container minHeight={minHeight}>
      <ThemeProvider theme={customTheme}>
        {(isEnableTopActions || isEnableSelections) && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              padding: '20px 20px 10px 20px',
              alignItems: 'flex-end',
              gap: '15px',
            }}>
            {mainFilterComponent}

            <NimbleButton
              variant="contained"
              label={selectAllButtonLabel}
              fontFamily={fontFamily}
              onClick={() => {
                let temp = selectedRadioValues;
                for (let key in temp) {
                  temp[key] = true;
                }
                setSelectedRadioValues({
                  ...temp,
                });
                selectAllCallback && selectAllCallback();
              }}
              size="small"
              height="34px"
              color="#E2E2E2"
              labelColor="#415168"
              disabled={selectAllDisabled}
            />
            <NimbleButton
              variant="contained"
              fontFamily={fontFamily}
              label={copySelectionButtonLabel}
              onClick={() => {
                selectionCallBack && selectionCallBack(selectedRadioValues);
              }}
              size="small"
              height="34px"
              color="#E2E2E2"
              labelColor="#415168"
              disabled={copySlecetionDisabled}
            />
          </Box>
        )}
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
          {onChangeColumnFilters && (
            <ActionIcon
              size="small"
              onClick={() => {
                setEnableColumnFilter(!enableColumnFilter);
              }}>
              <FilterImage color={enableColumnFilter ? primaryColor : '#383838'} />
            </ActionIcon>
          )}
          {isEnableExport && (
            <ActionIcon
              size="small"
              onClick={() => {
                exportCallback && exportCallback();
              }}>
              <DownloadImage color={enableColumnFilter ? primaryColor : '#383838'} />
            </ActionIcon>
          )}
          {isEnableRefresh && (
            <ActionIcon
              size="small"
              onClick={() => {
                let temp = selectedRadioValues;
                for (let key in temp) {
                  temp[key] = false;
                }
                setSelectedRadioValues({
                  ...temp,
                });
                refreshCallBack && refreshCallBack();
              }}>
              <RefreshImage color={enableColumnFilter ? primaryColor : '#383838'} />
            </ActionIcon>
          )}
          {onClickMainAction && (
            <MainActionButton
              onClick={handleClickMainAction}
              variant="contained"
              size="small"
              startIcon={mainActionIcon ? <img src={mainActionIcon} /> : <ControlPoint />}
              buttoncolor={primaryColor}
              fontFamily={fontFamily}>
              {mainActionLabel}
            </MainActionButton>
          )}
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
              {rowActions && rowActions.length > 0 && <th style={{width: '90px'}} />}
            </tr>
            {onChangeColumnFilters && (
              <tr>
                {columnData.map((item: ColumnDataType, index: number) => (
                  <th key={`filter-${index}`}>
                    <Collapse in={enableColumnFilter}>
                      <FilterInputItem
                        item={item}
                        filterChangeDebounceHandler={filterChangeDebounceHandler}
                        sanatizedData={sanatizedData}
                        fontFamily={fontFamily}
                      />
                    </Collapse>
                  </th>
                ))}
              </tr>
            )}
          </MainTableHead>
          {sanatizedData.length === 0 && loading && (
            <tr>
              <td colSpan={columnData.length + 1}>
                <LoaderWrapper>
                  <CircularProgress sx={{fontSize: '20px', color: primaryColor}} />
                </LoaderWrapper>
              </td>
            </tr>
          )}
          <MainTableBody>
            {sanatizedData.map((item: any, index: number) => (
              <StyledTableRow
                key={index}
                onMouseOver={() => setHoverRowIndex(index)}
                onMouseLeave={() => setHoverRowIndex(null)}
                hoverColor={rowHoverColor}
                onClick={() => {
                  onClickRow?.(item);
                }}
                enablecursor={+isEnableRowHoverPointer}>
                {columnData.map((cData, index) => (
                  <td key={index} style={{width: cData.width}}>
                    {!cData.component && cData.dataPoint && (
                      <TableValue fontFamily={fontFamily} fontSize={dataFontSize}>
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
                          <>
                            {rowActionsItem.swapAction && rowActionsItem.swapActionColumn ? (
                              rowActionsItem.swapAction(item[rowActionsItem.swapActionColumn]) && (
                                <IconWrapper
                                  onClick={e => {
                                    e.stopPropagation();
                                    rowActionsItem.onClick(item);
                                  }}
                                  key={`data-table-action-${actionIndex}`}>
                                  {rowActionsItem.icon}
                                </IconWrapper>
                              )
                            ) : (
                              <IconWrapper
                                onClick={e => {
                                  e.stopPropagation();
                                  rowActionsItem.onClick(item);
                                }}
                                key={`data-table-action-${actionIndex}`}>
                                {rowActionsItem.icon}
                              </IconWrapper>
                            )}
                          </>
                        )
                      );
                    })}
                  </ActionCell>
                )}
                {isEnableSelections && selectionDataKey && (
                  <td style={{width: '15px'}}>
                    <Radio
                      name={`row-selection-${item[selectionDataKey]}`}
                      value={item[selectionDataKey]}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const curruent = selectedRadioValues[item[selectionDataKey]];
                        setSelectedRadioValues({
                          ...selectedRadioValues,
                          [item[selectionDataKey]]: !curruent,
                        });
                      }}
                      onClick={event => {
                        event.stopPropagation();
                        setSelectedRadioValues({
                          ...selectedRadioValues,
                          [item[selectionDataKey]]: false,
                        });
                        onClickRowSelection && onClickRowSelection(item);
                      }}
                      checked={selectedRadioValues[item[selectionDataKey]] === true}
                      size="small"
                    />
                  </td>
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
              onChange={(event: any, page: number) => {
                customPaginationInputref.current.value = '';
                paginationData.onPageChnage(event, page);
              }}
              sx={{button: {color: '#383838'}}}
              color="primary"
            />
            <CustomPaginationWrapper>
              <CustomPaginationText fontFamily={fontFamily}>Go to page</CustomPaginationText>
              <PageNumberInput
                placeholder="..."
                inputRef={customPaginationInputref}
                type="number"
                fontFamily={fontFamily}
              />
              <PaginationGoButton onClick={handleClickCustomPagination}>
                <PaginationGoButtonText fontFamily={fontFamily}>Go</PaginationGoButtonText>
                <ArrowForwardIosIcon sx={{fontSize: '12px', color: '#383838'}} />
              </PaginationGoButton>
            </CustomPaginationWrapper>
          </PaginationWrapper>
        )}
      </ThemeProvider>
    </Container>
  );
};
