import {styled} from '@mui/system';
import {Autocomplete, Chip, Paper, Typography} from '@mui/material';

interface LabelProps {
  labelsize: number;
  labelweight: '400' | '500' | '600' | '700';
  fontFamily?: string;
}

const Label = styled(Typography)(({labelsize, labelweight, fontFamily}: LabelProps) => ({
  fontSize: labelsize,
  fontWeight: labelweight,
  lineHeight: '20px',
  marginBottom: '8px',
  fontFamily: fontFamily,
}));
