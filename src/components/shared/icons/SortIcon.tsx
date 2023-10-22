import React from 'react';

const SortIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill="#E0E3EB" />
    <path d="M5 17L0.669872 9.5H9.33013L5 17Z" fill="#003461" />
  </svg>
);

export default SortIcon;
