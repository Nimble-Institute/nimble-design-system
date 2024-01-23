import React from 'react';

const ClearIcon: React.FC<{color?: string; style: any}> = ({color = '#50606B', style}) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.30213 8.65067L8.6038 5.349M8.6038 8.65067L5.30213 5.349M6.95296 12.8332C10.1613 12.8332 12.7863 10.2082 12.7863 6.99984C12.7863 3.7915 10.1613 1.1665 6.95296 1.1665C3.74463 1.1665 1.11963 3.7915 1.11963 6.99984C1.11963 10.2082 3.74463 12.8332 6.95296 12.8332Z"
        stroke={color}
        stroke-width="0.9"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ClearIcon;
