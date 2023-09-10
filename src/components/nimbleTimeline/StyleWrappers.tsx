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
  border: 'none',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const GroupContainer = styled('div')({
  display: 'flex',
  height: 'inherit',
});

const GroupLeftSection = styled('div')({
  display: 'flex',
  width: '50%',
  borderRight: '1px solid #9A9FA5',
  fontSize: '14px',
  alignItems: 'center',
  overflow: 'scroll',
});

const GroupRightSection = styled('div')({
  display: 'flex',
  height: 'inherit',
  padding: '4px 0px',
  width: '50%',
  overflow: 'scroll',
  alignItems: 'center',
});

const GroupHeaderContainer = styled('div')<GroupHeaderProps>(props => ({
  display: 'flex',
  width: props.headerWidth,
  background: 'white',
  color: 'black',
}));

const GroupHeaderLeft = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  fontSize: '12px',
  borderRight: '1px solid #9A9FA5',
});

const GroupHeaderRight = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  fontSize: '12px',
});

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
}));

export {
  TimelineWrapper,
  ItemContent,
  GroupContainer,
  GroupLeftSection,
  GroupRightSection,
  GroupHeaderContainer,
  GroupHeaderLeft,
  GroupHeaderRight,
  Chip,
};
