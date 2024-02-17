import {styled} from '@mui/system';
import {OutlinedInput, Typography, Box, TableCell} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface StyledTableRowProps {
  hoverColor?: string;
  enablecursor?: number;
  colorBackground?: string;
}

interface FilterInputProps {
  fontFamily?: string;
}

const StyledTableHeaderCell = styled(TableCell)(({width}: {width?: string}) => ({
  borderBottomColor: '#9B9B9B',
  padding: '8px 16px 8px 16px',
  width,
}));

const StyledTableHeaderText = styled('span')(({fontFamily, fontColor, fontSize}: {fontFamily?: string, fontColor?: string, fontSize?: string}) => ({
  fontWeight: 600,
  fontSize,
  fontFamily,
  color: fontColor,
}));

const StyledTableBodyCell = styled(TableCell)(({fontFamily}: {fontFamily?: string}) => ({
  fontWeight: 400,
  fontSize: '14px',
  padding: '8px 16px 8px 16px',
  color: '#11151B',
  height: '20px',
  fontFamily,
}));

const StyledTableRow = styled('tr')(({hoverColor, enablecursor, colorBackground}: StyledTableRowProps) => ({
  borderBottom: '1px solid #F6F7F9',
  background: colorBackground,
  '&:hover': {
    backgroundColor: hoverColor,
    cursor: enablecursor === 1 ? 'pointer' : 'default',
  },
  WebkitTransition: 'background 500ms', // For Safari 3.0 to 6.0
  transition: 'background 500ms', // For modern browsers
}));

const PaginationWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: '9px',
});

const FilterWrapper = styled('div')({
  maxHeight: '30px',
  width: '75%',
  marginTop: '10px',
  marginBottom: '10px',
  textAlign: 'left',
});

const CustomPaginationWrapper = styled(Box)({
  marginLeft: '10px',
  marginRight: '20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
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
  width: '55px',
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

const ArrowForwardIosIconWrapper = styled(ArrowForwardIosIcon)({
  fontSize: '12px',
  color: '#383838',
});

const FilterInput = styled(OutlinedInput)(({fontFamily}: FilterInputProps) => ({
  height: '30px',
  width: '75%',
  marginTop: '10px',
  marginBottom: '10px',
  fontSize: '14px',
  fontFamily,
}));

export {
  StyledTableHeaderCell,
  StyledTableHeaderText,
  StyledTableBodyCell,
  StyledTableRow,
  PaginationWrapper,
  FilterWrapper,
  CustomPaginationWrapper,
  CustomPaginationText,
  PageNumberInput,
  PaginationGoButton,
  PaginationGoButtonText,
  ArrowForwardIosIconWrapper,
  FilterInput,
};
