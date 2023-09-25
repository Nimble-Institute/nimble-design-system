import React from 'react';
import type {Meta} from '@storybook/react';
import moment from 'moment';

import {NimbleTimeline} from '../src';

const NimbleTimelineStory: Meta<typeof NimbleTimeline> = {
  title: 'Nimble Charts/Nimble Timeline',
  component: NimbleTimeline,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleTimelineStory;

const moveCallback = (itemId, dragTime, newGroupOrder) => {
  console.info('move callback');
  console.info('itemId: ', itemId);
  console.info('dragTime: ', dragTime);
  console.info('newGroupOrder: ', newGroupOrder);
};

const resizeCallback = (itemId, time, edge) => {
  console.info('resize callback');
  console.info('itemId: ', itemId);
  console.info('time: ', time);
  console.info('edge (left or right): ', edge);
};

const itemDoubleClickCallback = item => {
  console.info('item doubleClick: ', item);
};

export const NimbleTimelineDefault = {
  args: {
    sideBarLeftHeaderText: 'Actiehouder',
    sideBarRightHeaderText: 'Zwanenburg',
    itemMoveHandler: moveCallback,
    itemResizeHandler: resizeCallback,
    itemDoubleClickHandler: itemDoubleClickCallback,
    sidebarGroups: [
      {
        id: 1,
        title: 'Bouwleges',
        badge: '650150',
        color: '#388e3c',
        labels: [
          {text: 'Zwanenburg Projecten', color: '#388e3c'},
          {text: 'Gemeente', color: '#0C1B2A'},
        ],
      },
      {
        id: 2,
        title: 'Exploitatiebijdrage',
        badge: '650150',
        color: '#42a5f5',
        labels: [
          {text: 'Planschade', color: '#e57373'},
          {text: 'Exploitatiebijdrage', color: '#e57373'},
          {text: 'Sloopkosten', color: '#e57373'},
        ],
      }

    ],
    timelineItems: [
      {
        id: 1,
        group: 1,
        title: 'item 1',
        color: '#AE4949',
        start: moment(),
        end: moment().add(600, 'hour'),
        canMove: false,
        canResize: false,
      },
      {
        id: 2,
        group: 2,
        title: 'item 2',
        color: '#354968',
        start: moment().add(-0.5, 'hour'),
        end: moment().add(1024, 'hour'),
      },
      {
        id: 3,
        group: 3,
        title: 'item 3',
        color: '#AE4949',
        start: moment().add(2, 'hour'),
        end: moment().add(800, 'hour'),
      },
    ],
  },
};

export const NimbleTimelineWithWeeks = {
  args: {
    showWeeks: true,
    sidebarWidth: 400,
    showTimelineItemText: true,
    todayMarker: true,
    sideBarLeftHeaderText: 'Actiehouder',
    sideBarRightHeaderText: 'Zwanenburg',
    itemMoveHandler: moveCallback,
    itemResizeHandler: resizeCallback,
    itemDoubleClickHandler: itemDoubleClickCallback,
    sidebarGroups: [
      {
        id: 1,
        title: 'Bouwleges',
        badge: '650150',
        color: '#388e3c',
        labels: [
          {text: 'Zwanenburg Projecten', color: '#388e3c'},
          {text: 'Gemeente', color: '#0C1B2A'},
        ],
      },
      {
        id: 2,
        title: 'Exploitatiebijdrage',
        badge: '650150',
        color: '#42a5f5',
        labels: [
          {text: 'Planschade', color: '#e57373'},
          {text: 'Exploitatiebijdrage', color: '#e57373'},
          {text: 'Sloopkosten', color: '#e57373'},
        ],
      },
      {id: 3, title: 'Planschade', badge: '650250', color: '#e57373', labels: []},
      {id: 4, title: 'Sloopkosten'},
    ],
    timelineItems: [
      {
        id: 1,
        group: 1,
        title: 'item 1',
        color: '#AE4949',
        start: moment(),
        end: moment().add(600, 'hour'),
        canMove: false,
        canResize: false,
      },
      {
        id: 2,
        group: 2,
        title: 'item 2',
        color: '#354968',
        start: moment().add(-0.5, 'hour'),
        end: moment().add(1024, 'hour'),
      },
      {
        id: 3,
        group: 3,
        title: 'item 3',
        color: '#AE4949',
        start: moment().add(2, 'hour'),
        end: moment().add(800, 'hour'),
      },
    ],
  },
};
