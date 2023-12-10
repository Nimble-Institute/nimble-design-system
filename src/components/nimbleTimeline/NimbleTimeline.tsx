import React, {useEffect, useState} from 'react';
import moment, {Moment} from 'moment';
import {Typography} from '@mui/material';

import Timeline, {
  CustomMarker,
  DateHeader,
  ItemContext,
  SidebarHeader,
  TimelineHeaders,
  TimelineMarkers,
} from 'react-calendar-timeline';

import InfoLabel from './InfoLabel';
import {GroupContainer, GroupHeaderContainer, ItemContent, Chip, TimelineWrapper} from './StyleWrappers';

import 'react-calendar-timeline/lib/Timeline.css';
import './timelineStyles.css';
import _ from 'lodash';

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
  hoverPopup?: any;
  fontFamily?: string;
  weekMarkerWidth?: string;
  addItemHandler?: (groupId: number | string, time: number, e: React.SyntheticEvent) => void;
}
interface Group {
  id: number;
  title?: string;
  badge?: string;
  color?: string;
  labels?: {text: string; color: string}[];
  parent?: any;
  value?: any;
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
  sideBarHeaderText,
  itemResizeHandler,
  itemMoveHandler,
  itemDoubleClickHandler,
  itemHoverHandler,
  addItemHandler,
  hoverPopup,
  fontFamily = `"Roboto", "Helvetica", "Arial", sans-serif`,
  weekMarkerWidth = '37px',
}) => {
  const [groups] = useState(sidebarGroups);
  const [items, setItems] = useState(timelineItems);
  const [draggedItem, setDraggedItem] = useState<{item: any; group: Group; time: number} | undefined>(undefined);
  const [currentDate, setCurrentDate] = useState(moment());
  const [hoveredItemId, setHoveredItemId] = useState(null);

  useEffect(() => {
    setItems(timelineItems);
  }, [timelineItems])

  useEffect(() => {
    // Update the current date in the state every minute
    const interval = setInterval(() => {
      setCurrentDate(moment());
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  let parents: any = [];
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
    const item: any = items.filter((item) =>item.id === itemId);
    setItems(
      items.map(item =>
        item.id === itemId
          ? {...item, start: dragTime, end: dragTime + (item.end - item.start)}
          : item,
      ),
    );
    setDraggedItem(undefined);
    itemMoveHandler && itemMoveHandler(itemId, dragTime, dragTime + (item[0]?.end?.valueOf() - item[0]?.start?.valueOf()), newGroupOrder);
  };

  const handleItemResize = (itemId: number, time: number, edge: string) => {
    const item: any = items.filter((item) =>item.id === itemId);
    const startDate = edge === 'left' ? time : item[0].start;
    const endDate  = edge === 'left' ? item[0].end : time;
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
    itemResizeHandler && itemResizeHandler(itemId, startDate, endDate, edge);
  };

  const handleItemDrag = ({itemId, time, newGroupOrder}: {itemId: number; time: number; newGroupOrder: number}) => {
    let item = draggedItem ? draggedItem.item : undefined;
    if (!item) {
      item = items.find(i => i.id === itemId);
    }
    setDraggedItem({item: item, group: groups[newGroupOrder], time});
  };

  const itemRenderer = ({item, itemContext, getItemProps, getResizeProps}: ItemRendererProps) => {
    const {left: leftResizeProps, right: rightResizeProps, index} = getResizeProps();
    const isFirstOrSecondChild = itemContext.dimensions.order.index === 0 || itemContext.dimensions.order.index === 1;
    return (
      <div
        key={item.id}
        onClick={e => handleItemDoubleClick(e, item)}
        onMouseOver={e => {
          setHoveredItemId(item.id);
          handleItemHover(e, item);
        }}
        onMouseLeave={() => setHoveredItemId(null)}>
        <div
          {...getItemProps({
            ...item.itemProps,
            style: {
              borderRadius: '5px',
              background: item.color,
              border: itemContext.selected ? 'dashed 1px rgba(0,0,0,0.6)' : 'none',
              opacity: itemContext.selected ? 0.8 : 1,
              zIndex: hoveredItemId === item.id ? 99 : 80,
            },
          })}>
          {hoveredItemId === item.id && (
            <div
              className="animated-div"
              style={{
                position: 'absolute',
                top: isFirstOrSecondChild ? '25px' : '-100px',
              }}>
              {hoverPopup}
            </div>
          )}
          {itemContext.useResizeHandle ? <div {...leftResizeProps} style={{borderRadius: '8px'}} /> : ''}

          <ItemContent>{itemContext.title}</ItemContent>

          {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
        </div>
      </div>
    );
  };

  const groupRenderer = ({group}: GroupRendererProps) => {
    const existingObject = _.find(parents, {key: group?.parent?.key});
    // If no existing object found, add the new object to the array
    if (!existingObject) {
      parents.push(group?.parent);
    }

    return (
      <GroupContainer>
        {!existingObject ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '33.33%',
              justifyContent: 'space-between',
              paddingRight: '8px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {group?.parent?.badge && <Chip bgColor={group?.color}>{group?.parent?.badge}</Chip>}
            <Typography sx={{overflow: 'hidden', textOverflow: 'ellipsis'}} variant="body1">
              {group?.parent?.title}
            </Typography>
          </div>
        ) : (
          <div style={{minWidth: '33.33%'}}></div>
        )}

        <div
          style={{
            fontSize: '14px',
            fontWeight: '400',
            border: '1px solid #bbb',
            width: '33.33%',
            paddingLeft: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
          {group?.title}
        </div>
        {group?.value && (
          <div
            style={{
              fontSize: '14px',
              fontWeight: '200',
              border: '1px solid #bbb',
              width: '33.33%',
              borderLeft: '0px',
              paddingLeft: '8px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {group?.value}
          </div>
        )}
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
        stackItems={false}
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
        defaultTimeEnd={moment(new Date()).add(1.5, 'month')}
        onCanvasClick={addItemHandler}
        >
        <TimelineHeaders>
          <SidebarHeader>
            {({getRootProps}) => {
              return (
                <GroupHeaderContainer
                  headerWidth={getRootProps()?.style?.width}
                  style={{display: 'flex', justifyContent: 'flex-start', paddingLeft: '8px'}}>
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
                    background: 'rgb(245 220 137 / 84%)',
                    width: weekMarkerWidth,
                  }}></div>
              )}
            </CustomMarker>
          )}
        </TimelineMarkers>
      </Timeline>
      {draggedItem && <InfoLabel item={draggedItem.item} group={draggedItem.group} time={draggedItem.time} />}
    </TimelineWrapper>
  );
};
