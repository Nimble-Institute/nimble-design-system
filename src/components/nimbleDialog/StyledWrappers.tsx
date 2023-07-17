import {styled} from '@mui/system';
import {Box, Typography} from '@mui/material';

interface ButtonProps {
  buttoncolor: string;
}

interface TitleProps {
  fontFamily?: string;
}

const TitleWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Title = styled(Typography)(({fontFamily}: TitleProps) => ({
  fontSize: '25px',
  fontWeight: '600',
  color: '#2B3645',
  lineHeight: 'normal',
  letterSpacing: '0.52px',
  fontFamily: fontFamily,
}));

export {TitleWrapper, Title};
