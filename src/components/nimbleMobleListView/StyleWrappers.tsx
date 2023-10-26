import {Paper, Box, Typography, IconButton} from '@mui/material';
import {styled} from '@mui/system';

const Container = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 16px',
  borderRadius: '8px',
  boxShadow: '0px 10px 24px 0px rgba(12, 27, 42, 0.06);',
  backgroundColor: '#FFF',
  gap: '24px',
});

const DataContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflow: 'hidden',
});

const HeaderSection = styled(Box)({
  padding: '8px 16px',
  borderBottom: '1px solid #B7B8BA;',
  display: 'flex',
  alignItems: 'center',
});

const HeaderLabel = styled(Typography)(({sortenable, fontFamily}: {sortenable?: boolean; fontFamily: string}) => ({
  color: '#000',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: 'normal',
  cursor: sortenable ? 'pointer' : 'default',
  fontFamily,
}));

const SortIconWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '5px',
});

const SortIconButton = styled(IconButton)({
  width: '5px',
  height: '5px',
});

const MainValueLabel = styled(Typography)(({fontFamily}: {fontFamily: string}) => ({
  color: '#000',
  maxWidth: '65vw',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '140%',
  fontFamily,
}));

const MainValueComponent = styled(Box)(({fontFamily}: {fontFamily: string}) => ({
  maxWidth: '65vw',
  fontFamily,
}));

export {
  Container,
  DataContainer,
  HeaderSection,
  HeaderLabel,
  SortIconWrapper,
  SortIconButton,
  MainValueLabel,
  MainValueComponent,
};
