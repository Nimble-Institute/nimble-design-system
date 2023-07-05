import {styled} from '@mui/system';
import {OutlinedInput, Button} from '@mui/material';
import {darken} from 'polished';

interface MainActionButtonProps {
  mainActionButtonColor: string;
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

const SearchBar = styled(OutlinedInput)({
  height: '35px',
  width: '100%',
});

const FilterIcon = styled('img')({
  marginLeft: '15px',
  marginRight: '15px',
  cursor: 'pointer',
});

const MainActionButton = styled(Button)(({mainActionButtonColor}: MainActionButtonProps) => ({
  paddingLeft: '20px',
  paddingRight: '20px',
  backgroundColor: mainActionButtonColor,
  ':hover': {
    backgroundColor: darken(0.05, mainActionButtonColor),
  },
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

export {
  Container,
  SearchBarContainer,
  SearchBarWrapper,
  SearchBar,
  FilterIcon,
  MainActionButton,
  MainTable,
  MainTableHead,
};
