import React, {useEffect, useState} from 'react';
import moment, { Moment } from 'moment';
import {Typography} from '@mui/material';

import Timeline, {
  CustomMarker,
  DateHeader,
  IntervalRenderer,
  ItemContext,
  SidebarHeader,
  TimelineHeaders,
  TimelineMarkers,
  TodayMarker,
} from 'react-calendar-timeline';

import InfoLabel from './InfoLabel';
import {GroupContainer, GroupHeaderContainer, ItemContent, Chip, TimelineWrapper} from './StyleWrappers';

import 'react-calendar-timeline/lib/Timeline.css';
import './timelineStyles.css';

interface NimbleTimeline {
  showWeeks?: boolean;
  sidebarWidth?: number;
  sidebarGroups?: any[];
  timelineItems?: any[];
  showTimelineItemText?: boolean;
  todayMarker?: boolean;
  sideBarHeaderText?: string;
  itemResizeHandler?: Function;
  itemMoveHandler?: Function;
  itemDoubleClickHandler?: Function;
  itemHoverHandler?: Function;
  fontFamily?: string;
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
  sidebarWidth = 300,
  sidebarGroups = [],
  timelineItems = [],
  showTimelineItemText = false,
  sideBarHeaderText,
  itemResizeHandler,
  itemMoveHandler,
  itemDoubleClickHandler,
  itemHoverHandler,
  fontFamily = `"Roboto", "Helvetica", "Arial", sans-serif`,
}) => {
  const [groups] = useState(sidebarGroups);
  const [items, setItems] = useState(timelineItems);
  const [draggedItem, setDraggedItem] = useState<{item: any; group: Group; time: number} | undefined>(undefined);
  const [currentDate, setCurrentDate] = useState(moment());

  useEffect(() => {
    // Update the current date in the state every minute
    const interval = setInterval(() => {
      setCurrentDate(moment());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getCurrentWeekRange = (date: moment.Moment) => {
    const startOfWeek = moment(date).startOf('week');
    const endOfWeek = moment(date).endOf('week');
    return {startOfWeek, endOfWeek};
  };

  // Function to check if a date falls within the current week
  const isDateInCurrentWeek = (date: moment.Moment) => {
    const {startOfWeek, endOfWeek} = getCurrentWeekRange(currentDate);
    return date.isBetween(startOfWeek, endOfWeek, null, '[]');
  };

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

  const handleItemHover = (e: React.MouseEvent<HTMLDivElement>, item: Object) => {
    itemHoverHandler && itemHoverHandler(e, item);
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
      <div onClick={e => handleItemDoubleClick(e, item)} onMouseOver={e => handleItemHover(e, item)}>
        <div
          {...getItemProps({
            ...item.itemProps,
            style: {
              borderRadius: '5px',
              background: item.color,
              border: itemContext.selected ? 'dashed 1px rgba(0,0,0,0.6)' : 'none',
              opacity: itemContext.selected ? 0.8 : 1,
            },
          })}>
          {itemContext.useResizeHandle ? <div {...leftResizeProps} style={{borderRadius: '8px'}} /> : ''}

          <ItemContent>{itemContext.title}</ItemContent>

          {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
        </div>
      </div>
    );
  };

  const groupRenderer = ({group}: GroupRendererProps) => {
    return (
      <GroupContainer>
        {group?.badge && <Chip bgColor={group?.color}>{group?.badge}</Chip>}
        <Typography variant="body1">{group?.title}</Typography>
      </GroupContainer>
    );
  };

  return (
    <TimelineWrapper commonFontFamily={fontFamily}>
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
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
        onItemDrag={handleItemDrag}
        itemRenderer={itemRenderer}
        groupRenderer={groupRenderer}
        lineHeight={60}
        maxZoom={1.5 * 365.24 * 86400 * 1000}
        minZoom={1.24 * 86400 * 1000 * 7 * 3}
        defaultTimeStart={moment(new Date()).add(-1, 'month')}
        defaultTimeEnd={moment(new Date()).add(1.5, 'month')}>
        <TimelineHeaders>
          <SidebarHeader>
            {({getRootProps}) => {
              return (
                <GroupHeaderContainer headerWidth={getRootProps()?.style?.width}>
                  <Typography variant="body1">{sideBarHeaderText}</Typography>
                </GroupHeaderContainer>
              );
            }}
          </SidebarHeader>
          <DateHeader unit="year" />
          <DateHeader unit="week" />
        </TimelineHeaders>
        <TimelineMarkers>
          {isDateInCurrentWeek(currentDate) && (
            <CustomMarker date={getCurrentWeekRange(currentDate).startOfWeek.toDate()}>
              {({styles}) => (
                <div
                  style={{
                    ...styles,
                    background: '#f5dc89',
                    width: '50px',
                  }}>
                </div>
              )}
            </CustomMarker>
          )}
        </TimelineMarkers>
      </Timeline>
      {draggedItem && <InfoLabel item={draggedItem.item} group={draggedItem.group} time={draggedItem.time} />}
    </TimelineWrapper>
  );
};
