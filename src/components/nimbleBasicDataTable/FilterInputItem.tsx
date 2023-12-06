import React, {useMemo} from 'react';
import {InputAdornment} from '@mui/material';
import {uniqBy, capitalize} from 'lodash';

import {FilterInput, FilterWrapper} from './StyledWrappers';
import {NimbleSelect, NimbleDateRange} from '../index';

import searchSVG from '../../assets/images/search.svg';

import {ColumnDataType} from './NimbleBasicDataTable';

interface FilterInputItemProps {
  item: ColumnDataType;
  filterChangeDebounceHandler: any;
  sanatizedData: any;
  fontFamily: string;
}

const FilterInputItem: React.FC<FilterInputItemProps> = ({
  item,
  filterChangeDebounceHandler,
  sanatizedData,
  fontFamily,
}) => {
  const generateFilterSelection = (data: any, key: string) => {
    if (data) {
      return data;
    }
    const result = useMemo(() => {
      const uniqueItems = uniqBy(sanatizedData, key);
      return uniqueItems.map((item: any) => ({
        label: item[key],
        value: item[key],
      }));
    }, [sanatizedData, key]);

    return result;
  };

  const renderInput = () => {
    switch (item.filterType) {
      case 'multi-select':
        return (
          item.key && (
            <FilterWrapper>
              <NimbleSelect
                data={generateFilterSelection(item.customFilterSelections, item.key)}
                height="30px"
                fontSize={14}
                placeholder={`Filter ${capitalize(item.label)}`}
                width="100%"
                onChange={(value: string) => filterChangeDebounceHandler(value, item.key)}
                fontFamily={fontFamily}
                multiple={true}
              />
            </FilterWrapper>
          )
        );
      case 'select':
        return (
          item.key && (
            <FilterWrapper>
              <NimbleSelect
                data={generateFilterSelection(item.customFilterSelections, item.key)}
                height="30px"
                fontSize={14}
                placeholder={`Filter ${capitalize(item.label)}`}
                width="100%"
                onChange={(value: string) => filterChangeDebounceHandler(value, item.key)}
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
              onDateChange={(value: string | string[]) => filterChangeDebounceHandler(value, item.key)}
            />
          </FilterWrapper>
        );
      default:
        return (
          <FilterInput
            onChange={(e: any) => filterChangeDebounceHandler(e.target.value, item.key)}
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
