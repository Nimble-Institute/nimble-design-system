import {styled} from '@mui/system';
import {Box, Typography, DialogContent} from '@mui/material';

interface ButtonProps {
  buttoncolor: string;
}

interface TitleProps {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
}

const TitleWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Title = styled(Typography)(({fontFamily, fontSize, fontWeight}: TitleProps) => ({
  fontSize,
  fontWeight,
  color: '#2B3645',
  lineHeight: 'normal',
  letterSpacing: '0.52px',
  fontFamily: fontFamily,
}));

const Content = styled(DialogContent)(({height}: {height: string | undefined}) => ({
  height,
  '::-webkit-scrollbar': {
    width: ' 2px',
  },
  '::webkit-scrollbar-track': {
    boxShadow: '#FFF',
  },
  '::-webkit-scrollbar-thumb': {
    outline: '1px solid #ababab',
    backgroundColor: '#d6d6d6',
    borderRadius: '4px',
  },
}));

export {TitleWrapper, Title, Content};
