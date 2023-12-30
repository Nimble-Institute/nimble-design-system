import React from 'react';

const DownloadIcon: React.FC<{color: string; backgroundcolor: string}> = ({color, backgroundcolor}) => {
  return (
    <svg width="32" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill={backgroundcolor} fill-opacity="0.1" />
      <path
        d="M6 17.5801V23.8959C6 25.0586 6.99494 26.0011 8.22225 26.0011H23.778C25.0054 26.0011 26.0003 25.0586 26.0003 23.8959V17.5801"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.0009 6V20.7369M16.0009 20.7369L10.4453 15.0058M16.0009 20.7369L21.5566 15.0059"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default DownloadIcon;
