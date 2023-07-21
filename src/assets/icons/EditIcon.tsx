import React from 'react';

const DeleteIcon: React.FC<{color?: string}> = ({color = '#5989C0'}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill={color} />
      <g clip-path="url(#clip0_1199_3357)">
        <path
          d="M11.3335 5.33325H10.0002C6.66683 5.33325 5.3335 6.66659 5.3335 9.99992V13.9999C5.3335 17.3333 6.66683 18.6666 10.0002 18.6666H14.0002C17.3335 18.6666 18.6668 17.3333 18.6668 13.9999V12.6666"
          stroke="white"
          stroke-width="0.9"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.6933 6.01326L9.43992 11.2666C9.23992 11.4666 9.03992 11.8599 8.99992 12.1466L8.71325 14.1533C8.60659 14.8799 9.11992 15.3866 9.84659 15.2866L11.8533 14.9999C12.1333 14.9599 12.5266 14.7599 12.7333 14.5599L17.9866 9.30659C18.8933 8.39992 19.3199 7.34659 17.9866 6.01326C16.6533 4.67992 15.5999 5.10659 14.6933 6.01326Z"
          stroke="white"
          stroke-width="0.9"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.9399 6.7666C14.161 7.55158 14.5799 8.26664 15.1566 8.8433C15.7332 9.41995 16.4483 9.83887 17.2333 10.0599"
          stroke="white"
          stroke-width="0.9"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1199_3357">
          <rect width="16" height="16" fill="white" transform="translate(4 4)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DeleteIcon;
