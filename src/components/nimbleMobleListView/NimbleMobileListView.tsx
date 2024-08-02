import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { AccordionDetails, AccordionSummary, Box, CircularProgress, IconButton, Slide, Typography } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { styled, ThemeProvider } from '@mui/material/styles';
import { orderBy } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { NimbleMobileSearch, NimbleMobileSearchProps } from '../nimbleMobileSearch/NimbleMobileSearch';
import {
  Container,
  DataContainer,
  HeaderLabel,
  HeaderSection,
  MainValueComponent,
  MainValueLabel,
  SortIconButton,
  SortIconWrapper,
} from './StyleWrappers';

import DeleteIcon from '../../assets/icons/DeleteIcon';
import EditIcon from '../../assets/icons/EditIcon';
import ExpandIcon from '../../assets/icons/ExpandIcon';
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
  secondaryValue?: string;
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
  onDeleteItem?: (item: any) => void;
  onEditItem?: (item: any) => void;
  onDetailItem?: (item: any) => void;
  editIconColor?: string;
  deleteIconColor?: string;
  detailIconColor?: string;

  detailLabelWidth?: string;
  detailValueWidth?: string;
  fontFamily?: string;
  isMainValueComponent?: boolean;

  mainValueWidth?: string;
  mainValueExpandedWidth?: string;
  defaultSort?: string;
  swapAction?: (value: any) => boolean;
  swapActionColumn?: number;
  swapActionList?: [{icon: any; onClickAction: Function}];
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

  isEnableSort = false,
  sortLabel,
  isAPISort = false,
  onChangeSort,

  isEnableSearch,
  placeholder,
  fontFamily,
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

  mainValueWidth,
  mainValueExpandedWidth,
  defaultSort,
  swapAction,
  swapActionColumn,
  swapActionList,
}) => {
  const [expandCard, setExpandCard] = useState<number | null>(null);
  const [sort, setSort] = useState<string | null>(defaultSort || null);

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

  const calculatedMainValueWidth = useMemo(() => {
    let actionButtonCount = 0;

    if (isEnableDelete) {
      actionButtonCount++;
    }
    if (isEnableEdit) {
      actionButtonCount++;
    }
    if (isEnableDetail) {
      actionButtonCount++;
    }
    switch (actionButtonCount) {
      case 0:
        return '60vw';
      case 1:
        return '60vw';
      case 2:
        return '50vw';
      case 3:
        return '40vw';
      default:
        return '60vw';
    }
  }, [isEnableDelete, isEnableEdit, isEnableDetail]);

  const getFinalValueWidth = (expanded: boolean) => {
    return expanded ? mainValueExpandedWidth ?? calculatedMainValueWidth : mainValueWidth ?? '60vw';
  };
  const getDefaultActionsList = (item: MobileListData) =>
    (isEnableDelete || isEnableEdit || isEnableDetail) && (
      <>
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
      </>
    );

  const renderDataList = () => {
    return (
      sanitizedData &&
      sanitizedData.map((item, index) => {
        let showDefaultActions: boolean | undefined = false;
        showDefaultActions = swapAction && typeof swapActionColumn === 'string' && swapAction(item[swapActionColumn]);
        const expanded = expandCard === item.id;
        return (
          <Accordian
            key={index}
            expanded={expanded}
            onChange={() => {
              setExpandCard(expanded ? null : item.id);
            }}>
            <AccordionSummary
              expandIcon={
                expanded ? (
                  <Slide in={expandCard === item.id} direction="left" container={containerRef.current} timeout={500}>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                      {swapActionColumn ? (
                        showDefaultActions ? (
                          <>
                            {getDefaultActionsList(item)}
                            {swapActionList?.map(action => (
                              <IconButton
                                onClick={event => {
                                  event.stopPropagation();
                                  action.onClickAction(item);
                                }}>
                                {action.icon}
                              </IconButton>
                            ))}
                          </>
                        ) : (
                          swapActionList?.map(action => (
                            <IconButton
                              onClick={event => {
                                event.stopPropagation();
                                action.onClickAction(item);
                              }}>
                              {action.icon}
                            </IconButton>
                          ))
                        )
                      ) : (
                        getDefaultActionsList(item)
                      )}
                    </Box>
                  </Slide>
                ) : (
                  <ExpandIcon color={primaryColor} />
                )
              }>
              {isMainValueComponent ? (
                <MainValueComponent fontFamily={fontFamily} width={getFinalValueWidth(expanded)}>
                  {item.mainComponent}
                </MainValueComponent>
              ) : (
                <MainValueLabel fontFamily={fontFamily} width={getFinalValueWidth(expanded)}>
                  {item.mainValue}
                </MainValueLabel>
              )}
            </AccordionSummary>
            <AccordionDetails sx={{backgroundColor: '#E9EBEA'}}>
              {item.details &&
                item.details.map((item, i) => (
                  <Box
                    key={`list-view-${index}-${i}`}
                    sx={{display: 'flex', flexDirection: 'row', marginBottom: '8px', alignItems: 'flex-start'}}>
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
        );
      })
    );
  };

  return (
    <Container>
      <ThemeProvider theme={customTheme}>
        {isEnableSearch && <NimbleMobileSearch {...searchBarProps} />}
        <DataContainer ref={containerRef}>
          <HeaderSection>
            <HeaderLabel
              sortenable={+isEnableSort}
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
                loader={
                  dataLoading && (
                    <Box sx={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
                      <CircularProgress size={25} sx={{color: primaryColor}} />
                    </Box>
                  )
                }
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
