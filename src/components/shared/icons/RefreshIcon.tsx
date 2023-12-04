import React from 'react';

const RefreshIcon: React.FC<{color: string}> = ({color}) => {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_9705_13274)">
        <path
          d="M16 32C24.8368 32 32 24.8368 32 16C32 7.1632 24.8368 0 16 0C7.1632 0 0 7.1632 0 16C0 24.8368 7.1632 32 16 32Z"
          fill="#E6EEF5"
        />
        <path
          d="M10 11.1191H19.8667C21.0533 11.1191 22 12.0791 22 13.2525V15.6125"
          stroke={color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.2533 8.88086L10 11.1209L12.2533 13.3742M22 20.8809H12.1333C10.9467 20.8809 10 19.9209 10 18.7475V16.3875"
          stroke={color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.7461 23.1203L21.9994 20.8803L19.7461 18.627"
          stroke={color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_9705_13274">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RefreshIcon;
