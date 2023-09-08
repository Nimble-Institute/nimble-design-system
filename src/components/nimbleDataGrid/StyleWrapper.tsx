import {styled} from '@mui/system';
import {Box, Paper, Typography} from '@mui/material';
import {fontWeight} from '../shared';

const Container = styled(Paper)(({width, height, color}: {width: string; height: string; color: string}) => ({
  width,
  height,
  padding: '24px 16px',
  backgroundColor: color,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: 1,
}));

const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

const HeaderText = styled(Typography)(
  ({fontFamily, fontWeight, color}: {fontFamily: string; fontWeight: fontWeight; color: string}) => ({
    fontFamily,
    fontSize: '22px',
    fontWeight,
    letterSpacing: '0.44px',
    lineHeight: 'normal',
    color,
  }),
);

const SearchContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '18px',
  marginBottom: '18px',
});

const FilterContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '20px',
});

const FilterWrapper = styled(Box)({
  marginRight: '5px',
  marginBottom: '5px',
});

const Item = styled(Paper)({
  marginBottom: '10px',
  padding: '16px',
  cursor: 'pointer',
  boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.12);',
  '&:hover': {
    boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.34);',
  },
});

const TopWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const DataWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  maxHeight: '100%',
  marginLeft: '-16px',
  marginRight: '-16px',
  paddingLeft: '16px',
  paddingRight: '16px',
  overflowY: 'scroll',
  '::-webkit-scrollbar': {
    width: ' 0.1em',
  },
  '::webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.00)',
  },
  '::-webkit-scrollbar-thumb': {
    outline: '1px solid #ababab',
    backgroundColor: '#d6d6d6',
    borderRadius: '4px',
  },
});

const FooterWrapper = styled(Box)({
  display: 'flex',
  paddingTop: '10px',
});

export {
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
};
