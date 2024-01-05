import {styled} from '@mui/system';
import {Box, Paper, Typography} from '@mui/material';

const Container = styled(Box)(({width, height}: {width: string; height: string}) => ({
  width,
  height,
  display: 'flex',
  flexDirection: 'column',
}));

const TopWrapper = styled(Box)({
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
});

const HeaderText = styled(Typography)(({color, fontFamily}: {color: string; fontFamily: string}) => ({
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '140%',
  color,
  fontFamily,
}));

const ContentContainer = styled(Box)({
  marginTop: '30px',
  display: 'flex',
  flexWrap: 'wrap',
});

const FileCard = styled(Paper)({
  boxShadow: '0px 10px 24px 0px rgba(12, 27, 42, 0.06);',
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 4px 4px 4px',
  marginRight: '15px',
  alignItems: 'flex-start',
  gap: '8px',
  borderRadius: '5px',
  width: '160px',
  height: '130px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#fafafa',
  },
  zIndex: 999,
});

const FileCardWrapper = styled(Box)({
  display: 'flex',
  flex: 1,
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const FileNameText = styled(Typography)(({fontFamily}: {fontFamily: string}) => ({
  color: '#0C1B2A',
  fontSize: '12px',
  fontWeight: '600',
  lineHeight: '140%',
  letterSpacing: '-0.12px',
  fontFamily,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
}));

const FileSizeText = styled(Typography)(({fontFamily}: {fontFamily: string}) => ({
  color: '#0C1B2A',
  fontSize: '12px',
  fontWeight: '300',
  lineHeight: '100%',
  letterSpacing: '0.12px',
  fontFamily,
}));

const ToolbarWrapper = styled(Box)({
  paddingTop: '6px',
  paddingBottom: '10px',
  height: '40px',
});

const ToolBar = styled(Box)({
  display: 'flex',
  paddingLeft: '8px',
  paddingRight: '8px',
  gap: '25px',
});

const FileThumb = styled(Box)({
  width: '60px',
  height: '60px',
  backgroundColor: '#F6F7F9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const FileThumbText = styled(Typography)(({fontFamily}: {fontFamily: string}) => ({
  color: '#9A9FA5',
  fontWeight: '600',
  fontSize: '14px',
  fontFamily,
}));

export {
  Container,
  TopWrapper,
  HeaderText,
  ContentContainer,
  FileCard,
  FileCardWrapper,
  FileNameText,
  FileSizeText,
  ToolbarWrapper,
  ToolBar,
  FileThumb,
  FileThumbText,
};
