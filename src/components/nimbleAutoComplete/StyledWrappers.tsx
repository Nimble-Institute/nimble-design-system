import {styled} from '@mui/system';
import {Chip, Paper, Typography} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface TagProps {
  chipcolor: string;
  fontFamily?: string;
}
interface OptionLabelProps {
  fontFamily?: string;
}
interface SlectedIconProps {
  chipcolor: string;
}

const OptionPaper = styled(Paper)({
  marginTop: '8px',
  borderRadius: '5px',
  backgroundColor: '#ffffffcc',
  boxShadow: '0px 4px 16px 0px rgba(22, 22, 22, 0.11);',
});

const TagWrapper = styled('div')({
  maxHeight: '100px',
  overflow: 'auto',
  minWidth: '105%',
});

const TagChip = styled(Chip)(({chipcolor, fontFamily}: TagProps) => ({
  backgroundColor: chipcolor,
  color: '#fff',
  borderRadius: '3px',
  padding: '2px, 4px, 2px, 4px',
  fontFamily: fontFamily,
  fontSize: '12px',
  maxHeight: '18px',
}));

const OptionList = styled('li')({
  display: 'flex ',
  flexDirection: 'row',
  justifyContent: 'space-between ',
  borderBottom: '1px solid #E2E2E2',
});

const OptionLabel = styled(Typography)(({fontFamily}: OptionLabelProps) => ({
  fontSize: '16px',
  fontFamily: fontFamily,
  color: '#0C1B2A',
  lineHeight: '20px',
  padding: '6px 4px',
  width: '100%',
}));

const SlectedIcon = styled(CheckCircleOutlineIcon)(({chipcolor}: SlectedIconProps) => ({
  fontSize: 18,
  color: chipcolor,
}));

export {OptionPaper, TagWrapper, TagChip, OptionList, OptionLabel, SlectedIcon};
