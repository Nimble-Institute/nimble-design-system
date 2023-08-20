import React, {useMemo} from 'react';
import {InputAdornment} from '@mui/material';
import {uniqBy} from 'lodash';

import {FilterInput, SelectFilterWrapper} from './StyledWrappers';
import {NimbleSelect} from '../index';

import searchSVG from '../../assets/images/search.svg';

import {ColumnDataType} from './NimbleDataTable';

interface FilterInputItemProps {
  item: ColumnDataType;
  filterChangeDebounceHandler: any;
  sanatizedData: any;
}

const FilterInputItem: React.FC<FilterInputItemProps> = ({item, filterChangeDebounceHandler, sanatizedData}) => {
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
      case 'select':
        return (
          item.dataPoint && (
            <SelectFilterWrapper>
              <NimbleSelect
                data={generateFilterSelection(item.customFilterSelections, item.dataPoint)}
                height="30px"
                fontSize={11}
                placeholder={`Filter ${item.label}`}
                width="100%"
                onChange={(value: string) => filterChangeDebounceHandler(value, item.dataPoint)}
              />
            </SelectFilterWrapper>
          )
        );
      default:
        return (
          <FilterInput
            onChange={(e: any) => filterChangeDebounceHandler(e.target.value, item.dataPoint)}
            placeholder={`Filter ${item.label}`}
            endAdornment={
              <InputAdornment position="end">
                <img src={searchSVG} alt="search" />
              </InputAdornment>
            }
          />
        );
    }
  };

  return <div style={{display: 'flex'}}>{renderInput()}</div>;
};

export default FilterInputItem;
