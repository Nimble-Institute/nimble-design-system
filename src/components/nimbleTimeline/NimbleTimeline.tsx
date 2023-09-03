import React, {useState} from 'react';
import moment from 'moment';
import Chip from '@mui/material/Chip';
import 'react-calendar-timeline/lib/Timeline.css';
import Timeline, {
  DateHeader,
  ItemContext,
  SidebarHeader,
  TimelineHeaders,
  TimelineMarkers,
  TodayMarker,
} from 'react-calendar-timeline';

import InfoLabel from './InfoLabel';

import './styles.css';
import {Typography} from '@mui/material';

interface NimbleTimeline {
  showWeeks: boolean;
  sidebarWidth: number;
  sidebarGroups: any[];
  timelineItems: any[];
  showTimelineItemText: boolean;
  todayMarker: boolean;
}
interface Group {
  id: number;
  title: string;
  badge: string;
  color: string;
  labels: {text: string; color: string}[];
}

interface GroupRendererProps {
  group: Group;
}

interface ItemRendererProps {
  item: any;
  itemContext: ItemContext;
  getItemProps: Function;
  getResizeProps: Function;
}

interface HandleItemDragProps {
  eventType: string;
  itemId: number;
  time: number;
  edge: any;
  newGroupOrder: number;
}
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
          {...getItemProps({...item.itemProps, style: {borderRadius: '25px', background: '#AE4949', border: 'none'}})}>
          {itemContext.useResizeHandle ? <div {...leftResizeProps} style={{borderRadius: '8px'}} /> : ''}

          <div
            className="rct-item-content"
            style={{
              width: 'inherit',
              border: 'none',
              maxHeight: `${itemContext.dimensions.height}`,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}>
            {showTimelineItemText && itemContext.title}
          </div>

          {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
        </div>
      </>
    );
  };

  const groupRenderer = ({group}: GroupRendererProps) => {
    return (
      <div style={{display: 'flex', height: 'inherit'}}>
        <div
          style={{
            display: 'flex',
            width: '50%',
            borderRight: '1px solid gray',
            fontSize: '14px',
            alignItems: 'center',
            overflow: 'scroll',
          }}>
          {group?.badge && (
            <Chip
              label={group.badge}
              size={'small'}
              sx={{
                fontWeight: 100,
                borderRadius: '3px',
                margin: '0px 8px',
                backgroundColor: group.color,
                color: 'white',
              }}
            />
          )}
          <Typography variant="body1">{group.title}</Typography>
        </div>
        <div
          style={{
            display: 'flex',
            height: 'inherit',
            padding: '4px 0px',
            width: '50%',
            overflow: 'scroll',
            alignItems: 'center',
          }}>
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
        </div>
      </div>
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
                <div
                  style={{
                    display: 'flex',
                    width: getRootProps().style.width,
                    background: 'white',
                    color: 'black',
                    fontFamily:
                      '"Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif',
                  }}>
                  <div style={{width: '50%', border: '1px solid gray'}} />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50%',
                      fontSize: '12px',
                      border: '1px solid gray',
                    }}>
                    <Typography variant="body2">Actiehouder</Typography>
                  </div>
                </div>
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
