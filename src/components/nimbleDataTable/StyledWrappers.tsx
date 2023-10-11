import {styled} from '@mui/system';
import {OutlinedInput, Button, IconButton, Typography, Box} from '@mui/material';
import {darken} from 'polished';

interface MainActionButtonProps {
  buttoncolor: string;
  fontFamily: string;
}

interface HeaderLabelProps {
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  color: string;
}

interface TableValueProps {
  fontFamily: string;
  fontSize: number;
}

interface StyledTableRowProps {
  hoverColor: string;
}

const Container = styled('div')({
  boxShadow: '0px 10px 24px rgba(12, 27, 42, 0.06)',
  borderRadius: '8px',
  padding: '5px',
  width: '98%',
  minHeight: '40vh',
  background: '#FFFFFE',
});

const SearchBarContainer = styled('div')({
  display: 'flex',
  flex: 1,
  padding: '10px 20px',
});

const SearchBarWrapper = styled('div')({
  display: 'flex',
  flex: 1,
});

const SearchBar = styled(OutlinedInput)(({fontFamily, fontSize}: {fontFamily: string; fontSize: number}) => ({
  height: '30px',
  width: '100%',
  borderColor: '#9A9FA5',
  fontFamily,
  fontSize,
}));

const FilterIcon = styled(IconButton)({
  marginLeft: '15px',
  marginRight: '15px',
  cursor: 'pointer',
});

const MainActionButton = styled(Button)(({buttoncolor, fontFamily}: MainActionButtonProps) => ({
  paddingLeft: '20px',
  paddingRight: '20px',
  backgroundColor: buttoncolor,
  ':hover': {
    backgroundColor: darken(0.05, buttoncolor),
  },
  maxHeight: '30px',
  color: '#FFF',
  fontFamily,
  textTransform: 'none',
}));

const MainTable = styled('table')({
  width: '96%',
  margin: '15px auto',
  borderCollapse: 'collapse',
});

const MainTableHead = styled('thead')({
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '150.9%',
  textTransform: 'uppercase',
  color: '9b9b9b',
  borderBottom: '1px solid #9b9b9b',
  width: '100%',
});

const ColumnHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const MainTableBody = styled('tbody')({
  borderBottom: '1px solid #f6f7f9',
  height: '44px',
  fontStyle: 'normal',
  width: '100%',
});

const HeaderLabel = styled(Typography)(({fontFamily, fontWeight, fontSize, color}: HeaderLabelProps) => ({
  display: 'flex',
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight: '150.9%',
  textTransform: 'none',
  color,
}));

const SortIconsWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginLeft: '10px',
  marginBottom: '5px',
});

const FilterInput = styled(OutlinedInput)({
  height: '30px',
  width: '75%',
  marginTop: '10px',
  marginBottom: '10px',
  fontSize: '12px',
});

const StyledTableRow = styled('tr')(({hoverColor}: StyledTableRowProps) => ({
  borderBottom: '1px solid #F6F7F9',
  '&:hover': {
    backgroundColor: hoverColor,
  },
  WebkitTransition: 'background 500ms', // For Safari 3.0 to 6.0
  transition: 'background 500ms', // For modern browsers
}));

const TableValue = styled(Typography)(({fontFamily, fontSize}: TableValueProps) => ({
  display: 'flex',
  fontWeight: '300',
  fontFamily,
  fontSize,
  lineHeight: '140%',
  color: '#222222',
  minHeight: '44px',
  alignItems: 'center',
  wordBreak: 'break-all',
}));

const ActionCell = styled('td')({
  display: 'flex',
  minHeight: '44px',
  justifyContent: 'space-between',
  width: '120px',
  paddingRight: '10px',
});

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

export {
  Container,
  SearchBarContainer,
  SearchBarWrapper,
  SearchBar,
  FilterIcon,
  MainActionButton,
  MainTable,
  MainTableHead,
  MainTableBody,
  ColumnHeader,
  HeaderLabel,
  SortIconsWrapper,
  FilterInput,
  StyledTableRow,
  TableValue,
  ActionCell,
  PaginationWrapper,
  FilterWrapper,
  CustomPaginationWrapper,
  CustomPaginationText,
  PageNumberInput,
  PaginationGoButton,
  PaginationGoButtonText,
};
