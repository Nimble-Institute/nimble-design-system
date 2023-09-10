import React, {ReactElement, useEffect, useMemo, useState} from 'react';
import {Box, IconButton, Collapse} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {uniqBy} from 'lodash';

import {
  Container,
  HeaderContainer,
  HeaderText,
  SearchContainer,
  FilterContainer,
  FilterWrapper,
  Item,
  TopWrapper,
  DataWrapper,
  FooterWrapper,
} from './StyleWrapper';
import {NimbleButton, NimbleButtonProps, NimbleInput, NimbleSelect} from '../index';
import {PaginationBar, fontWeight, PaginationDataType} from '../shared';
import FilterImage from '../shared/icons/FiltorIcon';

import theme from './CustomTheme';

interface CustomFilterDataType {
  label: 'string';
  value: 'string';
}

interface FilterPanelProps {
  name: string;
  dataPoint: string;
  customFilterData?: CustomFilterDataType[];
}

interface NimbleDataGridProps {
  containerColor?: string;
  primaryColor?: string;
  width?: string;
  height?: string;
  header: string;
  isEnablePrimaryAction?: boolean;
  primaryActionProps?: NimbleButtonProps;
  fontFamily?: string;
  headerFontWeight?: fontWeight;
  headerColor?: string;
  filterPanalData?: FilterPanelProps[];
  inputBorderColor?: string;
  inputHoverShadow?: string;
  inputActiveShadow?: string;
  isEnableFilter?: boolean;
  data: any[] | [];
  renderCard: (item: any) => ReactElement;
  paginationData: PaginationDataType;
  clickCustomPagination?: (page: number) => void;
  onSearchHandler?: (searchText: string) => void;
  onChangeFilters?: (filterValues: {[key: string]: string} | {}) => void;
  onClickDataCard?: (item: any) => void;
}

export const NimbleDataGrid: React.FC<NimbleDataGridProps> = ({
  containerColor = '#B8DEFF',
  primaryColor = '#0057A2',
  width = '100%',
  height = '100%',
  header,
  headerFontWeight = '600',
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
  headerColor = '#0057A2',
  isEnablePrimaryAction = true,
  primaryActionProps,
  filterPanalData,
  inputBorderColor = '#9A9FA5',
  inputHoverShadow = '0px 0px 0px 2px #7fd3f5, 0px 0px 0px 1px #07adf0 inset',
  inputActiveShadow = '0px 0px 0px 2px #7fd3f5, 0px 0px 0px 1px #07adf0 inset',
  isEnableFilter = true,
  data = [],
  renderCard,
  paginationData,
  clickCustomPagination,
  onSearchHandler,
  onChangeFilters,
  onClickDataCard,
}) => {
  const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(false);
  const [filterPanelValues, setFilterPanelValues] = useState<{[key: string]: string}>({});

  const customTheme = useMemo(() => {
    return theme(inputBorderColor, inputHoverShadow, inputActiveShadow, primaryColor);
  }, [inputBorderColor, inputHoverShadow, inputActiveShadow, primaryColor]);

  const generateFilterSelection = (dataPoint: string, customFilterData?: CustomFilterDataType[]) => {
    if (customFilterData) {
      return customFilterData;
    }
    const result = useMemo(() => {
      const uniqueItems = uniqBy(data, dataPoint);
      return uniqueItems.map((item: any) => ({
        label: item[dataPoint],
        value: item[dataPoint],
      }));
    }, [data, dataPoint]);

    return result;
  };

  const handleClickFilter = () => {
    setFilterPanelOpen(!filterPanelOpen);
  };

  useEffect(() => {
    onChangeFilters && onChangeFilters(filterPanelValues);
  }, [filterPanelValues]);

  const handleFilterChange = (value: string, dataPoint: string) => {
    const newValue = filterPanelValues;
    newValue[dataPoint] = value;
    setFilterPanelValues({...newValue});
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container width={width} height={height} color={containerColor}>
        <TopWrapper>
          <HeaderContainer>
            <HeaderText color={headerColor} fontWeight={headerFontWeight} fontFamily={fontFamily}>
              {header}
            </HeaderText>
            {isEnablePrimaryAction && primaryActionProps && (
              <NimbleButton {...primaryActionProps} color={primaryColor} />
            )}
          </HeaderContainer>
          <SearchContainer>
            <NimbleInput
              placeholder="Search tasks"
              type="search"
              borderColor={inputBorderColor}
              hoverBoxShadow={inputHoverShadow}
              activeBoxShadow={inputActiveShadow}
              onChange={onSearchHandler}
            />
            {isEnableFilter && (
              <IconButton size="small" sx={{marginLeft: '8px'}} onClick={handleClickFilter}>
                <FilterImage color={primaryColor} />
              </IconButton>
            )}
          </SearchContainer>
          <Collapse in={filterPanelOpen}>
            <FilterContainer>
              {filterPanalData &&
                filterPanalData.map((item, index) => (
                  <FilterWrapper key={index}>
                    <NimbleSelect
                      data={generateFilterSelection(item.dataPoint, item.customFilterData)}
                      height="30px"
                      fontSize={11}
                      placeholder={item.name}
                      width="100%"
                      onChange={(value: string) => handleFilterChange(value, item.dataPoint)}
                    />
                  </FilterWrapper>
                ))}
            </FilterContainer>
          </Collapse>
        </TopWrapper>
        <DataWrapper>
          {data.length &&
            data.map((item, index) => (
              <Item key={index} elevation={0} onClick={() => onClickDataCard && onClickDataCard(item)}>
                {renderCard(item)}
              </Item>
            ))}
        </DataWrapper>
        <FooterWrapper>
          <PaginationBar
            totalPage={paginationData.totalPage}
            page={paginationData.page}
            onPageChnage={paginationData.onPageChnage}
            fontFamily={fontFamily}
            onClicksCustomPagination={clickCustomPagination}
          />
        </FooterWrapper>
      </Container>
    </ThemeProvider>
  );
};
