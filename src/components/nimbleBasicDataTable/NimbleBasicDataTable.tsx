import React, {useEffect, useRef, useState} from 'react';
import {Pagination, Table, TableBody, TableContainer, TableHead, TableRow, TableSortLabel} from '@mui/material';

import {orderBy} from 'lodash';

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
} from './StyledWrappers';

export const NimbleBasicDataTable = ({
  columns,
  rows,
  fontFamily = 'Arial',
  paginationData,
  clickCustomPagination,
}: {
  columns: any;
  rows: any;
  fontFamily: string;
  paginationData?: PaginationDataType;
  clickCustomPagination?: (page: number) => void;
}) => {
  const [orderByState, setOrderByState] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [rowData, setrowData] = useState(rows);

  const customPaginationInputref = useRef<any>(null);

  useEffect(() => {
    setrowData(orderBy(rowData, [row => row[orderByState]?.toLowerCase()], order));
  }, [orderByState, order]);

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
        </TableHead>
        <TableBody>
          {rowData?.map((row: any) => (
            <TableRow key={row.name}>
              {columns?.map((column: any) => (
                <StyledTableBodyCell fontFamily={fontFamily} align="left">
                  {row[column.key]}
                </StyledTableBodyCell>
              ))}
            </TableRow>
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
