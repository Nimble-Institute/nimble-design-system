import React, {useState} from 'react';
import type {Meta} from '@storybook/react';
import moment from 'moment';

import {NimbleTimeline} from '../src';

const NimbleTimelineStory: Meta<typeof NimbleTimeline> = {
  title: 'Nimble Charts/Nimble Timeline',
  component: NimbleTimeline,
  parameters: {
    layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleTimelineStory;

const hoverCallback = (e, item) => {
  console.log('item hover: ', item);
};
const moveCallback = (itemId, startTime, endTime, newGroupOrder) => {
  console.info('move callback');
  console.info('itemId: ', itemId);
  console.info('dragTime: ', startTime);
  console.info('endTime: ', endTime);
  console.info('newGroupOrder: ', newGroupOrder);
};

const resizeCallback = (itemId, start, end, edge) => {
  console.info('resize callback');
  console.info('itemId: ', itemId);
  console.info('start: ', start);
  console.info('end: ', end);
  console.info('edge (left or right): ', edge);
};

const itemDoubleClickCallback = item => {
  console.info('item doubleClick: ', item);
};

const addItemCallback = (groupId, timestamp, e) => {
  console.log('groupID: ', groupId);
  console.log('timestamp: ', timestamp);
  console.log('starting day of week: ', moment(timestamp).startOf('isoWeek').format('YYYY-MM-DD'));
};

export const NimbleTimelineDefault = {
  args: {
    sidebarWidth: 500,
    weekMarkerWidth: '37.9px',
    sideBarHeaderText: 'Actiehouder',
    itemMoveHandler: moveCallback,
    itemResizeHandler: resizeCallback,
    itemDoubleClickHandler: itemDoubleClickCallback,
    itemHoverHandler: hoverCallback,
    addItemHandler: addItemCallback,
    hoverPopup: (
      <div style={{width: '250px', height: '100px', background: '#ffff', color: 'blue', border: '1px solid #bbb'}}>
        tooltip
      </div>
    ),
    sidebarGroups: [
      {
        id: 1,
        title: 'Planschade',
        value: '32,5% (€ 65K/€ 200K)',
        color: '#AE4949',
        parent: {key: 1, title: 'Grond', badge: '650150'},
      },
      {
        id: 2,
        title: 'Aankoopgrond',
        color: '#AE4949',
        parent: {key: 1, title: 'Grond', badge: '650150'},
      },
      {
        id: 3,
        title: 'Leges',
        color: '#354968',
        value: (
          <div>
            <span style={{color: 'red'}}>110%</span> (€ 220K/€ 200K)
          </div>
        ),
        parent: {key: 2, title: 'Overheid', badge: '650112'},
      },
      {
        id: 4,
        title: 'Exploitatiebijdrage',
        color: '#354968',
        parent: {key: 2, title: 'Overheid', badge: '650112'},
      },
      {
        id: 5,
        title: 'Planschade',
        value: '32,5% (€ 65K/€ 200K)',
        color: '#AE4949',
        parent: {key: 1, title: 'Grond', badge: '650150'},
      },
      {
        id: 6,
        title: 'Aankoopgrond',
        color: '#AE4949',
        parent: {key: 1, title: 'Grond', badge: '650150'},
      },
      {
        id: 7,
        title: 'Leges',
        color: '#354968',
        value: (
          <div>
            <span style={{color: 'red'}}>110%</span> (€ 220K/€ 200K)
          </div>
        ),
        parent: {key: 2, title: 'Overheid', badge: '650112'},
      },
      {
        id: 8,
        title: 'Exploitatiebijdrage',
        color: '#354968',
        parent: {key: 2, title: 'Overheid', badge: '650112'},
      },
    ],
    timelineItems: [
      {
        id: 1,
        group: 1,
        title: '32,5% ($65K/$200K) long text for node',
        color: '#AE4949',
        start: moment().startOf('isoWeek'),
        end: moment().add(600, 'hour'),
      },
      {
        id: 3,
        group: 2,
        title: '50% (€ 100K/€ 200K)',
        color: '#354968',
        start: moment().add(-300, 'hour').startOf('isoWeek'),
        end: moment().add(400, 'hour'),
      },
      {
        id: 4,
        group: 3,
        title: '60% (€ 120K/€ 200K)',
        color: '#354968',
        start: moment().add(300, 'hour').startOf('isoWeek'),
        end: moment().add(700, 'hour'),
      },
      {
        id: 5,
        group: 5,
        title: '32,5% ($65K/$200K) long text for node',
        color: '#AE4949',
        start: moment().startOf('isoWeek').startOf('isoWeek'),
        end: moment().add(600, 'hour'),
      },
      {
        id: 6,
        group: 6,
        title: '50% (€ 100K/€ 200K)',
        color: '#354968',
        start: moment().add(-300, 'hour').startOf('isoWeek'),
        end: moment().add(400, 'hour'),
      },
      {
        id: 7,
        group: 3,
        title: '60% (€ 120K/€ 200K)',
        color: '#AE4949',
        start: moment().add(1000, 'hour').startOf('isoWeek'),
        end: moment().add(1500, 'hour'),
      },
    ],
    isEditable: true,
  },
};
