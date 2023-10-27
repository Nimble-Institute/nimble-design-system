import React, {useState, useMemo, useRef, useEffect, ReactElement} from 'react';
import {Box, Typography, AccordionSummary, AccordionDetails, IconButton, Slide} from '@mui/material';
import {styled, ThemeProvider} from '@mui/material/styles';
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import InfiniteScroll from 'react-infinite-scroll-component';
import {ArrowDropUp, ArrowDropDown} from '@mui/icons-material';
import {orderBy} from 'lodash';

import {NimbleMobileSearch, NimbleMobileSearchProps} from '../nimbleMobileSearch/NimbleMobileSearch';
import {
  Container,
  DataContainer,
  HeaderSection,
  HeaderLabel,
  SortIconWrapper,
  SortIconButton,
  MainValueLabel,
  MainValueComponent,
} from './StyleWrappers';

import ExpandIcon from '../../assets/icons/ExpandIcon';
import DeleteIcon from '../../assets/icons/DeleteIcon';
import EditIcon from '../../assets/icons/EditIcon';
import ViewIcon from '../../assets/icons/ViewIcon';

import theme from './CustomTheme';

interface MobileDataCardDetail {
  label: string;
  value: string;
  valueColor?: string;
  component?: any;
}

interface MobileListData {
  id: number;
  mainValue?: string;
  mainComponent?: any;
  details: MobileDataCardDetail[];
}

interface NimbleMobileListViewProps extends NimbleMobileSearchProps {
  isEnableSearch?: boolean;

  isEnableSort?: boolean;
  sortLabel?: string;
  isAPISort?: boolean;
  onChangeSort?: (sort: string | null) => void;

  data: MobileListData[];
  isEnableInfiniteScroll?: boolean;
  scrollableParentHeight?: string;
  dataLength?: number;
  loadNextPage?: () => void;
  dataLoading?: boolean;

  isEnableDelete?: boolean;
  isEnableEdit?: boolean;
  isEnableDetail?: boolean;
  onDeleteItem: (item: any) => void;
  onEditItem: (item: any) => void;
  onDetailItem: (item: any) => void;
  editIconColor?: string;
  deleteIconColor?: string;
  detailIconColor?: string;

  detailLabelWidth?: string;
  detailValueWidth?: string;
  fontFamily?: string;
  isMainValueComponent?: boolean;
}

const Accordian = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({theme}) => ({
    border: '1px solid rgba(0, 0, 0, 0.04)',

    '&:before': {
      display: 'none',
    },
  }),
);

export const NimbleMobileListView: React.FC<NimbleMobileListViewProps> = ({
  data,

  isEnableSort,
  sortLabel,
  isAPISort = false,
  onChangeSort,

  isEnableSearch,
  placeholder,
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
  borderColor = '#9A9FA5',
  activeBoxShadow = '0px 0px 0px 2px #DBF2FB, 0px 0px 0px 1px #77CBED inset',
  hoverBoxShadow = '0px 0px 0px 2px #dae3f0, 0px 0px 0px 1px #50606B inset',
  onSearch,
  primaryColor = '#DF8430',
  isPrimaryActionAvailable,
  primaryActionIcon,
  onClickPrimaryAction = () => {},
  searchDisabled,
  primaryActionDisabled,

  isEnableInfiniteScroll,
  scrollableParentHeight,
  dataLength,
  loadNextPage,
  dataLoading,

  isEnableDelete = false,
  isEnableEdit = false,
  isEnableDetail = false,
  onDeleteItem,
  onEditItem,
  onDetailItem,
  editIconColor = '#5989C0',
  deleteIconColor = '#EC4C29',
  detailIconColor = '#EE7000',

  detailLabelWidth = '35%',
  detailValueWidth = '65%',
  isMainValueComponent = false,
}) => {
  const [expandCard, setExpandCard] = useState<number | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  useEffect(() => {
    if (isAPISort) {
      onChangeSort && onChangeSort(sort);
    }
  }, [sort, isAPISort]);

  const sanitizedData = useMemo(() => {
    if (isAPISort) {
      return data;
    }
    if (sort === 'asc' || sort === 'desc') {
      return orderBy(data, 'mainValue', sort);
    }
    return data;
  }, [sort, isAPISort, data]);

  const searchBarProps = {
    placeholder,
    fontFamily,
    borderColor,
    activeBoxShadow,
    hoverBoxShadow,
    onSearch,
    primaryColor,
    onClickPrimaryAction,
    searchDisabled,
    primaryActionDisabled,
    isPrimaryActionAvailable,
    primaryActionIcon,
  };

  const containerRef = useRef(null);

  const customTheme = useMemo(() => {
    return theme();
  }, []);

  const renderDataList = () => {
    return (
      sanitizedData &&
      sanitizedData.map((item, index) => (
        <Accordian
          key={index}
          expanded={expandCard === item.id}
          onChange={() => {
            setExpandCard(expandCard !== item.id ? item.id : null);
          }}>
          <AccordionSummary
            expandIcon={
              expandCard !== item.id ? (
                <ExpandIcon color={primaryColor} />
              ) : (
                (isEnableDelete || isEnableEdit || isEnableDetail) && (
                  <Slide in={expandCard === item.id} direction="left" container={containerRef.current} timeout={500}>
                    <Box>
                      {isEnableDelete && (
                        <IconButton
                          onClick={event => {
                            event.stopPropagation();
                            onDeleteItem && onDeleteItem(item);
                          }}>
                          <DeleteIcon color={deleteIconColor} />
                        </IconButton>
                      )}
                      {isEnableEdit && (
                        <IconButton
                          onClick={event => {
                            event.stopPropagation();
                            onEditItem && onEditItem(item);
                          }}>
                          <EditIcon color={editIconColor} />
                        </IconButton>
                      )}
                      {isEnableDetail && (
                        <IconButton
                          onClick={event => {
                            event.stopPropagation();
                            onDetailItem && onDetailItem(item);
                          }}>
                          <ViewIcon color={detailIconColor} />
                        </IconButton>
                      )}
                    </Box>
                  </Slide>
                )
              )
            }>
            {isMainValueComponent ? (
              <MainValueComponent fontFamily={fontFamily}>{item.mainComponent}</MainValueComponent>
            ) : (
              <MainValueLabel fontFamily={fontFamily}>{item.mainValue}</MainValueLabel>
            )}
          </AccordionSummary>
          <AccordionDetails sx={{backgroundColor: '#E9EBEA'}}>
            {item.details &&
              item.details.map((item, i) => (
                <Box key={`list-view-${index}-${i}`} sx={{display: 'flex', flexDirection: 'row'}}>
                  <Typography
                    sx={{
                      minWidth: detailLabelWidth,
                      fontSize: '14px',
                      fontWeight: '300',
                      lineHeight: '140%',
                      fontFamily,
                    }}>
                    {item.label}
                  </Typography>
                  {item.component ? (
                    item.component
                  ) : (
                    <Box sx={{maxWidth: detailValueWidth}}>
                      <Typography
                        sx={{
                          color: item.valueColor,
                          wordWrap: 'break-word',
                          fontSize: '14px',
                          fontWeight: '300',
                          lineHeight: '140%',
                          fontFamily,
                        }}>
                        {item.value}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
          </AccordionDetails>
        </Accordian>
      ))
    );
  };

  return (
    <Container>
      <ThemeProvider theme={customTheme}>
        {isEnableSearch && <NimbleMobileSearch {...searchBarProps} />}
        <DataContainer ref={containerRef}>
          <HeaderSection>
            <HeaderLabel
              sortenable={isEnableSort}
              fontFamily={fontFamily}
              onClick={() => isEnableSort && setSort(sort === 'asc' ? 'desc' : 'asc')}>
              {sortLabel}
            </HeaderLabel>
            {isEnableSort && (
              <SortIconWrapper>
                <SortIconButton size="small">
                  <ArrowDropUp sx={{color: sort === 'desc' ? primaryColor : ''}} />
                </SortIconButton>
                <SortIconButton size="small">
                  <ArrowDropDown sx={{color: sort === 'asc' ? primaryColor : ''}} />
                </SortIconButton>
              </SortIconWrapper>
            )}
          </HeaderSection>
          <Box
            sx={{
              height: scrollableParentHeight,
              overflowY: 'auto',
            }}
            id="scrollableDiv">
            {isEnableInfiniteScroll && dataLength && loadNextPage ? (
              <InfiniteScroll
                hasMore={true}
                dataLength={dataLength}
                next={loadNextPage}
                loader={dataLoading && <h4>Loading...</h4>}
                scrollableTarget={'scrollableDiv'}
                style={{overflowX: 'hidden'}}>
                {renderDataList()}
              </InfiniteScroll>
            ) : (
              renderDataList()
            )}
          </Box>
        </DataContainer>
      </ThemeProvider>
    </Container>
  );
};
