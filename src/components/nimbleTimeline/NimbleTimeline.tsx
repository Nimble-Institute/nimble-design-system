import React, {useState} from 'react';
import moment from 'moment';
import {Chip, Typography} from '@mui/material';

import Timeline, {
  DateHeader,
  ItemContext,
  SidebarHeader,
  TimelineHeaders,
  TimelineMarkers,
  TodayMarker,
} from 'react-calendar-timeline';

import InfoLabel from './InfoLabel';
import {
  GroupContainer,
  GroupHeaderContainer,
  GroupHeaderLeft,
  GroupHeaderRight,
  GroupLeftSection,
  GroupRightSection,
  ItemContent,
} from './StyleWrappers';

import 'react-calendar-timeline/lib/Timeline.css';
import './timelineStyles.css';

interface NimbleTimeline {
  showWeeks?: boolean;
  sidebarWidth?: number;
  sidebarGroups?: any[];
  timelineItems?: any[];
  showTimelineItemText?: boolean;
  todayMarker?: boolean;
  sideBarLeftHeaderText?: string;
  sideBarRightHeaderText?: string;
  itemResizeHandler?: Function;
  itemMoveHandler?: Function;
  itemDoubleClickHandler?: Function;
}
interface Group {
  id: number;
  title?: string;
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

export const NimbleTimeline: React.FC<NimbleTimeline> = ({
  showWeeks = false,
  sidebarWidth = 400,
  sidebarGroups = [],
  timelineItems = [],
  showTimelineItemText = false,
  todayMarker = false,
  sideBarLeftHeaderText,
  sideBarRightHeaderText,
  itemResizeHandler,
  itemMoveHandler,
  itemDoubleClickHandler,
}) => {
  const [groups] = useState(sidebarGroups);
  const [items, setItems] = useState(timelineItems);
  const [draggedItem, setDraggedItem] = useState<{item: any; group: Group; time: number} | undefined>(undefined);

  const defaultTimeStart = moment().startOf('day').toDate();
  const defaultTimeEnd = moment().startOf('day').add(1, 'day').toDate();

  const keys = {
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

  const handleItemDoubleClick = (e: React.MouseEvent<HTMLDivElement>, item: Object) => {
    if (e.detail == 2) {
      itemDoubleClickHandler && itemDoubleClickHandler(item);
    }
  };

  const handleItemMove = (itemId: number, dragTime: number, newGroupOrder: number) => {
    const group = groups[newGroupOrder];
    setItems(
      items.map(item =>
        item.id === itemId
          ? {...item, start: dragTime, end: dragTime + (item.end - item.start), group: group.id}
          : item,
      ),
    );
    setDraggedItem(undefined);
    itemMoveHandler && itemMoveHandler(itemId, dragTime, newGroupOrder);
  };

  const handleItemResize = (itemId: number, time: number, edge: string) => {
    setItems(
      items.map(item =>
        item.id === itemId
          ? {
              ...item,
              start: edge === 'left' ? time : item.start,
              end: edge === 'left' ? item.end : time,
            }
          : item,
      ),
    );
    itemResizeHandler && itemResizeHandler(itemId, time, edge);
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
      <div onClick={e => handleItemDoubleClick(e, item)}>
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
      </div>
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
                  <GroupHeaderLeft>
                    <Typography variant="body2">{sideBarLeftHeaderText}</Typography>
                  </GroupHeaderLeft>
                  <GroupHeaderRight>
                    <Typography variant="body2">{sideBarRightHeaderText}</Typography>
                  </GroupHeaderRight>
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
