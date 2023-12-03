import React, {useMemo} from 'react';
import {InputAdornment} from '@mui/material';
import {uniqBy, capitalize} from 'lodash';

import {FilterInput, FilterWrapper} from './StyledWrappers';
import {NimbleSelect, NimbleDateRange} from '../index';

import searchSVG from '../../assets/images/search.svg';

import {ColumnDataType} from './NimbleDataTable';

interface FilterInputItemProps {
  item: ColumnDataType;
  filterChangeDebounceHandler: any;
  sanatizedData: any;
  fontFamily: string;
}

const FilterInputItem: React.FC<FilterInputItemProps> = ({item, filterChangeDebounceHandler, sanatizedData, fontFamily}) => {
  const generateFilterSelection = (data: any, datapoint: string) => {
    if (data) {
      return data;
    }
    const result = useMemo(() => {
      const uniqueItems = uniqBy(sanatizedData, datapoint);
      return uniqueItems.map((item: any) => ({
        label: item[datapoint],
        value: item[datapoint],
      }));
    }, [sanatizedData, datapoint]);

    return result;    
  };

  const renderInput = () => {
    switch (item.filterType) {
      case 'multi-select':
        return (
          item.dataPoint && (
            <FilterWrapper>
              <NimbleSelect
                data={generateFilterSelection(item.customFilterSelections, item.dataPoint)}
                height="30px"
                fontSize={14}
                placeholder={`Filter ${capitalize(item.label)}`}
                width="100%"
                onChange={(value: string) => filterChangeDebounceHandler(value, item.dataPoint)}
                fontFamily={fontFamily}
                multiple={true}

              />
            </FilterWrapper>
          )
        );
      case 'select':
        return (
          item.dataPoint && (
            <FilterWrapper>
              <NimbleSelect
                data={generateFilterSelection(item.customFilterSelections, item.dataPoint)}
                height="30px"
                fontSize={14}
                placeholder={`Filter ${capitalize(item.label)}`}
                width="100%"
                onChange={(value: string) => filterChangeDebounceHandler(value, item.dataPoint)}
                fontFamily={fontFamily}
              />
            </FilterWrapper>
          )
        );
      case 'date-range':
        return (
          <FilterWrapper>
            <NimbleDateRange
              width="100%"
              height="30px"
              fontSize="14px"
              onDateChange={(value: string | string[]) => filterChangeDebounceHandler(value, item.dataPoint)}
            />
          </FilterWrapper>
        );
      default:
        return (
          <FilterInput
            onChange={(e: any) => filterChangeDebounceHandler(e.target.value, item.dataPoint)}
            placeholder={`Filter ${capitalize(item.label)}`}
            endAdornment={
              <InputAdornment position="end">
                <img src={searchSVG} alt="search" />
              </InputAdornment>
            }
            fontFamily={fontFamily}
          />
        );
    }
  };

  return <div style={{display: 'flex'}}>{renderInput()}</div>;
};

export default FilterInputItem;
