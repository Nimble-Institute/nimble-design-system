import React, {useRef} from 'react';
import {styled} from '@mui/system';
import {Box, Pagination, Typography, OutlinedInput} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import {PaginationDataType} from '../../index';

interface PaginationBarProps extends PaginationDataType {
  fontFamily?: string;
  onClicksCustomPagination?: (value: number) => void;
}

const CustomPaginationWrapper = styled(Box)({
  marginLeft: '10px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
});

const CustomPaginationText = styled(Typography)(({fontFamily}: {fontFamily: string}) => ({
  fontFamily,
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '140%',
  color: '#B7B8BA',
  marginRight: '5px',
}));

const PageNumberInput = styled(OutlinedInput)(({fontFamily}: {fontFamily: string}) => ({
  height: '30px',
  width: '48px',
  borderColor: '#9A9FA5',
  fontFamily,
  fontSize: '11px',
  marginRight: '5px',
}));

const PaginationGoButton = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  cursor: 'pointer',
});

const PaginationGoButtonText = styled(Typography)(({fontFamily}: {fontFamily: string}) => ({
  fontFamily,
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '140%',
  color: '#383838',
}));

const PaginationBar: React.FC<PaginationBarProps> = ({
  totalPage,
  page,
  onPageChnage,
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
  onClicksCustomPagination,
}) => {
  const customPaginationInputref = useRef<any>(null);

  const handleClickCustomInput = () => {
    const val = customPaginationInputref?.current.value;
    onClicksCustomPagination && onClicksCustomPagination(val || 1);
  };

  return (
    <Box sx={{display: 'flex', flex: 1}}>
      <Box>
        <Pagination
          count={totalPage}
          page={page}
          onChange={onPageChnage}
          sx={{button: {color: '#383838'}}}
          color="primary"
          size="small"
          boundaryCount={1}
          siblingCount={0}
        />
      </Box>

      <CustomPaginationWrapper>
        <CustomPaginationText fontFamily={fontFamily}>Go to page</CustomPaginationText>
        <PageNumberInput placeholder="..." inputRef={customPaginationInputref} type="number" fontFamily={fontFamily} />
        <PaginationGoButton onClick={handleClickCustomInput}>
          <PaginationGoButtonText fontFamily={fontFamily}>Go</PaginationGoButtonText>
          <ArrowForwardIosIcon sx={{fontSize: '12px', color: '#383838'}} />
        </PaginationGoButton>
      </CustomPaginationWrapper>
    </Box>
  );
};

export default PaginationBar;
