import {styled} from '@mui/system';
import {Box, Typography} from '@mui/material';

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

export {TitleWrapper, Title};
