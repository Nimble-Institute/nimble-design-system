import React, {useEffect, useRef, useState, useMemo} from 'react';
import {Pagination, Table, TableBody, TableContainer, TableHead, TableRow, TableSortLabel} from '@mui/material';

import {orderBy, forOwn, debounce} from 'lodash';

import SortIcon from '../shared/icons/SortIcon';
import {PaginationDataType} from '../shared';
import {
  StyledTableHeaderCell,
  StyledTableBodyCell,
  PaginationWrapper,
  CustomPaginationWrapper,
  CustomPaginationText,
  PageNumberInput,
  PaginationGoButton,
  PaginationGoButtonText,
  ArrowForwardIosIconWrapper,
  StyledTableRow,
} from './StyledWrappers';
import FilterInputItem from './FilterInputItem';

interface CustomFilterSelection {
  label: string;
  value: string;
}
export interface ColumnDataType {
  label: string;
  key?: string;
  sort?: boolean;
  filter?: boolean;
  filterType?: 'text' | 'select' | 'date-range' | 'multi-select';
  customFilterSelections?: CustomFilterSelection[];
  component?: any;
  width?: string;
}

export const NimbleBasicDataTable = ({
  columns,
  rows,
  fontFamily = 'Arial',
  paginationData,
  clickCustomPagination,
  onChangeColumnFilters,
  onClickSort,
  onClickRow,
  rowHoverColor = '#f0f0f0',
  backgroundColor = '#ffffff',
  isEnableRowHoverPointer = false,
}: {
  columns: any;
  rows: any;
  fontFamily: string;
  paginationData?: PaginationDataType;
  clickCustomPagination?: (page: number) => void;
  onChangeColumnFilters?: (filterData: {[key: string]: string}) => void;
  onClickSort?: (sortKey: string | undefined, sortOrder: string) => void;
  onClickRow?: (item: any) => void;
  rowHoverColor?: string;
  isEnableRowHoverPointer: boolean;
  backgroundColor?: string;
}) => {
  const [orderByState, setOrderByState] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [rowData, setrowData] = useState(rows);
  const [filterData, setFilterData] = useState<any>(null);
  const [sortData, setSortData] = useState<any>(null);

  const customPaginationInputref = useRef<any>(null);

  useEffect(() => {
    setrowData(orderBy(rowData, [row => row[orderByState]?.toLowerCase()], order));
  }, [orderByState, order]);

  const handleFilterChange = (value: string | string[], key: string | undefined): void => {
    if (onChangeColumnFilters && key) {
      const newFilterData = value
        ? {
            ...filterData,
            [key]: value,
          }
        : {...filterData};

      if (!value) {
        delete newFilterData[key];
      }

      setFilterData(newFilterData);
      onChangeColumnFilters(newFilterData);
    }
  };

  const filterChangeDebounceHandler = useMemo(() => debounce(handleFilterChange, 500), [filterData]);

  const handleRequestSort = (property: string | undefined): void => {
    if (property) {
      const isAsc = orderByState === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderByState(property);
    }
  };

  const handleClickCustomPagination = () => {
    const val = customPaginationInputref?.current.value;
    clickCustomPagination && clickCustomPagination(val || 1);
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
        return orderBy(rowData, sortKeys, values);
      } else {
        return rowData;
      }
    }, [sortData, rowData]) || [];

  return (
    <TableContainer>
      <Table aria-label="Basic table">
        <TableHead>
          <TableRow>
            {columns?.map((column: any) => (
              <StyledTableHeaderCell fontFamily={fontFamily} width={column.width}>
                <TableSortLabel
                  active={orderByState === column.key}
                  direction={orderByState === column.key ? order : 'asc'}
                  onClick={() => {
                    handleRequestSort(column.key);
                  }}
                  IconComponent={column.sort ? SortIcon : undefined}>
                  {column.label}
                </TableSortLabel>
              </StyledTableHeaderCell>
            ))}
          </TableRow>
          <TableRow>
            {onChangeColumnFilters && (
              <>
                {columns.map((item: ColumnDataType, index: number) => (
                  <th key={`filter-${index}`}>
                    <FilterInputItem
                      item={item}
                      filterChangeDebounceHandler={filterChangeDebounceHandler}
                      sanatizedData={sanatizedData}
                      fontFamily={fontFamily}
                    />
                  </th>
                ))}
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData?.map((row: any) => (
            <StyledTableRow
              key={row.name}
              hoverColor={rowHoverColor}
              colorBackground={backgroundColor}
              onClick={() => {
                onClickRow?.(row);
              }}
              enablecursor={+isEnableRowHoverPointer}>
              {columns?.map((column: any) => (
                <StyledTableBodyCell fontFamily={fontFamily} align="left">
                  {row[column.key]}
                </StyledTableBodyCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {paginationData && paginationData?.totalPage > 0 && (
        <PaginationWrapper>
          <Pagination
            count={paginationData?.totalPage}
            page={paginationData?.page}
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
              <ArrowForwardIosIconWrapper />
            </PaginationGoButton>
          </CustomPaginationWrapper>
        </PaginationWrapper>
      )}
    </TableContainer>
  );
};
