import React from 'react';
import type {Meta} from '@storybook/react';
import {Box, Typography} from '@mui/material';

import {NimbleDataGrid} from '../src';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const NimbleDataGridStory: Meta<typeof NimbleDataGrid> = {
  title: 'Nimble Desktop Design/Nimble Data Grid',
  component: NimbleDataGrid,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleDataGridStory;

const statusColor = {
  'To do': '#0057A2',
  'In progress': '#ebc934',
  Done: '#1b9e31',
};

const ContentCard = ({item}) => (
  <Box sx={{display: 'flex', flexDirection: 'column'}}>
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Typography sx={{color: '#383838', fontSize: '14px', fontWeight: '600'}}>{item.taskName}</Typography>
      <Box sx={{backgroundColor: statusColor[item.status], borderRadius: '5px', padding: '4px 8px'}}>
        <Typography sx={{color: '#FFFFFE', fontSize: '12px', fontWeight: '700'}}>{item.status}</Typography>
      </Box>
    </Box>
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Typography sx={{color: '#6F7175', fontSize: '14px', fontWeight: '400'}}>{item.topicName}</Typography>
    </Box>
    <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '5px'}}>
      <Box sx={{backgroundColor: '#EE7000', borderRadius: '5px', padding: '4px 8px'}}>
        <Typography sx={{color: '#FFFFFE', fontSize: '12px', fontWeight: '700'}}>{item.taskOwner}</Typography>
      </Box>
      <Typography sx={{color: '#383838', fontSize: '12px', fontWeight: '400'}}>{item.deadline}</Typography>
    </Box>
  </Box>
);

export const DataGrid = {
  args: {
    header: 'Tasks',
    width: '360px',
    height: '100vh',
    primaryActionProps: {
      label: 'Add Tasks',
      variant: 'contained',
      size: 'small',
      startIcon: <AddCircleOutlineIcon />,
      onClick: () => alert('Primary Action'),
    },
    onSearchHandler: (searchText: string) => alert('Going to search - ' + searchText),
    onChangeFilters: filterValues => console.log(filterValues),
    onClickDataCard: data => console.log(data),
    filterPanalData: [
      {
        name: 'Task Name',
        dataPoint: 'taskName',
      },
      {
        name: 'Topic Name',
        dataPoint: 'topicName',
      },
      {
        name: 'Status',
        dataPoint: 'status',
        customFilterData: [
          {
            label: 'Todo',
            value: 'todo',
          },
          {
            label: 'InProgress',
            value: 'inProgress',
          },
          {
            label: 'Done',
            value: 'done',
          },
          {
            label: 'Expired',
            value: 'expired',
          },
        ],
      },
      {
        name: 'Deadline',
        dataPoint: 'deadline',
      },
      {
        name: 'Task owner',
        dataPoint: 'taskOwner',
      },
    ],
    data: [
      {
        taskName: 'Scedule start meeting',
        topicName: 'Ferus smit',
        status: 'To do',
        deadline: '2023-09-02',
        taskOwner: 'Member Advisors',
      },
      {
        taskName: 'Scedule start planning',
        topicName: 'Nimble',
        status: 'In progress',
        deadline: '2023-08-31',
        taskOwner: 'Manoj Gamachchige',
      },
      {
        taskName: 'Project Planning',
        topicName: 'Nimble',
        status: 'Done',
        deadline: '2023-09-01',
        taskOwner: 'Astrid',
      },
      {
        taskName: 'Scedule budget meeting',
        topicName: 'NSL',
        status: 'To do',
        deadline: '2023-10-02',
        taskOwner: 'Max.L',
      },
    ],
    renderCard: (item: any) => <ContentCard item={item} />,
    paginationData: {
      totalPage: 100,
      page: 1,
      onPageChnage: (event: any, value: number) => {
        alert(value);
      },
    },
    clickCustomPagination: (value: number) => alert(value),
  },
};
