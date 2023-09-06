import React from 'react';
import moment from 'moment';
import {styled} from '@mui/system';

const LabelContainer = styled('div')({
  position: 'fixed',
  left: 100,
  bottom: 50,
  background: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  padding: 10,
  fontSize: 20,
  borderRadius: 5,
  zIndex: 85,
});
export default ({group, time}: {group: any; time: any}) => {
  const date = moment(time, 'x');
  const label = group ? group.title : '';
  return <LabelContainer style={{}}>{`${date.format('LLL')}, ${label} `}</LabelContainer>;
};
