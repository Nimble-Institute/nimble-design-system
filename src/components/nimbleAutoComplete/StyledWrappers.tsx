import {styled} from '@mui/system';
import {Chip, Paper, Typography, TextField} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface TagProps {
  chipcolor: string;
  fontFamily?: string;
}
interface OptionLabelProps {
  fontFamily?: string;
}

interface TextInputProps {
  fontFamily?: string;
}

interface SlectedIconProps {
  chipcolor: string;
}

const OptionPaper = styled(Paper)({
  marginTop: '8px',
  borderRadius: '5px',
  backgroundColor: '#FFFFFF',
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
  backgroundColor: '#FFFFFF !important',
  '&:hover': {
    backgroundColor: '#f0f0f0 !important',
  },
  '&[aria-selected="true"]': {
    backgroundColor: '#e0e0e0 !important',
    borderBottom: '1px solid #D8D8D8',
  },
  WebkitTransition: 'background 500ms', // For Safari 3.0 to 6.0
  transition: 'background 500ms', // For modern browsers
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

const TextInput = styled(TextField)(({fontFamily}: TextInputProps) => ({
  '& input::placeholder': {fontSize: '14px', fontFamily: fontFamily},
}));

export {OptionPaper, TagWrapper, TagChip, OptionList, OptionLabel, SlectedIcon, TextInput};
