import {styled} from '@mui/system';

interface GroupHeaderProps {
  headerWidth: string | number | undefined;
}

interface ChipProps {
  bgColor?: string;
}

interface TimelineWrapperProps {
  commonFontFamily?: string;
}

const TimelineWrapper = styled('div')<TimelineWrapperProps>(props => ({
  fontFamily: props.commonFontFamily,
}));

const ItemContent = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: 'inherit',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const GroupContainer = styled('div')({
  display: 'flex',
  height: 'inherit',
  borderLeft: '1px solid #bbb',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflow: 'scroll',
});

const GroupHeaderContainer = styled('div')<GroupHeaderProps>(props => ({
  display: 'flex',
  width: props.headerWidth,
  background: 'white',
  color: 'black',
  border: '1px solid #bbb',
  borderBottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
}));

const Chip = styled('div')<ChipProps>(props => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 100,
  borderRadius: '3px',
  margin: '0px 8px',
  padding: '0px 8px',
  backgroundColor: props?.bgColor,
  color: 'white',
  height: '24px',
  fontSize: '14px',
  width: 'fit-content', 
}));

export {
  TimelineWrapper,
  ItemContent,
  GroupContainer,
  GroupHeaderContainer,
  Chip,
};
