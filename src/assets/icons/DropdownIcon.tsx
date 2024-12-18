import React from 'react';

const DropdownIcon: React.FC<{color?: string; style: any}> = ({color = '#2C2C2C', style}) => {
  return (
    <svg width="17" height="17" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M6.99984 12.8333C10.2216 12.8333 12.8332 10.2218 12.8332 7.00001C12.8332 3.77826 10.2216 1.16667 6.99984 1.16667C3.77809 1.16667 1.1665 3.77826 1.1665 7.00001C1.1665 10.2218 3.77809 12.8333 6.99984 12.8333Z"
        stroke={color}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.94092 6.265L7.00008 8.31833L9.05925 6.265"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <clipPath id="clip0_2455_4023">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DropdownIcon;
