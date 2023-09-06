import React, {useState} from 'react';
import moment from 'moment';
import {Chip, Typography} from '@mui/material';
import {styled} from '@mui/system';

import Timeline, {
  DateHeader,
  ItemContext,
  SidebarHeader,
  TimelineHeaders,
  TimelineMarkers,
  TodayMarker,
} from 'react-calendar-timeline';

import InfoLabel from './InfoLabel';
import 'react-calendar-timeline/lib/Timeline.css';
import './styles.css';

interface NimbleTimeline {
  showWeeks?: boolean;
  sidebarWidth?: number;
  sidebarGroups?: any[];
  timelineItems?: any[];
  showTimelineItemText?: boolean;
  todayMarker?: boolean;
}
interface Group {
  id: number;
  title: string;
  badge?: string;
  color?: string;
  labels?: {text: string; color: string}[];
}

interface GroupRendererProps {
  group?: Group;
}

interface ItemRendererProps {
  item: any;
  itemContext: ItemContext;
  getItemProps: Function;
  getResizeProps: Function;
}

interface GroupHeaderProps {
  headerWidth: string | number | undefined;
}

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
const GroupHeaderRight = styled('div')({
  width: '50%',
  borderRight: '1px solid #9A9FA5',
});
const GroupHeaderLeft = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  fontSize: '12px',
});
export const NimbleTimeline: React.FC<NimbleTimeline> = ({
  showWeeks = false,
  sidebarWidth = 400,
  sidebarGroups = [],
  timelineItems = [],
  showTimelineItemText = false,
  todayMarker = false,
}) => {
  const [groups] = useState(sidebarGroups);
  const [items, setItems] = useState(timelineItems);
  const [draggedItem, setDraggedItem] = useState<{item: any; group: Group; time: number} | undefined>(undefined);

  const defaultTimeStart = moment().startOf('day').toDate();
  const defaultTimeEnd = moment().startOf('day').add(1, 'day').toDate();

  var keys = {
    groupIdKey: 'id',
    groupTitleKey: 'title',
    groupRightTitleKey: 'rightTitle',
    itemIdKey: 'id',
    itemTitleKey: 'title',
    itemDivTitleKey: 'title',
    itemGroupKey: 'group',
    itemTimeStartKey: 'start',
    itemTimeEndKey: 'end',
    groupLabelKey: 'title',
  };

  const handleItemMove = (itemId: number, dragTime: number, newGroupOrder: number) => {
    const group = groups[newGroupOrder];
    setItems(
      items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id,
            })
          : item,
      ),
    );
    setDraggedItem(undefined);
    console.log('Moved', itemId, dragTime, newGroupOrder);
  };

  const handleItemResize = (itemId: number, time: number, edge: string) => {
    setItems(
      items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === 'left' ? time : item.start,
              end: edge === 'left' ? item.end : time,
            })
          : item,
      ),
    );

    console.log('Resized', itemId, time, edge);
  };

  const handleItemDrag = ({itemId, time, newGroupOrder}: {itemId: number; time: number; newGroupOrder: number}) => {
    let item = draggedItem ? draggedItem.item : undefined;
    if (!item) {
      item = items.find(i => i.id === itemId);
    }
    setDraggedItem({item: item, group: groups[newGroupOrder], time});
  };

  const itemRenderer = ({item, itemContext, getItemProps, getResizeProps}: ItemRendererProps) => {
    const {left: leftResizeProps, right: rightResizeProps} = getResizeProps();
    return (
      <>
        <div
          {...getItemProps({
            ...item.itemProps,
            style: {
              borderRadius: '25px',
              background: item.color,
              border: itemContext.selected ? 'dashed 1px rgba(0,0,0,0.6)' : 'none',
              opacity: itemContext.selected ? 0.8 : 1,
            },
          })}>
          {itemContext.useResizeHandle ? <div {...leftResizeProps} style={{borderRadius: '8px'}} /> : ''}

          <ItemContent>{showTimelineItemText && itemContext.title}</ItemContent>

          {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
        </div>
      </>
    );
  };

  const groupRenderer = ({group}: GroupRendererProps) => {
    return (
      <GroupContainer>
        <GroupLeftSection>
          {group?.badge && (
            <Chip
              label={group?.badge}
              size={'small'}
              sx={{
                fontWeight: 100,
                borderRadius: '3px',
                margin: '0px 8px',
                backgroundColor: group?.color,
                color: 'white',
              }}
            />
          )}
          <Typography variant="body1">{group?.title}</Typography>
        </GroupLeftSection>
        <GroupRightSection>
          {group?.labels?.map((label, index) => (
            <Chip
              key={index}
              label={label.text}
              size={'small'}
              sx={{
                fontWeight: 100,
                borderRadius: '3px',
                margin: '0px 4px',
                backgroundColor: label.color,
                color: 'white',
              }}
            />
          ))}
        </GroupRightSection>
      </GroupContainer>
    );
  };

  return (
    <>
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.4}
        sidebarWidth={sidebarWidth}
        canMove={true}
        canResize={'both'}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
        onItemDrag={handleItemDrag}
        itemRenderer={itemRenderer}
        groupRenderer={groupRenderer}
        lineHeight={60}>
        <TimelineHeaders>
          <SidebarHeader>
            {({getRootProps}) => {
              return (
                <GroupHeaderContainer headerWidth={getRootProps()?.style?.width}>
                  <GroupHeaderRight />
                  <GroupHeaderLeft>
                    <Typography variant="body2">Actiehouder</Typography>
                  </GroupHeaderLeft>
                </GroupHeaderContainer>
              );
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
          {showWeeks && <DateHeader unit="week" />}
        </TimelineHeaders>
        <TimelineMarkers>{todayMarker && <TodayMarker date={new Date()} />}</TimelineMarkers>
      </Timeline>
      {draggedItem && <InfoLabel item={draggedItem.item} group={draggedItem.group} time={draggedItem.time} />}
    </>
  );
};
