import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment';
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
import {GroupContainer, GroupHeaderContainer, Chip, ItemContent, TimelineWrapper} from './StyleWrappers';

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
  isEditable: boolean;
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
  isEditable = false,
}) => {
  const dateHeaderRef = useRef(null);
  let parents: any = [];

  const [groups, setGroups] = useState(sidebarGroups);
  const [items, setItems] = useState(
    timelineItems.map(item => ({
      ...item,
      canMove: isEditable,
      canResize: isEditable ? 'both' : false,
    })),
  );
  const [draggedItem, setDraggedItem] = useState<{item: any; group: Group; time: number} | undefined>(undefined);
  const [currentDate, setCurrentDate] = useState(moment());
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [markerWidth, setMarkerWidth] = useState<number>(0);
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  useEffect(() => {
    setItems(
      timelineItems.map(item => ({
        ...item,
        canMove: isEditable,
        canResize: isEditable ? 'both' : false,
      })),
    );
    setGroups(sidebarGroups);
  }, [timelineItems, sidebarGroups]);

  useEffect(() => {
    // Update the current date in the state every minute
    const interval = setInterval(() => {
      setCurrentDate(moment());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDynamicMarkerWidth();
  }, [dateHeaderRef?.current]);

  const setDynamicMarkerWidth = () => {
    if (dateHeaderRef?.current) {
      const width = parseFloat(
        dateHeaderRef?.current?.scrollHeaderRef?.querySelector(
          '.rct-calendar-header > div:nth-child(2) > .rct-dateHeader:nth-child(1)',
        )?.style?.width,
      );
      setMarkerWidth(width);
    }
  };

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
    const item: any = items.filter(item => item.id === itemId);
    setDraggedItem(undefined);
    itemMoveHandler &&
      itemMoveHandler(
        itemId,
        dragTime,
        dragTime + (item[0]?.end?.valueOf() - item[0]?.start?.valueOf()),
        newGroupOrder,
      );
  };

  const handleItemResize = (itemId: number, time: number, edge: string) => {
    const item: any = items.filter(item => item.id === itemId);
    const startDate = edge === 'left' ? time : item[0].start;
    const endDate = edge === 'left' ? item[0].end : time;
    itemResizeHandler && itemResizeHandler(itemId, startDate, endDate, edge);
  };

  const handleItemDrag = ({itemId, time, newGroupOrder}: {itemId: number; time: number; newGroupOrder: number}) => {
    let item = draggedItem ? draggedItem.item : undefined;
    if (!item) {
      item = items.find(i => i.id === itemId);
    }
    setDraggedItem({item: item, group: groups[newGroupOrder], time});
  };

  const handleZoom = () => {
    setDynamicMarkerWidth();
  };

  /** Since libray doesn't support weekly segments out of the box, a custom solution was requred
   *  here we set custom markers as weekly segments for -10 and +10 years from today
   */
  const today: Date = new Date();
  today.setHours(0, 0, 0, 0);

  // Custom marker renderer
  const renderCustomMarker = ({styles}: {styles: Object}) => <div style={{...styles, backgroundColor: '#bbb'}} />;

  function getEndOfWeek(date: Date) {
    const endDate = new Date(date);
    const dayOfWeek = date.getDay();
    const diff = dayOfWeek === 0 ? 6 : 6 - dayOfWeek; // Calculate the difference to the end of the week
    endDate.setDate(date.getDate() + diff); // Set the date to the end of the week
    endDate.setHours(23, 59, 59, 999); // Set the time to the end of the day
    return endDate;
  }

  const getTenYearsBack = (): Date => {
    const currentDate: Date = new Date();
    const tenYearsAgo: Date = new Date(currentDate);
    tenYearsAgo.setFullYear(currentDate.getFullYear() - 10);
    return tenYearsAgo;
  };

  // Generate marker dates for the start of each week
  const generateMarkerDates = (startDate: Date, numberOfWeeks: number) => {
    const startOfWeek = getEndOfWeek(startDate);
    const markerDates = [];
    for (let i = 0; i < numberOfWeeks; i++) {
      const markerDate = new Date(startOfWeek);
      markerDate.setDate(markerDate.getDate() + i * 7);
      markerDates.push({date: markerDate.getTime(), id: i + 1});
    }
    return markerDates;
  };

  const markerDates = generateMarkerDates(getTenYearsBack(), 1040); // Adjust the number of weeks as needed

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
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        onMouseLeave={() => setHoveredItemId(null)}
        onDrag={() => setMouseDown(true)}>
        <div
          {...getItemProps({
            ...item.itemProps,
            style: {
              borderRadius: '5px',
              background: item.color,
              border: itemContext.selected ? 'dashed 1px rgba(0,0,0,0.6)' : 'none',
              opacity: itemContext.selected ? 0.8 : 1,
              zIndex: hoveredItemId === item.id ? 99 : 80,
              cursor: mouseDown ? 'ew-resize' : 'default',
            },
          })}>
          {hoveredItemId === item.id && (
            <div
              className={isFirstOrSecondChild ? 'animated-div' : 'animated-div animated-div-down'}
              style={{
                position: 'absolute',
                top: isFirstOrSecondChild ? '25px' : '-100px',
              }}>
              {hoverPopup}
            </div>
          )}
          {itemContext.useResizeHandle ? (
            <div {...leftResizeProps} style={{borderRadius: '8px', cursor: 'col-resize'}} />
          ) : (
            ''
          )}

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

  const CustomWeekMarker = ({dynamicWidth}: {dynamicWidth: number}) => {
    return (
      <CustomMarker date={getCurrentWeekRange(currentDate).startOfWeek.toDate()}>
        {({styles}) => (
          <div
            style={{
              ...styles,
              background: 'rgb(245 220 137 / 84%)',
              width: dynamicWidth,
            }}></div>
        )}
      </CustomMarker>
    );
  };

  return (
    <TimelineWrapper commonFontFamily={fontFamily}>
      <Timeline
        ref={dateHeaderRef}
        groups={groups}
        items={items}
        keys={keys}
        itemTouchSendsClick={false}
        stackItems={false}
        itemHeightRatio={0.4}
        sidebarWidth={sidebarWidth}
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
        onZoom={handleZoom}
        canChangeGroup={false}>
        <TimelineHeaders className="sticky">
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
          {isDateInCurrentWeek(currentDate) && <CustomWeekMarker dynamicWidth={markerWidth} />}
          {markerDates.map(marker => (
            <CustomMarker key={marker.date} date={marker.date}>
              {renderCustomMarker}
            </CustomMarker>
          ))}
        </TimelineMarkers>
      </Timeline>
      {draggedItem && <InfoLabel item={draggedItem.item} group={draggedItem.group} time={draggedItem.time} />}
    </TimelineWrapper>
  );
};
